import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Item from '../models/Item.js';

const router = express.Router();

// --- MULTER CONFIGURATION ---
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // This ensures the folder exists
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) { fs.mkdirSync(dir); }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// 1. CREATE: Add item
router.post('/add', upload.array('images', 5), async (req, res) => {
    try {
        const imagePaths = req.files.map(file => `/uploads/${file.filename}`);
        const newItem = new Item({ ...req.body, images: imagePaths });
        const savedItem = await newItem.save();
        res.status(201).json({ success: true, data: savedItem });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
});

// 2. READ ALL + Filtering
router.get('/all', async (req, res) => {
    try {
        const { category } = req.query;
        let query = {};
        if (category) query.category = category;
        const items = await Item.find(query).sort({ createdAt: -1 });
        res.status(200).json({ success: true, count: items.length, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 3. SEARCH
router.get('/search/:keyword', async (req, res) => {
    try {
        const items = await Item.find({
            title: { $regex: req.params.keyword, $options: 'i' }
        });
        res.status(200).json({ success: true, data: items });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// 4. DELETE
router.delete('/delete/:id', async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) return res.status(404).json({ success: false, message: "Item not found" });

        item.images.forEach(imagePath => {
            const fileName = imagePath.split('/').pop();
            const fullPath = path.join(process.cwd(), 'uploads', fileName);
            if (fs.existsSync(fullPath)) { fs.unlinkSync(fullPath); }
        });

        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: "Item deleted" });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

export default router;