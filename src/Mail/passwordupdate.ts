// src/utils/mailTemplates/passwordUpdated.ts

export const passwordUpdated = (email: string, name: string): string => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Techaio | Password Updated</title>
    <style>
      body {
        background-color: #f4f9f9;
        font-family: 'Roboto', Arial, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #2d2d2d;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border: 1px solid #e0f2f1;
        border-radius: 10px;
        box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
        padding: 30px;
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #009688;
      }
      .logo {
        max-width: 160px;
        margin-bottom: 10px;
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: #009688;
        margin-top: 10px;
      }
      .body {
        margin: 25px 0;
        font-size: 15px;
        color: #444;
      }
      .highlight {
        font-weight: bold;
        color: #009688;
      }
      .warning {
        margin-top: 20px;
        padding: 12px;
        background-color: #fff3cd;
        border: 1px solid #ffeeba;
        border-radius: 6px;
        font-size: 14px;
        color: #856404;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 13px;
        color: #666;
      }
      .footer a {
        color: #009688;
        text-decoration: none;
        font-weight: 500;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <a href="https://techaio.com">
          <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Techaio Logo" />
        </a>
        <div class="title">Password Successfully Updated</div>
      </div>
      <div class="body">
        <p>Hello <strong>${name}</strong>,</p>
        <p>This is to confirm that your password has been successfully updated for the account linked with <span class="highlight">${email}</span>.</p>
        <div class="warning">
          ⚠️ If you did not request this password change, please reset your password immediately or contact our support team.
        </div>
      </div>
      <div class="footer">
        Need assistance? Reach out at <a href="mailto:support@techaio.com">support@techaio.com</a>.
      </div>
    </div>
  </body>
  </html>`;
};
