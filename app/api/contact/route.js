import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message, propertyTitle } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      )
    }

    // In production, you would send an actual email here
    // For now, we'll log it and return success
    
    console.log('=== NEW CONTACT FORM SUBMISSION ===')
    console.log('To: info@plestate.com')
    console.log('From:', email)
    console.log('Name:', name)
    console.log('Phone:', phone || 'Not provided')
    console.log('Subject:', subject || (propertyTitle ? `Inquiry about ${propertyTitle}` : 'General Inquiry'))
    console.log('Message:', message)
    console.log('Property:', propertyTitle || 'General inquiry')
    console.log('Timestamp:', new Date().toISOString())
    console.log('===================================')

    /* 
    // Example: Send email using a service like SendGrid, Resend, or Nodemailer
    // Uncomment and configure when ready to use
    
    import { sendEmail } from '@/lib/email' // Your email service
    
    await sendEmail({
      to: 'info@plestate.com',
      from: 'noreply@plestate.com',
      replyTo: email,
      subject: subject || `New inquiry from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
        ${propertyTitle ? `<p><strong>Property:</strong> ${propertyTitle}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    })
    */

    // Return success response
    return NextResponse.json(
      { 
        success: true, 
        message: 'Thank you! Your message has been sent successfully. We will contact you at ' + email + ' soon.'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or email us directly at info@plestate.com' },
      { status: 500 }
    )
  }
}