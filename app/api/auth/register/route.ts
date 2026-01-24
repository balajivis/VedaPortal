import { NextResponse } from 'next/server'

export async function POST() {
  return NextResponse.json(
    { error: 'Registration is currently disabled' },
    { status: 403 }
  )
}
