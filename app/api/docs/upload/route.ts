import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'
import { getCurrentUser } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Allow larger file uploads (100MB)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
}

const SOURCES_DIR = path.join(process.cwd(), 'sources')

export async function POST(request: NextRequest) {
  try {
    // Require admin authentication
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }
    if (user.role !== 'ADMIN') {
      return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const category = formData.get('category') as string || 'other'
    const subcategory = formData.get('subcategory') as string || 'uploads'

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 })
    }

    if (!file.name.toLowerCase().endsWith('.pdf')) {
      return NextResponse.json({ success: false, error: 'Only PDF files are supported' }, { status: 400 })
    }

    // Create upload directory
    const uploadDir = path.join(SOURCES_DIR, category, subcategory)
    fs.mkdirSync(uploadDir, { recursive: true })

    // Save the file
    const buffer = Buffer.from(await file.arrayBuffer())
    const filePath = path.join(uploadDir, file.name)
    const relativePath = `${category}/${subcategory}/${file.name}`
    fs.writeFileSync(filePath, buffer)

    // Run the extraction script as a separate process
    // This avoids pdf-parse worker issues in Next.js API routes
    try {
      const scriptPath = path.join(process.cwd(), 'scripts', 'process-upload.mjs')
      const output = execSync(
        `node "${scriptPath}" "${filePath}" "${category}" "${subcategory}"`,
        {
          encoding: 'utf-8',
          timeout: 120000, // 2 minute timeout for large PDFs
          maxBuffer: 10 * 1024 * 1024 // 10MB buffer for output
        }
      )

      // Parse the last line of output which should be JSON result
      const lines = output.trim().split('\n')
      const lastLine = lines[lines.length - 1]

      try {
        const result = JSON.parse(lastLine)
        if (result.success) {
          // Track document in database
          await prisma.document.create({
            data: {
              name: file.name.replace(/\.pdf$/i, ''),
              path: relativePath,
              category,
              subcategory,
              size: buffer.length,
              chunksAdded: result.chunksAdded,
              uploadedById: user.id,
            },
          })

          return NextResponse.json({
            success: true,
            message: 'File uploaded and indexed successfully',
            path: relativePath,
            chunksAdded: result.chunksAdded,
            totalChunks: result.totalChunks,
            textLength: result.textLength
          })
        } else {
          return NextResponse.json({
            success: true,
            message: result.error || 'File uploaded but text extraction failed',
            path: relativePath,
            chunksAdded: 0
          })
        }
      } catch {
        // Script ran but didn't output valid JSON
        console.log('Script output:', output)
        return NextResponse.json({
          success: true,
          message: 'File uploaded, processing completed',
          path: relativePath,
          chunksAdded: 0
        })
      }
    } catch (err: unknown) {
      const error = err as Error & { stderr?: string }
      console.error('Process upload error:', error.message)
      if (error.stderr) {
        console.error('stderr:', error.stderr)
      }
      return NextResponse.json({
        success: true,
        message: 'File uploaded but text extraction failed',
        path: relativePath,
        chunksAdded: 0
      })
    }

  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 })
  }
}
