const nodemailer = require('nodemailer');

module.exports = async function sendAsset(email, assetPath) {
  const transporter = nodemailer.createTransport({
    service: 'SendGrid',
    auth: {
      user: process.env.SENDGRID_USER,
      pass: process.env.SENDGRID_PASS
    }
  });

  await transporter.sendMail({
    from: 'noreply@prepstats.online',
    to: email,
    subject: 'Your PrepStats Graphic',
    attachments: [{ path: assetPath }]
  });
};
