import { NextRequest, NextResponse } from 'next/server';
import { getTranslations } from 'next-intl/server';
import { sendEmail, createWelcomeEmail, createPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { type, email, name, locale = 'en', resetLink } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    let result;
    
    switch (type) {
      case 'welcome':
        if (!name) {
          return NextResponse.json(
            { error: 'Name is required for welcome emails' },
            { status: 400 }
          );
        }
        
        const welcomeEmail = createWelcomeEmail(name, locale);
        result = await sendEmail({
          to: email,
          ...welcomeEmail
        });
        break;
        
      case 'password-reset':
        if (!resetLink) {
          return NextResponse.json(
            { error: 'Reset link is required for password reset emails' },
            { status: 400 }
          );
        }
        
        const resetEmail = createPasswordResetEmail(resetLink, locale);
        result = await sendEmail({
          to: email,
          ...resetEmail
        });
        break;
        
      case 'custom':
        const { subject, html, text } = await request.json();
        if (!subject || !html || !text) {
          return NextResponse.json(
            { error: 'Subject, HTML, and text content are required for custom emails' },
            { status: 400 }
          );
        }
        
        result = await sendEmail({
          to: email,
          subject,
          html,
          text
        });
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid email type' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email', details: (error as Error).message },
      { status: 500 }
    );
  }
}