require('dotenv').config();
const nodemailer = require('nodemailer');

// Gmail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // .env me store karo
    pass: process.env.EMAIL_PASS  // .env me store karo (App Password)
  }
});

// Function to send email
async function sendMail(to, subject, text) {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text
  });
}

module.exports = { sendMail };
