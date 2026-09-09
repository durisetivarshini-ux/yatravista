import express from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// 1. Public: Get Provider Profile by User ID (Includes hosted active listings)
router.get("/:id", (req, res) => {
  try {
    const user = db.prepare("SELECT id, name, avatar_url, role FROM users WHERE id = ?").get(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Provider not found." });
    }

    const profile = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(req.params.id);

    // Get public approved listings hosted by this provider
    const listingsRows = db.prepare(`
      SELECT l.*, d.name as destination_name, d.state as destination_state
      FROM listings l
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      WHERE l.provider_id = ? AND l.status = 'approved'
      ORDER BY l.created_at DESC
    `).all(req.params.id);

    const listings = listingsRows.map(l => ({
      ...l,
      gallery: l.gallery ? JSON.parse(l.gallery) : [],
      amenities: l.amenities ? JSON.parse(l.amenities) : [],
      highlights: l.highlights ? JSON.parse(l.highlights) : []
    }));

    const providerData = {
      id: user.id,
      name: user.name,
      avatar_url: user.avatar_url,
      business_name: profile?.business_name || user.name,
      tagline: profile?.tagline || "Local Heritage Host & Artisan Guide",
      bio: profile?.bio || "Committed to authentic local travel and preserving Indian cultural traditions.",
      location: profile?.location || "India",
      languages: profile?.languages ? JSON.parse(profile.languages) : ["English", "Hindi"],
      services: profile?.services_offered ? JSON.parse(profile.services_offered) : ["Local Experiences"],
      verified_status: profile?.verified_status || "approved",
      public_phone: profile?.public_phone,
      public_email: profile?.public_email,
      is_demo: 1,
      listings
    };

    res.json({ provider: providerData });
  } catch (err) {
    console.error("Error fetching provider profile:", err);
    res.status(500).json({ error: "Failed to fetch provider profile." });
  }
});

// 2. Provider: Update Own Profile Settings
router.put("/profile", requireAuth, requireRole("provider", "admin"), (req, res) => {
  try {
    const {
      business_name,
      tagline,
      bio,
      location,
      languages,
      services_offered,
      public_phone,
      public_email
    } = req.body;

    const existing = db.prepare("SELECT * FROM provider_profiles WHERE user_id = ?").get(req.user.id);

    if (existing) {
      const update = db.prepare(`
        UPDATE provider_profiles SET
          business_name = COALESCE(?, business_name),
          tagline = COALESCE(?, tagline),
          bio = COALESCE(?, bio),
          location = COALESCE(?, location),
          languages = COALESCE(?, languages),
          services_offered = COALESCE(?, services_offered),
          public_phone = COALESCE(?, public_phone),
          public_email = COALESCE(?, public_email)
        WHERE user_id = ?
      `);

      update.run(
        business_name,
        tagline,
        bio,
        location,
        languages ? JSON.stringify(languages) : null,
        services_offered ? JSON.stringify(services_offered) : null,
        public_phone,
        public_email,
        req.user.id
      );
    } else {
      const insert = db.prepare(`
        INSERT INTO provider_profiles (
          user_id, business_name, tagline, bio, location, languages, services_offered,
          verified_status, is_demo, public_phone, public_email
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'approved', 1, ?, ?)
      `);

      insert.run(
        req.user.id,
        business_name || req.user.name,
        tagline || "",
        bio || "",
        location || "India",
        JSON.stringify(languages || ["English", "Hindi"]),
        JSON.stringify(services_offered || ["Local Experiences"]),
        public_phone || null,
        public_email || req.user.email
      );
    }

    res.json({ message: "Provider profile updated successfully." });
  } catch (err) {
    console.error("Error updating provider profile:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});

export default router;
