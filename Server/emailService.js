import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// HTML email template matching portfolio's cyberpunk console theme
const createEmailTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nilesh-Somani.Dev</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #000000;
      color: #ffffff;
      font-family: 'Space Mono', monospace;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: rgba(0, 0, 0, 0.9);
    }
    .header {
      color: #00b4d8;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .content-box {
      background-color: rgba(0, 0, 0, 0.8);
      border: 2px solid #00b4d8;
      margin: 20px;
      padding: 20px;
      border-radius: 8px;
    }
    .mission-header {
      color: #00b4d8;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      text-transform: uppercase;
    }
    .mission-divider {
      width: 60px;
      height: 2px;
      background-color: #00b4d8;
      margin: 15px 0;
    }
    .mission-details {
      background-color: #111111;
      border: 1px solid #333;
      padding: 15px;
      margin: 15px 0;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
    }
    .highlight {
      color: #00b4d8;
      font-weight: bold;
    }
    .status-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      background-color: #00b4d8;
      border-radius: 50%;
      margin-right: 8px;
      animation: blink 1.5s infinite;
    }
    .footer-console {
      background-color: #000000;
      border-top: 2px solid #00b4d8;
      padding: 15px 20px;
      font-size: 12px;
      color: #666;
      text-align: center;
    }
    .social-links {
      margin-top: 15px;
    }
    .social-links a {
      color: #00b4d8;
      text-decoration: none;
      margin: 0 10px;
      font-size: 14px;
    }
    @keyframes blink {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    .label {
      color: #00b4d8;
      font-size: 14px;
      font-weight: bold;
      margin-bottom: 5px;
      text-transform: uppercase;
    }
    .value {
      color: #ffffff;
      background-color: #1a1a1a;
      padding: 8px 12px;
      border-radius: 4px;
      font-family: 'Courier New', monospace;
      margin-bottom: 10px;
      border: 1px solid #333;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="content-box">
      ${content}
    </div>
    <div class="footer-console">
      <div style="color: #00b4d8;">[SYSTEM]</div>
      <div style="margin: 5px 0;">Transmission Origin: Nilesh-Somani.Dev Console</div>
      <div style="color: #00b4d8;">BUILD ${new Date().getFullYear()}.10.22</div>
      <div class="social-links">
        <a href="https://github.com/nilesh-somani">[GITHUB]</a>
        <a href="https://linkedin.com/in/nileshsomani">[LINKEDIN]</a>
        <a href="https://www.youtube.com/@nileshsomani">[YOUTUBE]</a>
      </div>
    </div>
  </div>
</body>
</html>
`;

export const sendEmail = async ({ name, email, subject, message }) => {
  // Email to the visitor
  const visitorContent = `
    <div class="header">Mission Acknowledged</div>
    <div class="mission-divider"></div>
    
    <div class="mission-details">
      <div style="margin-bottom: 15px;">
        <div class="label">Pilot Name</div>
        <div class="value">${name}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <div class="label">Mission Subject</div>
        <div class="value">${subject || 'No Subject'}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <div class="label">Mission Brief</div>
        <div class="value">${message.replace(/\\n/g, '<br>')}</div>
      </div>
    </div>

    <div class="mission-divider"></div>
    
    <div class="mission-details" style="text-align: center;">
      <p>Thank you for your transmission, <span class="highlight">${name}</span>!</p>
      <p>Your message has been received. We'll respond as soon as possible.</p>
    </div>
    
    <div style="color: #666; font-size: 12px; text-align: center; margin-top: 20px;">
      This is an automated response. Please do not reply to this transmission.
    </div>
  `;

  const visitorMailOptions = {
    from: '"Nilesh-Somani.Dev Console" <somanimaster@gmail.com>',
    to: email,
    subject: `[MISSION RECEIVED] Re: ${subject || 'New Contact'}`,
    html: createEmailTemplate(visitorContent)
  };

  // Email to the admin
  const adminContent = `
    <div class="header">New Mission Brief Received</div>
    <div class="mission-divider"></div>

    <div class="mission-details">
      <div style="margin-bottom: 15px;">
        <div class="label">Pilot Name</div>
        <div class="value">${name}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <div class="label">Commander Email</div>
        <div class="value">${email}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <div class="label">Mission Subject</div>
        <div class="value">${subject || 'No Subject'}</div>
      </div>

      <div style="margin-bottom: 15px;">
        <div class="label">Mission Brief</div>
        <div class="value">${message.replace(/\\n/g, '<br>')}</div>
      </div>
    </div>

    <div class="mission-divider"></div>
    <div style="color: #666; font-size: 12px; text-align: center;">
      Reply directly to this email to respond to the pilot.
    </div>
  `;

  const adminMailOptions = {
    from: '"Nilesh-Somani.Dev Console" <somanimaster@gmail.com>',
    to: 'somanin408@gmail.com',
    replyTo: email,
    subject: `[NEW MISSION] ${subject || 'New Contact'} - from ${name}`,
    html: createEmailTemplate(adminContent)
  };

  try {
    await transporter.sendMail(visitorMailOptions);
    await transporter.sendMail(adminMailOptions);
    return { success: true, message: 'Thank you! Your message has been sent.' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
};