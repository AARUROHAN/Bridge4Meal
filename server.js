require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors({ origin: "*" })); // ✅ allow frontend
app.use(express.json());

// =====================
// Nodemailer setup
// =====================
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,      // bridge4meal@gmail.com
    pass: process.env.EMAIL_PASS       // app password
  }
});

// sendMail function
const sendMail = async (userEmail, subject, text) => {
  const mailOptions = {
    from: userEmail,                     // User ka email
    to: process.env.ADMIN_EMAIL,         // Tumhara Gmail
    subject,
    text,
    replyTo: userEmail                   // Reply directly user ko
  };

  await transporter.sendMail(mailOptions);
};

// =====================
// In-memory store
// =====================
const db = { partners: [], workers: [], messages: [] };

// =====================
// Form submission handler
// =====================
const handleSubmit = (type) => async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db[type].push(item);

  try {
    if (process.env.DISABLE_EMAIL === "true") {
      return res.json({ success: true, data: item, email: "disabled" });
    }

    // Email send
    const userEmail = req.body.email || process.env.ADMIN_EMAIL; // fallback
    await sendMail(
      userEmail,
      `New ${type.slice(0, -1)} Signup`,
      JSON.stringify(item, null, 2)
    );

    res.json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
};

// =====================
// Routes
// =====================
app.post('/api/partners', handleSubmit('partners'));
app.post('/api/workers', handleSubmit('workers'));
app.post('/api/messages', handleSubmit('messages'));

app.get('/', (req, res) => res.send('Bridge4Meal API is running ✅'));

// =====================
// Start server
// =====================
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
