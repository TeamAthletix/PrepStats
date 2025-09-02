// backend/routes/admin/sendAll.js

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function sendAllAssets(req, res) {
  const assetPath = path.join(__dirname, '../../render/templates/playerGraphic.html');
  const recipients = req.body.recipients; // Array of email addresses

  if (!Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({ error: 'No recipients provided' });
  }

  fs.readFile(assetPath, 'utf8', async (err, html) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to load asset template' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDER_EMAIL,
        pass: process.env.SENDER_PASS
      }
    });

    try {
      for (const email of recipients) {
        await transporter.sendMail({
          from: process.env.SENDER_EMAIL,
          to: email,
          subject: 'PrepStats Asset Delivery',
          html
        });
      }

      res.status(200).json({ status: 'Assets sent successfully' });
    } catch (sendErr) {
      res.status(500).json({ error: 'Failed to send assets', details: sendErr.message });
    }
  });
}

module.exports = { sendAllAssets };
