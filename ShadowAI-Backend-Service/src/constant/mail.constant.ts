export const getAccountDeactivateTemplate = (
  username: string,
  email: string,
  role: string
): { html: string; text: string } => {
  const esc = (s: string) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeUser = esc(username);
  const safeEmail = esc(email);
  const safeRole = esc(role);

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Account Deactivated</title>
    <style>
      /* Basic reset for email clients */
      body,table,td{margin:0;padding:0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;}
      img{border:0;display:block;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
      a{text-decoration:none;}

      /* Container */
      .email-wrap{width:100%;background:#f5f7fb;padding:30px 12px;}
      .email-body{max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(20,30,50,0.06);}
      .p-28{padding:28px;}

      /* Header with subtle animation (degrades gracefully) */
      .brand {
        display:flex;align-items:center;gap:12px;
      }
      .logo {
        width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#5b8cff,#00c2a8);
        display:inline-block;flex-shrink:0;
        /* simple pulse animation for supporting clients */
        animation: pulse 4s ease-in-out infinite;
      }
      @keyframes pulse {
        0%{transform:scale(1);opacity:1}
        50%{transform:scale(1.06);opacity:.95}
        100%{transform:scale(1);opacity:1}
      }

      h1{font-size:20px;margin:8px 0 0 0;color:#102a43;}
      p{color:#41556b;line-height:1.5;margin:14px 0;font-size:15px;}

      .info {
        background:#f1f6ff;border:1px solid #e6efff;padding:12px;border-radius:8px;font-size:13px;color:#173e8a;margin:16px 0;
      }

      .cta {
        display:inline-block;padding:12px 18px;border-radius:10px;background:#0b75db;color:#fff;font-weight:600;
        text-decoration:none;margin-top:10px;border:1px solid rgba(11,117,219,0.15);
      }
      /* small footer */
      .footer{font-size:12px;color:#94a3b8;padding:18px;text-align:center;background:#fbfdff;border-top:1px solid #f0f4ff;}
      .meta {font-size:13px;color:#6b7280;margin-top:8px;}

      /* mobile */
      @media only screen and (max-width:480px){
        .p-28{padding:18px;}
        h1{font-size:18px;}
      }
    </style>
  </head>
  <body>
    <center class="email-wrap">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table role="presentation" class="email-body" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="p-28">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding-bottom:14px;">
                        <div class="brand" style="display:flex;align-items:center;gap:12px;">
                          <div class="logo" aria-hidden="true"></div>
                          <div>
                            <div style="font-size:14px;color:#0b3b66;font-weight:700;">Shadow AI</div>
                            <div style="font-size:12px;color:#7b8ba1;">Account Notification</div>
                          </div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <h1>Account deactivated</h1>
                        <p>Hi <strong>${safeUser}</strong>,</p>
                        <p>
                          We wanted to let you know that the account associated with
                          <strong>${safeEmail}</strong> (${safeRole}) has been <strong>deactivated</strong> in our system.
                        </p>

                        <div class="info">
                          <div><strong>Reason:</strong> Your account has been deactivated as part of account cleanup / security policy.</div>
                          <div class="meta">Deactivation date: <strong>${new Date().toLocaleString()}</strong></div>
                        </div>

                        <p>
                          If you believe this is a mistake or you need access restored, please contact our support team and include your account email above. We'll review and respond as soon as possible.
                        </p>

                        <p style="margin-top:18px;">
                          <a href="mailto:support@yourcompany.com" class="cta">Contact Support</a>
                        </p>

                        <hr style="border:none;border-top:1px solid #f0f4ff;margin:22px 0;" />

                        <p style="font-size:13px;color:#6b7280;">
                          For your security, data access related to this account is paused. If you request reactivation we may require identity verification.
                        </p>

                        <p style="font-size:13px;color:#6b7280;margin-top:6px;">
                          If you'd like a record of this notice, please save this email.
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style="padding-top:18px;">
                        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="font-size:13px;color:#62748a;">
                              <strong>Account</strong><br/>
                              ${safeUser} • ${safeEmail}<br/>
                              Role: ${safeRole}
                            </td>
                            <td align="right" style="font-size:13px;color:#94a3b8;">
                              <div>Need help?</div>
                              <div style="margin-top:6px;"><a href="https://yourcompany.com/help" style="color:#0b75db;">Help center</a></div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

              <tr>
                <td class="footer">
                  © ${new Date().getFullYear()} ShadowAI<br/>
                  This is an automated message — please do not reply to this email.
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>
  `;

  const text = `
Account deactivated

Hi ${safeUser},

The account associated with ${safeEmail} (${safeRole}) has been deactivated.

Reason: Account deactivated as part of account cleanup/security policy.
Deactivation date: ${new Date().toLocaleString()}

If you believe this is a mistake or need access restored, please contact support@yourcompany.com

-- ShadowAI
`;

  return { html, text };
};

export const getAccountActivateTemplate = (
  username: string,
  email: string,
  role: string,
  activationLink: string
): { html: string; text: string } => {
  const esc = (s: string) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");

  const safeUser = esc(username);
  const safeEmail = esc(email);
  const safeRole = esc(role);
  const safeLink = esc(activationLink);

  const html = `
  <!doctype html>
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Activate Your Account</title>
    <style>
      body,table,td{margin:0;padding:0;font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;}
      img{border:0;display:block;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;}
      a{text-decoration:none;}

      .email-wrap{width:100%;background:#f5f7fb;padding:30px 12px;}
      .email-body{max-width:680px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 6px 18px rgba(20,30,50,0.06);}
      .p-28{padding:28px;}

      .brand {display:flex;align-items:center;gap:12px;}
      .logo {
        width:56px;height:56px;border-radius:12px;background:linear-gradient(135deg,#34d399,#059669);
        animation: pulse 4s ease-in-out infinite;
      }
      @keyframes pulse {
        0%{transform:scale(1);opacity:1}
        50%{transform:scale(1.06);opacity:.95}
        100%{transform:scale(1);opacity:1}
      }

      h1{font-size:20px;margin:8px 0 0 0;color:#102a43;}
      p{color:#41556b;line-height:1.5;margin:14px 0;font-size:15px;}

      .cta {
        display:inline-block;padding:14px 22px;border-radius:10px;background:#10b981;color:#fff;font-weight:600;
        text-decoration:none;margin-top:20px;border:1px solid rgba(16,185,129,0.2);
      }

      .footer{font-size:12px;color:#94a3b8;padding:18px;text-align:center;background:#fbfdff;border-top:1px solid #f0f4ff;}
      @media only screen and (max-width:480px){.p-28{padding:18px;}h1{font-size:18px;}}
    </style>
  </head>
  <body>
    <center class="email-wrap">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table role="presentation" class="email-body" width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="p-28">
                  <div class="brand">
                    <div class="logo"></div>
                    <div>
                      <div style="font-size:14px;color:#0b3b66;font-weight:700;">Shadow AI</div>
                      <div style="font-size:12px;color:#7b8ba1;">Account Activation</div>
                    </div>
                  </div>

                  <h1>Welcome, ${safeUser}!</h1>
                  <p>
                    The account associated with <strong>${safeEmail}</strong> (${safeRole}) has been created.  
                    To start using it, please activate your account.
                  </p>

                  <p style="text-align:center;">
                    <a href="${safeLink}" class="cta">Activate Account</a>
                  </p>

                  <p>If the button above doesn’t work, copy and paste this link into your browser:</p>
                  <p style="word-break:break-all;font-size:13px;color:#2563eb;">${safeLink}</p>

                  <p style="font-size:13px;color:#6b7280;margin-top:20px;">
                    This activation link will expire in 24 hours for security reasons.
                  </p>
                </td>
              </tr>

              <tr>
                <td class="footer">
                  © ${new Date().getFullYear()} Shadow AI. 123 <br/>
                  This is an automated message — please do not reply to this email.
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </center>
  </body>
  </html>
  `;

  const text = `
Activate Your Account

Welcome, ${safeUser}!

The account associated with ${safeEmail} (${safeRole}) has been created.
To start using it, please activate your account:

${safeLink}

This link will expire in 24 hours.
-- Shadow AI
`;

  return { html, text };
};
