import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make Resend optional - only initialize if API key is available
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { error: 'Email service not configured. Please set RESEND_API_KEY environment variable.' },
        { status: 503 }
      );
    }

    const { email, shareUrl, goalCount, message } = await request.json();

    if (!email || !shareUrl) {
      return NextResponse.json(
        { error: 'Email and share URL are required' },
        { status: 400 }
      );
    }

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your ELTIW Goals Snapshot</title>
        </head>
        <body style="font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; margin-bottom: 8px;">🎯 ELTIW Goals Snapshot</h1>
            <p style="color: #6b7280; margin: 0;">Every Lil Thing I Want - Goal Tracking</p>
          </div>

          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); color: white; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
            <h2 style="margin: 0 0 12px 0; font-size: 24px;">📊 Your Goals Overview</h2>
            <p style="margin: 0; font-size: 18px; opacity: 0.9;">
              You have <strong>${goalCount || 0} goal${goalCount === 1 ? '' : 's'}</strong> tracked in ELTIW
            </p>
          </div>

          ${message ? `
            <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 24px; border-radius: 4px;">
              <h3 style="margin: 0 0 8px 0; color: #1e40af;">📝 Personal Note</h3>
              <p style="margin: 0; color: #475569;">${message}</p>
            </div>
          ` : ''}

          <div style="background: #f1f5f9; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 16px 0; color: #1e293b;">🔗 Access Your Goals</h3>
            <p style="margin: 0 0 16px 0; color: #475569;">
              Click the button below to view your complete goals dashboard. Your data is compressed in the URL using Slug Store technology - no login required!
            </p>
            <div style="text-align: center;">
              <a href="${shareUrl}" 
                 style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 500; margin: 0 auto;">
                View My Goals Dashboard →
              </a>
            </div>
          </div>

          <div style="border-top: 1px solid #e2e8f0; padding-top: 20px; text-align: center;">
            <h3 style="color: #1e293b; margin-bottom: 16px;">✨ Powered by Slug Store Technology</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 16px; margin-bottom: 20px;">
              <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 4px;">🗜️</div>
                <div style="font-weight: 500; color: #1e293b;">30-70% Compression</div>
                <div style="font-size: 12px; color: #6b7280;">Smart URL compression</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 24px; margin-bottom: 4px;">🚀</div>
                <div style="font-weight: 500; color: #1e293b;">No Database</div>
                <div style="font-size: 12px; color: #6b7280;">Complete state in URL</div>
              </div>
                             <div style="text-align: center;">
                 <div style="font-size: 24px; margin-bottom: 4px;">🔄</div>
                 <div style="font-weight: 500; color: #1e293b;">Instant Sync</div>
                 <div style="font-size: 12px; color: #6b7280;">Share across devices</div>
               </div>
            </div>
            
            <p style="color: #6b7280; font-size: 12px; margin: 16px 0 0 0;">
              Learn more about Slug Store: 
              <a href="https://slugstore.fbien.com" style="color: #3b82f6; text-decoration: none;">slugstore.fbien.com</a>
            </p>
          </div>

          <div style="text-align: center; margin-top: 32px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #9ca3af; font-size: 14px; margin: 0;">
              Sent from <strong>ELTIW</strong> - Every Lil Thing I Want<br>
              <a href="https://eltiw.fbien.com" style="color: #6b7280; text-decoration: none;">eltiw.fbien.com</a>
            </p>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || 'ELTIW <noreply@yourdomain.com>',
      to: [email],
      subject: `🎯 Your ELTIW Goals Snapshot (${goalCount || 0} goals)`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      emailId: data?.id,
      message: 'Goals snapshot sent successfully!'
    });

  } catch (error) {
    console.error('Email API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 