import fs from "node:fs";
import path from "node:path";
import Report from "../models/Report.js";

export async function createReport(req, res, next) {
  try {
    const { title, description, category, lat, lng, address } = req.body;
    const photos = (req.files || []).map(f => `/uploads/${f.filename}`);
    const doc = await Report.create({
      title, description, category,
      location: (lat && lng) ? { type: "Point", coordinates: [Number(lng), Number(lat)] } : undefined,
      address, photos, createdBy: req.user.id
    });
    req.app.get("io").emit("report:created", { id: doc._id, title: doc.title, status: doc.status });
    res.status(201).json({ report: doc });
  } catch (e) { next(e); }
}

export async function listReports(req, res, next) {
  try {
    const { status, category, q, near, radius = 2000 } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (category) filter.category = category;
    if (q) filter.$text = { $search: q };
    if (near) {
      const [lat, lng] = near.split(",").map(Number);
      filter.location = {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: Number(radius)
        }
      };
    }
    const data = await Report.find(filter).sort("-createdAt").limit(200);
    res.json({ data });
  } catch (e) { next(e); }
}

export async function getReport(req, res, next) {
  try {
    const doc = await Report.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    res.json({ report: doc });
  } catch (e) { next(e); }
}

export async function updateReport(req, res, next) {
  try {
    const doc = await Report.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    if (doc.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const { title, description, category, lat, lng, address } = req.body;
    if (title) doc.title = title;
    if (description) doc.description = description;
    if (category) doc.category = category;
    if (address) doc.address = address;
    if (lat && lng) doc.location = { type: "Point", coordinates: [Number(lng), Number(lat)] };
    if (req.files?.length) doc.photos.push(...req.files.map(f => `/uploads/${f.filename}`));
    await doc.save();
    req.app.get("io").emit("report:updated", { id: doc._id, status: doc.status });
    res.json({ report: doc });
  } catch (e) { next(e); }
}

export async function changeStatus(req, res, next) {
  try {
    const doc = await Report.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    doc.status = req.body.status;
    await doc.save();
    req.app.get("io").emit("report:updated", { id: doc._id, status: doc.status });
    res.json({ report: doc });
  } catch (e) { next(e); }
}

export async function upvote(req, res, next) {
  try {
    const doc = await Report.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    const uid = req.user.id;
    const i = doc.upvotes.findIndex(u => u.toString() === uid);
    if (i === -1) { doc.upvotes.push(uid); } else { doc.upvotes.splice(i, 1); }
    await doc.save();
    res.json({ upvotes: doc.upvotes.length, voted: i === -1 });
  } catch (e) { next(e); }
}

export async function comment(req, res, next) {
  try {
    const doc = await Report.findById(req.params.id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    doc.comments.push({ by: req.user.id, text: req.body.text });
    await doc.save();
    res.json({ comments: doc.comments });
  } catch (e) { next(e); }
}

export async function deletePhoto(req, res, next) {
  try {
    const { id, idx } = req.params;
    const doc = await Report.findById(id);
    if (!doc) return res.status(404).json({ message: "Not found" });
    if (doc.createdBy.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    const photo = doc.photos[Number(idx)];
    if (!photo) return res.status(404).json({ message: "Photo not found" });
    const local = photo.startsWith("/uploads/") ? path.join(process.cwd(), "src", photo) : null;
    if (local && fs.existsSync(local)) fs.unlinkSync(local);
    doc.photos.splice(Number(idx), 1);
    await doc.save();
    res.json({ photos: doc.photos });
  } catch (e) { next(e); }
}
