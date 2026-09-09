import express from "express";
import { db } from "../db.js";
import { requireAuth, requireRole, optionalAuth } from "../middleware/auth.js";

const router = express.Router();

// 1. Public: Get Listings with filter by category (stay, tour, workshop), destination, price
router.get("/", optionalAuth, (req, res) => {
  try {
    const { category, destination, minPrice, maxPrice, providerId } = req.query;

    let query = `
      SELECT l.*, 
             u.name as provider_name, 
             u.avatar_url as provider_avatar,
             pp.business_name, 
             pp.verified_status as provider_verified_status,
             pp.tagline as provider_tagline,
             d.name as destination_name,
             d.state as destination_state
      FROM listings l
      JOIN users u ON l.provider_id = u.id
      LEFT JOIN provider_profiles pp ON l.provider_id = pp.user_id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      WHERE 1=1
    `;
    const params = [];

    // If provider is requesting own listings, allow viewing drafts/paused
    if (providerId) {
      query += " AND l.provider_id = ?";
      params.push(providerId);
    } else {
      // General public only sees approved active listings
      query += " AND l.status = 'approved'";
    }

    if (category) {
      query += " AND l.category = ?";
      params.push(category);
    }

    if (destination) {
      query += " AND l.destination_slug = ?";
      params.push(destination);
    }

    if (minPrice) {
      query += " AND l.price >= ?";
      params.push(Number(minPrice));
    }

    if (maxPrice) {
      query += " AND l.price <= ?";
      params.push(Number(maxPrice));
    }

    query += " ORDER BY l.created_at DESC";

    const rows = db.prepare(query).all(...params);

    const listings = rows.map(r => ({
      ...r,
      gallery: r.gallery ? JSON.parse(r.gallery) : [],
      amenities: r.amenities ? JSON.parse(r.amenities) : [],
      highlights: r.highlights ? JSON.parse(r.highlights) : []
    }));

    res.json({ listings, count: listings.length });
  } catch (err) {
    console.error("Error fetching listings:", err);
    res.status(500).json({ error: "Failed to fetch listings." });
  }
});

// 2. Public: Get Single Listing by ID with Full Provider Context
router.get("/:id", (req, res) => {
  try {
    const query = `
      SELECT l.*, 
             u.name as provider_name, 
             u.avatar_url as provider_avatar,
             pp.business_name, 
             pp.tagline as provider_tagline,
             pp.bio as provider_bio,
             pp.location as provider_location,
             pp.languages as provider_languages,
             pp.services_offered as provider_services,
             pp.verified_status as provider_verified_status,
             pp.public_phone,
             pp.public_email,
             d.name as destination_name,
             d.state as destination_state,
             d.daily_budget_estimate
      FROM listings l
      JOIN users u ON l.provider_id = u.id
      LEFT JOIN provider_profiles pp ON l.provider_id = pp.user_id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      WHERE l.id = ?
    `;

    const row = db.prepare(query).get(req.params.id);
    if (!row) {
      return res.status(404).json({ error: "Listing not found." });
    }

    const listing = {
      ...row,
      gallery: row.gallery ? JSON.parse(row.gallery) : [],
      amenities: row.amenities ? JSON.parse(row.amenities) : [],
      highlights: row.highlights ? JSON.parse(row.highlights) : [],
      provider: {
        id: row.provider_id,
        name: row.provider_name,
        avatar_url: row.provider_avatar,
        business_name: row.business_name || row.provider_name,
        tagline: row.provider_tagline,
        bio: row.provider_bio,
        location: row.provider_location,
        languages: row.provider_languages ? JSON.parse(row.provider_languages) : ["English", "Hindi"],
        services: row.provider_services ? JSON.parse(row.provider_services) : ["Local Experiences"],
        verified_status: row.provider_verified_status || "approved",
        public_phone: row.public_phone,
        public_email: row.public_email,
        is_demo: 1
      }
    };

    res.json({ listing });
  } catch (err) {
    console.error("Error fetching listing:", err);
    res.status(500).json({ error: "Failed to fetch listing details." });
  }
});

// 3. Provider: Create New Listing (Draft or Submit for Approval)
router.post("/", requireAuth, requireRole("provider", "admin"), (req, res) => {
  try {
    const {
      destination_slug,
      category,
      title,
      tagline,
      price,
      price_unit = "per_night",
      capacity = 2,
      max_rooms = 1,
      address,
      description,
      image,
      gallery = [],
      amenities = [],
      highlights = [],
      cancellation_policy,
      status = "pending_review"
    } = req.body;

    if (!destination_slug || !category || !title || !price || !description || !image) {
      return res.status(400).json({ error: "Missing required listing fields." });
    }

    const id = `lst-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const providerId = req.user.id;

    const insert = db.prepare(`
      INSERT INTO listings (
        id, provider_id, destination_slug, category, title, tagline, price, price_unit,
        capacity, max_rooms, address, description, image, gallery, amenities, highlights,
        cancellation_policy, status, is_demo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      providerId,
      destination_slug,
      category,
      title,
      tagline || "",
      Number(price),
      price_unit,
      Number(capacity),
      Number(max_rooms || 1),
      address || "",
      description,
      image,
      JSON.stringify(gallery),
      JSON.stringify(amenities),
      JSON.stringify(highlights),
      cancellation_policy || "Free cancellation up to 48 hours prior to start/check-in.",
      status,
      1
    );

    res.status(201).json({
      message: status === "draft" ? "Listing saved as draft." : "Listing submitted for approval.",
      id
    });
  } catch (err) {
    console.error("Error creating listing:", err);
    res.status(500).json({ error: "Failed to create listing." });
  }
});

// 4. Provider: Update Own Listing
router.put("/:id", requireAuth, requireRole("provider", "admin"), (req, res) => {
  try {
    const listing = db.prepare("SELECT * FROM listings WHERE id = ?").get(req.params.id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found." });
    }

    // Security guard: Provider can only edit own listings (admin can edit any)
    if (req.user.role !== "admin" && listing.provider_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized: You can only edit your own listings." });
    }

    const {
      title,
      tagline,
      price,
      price_unit,
      capacity,
      max_rooms,
      address,
      description,
      image,
      amenities,
      highlights,
      cancellation_policy,
      status
    } = req.body;

    const update = db.prepare(`
      UPDATE listings SET
        title = COALESCE(?, title),
        tagline = COALESCE(?, tagline),
        price = COALESCE(?, price),
        price_unit = COALESCE(?, price_unit),
        capacity = COALESCE(?, capacity),
        max_rooms = COALESCE(?, max_rooms),
        address = COALESCE(?, address),
        description = COALESCE(?, description),
        image = COALESCE(?, image),
        amenities = COALESCE(?, amenities),
        highlights = COALESCE(?, highlights),
        cancellation_policy = COALESCE(?, cancellation_policy),
        status = COALESCE(?, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      title,
      tagline,
      price ? Number(price) : null,
      price_unit,
      capacity ? Number(capacity) : null,
      max_rooms ? Number(max_rooms) : null,
      address,
      description,
      image,
      amenities ? JSON.stringify(amenities) : null,
      highlights ? JSON.stringify(highlights) : null,
      cancellation_policy,
      status,
      req.params.id
    );

    res.json({ message: "Listing updated successfully." });
  } catch (err) {
    console.error("Error updating listing:", err);
    res.status(500).json({ error: "Failed to update listing." });
  }
});

// 5. Admin: Moderation Action (Approve / Reject / Pause Listing)
router.patch("/:id/status", requireAuth, requireRole("admin"), (req, res) => {
  try {
    const { status, rejection_reason } = req.body;
    if (!["approved", "rejected", "paused", "pending_review"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const update = db.prepare(`
      UPDATE listings SET
        status = ?,
        rejection_reason = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(status, rejection_reason || null, req.params.id);

    res.json({ message: `Listing marked as ${status}.` });
  } catch (err) {
    console.error("Error updating listing status:", err);
    res.status(500).json({ error: "Failed to update listing status." });
  }
});

export default router;
