import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "Missing auth header" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Malformed auth header" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload; // { id, email }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
