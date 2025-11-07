import { NextRequest, NextResponse } from 'next/server'

// Twilio WhatsApp Bot Webhook
// This endpoint receives messages from WhatsApp via Twilio

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    const from = formData.get('From') as string
    const body = formData.get('Body') as string
    const numMedia = parseInt(formData.get('NumMedia') as string || '0')
    
    console.log('WhatsApp message received from:', from)
    console.log('Message:', body)
    console.log('Media files:', numMedia)

    // Get bot response based on user message
    const botResponse = getBotResponse(body?.toLowerCase() || '')

    // Create TwiML response
    const twiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>${escapeXml(botResponse)}</Message>
</Response>`

    return new NextResponse(twiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  } catch (error) {
    console.error('WhatsApp webhook error:', error)
    
    const errorTwiml = `<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Message>Sorry, I encountered an error. Please try again later.</Message>
</Response>`

    return new NextResponse(errorTwiml, {
      status: 200,
      headers: {
        'Content-Type': 'text/xml',
      },
    })
  }
}

// Bot response logic - Same as chatbot
function getBotResponse(message: string): string {
  if (!message) {
    return "Hi! 👋 I'm CityGuardian Bot. How can I help you today?"
  }

  if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
    return "Hello! Welcome to CityGuardian. How can I assist you today?\n\nYou can ask me about:\n• Environmental monitoring\n• Reporting issues\n• Contact support\n• Learn more about our services"
  }
  
  if (message.includes("environmental") || message.includes("sensor") || message.includes("air quality")) {
    return "You can check real-time environmental data on our website: https://cityguardian.vercel.app/environmental\n\nWould you like me to help you with anything specific?"
  }
  
  if (message.includes("report") || message.includes("issue") || message.includes("problem")) {
    return "To report an issue:\n\n1. Visit our citizen dashboard\n2. Take photos/videos of the issue\n3. Send them here on WhatsApp\n4. Our team will respond within 24 hours\n\nYou can also send media directly here and describe the problem!"
  }
  
  if (message.includes("contact") || message.includes("support") || message.includes("help")) {
    return "Contact CityGuardian Support:\n\n📱 WhatsApp: You're already here!\n📧 Email: support@cityguardian.com\n🌐 Website: https://cityguardian.vercel.app\n📞 Phone: Request a callback anytime\n\nHow can I help you today?"
  }
  
  if (message.includes("photo") || message.includes("image") || message.includes("video")) {
    return "Yes! You can send photos and videos directly here on WhatsApp.\n\nJust tap the attachment icon (📎) and:\n• Select photos from your gallery\n• Take a new photo\n• Record a video\n\nI'll receive them and our team will review within 24 hours!"
  }
  
  if (message.includes("thank")) {
    return "You're welcome! 😊\n\nFeel free to reach out anytime. We're here to help 24/7!"
  }

  if (message.includes("status") || message.includes("complaint")) {
    return "To check your complaint status, please share your complaint ID.\n\nDon't have one? Just describe your issue and send any relevant photos/videos. We'll create a new ticket for you!"
  }

  // Default response
  return "I'm here to help! 🤖\n\nI can assist you with:\n✅ Environmental monitoring data\n✅ Reporting issues (with photos/videos)\n✅ Contact support team\n✅ General information\n\nWhat would you like to know?"
}

// Escape XML special characters
function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;'
      case '>': return '&gt;'
      case '&': return '&amp;'
      case "'": return '&apos;'
      case '"': return '&quot;'
      default: return c
    }
  })
}
