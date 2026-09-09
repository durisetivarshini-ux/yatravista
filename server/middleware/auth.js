import jwt from "jsonwebtoken";
import { db } from "../db.js";

const JWT_SECRET = process.env.JWT_SECRET || "yatravista_sih_2026_super_secret_jwt_key_98234";

export function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// Authentication verification middleware
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authentication required. No valid authorization header." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    // Fetch fresh user record
    const user = db.prepare("SELECT id, name, email, role, avatar_url, phone FROM users WHERE id = ?").get(decoded.id);
    if (!user) {
      return res.status(401).json({ error: "User session is invalid or user no longer exists." });
    }
    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token. Please log in again." });
  }
}

// Role-based authorization middleware
export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required." });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: `Access forbidden: Requires one of [${allowedRoles.join(", ")}] roles. Your role is '${req.user.role}'.` 
      });
    }
    next();
  };
}

// Optional Auth (for public routes that customize response if logged in)
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = db.prepare("SELECT id, name, email, role, avatar_url FROM users WHERE id = ?").get(decoded.id);
      if (user) req.user = user;
    } catch {
      // Ignore token decode error for optional auth
    }
  }
  next();
}
