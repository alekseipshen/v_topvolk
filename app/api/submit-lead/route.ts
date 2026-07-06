import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { Pool } from 'pg';
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
  service?: string;
  recaptchaToken: string;
}

const LEAD_SITE = 'topvolk';

// schema.table — must be set in env, validated at module load
const LEADS_TABLE = process.env.LEADS_TABLE;
const TABLE_RE = /^[a-z_][a-z0-9_]*\.[a-z_][a-z0-9_]*$/i;
if (LEADS_TABLE && !TABLE_RE.test(LEADS_TABLE)) {
  throw new Error(`Invalid LEADS_TABLE format: ${LEADS_TABLE}`);
}

// Singleton pool across warm invocations.
// We strip ?sslmode=... from the connection string because `pg` parses it from
// the URL and enforces cert verification, overriding our explicit ssl option.
// Railway's PG proxy uses a self-signed cert chain.
let pool: Pool | null = null;
function getPool(): Pool | null {
  if (!pool && process.env.DATABASE_URL) {
    const cleaned = process.env.DATABASE_URL.replace(/([?&])sslmode=[^&]*(&|$)/g, (_m, p1, p2) =>
      p1 === '?' && p2 === '' ? '' : p1 === '?' ? '?' : p2,
    );
    pool = new Pool({
      connectionString: cleaned,
      ssl: { rejectUnauthorized: false },
      max: 3,
      idleTimeoutMillis: 10_000,
    });
  }
  return pool;
}

async function insertLead(request: NextRequest, data: LeadData): Promise<void> {
  const p = getPool();
  if (!p || !LEADS_TABLE) return;
  const ua = request.headers.get('user-agent');
  const xff = request.headers.get('x-forwarded-for');
  const ip = xff ? xff.split(',')[0].trim() : null;
  const page = request.headers.get('referer') || null;
  await p.query(
    `INSERT INTO ${LEADS_TABLE}
       (name, phone, email, service_slug, service_name, city_slug, city_name, message, source, page, user_agent, ip, site, extra)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14::jsonb)`,
    [
      data.name,
      data.phone,
      data.email || null,
      null,
      data.service || null,
      null,
      null,
      data.message || null,
      'website',
      page,
      ua,
      ip,
      LEAD_SITE,
      null,
    ],
  );
}

// Helper function to add delay between emails
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Send Telegram notification to group chat
async function sendTelegram(data: {
  name: string;
  phone: string;
  email: string;
  message?: string;
  service?: string;
  url?: string;
  timestamp?: string;
}): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!botToken || !chatId) {
    console.log('[TELEGRAM] Skipping - no bot token or chat ID configured');
    return false;
  }

  const pstTime = data.timestamp
    ? new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })
    : new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' });

  const text = [
    `🔔 <b>New Lead — TopVolk Construction</b>`,
    ``,
    `👤 <b>Name:</b> ${escapeHtml(data.name)}`,
    `📞 <b>Phone:</b> ${escapeHtml(data.phone)}`,
    data.email ? `📧 <b>Email:</b> ${escapeHtml(data.email)}` : null,
    data.service ? `🔧 <b>Service:</b> ${escapeHtml(data.service)}` : null,
    data.message ? `💬 <b>Message:</b> ${escapeHtml(data.message)}` : null,
    ``,
    `🌐 Page: ${escapeHtml(data.url || 'unknown')}`,
    `🕐 ${pstTime} PST`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      console.error('[TELEGRAM] Error:', err);
      return false;
    } else {
      console.log('[TELEGRAM] Notification sent');
      return true;
    }
  } catch (error) {
    console.error('[TELEGRAM] Error:', error);
    return false;
  }
}

// Escape special characters for Telegram HTML parse mode
function escapeHtml(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Helper function to send emails (optimized with parallel sending)
async function sendEmails(data: {
  name: string;
  phone: string;
  email: string;
  message?: string;
  source?: string;
  url?: string;
  timestamp?: string;
}): Promise<boolean> {
  const resendApiKey = process.env.RESEND_API_KEY?.trim();
  const emailRecipient1 = process.env.EMAIL_RECIPIENT_1?.trim();
  const emailRecipient2 = process.env.EMAIL_RECIPIENT_2?.trim();
  const emailFromAddress = process.env.EMAIL_FROM?.trim() || 'noreply@topvolk.org';

  if (!resendApiKey || (!emailRecipient1 && !emailRecipient2)) {
    console.log('[EMAIL] Skipping - no API key or recipients configured');
    return false;
  }

  const resend = new Resend(resendApiKey);

  // Prepare owner-email promises for parallel sending
  const ownerEmails: Promise<void>[] = [];

  // Send to first recipient
  if (emailRecipient1) {
    ownerEmails.push(
      resend.emails.send({
        from: `TopVolk Construction <${emailFromAddress}>`,
        to: emailRecipient1,
        subject: `🔔 New Lead: ${data.name} - TopVolk Construction`,
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
          from: `TopVolk Construction <${emailFromAddress}>`,
          to: emailRecipient2,
          subject: `🔔 New Lead: ${data.name} - TopVolk Construction`,
          html: getLeadNotificationHTML(data),
          text: getLeadNotificationText(data),
        }).then(() => {
          console.log(`[EMAIL] Sent to ${emailRecipient2}`);
        })
      )
    );
  }

  // Owner notification counts as delivered if at least one owner email succeeds.
  const ownerResults = await Promise.allSettled(ownerEmails);
  const ownerOk = ownerResults.some((r) => r.status === 'fulfilled');
  ownerResults.forEach((r) => {
    if (r.status === 'rejected') console.error('[EMAIL] Error:', r.reason);
  });

  // Send confirmation email to customer (only if email provided).
  // This ack does NOT count toward delivery success.
  if (data.email) {
    try {
      await delay(1000);
      await resend.emails.send({
        from: `TopVolk Construction <${emailFromAddress}>`,
        to: data.email,
        subject: '✅ Your Service Request - TopVolk Construction',
        html: getCustomerConfirmationHTML(data.name),
        text: getCustomerConfirmationText(data.name),
      });
      console.log(`[EMAIL] Confirmation sent to customer: ${data.email}`);
    } catch (ackError) {
      console.error('[EMAIL] Confirmation error:', ackError);
    }
  }

  return ownerOk;
}

export async function POST(request: NextRequest) {
  try {
    const data: LeadData = await request.json();

    // Validate required fields (email is optional)
    if (!data.name || !data.phone) {
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
      email: data.email || '',
      message: data.message || '',
      service: data.service || '',
      source: 'website',
      timestamp: new Date().toISOString(),
      recaptchaScore: recaptchaScore,
      url: request.headers.get('referer') || 'unknown',
    };

    // Send to n8n webhook for processing
    const webhookUrl = process.env.N8N_WEBHOOK_URL;
    let n8nOk = false;
    if (webhookUrl) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(leadPayload),
        });
        n8nOk = n8nRes.ok;
        if (!n8nRes.ok) {
          console.error('[N8N] Webhook error:', n8nRes.status);
        }
      } catch (n8nError) {
        console.error('[N8N] Webhook error:', n8nError);
      }
    }

    // ============================================
    // Send notifications: Email + Telegram (in parallel) + PG archive
    // ============================================

    const notificationData = {
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      message: data.message,
      service: data.service,
      source: 'Website - TopVolk Construction',
      url: leadPayload.url,
      timestamp: leadPayload.timestamp,
    };

    // Send email and Telegram in parallel; archive to PG best-effort alongside.
    const [emailResult, tgResult, pgResult] = await Promise.allSettled([
      sendEmails(notificationData),
      sendTelegram(notificationData),
      insertLead(request, data),
    ]);

    const emailOk = emailResult.status === 'fulfilled' && emailResult.value;
    const tgOk = tgResult.status === 'fulfilled' && tgResult.value;
    if (emailResult.status === 'rejected') {
      console.error('[EMAIL] Error:', emailResult.reason);
    }
    if (tgResult.status === 'rejected') {
      console.error('[TELEGRAM] Error:', tgResult.reason);
    }
    if (pgResult.status === 'rejected') {
      console.error('pg insert failed:', pgResult.reason);
    }

    // Lead is "delivered" if any delivery channel (n8n / owner email / Telegram)
    // reached its destination. PG is best-effort archive and does not count.
    // The customer ack email also does not count.
    if (!n8nOk && !emailOk && !tgOk) {
      return NextResponse.json(
        { error: 'Notification delivery failed' },
        { status: 502 }
      );
    }

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




