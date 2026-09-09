import express from "express";
import { db } from "../db.js";
import { requireAuth, requireRole } from "../middleware/auth.js";

const router = express.Router();

// 1. Create a New Booking Request (Traveller)
router.post("/", requireAuth, (req, res) => {
  try {
    const {
      listing_id,
      check_in_date,
      check_out_date,
      slot_time,
      guests_count = 1,
      rooms_count = 1,
      special_requests
    } = req.body;

    if (!listing_id) {
      return res.status(400).json({ error: "listing_id is required." });
    }

    // Fetch listing and provider details
    const listing = db.prepare(`
      SELECT l.*, u.name as provider_name, pp.business_name
      FROM listings l
      JOIN users u ON l.provider_id = u.id
      LEFT JOIN provider_profiles pp ON l.provider_id = pp.user_id
      WHERE l.id = ? AND l.status = 'approved'
    `).get(listing_id);

    if (!listing) {
      return res.status(404).json({ error: "Listing not found or currently not active for booking." });
    }

    // Prevent provider from booking their own listing
    if (listing.provider_id === req.user.id) {
      return res.status(400).json({ error: "You cannot book your own listing." });
    }

    // Date & Capacity Validations
    const today = new Date().toISOString().split("T")[0];
    if (listing.category === "stay") {
      if (!check_in_date || !check_out_date) {
        return res.status(400).json({ error: "Check-in and check-out dates are required for stays." });
      }
      if (check_in_date < today) {
        return res.status(400).json({ error: "Check-in date cannot be in the past." });
      }
      if (check_out_date <= check_in_date) {
        return res.status(400).json({ error: "Check-out date must be after check-in date." });
      }
      if (guests_count > (listing.capacity * (rooms_count || 1))) {
        return res.status(400).json({ 
          error: `Guest count exceeds maximum capacity of ${listing.capacity * (rooms_count || 1)} guests for ${rooms_count} room(s).` 
        });
      }
    } else {
      // Tours & Workshops
      if (!check_in_date) {
        return res.status(400).json({ error: "Experience date is required." });
      }
      if (check_in_date < today) {
        return res.status(400).json({ error: "Experience date cannot be in the past." });
      }
      if (guests_count > listing.capacity) {
        return res.status(400).json({ 
          error: `Participant count exceeds maximum session capacity of ${listing.capacity} persons.` 
        });
      }
    }

    // Price Snapshot calculation
    let calculatedSubtotal = 0;
    let units = 1;

    if (listing.category === "stay") {
      const d1 = new Date(check_in_date);
      const d2 = new Date(check_out_date);
      const nights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)));
      units = nights * (rooms_count || 1);
      calculatedSubtotal = listing.price * units;
    } else {
      units = guests_count;
      calculatedSubtotal = listing.price * units;
    }

    // Standard transparent 5% GST & Platform Demo Service Fee
    const taxesFees = Math.round(calculatedSubtotal * 0.05);
    const totalAmount = calculatedSubtotal + taxesFees;

    const priceSnapshot = JSON.stringify({
      listing_title: listing.title,
      listing_image: listing.image,
      destination_slug: listing.destination_slug,
      provider_name: listing.business_name || listing.provider_name,
      price_per_unit: listing.price,
      price_unit: listing.price_unit,
      units,
      subtotal: calculatedSubtotal,
      taxes_fees: taxesFees,
      gst_rate: "5%",
      total_amount: totalAmount,
      cancellation_policy: listing.cancellation_policy,
      special_requests: special_requests || null,
      booked_at: new Date().toISOString()
    });

    const bookingId = `bkg-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const destPrefix = listing.destination_slug.substring(0, 3).toUpperCase();
    const bookingReference = `YV-2026-${destPrefix}-${randomDigits}`;

    const insert = db.prepare(`
      INSERT INTO bookings (
        id, booking_reference, traveller_id, provider_id, listing_id, booking_type,
        check_in_date, check_out_date, slot_time, guests_count, rooms_count,
        price_per_unit, total_amount, taxes_fees, price_snapshot, booking_status,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'demo_unpaid')
    `);

    insert.run(
      bookingId,
      bookingReference,
      req.user.id,
      listing.provider_id,
      listing.id,
      listing.category,
      check_in_date,
      check_out_date || null,
      slot_time || null,
      Number(guests_count),
      Number(rooms_count || 1),
      listing.price,
      totalAmount,
      taxesFees,
      priceSnapshot
    );

    // Record Audit Log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details)
      VALUES (?, ?, 'BOOKING_CREATED', 'BOOKING', ?, ?)
    `).run(
      `aud-${Date.now()}`,
      req.user.id,
      bookingId,
      JSON.stringify({ bookingReference, totalAmount, listingTitle: listing.title })
    );

    res.status(201).json({
      message: "Booking request submitted successfully! Your request is now pending provider confirmation.",
      booking: {
        id: bookingId,
        booking_reference: bookingReference,
        status: "pending",
        total_amount: totalAmount
      }
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({ error: "Failed to submit booking request." });
  }
});

// 2. Traveller: Get Own Bookings with Filter Tabs
router.get("/my-bookings", requireAuth, (req, res) => {
  try {
    const { status } = req.query;

    let query = `
      SELECT b.*, 
             l.title as listing_title, 
             l.image as listing_image, 
             l.category as listing_category,
             l.destination_slug,
             d.name as destination_name,
             d.state as destination_state,
             u.name as provider_name,
             pp.business_name as provider_business_name,
             pp.public_phone as provider_phone,
             pp.public_email as provider_email
      FROM bookings b
      JOIN listings l ON b.listing_id = l.id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      JOIN users u ON b.provider_id = u.id
      LEFT JOIN provider_profiles pp ON b.provider_id = pp.user_id
      WHERE b.traveller_id = ?
    `;
    const params = [req.user.id];

    if (status && status !== "all") {
      query += " AND b.booking_status = ?";
      params.push(status);
    }

    query += " ORDER BY b.created_at DESC";

    const rows = db.prepare(query).all(...params);

    const bookings = rows.map(r => ({
      ...r,
      price_snapshot: r.price_snapshot ? JSON.parse(r.price_snapshot) : null
    }));

    res.json({ bookings, count: bookings.length });
  } catch (err) {
    console.error("Error fetching my bookings:", err);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
});

// 3. Provider: Get Booking Requests for Own Listings
router.get("/provider-requests", requireAuth, requireRole("provider", "admin"), (req, res) => {
  try {
    let query = `
      SELECT b.*, 
             l.title as listing_title, 
             l.image as listing_image, 
             l.destination_slug,
             d.name as destination_name,
             u.name as traveller_name,
             u.email as traveller_email,
             u.phone as traveller_phone
      FROM bookings b
      JOIN listings l ON b.listing_id = l.id
      LEFT JOIN destinations d ON l.destination_slug = d.slug
      JOIN users u ON b.traveller_id = u.id
      WHERE 1=1
    `;
    const params = [];

    // Providers only see their own listings' requests (admin can see all)
    if (req.user.role !== "admin") {
      query += " AND b.provider_id = ?";
      params.push(req.user.id);
    }

    query += " ORDER BY b.created_at DESC";

    const rows = db.prepare(query).all(...params);

    const requests = rows.map(r => ({
      ...r,
      price_snapshot: r.price_snapshot ? JSON.parse(r.price_snapshot) : null
    }));

    res.json({ requests, count: requests.length });
  } catch (err) {
    console.error("Error fetching provider requests:", err);
    res.status(500).json({ error: "Failed to fetch booking requests." });
  }
});

// 4. Provider: Accept or Decline Booking Request
router.patch("/:id/respond", requireAuth, requireRole("provider", "admin"), (req, res) => {
  try {
    const { action, provider_notes, decline_reason } = req.body;
    if (!["confirm", "decline"].includes(action)) {
      return res.status(400).json({ error: "Action must be 'confirm' or 'decline'." });
    }

    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    if (req.user.role !== "admin" && booking.provider_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized: You can only respond to your own bookings." });
    }

    if (booking.booking_status !== "pending") {
      return res.status(400).json({ error: `Cannot respond to booking that is already ${booking.booking_status}.` });
    }

    const newStatus = action === "confirm" ? "confirmed" : "declined";
    const paymentStatus = action === "confirm" ? "demo_confirmed" : "demo_unpaid";

    const update = db.prepare(`
      UPDATE bookings SET
        booking_status = ?,
        payment_status = ?,
        provider_notes = COALESCE(?, provider_notes),
        cancellation_reason = COALESCE(?, cancellation_reason),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(
      newStatus,
      paymentStatus,
      provider_notes || (action === "confirm" ? "Booking confirmed by host." : null),
      decline_reason || null,
      req.params.id
    );

    // Audit Log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details)
      VALUES (?, ?, ?, 'BOOKING', ?, ?)
    `).run(
      `aud-${Date.now()}`,
      req.user.id,
      `BOOKING_${newStatus.toUpperCase()}`,
      req.params.id,
      JSON.stringify({ action, providerNotes: provider_notes, reason: decline_reason })
    );

    res.json({
      message: action === "confirm" ? "Booking confirmed successfully!" : "Booking declined.",
      booking_status: newStatus
    });
  } catch (err) {
    console.error("Error responding to booking:", err);
    res.status(500).json({ error: "Failed to respond to booking." });
  }
});

// 5. Traveller: Cancel Own Booking
router.patch("/:id/cancel", requireAuth, (req, res) => {
  try {
    const { cancellation_reason } = req.body;
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ?").get(req.params.id);

    if (!booking) {
      return res.status(404).json({ error: "Booking not found." });
    }

    if (booking.traveller_id !== req.user.id && req.user.role !== "admin") {
      return res.status(403).json({ error: "Unauthorized: You can only cancel your own bookings." });
    }

    if (booking.booking_status === "cancelled") {
      return res.status(400).json({ error: "Booking is already cancelled." });
    }

    const update = db.prepare(`
      UPDATE bookings SET
        booking_status = 'cancelled',
        cancellation_reason = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);

    update.run(cancellation_reason || "Cancelled by traveller.", req.params.id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details)
      VALUES (?, ?, 'BOOKING_CANCELLED', 'BOOKING', ?, ?)
    `).run(
      `aud-${Date.now()}`,
      req.user.id,
      req.params.id,
      JSON.stringify({ reason: cancellation_reason })
    );

    res.json({ message: "Booking cancelled successfully.", booking_status: "cancelled" });
  } catch (err) {
    console.error("Error cancelling booking:", err);
    res.status(500).json({ error: "Failed to cancel booking." });
  }
});

export default router;
