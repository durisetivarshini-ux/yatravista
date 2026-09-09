import bcrypt from "bcryptjs";
import { db, initDB } from "./db.js";

export function runSeed() {
  initDB();

  console.log("🌱 Seeding YatraVista database...");

  // Clear existing records cleanly
  db.exec(`
    DELETE FROM audit_logs;
    DELETE FROM bookings;
    DELETE FROM listings;
    DELETE FROM destinations;
    DELETE FROM provider_profiles;
    DELETE FROM users;
  `);

  const salt = bcrypt.genSaltSync(10);
  const travellerHash = bcrypt.hashSync("password123", salt);
  const providerHash = bcrypt.hashSync("password123", salt);
  const adminHash = bcrypt.hashSync("admin123", salt);

  // 1. Seed Core Users & Demo Accounts
  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role, avatar_url, phone)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  // Demo Traveller
  insertUser.run(
    "usr-traveller-01",
    "Aarav Sharma",
    "traveller@yatravista.demo",
    travellerHash,
    "traveller",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
    "+91 98765 43210"
  );

  // Demo Provider 1 - Rajasthan Heritage & Crafts
  insertUser.run(
    "usr-provider-01",
    "Rajendra Singh Rathore",
    "provider@yatravista.demo",
    providerHash,
    "provider",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    "+91 94140 12345"
  );

  // Demo Provider 2 - Kerala Backwaters & Spices
  insertUser.run(
    "usr-provider-02",
    "Meenakshi Kurup",
    "meenakshi.kerala@yatravista.demo",
    providerHash,
    "provider",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80",
    "+91 94470 56789"
  );

  // Demo Provider 3 - Varanasi Silk & Spiritual Walks
  insertUser.run(
    "usr-provider-03",
    "Pt. Vishwanath Tripathi",
    "vishwanath.varanasi@yatravista.demo",
    providerHash,
    "provider",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
    "+91 94500 89012"
  );

  // Demo Provider 4 - Ladakh Eco Treks
  insertUser.run(
    "usr-provider-04",
    "Tenzin Dorjee",
    "tenzin.ladakh@yatravista.demo",
    providerHash,
    "provider",
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=300&q=80",
    "+91 94190 34567"
  );

  // Demo Admin
  insertUser.run(
    "usr-admin-01",
    "Platform Administrator",
    "admin@yatravista.demo",
    adminHash,
    "admin",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80",
    "+91 11 2345 6789"
  );

  // 2. Seed Provider Profiles
  const insertProvider = db.prepare(`
    INSERT INTO provider_profiles (
      user_id, business_name, tagline, bio, location, languages, services_offered,
      verified_status, is_demo, public_phone, public_email, approval_notes
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProvider.run(
    "usr-provider-01",
    "Rathore Heritage Estates & Guilds",
    "Preserving 5th-generation Rajput hospitality & Sanganeri block craft",
    "We are a heritage collective managing restored ancestral townhouses, authentic havelis, and community workshops with master block printers across Jaipur and Udaipur.",
    "Jaipur, Rajasthan",
    JSON.stringify(["English", "Hindi", "Marwari"]),
    JSON.stringify(["Heritage Stays", "Artisan Workshops", "Historic Old Town Walks"]),
    "approved",
    1,
    "+91 94140 12345",
    "rathore.heritage@yatravista.demo",
    "Platform Approved: Authentic local heritage operator verified for SIH 2026 prototype."
  );

  insertProvider.run(
    "usr-provider-02",
    "Malabar Coast Heritage & Plantation Stays",
    "Living traditions among cardamom hills, spice groves and backwaters",
    "Certified eco-tourism host offering organic plantation bungalows in Munnar and private solar-hybrid kettuvallam houseboats in Alappuzha backwaters.",
    "Munnar & Alappuzha, Kerala",
    JSON.stringify(["English", "Malayalam", "Hindi", "Tamil"]),
    JSON.stringify(["Plantation Bungalows", "Solar Houseboats", "Spice Trail Walks", "Kathakali Demonstrations"]),
    "approved",
    1,
    "+91 94470 56789",
    "malabar.heritage@yatravista.demo",
    "Platform Approved: Eco-friendly sustainable travel collective."
  );

  insertProvider.run(
    "usr-provider-03",
    "Kashi Heritage Guild & Silk Masters",
    "Ancient alley explorations, Darbhanga ghat stays & handloom preservation",
    "Born and raised in the ancient gallis of Kashi, our guild provides immersion into 150-year-old Darbhanga ghat properties, sunrise rowing meditation, and master Banarasi kadwa brocade weaving.",
    "Varanasi, Uttar Pradesh",
    JSON.stringify(["English", "Hindi", "Sanskrit", "Bhojpuri"]),
    JSON.stringify(["Ghatside Palatial Homestays", "Sunrise Boat Meditation", "Banarasi Silk Weaving Masterclasses"]),
    "approved",
    1,
    "+91 94500 89012",
    "kashi.guild@yatravista.demo",
    "Platform Approved: Verified heritage educator & master artisan collective."
  );

  insertProvider.run(
    "usr-provider-04",
    "Himalayan Eco-Expeditions & Ladakhi Homestays",
    "High-altitude solar homestays & monastery cultural immersions",
    "Local Ladakhi guides committed to carbon-neutral treks, ancient Thangka painting heritage, and sustainable community homestays across Leh, Nubra, and Pangong.",
    "Leh, Ladakh UT",
    JSON.stringify(["English", "Ladakhi", "Tibetan", "Hindi"]),
    JSON.stringify(["Solar Homestays", "Thangka Painting Sessions", "High-Altitude Stargazing Expeditions"]),
    "approved",
    1,
    "+91 94190 34567",
    "himalayan.eco@yatravista.demo",
    "Platform Approved: Community eco-operator verified for high-altitude tourism standards."
  );

  // 3. Seed Comprehensive 60+ Destinations Across All 28 States & 8 UTs
  const insertDest = db.prepare(`
    INSERT INTO destinations (
      id, slug, name, state, region, tagline, short_description, full_description,
      hero_image, gallery, travel_interests, suggested_duration, daily_budget_estimate,
      best_season, ideal_for, attractions, coordinates
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const destinationsData = [
    // --- NORTH INDIA ---
    {
      id: "dest-jaipur",
      slug: "jaipur",
      name: "Jaipur",
      state: "Rajasthan",
      region: "North",
      tagline: "The Timeless Splendour of the Pink City",
      short_description: "Majestic forts, terracotta facades, vibrant bazaars, and opulent royal history nestled in the Aravalli hills.",
      full_description: "Jaipur, the UNESCO World Heritage capital of Rajasthan founded in 1727 by Maharaja Sawai Jai Singh II, is celebrated for its grid-planned architecture, astrological observatory, and living artisan quarters.",
      hero_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80", "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Culture", "Heritage", "Food", "Architecture", "Art & Craft"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 3800,
      best_season: "October to March (Rajasthan Tourism Guide)",
      ideal_for: "Heritage lovers, photographers, foodies, culture seekers",
      attractions: [
        { name: "Amber Palace & Sheesh Mahal", category: "Heritage", cost: 500, duration: "3 hours" },
        { name: "Hawa Mahal & Old City Street Walk", category: "Architecture", cost: 200, duration: "2 hours" },
        { name: "Jantar Mantar Observatory", category: "Culture", cost: 200, duration: "1.5 hours" }
      ],
      coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    {
      id: "dest-udaipur",
      slug: "udaipur",
      name: "Udaipur",
      state: "Rajasthan",
      region: "North",
      tagline: "The City of Lakes, Marble Palaces & Royal Romance",
      short_description: "Gleaming white palaces mirrored on tranquil waters, surrounded by green Aravalli ridgelines.",
      full_description: "Founded in 1559 by Maharana Udai Singh II, Udaipur is the crown jewel of Mewar with its labyrinthine City Palace, Lake Pichola ghats, and romantic boat cruises.",
      hero_image: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Romance", "Lakes", "Art & Craft"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 4200,
      best_season: "September to March",
      ideal_for: "Couples, heritage enthusiasts, luxury travellers",
      attractions: [
        { name: "City Palace Complex", category: "Heritage", cost: 400, duration: "3.5 hours" },
        { name: "Lake Pichola Sunset Boat Cruise", category: "Nature", cost: 500, duration: "1.5 hours" },
        { name: "Saheliyon-ki-Bari Gardens", category: "History", cost: 100, duration: "1 hour" }
      ],
      coordinates: { lat: 24.5854, lng: 73.7125 }
    },
    {
      id: "dest-jodhpur",
      slug: "jodhpur",
      name: "Jodhpur",
      state: "Rajasthan",
      region: "North",
      tagline: "The Sun City & The Mighty Blue Fortress",
      short_description: "Indigo-painted houses sprawling beneath the towering ramparts of Mehrangarh Fort.",
      full_description: "Jodhpur stands at the edge of the Thar Desert, famed for its indigo alleys, historic stepwells like Toorji Ka Jhalra, and royal cenotaphs of Jaswant Thada.",
      hero_image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Culture", "Photography", "Food"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3200,
      best_season: "October to March",
      ideal_for: "History buffs, photographers, food explorers",
      attractions: [
        { name: "Mehrangarh Fort & Museum", category: "Heritage", cost: 600, duration: "3 hours" },
        { name: "Toorji Ka Jhalra Stepwell", category: "Architecture", cost: 0, duration: "1 hour" },
        { name: "Jaswant Thada Cenotaphs", category: "History", cost: 100, duration: "1.5 hours" }
      ],
      coordinates: { lat: 26.2389, lng: 73.0243 }
    },
    {
      id: "dest-jaisalmer",
      slug: "jaisalmer",
      name: "Jaisalmer",
      state: "Rajasthan",
      region: "North",
      tagline: "The Golden City of Thar Sandstone",
      short_description: "A living golden fort rising from the sand dunes, intricate havelis, and desert stargazing.",
      full_description: "Jaisalmer's golden yellow sandstone fort houses a vibrant living community, Jain temples with exquisite carvings, and traditional Rajasthani folk music camps.",
      hero_image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Desert", "Heritage", "Art & Craft", "Stargazing"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3400,
      best_season: "November to February",
      ideal_for: "Adventure travellers, desert lovers, history buffs",
      attractions: [
        { name: "Jaisalmer Living Fort (Sonar Qila)", category: "Heritage", cost: 250, duration: "3 hours" },
        { name: "Patwon Ki Haveli", category: "Architecture", cost: 150, duration: "1.5 hours" },
        { name: "Sam Sand Dunes Sunset & Folk Music", category: "Desert", cost: 750, duration: "4 hours" }
      ],
      coordinates: { lat: 26.9157, lng: 70.9083 }
    },
    {
      id: "dest-agra",
      slug: "agra",
      name: "Agra",
      state: "Uttar Pradesh",
      region: "North",
      tagline: "The Monument of Eternal Love & Mughal Splendor",
      short_description: "Home to the immortal white marble Taj Mahal, red sandstone Agra Fort, and Fatehpur Sikri.",
      full_description: "Agra served as the imperial Mughal capital for centuries. Today, visitors marvel at the sublime proportions of the Taj Mahal, the riverside gardens of Mehtab Bagh, and royal courtyards of Agra Fort.",
      hero_image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Architecture", "History", "Food"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 3200,
      best_season: "October to March",
      ideal_for: "First-time visitors to India, architecture lovers",
      attractions: [
        { name: "Taj Mahal at Sunrise", category: "Heritage", cost: 250, duration: "3 hours" },
        { name: "Agra Red Fort", category: "History", cost: 350, duration: "2 hours" },
        { name: "Mehtab Bagh Sunset Viewpoint", category: "Nature", cost: 100, duration: "1.5 hours" }
      ],
      coordinates: { lat: 27.1767, lng: 78.0081 }
    },
    {
      id: "dest-varanasi",
      slug: "varanasi",
      name: "Varanasi",
      state: "Uttar Pradesh",
      region: "North",
      tagline: "The Spiritual Heartbeat of the Eternal Ganga",
      short_description: "Ancient stone ghats, mesmerizing evening Ganga Aarti, timeless silk weaving, and deep spiritual heritage.",
      full_description: "One of the world's oldest continually inhabited cities, Varanasi is the spiritual core of India. Life, philosophy, music, and art unfold along its 84 holy stone ghats.",
      hero_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Culture", "Artisan Weaving", "Food", "Photography"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 2900,
      best_season: "October to March",
      ideal_for: "Spiritual seekers, culture enthusiasts, photographers",
      attractions: [
        { name: "Dashashwamedh Ghat Evening Ganga Aarti", category: "Spirituality", cost: 0, duration: "2 hours" },
        { name: "Sunrise Rowing Boat on the Ganges", category: "Culture", cost: 400, duration: "2 hours" },
        { name: "Sarnath Buddhist Sacred Ruins", category: "Heritage", cost: 150, duration: "2.5 hours" }
      ],
      coordinates: { lat: 25.3176, lng: 82.9739 }
    },
    {
      id: "dest-delhi",
      slug: "delhi",
      name: "Delhi",
      state: "Delhi (NCT)",
      region: "North",
      tagline: "The Epic Crossroads of Empires & Modern Vibrancy",
      short_description: "Centuries of dynasties preserved in Humayun's Tomb, Red Fort, Qutub Minar, and lively Chandni Chowk.",
      full_description: "India's capital seamlessly juxtaposes historic monuments like Humayun's Tomb and Qutub Minar with bustling street food lanes and lush Lodi Gardens.",
      hero_image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Food", "Architecture", "Shopping", "Museums"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 3500,
      best_season: "October to March",
      ideal_for: "Urban explorers, history lovers, culinary travellers",
      attractions: [
        { name: "Humayun's Tomb UNESCO Site", category: "Heritage", cost: 250, duration: "2.5 hours" },
        { name: "Old Delhi Heritage Food Walk", category: "Food", cost: 600, duration: "3 hours" },
        { name: "Qutub Minar Complex", category: "Architecture", cost: 250, duration: "2 hours" }
      ],
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    {
      id: "dest-amritsar",
      slug: "amritsar",
      name: "Amritsar",
      state: "Punjab",
      region: "North",
      tagline: "The Golden Temple of Peace & Hearty Punjabi Warmth",
      short_description: "The sanctum of Sri Harmandir Sahib, communal langar kitchen, rich culinary heritage, and patriotic Wagah border.",
      full_description: "Amritsar is the spiritual capital of Sikhism. The gilded Golden Temple radiates serene devotion alongside legendary kulchas and the solemn history of Jallianwala Bagh.",
      hero_image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Food", "Culture", "History"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2600,
      best_season: "October to March",
      ideal_for: "Spiritual visitors, foodies, cultural explorers",
      attractions: [
        { name: "Sri Harmandir Sahib (Golden Temple)", category: "Spirituality", cost: 0, duration: "3.5 hours" },
        { name: "Wagah Border Beating Retreat Ceremony", category: "Patriotism", cost: 0, duration: "3 hours" },
        { name: "Jallianwala Bagh Memorial", category: "History", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 31.6340, lng: 74.8723 }
    },
    {
      id: "dest-srinagar",
      slug: "srinagar",
      name: "Srinagar",
      state: "Jammu and Kashmir",
      region: "North",
      tagline: "Paradise on Earth: Dal Lake Shikaras & Mughal Terraces",
      short_description: "Intricately carved cedar houseboats, floating vegetable markets, saffron fields, and snow-capped Pir Panjal peaks.",
      full_description: "Kashmir's summer capital is famous for tranquil Dal Lake, aromatic kahwa tea, Pashmina shawls, and cascading terraced gardens of Nishat and Shalimar Bagh.",
      hero_image: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Nature", "Romance", "Lakes", "Art & Craft", "Mountains"],
      suggested_duration: "4 - 5 Days",
      daily_budget_estimate: 4200,
      best_season: "April to October (Spring to Autumn) & Dec-Feb for Snow",
      ideal_for: "Nature lovers, honeymooners, artisanal craft collectors",
      attractions: [
        { name: "Dal Lake Shikara & Floating Market", category: "Nature", cost: 800, duration: "3 hours" },
        { name: "Nishat & Shalimar Mughal Gardens", category: "Heritage", cost: 100, duration: "2 hours" },
        { name: "Old Srinagar Craft & Copper Bazaar", category: "Culture", cost: 0, duration: "2.5 hours" }
      ],
      coordinates: { lat: 34.0837, lng: 74.7973 }
    },
    {
      id: "dest-leh",
      slug: "leh",
      name: "Leh",
      state: "Ladakh",
      region: "North",
      tagline: "The High-Altitude Land of Monasteries & Stargazing",
      short_description: "Tibetan Buddhist stupas, dramatic moonscapes, pristine azure high-altitude lakes, and mountain passes.",
      full_description: "Perched at 3,500m above sea level in the trans-Himalayan plateau, Leh offers awe-inspiring gompas like Thiksey, crystal-clear Pangong Lake, and rich Ladakhi hospitality.",
      hero_image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Adventure", "Spirituality", "Mountains", "Stargazing", "Nature"],
      suggested_duration: "5 - 7 Days (including acclimatisation)",
      daily_budget_estimate: 4500,
      best_season: "May to September (High season)",
      ideal_for: "Trekkers, stargazers, cultural seekers, photographers",
      attractions: [
        { name: "Thiksey Monastery Morning Chanting", category: "Spirituality", cost: 100, duration: "2.5 hours" },
        { name: "Pangong Tso High-Altitude Lake Excursion", category: "Nature", cost: 1500, duration: "Full Day" },
        { name: "Shanti Stupa Sunset View", category: "Culture", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 34.1526, lng: 77.5771 }
    },
    {
      id: "dest-shimla",
      slug: "shimla",
      name: "Shimla",
      state: "Himachal Pradesh",
      region: "North",
      tagline: "The Queen of Hills & British Colonial Splendour",
      short_description: "Pine-clad hills, heritage toy train, neo-Gothic Christ Church, and breezy Mall Road strolls.",
      full_description: "Once the summer capital of British India, Shimla retains colonial charm across The Ridge, Jakhoo Temple, and surrounding apple orchards of Kufri.",
      hero_image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Heritage", "Family", "Nature"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3200,
      best_season: "March to June & December to February (Snow)",
      ideal_for: "Families, mountain enthusiasts, heritage explorers",
      attractions: [
        { name: "The Ridge & Mall Road Walk", category: "Heritage", cost: 0, duration: "2 hours" },
        { name: "Kalka-Shimla UNESCO Toy Train Ride", category: "Experience", cost: 350, duration: "4 hours" },
        { name: "Viceregal Lodge & Gardens", category: "History", cost: 150, duration: "2 hours" }
      ],
      coordinates: { lat: 31.1048, lng: 77.1734 }
    },
    {
      id: "dest-manali",
      slug: "manali",
      name: "Manali",
      state: "Himachal Pradesh",
      region: "North",
      tagline: "The Valley of the Gods & Alpine Adventures",
      short_description: "Coniferous forests, swift Beas River rapids, Solang Valley paragliding, and gateway to Atal Tunnel.",
      full_description: "Nestled in the Kullu Valley, Manali combines ancient wooden temples like Hadimba with thrilling adventures in Solang Valley and serene Old Manali cafes.",
      hero_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1596761266903-85f0bc76771d?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Adventure", "Mountains", "Nature", "Romance"],
      suggested_duration: "4 - 5 Days",
      daily_budget_estimate: 3400,
      best_season: "October to June",
      ideal_for: "Backpackers, adventure seekers, couples",
      attractions: [
        { name: "Hadimba Ancient Cedar Temple", category: "Heritage", cost: 50, duration: "1.5 hours" },
        { name: "Solang Valley Snow Activities", category: "Adventure", cost: 1200, duration: "4 hours" },
        { name: "Old Manali Riverside Trail", category: "Nature", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 32.2396, lng: 77.1887 }
    },
    {
      id: "dest-rishikesh",
      slug: "rishikesh",
      name: "Rishikesh",
      state: "Uttarakhand",
      region: "North",
      tagline: "The Yoga Capital of the World & Himalayan Gateway",
      short_description: "Ganges river rafting, suspension bridges, ashram meditation, and soulful Parmarth Niketan aarti.",
      full_description: "Where the holy Ganga emerges from the Shivalik Himalayas, Rishikesh draws global seekers for certified yoga teacher trainings, Ayurvedic retreats, and white-water rapids.",
      hero_image: "https://images.unsplash.com/photo-1596761266903-85f0bc76771d?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Yoga & Wellness", "Spirituality", "Adventure", "Nature"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 2800,
      best_season: "September to April",
      ideal_for: "Yoga practitioners, wellness seekers, adventure enthusiasts",
      attractions: [
        { name: "Ganga White Water Rafting", category: "Adventure", cost: 1000, duration: "3 hours" },
        { name: "Parmarth Niketan Sunset Aarti", category: "Spirituality", cost: 0, duration: "1.5 hours" },
        { name: "The Beatles Ashram Heritage Walk", category: "Culture", cost: 150, duration: "2 hours" }
      ],
      coordinates: { lat: 30.0869, lng: 78.2676 }
    },
    {
      id: "dest-haridwar",
      slug: "haridwar",
      name: "Haridwar",
      state: "Uttarakhand",
      region: "North",
      tagline: "The Gateway to the Gods on the Holy Ganges",
      short_description: "Har Ki Pauri ghat, floating marigold diyas, ancient temples, and vibrant Vedic traditions.",
      full_description: "One of Hinduism's seven sacred cities, Haridwar is celebrated for the Kumbh Mela and the daily spectacle of thousands of lamps floating down the sacred Brahmakund at dusk.",
      hero_image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Culture", "Heritage", "Food"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to April",
      ideal_for: "Pilgrims, cultural explorers, photographers",
      attractions: [
        { name: "Har Ki Pauri Evening Ganga Aarti", category: "Spirituality", cost: 0, duration: "2 hours" },
        { name: "Mansa Devi Ropeway & Temple", category: "Culture", cost: 150, duration: "2 hours" },
        { name: "Chandi Devi Hilltop Temple", category: "Spirituality", cost: 200, duration: "2.5 hours" }
      ],
      coordinates: { lat: 29.9457, lng: 78.1642 }
    },
    {
      id: "dest-nainital",
      slug: "nainital",
      name: "Nainital",
      state: "Uttarakhand",
      region: "North",
      tagline: "The Lake City of Kumaon Himalayas",
      short_description: "Emerald eye-shaped Naini Lake, surrounding oak ridges, Mall Road, and panoramic snow views.",
      full_description: "Cradled in the Kumaon hills around the revered emerald Naini Lake, Nainital provides tranquil boating, colonial architecture, and views of Nanda Devi peak.",
      hero_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Lakes", "Mountains", "Nature", "Family"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3000,
      best_season: "March to June & September to November",
      ideal_for: "Families, nature lovers, weekend getaways",
      attractions: [
        { name: "Naini Lake Yacht & Paddle Boating", category: "Nature", cost: 300, duration: "1.5 hours" },
        { name: "Snow View Point Cable Car", category: "Mountains", cost: 300, duration: "2 hours" },
        { name: "Naina Devi Lakeside Temple", category: "Culture", cost: 0, duration: "1 hour" }
      ],
      coordinates: { lat: 29.3919, lng: 79.4542 }
    },

    // --- WEST & CENTRAL INDIA ---
    {
      id: "dest-mumbai",
      slug: "mumbai",
      name: "Mumbai",
      state: "Maharashtra",
      region: "West",
      tagline: "The Maximum City: Art Deco, Marine Drive & Cinema",
      short_description: "Victorian Gothic UNESCO landmarks, Arabian Sea sunsets on Marine Drive, street food, and vibrant arts.",
      full_description: "India's financial and cultural powerhouse is home to UNESCO Victorian Gothic ensembles, historic Elephanta Caves, and the irresistible rhythm of the Arabian Sea coastline.",
      hero_image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Architecture", "Food", "Art & Culture", "Heritage", "Coast"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 4800,
      best_season: "November to February",
      ideal_for: "Urbanites, architecture lovers, foodies, art seekers",
      attractions: [
        { name: "Gateway of India & Colaba Heritage Walk", category: "Heritage", cost: 0, duration: "2.5 hours" },
        { name: "Elephanta Island Rock-cut Caves", category: "History", cost: 300, duration: "4 hours" },
        { name: "Marine Drive Queen's Necklace Sunset", category: "Coast", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 18.9220, lng: 72.8347 }
    },
    {
      id: "dest-lonavala",
      slug: "lonavala",
      name: "Lonavala",
      state: "Maharashtra",
      region: "West",
      tagline: "Sahyadri Waterfalls, Mist & Ancient Karla Caves",
      short_description: "Verdant Western Ghats valleys, ancient Buddhist rock-cut monasteries, chikki sweets, and monsoon waterfalls.",
      full_description: "A popular hill station in Maharashtra's Sahyadri range, Lonavala features the 2nd-century BC Karla and Bhaja caves, lush viewpoints like Tiger's Leap, and scenic monsoon treks.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Nature", "Mountains", "Heritage", "Monsoon"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2900,
      best_season: "July to September (Monsoon) & October to March",
      ideal_for: "Weekend travellers, monsoon chasers, trekkers",
      attractions: [
        { name: "Karla Ancient Buddhist Caves", category: "Heritage", cost: 50, duration: "2 hours" },
        { name: "Tiger's Leap Valley View", category: "Nature", cost: 0, duration: "1.5 hours" },
        { name: "Bhushi Dam & Waterfall Trail", category: "Nature", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 18.7557, lng: 73.4091 }
    },
    {
      id: "dest-goa",
      slug: "goa",
      name: "Goa",
      state: "Goa",
      region: "West",
      tagline: "Sunkissed Coastlines, Portuguese Mansions & Serene Backwaters",
      short_description: "Golden palm-fringed beaches, Latin Quarter Fontainhas, spice plantations, and laidback susegad.",
      full_description: "India's coastal paradise blends Portuguese heritage with Konkani flavors. Explore Old Goa's UNESCO basilicas, quiet south beaches like Palolem, and eco-friendly cashew groves.",
      hero_image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Beach", "Heritage", "Food", "Relaxation", "Culture"],
      suggested_duration: "4 - 5 Days",
      daily_budget_estimate: 4200,
      best_season: "November to March",
      ideal_for: "Beach lovers, heritage travellers, food explorers",
      attractions: [
        { name: "Fontainhas Latin Quarter Heritage Walk", category: "Culture", cost: 0, duration: "2 hours" },
        { name: "Basilica of Bom Jesus UNESCO Site", category: "Heritage", cost: 0, duration: "1.5 hours" },
        { name: "Palolem Beach & Silent Bay Kayaking", category: "Beach", cost: 400, duration: "3 hours" }
      ],
      coordinates: { lat: 15.2993, lng: 74.1240 }
    },
    {
      id: "dest-ahmedabad",
      slug: "ahmedabad",
      name: "Ahmedabad",
      state: "Gujarat",
      region: "West",
      tagline: "India's First UNESCO World Heritage City of Pols",
      short_description: "Intricate wooden pol architecture, Sabarmati Ashram peace, stepwells, and mouth-watering Gujarati thalis.",
      full_description: "Founded in 1411 on the banks of the Sabarmati, Ahmedabad features centuries-old community pols with carved wooden facades, Gandhi's historic ashram, and the breathtaking Adalaj Stepwell.",
      hero_image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Architecture", "Food", "History", "Textiles"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3100,
      best_season: "October to March",
      ideal_for: "Architecture buffs, textile collectors, heritage seekers",
      attractions: [
        { name: "Sabarmati Gandhi Ashram", category: "History", cost: 0, duration: "2 hours" },
        { name: "Adalaj Stepwell (Vav) Architecture", category: "Architecture", cost: 50, duration: "1.5 hours" },
        { name: "Old City Pols Morning Heritage Walk", category: "Culture", cost: 200, duration: "2.5 hours" }
      ],
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    {
      id: "dest-kutch",
      slug: "kutch",
      name: "Rann of Kutch",
      state: "Gujarat",
      region: "West",
      tagline: "The Infinite White Salt Desert & Artisan Villages",
      short_description: "Endless crystalline white desert under moonlight, Rogan art, Ajrakh block prints, and Kutch embroidery.",
      full_description: "The Great Rann of Kutch is one of the world's largest seasonal salt marshes, illuminated by full moon festivals and surrounded by communities of master Rogan painters, weavers, and leather artisans.",
      hero_image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Desert", "Art & Craft", "Culture", "Photography"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3600,
      best_season: "November to February (Rann Utsav Season)",
      ideal_for: "Craft enthusiasts, desert photographers, cultural travellers",
      attractions: [
        { name: "White Desert Full Moon Sunset Walk", category: "Nature", cost: 250, duration: "3 hours" },
        { name: "Nirona Village Rogan Art Demonstration", category: "Art & Craft", cost: 0, duration: "2 hours" },
        { name: "Kalo Dungar (Black Hill) Highest Point", category: "Landscape", cost: 50, duration: "2 hours" }
      ],
      coordinates: { lat: 23.8344, lng: 69.8329 }
    },
    {
      id: "dest-statue-of-unity",
      slug: "statue-of-unity",
      name: "Statue of Unity (Kevadia)",
      state: "Gujarat",
      region: "West",
      tagline: "The World's Tallest Colossus on the Narmada",
      short_description: "182-metre bronze tribute to Sardar Vallabhbhai Patel, Narmada River valley, and valley of flowers.",
      full_description: "Standing at 182 meters overlooking the Sardar Sarovar Dam on the Narmada River, this engineering wonder honors Sardar Patel with high-speed elevators to the chest-level viewing gallery.",
      hero_image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Monuments", "Architecture", "Engineering", "Family"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 3500,
      best_season: "October to March",
      ideal_for: "Families, architecture admirers, domestic tourists",
      attractions: [
        { name: "Statue of Unity High-Speed Viewing Gallery", category: "Monuments", cost: 380, duration: "2.5 hours" },
        { name: "Narmada River Laser Light & Sound Show", category: "Experience", cost: 0, duration: "1 hour" },
        { name: "Valley of Flowers & Butterfly Garden", category: "Nature", cost: 100, duration: "2 hours" }
      ],
      coordinates: { lat: 21.8380, lng: 73.7191 }
    },
    {
      id: "dest-khajuraho",
      slug: "khajuraho",
      name: "Khajuraho",
      state: "Madhya Pradesh",
      region: "Central",
      tagline: "Masterpieces of Medieval Chandela Temple Art",
      short_description: "UNESCO World Heritage Nagara sandstone temples with exquisitely carved celestial dancers and motifs.",
      full_description: "Built between 950 and 1050 AD by the Chandela dynasty, the Khajuraho temples represent the pinnacle of Indian temple architecture and stone carving.",
      hero_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Art & Craft", "Architecture", "History"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2800,
      best_season: "October to March",
      ideal_for: "Art historians, heritage lovers, photographers",
      attractions: [
        { name: "Western Group of Temples UNESCO Complex", category: "Heritage", cost: 250, duration: "3 hours" },
        { name: "Kandariya Mahadeva Temple Sculpture Tour", category: "Architecture", cost: 0, duration: "2 hours" },
        { name: "Raneh Falls & Canyon Excursion", category: "Nature", cost: 200, duration: "2.5 hours" }
      ],
      coordinates: { lat: 24.8318, lng: 79.9199 }
    },
    {
      id: "dest-ujjain",
      slug: "ujjain",
      name: "Ujjain",
      state: "Madhya Pradesh",
      region: "Central",
      tagline: "The Sacred City of Mahakal on the Shipra River",
      short_description: "Mahakaleshwar Jyotirlinga, ancient Bhasma Aarti, astronomical Vedh Shala, and holy Shipra ghats.",
      full_description: "One of the seven sacred Mokshapuri cities, Ujjain is home to the south-facing Mahakaleshwar Jyotirlinga and the grand Mahakal Lok heritage corridor.",
      hero_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Culture", "Heritage", "History"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to March",
      ideal_for: "Spiritual seekers, pilgrims, heritage travellers",
      attractions: [
        { name: "Shree Mahakaleshwar Jyotirlinga Darshan", category: "Spirituality", cost: 0, duration: "3 hours" },
        { name: "Mahakal Lok Heritage Corridor Walk", category: "Heritage", cost: 0, duration: "2 hours" },
        { name: "Ram Ghat Evening Aarti on Shipra River", category: "Culture", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 23.1765, lng: 75.7885 }
    },
    {
      id: "dest-bhopal",
      slug: "bhopal",
      name: "Bhopal",
      state: "Madhya Pradesh",
      region: "Central",
      tagline: "The City of Lakes, Sanchi Stupa & Tribal Heritage",
      short_description: "Bhojtal lakes, nearby UNESCO Sanchi Buddhist Stupas, and prehistoric Bhimbetka rock shelters.",
      full_description: "Madhya Pradesh's green capital bridges historic Nawabi architecture with ancient history, serving as base for Emperor Ashoka's Sanchi Stupa and the 30,000-year-old rock art of Bhimbetka.",
      hero_image: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Archaeology", "Lakes", "Museums"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 2700,
      best_season: "October to March",
      ideal_for: "History buffs, archaeologists, cultural travellers",
      attractions: [
        { name: "Sanchi Great Buddhist Stupa (UNESCO)", category: "Heritage", cost: 250, duration: "3 hours" },
        { name: "Bhimbetka Prehistoric Rock Shelters (UNESCO)", category: "Archaeology", cost: 150, duration: "3 hours" },
        { name: "Upper Lake (Bhojtal) Sunset Walk", category: "Nature", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 23.2599, lng: 77.4126 }
    },
    {
      id: "dest-chitrakote",
      slug: "chitrakote",
      name: "Chitrakote Falls",
      state: "Chhattisgarh",
      region: "Central",
      tagline: "The Niagara of India on the Indravati River",
      short_description: "A horseshoe waterfall plunging 300 meters across Bastar's dense forests and tribal craft villages.",
      full_description: "Located in the Bastar district of Chhattisgarh, Chitrakote is India's widest waterfall, complemented by the rich bell metal (Dhokra) and terracotta craft traditions of local tribal communities.",
      hero_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Waterfalls", "Nature", "Tribal Art & Craft", "Offbeat"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "July to October (Peak monsoon flow) & Nov to Feb",
      ideal_for: "Nature photographers, offbeat explorers, craft enthusiasts",
      attractions: [
        { name: "Chitrakote Horseshoe Waterfall Viewpoint", category: "Waterfalls", cost: 0, duration: "2 hours" },
        { name: "Bastar Dhokra Bell Metal Artisan Village", category: "Art & Craft", cost: 0, duration: "2.5 hours" },
        { name: "Tirathgarh Step-tier Waterfall", category: "Nature", cost: 50, duration: "2 hours" }
      ],
      coordinates: { lat: 19.2016, lng: 81.7042 }
    },

    // --- SOUTH INDIA ---
    {
      id: "dest-hyderabad",
      slug: "hyderabad",
      name: "Hyderabad",
      state: "Telangana",
      region: "South",
      tagline: "The City of Pearls, Charminar & Royal Biryani",
      short_description: "Historic Golconda Fort, 16th-century Charminar, opulent Chowmahalla Palace, and world-famous Dum Biryani.",
      full_description: "Telangana's capital fuses Qutb Shahi and Asaf Jahi royal heritage with a thriving tech ecosystem. Discover the acoustics of Golconda Fort and the vibrant bangle markets of Laad Bazaar.",
      hero_image: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Food", "Architecture", "Shopping"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 3600,
      best_season: "October to March",
      ideal_for: "Culinary travellers, history lovers, urban explorers",
      attractions: [
        { name: "Charminar & Laad Bazaar Heritage Walk", category: "Heritage", cost: 50, duration: "2 hours" },
        { name: "Golconda Fort Sound & Light Tour", category: "History", cost: 200, duration: "3 hours" },
        { name: "Chowmahalla Palace & Vintage Cars", category: "Architecture", cost: 100, duration: "2 hours" }
      ],
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    {
      id: "dest-warangal",
      slug: "warangal",
      name: "Warangal",
      state: "Telangana",
      region: "South",
      tagline: "The Kakatiya Dynasty Capital & Ramappa UNESCO Temple",
      short_description: "Floating brick Ramappa Temple, Thousand Pillar Temple, and monolithic Kakatiya stone arches.",
      full_description: "Capital of the Kakatiya kingdom from the 12th to 14th centuries, Warangal is famed for the UNESCO-inscribed Ramappa Temple, constructed with lightweight floating bricks and delicate stone sculptures.",
      hero_image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Architecture", "History", "Offbeat"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to March",
      ideal_for: "Heritage lovers, architecture students, historians",
      attractions: [
        { name: "Ramappa UNESCO Heritage Temple", category: "Heritage", cost: 50, duration: "2.5 hours" },
        { name: "Thousand Pillar Temple & Star Base", category: "Architecture", cost: 0, duration: "1.5 hours" },
        { name: "Warangal Fort Stone Thoranam Gateway", category: "History", cost: 50, duration: "2 hours" }
      ],
      coordinates: { lat: 17.9689, lng: 79.5941 }
    },
    {
      id: "dest-visakhapatnam",
      slug: "visakhapatnam",
      name: "Visakhapatnam (Vizag)",
      state: "Andhra Pradesh",
      region: "South",
      tagline: "The City of Destiny: Coastlines, Hills & Submarines",
      short_description: "Rishikonda beach, Kailasagiri hilltop viewpoints, historic INS Kursura submarine museum, and coastal drives.",
      full_description: "Andhra Pradesh's premier coastal city boasts beaches framed by the Eastern Ghats, a decommissioned Soviet submarine museum on RK Beach, and Buddhist heritage sites at Thotlakonda.",
      hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Beach", "Coast", "Museums", "Nature"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3000,
      best_season: "October to March",
      ideal_for: "Beach lovers, families, coastal explorers",
      attractions: [
        { name: "INS Kursura Submarine Museum", category: "Museums", cost: 100, duration: "1.5 hours" },
        { name: "Kailasagiri Hilltop Ropeway & Bay View", category: "Landscape", cost: 150, duration: "2 hours" },
        { name: "Rushikonda Blue Flag Beach & Surfing", category: "Beach", cost: 0, duration: "3 hours" }
      ],
      coordinates: { lat: 17.6868, lng: 83.2185 }
    },
    {
      id: "dest-araku-valley",
      slug: "araku-valley",
      name: "Araku Valley",
      state: "Andhra Pradesh",
      region: "South",
      tagline: "Eastern Ghats Coffee Plantations & Borra Caves",
      short_description: "Organic tribal coffee aroma, million-year-old limestone stalactites, and panoramic glass-dome Vistadome train rides.",
      full_description: "Tucked into the Eastern Ghats, Araku Valley is home to indigenous tribal communities producing internationally acclaimed organic Arabica coffee and the dramatic subterranean Borra Caves.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Coffee", "Caves", "Tribal Culture"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2600,
      best_season: "September to March",
      ideal_for: "Coffee enthusiasts, nature lovers, scenic train travellers",
      attractions: [
        { name: "Borra Caves Stalactites Exploration", category: "Caves", cost: 100, duration: "2.5 hours" },
        { name: "Araku Organic Tribal Coffee Museum", category: "Culture", cost: 50, duration: "1.5 hours" },
        { name: "Katiki Waterfall Nature Trek", category: "Nature", cost: 0, duration: "3 hours" }
      ],
      coordinates: { lat: 18.3273, lng: 82.8775 }
    },
    {
      id: "dest-tirupati",
      slug: "tirupati",
      name: "Tirupati",
      state: "Andhra Pradesh",
      region: "South",
      tagline: "The Sacred Abode of Lord Venkateswara at Tirumala",
      short_description: "The world's most visited sacred shrine nestled on the seven holy Seshachalam hills.",
      full_description: "Surrounded by sacred hills and waterfalls, Tirupati is revered globally for the ancient Dravidian temple of Sri Venkateswara at Tirumala, celebrated for sublime spiritual traditions and Laddu Prasadam.",
      hero_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Heritage", "Pilgrimage"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2500,
      best_season: "September to March",
      ideal_for: "Spiritual seekers, pilgrims, heritage travellers",
      attractions: [
        { name: "Sri Venkateswara Swamy Temple Darshan", category: "Spirituality", cost: 300, duration: "4 hours" },
        { name: "Silathoranam Natural Stone Arch", category: "Nature", cost: 0, duration: "1 hour" },
        { name: "Kapila Theertham Waterfalls & Temple", category: "Culture", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 13.6288, lng: 79.4192 }
    },
    {
      id: "dest-vijayawada",
      slug: "vijayawada",
      name: "Vijayawada",
      state: "Andhra Pradesh",
      region: "South",
      tagline: "The Heart of Krishna River & Kanaka Durga Temple",
      short_description: "Indrakeeladri hill temple, 7th-century Undavalli rock-cut cave temples, and Prakasam Barrage.",
      full_description: "Located on the sacred Krishna River, Vijayawada is a vibrant cultural hub renowned for the Kanaka Durga hill shrine and the four-tiered Undavalli cave temples dedicated to Anantasayana Vishnu.",
      hero_image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Caves", "Spirituality", "Culture"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to March",
      ideal_for: "Heritage explorers, spiritual travellers",
      attractions: [
        { name: "Kanaka Durga Temple on Indrakeeladri", category: "Spirituality", cost: 0, duration: "2 hours" },
        { name: "Undavalli Rock-cut Cave Temples", category: "Heritage", cost: 50, duration: "2 hours" },
        { name: "Bhavani Island River Cruise", category: "Nature", cost: 150, duration: "2.5 hours" }
      ],
      coordinates: { lat: 16.5062, lng: 80.6480 }
    },
    {
      id: "dest-bengaluru",
      slug: "bengaluru",
      name: "Bengaluru",
      state: "Karnataka",
      region: "South",
      tagline: "The Garden City of Craft Brews, Tech & Palaces",
      short_description: "Lush botanical gardens of Lalbagh, Tudor-style Bangalore Palace, vibrant craft coffee culture, and art galleries.",
      full_description: "Karnataka's cosmopolitan capital balances lush green heritage like Cubbon Park and Tipu Sultan's Summer Palace with a world-class craft brewing and cafe scene.",
      hero_image: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Gardens", "Food & Brews", "Art & Culture", "Heritage"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3800,
      best_season: "October to March (Pleasant year-round)",
      ideal_for: "Urban explorers, foodies, art lovers",
      attractions: [
        { name: "Lalbagh Botanical Garden & Glass House", category: "Gardens", cost: 50, duration: "2.5 hours" },
        { name: "Bangalore Tudor Royal Palace", category: "Heritage", cost: 250, duration: "2 hours" },
        { name: "National Gallery of Modern Art (NGMA)", category: "Art & Culture", cost: 50, duration: "2 hours" }
      ],
      coordinates: { lat: 12.9716, lng: 77.5946 }
    },
    {
      id: "dest-mysuru",
      slug: "mysuru",
      name: "Mysuru",
      state: "Karnataka",
      region: "South",
      tagline: "The Royal Heritage Capital of Sandalwood & Silk",
      short_description: "Illuminated Indo-Saracenic Mysore Palace, Chamundi Hills, fragrant sandalwood bazaars, and Dasara grandeur.",
      full_description: "The former seat of the Wodeyar dynasty, Mysuru is famed for its grand Mysore Palace illuminated by 100,000 lightbulbs on weekends, Devaraja fruit and flower market, and pure Mysore silk weaving.",
      hero_image: "https://images.unsplash.com/photo-1600100397608-f010e47c7c00?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Silk & Craft", "Architecture", "Food"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3000,
      best_season: "September to March",
      ideal_for: "Heritage lovers, families, culture enthusiasts",
      attractions: [
        { name: "Mysore Palace & Royal Durbar Hall", category: "Heritage", cost: 100, duration: "2.5 hours" },
        { name: "Devaraja Century-old Heritage Market Walk", category: "Culture", cost: 0, duration: "1.5 hours" },
        { name: "Chamundeshwari Hilltop Temple", category: "Spirituality", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 12.2958, lng: 76.6394 }
    },
    {
      id: "dest-hampi",
      slug: "hampi",
      name: "Hampi",
      state: "Karnataka",
      region: "South",
      tagline: "The Boulder-strewn Ruins of the Vijayanagara Empire",
      short_description: "UNESCO boulder landscape, musical stone pillars of Vittala Temple, Virupaksha temple, and Tungabhadra sunsets.",
      full_description: "Capital of the medieval Vijayanagara Empire, Hampi features hundreds of stone monuments scattered across surreal granite boulder fields along the Tungabhadra River.",
      hero_image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Archaeology", "Bouldering", "Photography"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 2700,
      best_season: "October to March",
      ideal_for: "History buffs, photographers, backpackers, archaeologists",
      attractions: [
        { name: "Vittala Temple & Stone Chariot (UNESCO)", category: "Heritage", cost: 50, duration: "3 hours" },
        { name: "Virupaksha Living 7th-century Temple", category: "Spirituality", cost: 25, duration: "1.5 hours" },
        { name: "Matanga Hill Sunrise Panorama", category: "Landscape", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 15.3350, lng: 76.4600 }
    },
    {
      id: "dest-coorg",
      slug: "coorg",
      name: "Coorg (Kodagu)",
      state: "Karnataka",
      region: "South",
      tagline: "The Scotland of India: Coffee Groves & Kodava Warmth",
      short_description: "Misty Western Ghats coffee estates, spice trails, Abbey Falls, and unique Kodava martial culture.",
      full_description: "Coorg envelops visitors in lush green coffee plantations, fragrant black pepper vines, Tibetan Buddhist settlements at Bylakuppe, and rich Kodava hospitality.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Coffee", "Mountains", "Nature", "Relaxation"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3400,
      best_season: "October to April",
      ideal_for: "Nature lovers, couples, coffee enthusiasts",
      attractions: [
        { name: "Private Coffee & Spice Plantation Walk", category: "Nature", cost: 300, duration: "2 hours" },
        { name: "Namdroling Tibetan Golden Temple (Bylakuppe)", category: "Culture", cost: 0, duration: "2 hours" },
        { name: "Abbey Falls & Rainforest Canopy Trail", category: "Waterfalls", cost: 50, duration: "1.5 hours" }
      ],
      coordinates: { lat: 12.3375, lng: 75.8069 }
    },
    {
      id: "dest-gokarna",
      slug: "gokarna",
      name: "Gokarna",
      state: "Karnataka",
      region: "South",
      tagline: "Pristine Half-Moon Beaches & Ancient Coastal Temples",
      short_description: "Om Beach cliff trails, secluded sandy coves, temple town heritage, and serene Arabian Sea waves.",
      full_description: "Gokarna combines the ancient sanctity of Mahabaleshwar Temple with secluded coastal trekking along Kudle Beach, Om Beach, and Paradise Beach.",
      hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Beach", "Trekking", "Spirituality", "Relaxation"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 2500,
      best_season: "October to March",
      ideal_for: "Beach trekkers, solo travellers, spiritual seekers",
      attractions: [
        { name: "Five-Beach Cliff Trail (Kudle to Paradise)", category: "Trekking", cost: 0, duration: "3.5 hours" },
        { name: "Atmalinga Mahabaleshwar Temple", category: "Spirituality", cost: 0, duration: "1.5 hours" },
        { name: "Om Beach Sunset Sea Kayaking", category: "Beach", cost: 500, duration: "2 hours" }
      ],
      coordinates: { lat: 14.5479, lng: 74.3188 }
    },
    {
      id: "dest-chennai",
      slug: "chennai",
      name: "Chennai",
      state: "Tamil Nadu",
      region: "South",
      tagline: "The Gateway of South Indian Art, Music & Filter Coffee",
      short_description: "Kapaleeshwarar Dravidian temple, Marina Beach sunrise, Margazhi Carnatic music, and bronze craft.",
      full_description: "Tamil Nadu's capital is a stronghold of classical South Indian culture, renowned for ancient Dravidian temple gopurams in Mylapore, UNESCO bronzes, and authentic South Indian filter coffee.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Music & Dance", "Food", "Coast"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3200,
      best_season: "November to February",
      ideal_for: "Culture lovers, music and dance enthusiasts, foodies",
      attractions: [
        { name: "Kapaleeshwarar Mylapore Temple Walk", category: "Heritage", cost: 0, duration: "2 hours" },
        { name: "Marina Beach Sunrise Walk", category: "Coast", cost: 0, duration: "1.5 hours" },
        { name: "Government Museum Bronze Gallery", category: "Art & Culture", cost: 50, duration: "2 hours" }
      ],
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    {
      id: "dest-mahabalipuram",
      slug: "mahabalipuram",
      name: "Mahabalipuram (Mamallapuram)",
      state: "Tamil Nadu",
      region: "South",
      tagline: "UNESCO Rock-Cut Shore Temples & Pallava Sculptures",
      short_description: "7th-century coastal Shore Temple, Arjuna's Penance bas-relief, and living stone sculpting traditions.",
      full_description: "An ancient Pallava port city, Mahabalipuram features the UNESCO World Heritage Shore Temple overlooking the Bay of Bengal, monolithic Pancha Rathas, and streets echoing with master stone chisels.",
      hero_image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Sculpture", "Beach", "Archaeology"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2900,
      best_season: "October to March",
      ideal_for: "Archaeology buffs, art lovers, coastal explorers",
      attractions: [
        { name: "Shore Temple & Bay of Bengal Promenade", category: "Heritage", cost: 40, duration: "2 hours" },
        { name: "Arjuna's Penance Bas-Relief", category: "Architecture", cost: 0, duration: "1 hour" },
        { name: "Pancha Rathas Monolithic Chariots", category: "Heritage", cost: 40, duration: "1.5 hours" }
      ],
      coordinates: { lat: 12.6269, lng: 80.1927 }
    },
    {
      id: "dest-madurai",
      slug: "madurai",
      name: "Madurai",
      state: "Tamil Nadu",
      region: "South",
      tagline: "The Athens of the East & Meenakshi Amman Temple",
      short_description: "Towering polychrome gopurams of Meenakshi Temple, jasmine flower markets, and nocturnal food culture.",
      full_description: "One of India's oldest continuously inhabited cities, Madurai centers around the architectural wonder of Meenakshi Amman Temple, famed for its 14 monumental gateway towers and thousands of stucco figures.",
      hero_image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Spirituality", "Food", "Culture"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2600,
      best_season: "October to March",
      ideal_for: "Heritage seekers, spiritual travellers, photographers",
      attractions: [
        { name: "Meenakshi Amman Temple Complex & 1000 Pillar Hall", category: "Heritage", cost: 50, duration: "3.5 hours" },
        { name: "Thirumalai Nayakkar Palace Light Show", category: "History", cost: 50, duration: "1.5 hours" },
        { name: "Madurai Malli Jasmine Market Morning Walk", category: "Culture", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 9.9252, lng: 78.1198 }
    },
    {
      id: "dest-ooty",
      slug: "ooty",
      name: "Ooty (Udhagamandalam)",
      state: "Tamil Nadu",
      region: "South",
      tagline: "The Blue Mountains & Nilgiri Mountain Railway",
      short_description: "UNESCO toy train through Nilgiri tea hills, botanical gardens, pine forests, and Toda tribal heritage.",
      full_description: "Crown jewel of the Nilgiris, Ooty features rolling tea plantations, cool misty climate, the historic Nilgiri Mountain Railway, and Pykara lake waterfalls.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Tea", "Nature", "Family"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3200,
      best_season: "October to June",
      ideal_for: "Families, nature lovers, mountain seekers",
      attractions: [
        { name: "Nilgiri Toy Train UNESCO Mountain Ride", category: "Experience", cost: 300, duration: "3 hours" },
        { name: "Government Botanical Garden & Fern House", category: "Nature", cost: 50, duration: "2 hours" },
        { name: "Doddabetta Peak Panoramic View", category: "Mountains", cost: 30, duration: "1.5 hours" }
      ],
      coordinates: { lat: 11.4102, lng: 76.6950 }
    },
    {
      id: "dest-kodaikanal",
      slug: "kodaikanal",
      name: "Kodaikanal",
      state: "Tamil Nadu",
      region: "South",
      tagline: "The Princess of Hill Stations & Star-Shaped Lake",
      short_description: "Misty pine forests, star-shaped lake cycling, Pillar Rocks, and Kurinji flower hills.",
      full_description: "Perched high in the Palani Hills of Tamil Nadu, Kodaikanal is loved for its cool eucalyptus breezes, scenic lake promenades, and deep cliff-edge views at Coaker's Walk.",
      hero_image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Lakes", "Nature", "Romance"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 2900,
      best_season: "September to May",
      ideal_for: "Couples, nature lovers, trekkers",
      attractions: [
        { name: "Kodaikanal Star Lake Boating & Cycling", category: "Lakes", cost: 150, duration: "2 hours" },
        { name: "Coaker's Walk Misty Mountain Promenade", category: "Nature", cost: 30, duration: "1 hour" },
        { name: "Pillar Rocks & Pine Forest Trail", category: "Mountains", cost: 20, duration: "2 hours" }
      ],
      coordinates: { lat: 10.2381, lng: 77.4892 }
    },
    {
      id: "dest-kochi",
      slug: "kochi",
      name: "Kochi (Cochin)",
      state: "Kerala",
      region: "South",
      tagline: "The Queen of the Arabian Sea: Spices, Art & Chinese Nets",
      short_description: "Fort Kochi colonial alleys, iconic Chinese fishing nets, Mattancherry Jew Town, and Kochi-Muziris art.",
      full_description: "A centuries-old global spice trading hub, Kochi blends Dutch, Portuguese, British, and Jewish heritage with contemporary art biennales and serene backwater canals.",
      hero_image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Art", "Food", "Coast", "History"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3500,
      best_season: "September to March",
      ideal_for: "Art lovers, foodies, heritage enthusiasts",
      attractions: [
        { name: "Fort Kochi Chinese Fishing Nets Sunset", category: "Coast", cost: 0, duration: "1.5 hours" },
        { name: "Mattancherry Jew Town & Paradesi Synagogue", category: "Heritage", cost: 50, duration: "2 hours" },
        { name: "Kathakali Classical Dance & Makeup Demonstration", category: "Culture", cost: 400, duration: "2 hours" }
      ],
      coordinates: { lat: 9.9312, lng: 76.2673 }
    },
    {
      id: "dest-munnar",
      slug: "munnar",
      name: "Munnar",
      state: "Kerala",
      region: "South",
      tagline: "Rolling Emerald Tea Hills & Misty Western Ghats",
      short_description: "Velvety tea carpeted ridges, rare Nilgiri Tahr mountain goats in Eravikulam, and spice trail homestays.",
      full_description: "Located at the confluence of three mountain streams in Kerala's Idukki district, Munnar is celebrated for endless emerald tea plantations, cool mountain mist, and rare Neelakurinji blossoms.",
      hero_image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Tea", "Mountains", "Wildlife", "Nature"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 3400,
      best_season: "September to May",
      ideal_for: "Nature lovers, tea connoisseurs, photographers",
      attractions: [
        { name: "Kolukkumalai Sunrise Tea Safari", category: "Tea", cost: 800, duration: "4 hours" },
        { name: "Eravikulam National Park & Nilgiri Tahr", category: "Wildlife", cost: 200, duration: "3 hours" },
        { name: "Organic Cardamom & Spice Garden Trail", category: "Nature", cost: 200, duration: "2 hours" }
      ],
      coordinates: { lat: 10.0889, lng: 77.0595 }
    },
    {
      id: "dest-alappuzha",
      slug: "alappuzha",
      name: "Alappuzha (Alleppey)",
      state: "Kerala",
      region: "South",
      tagline: "The Venice of the East & Serene Palm Backwaters",
      short_description: "Gliding through emerald palm-fringed lagoons, traditional kettuvallam houseboats, and village canoe life.",
      full_description: "Renowned for its network of tranquil canals, lagoons, and Vembanad Lake, Alappuzha offers slow travel aboard handcrafted thatch-roof houseboats enjoying authentic Karimeen fish curry.",
      hero_image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Backwaters", "Houseboats", "Nature", "Food"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 4200,
      best_season: "September to March",
      ideal_for: "Couples, relaxation seekers, culinary explorers",
      attractions: [
        { name: "Traditional Kettuvallam Day Cruise", category: "Backwaters", cost: 1500, duration: "5 hours" },
        { name: "Village Country Canoe Narrow Canal Trail", category: "Culture", cost: 400, duration: "2.5 hours" },
        { name: "Alappuzha Historic Lighthouse & Pier Beach", category: "Coast", cost: 50, duration: "1.5 hours" }
      ],
      coordinates: { lat: 9.4981, lng: 76.3388 }
    },
    {
      id: "dest-wayanad",
      slug: "wayanad",
      name: "Wayanad",
      state: "Kerala",
      region: "South",
      tagline: "Ancient Edakkal Petroglyphs & Rainforested Peaks",
      short_description: "Prehistoric Neolithic cave carvings, Chembra heart lake trek, bamboo rafting, and spice plantations.",
      full_description: "Set high in the Western Ghats of northern Kerala, Wayanad is famous for prehistoric petroglyphs at Edakkal Caves, mist-shrouded Chembra Peak, and wild elephant corridors.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Caves", "Trekking", "Wildlife", "Spices"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3100,
      best_season: "October to May",
      ideal_for: "Trekkers, archaeology enthusiasts, nature lovers",
      attractions: [
        { name: "Edakkal Prehistoric Neolithic Caves", category: "Archaeology", cost: 100, duration: "2.5 hours" },
        { name: "Kuruva Island Bamboo Rafting Trail", category: "Nature", cost: 250, duration: "3 hours" },
        { name: "Banasura Sagar Earthen Dam Boating", category: "Lakes", cost: 200, duration: "2 hours" }
      ],
      coordinates: { lat: 11.6854, lng: 76.1320 }
    },
    {
      id: "dest-puducherry",
      slug: "puducherry",
      name: "Puducherry (Pondicherry)",
      state: "Puducherry",
      region: "South",
      tagline: "French Colonial Boulevards, Auroville & Coastal Zen",
      short_description: "Pastel mustard French Quarter villas, bougainvillea balconies, Sri Aurobindo Ashram, and croissant cafes.",
      full_description: "A coastal union territory retaining French colonial heritage, Puducherry features the leafy White Town grid, vibrant Tamil quarter architecture, seaside promenade, and experimental township of Auroville.",
      hero_image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "French Architecture", "Spirituality", "Food", "Coast"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3300,
      best_season: "October to March",
      ideal_for: "Café hoppers, heritage walkers, spiritual seekers",
      attractions: [
        { name: "White Town French Quarter Heritage Walk", category: "Heritage", cost: 0, duration: "2 hours" },
        { name: "Auroville Matrimandir & Peace Zone", category: "Spirituality", cost: 0, duration: "3 hours" },
        { name: "Goubert Promenade Seaside Sunset", category: "Coast", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 11.9416, lng: 79.8083 }
    },

    // --- EAST & NORTHEAST INDIA ---
    {
      id: "dest-kolkata",
      slug: "kolkata",
      name: "Kolkata",
      state: "West Bengal",
      region: "East",
      tagline: "The City of Joy: Victoria Memorial, Tramcars & Literature",
      short_description: "Colonial grandeur of Victoria Memorial, iconic Howrah Bridge, Kumartuli idol sculptors, and Mishti Doi.",
      full_description: "India's cultural capital on the Hooghly River is celebrated for intellectual heritage, Durga Puja grandeur, yellow vintage taxis, historical coffee houses, and colonial architecture.",
      hero_image: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Literature & Art", "Food", "History"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 2800,
      best_season: "October to March (Durga Puja Season)",
      ideal_for: "Culture vultures, literature enthusiasts, food lovers",
      attractions: [
        { name: "Victoria Memorial Hall & Gardens", category: "Heritage", cost: 50, duration: "2.5 hours" },
        { name: "Kumartuli Traditional Clay Sculptor Quarter", category: "Art & Craft", cost: 0, duration: "2 hours" },
        { name: "Howrah Bridge & Hooghly Sunset Ferry", category: "History", cost: 10, duration: "1.5 hours" }
      ],
      coordinates: { lat: 22.5726, lng: 88.3639 }
    },
    {
      id: "dest-darjeeling",
      slug: "darjeeling",
      name: "Darjeeling",
      state: "West Bengal",
      region: "East",
      tagline: "The Champagne of Teas & Kanchenjunga Sunrise",
      short_description: "Majestic sunrise over Mount Kanchenjunga from Tiger Hill, UNESCO Himalayan toy train, and organic tea gardens.",
      full_description: "Nestled in the eastern Himalayas, Darjeeling is globally famed for its exquisite muscatel black teas, views of the world's third highest peak, and vintage narrow-gauge railway.",
      hero_image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Tea", "Mountains", "Himalayas", "Heritage"],
      suggested_duration: "3 - 4 Days",
      daily_budget_estimate: 3300,
      best_season: "March to May & October to December",
      ideal_for: "Tea lovers, mountain gazers, railway enthusiasts",
      attractions: [
        { name: "Tiger Hill Sunrise over Mount Kanchenjunga", category: "Mountains", cost: 100, duration: "3 hours" },
        { name: "Darjeeling Himalayan Railway UNESCO Toy Train", category: "Heritage", cost: 600, duration: "2 hours" },
        { name: "Happy Valley Organic Tea Estate Tasting", category: "Tea", cost: 200, duration: "2 hours" }
      ],
      coordinates: { lat: 27.0410, lng: 88.2663 }
    },
    {
      id: "dest-gangtok",
      slug: "gangtok",
      name: "Gangtok",
      state: "Sikkim",
      region: "Northeast",
      tagline: "The Clean Himalayan Kingdom of Rumtek & Tsomgo Lake",
      short_description: "Organic mountain capital, Rumtek Buddhist monastery, pedestrian MG Marg, and glacial high-altitude lakes.",
      full_description: "Sikkim's cloud-kissed capital combines 100% organic living with Tibetan Buddhist monasteries like Rumtek, high altitude Tsomgo Lake at 12,310 ft, and sweeping views of Mt. Kanchenjunga.",
      hero_image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Buddhism", "Nature", "Lakes"],
      suggested_duration: "4 Days",
      daily_budget_estimate: 3600,
      best_season: "March to June & September to December",
      ideal_for: "Mountain seekers, Buddhist culture explorers, nature lovers",
      attractions: [
        { name: "Rumtek Dharma Chakra Buddhist Monastery", category: "Buddhism", cost: 50, duration: "2.5 hours" },
        { name: "Glacial Tsomgo Lake & Baba Mandir Excursion", category: "Lakes", cost: 1200, duration: "Full Day" },
        { name: "Pedestrian MG Marg Evening Stroll", category: "Culture", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 27.3389, lng: 88.6065 }
    },
    {
      id: "dest-shillong",
      slug: "shillong",
      name: "Shillong",
      state: "Meghalaya",
      region: "Northeast",
      tagline: "The Scotland of the East & Rock Music Capital",
      short_description: "Pine-covered rolling hills, cascading Elephant Falls, Umiam Lake, and vibrant Khasi musical culture.",
      full_description: "Meghalaya's capital Shillong is famed for cool highland breezes, the stunning Umiam Lake reservoir, vibrant street music culture, and unique matrilineal Khasi heritage.",
      hero_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Mountains", "Music", "Waterfalls", "Nature"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 3100,
      best_season: "September to May",
      ideal_for: "Nature enthusiasts, music lovers, road trippers",
      attractions: [
        { name: "Umiam Lake Watersports & Sunset", category: "Lakes", cost: 200, duration: "2.5 hours" },
        { name: "Elephant Falls Three-tier Cascade", category: "Waterfalls", cost: 50, duration: "1.5 hours" },
        { name: "Don Bosco Centre for Indigenous Cultures", category: "Museums", cost: 100, duration: "2.5 hours" }
      ],
      coordinates: { lat: 25.5788, lng: 91.8933 }
    },
    {
      id: "dest-cherrapunji",
      slug: "cherrapunji",
      name: "Cherrapunji (Sohra)",
      state: "Meghalaya",
      region: "Northeast",
      tagline: "Living Root Bridges & Plunging Cloud Waterfalls",
      short_description: "Bio-engineered Ficus living root bridges, Nohkalikai Falls, limestone caves, and cloud-draped rainforests.",
      full_description: "One of the wettest places on Earth, Cherrapunji is renowned for the incredible Double Decker Living Root Bridge grown by indigenous Khasi tribes across rushing jungle torrents.",
      hero_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Living Root Bridges", "Waterfalls", "Trekking", "Nature"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 3000,
      best_season: "October to April (Dry) & June-August (Monsoon waterfalls)",
      ideal_for: "Trekkers, adventure lovers, nature photographers",
      attractions: [
        { name: "Nongriat Double Decker Living Root Bridge Trek", category: "Trekking", cost: 100, duration: "6 hours" },
        { name: "Nohkalikai Falls (India's tallest plunge waterfall)", category: "Waterfalls", cost: 30, duration: "1.5 hours" },
        { name: "Mawsmai Limestone Caves Walkthrough", category: "Caves", cost: 50, duration: "1.5 hours" }
      ],
      coordinates: { lat: 25.2986, lng: 91.7324 }
    },
    {
      id: "dest-guwahati",
      slug: "guwahati",
      name: "Guwahati",
      state: "Assam",
      region: "Northeast",
      tagline: "The Gateway to the Northeast on the Mighty Brahmaputra",
      short_description: "Kamakhya Shakti Peeth, Brahmaputra river ropeway, peacock island, and rich Assamese tea & silk.",
      full_description: "Assam's river metropolis on the Brahmaputra is the spiritual heart of the region, housing the sacred Kamakhya Temple and India's longest river ropeway.",
      hero_image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Rivers", "Spirituality", "Heritage", "Silk"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2800,
      best_season: "October to April",
      ideal_for: "Pilgrims, culture seekers, gateway travellers",
      attractions: [
        { name: "Maa Kamakhya Nilachal Hill Temple", category: "Spirituality", cost: 0, duration: "3 hours" },
        { name: "Brahmaputra River Ropeway & Sunset Cruise", category: "Rivers", cost: 250, duration: "2 hours" },
        { name: "Sualkuchi Golden Muga Silk Weaving Village", category: "Art & Craft", cost: 0, duration: "3 hours" }
      ],
      coordinates: { lat: 26.1445, lng: 91.7362 }
    },
    {
      id: "dest-kaziranga",
      slug: "kaziranga",
      name: "Kaziranga National Park",
      state: "Assam",
      region: "Northeast",
      tagline: "The World Realm of the Great One-Horned Rhino",
      short_description: "UNESCO biodiversity haven harboring two-thirds of the world's great one-horned rhinoceroses in elephant grass.",
      full_description: "Stretching along the floodplains of the Brahmaputra, Kaziranga is a world-renowned UNESCO World Heritage wildlife sanctuary sheltering wild water buffalo, Royal Bengal tigers, and one-horned rhinos.",
      hero_image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Wildlife", "Safari", "Nature", "UNESCO"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 4200,
      best_season: "November to April (Park open season)",
      ideal_for: "Wildlife enthusiasts, safari photographers, nature lovers",
      attractions: [
        { name: "Central Kohora Range Jeep Safari", category: "Wildlife", cost: 2000, duration: "3.5 hours" },
        { name: "Kaziranga National Orchid & Biodiversity Park", category: "Nature", cost: 150, duration: "2 hours" },
        { name: "Western Bagori Range Wildlife Safari", category: "Wildlife", cost: 2000, duration: "3.5 hours" }
      ],
      coordinates: { lat: 26.5775, lng: 93.1711 }
    },
    {
      id: "dest-tawang",
      slug: "tawang",
      name: "Tawang",
      state: "Arunachal Pradesh",
      region: "Northeast",
      tagline: "The Land of the Monpas & India's Largest Buddhist Monastery",
      short_description: "400-year-old hilltop Tawang Monastery, frozen Sela Pass at 13,700 ft, and crystal high-altitude lakes.",
      full_description: "Perched at 10,000 ft near the borders of Bhutan and Tibet, Tawang is renowned for the majestic 17th-century Galden Namgey Lhatse monastery, pristine snowfields, and warm Monpa tribal culture.",
      hero_image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Buddhism", "Mountains", "High Altitude", "Tribal Culture"],
      suggested_duration: "4 - 5 Days",
      daily_budget_estimate: 3800,
      best_season: "March to June & September to November",
      ideal_for: "High-altitude explorers, Buddhist scholars, offbeat adventurers",
      attractions: [
        { name: "Tawang Buddhist Monastery (400 years old)", category: "Buddhism", cost: 50, duration: "3 hours" },
        { name: "Sela Pass High-Altitude Lake & Prayer Flags", category: "Landscape", cost: 0, duration: "2 hours" },
        { name: "Nuranang (Jung) Spectacular Waterfall", category: "Waterfalls", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 27.5861, lng: 91.8594 }
    },
    {
      id: "dest-puri",
      slug: "puri",
      name: "Puri",
      state: "Odisha",
      region: "East",
      tagline: "The Sacred Abode of Lord Jagannath on the Golden Beach",
      short_description: "12th-century Jagannath Temple, Mahaprasad 56-bhog traditions, Golden Sand Beach, and Raghurajpur Pattachitra art.",
      full_description: "One of the holy Char Dhams, Puri is famous for the towering Jagannath Temple, annual Rath Yatra festival, coastal breezes, and traditional palm-leaf Pattachitra painting.",
      hero_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Spirituality", "Beach", "Art & Craft", "Food"],
      suggested_duration: "3 Days",
      daily_budget_estimate: 2600,
      best_season: "October to March",
      ideal_for: "Pilgrims, craft collectors, beach lovers",
      attractions: [
        { name: "Shree Jagannath Temple & Ananda Bazar Mahaprasad", category: "Spirituality", cost: 0, duration: "3 hours" },
        { name: "Raghurajpur Heritage Pattachitra Artisan Village", category: "Art & Craft", cost: 0, duration: "2.5 hours" },
        { name: "Golden Beach Blue Flag Coastal Promenade", category: "Beach", cost: 20, duration: "2 hours" }
      ],
      coordinates: { lat: 19.8135, lng: 85.8312 }
    },
    {
      id: "dest-konark",
      slug: "konark",
      name: "Konark",
      state: "Odisha",
      region: "East",
      tagline: "The Sun Temple: Chariot of the Cosmic Sun God",
      short_description: "UNESCO 13th-century Sun Temple carved as a colossal stone chariot with 24 intricate sundial wheels.",
      full_description: "Constructed in 1250 AD by King Narasimhadeva I, the Sun Temple at Konark represents the pinnacle of Kalinga architecture with sculpted stone horses and giant wheels acting as precision sundials.",
      hero_image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Architecture", "UNESCO", "History"],
      suggested_duration: "1 - 2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to March",
      ideal_for: "Architecture lovers, history buffs, photographers",
      attractions: [
        { name: "Konark Sun Temple UNESCO World Heritage Site", category: "Heritage", cost: 40, duration: "3 hours" },
        { name: "Chandrabhaga Clean Sunset Beach", category: "Beach", cost: 0, duration: "1.5 hours" },
        { name: "Konark Archaeological Museum", category: "History", cost: 25, duration: "1.5 hours" }
      ],
      coordinates: { lat: 19.8876, lng: 86.0945 }
    },
    {
      id: "dest-bhubaneswar",
      slug: "bhubaneswar",
      name: "Bhubaneswar",
      state: "Odisha",
      region: "East",
      tagline: "The Temple City of India & Ancient Kalinga Heritage",
      short_description: "Lingaraj 11th-century temple, ancient rock-cut Udayagiri caves, and silver filigree craft.",
      full_description: "Odisha's capital showcases over a thousand years of temple architectural evolution, from the 7th-century Parasurameswara to the soaring 180-foot tower of Lingaraj Temple and Jain cave complexes.",
      hero_image: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Heritage", "Caves", "Art & Craft", "Architecture"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2700,
      best_season: "October to March",
      ideal_for: "Heritage explorers, architecture students, culture seekers",
      attractions: [
        { name: "Lingaraj Temple Heritage Enclosure", category: "Heritage", cost: 0, duration: "2.5 hours" },
        { name: "Udayagiri & Khandagiri 2nd-century BC Caves", category: "Caves", cost: 25, duration: "2.5 hours" },
        { name: "Mukteswar Gem of Odishan Architecture", category: "Architecture", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 20.2961, lng: 85.8245 }
    },
    {
      id: "dest-bodh-gaya",
      slug: "bodh-gaya",
      name: "Bodh Gaya",
      state: "Bihar",
      region: "East",
      tagline: "The Sacred Seat of Gautama Buddha's Enlightenment",
      short_description: "Mahabodhi UNESCO Temple, sacred Bodhi Tree, global Buddhist monasteries, and silent meditation.",
      full_description: "The most sacred pilgrimage site in Buddhism, Bodh Gaya is where Prince Siddhartha attained supreme enlightenment under the sacred Bodhi Tree around 500 BCE.",
      hero_image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Buddhism", "Spirituality", "Heritage", "UNESCO"],
      suggested_duration: "2 - 3 Days",
      daily_budget_estimate: 2300,
      best_season: "October to March",
      ideal_for: "Spiritual seekers, Buddhist pilgrims, meditators",
      attractions: [
        { name: "Mahabodhi Temple Complex & Vajrasana (UNESCO)", category: "Spirituality", cost: 0, duration: "3 hours" },
        { name: "Sacred Bodhi Tree & Meditation Garden", category: "Spirituality", cost: 0, duration: "2 hours" },
        { name: "Great 80-Foot Buddha Statue & Monasteries", category: "Culture", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 24.6961, lng: 84.9869 }
    },
    {
      id: "dest-ranchi",
      slug: "ranchi",
      name: "Ranchi",
      state: "Jharkhand",
      region: "East",
      tagline: "The City of Waterfalls & Tribal Art Heritage",
      short_description: "Hundru, Jonha and Dassam waterfalls plunging over Chota Nagpur plateau, and Sohrai-Khovar tribal art.",
      full_description: "Jharkhand's capital is surrounded by magnificent waterfalls formed by the Subarnarekha River, dense sal forests, and indigenous Sohrai mural painting traditions.",
      hero_image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Waterfalls", "Nature", "Tribal Art", "Offbeat"],
      suggested_duration: "2 Days",
      daily_budget_estimate: 2400,
      best_season: "October to March",
      ideal_for: "Nature lovers, offbeat travellers, waterfall enthusiasts",
      attractions: [
        { name: "Hundru Spectacular Waterfall (98m drop)", category: "Waterfalls", cost: 20, duration: "2.5 hours" },
        { name: "Jonha (Gautamdhara) Waterfalls Trail", category: "Nature", cost: 20, duration: "2 hours" },
        { name: "Tagore Hill Panoramic Viewpoint & Ashram", category: "Heritage", cost: 0, duration: "1.5 hours" }
      ],
      coordinates: { lat: 23.3441, lng: 85.3096 }
    },
    {
      id: "dest-port-blair",
      slug: "port-blair",
      name: "Sri Vijaya Puram (Port Blair)",
      state: "Andaman and Nicobar Islands",
      region: "Islands",
      tagline: "Cellular Jail Freedom History & Emerald Coral Isles",
      short_description: "Historic Cellular Jail memorial, pristine Radhanagar beach nearby, coral reefs, and turquoise seas.",
      full_description: "The capital of India's tropical Andaman and Nicobar archipelago commemorates India's freedom fighters at the national memorial of Cellular Jail while offering gateway access to Havelock and Neil islands.",
      hero_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
      gallery: ["https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"],
      travel_interests: ["Islands", "History", "Beaches", "Scuba & Corals"],
      suggested_duration: "4 - 5 Days",
      daily_budget_estimate: 4600,
      best_season: "October to May",
      ideal_for: "Beach lovers, history seekers, scuba divers",
      attractions: [
        { name: "Cellular Jail National Memorial & Light Show", category: "History", cost: 100, duration: "3 hours" },
        { name: "Ross Island (Netaji Subhash Chandra Bose Dweep)", category: "Heritage", cost: 200, duration: "3 hours" },
        { name: "Corbyn's Cove Beach & Coastal Drive", category: "Beach", cost: 0, duration: "2 hours" }
      ],
      coordinates: { lat: 11.6234, lng: 92.7265 }
    }
  ];

  // Insert destinations
  destinationsData.forEach((dest) => {
    insertDest.run(
      dest.id,
      dest.slug,
      dest.name,
      dest.state,
      dest.region,
      dest.tagline,
      dest.short_description,
      dest.full_description,
      dest.hero_image,
      JSON.stringify(dest.gallery),
      JSON.stringify(dest.travel_interests),
      dest.suggested_duration,
      dest.daily_budget_estimate,
      dest.best_season,
      dest.ideal_for,
      JSON.stringify(dest.attractions),
      JSON.stringify(dest.coordinates)
    );
  });

  console.log(`✓ Seeded ${destinationsData.length} curated destinations across India.`);

  // 4. Seed Bookable Listings (Stays, Tours, Workshops) with provider IDs attached
  const insertListing = db.prepare(`
    INSERT INTO listings (
      id, provider_id, destination_slug, category, title, tagline, price, price_unit,
      capacity, max_rooms, address, description, image, gallery, amenities, highlights,
      cancellation_policy, status, is_demo
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const listingsData = [
    // Stays - Jaipur
    {
      id: "lst-jpr-stay-01",
      provider_id: "usr-provider-01",
      destination_slug: "jaipur",
      category: "stay",
      title: "Alsisar Haveli & Royal Courtyard",
      tagline: "Restored 19th-century royal Rajput townhouse",
      price: 5200,
      price_unit: "per_night",
      capacity: 3,
      max_rooms: 4,
      address: "Sansar Chandra Road, Old Jaipur, Rajasthan",
      description: "A meticulously restored 1892 Rajput noble haveli featuring frescoed arcades, central sunken courtyard pool, antique four-poster beds, and traditional puppet performances at dusk.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Complimentary Royal Breakfast", "Heritage Courtyard Pool", "High-speed Wi-Fi", "Ayurvedic Spa", "Doctor on Call"],
      highlights: ["Centrally located", "Authentic fresco murals", "Rooftop dining"],
      cancellation_policy: "Free cancellation up to 48 hours before check-in.",
      status: "approved"
    },
    {
      id: "lst-jpr-stay-02",
      provider_id: "usr-provider-01",
      destination_slug: "jaipur",
      category: "stay",
      title: "Kalyan Heritage Boutique Homestay",
      tagline: "Warm family hospitality with homecooked Rajasthani flavors",
      price: 2400,
      price_unit: "per_night",
      capacity: 3,
      max_rooms: 6,
      address: "Hathroi Fort, Ajmer Road, Jaipur, Rajasthan",
      description: "Run by a multi-generational Jaipur family, this sunlit homestay offers spotless rooms with hand-block printed linen, rooftop yoga at dawn, and home-cooked ker sangri dinners.",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Homecooked Breakfast", "Free High-speed Wi-Fi", "Rooftop Terrace Cafe", "Travel Desk"],
      highlights: ["Cooking classes available", "Budget friendly", "Walkable to metro"],
      cancellation_policy: "Free cancellation up to 24 hours before check-in.",
      status: "approved"
    },
    // Experiences & Workshops - Jaipur
    {
      id: "lst-jpr-exp-01",
      provider_id: "usr-provider-01",
      destination_slug: "jaipur",
      category: "workshop",
      title: "Master Sanganeri Woodblock Printing Workshop",
      tagline: "Hand-print your own organic cotton scarf with natural vegetable dyes",
      price: 1200,
      price_unit: "per_person",
      capacity: 8,
      max_rooms: 0,
      address: "Sanganer Artisan Enclave, Jaipur",
      description: "Spend 3 hours with a 4th-generation master block printer. Carve your initials, blend indigo, turmeric, and madder dyes, and print a custom silk-cotton stole to take home.",
      image: "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"],
      amenities: ["All Art Supplies Included", "Pure Cotton Scarf Provided", "Masala Chai & Local Snacks", "Master Artisan Certificate"],
      highlights: ["Hands-on craft", "Take home your creation", "Natural vegetable dyes"],
      cancellation_policy: "Full refund if cancelled 24 hours prior to workshop.",
      status: "approved"
    },
    {
      id: "lst-jpr-exp-02",
      provider_id: "usr-provider-01",
      destination_slug: "jaipur",
      category: "tour",
      title: "Old City Dawn Heritage & Street Food Trail",
      tagline: "Secret havelis, rooftop temple aarti, and hot kachoris before the city awakens",
      price: 850,
      price_unit: "per_person",
      capacity: 12,
      max_rooms: 0,
      address: "Meeting Point: Hawa Mahal North Gate, Jaipur",
      description: "Walk the historic Pink City grid at 6:30 AM with a heritage storyteller. Visit Govind Dev Ji temple, observe the flower auction, and taste piping hot pyaaz kachoris and lassi.",
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Expert Licensed Historian Guide", "All Food & Chai Tastings Included", "Heritage Map of Jaipur"],
      highlights: ["Beat the mid-day heat", "Authentic culinary tasting", "Rooftop morning panorama"],
      cancellation_policy: "Free cancellation up to 12 hours before tour start.",
      status: "approved"
    },

    // Stays & Experiences - Kerala (Munnar & Alappuzha)
    {
      id: "lst-ker-stay-01",
      provider_id: "usr-provider-02",
      destination_slug: "munnar",
      category: "stay",
      title: "Lockhart Colonial Tea Estate Bungalow",
      tagline: "Colonial 1920s stone bungalow amidst 1,000 acres of tea hills",
      price: 6800,
      price_unit: "per_night",
      capacity: 4,
      max_rooms: 3,
      address: "Lockhart Tea Division, Munnar, Kerala",
      description: "Built by Scottish planters in 1928, this restored stone residence features high timber ceilings, crackling log fireplaces, afternoon cream tea on the lawn, and direct estate trekking trails.",
      image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Gourmet Planters Breakfast", "Log Fireplace in Every Suite", "Guided Estate Tea Walks", "Free Wi-Fi"],
      highlights: ["Panoramic tea valley views", "Zero-plastic eco property", "Fresh spring water"],
      cancellation_policy: "Free cancellation up to 72 hours before check-in.",
      status: "approved"
    },
    {
      id: "lst-ker-exp-01",
      provider_id: "usr-provider-02",
      destination_slug: "alappuzha",
      category: "tour",
      title: "Solar-Hybrid Backwater Canoe & Village Culinary Trail",
      tagline: "Quiet narrow canals, toddy tapping observation, and homestyle banana leaf feast",
      price: 1500,
      price_unit: "per_person",
      capacity: 6,
      max_rooms: 0,
      address: "Punnamada Jetty, Alappuzha, Kerala",
      description: "Glide through narrow waterways where large motorboats cannot enter. Visit coir rope makers, witness duck farming, and enjoy a fresh Syrian Christian or vegetarian lunch at a riverside home.",
      image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Silent Electric/Paddle Canoe", "Traditional Kerala Lunch Included", "Bottled Water & Fresh Tender Coconut", "Life Jackets"],
      highlights: ["Eco-friendly quiet propulsion", "Homecooked meal", "Intimate small group"],
      cancellation_policy: "Free cancellation up to 24 hours prior to departure.",
      status: "approved"
    },

    // Stays & Experiences - Varanasi
    {
      id: "lst-vns-stay-01",
      provider_id: "usr-provider-03",
      destination_slug: "varanasi",
      category: "stay",
      title: "BrijRama Palace on Darbhanga Ghat",
      tagline: "Architectural jewel perched right on Darbhanga Ghat since 1812",
      price: 8500,
      price_unit: "per_night",
      capacity: 2,
      max_rooms: 3,
      address: "Darbhanga Ghat, Dashashwamedh, Varanasi, Uttar Pradesh",
      description: "One of the oldest stone structures on the Varanasi riverfront, accessed exclusively by private wooden boat. Features classical morning sitar recitals, pure vegetarian dining, and river balconies.",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Private Boat Transfers Included", "River View Balcony", "Classical Sitar at Dawn", "Pure Veg Satvik Cuisine", "Wi-Fi"],
      highlights: ["Direct ghat access", "Historical 1812 architecture", "Panoramic Ganges sunrise"],
      cancellation_policy: "Free cancellation up to 5 days before check-in.",
      status: "approved"
    },
    {
      id: "lst-vns-exp-01",
      provider_id: "usr-provider-03",
      destination_slug: "varanasi",
      category: "workshop",
      title: "Banarasi Handloom Kadwa Silk Weaving Masterclass",
      tagline: "Weave pure zari threads with national award-winning master craftsmen",
      price: 1400,
      price_unit: "per_person",
      capacity: 6,
      max_rooms: 0,
      address: "Madanpura Silk Guild Lane, Varanasi",
      description: "Learn how the famed Banarasi brocades with real gold and silver zari are woven on pit looms. Try your hands at the shuttle, understand jacquard graph making, and enjoy Banarasi paan.",
      image: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Hands-on Loom Practice", "Silk Cocoon & Zari Identification Kit", "Banarasi Chai & Malai Toast", "Artisan Certificate"],
      highlights: ["Master weaver guidance", "Ethical direct craft support", "Ancient guild house"],
      cancellation_policy: "Free cancellation up to 24 hours in advance.",
      status: "approved"
    },

    // Stays & Experiences - Ladakh
    {
      id: "lst-leh-stay-01",
      provider_id: "usr-provider-04",
      destination_slug: "leh",
      category: "stay",
      title: "Nimmu House Eco Solar Heritage",
      tagline: "Eco-resort cradled by ancient willow trees and Himalayan streams",
      price: 7200,
      price_unit: "per_night",
      capacity: 3,
      max_rooms: 4,
      address: "Nimmu Village, Indus Valley, Leh, Ladakh",
      description: "A century-old Ladakhi noble house converted into an eco-resort with passive solar heating, organic farm-to-table dining, and mountain views.",
      image: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
      gallery: ["https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"],
      amenities: ["Organic Ladakhi Farm Breakfast", "Passive Solar Heating", "Mountain Stargazing Telescope", "High-speed Wi-Fi"],
      highlights: ["Carbon-neutral stay", "Heritage stone architecture", "Orchard setting"],
      cancellation_policy: "Free cancellation up to 7 days before check-in.",
      status: "approved"
    }
  ];

  listingsData.forEach((lst) => {
    insertListing.run(
      lst.id,
      lst.provider_id,
      lst.destination_slug,
      lst.category,
      lst.title,
      lst.tagline,
      lst.price,
      lst.price_unit,
      lst.capacity,
      lst.max_rooms,
      lst.address,
      lst.description,
      lst.image,
      JSON.stringify(lst.gallery),
      JSON.stringify(lst.amenities),
      JSON.stringify(lst.highlights),
      lst.cancellation_policy,
      lst.status,
      lst.is_demo
    );
  });

  console.log(`✓ Seeded ${listingsData.length} bookable listings (stays & experiences).`);

  // 5. Seed Sample Bookings (Pending, Confirmed, Cancelled)
  const insertBooking = db.prepare(`
    INSERT INTO bookings (
      id, booking_reference, traveller_id, provider_id, listing_id, booking_type,
      check_in_date, check_out_date, slot_time, guests_count, rooms_count,
      price_per_unit, total_amount, taxes_fees, price_snapshot, booking_status,
      payment_status, provider_notes, cancellation_reason
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  // Sample Confirmed Stay Booking
  insertBooking.run(
    "bkg-demo-001",
    "YV-2026-JPR-8821",
    "usr-traveller-01",
    "usr-provider-01",
    "lst-jpr-stay-01",
    "stay",
    "2026-10-15",
    "2026-10-18",
    null,
    2,
    1,
    5200,
    17472, // 3 nights @ 5200 + 12% GST
    1872,
    JSON.stringify({
      listing_title: "Alsisar Haveli & Royal Courtyard",
      destination: "Jaipur",
      price_per_night: 5200,
      nights: 3,
      gst_rate: "12%",
      provider_name: "Rathore Heritage Estates & Guilds"
    }),
    "confirmed",
    "demo_confirmed",
    "Delighted to welcome you to our heritage courtyard! Early check-in requested and approved.",
    null
  );

  // Sample Pending Workshop Booking
  insertBooking.run(
    "bkg-demo-002",
    "YV-2026-JPR-9403",
    "usr-traveller-01",
    "usr-provider-01",
    "lst-jpr-exp-01",
    "workshop",
    "2026-10-16",
    null,
    "10:00 AM - 01:00 PM",
    2,
    0,
    1200,
    2520, // 2 participants @ 1200 + 5% GST
    120,
    JSON.stringify({
      listing_title: "Master Sanganeri Woodblock Printing Workshop",
      destination: "Jaipur",
      price_per_person: 1200,
      participants: 2,
      gst_rate: "5%",
      provider_name: "Rathore Heritage Estates & Guilds"
    }),
    "pending",
    "demo_unpaid",
    null,
    null
  );

  // Sample Cancelled Booking
  insertBooking.run(
    "bkg-demo-003",
    "YV-2026-KER-1102",
    "usr-traveller-01",
    "usr-provider-02",
    "lst-ker-exp-01",
    "tour",
    "2026-09-20",
    null,
    "02:00 PM - 05:00 PM",
    1,
    0,
    1500,
    1575,
    75,
    JSON.stringify({
      listing_title: "Solar-Hybrid Backwater Canoe & Village Culinary Trail",
      destination: "Alappuzha",
      price_per_person: 1500,
      participants: 1
    }),
    "cancelled",
    "demo_unpaid",
    null,
    "Changed travel dates due to monsoon schedule."
  );

  console.log("✓ Seeded sample bookings with pending, confirmed, and cancelled states.");

  // 6. Seed Audit Log Event
  const insertAudit = db.prepare(`
    INSERT INTO audit_logs (id, user_id, action, entity_type, entity_id, details, ip_address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  insertAudit.run(
    "aud-001",
    "usr-admin-01",
    "SEED_DATABASE_INITIALIZATION",
    "SYSTEM",
    "ALL",
    JSON.stringify({ message: "Initial platform seeding for SIH 2026 student prototype." }),
    "127.0.0.1"
  );

  console.log("🎉 Seeding complete! Zero errors.");
}

// Run if called directly
if (process.argv[1]?.endsWith("seed.js")) {
  runSeed();
}
