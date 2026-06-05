import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const SITE_URL = process.env.SITE_URL || 'https://sytautomate.com'

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  let name, email
  try {
    ;({ name, email } = JSON.parse(event.body))
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' }
  }

  if (!name || !email || !email.includes('@')) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Invalid input' }),
    }
  }

  if (!process.env.RESEND_API_KEY) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'RESEND_API_KEY environment variable is not set' }),
    }
  }

  try {
    await resend.emails.send({
      from: 'Mateusz @ SYT&Automate <kontakt@sytautomate.com>',
      to: email,
      subject: 'Your free checklist — 10 processes you can automate right now',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="margin:0;padding:0;background:#f5f0e8;font-family:'Helvetica Neue',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f0e8;padding:40px 20px;">
            <tr>
              <td align="center">
                <table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">

                  <!-- Header -->
                  <tr>
                    <td style="background:#1e1432;border-radius:16px 16px 0 0;padding:32px 40px;">
                      <p style="margin:0;font-size:22px;color:#f5f0e8;font-family:Georgia,serif;font-weight:400;">
                        SYT<span style="color:#c9aaff;">&amp;</span>Automate
                      </p>
                    </td>
                  </tr>

                  <!-- Body -->
                  <tr>
                    <td style="background:#ffffff;padding:40px;border-left:1px solid #e8e0d8;border-right:1px solid #e8e0d8;">
                      <p style="margin:0 0 8px;font-size:13px;color:#7a6e85;text-transform:uppercase;letter-spacing:.08em;font-weight:600;">
                        Your free checklist
                      </p>
                      <h1 style="margin:0 0 20px;font-size:28px;font-family:Georgia,serif;font-weight:400;color:#1a1228;line-height:1.2;">
                        Hey ${name}, here's your checklist 👋
                      </h1>
                      <p style="margin:0 0 16px;font-size:15px;color:#5a4a6a;line-height:1.7;">
                        Thanks for grabbing the checklist. Click the button below to open it — it's interactive, so you can check off the processes that apply to your business.
                      </p>
                      <p style="margin:0 0 28px;font-size:15px;color:#5a4a6a;line-height:1.7;">
                        <strong style="color:#1a1228;">If you check 3 or more items</strong> — you have a clear automation opportunity and we should talk.
                      </p>

                      <!-- CTA Button -->
                      <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                        <tr>
                          <td style="background:#6d3fd1;border-radius:100px;padding:14px 32px;">
                            <a href="${SITE_URL}/checklist?ref=email"
                               style="color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;display:block;white-space:nowrap;">
                              Open the checklist →
                            </a>
                          </td>
                        </tr>
                      </table>

                      <hr style="border:none;border-top:1px solid #ede6d8;margin:0 0 28px;" />

                      <p style="margin:0 0 12px;font-size:14px;color:#1a1228;font-weight:600;">
                        What's next?
                      </p>
                      <p style="margin:0 0 24px;font-size:14px;color:#5a4a6a;line-height:1.7;">
                        Go through the checklist, note your top 3 pain points, and if it makes sense — book a free 45-min Process Review. We'll show you exactly what can be automated and what it would save you.
                      </p>

                      <!-- Secondary CTA -->
                      <table cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="border:1px solid #d4bfff;border-radius:100px;padding:11px 24px;">
                            <a href="https://calendly.com/kontakt-sytautomate/30min"
                               style="color:#6d3fd1;text-decoration:none;font-size:14px;font-weight:500;display:block;white-space:nowrap;">
                              Book a free Process Review
                            </a>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#f5f0e8;border:1px solid #e8e0d8;border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;">
                      <p style="margin:0 0 4px;font-size:13px;color:#7a6e85;">
                        Mateusz Baranowski · SYT&amp;Automate
                      </p>
                      <p style="margin:0;font-size:12px;color:#a09090;">
                        <a href="${SITE_URL}" style="color:#a09090;">sytautomate.com</a>
                        &nbsp;·&nbsp;
                        <a href="mailto:kontakt@sytautomate.com" style="color:#a09090;">kontakt@sytautomate.com</a>
                        &nbsp;·&nbsp;
                        Your digital team, without the agency price tag.
                      </p>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    })

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    }
  } catch (err) {
    console.error('Resend error:', err)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'Failed to send email' }),
    }
  }
}
