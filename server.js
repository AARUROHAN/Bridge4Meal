require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sendMail } = require('./server-email');

const app = express();
app.use(cors({ origin: "*" })); // ✅ allow frontend
app.use(express.json());

// In-memory store
const db = { partners: [], workers: [], messages: [] };

const handleSubmit = (type) => async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db[type].push(item);

  try {
    // disable email easily
    if (process.env.DISABLE_EMAIL === "true") {
      return res.json({ success: true, data: item, email: "disabled" });
    }

    await sendMail(
      process.env.ADMIN_EMAIL,
      `New ${type.slice(0, -1)} Signup`,
      JSON.stringify(item, null, 2)
    );
    res.json({ success: true, data: item });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Email failed', error: err.message });
  }
};

app.post('/api/partners', handleSubmit('partners'));
app.post('/api/workers', handleSubmit('workers'));
app.post('/api/messages', handleSubmit('messages'));

app.get('/', (req, res) => res.send('Bridge4Meal API is running ✅'));

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log(`✅ Backend running on http://localhost:${PORT}`));
