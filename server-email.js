// server-email.js
const nodemailer = require('nodemailer');

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bridge4meal@gmail.com',        // Yahan apna Gmail dalna
    pass: 'yvzp zyoc jlgd lbjv'          // Yahan Gmail App Password dalna
  }
});

// Function to send email
async function sendMail(to, subject, text) {
  return transporter.sendMail({
    from: 'bridge4meal@gmail.com',
    to,
    subject,
    text
  });
}

// Correctly export karo
module.exports = { sendMail };
