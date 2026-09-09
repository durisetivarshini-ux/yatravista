import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure data directory exists
const dataDir = path.join(__dirname, "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "yatravista.sqlite");
export const db = new Database(dbPath);

// Enable foreign keys & WAL mode for concurrency
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

// Initialize Schema
export function initDB() {
  db.exec(`
    -- Users table (Traveller, Provider, Admin)
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('traveller', 'provider', 'admin')),
      avatar_url TEXT,
      phone TEXT,
      home_city TEXT,
      preferred_language TEXT DEFAULT 'English',
      travel_interests TEXT, -- JSON array
      wishlist TEXT, -- JSON array of attraction/destination IDs
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Provider Profiles
    CREATE TABLE IF NOT EXISTS provider_profiles (
      user_id TEXT PRIMARY KEY,
      business_name TEXT NOT NULL,
      tagline TEXT,
      bio TEXT,
      location TEXT,
      languages TEXT, -- JSON array string
      services_offered TEXT, -- JSON array string
      verified_status TEXT DEFAULT 'pending' CHECK(verified_status IN ('pending', 'approved', 'rejected')),
      is_demo INTEGER DEFAULT 1,
      public_phone TEXT,
      public_email TEXT,
      approval_notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    -- Destinations table (60+ across all 28 states & 8 UTs)
    CREATE TABLE IF NOT EXISTS destinations (
      id TEXT PRIMARY KEY,
      slug TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      state TEXT NOT NULL,
      region TEXT NOT NULL, -- North, South, East, West, Central, Northeast, Islands
      tagline TEXT NOT NULL,
      short_description TEXT NOT NULL,
      full_description TEXT NOT NULL,
      hero_image TEXT NOT NULL,
      gallery TEXT, -- JSON array
      travel_interests TEXT, -- JSON array
      suggested_duration TEXT NOT NULL,
      daily_budget_estimate INTEGER NOT NULL,
      best_season TEXT NOT NULL,
      ideal_for TEXT NOT NULL,
      attractions TEXT, -- JSON array
      coordinates TEXT, -- JSON object {lat, lng}
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Bookable Listings (Stays, Tours, Artisan Workshops, Local Experiences)
    CREATE TABLE IF NOT EXISTS listings (
      id TEXT PRIMARY KEY,
      provider_id TEXT NOT NULL,
      destination_slug TEXT NOT NULL,
      category TEXT NOT NULL CHECK(category IN ('stay', 'tour', 'workshop', 'experience')),
      title TEXT NOT NULL,
      tagline TEXT,
      price INTEGER NOT NULL,
      price_unit TEXT NOT NULL DEFAULT 'per_night', -- per_night, per_person, per_session
      capacity INTEGER NOT NULL DEFAULT 2, -- max guests / participants per slot
      max_rooms INTEGER DEFAULT 1, -- for stays
      address TEXT,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      gallery TEXT, -- JSON array
      amenities TEXT, -- JSON array
      highlights TEXT, -- JSON array
      cancellation_policy TEXT DEFAULT 'Free cancellation up to 48 hours before check-in/start.',
      status TEXT DEFAULT 'approved' CHECK(status IN ('draft', 'pending_review', 'approved', 'rejected', 'paused')),
      rejection_reason TEXT,
      is_demo INTEGER DEFAULT 1,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (destination_slug) REFERENCES destinations(slug) ON DELETE CASCADE
    );

    -- Bookings table
    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      booking_reference TEXT UNIQUE NOT NULL,
      traveller_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      listing_id TEXT NOT NULL,
      booking_type TEXT NOT NULL, -- stay, tour, workshop, experience
      check_in_date TEXT, -- YYYY-MM-DD
      check_out_date TEXT, -- YYYY-MM-DD
      slot_time TEXT, -- e.g. "10:00 AM - 01:00 PM"
      guests_count INTEGER NOT NULL DEFAULT 1,
      rooms_count INTEGER DEFAULT 1,
      price_per_unit INTEGER NOT NULL,
      total_amount INTEGER NOT NULL,
      taxes_fees INTEGER NOT NULL DEFAULT 0,
      price_snapshot TEXT NOT NULL, -- JSON snapshot of listing details & breakdown
      booking_status TEXT NOT NULL DEFAULT 'pending' CHECK(booking_status IN ('pending', 'confirmed', 'declined', 'cancelled')),
      payment_status TEXT NOT NULL DEFAULT 'demo_unpaid' CHECK(payment_status IN ('demo_unpaid', 'demo_confirmed')),
      provider_notes TEXT,
      cancellation_reason TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (traveller_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (provider_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
    );

    -- Audit Logs table
    CREATE TABLE IF NOT EXISTS audit_logs (
      id TEXT PRIMARY KEY,
      user_id TEXT,
      action TEXT NOT NULL,
      entity_type TEXT NOT NULL,
      entity_id TEXT,
      details TEXT, -- JSON details
      ip_address TEXT,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- Performance indexes
    CREATE INDEX IF NOT EXISTS idx_listings_destination ON listings(destination_slug);
    CREATE INDEX IF NOT EXISTS idx_listings_provider ON listings(provider_id);
    CREATE INDEX IF NOT EXISTS idx_listings_status ON listings(status);
    CREATE INDEX IF NOT EXISTS idx_bookings_traveller ON bookings(traveller_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_provider ON bookings(provider_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(booking_status);
  `);

  // Safe migrations for added user columns
  const userColumns = db.prepare("PRAGMA table_info(users)").all().map(c => c.name);
  if (!userColumns.includes("home_city")) {
    db.exec("ALTER TABLE users ADD COLUMN home_city TEXT;");
  }
  if (!userColumns.includes("preferred_language")) {
    db.exec("ALTER TABLE users ADD COLUMN preferred_language TEXT DEFAULT 'English';");
  }
  if (!userColumns.includes("travel_interests")) {
    db.exec("ALTER TABLE users ADD COLUMN travel_interests TEXT;");
  }
  if (!userColumns.includes("wishlist")) {
    db.exec("ALTER TABLE users ADD COLUMN wishlist TEXT;");
  }

  console.log("✓ SQLite Database schema initialized successfully.");
}
