import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import { createAnnouncement, listAnnouncements } from "../controllers/announcement.controller.js";

const r = Router();

r.get("/", listAnnouncements);

r.post("/",
  requireAuth, requireRole("admin"),
  body("title").isString().isLength({ min: 4 }),
  body("body").isString().isLength({ min: 10 }),
  validate,
  createAnnouncement
);

export default r;
