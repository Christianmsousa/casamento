import { NextRequest, NextResponse } from 'next/server'
import { getGifts, saveGifts, getGiftById } from '@/lib/data/gifts'
import type { Gift } from '@/lib/types/gift'

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const gift = await getGiftById(params.id)
    if (!gift) {
      return NextResponse.json(
        { error: 'Gift not found' },
        { status: 404 }
      )
    }
    return NextResponse.json(gift)
  } catch (error) {
    console.error('Error in GET /api/gifts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gift' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const body = await request.json()
    const gifts = await getGifts()
    const index = gifts.findIndex(g => g.id === params.id)
    
    if (index === -1) {
      return NextResponse.json(
        { error: 'Gift not found' },
        { status: 404 }
      )
    }
    
    const updatedGift: Gift = {
      ...gifts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }
    
    gifts[index] = updatedGift
    await saveGifts(gifts)
    
    return NextResponse.json(updatedGift)
  } catch (error) {
    console.error('Error in PUT /api/gifts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to update gift' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const gifts = await getGifts()
    const filtered = gifts.filter(g => g.id !== params.id)
    
    if (filtered.length === gifts.length) {
      return NextResponse.json(
        { error: 'Gift not found' },
        { status: 404 }
      )
    }
    
    await saveGifts(filtered)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/gifts/[id]:', error)
    return NextResponse.json(
      { error: 'Failed to delete gift' },
      { status: 500 }
    )
  }
}

