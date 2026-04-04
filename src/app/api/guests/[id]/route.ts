import { NextRequest, NextResponse } from 'next/server'
import { getGuests, saveGuests } from '@/lib/data/guests'
import type { Guest } from '@/lib/types'

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const guests = await getGuests()
    const guest = guests.find(g => g.id === id)
    
    if (!guest) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }
    
    return NextResponse.json(guest)
  } catch (error) {
    console.error('Error in GET /api/guests/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch guest' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const body = await request.json()
    const guests = await getGuests()
    const index = guests.findIndex(g => g.id === id)
    
    if (index === -1) {
      return NextResponse.json({ error: 'Guest not found' }, { status: 404 })
    }
    
    guests[index] = { ...guests[index], ...body }
    await saveGuests(guests)
    
    return NextResponse.json(guests[index])
  } catch (error) {
    console.error('Error in PUT /api/guests/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update guest' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const guests = await getGuests()
    const filtered = guests.filter(g => g.id !== id)
    
    await saveGuests(filtered)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/guests/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete guest' },
      { status: 500 }
    )
  }
}

