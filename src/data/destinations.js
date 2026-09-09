// Comprehensive 60+ Destination Dataset covering all 28 Indian States & 8 Union Territories

export const regions = ["All", "North", "South", "East", "West", "Central", "Northeast", "Islands"];

export const travelInterestOptions = [
  "All",
  "Heritage",
  "Culture",
  "Food",
  "Nature",
  "Mountains",
  "Beach",
  "Spirituality",
  "Art & Craft",
  "Wildlife",
  "Architecture",
  "Tea",
  "Coffee",
  "Waterfalls",
  "Desert",
  "Lakes",
  "Backwaters",
  "Caves"
];

export const destinations = [
  // --- NORTH INDIA ---
  {
    id: "jaipur",
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "The Timeless Splendour of the Pink City",
    shortDescription: "Majestic forts, terracotta facades, vibrant bazaars, and opulent royal history nestled in the Aravalli hills.",
    fullDescription: "Jaipur, the UNESCO World Heritage capital of Rajasthan founded in 1727 by Maharaja Sawai Jai Singh II, is celebrated for its grid-planned architecture, astrological observatory, and living artisan quarters.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Culture", "Heritage", "Food", "Architecture", "Art & Craft"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3800,
    bestSeason: "October to March (Rajasthan Tourism Guide)",
    idealFor: "Heritage lovers, photographers, foodies, culture seekers",
    attractions: [
      { name: "Amber Palace & Sheesh Mahal", category: "Heritage", cost: 500, duration: "3 hours" },
      { name: "Hawa Mahal & Old City Street Walk", category: "Architecture", cost: 200, duration: "2 hours" },
      { name: "Jantar Mantar Observatory", category: "Culture", cost: 200, duration: "1.5 hours" }
    ],
    coordinates: { lat: 26.9124, lng: 75.7873 }
  },
  {
    id: "udaipur",
    slug: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "The City of Lakes, Marble Palaces & Royal Romance",
    shortDescription: "Gleaming white palaces mirrored on tranquil waters, surrounded by green Aravalli ridgelines.",
    fullDescription: "Founded in 1559 by Maharana Udai Singh II, Udaipur is the crown jewel of Mewar with its labyrinthine City Palace, Lake Pichola ghats, and romantic boat cruises.",
    heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Romance", "Lakes", "Art & Craft"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 4200,
    bestSeason: "September to March",
    idealFor: "Couples, heritage enthusiasts, luxury travellers",
    attractions: [
      { name: "City Palace Complex", category: "Heritage", cost: 400, duration: "3.5 hours" },
      { name: "Lake Pichola Sunset Boat Cruise", category: "Nature", cost: 500, duration: "1.5 hours" },
      { name: "Saheliyon-ki-Bari Gardens", category: "History", cost: 100, duration: "1 hour" }
    ],
    coordinates: { lat: 24.5854, lng: 73.7125 }
  },
  {
    id: "jodhpur",
    slug: "jodhpur",
    name: "Jodhpur",
    state: "Rajasthan",
    region: "North",
    tagline: "The Sun City & The Mighty Blue Fortress",
    shortDescription: "Indigo-painted houses sprawling beneath the towering ramparts of Mehrangarh Fort.",
    fullDescription: "Jodhpur stands at the edge of the Thar Desert, famed for its indigo alleys, historic stepwells like Toorji Ka Jhalra, and royal cenotaphs of Jaswant Thada.",
    heroImage: "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Culture", "Photography", "Food"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 3200,
    bestSeason: "October to March",
    idealFor: "History buffs, photographers, food explorers",
    attractions: [
      { name: "Mehrangarh Fort & Museum", category: "Heritage", cost: 600, duration: "3 hours" },
      { name: "Toorji Ka Jhalra Stepwell", category: "Architecture", cost: 0, duration: "1 hour" },
      { name: "Jaswant Thada Cenotaphs", category: "History", cost: 100, duration: "1.5 hours" }
    ],
    coordinates: { lat: 26.2389, lng: 73.0243 }
  },
  {
    id: "jaisalmer",
    slug: "jaisalmer",
    name: "Jaisalmer",
    state: "Rajasthan",
    region: "North",
    tagline: "The Golden City of Thar Sandstone",
    shortDescription: "A living golden fort rising from the sand dunes, intricate havelis, and desert stargazing.",
    fullDescription: "Jaisalmer's golden yellow sandstone fort houses a vibrant living community, Jain temples with exquisite carvings, and traditional Rajasthani folk music camps.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Desert", "Heritage", "Art & Craft", "Stargazing"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3400,
    bestSeason: "November to February",
    idealFor: "Adventure travellers, desert lovers, history buffs",
    attractions: [
      { name: "Jaisalmer Living Fort (Sonar Qila)", category: "Heritage", cost: 250, duration: "3 hours" },
      { name: "Patwon Ki Haveli", category: "Architecture", cost: 150, duration: "1.5 hours" },
      { name: "Sam Sand Dunes Sunset & Folk Music", category: "Desert", cost: 750, duration: "4 hours" }
    ],
    coordinates: { lat: 26.9157, lng: 70.9083 }
  },
  {
    id: "agra",
    slug: "agra",
    name: "Agra",
    state: "Uttar Pradesh",
    region: "North",
    tagline: "The Monument of Eternal Love & Mughal Splendor",
    shortDescription: "Home to the immortal white marble Taj Mahal, red sandstone Agra Fort, and Fatehpur Sikri.",
    fullDescription: "Agra served as the imperial Mughal capital for centuries. Today, visitors marvel at the sublime proportions of the Taj Mahal, the riverside gardens of Mehtab Bagh, and royal courtyards of Agra Fort.",
    heroImage: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Architecture", "History", "Food"],
    suggestedDuration: "2 Days",
    dailyBudgetEstimate: 3200,
    bestSeason: "October to March",
    idealFor: "First-time visitors to India, architecture lovers",
    attractions: [
      { name: "Taj Mahal at Sunrise", category: "Heritage", cost: 250, duration: "3 hours" },
      { name: "Agra Red Fort", category: "History", cost: 350, duration: "2 hours" },
      { name: "Mehtab Bagh Sunset Viewpoint", category: "Nature", cost: 100, duration: "1.5 hours" }
    ],
    coordinates: { lat: 27.1767, lng: 78.0081 }
  },
  {
    id: "varanasi",
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North",
    tagline: "The Spiritual Heartbeat of the Eternal Ganga",
    shortDescription: "Ancient stone ghats, mesmerizing evening Ganga Aarti, timeless silk weaving, and deep spiritual heritage.",
    fullDescription: "One of the world's oldest continually inhabited cities, Varanasi is the spiritual core of India. Life, philosophy, music, and art unfold along its 84 holy stone ghats.",
    heroImage: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Spirituality", "Culture", "Art & Craft", "Food", "Photography"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 2900,
    bestSeason: "October to March",
    idealFor: "Spiritual seekers, culture enthusiasts, photographers",
    attractions: [
      { name: "Dashashwamedh Ghat Evening Ganga Aarti", category: "Spirituality", cost: 0, duration: "2 hours" },
      { name: "Sunrise Rowing Boat on the Ganges", category: "Culture", cost: 400, duration: "2 hours" },
      { name: "Sarnath Buddhist Sacred Ruins", category: "Heritage", cost: 150, duration: "2.5 hours" }
    ],
    coordinates: { lat: 25.3176, lng: 82.9739 }
  },
  {
    id: "delhi",
    slug: "delhi",
    name: "Delhi",
    state: "Delhi (NCT)",
    region: "North",
    tagline: "The Epic Crossroads of Empires & Modern Vibrancy",
    shortDescription: "Centuries of dynasties preserved in Humayun's Tomb, Red Fort, Qutub Minar, and lively Chandni Chowk.",
    fullDescription: "India's capital seamlessly juxtaposes historic monuments like Humayun's Tomb and Qutub Minar with bustling street food lanes and lush Lodi Gardens.",
    heroImage: "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1592635196078-9fe3d54f2377?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Food", "Architecture", "Art & Craft", "History"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3500,
    bestSeason: "October to March",
    idealFor: "Urban explorers, history lovers, culinary travellers",
    attractions: [
      { name: "Humayun's Tomb UNESCO Site", category: "Heritage", cost: 250, duration: "2.5 hours" },
      { name: "Old Delhi Heritage Food Walk", category: "Food", cost: 600, duration: "3 hours" },
      { name: "Qutub Minar Complex", category: "Architecture", cost: 250, duration: "2 hours" }
    ],
    coordinates: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: "amritsar",
    slug: "amritsar",
    name: "Amritsar",
    state: "Punjab",
    region: "North",
    tagline: "The Golden Temple of Peace & Hearty Punjabi Warmth",
    shortDescription: "The sanctum of Sri Harmandir Sahib, communal langar kitchen, rich culinary heritage, and patriotic Wagah border.",
    fullDescription: "Amritsar is the spiritual capital of Sikhism. The gilded Golden Temple radiates serene devotion alongside legendary kulchas and the solemn history of Jallianwala Bagh.",
    heroImage: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Spirituality", "Food", "Culture", "History"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 2600,
    bestSeason: "October to March",
    idealFor: "Spiritual visitors, foodies, cultural explorers",
    attractions: [
      { name: "Sri Harmandir Sahib (Golden Temple)", category: "Spirituality", cost: 0, duration: "3.5 hours" },
      { name: "Wagah Border Beating Retreat Ceremony", category: "Culture", cost: 0, duration: "3 hours" },
      { name: "Jallianwala Bagh Memorial", category: "History", cost: 0, duration: "1.5 hours" }
    ],
    coordinates: { lat: 31.6340, lng: 74.8723 }
  },
  {
    id: "srinagar",
    slug: "srinagar",
    name: "Srinagar",
    state: "Jammu and Kashmir",
    region: "North",
    tagline: "Paradise on Earth: Dal Lake Shikaras & Mughal Terraces",
    shortDescription: "Intricately carved cedar houseboats, floating vegetable markets, saffron fields, and snow-capped Pir Panjal peaks.",
    fullDescription: "Kashmir's summer capital is famous for tranquil Dal Lake, aromatic kahwa tea, Pashmina shawls, and cascading terraced gardens of Nishat and Shalimar Bagh.",
    heroImage: "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Nature", "Lakes", "Art & Craft", "Mountains", "Heritage"],
    suggestedDuration: "4 - 5 Days",
    dailyBudgetEstimate: 4200,
    bestSeason: "April to October (Spring to Autumn) & Dec-Feb for Snow",
    idealFor: "Nature lovers, honeymooners, artisanal craft collectors",
    attractions: [
      { name: "Dal Lake Shikara & Floating Market", category: "Nature", cost: 800, duration: "3 hours" },
      { name: "Nishat & Shalimar Mughal Gardens", category: "Heritage", cost: 100, duration: "2 hours" },
      { name: "Old Srinagar Craft & Copper Bazaar", category: "Culture", cost: 0, duration: "2.5 hours" }
    ],
    coordinates: { lat: 34.0837, lng: 74.7973 }
  },
  {
    id: "leh",
    slug: "leh",
    name: "Leh",
    state: "Ladakh",
    region: "North",
    tagline: "The High-Altitude Land of Monasteries & Stargazing",
    shortDescription: "Tibetan Buddhist stupas, dramatic moonscapes, pristine azure high-altitude lakes, and mountain passes.",
    fullDescription: "Perched at 3,500m above sea level in the trans-Himalayan plateau, Leh offers awe-inspiring gompas like Thiksey, crystal-clear Pangong Lake, and rich Ladakhi hospitality.",
    heroImage: "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Mountains", "Spirituality", "Nature", "Culture"],
    suggestedDuration: "5 - 7 Days",
    dailyBudgetEstimate: 4500,
    bestSeason: "May to September",
    idealFor: "Trekkers, stargazers, cultural seekers, photographers",
    attractions: [
      { name: "Thiksey Monastery Morning Chanting", category: "Spirituality", cost: 100, duration: "2.5 hours" },
      { name: "Pangong Tso High-Altitude Lake Excursion", category: "Nature", cost: 1500, duration: "Full Day" },
      { name: "Shanti Stupa Sunset View", category: "Culture", cost: 0, duration: "1.5 hours" }
    ],
    coordinates: { lat: 34.1526, lng: 77.5771 }
  },
  {
    id: "shimla",
    slug: "shimla",
    name: "Shimla",
    state: "Himachal Pradesh",
    region: "North",
    tagline: "The Queen of Hills & British Colonial Splendour",
    shortDescription: "Pine-clad hills, heritage toy train, neo-Gothic Christ Church, and breezy Mall Road strolls.",
    fullDescription: "Once the summer capital of British India, Shimla retains colonial charm across The Ridge, Jakhoo Temple, and surrounding apple orchards of Kufri.",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Mountains", "Heritage", "Nature"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3200,
    bestSeason: "March to June & December to February",
    idealFor: "Families, mountain enthusiasts, heritage explorers",
    attractions: [
      { name: "The Ridge & Mall Road Walk", category: "Heritage", cost: 0, duration: "2 hours" },
      { name: "Kalka-Shimla UNESCO Toy Train Ride", category: "Heritage", cost: 350, duration: "4 hours" },
      { name: "Viceregal Lodge & Gardens", category: "History", cost: 150, duration: "2 hours" }
    ],
    coordinates: { lat: 31.1048, lng: 77.1734 }
  },
  {
    id: "manali",
    slug: "manali",
    name: "Manali",
    state: "Himachal Pradesh",
    region: "North",
    tagline: "The Valley of the Gods & Alpine Adventures",
    shortDescription: "Coniferous forests, swift Beas River rapids, Solang Valley paragliding, and gateway to Atal Tunnel.",
    fullDescription: "Nestled in the Kullu Valley, Manali combines ancient wooden temples like Hadimba with thrilling adventures in Solang Valley and serene Old Manali cafes.",
    heroImage: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596761266903-85f0bc76771d?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Mountains", "Nature", "Waterfalls"],
    suggestedDuration: "4 - 5 Days",
    dailyBudgetEstimate: 3400,
    bestSeason: "October to June",
    idealFor: "Backpackers, adventure seekers, couples",
    attractions: [
      { name: "Hadimba Ancient Cedar Temple", category: "Heritage", cost: 50, duration: "1.5 hours" },
      { name: "Solang Valley Snow Activities", category: "Nature", cost: 1200, duration: "4 hours" },
      { name: "Old Manali Riverside Trail", category: "Nature", cost: 0, duration: "2 hours" }
    ],
    coordinates: { lat: 32.2396, lng: 77.1887 }
  },
  {
    id: "rishikesh",
    slug: "rishikesh",
    name: "Rishikesh",
    state: "Uttarakhand",
    region: "North",
    tagline: "The Yoga Capital of the World & Himalayan Gateway",
    shortDescription: "Ganges river rafting, suspension bridges, ashram meditation, and soulful Parmarth Niketan aarti.",
    fullDescription: "Where the holy Ganga emerges from the Shivalik Himalayas, Rishikesh draws global seekers for certified yoga teacher trainings, Ayurvedic retreats, and white-water rapids.",
    heroImage: "https://images.unsplash.com/photo-1596761266903-85f0bc76771d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Spirituality", "Nature", "Culture", "Mountains"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 2800,
    bestSeason: "September to April",
    idealFor: "Yoga practitioners, wellness seekers, adventure enthusiasts",
    attractions: [
      { name: "Ganga White Water Rafting", category: "Nature", cost: 1000, duration: "3 hours" },
      { name: "Parmarth Niketan Sunset Aarti", category: "Spirituality", cost: 0, duration: "1.5 hours" },
      { name: "The Beatles Ashram Heritage Walk", category: "Culture", cost: 150, duration: "2 hours" }
    ],
    coordinates: { lat: 30.0869, lng: 78.2676 }
  },
  {
    id: "haridwar",
    slug: "haridwar",
    name: "Haridwar",
    state: "Uttarakhand",
    region: "North",
    tagline: "The Gateway to the Gods on the Holy Ganges",
    shortDescription: "Har Ki Pauri ghat, floating marigold diyas, ancient temples, and vibrant Vedic traditions.",
    fullDescription: "One of Hinduism's seven sacred cities, Haridwar is celebrated for the Kumbh Mela and the daily spectacle of thousands of lamps floating down the sacred Brahmakund at dusk.",
    heroImage: "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Spirituality", "Culture", "Heritage", "Food"],
    suggestedDuration: "2 Days",
    dailyBudgetEstimate: 2400,
    bestSeason: "October to April",
    idealFor: "Pilgrims, cultural explorers, photographers",
    attractions: [
      { name: "Har Ki Pauri Evening Ganga Aarti", category: "Spirituality", cost: 0, duration: "2 hours" },
      { name: "Mansa Devi Ropeway & Temple", category: "Culture", cost: 150, duration: "2 hours" }
    ],
    coordinates: { lat: 29.9457, lng: 78.1642 }
  },
  {
    id: "nainital",
    slug: "nainital",
    name: "Nainital",
    state: "Uttarakhand",
    region: "North",
    tagline: "The Lake City of Kumaon Himalayas",
    shortDescription: "Emerald eye-shaped Naini Lake, surrounding oak ridges, Mall Road, and panoramic snow views.",
    fullDescription: "Cradled in the Kumaon hills around the revered emerald Naini Lake, Nainital provides tranquil boating, colonial architecture, and views of Nanda Devi peak.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Lakes", "Mountains", "Nature"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3000,
    bestSeason: "March to June & September to November",
    idealFor: "Families, nature lovers, weekend getaways",
    attractions: [
      { name: "Naini Lake Yacht & Paddle Boating", category: "Lakes", cost: 300, duration: "1.5 hours" },
      { name: "Snow View Point Cable Car", category: "Mountains", cost: 300, duration: "2 hours" }
    ],
    coordinates: { lat: 29.3919, lng: 79.4542 }
  },

  // --- WEST & CENTRAL INDIA ---
  {
    id: "mumbai",
    slug: "mumbai",
    name: "Mumbai",
    state: "Maharashtra",
    region: "West",
    tagline: "The Maximum City: Art Deco, Marine Drive & Cinema",
    shortDescription: "Victorian Gothic UNESCO landmarks, Arabian Sea sunsets on Marine Drive, street food, and vibrant arts.",
    fullDescription: "India's financial and cultural powerhouse is home to UNESCO Victorian Gothic ensembles, historic Elephanta Caves, and the irresistible rhythm of the Arabian Sea coastline.",
    heroImage: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Architecture", "Food", "Culture", "Heritage", "Beach"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 4800,
    bestSeason: "November to February",
    idealFor: "Urbanites, architecture lovers, foodies, art seekers",
    attractions: [
      { name: "Gateway of India & Colaba Heritage Walk", category: "Heritage", cost: 0, duration: "2.5 hours" },
      { name: "Elephanta Island Rock-cut Caves", category: "Heritage", cost: 300, duration: "4 hours" }
    ],
    coordinates: { lat: 18.9220, lng: 72.8347 }
  },
  {
    id: "goa",
    slug: "goa",
    name: "Goa",
    state: "Goa",
    region: "West",
    tagline: "Sunkissed Coastlines, Portuguese Mansions & Serene Backwaters",
    shortDescription: "Golden palm-fringed beaches, Latin Quarter Fontainhas, spice plantations, and laidback susegad.",
    fullDescription: "India's coastal paradise blends Portuguese heritage with Konkani flavors. Explore Old Goa's UNESCO basilicas, quiet south beaches like Palolem, and eco-friendly cashew groves.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Beach", "Heritage", "Food", "Culture"],
    suggestedDuration: "4 - 5 Days",
    dailyBudgetEstimate: 4200,
    bestSeason: "November to March",
    idealFor: "Beach lovers, heritage travellers, food explorers",
    attractions: [
      { name: "Fontainhas Latin Quarter Heritage Walk", category: "Culture", cost: 0, duration: "2 hours" },
      { name: "Basilica of Bom Jesus UNESCO Site", category: "Heritage", cost: 0, duration: "1.5 hours" }
    ],
    coordinates: { lat: 15.2993, lng: 74.1240 }
  },
  {
    id: "ahmedabad",
    slug: "ahmedabad",
    name: "Ahmedabad",
    state: "Gujarat",
    region: "West",
    tagline: "India's First UNESCO World Heritage City of Pols",
    shortDescription: "Intricate wooden pol architecture, Sabarmati Ashram peace, stepwells, and mouth-watering Gujarati thalis.",
    fullDescription: "Founded in 1411 on the banks of the Sabarmati, Ahmedabad features centuries-old community pols with carved wooden facades, Gandhi's historic ashram, and the breathtaking Adalaj Stepwell.",
    heroImage: "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Architecture", "Food", "Art & Craft"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 3100,
    bestSeason: "October to March",
    idealFor: "Architecture buffs, textile collectors, heritage seekers",
    attractions: [
      { name: "Sabarmati Gandhi Ashram", category: "Culture", cost: 0, duration: "2 hours" },
      { name: "Adalaj Stepwell (Vav) Architecture", category: "Architecture", cost: 50, duration: "1.5 hours" }
    ],
    coordinates: { lat: 23.0225, lng: 72.5714 }
  },
  {
    id: "kutch",
    slug: "kutch",
    name: "Rann of Kutch",
    state: "Gujarat",
    region: "West",
    tagline: "The Infinite White Salt Desert & Artisan Villages",
    shortDescription: "Endless crystalline white desert under moonlight, Rogan art, Ajrakh block prints, and Kutch embroidery.",
    fullDescription: "The Great Rann of Kutch is one of the world's largest seasonal salt marshes, illuminated by full moon festivals and surrounded by communities of master Rogan painters, weavers, and leather artisans.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Desert", "Art & Craft", "Culture"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3600,
    bestSeason: "November to February",
    idealFor: "Craft enthusiasts, desert photographers, cultural travellers",
    attractions: [
      { name: "White Desert Full Moon Sunset Walk", category: "Desert", cost: 250, duration: "3 hours" },
      { name: "Nirona Village Rogan Art Demonstration", category: "Art & Craft", cost: 0, duration: "2 hours" }
    ],
    coordinates: { lat: 23.8344, lng: 69.8329 }
  },
  {
    id: "khajuraho",
    slug: "khajuraho",
    name: "Khajuraho",
    state: "Madhya Pradesh",
    region: "Central",
    tagline: "Masterpieces of Medieval Chandela Temple Art",
    shortDescription: "UNESCO World Heritage Nagara sandstone temples with exquisitely carved celestial dancers and motifs.",
    fullDescription: "Built between 950 and 1050 AD by the Chandela dynasty, the Khajuraho temples represent the pinnacle of Indian temple architecture and stone carving.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Art & Craft", "Architecture"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 2800,
    bestSeason: "October to March",
    idealFor: "Art historians, heritage lovers, photographers",
    attractions: [
      { name: "Western Group of Temples UNESCO Complex", category: "Heritage", cost: 250, duration: "3 hours" },
      { name: "Kandariya Mahadeva Temple Tour", category: "Architecture", cost: 0, duration: "2 hours" }
    ],
    coordinates: { lat: 24.8318, lng: 79.9199 }
  },
  {
    id: "chitrakote",
    slug: "chitrakote",
    name: "Chitrakote Falls",
    state: "Chhattisgarh",
    region: "Central",
    tagline: "The Niagara of India on the Indravati River",
    shortDescription: "A horseshoe waterfall plunging 300 meters across Bastar's dense forests and tribal craft villages.",
    fullDescription: "Located in the Bastar district of Chhattisgarh, Chitrakote is India's widest waterfall, complemented by the rich bell metal (Dhokra) and terracotta craft traditions of local tribal communities.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Waterfalls", "Nature", "Art & Craft"],
    suggestedDuration: "2 Days",
    dailyBudgetEstimate: 2400,
    bestSeason: "July to October (Peak Flow) & Nov to Feb",
    idealFor: "Nature photographers, offbeat explorers, craft enthusiasts",
    attractions: [
      { name: "Chitrakote Horseshoe Waterfall Viewpoint", category: "Waterfalls", cost: 0, duration: "2 hours" },
      { name: "Bastar Dhokra Bell Metal Artisan Village", category: "Art & Craft", cost: 0, duration: "2.5 hours" }
    ],
    coordinates: { lat: 19.2016, lng: 81.7042 }
  },

  // --- SOUTH INDIA ---
  {
    id: "hyderabad",
    slug: "hyderabad",
    name: "Hyderabad",
    state: "Telangana",
    region: "South",
    tagline: "The City of Pearls, Charminar & Royal Biryani",
    shortDescription: "Historic Golconda Fort, 16th-century Charminar, opulent Chowmahalla Palace, and world-famous Dum Biryani.",
    fullDescription: "Telangana's capital fuses Qutb Shahi and Asaf Jahi royal heritage with a thriving tech ecosystem. Discover the acoustics of Golconda Fort and the vibrant bangle markets of Laad Bazaar.",
    heroImage: "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Food", "Architecture"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3600,
    bestSeason: "October to March",
    idealFor: "Culinary travellers, history lovers, urban explorers",
    attractions: [
      { name: "Charminar & Laad Bazaar Heritage Walk", category: "Heritage", cost: 50, duration: "2 hours" },
      { name: "Golconda Fort Sound & Light Tour", category: "Heritage", cost: 200, duration: "3 hours" }
    ],
    coordinates: { lat: 17.3850, lng: 78.4867 }
  },
  {
    id: "visakhapatnam",
    slug: "visakhapatnam",
    name: "Visakhapatnam (Vizag)",
    state: "Andhra Pradesh",
    region: "South",
    tagline: "The City of Destiny: Coastlines, Hills & Submarines",
    shortDescription: "Rishikonda beach, Kailasagiri hilltop viewpoints, historic INS Kursura submarine museum, and coastal drives.",
    fullDescription: "Andhra Pradesh's premier coastal city boasts beaches framed by the Eastern Ghats, a decommissioned Soviet submarine museum on RK Beach, and Buddhist heritage sites at Thotlakonda.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Beach", "Nature"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3000,
    bestSeason: "October to March",
    idealFor: "Beach lovers, families, coastal explorers",
    attractions: [
      { name: "INS Kursura Submarine Museum", category: "Culture", cost: 100, duration: "1.5 hours" },
      { name: "Rushikonda Blue Flag Beach", category: "Beach", cost: 0, duration: "3 hours" }
    ],
    coordinates: { lat: 17.6868, lng: 83.2185 }
  },
  {
    id: "araku-valley",
    slug: "araku-valley",
    name: "Araku Valley",
    state: "Andhra Pradesh",
    region: "South",
    tagline: "Eastern Ghats Coffee Plantations & Borra Caves",
    shortDescription: "Organic tribal coffee aroma, million-year-old limestone stalactites, and panoramic glass-dome Vistadome train rides.",
    fullDescription: "Tucked into the Eastern Ghats, Araku Valley is home to indigenous tribal communities producing internationally acclaimed organic Arabica coffee and the dramatic subterranean Borra Caves.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Coffee", "Mountains", "Caves", "Nature"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 2600,
    bestSeason: "September to March",
    idealFor: "Coffee enthusiasts, nature lovers, scenic train travellers",
    attractions: [
      { name: "Borra Caves Stalactites Exploration", category: "Caves", cost: 100, duration: "2.5 hours" },
      { name: "Araku Organic Tribal Coffee Museum", category: "Coffee", cost: 50, duration: "1.5 hours" }
    ],
    coordinates: { lat: 18.3273, lng: 82.8775 }
  },
  {
    id: "bengaluru",
    slug: "bengaluru",
    name: "Bengaluru",
    state: "Karnataka",
    region: "South",
    tagline: "The Garden City of Craft Brews, Tech & Palaces",
    shortDescription: "Lush botanical gardens of Lalbagh, Tudor-style Bangalore Palace, vibrant craft coffee culture, and art galleries.",
    fullDescription: "Karnataka's cosmopolitan capital balances lush green heritage like Cubbon Park and Tipu Sultan's Summer Palace with a world-class craft brewing and cafe scene.",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Food", "Heritage", "Culture"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 3800,
    bestSeason: "October to March",
    idealFor: "Urban explorers, foodies, art lovers",
    attractions: [
      { name: "Lalbagh Botanical Garden & Glass House", category: "Nature", cost: 50, duration: "2.5 hours" },
      { name: "Bangalore Tudor Royal Palace", category: "Heritage", cost: 250, duration: "2 hours" }
    ],
    coordinates: { lat: 12.9716, lng: 77.5946 }
  },
  {
    id: "mysuru",
    slug: "mysuru",
    name: "Mysuru",
    state: "Karnataka",
    region: "South",
    tagline: "The Royal Heritage Capital of Sandalwood & Silk",
    shortDescription: "Illuminated Indo-Saracenic Mysore Palace, Chamundi Hills, fragrant sandalwood bazaars, and Dasara grandeur.",
    fullDescription: "The former seat of the Wodeyar dynasty, Mysuru is famed for its grand Mysore Palace illuminated by 100,000 lightbulbs on weekends, Devaraja fruit and flower market, and pure Mysore silk weaving.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010e47c7c00?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Art & Craft", "Architecture", "Food"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 3000,
    bestSeason: "September to March",
    idealFor: "Heritage lovers, families, culture enthusiasts",
    attractions: [
      { name: "Mysore Palace & Royal Durbar Hall", category: "Heritage", cost: 100, duration: "2.5 hours" },
      { name: "Devaraja Century-old Heritage Market Walk", category: "Culture", cost: 0, duration: "1.5 hours" }
    ],
    coordinates: { lat: 12.2958, lng: 76.6394 }
  },
  {
    id: "hampi",
    slug: "hampi",
    name: "Hampi",
    state: "Karnataka",
    region: "South",
    tagline: "The Boulder-strewn Ruins of the Vijayanagara Empire",
    shortDescription: "UNESCO boulder landscape, musical stone pillars of Vittala Temple, Virupaksha temple, and Tungabhadra sunsets.",
    fullDescription: "Capital of the medieval Vijayanagara Empire, Hampi features hundreds of stone monuments scattered across surreal granite boulder fields along the Tungabhadra River.",
    heroImage: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Architecture", "Photography"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 2700,
    bestSeason: "October to March",
    idealFor: "History buffs, photographers, backpackers, archaeologists",
    attractions: [
      { name: "Vittala Temple & Stone Chariot (UNESCO)", category: "Heritage", cost: 50, duration: "3 hours" },
      { name: "Virupaksha Living 7th-century Temple", category: "Spirituality", cost: 25, duration: "1.5 hours" }
    ],
    coordinates: { lat: 15.3350, lng: 76.4600 }
  },
  {
    id: "coorg",
    slug: "coorg",
    name: "Coorg (Kodagu)",
    state: "Karnataka",
    region: "South",
    tagline: "The Scotland of India: Coffee Groves & Kodava Warmth",
    shortDescription: "Misty Western Ghats coffee estates, spice trails, Abbey Falls, and unique Kodava martial culture.",
    fullDescription: "Coorg envelops visitors in lush green coffee plantations, fragrant black pepper vines, Tibetan Buddhist settlements at Bylakuppe, and rich Kodava hospitality.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Coffee", "Mountains", "Nature"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3400,
    bestSeason: "October to April",
    idealFor: "Nature lovers, couples, coffee enthusiasts",
    attractions: [
      { name: "Private Coffee & Spice Plantation Walk", category: "Coffee", cost: 300, duration: "2 hours" },
      { name: "Namdroling Tibetan Golden Temple (Bylakuppe)", category: "Culture", cost: 0, duration: "2 hours" }
    ],
    coordinates: { lat: 12.3375, lng: 75.8069 }
  },
  {
    id: "munnar",
    slug: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "South",
    tagline: "Rolling Emerald Tea Hills & Misty Western Ghats",
    shortDescription: "Velvety tea carpeted ridges, rare Nilgiri Tahr mountain goats in Eravikulam, and spice trail homestays.",
    fullDescription: "Located at the confluence of three mountain streams in Kerala's Idukki district, Munnar is celebrated for endless emerald tea plantations, cool mountain mist, and rare Neelakurinji blossoms.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Tea", "Mountains", "Nature", "Wildlife"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3400,
    bestSeason: "September to May",
    idealFor: "Nature lovers, tea connoisseurs, photographers",
    attractions: [
      { name: "Kolukkumalai Sunrise Tea Safari", category: "Tea", cost: 800, duration: "4 hours" },
      { name: "Eravikulam National Park & Nilgiri Tahr", category: "Wildlife", cost: 200, duration: "3 hours" }
    ],
    coordinates: { lat: 10.0889, lng: 77.0595 }
  },
  {
    id: "alappuzha",
    slug: "alappuzha",
    name: "Alappuzha (Alleppey)",
    state: "Kerala",
    region: "South",
    tagline: "The Venice of the East & Serene Palm Backwaters",
    shortDescription: "Gliding through emerald palm-fringed lagoons, traditional kettuvallam houseboats, and village canoe life.",
    fullDescription: "Renowned for its network of tranquil canals, lagoons, and Vembanad Lake, Alappuzha offers slow travel aboard handcrafted thatch-roof houseboats enjoying authentic Karimeen fish curry.",
    heroImage: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Backwaters", "Nature", "Food"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 4200,
    bestSeason: "September to March",
    idealFor: "Couples, relaxation seekers, culinary explorers",
    attractions: [
      { name: "Traditional Kettuvallam Day Cruise", category: "Backwaters", cost: 1500, duration: "5 hours" },
      { name: "Village Country Canoe Narrow Canal Trail", category: "Culture", cost: 400, duration: "2.5 hours" }
    ],
    coordinates: { lat: 9.4981, lng: 76.3388 }
  },
  {
    id: "puducherry",
    slug: "puducherry",
    name: "Puducherry (Pondicherry)",
    state: "Puducherry",
    region: "South",
    tagline: "French Colonial Boulevards, Auroville & Coastal Zen",
    shortDescription: "Pastel mustard French Quarter villas, bougainvillea balconies, Sri Aurobindo Ashram, and croissant cafes.",
    fullDescription: "A coastal union territory retaining French colonial heritage, Puducherry features the leafy White Town grid, vibrant Tamil quarter architecture, seaside promenade, and experimental township of Auroville.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Architecture", "Spirituality", "Food", "Beach"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3300,
    bestSeason: "October to March",
    idealFor: "Café hoppers, heritage walkers, spiritual seekers",
    attractions: [
      { name: "White Town French Quarter Heritage Walk", category: "Heritage", cost: 0, duration: "2 hours" },
      { name: "Auroville Matrimandir & Peace Zone", category: "Spirituality", cost: 0, duration: "3 hours" }
    ],
    coordinates: { lat: 11.9416, lng: 79.8083 }
  },

  // --- EAST & NORTHEAST INDIA ---
  {
    id: "kolkata",
    slug: "kolkata",
    name: "Kolkata",
    state: "West Bengal",
    region: "East",
    tagline: "The City of Joy: Victoria Memorial, Tramcars & Literature",
    shortDescription: "Colonial grandeur of Victoria Memorial, iconic Howrah Bridge, Kumartuli idol sculptors, and Mishti Doi.",
    fullDescription: "India's cultural capital on the Hooghly River is celebrated for intellectual heritage, Durga Puja grandeur, yellow vintage taxis, historical coffee houses, and colonial architecture.",
    heroImage: "https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Food", "Art & Craft", "History"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 2800,
    bestSeason: "October to March",
    idealFor: "Culture vultures, literature enthusiasts, food lovers",
    attractions: [
      { name: "Victoria Memorial Hall & Gardens", category: "Heritage", cost: 50, duration: "2.5 hours" },
      { name: "Kumartuli Traditional Clay Sculptor Quarter", category: "Art & Craft", cost: 0, duration: "2 hours" }
    ],
    coordinates: { lat: 22.5726, lng: 88.3639 }
  },
  {
    id: "darjeeling",
    slug: "darjeeling",
    name: "Darjeeling",
    state: "West Bengal",
    region: "East",
    tagline: "The Champagne of Teas & Kanchenjunga Sunrise",
    shortDescription: "Majestic sunrise over Mount Kanchenjunga from Tiger Hill, UNESCO Himalayan toy train, and organic tea gardens.",
    fullDescription: "Nestled in the eastern Himalayas, Darjeeling is globally famed for its exquisite muscatel black teas, views of the world's third highest peak, and vintage narrow-gauge railway.",
    heroImage: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Tea", "Mountains", "Heritage"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3300,
    bestSeason: "March to May & October to December",
    idealFor: "Tea lovers, mountain gazers, railway enthusiasts",
    attractions: [
      { name: "Tiger Hill Sunrise over Mount Kanchenjunga", category: "Mountains", cost: 100, duration: "3 hours" },
      { name: "Happy Valley Organic Tea Estate Tasting", category: "Tea", cost: 200, duration: "2 hours" }
    ],
    coordinates: { lat: 27.0410, lng: 88.2663 }
  },
  {
    id: "shillong",
    slug: "shillong",
    name: "Shillong",
    state: "Meghalaya",
    region: "Northeast",
    tagline: "The Scotland of the East & Rock Music Capital",
    shortDescription: "Pine-covered rolling hills, cascading Elephant Falls, Umiam Lake, and vibrant Khasi musical culture.",
    fullDescription: "Meghalaya's capital Shillong is famed for cool highland breezes, the stunning Umiam Lake reservoir, vibrant street music culture, and unique matrilineal Khasi heritage.",
    heroImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Mountains", "Waterfalls", "Nature"],
    suggestedDuration: "3 Days",
    dailyBudgetEstimate: 3100,
    bestSeason: "September to May",
    idealFor: "Nature enthusiasts, music lovers, road trippers",
    attractions: [
      { name: "Umiam Lake Watersports & Sunset", category: "Lakes", cost: 200, duration: "2.5 hours" },
      { name: "Elephant Falls Three-tier Cascade", category: "Waterfalls", cost: 50, duration: "1.5 hours" }
    ],
    coordinates: { lat: 25.5788, lng: 91.8933 }
  },
  {
    id: "port-blair",
    slug: "port-blair",
    name: "Sri Vijaya Puram (Port Blair)",
    state: "Andaman and Nicobar Islands",
    region: "Islands",
    tagline: "Cellular Jail Freedom History & Emerald Coral Isles",
    shortDescription: "Historic Cellular Jail memorial, pristine Radhanagar beach nearby, coral reefs, and turquoise seas.",
    fullDescription: "The capital of India's tropical Andaman and Nicobar archipelago commemorates India's freedom fighters at the national memorial of Cellular Jail while offering gateway access to Havelock and Neil islands.",
    heroImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Beach", "Heritage", "Nature"],
    suggestedDuration: "4 - 5 Days",
    dailyBudgetEstimate: 4600,
    bestSeason: "October to May",
    idealFor: "Beach lovers, history seekers, scuba divers",
    attractions: [
      { name: "Cellular Jail National Memorial & Light Show", category: "Heritage", cost: 100, duration: "3 hours" },
      { name: "Ross Island Heritage Ruins", category: "Heritage", cost: 200, duration: "3 hours" }
    ],
    coordinates: { lat: 11.6234, lng: 92.7265 }
  }
];

export function getDestinationBySlug(slug) {
  return destinations.find((d) => d.slug === slug);
}

export function getFeaturedDestinations() {
  return destinations.slice(0, 4);
}

export const collections = [
  {
    id: "royal-palaces",
    title: "Regal Heritage & Forts",
    subtitle: "Sandstone bastions, Mewar courtyards, and palatial Rajput estates.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
    badge: "Royal Circuit",
    destinationSlugs: ["jaipur", "udaipur", "jodhpur", "jaisalmer"]
  },
  {
    id: "coastal-retreats",
    title: "Coastlines & Backwaters",
    subtitle: "Palm lagoons, Portuguese villas, and Arabian Sea breeze.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    badge: "Coastal Serenity",
    destinationSlugs: ["goa", "alappuzha", "puducherry", "gokarna"]
  },
  {
    id: "mountain-trails",
    title: "Highlands & Tea Groves",
    subtitle: "Misty Western Ghats ridgelines, colonial bungalows, and cardamom hills.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
    badge: "Misty Ridges",
    destinationSlugs: ["munnar", "coorg", "darjeeling", "shillong"]
  },
  {
    id: "spiritual-crossroads",
    title: "Eternal Ghats & Temples",
    subtitle: "Dawn rowing meditation, resonant bells, and thousand-year living philosophy.",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80",
    badge: "Sacred Rivers",
    destinationSlugs: ["varanasi", "rishikesh", "amritsar", "puri"]
  }
];

