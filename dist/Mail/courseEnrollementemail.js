"use strict";
// interface courseDetails {
//     courseName : string,
//     name : string,
// }
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseEnrollmentEmail = void 0;
// {courseName, name} : courseDetails
const courseEnrollmentEmail = (courseName, name) => {
    return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Welcome to Teachio 🎉</title>
      <style>
          body {
              background: #f9f9ff;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 16px;
              line-height: 1.6;
              color: #2c2c54;
              margin: 0;
              padding: 0;
          }

          .container {
              max-width: 620px;
              margin: 40px auto;
              background: #ffffff;
              border-radius: 12px;
              box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
              padding: 30px;
              text-align: center;
          }

          .logo {
              max-width: 160px;
              margin-bottom: 20px;
          }

          .title {
              font-size: 22px;
              font-weight: 700;
              color: #6c5ce7;
              margin-bottom: 20px;
          }

          .body {
              font-size: 16px;
              color: #333;
              margin-bottom: 25px;
          }

          .cta {
              display: inline-block;
              padding: 12px 28px;
              background: linear-gradient(135deg, #6c5ce7, #a29bfe);
              color: #fff;
              text-decoration: none;
              border-radius: 8px;
              font-size: 16px;
              font-weight: 600;
              margin-top: 10px;
              transition: all 0.3s ease;
          }

          .cta:hover {
              background: linear-gradient(135deg, #5a4ad1, #9087ff);
          }

          .support {
              font-size: 14px;
              color: #7f8c8d;
              margin-top: 25px;
          }

          .highlight {
              font-weight: 600;
              color: #6c5ce7;
          }
      </style>
  </head>
  
  <body>
      <div class="container">
          <a href="https://teachio.com"><img class="logo" src="https://i.ibb.co/hyRbH1z/teachio-logo.png"
                  alt="Teachio Logo"></a>
          <div class="title">🎓 You’re officially enrolled!</div>
          <div class="body">
              <p>Hi ${name},</p>
              <p>Welcome aboard! You’ve successfully joined the course <span class="highlight">"${courseName}"</span>.</p>
              <p>Your learning journey starts here — dive into the dashboard and begin exploring your lessons today.</p>
              <a class="cta" href="https://teachio.com/dashboard">Go to Dashboard</a>
          </div>
          <div class="support">Need help? Contact us anytime at <a
                  href="mailto:support@teachio.com">support@teachio.com</a>. We’re here for you 💜</div>
      </div>
  </body>
  
  </html>`;
};
exports.courseEnrollmentEmail = courseEnrollmentEmail;
