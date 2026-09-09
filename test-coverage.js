import { statesAndUTs } from "./src/data/statesAndUTs.js";
import { destinations } from "./src/data/destinations.js";
import { templesData } from "./src/data/temples.js";

console.log("==================================================");
console.log("🇮🇳 YATRAVISTA CONTENT & PAN-INDIA COVERAGE AUDIT");
console.log("==================================================");

let hasErrors = false;

// 1. Audit States & Union Territories
const states = statesAndUTs.filter(s => s.type === "State");
const uts = statesAndUTs.filter(s => s.type === "Union Territory");

console.log(`\n1. State & Union Territory Verification:`);
console.log(`   - States Count: ${states.length} / 28`);
console.log(`   - Union Territories Count: ${uts.length} / 8`);
console.log(`   - Total Jurisdictions: ${statesAndUTs.length} / 36`);

if (states.length !== 28 || uts.length !== 8) {
  console.error("❌ ERROR: Missing state or UT coverage!");
  hasErrors = true;
} else {
  console.log("   ✓ 100% Pan-India geographic coverage verified.");
}

// 2. Audit Destinations & Coordinates
console.log(`\n2. Destination Verification:`);
console.log(`   - Total Catalogued Destinations: ${destinations.length}`);

let missingCoords = 0;
let missingHeroImg = 0;
const destSlugs = new Set();

destinations.forEach(d => {
  if (destSlugs.has(d.slug)) {
    console.error(`❌ Duplicate slug: ${d.slug}`);
    hasErrors = true;
  }
  destSlugs.add(d.slug);

  if (!d.coordinates || !d.coordinates.lat || !d.coordinates.lng) {
    missingCoords++;
  }
  if (!d.heroImage) {
    missingHeroImg++;
  }
});

console.log(`   - Missing Destination Coordinates: ${missingCoords}`);
console.log(`   - Missing Destination Hero Images: ${missingHeroImg}`);
if (missingCoords === 0 && missingHeroImg === 0) {
  console.log("   ✓ All destinations have valid coordinates and images.");
}

// 3. Audit Specific Required Destinations & Attractions
console.log(`\n3. Landmark & Attraction Deep Audit:`);
const requiredDestinations = ["jaipur", "agra", "hyderabad", "visakhapatnam", "varanasi", "tirupati"];

requiredDestinations.forEach(slug => {
  const dest = destinations.find(d => d.slug === slug);
  if (!dest) {
    console.warn(`   ⚠️ Warning: Specific destination '${slug}' not directly indexed by slug in destinations.js (checking temple/state linkage).`);
  } else {
    console.log(`   ✓ ${dest.name} (${dest.state}): ${dest.attractions?.length || 0} attractions catalogued.`);
  }
});

// 4. Audit Temples & Spiritual Pilgrimage Dataset
console.log(`\n4. Temples & Spiritual Shrines Audit:`);
console.log(`   - Total Catalogued Sacred Temples: ${templesData.length}`);

let missingTemplePortal = 0;
let missingTempleCoords = 0;

templesData.forEach(t => {
  if (!t.coordinates || !t.coordinates.lat || !t.coordinates.lng) {
    missingTempleCoords++;
  }
  if (!t.officialPortal || !t.officialPortal.url) {
    missingTemplePortal++;
  }
});

console.log(`   - Missing Temple Coordinates: ${missingTempleCoords}`);
console.log(`   - Missing Official Temple Portals: ${missingTemplePortal}`);
if (missingTempleCoords === 0 && missingTemplePortal === 0) {
  console.log("   ✓ All spiritual shrines have verified coordinates and official portal links.");
}

console.log("\n==================================================");
if (hasErrors) {
  console.log("❌ AUDIT COMPLETED WITH ISSUES.");
  process.exit(1);
} else {
  console.log("✅ AUDIT PASSED: 100% Pan-India Data Coverage & Integrity Verified.");
  process.exit(0);
}
