import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// HTML email template (unchanged)
const createEmailTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nilesh-Somani.Dev</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap');
    body { margin: 0; padding: 0; background-color: #000; color: #fff; font-family: 'Space Mono', monospace; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; background-color: rgba(0,0,0,0.9); }
    .header { color: #00b4d8; font-size: 24px; font-weight: bold; margin-bottom: 20px; }
    .content-box { background-color: rgba(0,0,0,0.8); border: 2px solid #00b4d8; margin: 20px; padding: 20px; border-radius: 8px; }
    .mission-divider { width: 60px; height: 2px; background-color: #00b4d8; margin: 15px 0; }
    .mission-details { background-color: #111; border: 1px solid #333; padding: 15px; margin: 15px 0; border-radius: 4px; font-family: 'Courier New', monospace; }
    .highlight { color: #00b4d8; font-weight: bold; }
    .footer-console { background-color: #000; border-top: 2px solid #00b4d8; padding: 15px 20px; font-size: 12px; color: #666; text-align: center; }
    .social-links a { color: #00b4d8; text-decoration: none; margin: 0 10px; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="content-box">${content}</div>
    <div class="footer-console">
      <div style="color:#00b4d8;">[SYSTEM]</div>
      <div style="margin:5px 0;">Transmission Origin: Nilesh-Somani.Dev Console</div>
      <div style="color:#00b4d8;">BUILD ${new Date().getFullYear()}.10.22</div>
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
  const visitorContent = `
    <div class="header">Mission Acknowledged</div>
    <div class="mission-divider"></div>
    <div class="mission-details">
      <div><strong>Pilot Name:</strong> ${name}</div>
      <div><strong>Mission Subject:</strong> ${subject || 'No Subject'}</div>
      <div><strong>Mission Brief:</strong> ${message.replace(/\n/g, '<br>')}</div>
    </div>
    <div class="mission-divider"></div>
    <div style="text-align:center;">Thank you for your transmission, <span class="highlight">${name}</span>! We'll respond soon.</div>
  `;

  const adminContent = `
    <div class="header">New Mission Brief Received</div>
    <div class="mission-divider"></div>
    <div class="mission-details">
      <div><strong>Pilot Name:</strong> ${name}</div>
      <div><strong>Email:</strong> ${email}</div>
      <div><strong>Subject:</strong> ${subject || 'No Subject'}</div>
      <div><strong>Message:</strong> ${message.replace(/\n/g, '<br>')}</div>
    </div>
  `;

  const visitorMailOptions = {
    to: email,
    from: 'somanin408@gmail.com', // Verified sender in SendGrid
    subject: `[MISSION RECEIVED] Re: ${subject || 'New Contact'}`,
    html: createEmailTemplate(visitorContent)
  };

  const adminMailOptions = {
    to: 'somanin408@gmail.com',
    from: 'somanin408@gmail.com',
    replyTo: email,
    subject: `[NEW MISSION] ${subject || 'New Contact'} - from ${name}`,
    html: createEmailTemplate(adminContent)
  };

  try {
    await sgMail.send(visitorMailOptions);
    await sgMail.send(adminMailOptions);
    return { success: true, message: 'Thank you! Your message has been sent.' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Failed to send email. Please try again later.' };
  }
};
