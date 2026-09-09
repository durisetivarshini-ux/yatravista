import express from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// 1. Get all destinations with search, region, state, interest filters & sorting
router.get("/", (req, res) => {
  try {
    const { 
      q, 
      region, 
      state, 
      interest, 
      sortBy = "popular", 
      limit = 100, 
      offset = 0 
    } = req.query;

    let query = "SELECT * FROM destinations WHERE 1=1";
    const params = [];

    if (q) {
      query += ` AND (
        LOWER(name) LIKE ? OR 
        LOWER(state) LIKE ? OR 
        LOWER(tagline) LIKE ? OR 
        LOWER(short_description) LIKE ? OR
        LOWER(attractions) LIKE ?
      )`;
      const searchPattern = `%${q.toLowerCase()}%`;
      params.push(searchPattern, searchPattern, searchPattern, searchPattern, searchPattern);
    }

    if (region && region !== "All") {
      query += " AND LOWER(region) = LOWER(?)";
      params.push(region);
    }

    if (state && state !== "All") {
      query += " AND LOWER(state) = LOWER(?)";
      params.push(state);
    }

    if (interest && interest !== "All") {
      query += " AND LOWER(travel_interests) LIKE ?";
      params.push(`%${interest.toLowerCase()}%`);
    }

    // Sorting
    if (sortBy === "budget_low") {
      query += " ORDER BY daily_budget_estimate ASC";
    } else if (sortBy === "budget_high") {
      query += " ORDER BY daily_budget_estimate DESC";
    } else if (sortBy === "name_asc") {
      query += " ORDER BY name ASC";
    } else {
      // Default: curated insertion order
      query += " ORDER BY rowid ASC";
    }

    query += " LIMIT ? OFFSET ?";
    params.push(Number(limit), Number(offset));

    const rows = db.prepare(query).all(...params);

    // Parse JSON fields
    const destinations = rows.map(row => ({
      ...row,
      gallery: row.gallery ? JSON.parse(row.gallery) : [],
      travel_interests: row.travel_interests ? JSON.parse(row.travel_interests) : [],
      travelInterests: row.travel_interests ? JSON.parse(row.travel_interests) : [],
      attractions: row.attractions ? JSON.parse(row.attractions) : [],
      coordinates: row.coordinates ? JSON.parse(row.coordinates) : null,
      heroImage: row.hero_image,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      suggestedDuration: row.suggested_duration,
      dailyBudgetEstimate: row.daily_budget_estimate,
      bestSeason: row.best_season,
      idealFor: row.ideal_for
    }));

    const totalCount = db.prepare("SELECT COUNT(*) as count FROM destinations").get().count;

    res.json({
      destinations,
      total: totalCount,
      count: destinations.length
    });
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).json({ error: "Failed to fetch destinations." });
  }
});

// 2. Get Single Destination by Slug
router.get("/:slug", (req, res) => {
  try {
    const row = db.prepare("SELECT * FROM destinations WHERE slug = ?").get(req.params.slug);
    if (!row) {
      return res.status(404).json({ error: "Destination not found." });
    }

    // Fetch related active listings for this destination
    const listingsRows = db.prepare(`
      SELECT l.*, u.name as provider_name, pp.business_name, pp.verified_status
      FROM listings l
      JOIN users u ON l.provider_id = u.id
      LEFT JOIN provider_profiles pp ON l.provider_id = pp.user_id
      WHERE l.destination_slug = ? AND l.status = 'approved'
    `).all(req.params.slug);

    const listings = listingsRows.map(l => ({
      ...l,
      gallery: l.gallery ? JSON.parse(l.gallery) : [],
      amenities: l.amenities ? JSON.parse(l.amenities) : [],
      highlights: l.highlights ? JSON.parse(l.highlights) : []
    }));

    const destination = {
      ...row,
      gallery: row.gallery ? JSON.parse(row.gallery) : [],
      travel_interests: row.travel_interests ? JSON.parse(row.travel_interests) : [],
      travelInterests: row.travel_interests ? JSON.parse(row.travel_interests) : [],
      attractions: row.attractions ? JSON.parse(row.attractions) : [],
      coordinates: row.coordinates ? JSON.parse(row.coordinates) : null,
      heroImage: row.hero_image,
      shortDescription: row.short_description,
      fullDescription: row.full_description,
      suggestedDuration: row.suggested_duration,
      dailyBudgetEstimate: row.daily_budget_estimate,
      bestSeason: row.best_season,
      idealFor: row.ideal_for,
      listings
    };

    res.json({ destination });
  } catch (err) {
    console.error("Error fetching destination:", err);
    res.status(500).json({ error: "Failed to fetch destination details." });
  }
});

// 3. Admin: Create Destination
router.post("/", requireAuth, requireRole("admin"), (req, res) => {
  try {
    const dest = req.body;
    const id = `dest-${Date.now()}`;
    const slug = dest.slug || dest.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");

    const insert = db.prepare(`
      INSERT INTO destinations (
        id, slug, name, state, region, tagline, short_description, full_description,
        hero_image, gallery, travel_interests, suggested_duration, daily_budget_estimate,
        best_season, ideal_for, attractions, coordinates
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    insert.run(
      id,
      slug,
      dest.name,
      dest.state,
      dest.region || "North",
      dest.tagline || "",
      dest.short_description || dest.shortDescription || "",
      dest.full_description || dest.fullDescription || "",
      dest.hero_image || dest.heroImage || "",
      JSON.stringify(dest.gallery || []),
      JSON.stringify(dest.travel_interests || dest.travelInterests || []),
      dest.suggested_duration || dest.suggestedDuration || "3 Days",
      Number(dest.daily_budget_estimate || dest.dailyBudgetEstimate || 3000),
      dest.best_season || dest.bestSeason || "October to March",
      dest.ideal_for || dest.idealFor || "Culture seekers",
      JSON.stringify(dest.attractions || []),
      JSON.stringify(dest.coordinates || null)
    );

    res.status(201).json({ message: "Destination created successfully", id, slug });
  } catch (err) {
    console.error("Error creating destination:", err);
    res.status(500).json({ error: "Failed to create destination." });
  }
});

export default router;
