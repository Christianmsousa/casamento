import { NextRequest, NextResponse } from 'next/server'
import { getGifts, saveGifts } from '@/lib/data/gifts'
import type { Gift } from '@/lib/types/gift'

export async function GET() {
  try {
    const gifts = await getGifts()
    return NextResponse.json(gifts)
  } catch (error) {
    console.error('Error in GET /api/gifts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch gifts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const gifts = await getGifts()
    
    const newGift: Gift = {
      id: Date.now().toString(),
      name: body.name,
      description: body.description,
      category: body.category || 'outros',
      price: body.price,
      priceRange: body.priceRange,
      imageUrl: body.imageUrl,
      storeUrl: body.storeUrl,
      storeName: body.storeName,
      referenceUrl: body.referenceUrl,
      referenceImageUrl: body.referenceImageUrl,
      status: 'available',
      priority: body.priority || 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    
    gifts.push(newGift)
    await saveGifts(gifts)
    
    return NextResponse.json(newGift, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/gifts:', error)
    return NextResponse.json(
      { error: 'Failed to create gift' },
      { status: 500 }
    )
  }
}

