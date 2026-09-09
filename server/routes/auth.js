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
      phone: user.phone,
      home_city: user.home_city,
      preferred_language: user.preferred_language || 'English',
      travel_interests: user.travel_interests ? JSON.parse(user.travel_interests) : [],
      wishlist: user.wishlist ? JSON.parse(user.wishlist) : []
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
      phone: user.phone,
      home_city: user.home_city,
      preferred_language: user.preferred_language || 'English',
      travel_interests: user.travel_interests ? JSON.parse(user.travel_interests) : [],
      wishlist: user.wishlist ? JSON.parse(user.wishlist) : []
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
    home_city,
    preferred_language = "English",
    travel_interests = [],
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
    INSERT INTO users (id, name, email, password_hash, role, avatar_url, phone, home_city, preferred_language, travel_interests, wishlist)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertUser.run(
    id,
    name,
    email,
    passwordHash,
    role,
    avatarUrl,
    phone || null,
    home_city || null,
    preferred_language,
    JSON.stringify(travel_interests || []),
    JSON.stringify([])
  );

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

  const user = {
    id,
    name,
    email,
    role,
    avatar_url: avatarUrl,
    phone,
    home_city: home_city || null,
    preferred_language,
    travel_interests: travel_interests || [],
    wishlist: []
  };
  const token = generateToken(user);

  res.status(201).json({
    message: "Registration successful",
    token,
    user
  });
});

// 4. Current User Session Verification
router.get("/me", requireAuth, (req, res) => {
  const userRecord = db.prepare("SELECT * FROM users WHERE id = ?").get(req.user.id);
  if (!userRecord) {
    return res.status(404).json({ error: "User not found." });
  }

  let providerProfile = null;
  if (userRecord.role === "provider") {
    providerProfile = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(userRecord.id);
  }

  res.json({
    user: {
      id: userRecord.id,
      name: userRecord.name,
      email: userRecord.email,
      role: userRecord.role,
      avatar_url: userRecord.avatar_url,
      phone: userRecord.phone,
      home_city: userRecord.home_city,
      preferred_language: userRecord.preferred_language || 'English',
      travel_interests: userRecord.travel_interests ? JSON.parse(userRecord.travel_interests) : [],
      wishlist: userRecord.wishlist ? JSON.parse(userRecord.wishlist) : []
    },
    providerProfile
  });
});

// 5. Update Profile (Authenticated user updating their own profile)
router.put("/profile", requireAuth, (req, res) => {
  const { name, phone, home_city, preferred_language, travel_interests, avatar_url } = req.body;
  const userId = req.user.id;

  db.prepare(`
    UPDATE users 
    SET name = COALESCE(?, name),
        phone = COALESCE(?, phone),
        home_city = COALESCE(?, home_city),
        preferred_language = COALESCE(?, preferred_language),
        travel_interests = COALESCE(?, travel_interests),
        avatar_url = COALESCE(?, avatar_url)
    WHERE id = ?
  `).run(
    name || null,
    phone || null,
    home_city || null,
    preferred_language || null,
    travel_interests ? JSON.stringify(travel_interests) : null,
    avatar_url || null,
    userId
  );

  const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);

  res.json({
    message: "Profile updated successfully",
    user: {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatar_url: updatedUser.avatar_url,
      phone: updatedUser.phone,
      home_city: updatedUser.home_city,
      preferred_language: updatedUser.preferred_language || 'English',
      travel_interests: updatedUser.travel_interests ? JSON.parse(updatedUser.travel_interests) : [],
      wishlist: updatedUser.wishlist ? JSON.parse(updatedUser.wishlist) : []
    }
  });
});

// 6. Toggle Wishlist Item
router.post("/wishlist/toggle", requireAuth, (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).json({ error: "itemId is required." });
  }

  const user = db.prepare("SELECT wishlist FROM users WHERE id = ?").get(req.user.id);
  let list = user && user.wishlist ? JSON.parse(user.wishlist) : [];

  if (list.includes(itemId)) {
    list = list.filter(id => id !== itemId);
  } else {
    list.push(itemId);
  }

  db.prepare("UPDATE users SET wishlist = ? WHERE id = ?").run(JSON.stringify(list), req.user.id);

  res.json({
    message: "Wishlist updated",
    wishlist: list
  });
});

export default router;
