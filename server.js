require('dotenv').config(); // Load .env variables
const express = require('express');
const cors = require('cors');
const { sendMail } = require('./server-email'); // Email handler

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store (replace with DB in future)
const db = { partners: [], workers: [], messages: [] };

// Helper function to handle submissions
const handleSubmit = (type) => async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db[type].push(item);

  try {
    await sendMail(process.env.ADMIN_EMAIL, `New ${type.slice(0, -1)} Signup`, JSON.stringify(item, null, 2));
    res.json({ success: true, data: item });
  } catch(err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
};

// Routes
app.post('/api/partners', handleSubmit('partners'));
app.post('/api/workers', handleSubmit('workers'));
app.post('/api/messages', handleSubmit('messages'));

// Root route
app.get('/', (req, res) => res.send('Bridge4Meal API is running.'));

// Start server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`Bridge4Meal API running on http://localhost:${PORT}`));
