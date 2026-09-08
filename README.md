# YatraVista — Curated Indian Travel & Smart Itinerary Planner

> **Student Innovation Prototype**  
> **Smart India Hackathon 2026** | Problem Statement ID: **26204**  
> **Theme:** Travel & Tourism — Supporting Hotels, Travel Services, and Local Businesses

---

## 1. Project Overview

**YatraVista** is a curated Indian tourism discovery and smart itinerary planning web platform designed for authentic cultural exploration. It addresses core friction points in modern Indian travel planning:
1. **Fragmented Discovery:** Travelers often juggle multiple disconnected blogs, map tabs, and reviews to plan a 3-to-7 day trip.
2. **Opaque Budget Estimation:** Most tools display room rates in isolation without projecting per-person meal expenses, local vehicle transit, and attraction permits.
3. **Marginalized Local Artisans:** Generational handloom weavers, craft guilds, and boutique family homestays lose out to commission-heavy commercial booking portals.

YatraVista bridges these challenges by combining an editorial design aesthetic with a **deterministic, rule-based itinerary generator** that calculates complete, itemized cost breakdowns (lodging, dining, transport, and community experiences) for 1 to 7 days across 1 to 10 travelers.

*Disclaimer: This is an academic student innovation demonstration prototype for SIH 2026 (#26204). Stays, prices, and activities are structured demonstration data. It does not process financial transactions or imply official government endorsement.*

---

## 2. Technology Stack

- **Core & Framework:** React 19 with Vite 8
- **Routing:** React Router v7 (clean client-side routing with direct URL parameter linking)
- **Styling:** Tailwind CSS v3.4 + PostCSS with customized CSS variables for 4 Indian themes:
  - *Royal Sandstone* (Ivory, Sandstone Gold & Deep Emerald)
  - *Kerala Rainforest* (Palm Mist, Deep Evergreen & Warm Teak)
  - *Varanasi Twilight* (Twilight Indigo, Saffron & Ganga Blue)
  - *Kashmir Mist* (Alpine Frost, Cedar Slate & Chinar Amber)
- **Typography:** Google Fonts (`Playfair Display` serif paired with `Plus Jakarta Sans`)
- **Icons:** Lucide React
- **Animations & Effects:** Micro-interactions, CSS transitions, and celebratory canvas confetti
- **State & Storage:** React Context API (`TripContext` and `ThemeProvider`) synchronized with browser `localStorage` (Version 2 schema with automatic migrations)
- **Data Architecture:** Self-contained modular JavaScript data objects (no external API keys required to test or evaluate)

---

## 3. Upgraded Key Features

### 🌟 Editorial Home Page
- Hero with search panel (destination, duration, sample budget) passing directly to the planner.
- Asymmetric editorial grid featuring top Indian circuits (Jaipur, Goa, Munnar, Varanasi).
- Themed portfolios: *Heritage Escapes*, *Coastal Retreats*, *Mountain Trails*, *Weekend Getaways*.
- Step-by-step *"How It Works"* user journey.
- Factual demonstration artisan profile highlighting handloom weaving heritage.

### 🗺️ Explore Destinations Directory & Comparison (`/explore`)
- Curated Indian destinations: **Jaipur, Varanasi, Munnar, Goa, Coorg, Hampi, Ladakh, Udaipur**.
- Search by city, state, or keywords with active-filter chips and one-click *"Clear all filters"*.
- Region pills (*North, South, West, East, All India*), themes, and budget sorting with URL synchronization.
- **Destination Comparison Engine:** Compare up to 3 destinations side-by-side with budget ranges, best seasons, and inventory counts.
- Contextual *"Why this matches"* explanation chips on cards.

### 🏛️ Destination Detail Guides (`/destinations/:slug`)
- Hero banner with suggested duration, daily budget estimates, and best travel seasons.
- Detailed historical and cultural background, GI-tagged crafts, and culinary highlights.
- Curated attractions organized with ideal visit time windows (Morning, Afternoon, Evening).
- Related demonstration stays and local experiences located in the same circuit.

### 🛏️ Accommodations & Comparison (`/stays`)
- Demonstration properties spanning *Heritage Hotels*, *Boutique Homestays*, and *Eco-Resorts*.
- Property comparison modal for up to 3 stays side-by-side.
- *"Add to Trip"* attaches property tariff directly to itinerary calculations.

### 🧵 Artisan Experiences (`/experiences`)
- Community workshops with duration, tariffs, host community, inclusions, and cultural etiquette notes.
- Destination-mismatch detector that guides users when attaching an experience outside their current destination.

### 📅 Smart Trip Planner & Budget Optimizer (`/planner`)
- Deterministic multi-day schedule generator (1 to 7 days).
- **Interactive Slot Editing:** Move activities Up/Down within a day, replace activities, or convert slots to free leisure.
- **Daily Notes:** Record personal reminders for each day.
- **Unsaved Changes Tracker:** Real-time indicator and navigation guard preventing accidental loss.
- **Budget Optimizer (*Find Lower-Cost Options*):** Analyzes over-budget plans and suggests cheaper stays, lower-cost activities, or free relaxation time with explicit trade-off explanations.
- **Trip Packing Checklist:** Categories for documents, clothing, chargers, health, and responsible travel.
- **Print Engine:** Clean, ink-friendly printable itinerary with disclaimers and itemized math.

### 💼 Saved Trips Vault & JSON Import/Export (`/saved`)
- Search saved trips by name or destination, and sort by date, title, destination, or budget.
- Duplicate trips with one click.
- Delete trip with a 6-second **Undo** notification.
- **JSON Export & Import:** Export sanitized `.json` files and import them with schema validation.

---

## 4. Local Installation & Development

```bash
# 1. Clone repository
git clone <repository-url>
cd yatravista

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Build for production
npm run build
```

---

## 5. Prototype Limitations & Future Roadmap

| Current Prototype State | Future Production Integration |
| :--- | :--- |
| Curated static dataset | Live hotel API inventory (StayFlex, Booking.com) |
| Browser LocalStorage | Secure user profiles with cross-device sync |
| Client-side rule engine | ONDC unified tourism protocol integration |
| Static estimates | Live weather, monument ticket APIs, and GIS routing |
