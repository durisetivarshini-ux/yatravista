import express from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// Admin Only Guard
router.use(requireAuth, requireRole("admin"));

// 1. Platform Real Database Stats
router.get("/stats", (req, res) => {
  try {
    const usersCount = db.prepare("SELECT COUNT(*) as count FROM users").get().count;
    const travellersCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'traveller'").get().count;
    const providersCount = db.prepare("SELECT COUNT(*) as count FROM users WHERE role = 'provider'").get().count;
    const destinationsCount = db.prepare("SELECT COUNT(*) as count FROM destinations").get().count;
    
    const listingsStats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'pending_review' THEN 1 ELSE 0 END) as pending_review,
        SUM(CASE WHEN status = 'paused' THEN 1 ELSE 0 END) as paused
      FROM listings
    `).get();

    const bookingsStats = db.prepare(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN booking_status = 'confirmed' THEN 1 ELSE 0 END) as confirmed,
        SUM(CASE WHEN booking_status = 'pending' THEN 1 ELSE 0 END) as pending,
        SUM(CASE WHEN booking_status = 'cancelled' THEN 1 ELSE 0 END) as cancelled,
        SUM(CASE WHEN booking_status = 'confirmed' THEN total_amount ELSE 0 END) as confirmed_volume
      FROM bookings
    `).get();

    res.json({
      stats: {
        users: { total: usersCount, travellers: travellersCount, providers: providersCount },
        destinations: destinationsCount,
        listings: listingsStats,
        bookings: bookingsStats
      }
    });
  } catch (err) {
    console.error("Error fetching admin stats:", err);
    res.status(500).json({ error: "Failed to fetch platform statistics." });
  }
});

// 2. Listing Moderation Queue
router.get("/listings-queue", (req, res) => {
  try {
    const { status = "pending_review" } = req.query;

    let query = `
      SELECT l.*, 
             u.name as provider_name, 
             u.email as provider_email,
             pp.business_name,
             d.name as destination_name,
             d.state as destination_state
      FROM listings l
      JOIN users u ON l.provider_id = u.id
      LEFT JOIN provider_profiles pp ON l.provider_id = pp.user_id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
    `;

    if (status !== "all") {
      query += " WHERE l.status = ?";
      const rows = db.prepare(query + " ORDER BY l.created_at DESC").all(status);
      res.json({ listings: rows });
    } else {
      const rows = db.prepare(query + " ORDER BY l.created_at DESC").all();
      res.json({ listings: rows });
    }
  } catch (err) {
    console.error("Error fetching listings queue:", err);
    res.status(500).json({ error: "Failed to fetch listings moderation queue." });
  }
});

// 3. Provider Applications Queue
router.get("/provider-applications", (req, res) => {
  try {
    const query = `
      SELECT pp.*, u.name, u.email, u.avatar_url, u.created_at as registered_at
      FROM provider_profiles pp
      JOIN users u ON pp.user_id = u.id
      ORDER BY pp.created_at DESC
    `;
    const rows = db.prepare(query).all();

    const applications = rows.map(r => ({
      ...r,
      languages: r.languages ? JSON.parse(r.languages) : [],
      services_offered: r.services_offered ? JSON.parse(r.services_offered) : []
    }));

    res.json({ applications });
  } catch (err) {
    console.error("Error fetching provider applications:", err);
    res.status(500).json({ error: "Failed to fetch provider applications." });
  }
});

// 4. Moderate Provider Application (Approve / Reject)
router.patch("/provider-applications/:userId", (req, res) => {
  try {
    const { status, approval_notes } = req.body;
    if (!["approved", "rejected", "pending"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value." });
    }

    const update = db.prepare(`
      UPDATE provider_profiles SET
        verified_status = ?,
        approval_notes = ?,
        created_at = CURRENT_TIMESTAMP
      WHERE user_id = ?
    `);

    update.run(status, approval_notes || null, req.params.userId);

    res.json({ message: `Provider status updated to '${status}'.` });
  } catch (err) {
    console.error("Error updating provider application:", err);
    res.status(500).json({ error: "Failed to update provider status." });
  }
});

// 5. Global Bookings Audit View
router.get("/bookings", (req, res) => {
  try {
    const { status, destinationSlug } = req.query;

    let query = `
      SELECT b.*, 
             l.title as listing_title, 
             l.category as listing_category,
             d.name as destination_name,
             u_traveller.name as traveller_name,
             u_traveller.email as traveller_email,
             u_provider.name as provider_name,
             pp.business_name as provider_business_name
      FROM bookings b
      JOIN listings l ON b.listing_id = l.id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      JOIN users u_traveller ON b.traveller_id = u_traveller.id
      JOIN users u_provider ON b.provider_id = u_provider.id
      LEFT JOIN provider_profiles pp ON b.provider_id = pp.user_id
      WHERE 1=1
    `;
    const params = [];

    if (status && status !== "all") {
      query += " AND b.booking_status = ?";
      params.push(status);
    }

    if (destinationSlug) {
      query += " AND l.destination_slug = ?";
      params.push(destinationSlug);
    }

    query += " ORDER BY b.created_at DESC";

    const rows = db.prepare(query).all(...params);

    const bookings = rows.map(r => ({
      ...r,
      price_snapshot: r.price_snapshot ? JSON.parse(r.price_snapshot) : null
    }));

    res.json({ bookings, count: bookings.length });
  } catch (err) {
    console.error("Error fetching admin bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// 6. Platform Audit Log
router.get("/audit-logs", (req, res) => {
  try {
    const logs = db.prepare(`
      SELECT a.*, u.name as user_name, u.role as user_role
      FROM audit_logs a
      LEFT JOIN users u ON a.user_id = u.id
      ORDER BY a.timestamp DESC
      LIMIT 100
    `).all();

    res.json({ logs });
  } catch (err) {
    console.error("Error fetching audit logs:", err);
    res.status(500).json({ error: "Failed to fetch audit logs." });
  }
});

export default router;
