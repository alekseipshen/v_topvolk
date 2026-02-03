import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  getLeadNotificationHTML,
  getLeadNotificationText,
  getCustomerConfirmationHTML,
  getCustomerConfirmationText,
} from '@/lib/email-templates';

interface LeadData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  recaptchaToken: string;
}

// Helper function to add delay between emails
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper function to send emails (optimized with parallel sending)
async function sendEmails(data: {
  name: string;
  phone: string;
  email: string;
  message?: string;
  source?: string;
  url?: string;
  timestamp?: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const emailRecipient1 = process.env.EMAIL_RECIPIENT_1;
  const emailRecipient2 = process.env.EMAIL_RECIPIENT_2;
  const emailFromAddress = process.env.EMAIL_FROM || 'noreply@maxappliancetexas.com';
  
  if (!resendApiKey || (!emailRecipient1 && !emailRecipient2)) {
    console.log('[EMAIL] Skipping - no API key or recipients configured');
    return;
  }

  try {
    const resend = new Resend(resendApiKey);
    
    // Prepare email promises for parallel sending
    const ownerEmails: Promise<any>[] = [];
    
    // Send to first recipient
    if (emailRecipient1) {
      ownerEmails.push(
        resend.emails.send({
          from: `MaxAppliance <${emailFromAddress}>`,
          to: emailRecipient1,
          subject: `🔔 New Lead: ${data.name} - Max Appliance Repair`,
          html: getLeadNotificationHTML(data),
          text: getLeadNotificationText(data),
        }).then(() => {
          console.log(`[EMAIL] Sent to ${emailRecipient1}`);
        })
      );
    }
    
    // Send to second recipient (in parallel with first)
    if (emailRecipient2) {
      // Small delay to avoid rate limiting
      ownerEmails.push(
        delay(1000).then(() => 
          resend.emails.send({
            from: `MaxAppliance <${emailFromAddress}>`,
            to: emailRecipient2,
            subject: `🔔 New Lead: ${data.name} - Max Appliance Repair`,
            html: getLeadNotificationHTML(data),
            text: getLeadNotificationText(data),
          }).then(() => {
            console.log(`[EMAIL] Sent to ${emailRecipient2}`);
          })
        )
      );
    }
    
    // Wait for both owner emails to complete
    await Promise.all(ownerEmails);
    
    // Small delay before customer email
    await delay(1000);
    
    // Send confirmation email to customer
    await resend.emails.send({
      from: `MaxAppliance <${emailFromAddress}>`,
      to: data.email,
      subject: '✅ Your Service Request - Max Appliance Repair',
      html: getCustomerConfirmationHTML(data.name),
      text: getCustomerConfirmationText(data.name),
    });
    
    console.log(`[EMAIL] Confirmation sent to customer: ${data.email}`);
    
  } catch (emailError) {
    console.error('[EMAIL] Error:', emailError);
    // Don't throw - we don't want to fail the entire request
  }
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields
    if (!data.name || !data.phone || !data.email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    let recaptchaScore = 1.0; // Default score when reCAPTCHA is disabled

    // Verify reCAPTCHA token only if configured and token is not 'bypass'
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret && data.recaptchaToken && data.recaptchaToken !== 'bypass') {
      try {
        const recaptchaResponse = await fetch(
          `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
          { method: 'POST' }
        );

        const recaptchaData = await recaptchaResponse.json();

        // Check reCAPTCHA score (minimum 0.3)
        if (!recaptchaData.success || recaptchaData.score < 0.3) {
          console.log('Low reCAPTCHA score:', recaptchaData.score);
          // Save as potential bot, but don't send to Google Ads
          return NextResponse.json(
            { error: 'Failed verification' },
            { status: 400 }
          );
        }

        recaptchaScore = recaptchaData.score;
      } catch (error) {
        console.log('reCAPTCHA verification failed, proceeding without it');
      }
    }

    // Prepare lead data for n8n webhook
    const leadPayload = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message || '',
      source: 'website',
      timestamp: new Date().toISOString(),
      recaptchaScore: recaptchaScore,
      url: request.headers.get('referer') || 'unknown',
    };

    // Send to n8n webhook for processing
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadPayload),
      });
    }

    // ============================================
    // Send email notifications (optimized with parallel sending)
    // ============================================
    
    // Prepare email data
    const emailData = {
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
      source: 'Website - Max Appliance',
      url: leadPayload.url,
      timestamp: leadPayload.timestamp,
    };
    
    // Send emails (owners in parallel, then customer)
    // Total time: ~2-3 seconds instead of ~6 seconds
    await sendEmails(emailData);

    // Return success to client
    return NextResponse.json({
      success: true,
      message: 'Lead submitted successfully',
    });
  } catch (error) {
    console.error('Lead submission error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}




