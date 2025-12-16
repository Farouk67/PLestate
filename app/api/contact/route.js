import { NextResponse } from 'next/server'
import { client } from '../../../lib/sanity'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, message, propertyId, propertyTitle } = body

    // Create inquiry in Sanity
    const inquiry = await client.create({
      _type: 'inquiry',
      name,
      email,
      phone,
      message,
      property: propertyId ? {
        _type: 'reference',
        _ref: propertyId,
      } : undefined,
      inquiryType: propertyId ? 'info' : 'general',
      status: 'new',
      submittedAt: new Date().toISOString(),
    })

    // Here you could also send an email notification
    // using SendGrid, Resend, or other email service
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Inquiry submitted successfully',
        inquiryId: inquiry._id 
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error submitting inquiry:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit inquiry' },
      { status: 500 }
    )
  }
}