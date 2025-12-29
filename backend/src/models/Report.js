import mongoose from "mongoose";

const pointSchema = new mongoose.Schema({
  type: { type: String, enum: ["Point"], required: true, default: "Point" },
  coordinates: { type: [Number], required: true }
}, { _id: false });

const commentSchema = new mongoose.Schema({
  by: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, maxlength: 800 },
  at: { type: Date, default: Date.now }
}, { _id: true });

const reportSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 120 },
  description: { type: String, required: true, maxlength: 4000 },
  category: { type: String, enum: ["Road","Electricity","Water","Sanitation","Safety","Other"], default: "Other" },
  status: { type: String, enum: ["open","in_progress","resolved","rejected"], default: "open" },
  location: { type: pointSchema, index: "2dsphere" },
  address: String,
  photos: [String],
  upvotes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [commentSchema],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

reportSchema.index({ title: "text", description: "text", address: "text" });

export default mongoose.model("Report", reportSchema);
