import express from 'express';
import cors from 'cors';
import { sendEmail } from './emailService.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['https://nilesh-somani.onrender.com'], // Your frontend Render domain
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Nilesh-Somani.Dev server running' });
});

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields.'
      });
    }

    const result = await sendEmail({ name, email, subject, message });
    res.json(result);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request.'
    });
  }
});

app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
