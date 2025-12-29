import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    images: [{ type: String }], // Array to store multiple file paths
    contactInfo: { type: String, required: true }, // WhatsApp or Phone
    sellerId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Item = mongoose.model('Item', itemSchema);
export default Item;