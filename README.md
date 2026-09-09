# YatraVista — Full-Stack Indian Tourism Discovery & Booking Platform

> **Student Innovation Prototype**  
> **Smart India Hackathon 2026** | Problem Statement ID: **26204**  
> **Theme:** Travel & Tourism — Supporting Hotels, Travel Services, and Local Businesses

---

## 1. Executive Summary

**YatraVista** is a full-stack Indian tourism discovery and service platform built to celebrate the heritage, craft traditions, homestays, and local enterprise across all **28 States and 8 Union Territories** of India. 

It connects three core stakeholders into an integrated ecosystem:
1. **Travellers:** Discover 60+ curated destinations, explore heritage homestays and artisan workshops with transparent itemized pricing, build deterministic day-by-day itineraries, and book services with date/guest validation.
2. **Hosts & Service Providers:** Publish and manage verified stays, cultural walks, craft masterclasses, and eco-tours; review incoming booking requests, accept/reject with operational notes, and track booking metrics.
3. **Platform Administrators:** Monitor live platform metrics (total bookings, active listings, gross booking value, regional breakdown), review provider verification, and moderate listings before public release.

*Demonstration Notice: YatraVista is an academic student innovation prototype for SIH 2026 (#26204). Stays, guides, and workshops use curated demonstration data with an instant sandbox booking checkout (no live financial transactions).*

---

## 2. Technology Stack & System Architecture

### Frontend (Client Tier)
- **Framework:** React 19 with Vite 8 (Fast HMR & Optimized Production Bundles)
- **Routing:** React Router v7 with role-aware route guards
- **Styling:** Tailwind CSS v3.4 + PostCSS with CSS Custom Properties supporting **4 Indian Themes**:
  - *Royal Sandstone* (Ivory, Sandstone Gold & Deep Emerald)
  - *Kerala Rainforest* (Palm Mist, Deep Evergreen & Warm Teak)
  - *Varanasi Twilight* (Twilight Indigo, Saffron & Ganga Blue)
  - *Kashmir Mist* (Alpine Frost, Cedar Slate & Chinar Amber)
- **Typography:** Google Fonts (`Playfair Display` serif & `Plus Jakarta Sans`)
- **Icons & UI:** Lucide React, Canvas Confetti
- **State Management:** 
  - `AuthContext`: JWT-based role management, session validation, and 1-click demo switcher.
  - `TripContext`: Deterministic itinerary generator, itemized expense math, and LocalStorage persistence.
  - `ThemeContext`: Dynamic DOM theme switching.

### Backend (API & Data Tier)
- **Server:** Node.js + Express (RESTful JSON APIs on port `5000`)
- **Database:** SQLite (`better-sqlite3`) with WAL mode, foreign keys, and indexed queries (`server/data/yatravista.sqlite`).
- **Security & Auth:**
  - Password hashing with `bcryptjs`.
  - Stateless authentication with JSON Web Tokens (`jsonwebtoken`).
  - Server-side role-based access control (`requireAuth`, `requireRole('provider')`, `requireRole('admin')`).
  - Strict input validation, date sanity checks, and snapshot pricing preventing client-side price tampering.

---

## 3. The 3 Connected Roles & Demo Credentials

To evaluate the prototype without registering manual accounts, use the **Floating Demo Role Switcher** at the bottom right or log in with the pre-seeded credentials:

| Role | Email | Password | Primary Capabilities |
| :--- | :--- | :--- | :--- |
| **Traveller** | `traveller@yatravista.demo` | `demo123` | Book stays/experiences, manage bookings (`/bookings`), cancel with reason, plan trips (`/planner`), export itineraries. |
| **Host / Provider** | `provider@yatravista.demo` | `demo123` | Host Dashboard (`/provider/dashboard`), create/edit listings, manage draft/live status, accept/reject booking requests with notes. |
| **Platform Admin** | `admin@yatravista.demo` | `demo123` | Admin Portal (`/admin/dashboard`), real DB analytics, provider verification, listing moderation queue, audit log inspect. |

---

## 4. Key Platform Features

### 🇮🇳 Extensible Pan-India Catalogue (60+ Destinations)
- Complete coverage across **all 28 States and 8 Union Territories** (North, South, West, East, Central, Northeast, and Islands).
- Deep discovery pages with GI-tagged craft profiles, culinary highlights, historical context, and seasonal advice.
- Side-by-side comparison matrix comparing up to 3 destinations simultaneously.

### 🛏️ Bookable Accommodations & Artisan Experiences
- Verified heritage havelis, plantation homestays, pottery workshops, and backwater cruises.
- **"Hosted by" attribution:** Public host cards linking to provider profiles (`/providers/:id`) showcasing business licenses, response times, and bio.
- Transparent itemized pricing drawer displaying base tariffs, occupancy multipliers, cleaning fees, and GST breakdown.

### 📅 Smart Itinerary Planner & Budget Engine
- Deterministic multi-day scheduler (1 to 7 days, 1 to 10 guests).
- Real-time expense breakdown across lodging, dining, local transport, and activities.
- One-click **Budget Optimizer** suggesting lower-cost alternatives when exceeding target spend.
- Ink-friendly print engine and JSON schema export/import.

### 🛡️ Provider & Admin Management Portals
- **Provider Dashboard:** Create new listings with multi-category classification (Stay / Experience / Tour / Workshop), manage availability, and respond to traveller booking requests.
- **Admin Portal:** Live computed database aggregates, listing moderation workflow (Pending Review -> Approved -> Rejected), provider vetting, and system audit logs.

---

## 5. API Endpoints Reference

All API routes are served under `/api`:

### Authentication & Profiles
- `POST /api/auth/register` — Register a new Traveller or Service Provider.
- `POST /api/auth/login` — Authenticate and receive JWT.
- `GET /api/auth/me` — Verify session and fetch current profile.
- `POST /api/auth/demo-switch` — 1-click token generator for demo roles.

### Destinations & Discovery
- `GET /api/destinations` — List destinations (filters: region, state, theme, search).
- `GET /api/destinations/:slug` — Full destination guide, attractions, stays, and experiences.

### Listings & Providers
- `GET /api/listings` — Filter active listings (type, destination, price).
- `GET /api/listings/:id` — Listing details with host attribution.
- `POST /api/listings` — *[Provider]* Create new listing (starts in `pending_review`).
- `PUT /api/listings/:id` — *[Provider/Admin]* Update listing information.
- `GET /api/providers/:id` — Public provider profile with active listings.
- `PUT /api/providers/profile` — *[Provider]* Update business bio and contact.

### Bookings Flow
- `POST /api/bookings` — *[Traveller]* Create booking with date/guest validation & price snapshot.
- `GET /api/bookings/my` — *[Traveller]* Fetch user's booking history.
- `GET /api/bookings/provider` — *[Provider]* Fetch incoming bookings for hosted properties.
- `PATCH /api/bookings/:id/status` — *[Provider/Traveller/Admin]* Accept, reject, or cancel booking.

### Administration
- `GET /api/admin/stats` — Real-time database metrics (bookings, GMV, listings, users).
- `GET /api/admin/moderation` — Queue of listings awaiting approval.
- `POST /api/admin/moderation/:id` — Approve or reject listing.
- `GET /api/admin/providers` — List all registered providers and verification status.
- `PATCH /api/admin/providers/:id/verify` — Toggle verified badge.

---

## 6. Installation & Quick Start

### Prerequisites
- Node.js 18+ installed on your system.

### Running Locally (Frontend + Backend)

```bash
# 1. Clone the repository
git clone https://github.com/durisetivarshini-ux/yatravista.git
cd yatravista

# 2. Install dependencies
npm install

# 3. Seed SQLite Database
node server/seed.js

# 4. Start concurrent development servers (API on :5000, Vite on :5173)
npm run dev
```

Visit **`http://localhost:5173`** in your browser to interact with the live application.

---

## 7. SIH 2026 Evaluation Matrix

| Problem Statement Requirement (#26204) | YatraVista Implementation |
| :--- | :--- |
| **Supporting Local Hotels & Stays** | Direct host listings for boutique homestays and heritage retreats with zero intermediary markup. |
| **Empowering Local Artisans & Guides** | Dedicated masterclass bookings with cultural etiquette notes and GI craft preservation highlights. |
| **Transparent Travel Budgets** | Per-person daily budget breakdowns, itemized taxes, and automatic budget optimization. |
| **Pan-India Coverage** | 60+ curated destinations representing all 28 states & 8 UTs. |
| **Role-Based Workflow** | Dedicated portals for Travellers, Service Providers, and Administrators with backend JWT security. |
