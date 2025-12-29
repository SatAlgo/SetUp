import mongoose from "mongoose";
const announcementSchema = new mongoose.Schema({
  title: { type: String, required: true, maxlength: 160 },
  body: { type: String, required: true, maxlength: 6000 },
  visibleFrom: Date,
  visibleTo: Date,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export default mongoose.model("Announcement", announcementSchema);
