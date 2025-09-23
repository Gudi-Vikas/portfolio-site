import jwt from "jsonwebtoken";

export function verifyAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    const secret = process.env.JWT_SECRET;
    const payload = jwt.verify(token, secret);
    if (!payload || payload.role !== "admin") {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    req.admin = payload;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}


