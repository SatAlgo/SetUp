import { Router } from "express";
import multer from "multer";
import { body, param, query } from "express-validator";
import validate from "../middleware/validate.js";
import { requireAuth, requireRole } from "../middleware/auth.js";
import {
  createReport, listReports, getReport, updateReport,
  changeStatus, upvote, comment, deletePhoto
} from "../controllers/report.controller.js";

const upload = multer({
  dest: "src/uploads/",
  limits: { fileSize: 5 * 1024 * 1024, files: 5 }
});

const r = Router();

r.post("/",
  requireAuth,
  upload.array("photos", 5),
  body("title").isString().isLength({ min: 5 }),
  body("description").isString().isLength({ min: 10 }),
  body("category").optional().isString(),
  body("lat").optional().isFloat({ min: -90, max: 90 }),
  body("lng").optional().isFloat({ min: -180, max: 180 }),
  validate,
  createReport
);

r.get("/",
  query("status").optional().isIn(["open","in_progress","resolved","rejected"]),
  query("near").optional().matches(/^[-\d.]+,[-\d.]+$/),
  query("radius").optional().isInt({ min: 10, max: 50000 }),
  validate,
  listReports
);

r.get("/:id", param("id").isMongoId(), validate, getReport);

r.patch("/:id",
  requireAuth,
  upload.array("photos", 5),
  param("id").isMongoId(),
  validate,
  updateReport
);

r.patch("/:id/status",
  requireAuth, requireRole("admin"),
  param("id").isMongoId(),
  body("status").isIn(["open","in_progress","resolved","rejected"]),
  validate,
  changeStatus
);

r.post("/:id/upvote", requireAuth, param("id").isMongoId(), validate, upvote);

r.post("/:id/comment",
  requireAuth,
  param("id").isMongoId(),
  body("text").isString().isLength({ min: 1 }),
  validate,
  comment
);

r.delete("/:id/photo/:idx",
  requireAuth,
  param("id").isMongoId(),
  param("idx").isInt({ min: 0 }),
  validate,
  deletePhoto
);

export default r;
