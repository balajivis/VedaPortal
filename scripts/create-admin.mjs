#!/usr/bin/env node
/**
 * Create an admin user
 * Usage: node scripts/create-admin.mjs <email> <password> <name>
 */

import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function createAdmin(email, password, name) {
  const normalizedEmail = email.toLowerCase().trim()

  // Check if user exists
  const existing = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  })

  if (existing) {
    console.log(`User ${normalizedEmail} already exists with role: ${existing.role}`)
    if (existing.role !== 'ADMIN') {
      await prisma.user.update({
        where: { id: existing.id },
        data: { role: 'ADMIN' },
      })
      console.log(`Updated ${normalizedEmail} to ADMIN role`)
    }
    return
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create admin user
  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      password: hashedPassword,
      name: name.trim(),
      role: 'ADMIN',
    },
  })

  console.log(`Created admin user: ${user.email} (${user.id})`)
}

const args = process.argv.slice(2)
if (args.length < 3) {
  console.log('Usage: node scripts/create-admin.mjs <email> <password> <name>')
  process.exit(1)
}

createAdmin(args[0], args[1], args[2])
  .then(() => prisma.$disconnect())
  .catch((err) => {
    console.error('Error:', err.message)
    prisma.$disconnect()
    process.exit(1)
  })
