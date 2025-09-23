import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body || {};
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;
  if (username !== adminUser || password !== adminPass) {
    return res.status(401).json({ success: false, message: "Invalid credentials" });
  }
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  const token = jwt.sign({ role: "admin", username }, secret, { expiresIn: "7d" });
  return res.json({ success: true, token });
});

export default router;


