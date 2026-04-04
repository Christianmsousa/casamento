import { NextRequest, NextResponse } from 'next/server'
import { getSettings, saveSettings } from '@/lib/data/settings'
import type { Settings } from '@/lib/types'

export async function GET() {
  try {
    const settings = await getSettings()
    return NextResponse.json(settings)
  } catch (error) {
    console.error('Error in GET /api/settings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch settings' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body: Settings = await request.json()
    await saveSettings(body)
    return NextResponse.json(body)
  } catch (error) {
    console.error('Error in PUT /api/settings:', error)
    return NextResponse.json(
      { error: 'Failed to save settings' },
      { status: 500 }
    )
  }
}

