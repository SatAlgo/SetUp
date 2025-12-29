import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({ name, email, password });
    const token = generateToken(user);
    res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = generateToken(user);
    res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
  } catch (e) { next(e); }
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ user });
}
