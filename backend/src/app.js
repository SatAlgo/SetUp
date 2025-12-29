import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "node:path";
import { fileURLToPath } from "node:url";
import "./config/db.js";

import authRoutes from "./routes/auth.routes.js";
import reportRoutes from "./routes/report.routes.js";
import announcementRoutes from "./routes/announcement.routes.js";

import errorHandler from "./middleware/error.js";

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN?.split(",") ?? "*", credentials: true }));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.use("/api/auth", authRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/announcements", announcementRoutes);

app.use(errorHandler);

export default app;
