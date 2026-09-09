import express from "express";
import bcrypt from "bcryptjs";
import { db } from "../db.js";
import { generateToken, requireAuth } from "../middleware/auth.js";

const router = express.Router();

// 1. Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  const user = db.prepare("SELECT * FROM users WHERE LOWER(email) = LOWER(?)").get(email);
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const isMatch = bcrypt.compareSync(password, user.password_hash);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password." });
  }

  const token = generateToken(user);
  
  // Also fetch provider profile if role is provider
  let providerProfile = null;
  if (user.role === "provider") {
    providerProfile = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(user.id);
  }

  res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
      phone: user.phone
    },
    providerProfile
  });
});

// 2. Demo Fast Login Switcher (for Hackathon Evaluation & Testing)
router.post("/demo-login", (req, res) => {
  const { role = "traveller" } = req.body;
  const user = db.prepare("SELECT * FROM users WHERE role = ? LIMIT 1").get(role);
  
  if (!user) {
    return res.status(404).json({ error: `No seeded demo account found for role '${role}'.` });
  }

  const token = generateToken(user);
  let providerProfile = null;
  if (user.role === "provider") {
    providerProfile = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(user.id);
  }

  res.json({
    message: `Switched to Demo ${role.toUpperCase()} successfully`,
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar_url: user.avatar_url,
      phone: user.phone
    },
    providerProfile
  });
});

// 3. Register (Traveller or Provider Application)
router.post("/register", (req, res) => {
  const { 
    name, 
    email, 
    password, 
    role = "traveller", 
    phone,
    businessName,
    tagline,
    bio,
    location,
    services
  } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Name, email, and password are required." });
  }

  // Security guard: Public registration CANNOT create admin
  if (role === "admin") {
    return res.status(403).json({ error: "Admin accounts cannot be self-registered." });
  }

  const existing = db.prepare("SELECT id FROM users WHERE LOWER(email) = LOWER(?)").get(email);
  if (existing) {
    return res.status(400).json({ error: "An account with this email already exists." });
  }

  const id = `usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const salt = bcrypt.genSaltSync(10);
  const passwordHash = bcrypt.hashSync(password, salt);
  const avatarUrl = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(name)}`;

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role, avatar_url, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(id, name, email, passwordHash, role, avatarUrl, phone || null);

  // If registering as provider, create provider profile application
  if (role === "provider") {
    const insertProvider = db.prepare(`
      INSERT INTO provider_profiles (
        user_id, business_name, tagline, bio, location, languages, services_offered,
        verified_status, is_demo, public_phone, public_email, approval_notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insertProvider.run(
      id,
      businessName || `${name}'s Travel Services`,
      tagline || "Local verified hospitality provider",
      bio || "Dedicated local guide & host offering authentic regional experiences.",
      location || "India",
      JSON.stringify(["English", "Hindi"]),
      JSON.stringify(services || ["Heritage Stays", "Guided Tours"]),
      "approved", // Auto-approved for frictionless demo testing
      0,
      phone || null,
      email,
      "Self-registered host profile."
    );
  }

  const user = { id, name, email, role, avatar_url: avatarUrl, phone };
  const token = generateToken(user);

  res.status(201).json({
    message: "Registration successful",
    token,
    user
  });
});

// 4. Current User Session Verification
router.get("/me", requireAuth, (req, res) => {
  let providerProfile = null;
  if (req.user.role === "provider") {
    providerProfile = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(req.user.id);
  }

  res.json({
    user: req.user,
    providerProfile
  });
});

export default router;
