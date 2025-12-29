import { validationResult } from "express-validator";
export default function validate(req, res, next) {
  const result = validationResult(req);
  if (result.isEmpty()) return next();
  return res.status(400).json({ errors: result.array() });
}
