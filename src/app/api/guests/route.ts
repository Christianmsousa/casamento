import { NextRequest, NextResponse } from 'next/server'
import { getGuests, saveGuests } from '@/lib/data/guests'
import { generateInviteCode } from '@/lib/utils/generate-code'
import type { Guest } from '@/lib/types'

export async function GET() {
  try {
    const guests = await getGuests()
    return NextResponse.json(guests)
  } catch (error) {
    console.error('Error in GET /api/guests:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guests' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const guests = await getGuests()
    
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: body.name,
      email: body.email,
      phone: body.phone,
      group: body.group || 'others',
      invite_code: generateInviteCode(),
      notes: body.notes,
    }
    
    guests.push(newGuest)
    await saveGuests(guests)
    
    return NextResponse.json(newGuest, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/guests:', error)
    return NextResponse.json(
      { error: 'Failed to create guest' },
      { status: 500 }
    )
  }
}

