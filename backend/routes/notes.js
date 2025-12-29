import express from "express";
import Note from "../models/Note.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, body } = req.body;
    const note = new Note({ user: req.user.id, title, body });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Read all for user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Read one
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json(note);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    if (!note) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
