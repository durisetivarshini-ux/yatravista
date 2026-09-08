export const destinations = [
  {
    id: "jaipur",
    slug: "jaipur",
    name: "Jaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "The Timeless Splendour of the Pink City",
    shortDescription: "Majestic forts, terracotta facades, vibrant bazaars, and opulent royal history nestled in the Aravalli hills.",
    fullDescription: "Jaipur, the fabled capital of Rajasthan founded in 1727 by Maharaja Sawai Jai Singh II, is an UNESCO World Heritage city renowned for its grid-planned terracotta architecture, astronomical observatory, and centuries-old artisan traditions. From the sunrise views over Amber Fort to fragrant kachoris in Johari Bazaar, Jaipur effortlessly fuses living heritage with contemporary Rajasthani hospitality.",
    heroImage: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1603262110263-fb010d6e75dc?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Culture", "Heritage", "Food", "Architecture", "Art & Craft"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3800, // INR per person estimate
    bestSeason: "October to March",
    idealFor: "Heritage lovers, photographers, foodies, culture seekers",
    attractions: [
      {
        id: "jpr-amber",
        name: "Amber Palace & Sheesh Mahal",
        slot: "morning",
        category: "Heritage",
        duration: "3 hours",
        cost: 500,
        description: "Explore the intricate mirror work of Sheesh Mahal and hilltop ramparts overlooking Maota Lake.",
        tip: "Arrive early by 8:30 AM to beat the mid-day heat and tour groups."
      },
      {
        id: "jpr-hawa",
        name: "Hawa Mahal & Old City Street Walk",
        slot: "afternoon",
        category: "Architecture",
        duration: "2 hours",
        cost: 200,
        description: "Marvel at the 953 honeycombed sandstone casements built for royal court women to view street festivities.",
        tip: "Visit the rooftop cafes opposite Hawa Mahal for breathtaking symmetrical perspectives."
      },
      {
        id: "jpr-chokhi",
        name: "Nahargarh Sunset & Traditional Rajasthani Thali",
        slot: "evening",
        category: "Food",
        duration: "3 hours",
        cost: 750,
        description: "Panoramic sunset over the entire pink grid followed by authentic Dal Baati Churma and folk music.",
        tip: "Take a licensed cab to Nahargarh summit before 5:30 PM."
      },
      {
        id: "jpr-jantar",
        name: "Jantar Mantar Astronomical Observatory",
        slot: "morning",
        category: "Culture",
        duration: "1.5 hours",
        cost: 200,
        description: "World's largest stone sundial and precision 18th-century instruments measuring cosmic coordinates.",
        tip: "Engage an ASI-licensed guide to decipher the ingenious sundial angles."
      },
      {
        id: "jpr-bazaar",
        name: "Johari & Bapu Bazaar Artisan Walk",
        slot: "afternoon",
        category: "Art & Craft",
        duration: "2.5 hours",
        cost: 150,
        description: "Discover lac bangles, hand-block Bagru printing, blue pottery, and silver filigree in bustling lanes.",
        tip: "Support traditional family-owned workshops in the old walled lanes."
      },
      {
        id: "jpr-albert",
        name: "Albert Hall Museum Evening Illumination",
        slot: "evening",
        category: "Culture",
        duration: "2 hours",
        cost: 300,
        description: "Indo-Saracenic museum housing exquisite miniature paintings, illuminated gorgeously with pigeons resting at dusk.",
        tip: "The facade light show begins right around 6:45 PM."
      }
    ]
  },
  {
    id: "goa",
    slug: "goa",
    name: "Goa",
    state: "Goa",
    region: "West",
    tagline: "Sunkissed Coastlines, Portuguese Heritage & Serene Backwaters",
    shortDescription: "Golden sand beaches, pastel Latin quarters, spice plantations, and slow-paced susegad living.",
    fullDescription: "Beyond the party stereotypes, Goa is a rich tapestry of Indo-Portuguese history, lush Western Ghats hinterlands, artisanal bakeries, and quiet riverine villages. From Fontainhas' vibrant azulejo tiles in Panaji to quiet southern coves like Agonda and organic spice groves in Ponda, Goa offers peaceful coastal rejuvenation.",
    heroImage: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1587922546307-776227941871?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Beaches", "Relaxation", "Food", "Culture", "Nature"],
    suggestedDuration: "4 - 5 Days",
    dailyBudgetEstimate: 4200,
    bestSeason: "November to March",
    idealFor: "Beach lovers, heritage walkers, slow travellers, seafood connoisseurs",
    attractions: [
      {
        id: "goa-fontainhas",
        name: "Fontainhas Latin Quarter Heritage Walk",
        slot: "morning",
        category: "Culture",
        duration: "2 hours",
        cost: 250,
        description: "Wander through Portuguese-era yellow and cobalt villas, traditional bakeries, and quaint art galleries.",
        tip: "Sample fresh poi bread and bebinca at a heritage bakery on 31st January Road."
      },
      {
        id: "goa-spice",
        name: "Sahakari Organic Spice Plantation & Lunch",
        slot: "afternoon",
        category: "Nature",
        duration: "3.5 hours",
        cost: 650,
        description: "Guided botany tour learning about cardamom, vanilla, and peri-peri chillies followed by a traditional buffet on banana leaves.",
        tip: "Try the lemongrass herbal tea served upon welcome."
      },
      {
        id: "goa-sunset-cove",
        name: "Sunset Kayaking in Sal Backwaters",
        slot: "evening",
        category: "Relaxation",
        duration: "2.5 hours",
        cost: 800,
        description: "Glide silently through mangrove bird corridors as the sun dips into the Arabian Sea horizon.",
        tip: "Wear water-resistant footwear and carry a waterproof pouch for phones."
      },
      {
        id: "goa-churches",
        name: "Basilica of Bom Jesus & Old Goa Monuments",
        slot: "morning",
        category: "Heritage",
        duration: "2.5 hours",
        cost: 100,
        description: "UNESCO baroque architecture holding the sacred relics of St. Francis Xavier.",
        tip: "Modest dress is required inside the active basilica."
      },
      {
        id: "goa-fisheries",
        name: "Assagao Artisanal Food Tour",
        slot: "afternoon",
        category: "Food",
        duration: "2.5 hours",
        cost: 700,
        description: "Taste Saraswat fish curry, kokum solkadhi, choris pao, and artisanal coconut-feni infusions.",
        tip: "Come hungry; the portions are generous."
      },
      {
        id: "goa-cabo",
        name: "Cabo de Rama Cliff Walk & Golden Hour",
        slot: "evening",
        category: "Nature",
        duration: "2 hours",
        cost: 50,
        description: "Dramatic sea cliffs overlooking secluded turquoise waters and the ruins of an ancient feudal fort.",
        tip: "Pack light windbreakers as evening sea breezes can be brisk."
      }
    ]
  },
  {
    id: "munnar",
    slug: "munnar",
    name: "Munnar",
    state: "Kerala",
    region: "South",
    tagline: "Rolling Emerald Tea Hills & Misty Western Ghats",
    shortDescription: "Endless carpet of tea gardens, cool mountain air, endangered Nilgiri Tahr, and fragrant eucalyptus trails.",
    fullDescription: "Perched at 1,600 metres above sea level at the confluence of three mountain streams (Mudhirapuzha, Nallathanni, and Kundaly), Munnar is the green jewel of God's Own Country. Its velvety hills are laced with historic British-era tea estates, cascading waterfalls, spice gardens, and the pristine wilderness of Eravikulam National Park.",
    heroImage: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Nature", "Relaxation", "Adventure", "Culture"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3400,
    bestSeason: "September to May",
    idealFor: "Nature enthusiasts, trekkers, tea aficionados, peaceful retreats",
    attractions: [
      {
        id: "mnr-eravikulam",
        name: "Eravikulam National Park & Anamudi Views",
        slot: "morning",
        category: "Nature",
        duration: "3 hours",
        cost: 250,
        description: "Walk the high-altitude shola grasslands home to the friendly Nilgiri Tahr and wild mountain flora.",
        tip: "Book early forest safari tokens online to avoid queue delays."
      },
      {
        id: "mnr-tea-museum",
        name: "Lockhart Heritage Tea Factory & Tasting",
        slot: "afternoon",
        category: "Culture",
        duration: "2 hours",
        cost: 300,
        description: "Witness the orthodox rolling and drying process followed by a master tea sommelier cupping session.",
        tip: "Buy single-estate orthodox black tea directly from the factory outlet."
      },
      {
        id: "mnr-mattupetty",
        name: "Mattupetty Lake & Echo Point Nature Walk",
        slot: "evening",
        category: "Relaxation",
        duration: "2.5 hours",
        cost: 150,
        description: "Tranquil water reservoir surrounded by mist-draped tea gardens and grazing wild elephants in the distance.",
        tip: "Enjoy roasted spiced corn from local tribal vendors near the dam."
      },
      {
        id: "mnr-chokramudi",
        name: "Chokramudi Peak Sunrise Trek",
        slot: "morning",
        category: "Adventure",
        duration: "4 hours",
        cost: 600,
        description: "Moderate guided trek offering breathtaking 360-degree panoramas of low-lying clouds and valleys.",
        tip: "Wear sturdy hiking shoes with decent wet grip."
      },
      {
        id: "mnr-marayoor",
        name: "Marayoor Sandalwood Forests & Dolmens",
        slot: "afternoon",
        category: "Heritage",
        duration: "3 hours",
        cost: 200,
        description: "Ancient megalithic burial chambers (Muniyaras) and naturally regenerating sandalwood groves.",
        tip: "Pick up pure Marayoor jaggery handcrafted by local sugarcane farmers."
      },
      {
        id: "mnr-kalaripayattu",
        name: "Punarjani Traditional Kathakali & Martial Arts",
        slot: "evening",
        category: "Culture",
        duration: "2 hours",
        cost: 400,
        description: "Ancient Indian martial art (Kalaripayattu) and vivid facial expressions of classical Kathakali dance.",
        tip: "Arrive 30 minutes before showtime to watch the elaborate natural face makeup application."
      }
    ]
  },
  {
    id: "varanasi",
    slug: "varanasi",
    name: "Varanasi",
    state: "Uttar Pradesh",
    region: "North",
    tagline: "The Spiritual Heartbeat of the Eternal River",
    shortDescription: "Ancient riverside ghats, devotional chanting, Ganga Aarti, centuries-old silk weaving, and vibrant alleyways.",
    fullDescription: "Mark Twain remarked that Varanasi is older than history, older than tradition, older even than legend. One of the world's oldest continuously inhabited cities, Kashi pulsates with cosmic energy along the sacred banks of the Ganges. Pilgrims, philosophers, and travelers have gathered here for millennia to seek enlightenment, celebrate life, and experience profound cultural devotion.",
    heroImage: "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1561359313-0639aad49ca6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1596178065887-1198b6148b2b?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Spiritual", "Culture", "Heritage", "Food", "Art & Craft"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 2800,
    bestSeason: "October to March",
    idealFor: "Spiritual seekers, photographers, historians, textile lovers",
    attractions: [
      {
        id: "vns-subah",
        name: "Subah-e-Banaras Dawn Boat Ride",
        slot: "morning",
        category: "Spiritual",
        duration: "2.5 hours",
        cost: 450,
        description: "Row gently from Assi Ghat to Manikarnika Ghat as morning prayers, sitar recitals, and temple bells wake the river.",
        tip: "Be at Assi Ghat by 5:15 AM for the pre-dawn classical raga performance."
      },
      {
        id: "vns-sarnath",
        name: "Sarnath Deer Park & Dhamek Stupa",
        slot: "afternoon",
        category: "Heritage",
        duration: "3 hours",
        cost: 200,
        description: "The hallowed site where Lord Buddha preached his first sermon after attaining enlightenment, plus Ashoka Lion Capital museum.",
        tip: "The archaeological museum closes on Fridays, so plan accordingly."
      },
      {
        id: "vns-dashashwamedh",
        name: "Dashashwamedh Ghat Grand Evening Aarti",
        slot: "evening",
        category: "Spiritual",
        duration: "2 hours",
        cost: 100,
        description: "Synchronized brass lamps, conch shells, incense plumes, and sacred river rituals performed by young Vedic priests.",
        tip: "Watch from a wooden boat moored right in front of the steps for the best unobstructed view."
      },
      {
        id: "vns-vishwanath",
        name: "Kashi Vishwanath Corridor & Old Gali Exploration",
        slot: "morning",
        category: "Heritage",
        duration: "2 hours",
        cost: 100,
        description: "Walk the golden-spired jyotirlinga shrine precinct and wander narrow medieval galis filled with brass shops.",
        tip: "Electronic devices must be deposited in official lockers outside the temple."
      },
      {
        id: "vns-kachori",
        name: "Varanasi Food Trail: Malaiyyo & Kachori Gali",
        slot: "afternoon",
        category: "Food",
        duration: "2 hours",
        cost: 250,
        description: "Savour crispy hing kachoris with aloo sabzi, frothy saffron Malaiyyo (winter delicacy), and creamy Banarasi paan.",
        tip: "Try Ram Bhandar before 11:30 AM as their fresh batches sell out quickly."
      },
      {
        id: "vns-weaver",
        name: "Madanpura Banarasi Silk Weaving Guild",
        slot: "evening",
        category: "Art & Craft",
        duration: "2 hours",
        cost: 150,
        description: "Watch master weavers operate traditional jacquard handlooms weaving pure zari silk sarees.",
        tip: "Purchasing directly supports generational weaver families without middleman margins."
      }
    ]
  },
  {
    id: "udaipur",
    slug: "udaipur",
    name: "Udaipur",
    state: "Rajasthan",
    region: "North",
    tagline: "The City of Lakes, Marble Palaces & Royal Romance",
    shortDescription: "Whitewashed lake palaces, mirrored courtyards, serene boat rides, and Mewar royal pride.",
    fullDescription: "Often celebrated as the Venice of the East, Udaipur sits wrapped around azure Lake Pichola and Fateh Sagar against the backdrop of the undulating Aravalli range. Founded in 1559 by Maharana Udai Singh II, the city is a testament to Mewar chivalry, romantic lake architecture, intricate miniature art, and vibrant folk celebrations.",
    heroImage: "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1588096344356-9a2c31e9e03d?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Culture", "Relaxation", "Architecture", "Food"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 4500,
    bestSeason: "September to March",
    idealFor: "Romance, heritage lovers, architecture enthusiasts, slow explorers",
    attractions: [
      {
        id: "udp-citypalace",
        name: "City Palace Complex & Crystal Gallery",
        slot: "morning",
        category: "Heritage",
        duration: "3 hours",
        cost: 400,
        description: "Rajasthan's largest palace complex, featuring Mor Chowk's peacock glass mosaics and royal armouries.",
        tip: "Enter before 10 AM to take peaceful photos in the inner courtyards."
      },
      {
        id: "udp-jagdish",
        name: "Jagdish Temple & Gangaur Ghat Walk",
        slot: "afternoon",
        category: "Architecture",
        duration: "1.5 hours",
        cost: 50,
        description: "1651 carved stone temple dedicated to Lord Vishnu and steps where locals feed fish in the quiet waters.",
        tip: "Notice the intricately carved elephant and horse friezes adorning the temple plinth."
      },
      {
        id: "udp-pichola",
        name: "Lake Pichola Sunset Cruise to Jagmandir",
        slot: "evening",
        category: "Relaxation",
        duration: "2 hours",
        cost: 550,
        description: "Cruise past the floating Lake Palace (Taj Lake Palace) as evening golden light bathes the City Palace facade.",
        tip: "Pre-book the 5:00 PM sunset departure from Rameshwar Ghat."
      },
      {
        id: "udp-saheliyon",
        name: "Saheliyon-ki-Bari & Vintage Car Museum",
        slot: "morning",
        category: "Culture",
        duration: "2 hours",
        cost: 200,
        description: "Ornamental royal garden with marble fountains, lotus pools, and the Maharana's historic Rolls Royce collection.",
        tip: "Fountains run on pure gravity without mechanical pumps."
      },
      {
        id: "udp-bagore",
        name: "Dharohar Folk Dance at Bagore-ki-Haveli",
        slot: "evening",
        category: "Culture",
        duration: "1.5 hours",
        cost: 250,
        description: "Electrifying performance of Bhavai dancers balancing 7 to 10 earthen pots on their heads while dancing on glass.",
        tip: "Queues for evening seats start around 6:15 PM at the haveli entrance."
      },
      {
        id: "udp-monsoon",
        name: "Sajjangarh Monsoon Palace Viewpoint",
        slot: "afternoon",
        category: "Nature",
        duration: "2.5 hours",
        cost: 200,
        description: "High mountain sanctuary built to track monsoon clouds, offering commanding panoramic views of the entire valley.",
        tip: "Take the shared eco-shuttle up the winding hill."
      }
    ]
  },
  {
    id: "coorg",
    slug: "coorg",
    name: "Coorg (Kodagu)",
    state: "Karnataka",
    region: "South",
    tagline: "The Scotland of India: Coffee Groves, Waterfalls & Kodava Warmth",
    shortDescription: "Aromatic coffee plantations, misty valleys, Tibetan golden temples, and spirited Kodava hospitality.",
    fullDescription: "Nestled in the lush hills of the Western Ghats in Karnataka, Kodagu is a serene highland sanctuary renowned for shade-grown Arabica and Robusta coffee, cardamom, pepper vines, and distinctive warrior Kodava culture. From roaring Abbey Falls to the tranquil monastery at Bylakuppe, Coorg offers crisp air and restorative green horizons.",
    heroImage: "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Nature", "Relaxation", "Food", "Culture", "Adventure"],
    suggestedDuration: "3 - 4 Days",
    dailyBudgetEstimate: 3300,
    bestSeason: "October to April",
    idealFor: "Couples, trekking enthusiasts, coffee lovers, quiet retreats",
    attractions: [
      {
        id: "crg-plantation",
        name: "Organic Coffee Estate & Pepper Trail",
        slot: "morning",
        category: "Nature",
        duration: "2.5 hours",
        cost: 350,
        description: "Walk under shade tree canopies, learn how beans are picked and fermented, and taste freshly brewed estate espresso.",
        tip: "Buy single-origin Arabica beans directly from the grower."
      },
      {
        id: "crg-abbey",
        name: "Abbey Falls & Hanging Bridge Walk",
        slot: "afternoon",
        category: "Nature",
        duration: "1.5 hours",
        cost: 100,
        description: "Cascading waterfall roaring through lush coffee and spice plantations into the Cauvery River basin.",
        tip: "Monsoon and post-monsoon months offer the fullest water flow."
      },
      {
        id: "crg-rajas",
        name: "Raja's Seat Sunset & Musical Fountain",
        slot: "evening",
        category: "Relaxation",
        duration: "2 hours",
        cost: 50,
        description: "The historical terrace garden where Kodagu kings sat with their queens to watch the sun set over rolling valleys.",
        tip: "Arrive an hour before dusk to witness the shifting mountain colors."
      },
      {
        id: "crg-namdroling",
        name: "Namdroling Golden Temple (Bylakuppe)",
        slot: "morning",
        category: "Spiritual",
        duration: "2.5 hours",
        cost: 50,
        description: "One of India's largest Tibetan settlements, housing colossal 40-foot gilded statues of Buddha and chanting monks.",
        tip: "Sample authentic Tibetan tingmo and thukpa in the monastery square."
      },
      {
        id: "crg-mandalpatti",
        name: "Mandalpatti 4x4 Jeep Safari Trek",
        slot: "morning",
        category: "Adventure",
        duration: "3.5 hours",
        cost: 850,
        description: "Rugged off-road journey up mist-enveloped ridgelines overlooking the Pushpagiri Wildlife Sanctuary.",
        tip: "Carry a warm jacket as the summit wind can get chilly."
      },
      {
        id: "crg-pandi",
        name: "Kodava Culinary Experience (Pandi Curry & Akki Roti)",
        slot: "evening",
        category: "Food",
        duration: "2 hours",
        cost: 450,
        description: "Traditional feast featuring signature Kodava black vinegar (kachampuli), bamboo shoot fry, and fragrant rice rotis.",
        tip: "Kachampuli extract makes a fantastic local culinary souvenir to take home."
      }
    ]
  },
  {
    id: "mysuru",
    slug: "mysuru",
    name: "Mysuru (Mysore)",
    state: "Karnataka",
    region: "South",
    tagline: "The Royal Heritage Capital of Sandalwood & Silk",
    shortDescription: "Grand illuminated palaces, incense-scented markets, classical Carnatic heritage, and delectable Mysore Pak.",
    fullDescription: "Mysuru, the historic seat of the Wadiyar dynasty, carries an aristocratic grace that captivates every visitor. Known for its world-famous Dasara festivities, the city is an open-air museum of Indo-Saracenic palaces, fragrant Devaraja Market bazaars, heritage silk looms, and the serene slopes of Chamundi Hill.",
    heroImage: "https://images.unsplash.com/photo-1600100397608-f010f4439c36?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600100397608-f010f4439c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Heritage", "Culture", "Food", "Art & Craft", "Architecture"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 2900,
    bestSeason: "October to March",
    idealFor: "History buffs, architecture admirers, shoppers, sweet lovers",
    attractions: [
      {
        id: "mys-palace",
        name: "Mysore Palace & Durbar Hall Grand Tour",
        slot: "morning",
        category: "Heritage",
        duration: "3 hours",
        cost: 150,
        description: "Gaze at stained glass ceilings, Belgian crystal chandeliers, mahogany carvings, and solid silver doors.",
        tip: "Sunday evenings feature a breathtaking illumination of over 97,000 electric bulbs."
      },
      {
        id: "mys-devaraja",
        name: "Devaraja Century-Old Market Walk",
        slot: "afternoon",
        category: "Culture",
        duration: "2 hours",
        cost: 100,
        description: "Lively bazaar lanes stacked high with pyramids of vibrant kumkum powder, Mysore jasmine, betel leaves, and pure sandalwood oils.",
        tip: "Great spot for picking up pure essential oils from verified co-operatives."
      },
      {
        id: "mys-chamundi",
        name: "Chamundi Hill & Nandi Bull Monolith",
        slot: "evening",
        category: "Spiritual",
        duration: "2.5 hours",
        cost: 50,
        description: "1,000-step historic pilgrimage route leading to the 12th-century temple and the massive 16-foot monolithic granite Nandi bull.",
        tip: "Sunset views over the entire illuminated city from Chamundi viewpoint are magnificent."
      },
      {
        id: "mys-somanathapura",
        name: "Keshava Temple (Somanathapura) Hoysala Art",
        slot: "morning",
        category: "Architecture",
        duration: "3 hours",
        cost: 250,
        description: "13th-century tripartite star-shaped Hoysala masterpiece covered in microscopic soapstone friezes of Indian epics.",
        tip: "Located 35km from city center, easily reached by local taxi."
      },
      {
        id: "mys-pak",
        name: "Guru Sweets Original Mysore Pak Tasting",
        slot: "afternoon",
        category: "Food",
        duration: "1 hour",
        cost: 120,
        description: "Taste the melt-in-the-mouth ghee confection created in 1935 by Kakasura Madappa, the royal chef of the Wadiyars.",
        tip: "Ask for freshly made hot batch straight from the iron kadai."
      },
      {
        id: "mys-brindavan",
        name: "Brindavan Gardens & Musical Fountain",
        slot: "evening",
        category: "Relaxation",
        duration: "2.5 hours",
        cost: 150,
        description: "Terraced gardens laid out across the Krishna Raja Sagara Dam with illuminated fountains and water ballets.",
        tip: "Best viewed right at dusk around 7:00 PM."
      }
    ]
  },
  {
    id: "puducherry",
    slug: "puducherry",
    name: "Puducherry (Pondicherry)",
    state: "Puducherry UT",
    region: "South",
    tagline: "The French Riviera of the Coromandel Coast",
    shortDescription: "Cobblestone boulevards, pastel mustard colonial facades, seaside promenades, and spiritual tranquility.",
    fullDescription: "Puducherry is a delightful union of French colonial elegance and Tamil heritage, affectionately divided by a canal into the 'White Town' (French Quarter) and the bustling 'Black Town' (Heritage Tamil Quarter). Cyclists pedal past bougainvillea-draped archways, artisanal patisseries, and peaceful courtyards, while the Sri Aurobindo Ashram and experimental township of Auroville provide deep inner calm.",
    heroImage: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80"
    ],
    travelInterests: ["Relaxation", "Culture", "Architecture", "Food", "Beaches"],
    suggestedDuration: "2 - 3 Days",
    dailyBudgetEstimate: 3100,
    bestSeason: "October to March",
    idealFor: "Cyclists, cafe hoppers, meditation practitioners, architecture admirers",
    attractions: [
      {
        id: "pdy-whitetown",
        name: "French Quarter Bicycle Architectural Tour",
        slot: "morning",
        category: "Architecture",
        duration: "2 hours",
        cost: 200,
        description: "Rent vintage bicycles to explore Rue Dumas, Rue Romain Rolland, and colonial consulates draped in vibrant magenta bougainvillea.",
        tip: "Early morning 6:30 - 8:00 AM offers quiet streets with magical coastal light."
      },
      {
        id: "pdy-auroville",
        name: "Auroville Matrimandir & Visitor Centre",
        slot: "afternoon",
        category: "Spiritual",
        duration: "3.5 hours",
        cost: 100,
        description: "The universal experimental township dedicated to human unity, featuring the iconic golden globe of Matrimandir and organic farms.",
        tip: "Inner chamber meditation passes must be booked in advance in person."
      },
      {
        id: "pdy-promenade",
        name: "Rock Beach Promenade Sunset Stroll",
        slot: "evening",
        category: "Relaxation",
        duration: "2 hours",
        cost: 50,
        description: "1.5 km seaside boulevard closed to vehicular traffic in the evenings, with the French War Memorial and sea breeze.",
        tip: "Pick up authentic woodfired pizza or gelato right across the promenade."
      },
      {
        id: "pdy-ashram",
        name: "Sri Aurobindo Ashram & Quiet Garden",
        slot: "morning",
        category: "Spiritual",
        duration: "1.5 hours",
        cost: 0,
        description: "The serene spiritual haven founded by Sri Aurobindo and Mirra Alfassa (The Mother), housing the flower-covered Samadhi.",
        tip: "Silence is observed inside the courtyard; leave footwear at the counter."
      },
      {
        id: "pdy-croissant",
        name: "French Bakery & Franco-Tamil Cafe Trail",
        slot: "afternoon",
        category: "Food",
        duration: "2 hours",
        cost: 350,
        description: "Taste freshly baked almond croissants, sourdough baguettes, crepes, and spicy Pondy Creole curries.",
        tip: "Try Baker's Street or Cafe des Arts for afternoon tea."
      },
      {
        id: "pdy-paradise",
        name: "Chunnambar Boat Cruise to Paradise Beach",
        slot: "evening",
        category: "Beaches",
        duration: "2.5 hours",
        cost: 350,
        description: "Backwater ferry cruise through scenic coconut palms leading to an isolated golden sand spit.",
        tip: "Last ferry returning back departs around 5:30 PM."
      }
    ]
  }
];

export const regions = ["All", "North", "South", "West", "East"];

export const travelInterestOptions = [
  "All",
  "Culture",
  "Heritage",
  "Nature",
  "Beaches",
  "Food",
  "Relaxation",
  "Adventure",
  "Spiritual",
  "Architecture",
  "Art & Craft"
];

export const collections = [
  {
    id: "heritage-escapes",
    title: "Heritage Escapes",
    subtitle: "Walk through royal palaces, timeless forts, and historic walled cities.",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=80",
    slugs: ["jaipur", "udaipur", "mysuru", "varanasi"],
    badge: "Royal & Sacred"
  },
  {
    id: "coastal-retreats",
    title: "Coastal Retreats",
    subtitle: "Golden shorelines, tranquil backwaters, and Indo-French seaside promenades.",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=80",
    slugs: ["goa", "puducherry"],
    badge: "Ocean Breezes"
  },
  {
    id: "mountain-trails",
    title: "Mountain Trails",
    subtitle: "Misty tea hills, aromatic coffee plantations, and Western Ghats wildlife.",
    image: "https://images.unsplash.com/photo-1593693397690-362cb9666fc2?auto=format&fit=crop&w=1200&q=80",
    slugs: ["munnar", "coorg"],
    badge: "High Altitude"
  },
  {
    id: "weekend-getaways",
    title: "Weekend Getaways",
    subtitle: "Quick 2-3 day immersive getaways packed with culture, cuisine, and relaxation.",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80",
    slugs: ["puducherry", "mysuru", "varanasi"],
    badge: "Quick Escapes"
  }
];
