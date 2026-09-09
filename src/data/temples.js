// Comprehensive Verified Dataset of India's Major Temples & Spiritual Pilgrimage Sites
// Organised by State, Tradition, Deity, Etiquette, Official Visitor Links, and Verified Coordinates

export const templesData = [
  {
    id: 'tirumala-venkateswara',
    name: 'Sri Venkateswara Swamy Temple',
    commonName: 'Tirumala Balaji Temple',
    state: 'Andhra Pradesh',
    stateId: 'andhra-pradesh',
    destination: 'Tirupati',
    destinationSlug: 'tirupati',
    deity: 'Lord Sri Venkateswara (Maha Vishnu)',
    tradition: 'Vaishnavism / Vaikhanasa Agama',
    circuit: 'Divya Desams & South Indian Sacred Pilgrimage',
    coordinates: { lat: 13.6833, lng: 79.3472 },
    address: 'S Venkatramana Temple, Tirumala, Tirupati, Andhra Pradesh 517504',
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Kalyan Chakravarthy',
    historicalSignificance: 'One of the wealthiest and most visited religious shrines in the world, situated atop the sacred Seshachalam Seven Hills. Mentioned extensively in ancient Sangam literature and Puranas.',
    ritualsAndFestivals: ['Suprabhata Seva (Pre-dawn)', 'Thomala & Archana', 'Kalyanotsavam', 'Annual Brahmotsavam (Navratri)', 'Vaikunta Ekadasi'],
    visitorEtiquette: {
      dressCode: 'Strict Traditional Indian Attire: Men must wear Dhoti/Kurta or White Pyjama; Women must wear Saree or Salwar Kameez with Dupatta. Western wear, shorts, and sleeveless tops are not permitted.',
      electronicsPolicy: 'Mobile phones, smart watches, and cameras must be deposited at security counters before entering queue complexes.',
      footwearPolicy: 'Footwear not allowed within temple precincts; free cloakrooms available.',
      customs: 'Chanting "Govinda Govinda", respectful queue discipline, silence in Sanctum Sanctorum.'
    },
    officialPortal: {
      name: 'Tirumala Tirupati Devasthanams (TTD) Official Portal',
      url: 'https://ttdevasthanams.ap.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'YatraVista does not sell Darshan tickets. Book directly through the official TTD portal or authorized counters.'
    },
    bestVisitingMonths: 'September to March (cooler hill temperatures)',
    suggestedDurationHours: 4,
    nearbyStays: ['Fortune Select Grand Ridge Tirupati', 'Marasa Sarovar Premiere', 'TTD Pilgrimage Guest Houses'],
    nearbyAttractions: ['Sri Padmavathi Ammavari Temple (Tiruchanur)', 'Kapila Theertham', 'Chandragiri Fort']
  },
  {
    id: 'srisailam-mallikarjuna',
    name: 'Sri Bhramaramba Mallikarjuna Swamy Varla Devasthanam',
    commonName: 'Srisailam Temple',
    state: 'Andhra Pradesh',
    stateId: 'andhra-pradesh',
    destination: 'Srisailam',
    destinationSlug: 'srisailam',
    deity: 'Lord Mallikarjuna Swamy (Shiva) & Goddess Bhramaramba Devi (Parvati)',
    tradition: 'Shaivism & Shakta (Rare Combined Jyotirlinga & Shakti Peetha)',
    circuit: '12 Jyotirlingas & 18 Maha Shakti Peethas',
    coordinates: { lat: 16.0747, lng: 78.8686 },
    address: 'Srisailam Devasthanam, Nallamala Hills, Nandyal District, Andhra Pradesh 518101',
    image: 'https://images.unsplash.com/photo-1600100397858-a5b6782bcf0d?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Anoop M',
    historicalSignificance: 'Unique sacred confluence where Lord Shiva is worshipped as one of the 12 Jyotirlingas and Goddess Parvati is worshipped as one of the 18 Maha Shakti Peethas atop the lush Nallamala forest ridges by the Krishna River.',
    ritualsAndFestivals: ['Sparsha Darshanam (Touch worship at specific slots)', 'Maha Shivaratri Brahmotsavam', 'Ugadi Mahotsavam'],
    visitorEtiquette: {
      dressCode: 'Traditional Indian attire: Dhoti with Angavastram for men undergoing Sparsha Darshan; Sarees/Salwars for women.',
      electronicsPolicy: 'Photography strictly prohibited inside Garbha Griha.',
      footwearPolicy: 'Deposit footwear at designated stands outside the main Gopuram.'
    },
    officialPortal: {
      name: 'Srisailam Devasthanam Official Portal',
      url: 'https://www.srisailadevasthanam.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Book Sparsha Darshan, Sevas, and Devasthanam accommodation directly via the official portal.'
    },
    bestVisitingMonths: 'October to February',
    suggestedDurationHours: 3,
    nearbyStays: ['Devasthanam Ganga Sadan', 'Haritha Srisailam APTDC', 'Pathaleswara Cottages'],
    nearbyAttractions: ['Srisailam Dam Viewpoint', 'Pathala Ganga Krishna River Ropeway', 'Akka Mahadevi Caves']
  },
  {
    id: 'yadadri-lakshmi-narasimha',
    name: 'Sri Lakshmi Narasimha Swamy Temple',
    commonName: 'Yadadri Temple',
    state: 'Telangana',
    stateId: 'telangana',
    destination: 'Yadadri Bhuvanagiri',
    destinationSlug: 'yadadri',
    deity: 'Lord Sri Lakshmi Narasimha Swamy',
    tradition: 'Vaishnavism / Pancharatra Agama / Dravidian & Kakatiya Granite Architecture',
    circuit: 'Telangana Sacred Shrines & Krishna Circuit',
    coordinates: { lat: 17.5898, lng: 78.9482 },
    address: 'Yadagirigutta, Yadadri Bhuvanagiri District, Telangana 508115',
    image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df8?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Pranav Kumar',
    historicalSignificance: 'A monumental architectural marvel carved entirely from Krishna Sila (black granite) following ancient Vastu and Agama traditions, built over the sacred natural cave where Sage Yadarishi performed penance.',
    ritualsAndFestivals: ['Nijabhishekam', 'Sudarshana Homam', 'Annual Brahmotsavam (Phalguna month)'],
    visitorEtiquette: {
      dressCode: 'Modest traditional Indian clothing recommended.',
      electronicsPolicy: 'Deposit cell phones and electronic cameras in temple locker facility.'
    },
    officialPortal: {
      name: 'Yadadri Temple Development Authority (YTDA) Official',
      url: 'https://yadadritemple.telangana.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Refer to the official Telangana government portal for special seva timings.'
    },
    bestVisitingMonths: 'All year (Hilltop breeze, October-March optimal)',
    suggestedDurationHours: 2.5,
    nearbyStays: ['Haritha Heritage Yadagirigutta', 'Yadadri YTDA Guest Suites'],
    nearbyAttractions: ['Bhongir Historic Monolithic Fort', 'Surendrapuri Mythological Theme Park']
  },
  {
    id: 'meenakshi-amman',
    name: 'Arulmigu Meenakshi Sundareswarar Temple',
    commonName: 'Meenakshi Amman Temple',
    state: 'Tamil Nadu',
    stateId: 'tamil-nadu',
    destination: 'Madurai',
    destinationSlug: 'madurai',
    deity: 'Goddess Meenakshi (Parvati) & Lord Sundareswarar (Shiva)',
    tradition: 'Shaivism & Shakta / Dravidian Gopuram Architecture',
    circuit: 'Tamil Nadu Great Living Chola & Pandya Temples',
    coordinates: { lat: 9.9195, lng: 78.1193 },
    address: 'Madurai Main, Madurai, Tamil Nadu 625001',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Naveen K',
    historicalSignificance: 'Historic heart of the ancient Pandyan capital Madurai with 14 soaring Gopuram towers, the Hall of Thousand Pillars, and exquisite stone sculptures celebrating divine cosmic union.',
    ritualsAndFestivals: ['Chithirai Festival & Celestial Wedding', 'Night Palliyarai Pooja Procession (Palanquin ceremony)'],
    visitorEtiquette: {
      dressCode: 'Traditional attire strictly mandatory: Dhotis/Pyjamas for men; Sarees/Salwars for women. No jeans or sleeveless tops.',
      electronicsPolicy: 'Mobile phones are completely prohibited inside temple gates by high court order. Lockers outside.',
      footwearPolicy: 'Designated shoe stalls at East, West, South, and North towers.'
    },
    officialPortal: {
      name: 'Tamil Nadu HR&CE Department Portal',
      url: 'https://maduraimeenakshi.hrce.tn.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Verify temple opening hours (usually 5:00 AM - 12:30 PM & 4:00 PM - 10:00 PM).'
    },
    bestVisitingMonths: 'October to March',
    suggestedDurationHours: 3.5,
    nearbyStays: ['Heritage Madurai', 'Courtyard by Marriott Madurai', 'The Gateway Hotel Pasumalai'],
    nearbyAttractions: ['Thirumalai Nayakkar Mahal', 'Gandhi Memorial Museum Madurai', 'Vandiyur Mariamman Teppakulam']
  },
  {
    id: 'ramanathaswamy-rameswaram',
    name: 'Arulmigu Ramanathaswamy Temple',
    commonName: 'Rameswaram Temple',
    state: 'Tamil Nadu',
    stateId: 'tamil-nadu',
    destination: 'Rameswaram',
    destinationSlug: 'rameswaram',
    deity: 'Lord Ramanathaswamy (Shiva)',
    tradition: 'Shaivism / One of the 12 Jyotirlingas & Char Dham',
    circuit: 'All India Char Dham & 12 Jyotirlingas',
    coordinates: { lat: 9.2881, lng: 79.3174 },
    address: 'Rameswaram, Ramanathapuram District, Tamil Nadu 623526',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Naveen K',
    historicalSignificance: 'Sacred island temple built where Lord Rama worshipped Lord Shiva to seek blessings. Famous for the longest ornate pillared corridor in the world and 22 holy freshwater theertham wells.',
    ritualsAndFestivals: ['22 Theertham Holy Snanam (Sacred Bath)', 'Maha Shivaratri', 'Ramalingeshwara Pratishta'],
    visitorEtiquette: {
      dressCode: 'Dry traditional attire required after bathing in theerthams before entering sanctum.',
      electronicsPolicy: 'No cameras or phones in inner corridors.'
    },
    officialPortal: {
      name: 'Rameswaram Devasthanam HR&CE Official',
      url: 'https://rameswaramtemple.hrce.tn.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Check high tide safety and 22 theertham bath operational timings.'
    },
    bestVisitingMonths: 'October to April',
    suggestedDurationHours: 4,
    nearbyStays: ['Daiwik Hotels Rameswaram', 'Hotel Sudhiksha', 'Hyatt Place Rameswaram'],
    nearbyAttractions: ['Dhanushkodi Ghost Town & Land’s End', 'Pamban Sea Bridge Viewpoint', 'Dr. APJ Abdul Kalam Memorial']
  },
  {
    id: 'sri-ranganathaswamy-srirangam',
    name: 'Sri Ranganathaswamy Temple',
    commonName: 'Srirangam Temple',
    state: 'Tamil Nadu',
    stateId: 'tamil-nadu',
    destination: 'Tiruchirappalli (Srirangam)',
    destinationSlug: 'srirangam',
    deity: 'Lord Sri Ranganatha (Reclining Vishnu)',
    tradition: 'First & Foremost of the 108 Divya Desams / Dravidian',
    circuit: '108 Vaishnava Divya Desams',
    coordinates: { lat: 10.8624, lng: 78.6901 },
    address: 'Srirangam, Tiruchirappalli, Tamil Nadu 620006',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / South Heritage',
    historicalSignificance: 'The largest functioning religious complex in the world covering 156 acres on an island formed by the Cauvery and Kollidam rivers, with 7 concentric praharas (enclosures) and 21 majestic Gopurams.',
    ritualsAndFestivals: ['Vaikunta Ekadasi (Paramapada Vasal Opening)', 'Panguni Uthiram', 'Brahmotsavam'],
    visitorEtiquette: {
      dressCode: 'Traditional Indian clothing mandatory in inner sanctum enclosures.',
      electronicsPolicy: 'Mobile tokens at entrance.'
    },
    officialPortal: {
      name: 'Srirangam Temple HR&CE Official',
      url: 'https://srirangam.hrce.tn.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Check Rajagopuram view ticket counter for panoramic temple roof views.'
    },
    bestVisitingMonths: 'November to March',
    suggestedDurationHours: 3.5,
    nearbyStays: ['Courtyard by Marriott Tiruchirappalli', 'Red Fox Hotel Trichy'],
    nearbyAttractions: ['Rockfort Ucchi Pillayar Temple', 'Jambukeswarar Temple Thiruvanaikaval', 'Kallanai Grand Anicut']
  },
  {
    id: 'guruvayur-krishna',
    name: 'Guruvayur Sri Krishna Temple',
    commonName: 'Guruvayur Temple (Bhuloka Vaikuntam)',
    state: 'Kerala',
    stateId: 'kerala',
    destination: 'Guruvayur',
    destinationSlug: 'guruvayur',
    deity: 'Lord Guruvayurappan (Child Krishna / Chaturbhuja Vishnu)',
    tradition: 'Vaishnavism / Kerala Tantric Temple Rites',
    circuit: 'Sacred Kerala Temple Circuit',
    coordinates: { lat: 10.5946, lng: 76.0392 },
    address: 'Guruvayur Devaswom, Guruvayur, Thrissur District, Kerala 680893',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Sarath P',
    historicalSignificance: 'Revered as "Bhuloka Vaikuntam" (Holy Abode of Vishnu on Earth), installed according to legend by Guru (Brihaspati) and Vayu. World-renowned for holy marriages, Udayastamana Pooja, and elephant sanctuaries.',
    ritualsAndFestivals: ['Nirmalya Darshanam (3:00 AM)', 'Seeveli (Elephant Procession)', 'Guruvayur Ekadasi', 'Chembai Sangeetholsavam'],
    visitorEtiquette: {
      dressCode: 'Strict Kerala Temple Protocol: Men must enter bare-chested wearing Mundu (Veshti). Shirts, banyans, and western trousers strictly prohibited. Women must wear Saree or Set-Mundu / Pavada.',
      electronicsPolicy: 'All electronic items, mobile phones, and leather items strictly prohibited.'
    },
    officialPortal: {
      name: 'Guruvayur Devaswom Official',
      url: 'https://guruvayurdevaswom.nic.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Only practicing Hindus permitted within inner sanctum per Devaswom customs.'
    },
    bestVisitingMonths: 'August to March',
    suggestedDurationHours: 3,
    nearbyStays: ['Sopanam Heritage Guruvayur', 'Bhasuri Inn', 'Kalyan Residency'],
    nearbyAttractions: ['Punnathur Kotta (Elephant Sanctuary)', 'Mammiyoor Shiva Temple', 'Chavakkad Beach']
  },
  {
    id: 'udupi-sri-krishna',
    name: 'Udupi Sri Krishna Matha',
    commonName: 'Udupi Sri Krishna Temple',
    state: 'Karnataka',
    stateId: 'karnataka',
    destination: 'Udupi',
    destinationSlug: 'udupi',
    deity: 'Lord Balakrishna (Child Krishna with Churning Rod)',
    tradition: 'Dvaita Vedanta established by Jagadguru Sri Madhvacharya',
    circuit: 'Coastal Karnataka Spiritual Heritage',
    coordinates: { lat: 13.3409, lng: 74.7516 },
    address: 'Car Street, Sri Krishna Temple Complex, Udupi, Karnataka 576101',
    image: 'https://images.unsplash.com/photo-1600100397858-a5b6782bcf0d?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Karnataka Vistas',
    historicalSignificance: 'Founded in the 13th century by Sri Madhvacharya. Unique for the "Kanakana Kindi" (Kanaka’s Window) through which deity turned to give darshan to saint Kanakadasa. Administered by the Ashta Mathas.',
    ritualsAndFestivals: ['Kanakana Kindi Darshana', 'Maha Prasada (Annadanam for thousands daily)', 'Paryaya Festival (Biennial power transfer)'],
    visitorEtiquette: {
      dressCode: 'Men must remove shirts/vests before entering inner courtyard. Modest traditional attire for women.',
      customs: 'Receive holy teertha and free Anna Brahma Prasadam in dining halls.'
    },
    officialPortal: {
      name: 'Sri Krishna Matha Udupi Official',
      url: 'https://www.srikrishnamatha.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Annadanam is served free twice daily to all visitors without discrimination.'
    },
    bestVisitingMonths: 'September to March',
    suggestedDurationHours: 2.5,
    nearbyStays: ['Country Inn & Suites by Radisson Manipal', 'Hotel Sri Ram Residency Udupi'],
    nearbyAttractions: ['Malpe Beach & St. Mary’s Basalt Islands', 'Kapu Lighthouse & Beach', 'Kollur Mookambika Temple']
  },
  {
    id: 'jagannath-puri',
    name: 'Shree Jagannatha Temple Puri',
    commonName: 'Puri Jagannath Temple',
    state: 'Odisha',
    stateId: 'odisha',
    destination: 'Puri',
    destinationSlug: 'puri',
    deity: 'Lord Jagannath, Lord Balabhadra & Devi Subhadra',
    tradition: 'Vaishnavism / One of the Original All-India Char Dham',
    circuit: 'All India Char Dham & Eastern Sun Temple Circuit',
    coordinates: { lat: 19.8049, lng: 85.8179 },
    address: 'Grand Road, Puri, Odisha 752001',
    image: 'https://images.unsplash.com/photo-1600100397608-f010e42e4e1e?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Soumya Ranjan',
    historicalSignificance: 'Renowned 12th-century Kalinga-style architectural marvel, famous for the colossal annual Ratha Yatra (Chariot Festival), the world’s largest traditional kitchen serving Mahaprasad, and unique neem-wood deities.',
    ritualsAndFestivals: ['Ratha Yatra Chariot Procession (Ashadha month)', 'Snana Yatra', 'Chandan Yatra', 'Mahaprasad Ananda Bazaar'],
    visitorEtiquette: {
      dressCode: 'Traditional Indian attire. Leather belts, wallets, and bags strictly banned from outer lion gate (Singhadwara).',
      electronicsPolicy: 'Zero electronics permitted. Locker stalls available on Badadanda.'
    },
    officialPortal: {
      name: 'Shree Jagannatha Temple Administration (SJTA) Official',
      url: 'https://www.shreejagannatha.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Per temple rules, entry into the temple sanctum is reserved for practicing Indian Hindus.'
    },
    bestVisitingMonths: 'October to March (or June/July for Ratha Yatra)',
    suggestedDurationHours: 3.5,
    nearbyStays: ['Mayfair Waves Puri', 'Sterling Puri', 'Hans Coco Palms'],
    nearbyAttractions: ['Golden Beach (Blue Flag Certified)', 'Konark Sun Temple UNESCO', 'Raghurajpur Heritage Craft Village']
  },
  {
    id: 'kashi-vishwanath-varanasi',
    name: 'Kashi Vishwanath Temple',
    commonName: 'Golden Temple of Varanasi / Vishveshwara',
    state: 'Uttar Pradesh',
    stateId: 'uttar-pradesh',
    destination: 'Varanasi',
    destinationSlug: 'varanasi',
    deity: 'Lord Shiva (Vishwanath — Lord of the Universe)',
    tradition: 'Shaivism / One of the 12 Jyotirlingas',
    circuit: '12 Jyotirlingas & Holy Ganga River Circuit',
    coordinates: { lat: 25.3109, lng: 83.0107 },
    address: 'Kashi Vishwanath Dham Corridor, Lahori Tola, Varanasi, Uttar Pradesh 221001',
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Cristina Gottardi',
    historicalSignificance: 'The holiest shrine of Lord Shiva located on the western bank of the sacred River Ganga. The new Kashi Vishwanath Dham Corridor seamlessly connects the temple to the river ghats.',
    ritualsAndFestivals: ['Mangala Aarti (3:00 AM)', 'Bhog Aarti', 'Sandhya & Shringar Aarti', 'Maha Shivaratri', 'Dev Deepawali (Kartik Purnima)'],
    visitorEtiquette: {
      dressCode: 'Modest Indian traditional clothing required for Sparsh Darshan (Dhoti-Kurta for men; Saree for women).',
      electronicsPolicy: 'Mobile phones and electronic gadgets must be placed in lockers located at Gate 4 or Ganga View Gate.'
    },
    officialPortal: {
      name: 'Kashi Vishwanath Temple Trust Official',
      url: 'https://www.shrikashivishwanath.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Book Sugam Darshan (Easy Access) and Aarti passes strictly on the official trust website.'
    },
    bestVisitingMonths: 'October to March',
    suggestedDurationHours: 3,
    nearbyStays: ['BrijRama Palace Varanasi', 'Taj Ganges Varanasi', 'Heritage Homestays Assi Ghat'],
    nearbyAttractions: ['Dashashwamedh Ghat Evening Ganga Aarti', 'Manikarnika & Harishchandra Ghats', 'Sarnath Buddhist Stupa & Museum']
  },
  {
    id: 'somnath-gujarat',
    name: 'Shree Somnath Jyotirlinga Temple',
    commonName: 'Somnath Temple',
    state: 'Gujarat',
    stateId: 'gujarat',
    destination: 'Somnath (Veraval)',
    destinationSlug: 'somnath',
    deity: 'Lord Shiva (Somnath — Lord of the Moon)',
    tradition: 'First of the 12 Jyotirlingas / Chalukya (Solanki) Architecture',
    circuit: '12 Jyotirlingas & Saurashtra Pilgrimage',
    coordinates: { lat: 20.8880, lng: 70.4012 },
    address: 'Somnath Mandir Marg, Prabhas Patan, Gujarat 362268',
    image: 'https://images.unsplash.com/photo-1599818816942-5f65fb470bc5?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Bhargav Modi',
    historicalSignificance: 'The first among the twelve holy Jyotirlingas, situated at the confluence of three holy rivers and the Arabian Sea (Triveni Sangam). Stood as an eternal symbol of faith rebuilt across centuries.',
    ritualsAndFestivals: ['Somnath Sound & Light Show (Evening by the sea)', 'Maha Shivaratri', 'Kartik Purnima Fair'],
    visitorEtiquette: {
      dressCode: 'Modest dress code required. No shorts or beachwear.',
      electronicsPolicy: 'Mobile phones and cameras not allowed inside main temple perimeter.'
    },
    officialPortal: {
      name: 'Shree Somnath Trust Official',
      url: 'https://www.somnath.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Trust offers clean, non-profit guest houses (Sagar Darshan, Maheshwari Bhawan) bookable online.'
    },
    bestVisitingMonths: 'October to March',
    suggestedDurationHours: 2.5,
    nearbyStays: ['Somnath Trust Sagar Darshan', 'The Fern Residency Somnath', 'Lords Inn Somnath'],
    nearbyAttractions: ['Triveni Sangam Prabhas Patan', 'Bhalka Tirth', 'Somnath Promenade & Beach']
  },
  {
    id: 'dwarkadhish-gujarat',
    name: 'Dwarkadhish Temple (Jagat Mandir)',
    commonName: 'Dwarka Temple',
    state: 'Gujarat',
    stateId: 'gujarat',
    destination: 'Dwarka',
    destinationSlug: 'dwarka',
    deity: 'Lord Krishna (King of Dwarka / Dwarkadhish)',
    tradition: 'Vaishnavism / One of the 4 Sacred All-India Char Dham',
    circuit: 'All India Char Dham & Pancha Dwarka',
    coordinates: { lat: 22.2376, lng: 68.9678 },
    address: 'Dwarka, Devbhumi Dwarka District, Gujarat 361335',
    image: 'https://images.unsplash.com/photo-1599818816942-5f65fb470bc5?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Bhargav Modi',
    historicalSignificance: 'The 5-story limestone Jagat Mandir supported by 72 carved pillars, erected at the legendary capital of Lord Krishna’s kingdom overlooking the Gomti River confluence.',
    ritualsAndFestivals: ['Dhvajaji Aarohan (Flag Changing Ceremony 5 times daily)', 'Janmashtami Celebrations'],
    visitorEtiquette: {
      dressCode: 'Traditional respectful clothing.',
      customs: 'Witness the colorful 52-yard sacred flag changing ceremony.'
    },
    officialPortal: {
      name: 'Dwarkadhish Devasthan Official',
      url: 'https://dwarkadhish.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Check daily flag hoisting and darshan timings on the official portal.'
    },
    bestVisitingMonths: 'October to March',
    suggestedDurationHours: 3,
    nearbyStays: ['Hawthorn Suites by Wyndham Dwarka', 'Goverdhan Greens Dwarka'],
    nearbyAttractions: ['Bet Dwarka Island Boat Ferry', 'Nageshwar Jyotirlinga', 'Gomti Ghat Sangam', 'Rukmini Devi Temple']
  },
  {
    id: 'mahakaleshwar-ujjain',
    name: 'Shri Mahakaleshwar Jyotirlinga Temple',
    commonName: 'Mahakal Temple Ujjain',
    state: 'Madhya Pradesh',
    stateId: 'madhya-pradesh',
    destination: 'Ujjain',
    destinationSlug: 'ujjain',
    deity: 'Lord Shiva (Dakshinamoorthi — Facing South)',
    tradition: 'Shaivism / One of the 12 Jyotirlingas & Mahakal Lok',
    circuit: '12 Jyotirlingas & Sacred Shipra River Circuit',
    coordinates: { lat: 23.1827, lng: 75.7682 },
    address: 'Jaisinghpura, Ujjain, Madhya Pradesh 456006',
    image: 'https://images.unsplash.com/photo-1598890777032-bde13fba5be3?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Pulkit Saxena',
    historicalSignificance: 'The only south-facing (Dakshinamoorthi) Jyotirlinga among the 12 sacred shrines, situated along the holy Shipra River. Known worldwide for the sacred early-morning Bhasma Aarti and the new grand Mahakal Lok Corridor.',
    ritualsAndFestivals: ['Bhasma Aarti (4:00 AM sacred ash ritual)', 'Mahakal Sawari Processions (Shravan Mondays)', 'Simhastha Kumbh Mela (every 12 years)'],
    visitorEtiquette: {
      dressCode: 'Strict Bhasma Aarti Protocol: Men must wear unstitched traditional Sola (silk/cotton Dhoti); Women must wear traditional Saree. Jeans/pants strictly barred during Jalabhisheka.',
      electronicsPolicy: 'Electronic devices strictly prohibited during sanctum entry.'
    },
    officialPortal: {
      name: 'Shree Mahakaleshwar Temple Management Committee',
      url: 'https://shrimahakaleshwar.com/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Bhasma Aarti passes require advance online slot booking with government ID verification on the official website.'
    },
    bestVisitingMonths: 'October to March',
    suggestedDurationHours: 3.5,
    nearbyStays: ['MPT Shipra Residency Ujjain', 'Hotel Anushree Ujjain', 'Mahakal Lok Guest Houses'],
    nearbyAttractions: ['Mahakal Lok Heritage Corridor', 'Kal Bhairav Temple', 'Ram Ghat on Shipra River', 'Harsiddhi Shakti Peetha']
  },
  {
    id: 'kedarnath-temple',
    name: 'Kedarnath Jyotirlinga Temple',
    commonName: 'Kedarnath Dham',
    state: 'Uttarakhand',
    stateId: 'uttarakhand',
    destination: 'Kedarnath (Rudraprayag)',
    destinationSlug: 'kedarnath',
    deity: 'Lord Shiva (Lord of Kedar)',
    tradition: 'Shaivism / Highest of 12 Jyotirlingas & Chota Char Dham',
    circuit: 'Uttarakhand Chota Char Dham & Panch Kedar',
    coordinates: { lat: 30.7352, lng: 79.0669 },
    address: 'Kedarnath, Rudraprayag District, Uttarakhand 246445',
    image: 'https://images.unsplash.com/photo-1599818816942-5f65fb470bc5?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Shashi Kant',
    historicalSignificance: 'Perched at 3,583 meters against the majestic snow-laden Kedarnath and Kedar Dome peaks near Mandakini River. One of the Panch Kedar shrines established according to legend by the Pandavas and revived by Adi Shankaracharya.',
    ritualsAndFestivals: ['Opening of Portal (Akshaya Tritiya / May)', 'Closing of Portal (Bhai Dooj / November)', 'Maha Abhishek'],
    visitorEtiquette: {
      dressCode: 'Heavy thermal winter wear and sturdy mountain trekking footwear mandatory.',
      travelAdvisory: '16 km trek from Gaurikund. Mandatory biometric registration required on Uttarakhand Tourism portal. Helicopter services bookable only via IRCTC Heli Yatra portal.'
    },
    officialPortal: {
      name: 'Shri Badrinath-Kedarnath Temple Committee (BKTC)',
      url: 'https://badrinath-kedarnath.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Seasonal opening: May to November only. Register on the official portal before commencing mountain journey.'
    },
    bestVisitingMonths: 'May to June & September to October (Closed during harsh winter snow)',
    suggestedDurationHours: 5,
    nearbyStays: ['GMVN Tourist Rest House Kedarnath', 'Bikaner House Kedarnath', 'Gaurikund GMVN Lodge'],
    nearbyAttractions: ['Bhairavnath Temple', 'Gandhi Sarovar (Chorabari Tal)', 'Vasuki Tal Glacial Lake']
  },
  {
    id: 'badrinath-temple',
    name: 'Badrinath Temple (Badri Vishal)',
    commonName: 'Badrinath Dham',
    state: 'Uttarakhand',
    stateId: 'uttarakhand',
    destination: 'Badrinath (Chamoli)',
    destinationSlug: 'badrinath',
    deity: 'Lord Badri Vishal (Lord Badrinarayan / Vishnu in Meditative Posture)',
    tradition: 'Vaishnavism / Principal Seat of All-India Char Dham',
    circuit: 'All India Char Dham & Chota Char Dham',
    coordinates: { lat: 30.7449, lng: 79.4912 },
    address: 'Badri Puri, Chamoli District, Uttarakhand 246422',
    image: 'https://images.unsplash.com/photo-1599818816942-5f65fb470bc5?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Shashi Kant',
    historicalSignificance: 'Located at 3,133 meters between the Nar and Narayana mountain ranges by the Alaknanda River. The black stone Shaligram idol in Padmasana was established by Adi Shankaracharya.',
    ritualsAndFestivals: ['Tapt Kund Holy Thermal Bath', 'Maha Abhishek', 'Badri-Kedar Festival'],
    visitorEtiquette: {
      dressCode: 'Warm woolen clothing required; shoes removed at temple platform.'
    },
    officialPortal: {
      name: 'BKTC Official Badrinath Portal',
      url: 'https://badrinath-kedarnath.gov.in/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Mandatory Char Dham registration via registrationandtouristcare.uk.gov.in.'
    },
    bestVisitingMonths: 'May to June & September to October (Closed in winter)',
    suggestedDurationHours: 3,
    nearbyStays: ['Sarovar Portico Badrinath', 'GMVN Badrinath Rest Houses'],
    nearbyAttractions: ['Mana Village (Last Indian Village on Indo-Tibetan Border)', 'Vasudhara Falls', 'Vyas Gufa & Saraswati River Confluence']
  },
  {
    id: 'vaishno-devi-shrine',
    name: 'Shri Mata Vaishno Devi Shrine',
    commonName: 'Vaishno Devi Bhawan',
    state: 'Jammu & Kashmir',
    stateId: 'jammu-and-kashmir',
    destination: 'Katra',
    destinationSlug: 'katra',
    deity: 'Mata Vaishno Devi (Holy Pindies of Maha Kali, Maha Lakshmi & Maha Saraswati)',
    tradition: 'Shakta / Sacred Cave Shrine of Trikuta Mountains',
    circuit: 'Jammu & Kashmir Sacred Mountain Circuit',
    coordinates: { lat: 33.0308, lng: 74.9490 },
    address: 'Bhavan, Trikuta Hills, Katra, Reasi District, Jammu and Kashmir 182301',
    image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1000&q=80',
    imageCredit: 'Unsplash / Imad Clicks',
    historicalSignificance: 'The holy natural cave shrine situated at 5,200 feet in the Trikuta mountains, visited by millions of pilgrims annually chanting "Jai Mata Di". Worshipped as three natural rock formations (Pindies).',
    ritualsAndFestivals: ['Chaitra & Sharad Navratri Mahotsav', 'Atka Aarti at Bhawan'],
    visitorEtiquette: {
      dressCode: 'Comfortable modest walking clothes. Heavy thermal layers in winter.',
      travelAdvisory: '13 km well-paved uphill trek from Katra. Battery car available between Ardhkuwari and Bhawan for elderly pilgrims. RFID Yatra Parchi mandatory for all yatris.'
    },
    officialPortal: {
      name: 'Shri Mata Vaishno Devi Shrine Board (SMVDSB) Official',
      url: 'https://www.maavaishnodevi.org/',
      verifiedDate: '2026-09-01',
      disclaimer: 'Obtain mandatory RFID Yatra card and book ropeway/battery car directly on the official SMVDSB portal.'
    },
    bestVisitingMonths: 'March to November (Open all 365 days)',
    suggestedDurationHours: 8,
    nearbyStays: ['SMVDSB Niharika / Shakti Bhawan Katra', 'The White Hotel Katra', 'Fortune Park Katra'],
    nearbyAttractions: ['Ardhkuwari Holy Cave', 'Bhairon Ghati (Connected by Cable Car Ropeway)', 'Ban Ganga']
  }
];

export const getTemplesByState = (stateId) =>
  templesData.filter((t) => t.stateId === stateId || t.state.toLowerCase() === stateId?.toLowerCase());

export const getTempleById = (id) =>
  templesData.find((t) => t.id === id || t.destinationSlug === id);
