import { Router } from "express";
import { body } from "express-validator";
import validate from "../middleware/validate.js";
import { register, login, me } from "../controllers/auth.controller.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();

r.post("/register",
  body("name").isString().isLength({ min: 2 }),
  body("email").isEmail(),
  body("password").isLength({ min: 6 }),
  validate,
  register
);

r.post("/login",
  body("email").isEmail(),
  body("password").isString(),
  validate,
  login
);

r.get("/me", requireAuth, me);

export default r;
