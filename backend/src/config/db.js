// src/config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const uri = process.env.MONGO_URI;
if (!uri) throw new Error('Missing MONGO_URI in .env');

mongoose.set('strictQuery', true);

async function connectWithRetry() {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    console.log('Retrying in 5s...');
    setTimeout(connectWithRetry, 5000);
  }
}
connectWithRetry();