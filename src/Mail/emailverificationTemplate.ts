// src/utils/mailTemplates/otpTemplate.ts

export const otpTemplate = (otp: string): string => {
  return `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Techaio | OTP Verification</title>
    <style>
      body {
        background: linear-gradient(135deg, #1a73e8, #6a11cb);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 15px;
        line-height: 1.6;
        color: #333;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background: #ffffff;
        border-radius: 12px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        padding: 30px;
        text-align: center;
      }
      .logo {
        max-width: 180px;
        margin-bottom: 20px;
      }
      .title {
        font-size: 22px;
        font-weight: bold;
        color: #1a73e8;
        margin-bottom: 20px;
      }
      .body {
        font-size: 15px;
        color: #444;
        margin-bottom: 25px;
      }
      .otp-box {
        display: inline-block;
        font-size: 26px;
        font-weight: bold;
        color: #ffffff;
        background: #6a11cb;
        padding: 12px 30px;
        border-radius: 8px;
        letter-spacing: 4px;
        margin: 15px 0;
      }
      .cta {
        display: inline-block;
        margin-top: 25px;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        text-decoration: none;
        background-color: #1a73e8;
        color: #ffffff;
        border-radius: 6px;
      }
      .cta:hover {
        background-color: #1558b0;
      }
      .footer {
        margin-top: 30px;
        font-size: 13px;
        color: #777;
      }
      .footer a {
        color: #1a73e8;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <a href="https://techaio.com">
        <img class="logo" src="https://i.ibb.co/7Xyj3PC/logo.png" alt="Techaio Logo" />
      </a>
      <div class="title">OTP Verification</div>
      <div class="body">
        <p>Hello,</p>
        <p>
          Thank you for signing up with <strong>Techaio</strong>. To complete your
          registration, please use the OTP below:
        </p>
        <div class="otp-box">${otp}</div>
        <p>This OTP is valid for <strong>5 minutes</strong>. If you didn’t request this verification, you can safely ignore this email.</p>
      </div>
      <a href="https://techaio.com/login" class="cta">Verify My Account</a>
      <div class="footer">
        Need help? Contact us at
        <a href="mailto:support@techaio.com">support@techaio.com</a>
      </div>
    </div>
  </body>
  </html>`;
};
