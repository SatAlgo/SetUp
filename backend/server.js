import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// Serve uploads folder as static
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/KitUpDB')
    .then(() => console.log("✅ KitUp Backend: Local MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Base route for Health Check
app.get('/', (req, res) => {
    res.send("🚀 KitUp Backend API is running...");
});

// Use Item Routes
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server at http://localhost:${PORT}`));