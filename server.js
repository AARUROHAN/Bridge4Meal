const express = require('express');
const cors = require('cors');
const { sendMail } = require('./server-email');  // Correct import

const app = express();
app.use(cors());
app.use(express.json());

// In-memory store
const db = { partners: [], workers: [], messages: [] };

// Example: Partner form submit
app.post('/api/partners', async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db.partners.push(item);

  try {
    await sendMail('bridge4meal@gmail.com', 'New Partner Signup', JSON.stringify(item));
    res.json({ success: true, data: item });
  } catch(err) {
    res.status(500).send('Email failed: ' + err.message);
  }
});

// Example: Worker form submit
app.post('/api/workers', async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db.workers.push(item);

  try {
    await sendMail('bridge4meal@gmail.com', 'New Worker Signup', JSON.stringify(item));
    res.json({ success: true, data: item });
  } catch(err) {
    res.status(500).send('Email failed: ' + err.message);
  }
});

// Example: Message form submit
app.post('/api/messages', async (req, res) => {
  const item = { id: Date.now(), ...req.body };
  db.messages.push(item);

  try {
    await sendMail('bridge4meal@gmail.com', 'New Message', JSON.stringify(item));
    res.json({ success: true, data: item });
  } catch(err) {
    res.status(500).send('Email failed: ' + err.message);
  }
});

const PORT = process.env.PORT || 8800;
app.listen(PORT, () => console.log('Bridge4Meal API running on http://localhost:' + PORT));
