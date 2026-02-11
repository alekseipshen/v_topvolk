// Email templates for lead notifications
import { PHONE_NUMBER, PHONE_DISPLAY, BUSINESS_NAME } from '@/lib/utils';

interface LeadEmailData {
  name: string;
  phone: string;
  email: string;
  message?: string;
  source?: string;
  url?: string;
  timestamp?: string;
}

// Email to business owners (notification about new lead)
export function getLeadNotificationHTML(data: LeadEmailData): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead - ${BUSINESS_NAME}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #334e64 0%, #4a6b82 100%); padding: 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: bold;">
                🔔 New Lead Received!
              </h1>
              <p style="margin: 10px 0 0 0; color: #dbeafe; font-size: 14px;">
                ${BUSINESS_NAME}
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333333;">
                You have a new service request from your website:
              </p>
              
              <!-- Customer Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border-left: 4px solid #334e64; border-radius: 4px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">
                      Customer Details
                    </p>
                    
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #1e293b;">
                      <strong>Name:</strong> ${data.name}
                    </p>
                    
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #1e293b;">
                      <strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #334e64; text-decoration: none;">${data.phone}</a>
                    </p>
                    
                    <p style="margin: 0 0 8px 0; font-size: 16px; color: #1e293b;">
                      <strong>Email:</strong> <a href="mailto:${data.email}" style="color: #334e64; text-decoration: none;">${data.email}</a>
                    </p>
                    
                    ${data.message ? `
                    <p style="margin: 16px 0 0 0; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 14px; color: #64748b;">
                      <strong style="color: #1e293b;">Message:</strong><br>
                      <span style="color: #334155; white-space: pre-wrap;">${data.message}</span>
                    </p>
                    ` : ''}
                  </td>
                </tr>
              </table>
              
              <!-- Meta Info -->
              ${data.source || data.url || data.timestamp ? `
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fefce8; border-radius: 4px; margin-bottom: 20px;">
                <tr>
                  <td style="padding: 15px;">
                    ${data.source ? `<p style="margin: 0 0 5px 0; font-size: 13px; color: #854d0e;"><strong>Source:</strong> ${data.source}</p>` : ''}
                    ${data.url ? `<p style="margin: 0 0 5px 0; font-size: 13px; color: #854d0e;"><strong>Page:</strong> ${data.url}</p>` : ''}
                    ${data.timestamp ? `<p style="margin: 0; font-size: 13px; color: #854d0e;"><strong>Time:</strong> ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}</p>` : ''}
                  </td>
                </tr>
              </table>
              ` : ''}
              
              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-top: 30px;">
                <tr>
                  <td align="center">
                    <a href="tel:${data.phone}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #334e64 0%, #4a6b82 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
                      📞 Call Customer Now
                    </a>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; padding-top: 20px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #64748b; text-align: center;">
                This lead was submitted via ${BUSINESS_NAME} website
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Auto-reply email to customer (confirmation)
export function getCustomerConfirmationHTML(name: string): string {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - ${BUSINESS_NAME}</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #334e64 0%, #4a6b82 100%); padding: 40px; text-align: center;">
              <h1 style="margin: 0 0 10px 0; color: #ffffff; font-size: 28px; font-weight: bold;">
                ✅ Request Received!
              </h1>
              <p style="margin: 0; color: #dbeafe; font-size: 16px;">
                We'll get back to you shortly
              </p>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 18px; color: #1e293b;">
                Hi <strong>${name}</strong>,
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #334155; line-height: 1.6;">
                Thank you for contacting <strong>${BUSINESS_NAME}</strong>! We've received your service request and one of our team members will reach out to you soon.
              </p>
              
              <!-- Info Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f0f9ff; border-left: 4px solid #334e64; border-radius: 4px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 15px 0; font-size: 15px; color: #334e64; font-weight: 600;">
                      What happens next?
                    </p>
                    <ul style="margin: 0; padding-left: 20px; color: #1e293b;">
                      <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">Our team will contact you within <strong>1 business day</strong></li>
                      <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">We'll discuss your renovation project and schedule a convenient time for an estimate</li>
                      <li style="margin-bottom: 0; font-size: 14px; line-height: 1.5;">You'll receive a detailed quote with transparent pricing</li>
                    </ul>
                  </td>
                </tr>
              </table>
              
              <!-- Contact Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #fefce8; border-radius: 6px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 14px; color: #854d0e; font-weight: 600;">
                      Need immediate assistance?
                    </p>
                    <p style="margin: 0; font-size: 20px; color: #1e293b; font-weight: bold;">
                      📞 <a href="tel:${PHONE_NUMBER}" style="color: #334e64; text-decoration: none;">${PHONE_DISPLAY}</a>
                    </p>
                  </td>
                </tr>
              </table>
              
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                Best regards,<br>
                <strong style="color: #1e293b;">${BUSINESS_NAME} Team</strong><br>
                <span style="font-size: 13px;">Professional Home Renovation in Seattle</span>
              </p>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0 0 5px 0; font-size: 12px; color: #64748b;">
                ${BUSINESS_NAME} | Professional Home Renovation
              </p>
              <p style="margin: 0; font-size: 11px; color: #94a3b8;">
                Serving Seattle, Bellevue, Tacoma & Surrounding Areas
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

// Plain text versions (fallback)
export function getLeadNotificationText(data: LeadEmailData): string {
  return `
NEW LEAD RECEIVED - ${BUSINESS_NAME}

Customer Details:
- Name: ${data.name}
- Phone: ${data.phone}
- Email: ${data.email}
${data.message ? `- Message: ${data.message}` : ''}

${data.source ? `Source: ${data.source}` : ''}
${data.url ? `Page: ${data.url}` : ''}
${data.timestamp ? `Time: ${new Date(data.timestamp).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' })}` : ''}

Call customer: ${data.phone}
  `.trim();
}

export function getCustomerConfirmationText(name: string): string {
  return `
Hi ${name},

Thank you for contacting ${BUSINESS_NAME}! We've received your service request and one of our team members will reach out to you soon.

What happens next?
- Our team will contact you within 1 business day
- We'll discuss your renovation project and schedule a convenient time for an estimate
- You'll receive a detailed quote with transparent pricing

Need immediate assistance?
Call us: ${PHONE_DISPLAY}

Best regards,
${BUSINESS_NAME} Team
Professional Home Renovation in Seattle
  `.trim();
}
