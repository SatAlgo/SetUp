import Announcement from "../models/Announcement.js";

export async function createAnnouncement(req, res, next) {
  try {
    const { title, body, visibleFrom, visibleTo } = req.body;
    const doc = await Announcement.create({
      title, body, visibleFrom, visibleTo, createdBy: req.user.id
    });
    res.status(201).json({ announcement: doc });
  } catch (e) { next(e); }
}

export async function listAnnouncements(_req, res, next) {
  try {
    const now = new Date();
    const data = await Announcement.find({
      $and: [
        { $or: [{ visibleFrom: { $exists: false } }, { visibleFrom: { $lte: now } }] },
        { $or: [{ visibleTo: { $exists: false } }, { visibleTo: { $gte: now } }] }
      ]
    }).sort("-createdAt");
    res.json({ data });
  } catch (e) { next(e); }
}
