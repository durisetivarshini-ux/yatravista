import { destinations } from "../data/destinations.js";
import { experiences } from "../data/experiences.js";

/**
 * Deterministic rule-based itinerary generator.
 * Can be swapped with an AI service/microservice in future iterations.
 */
export function generateItinerary({
  destinationSlug = "jaipur",
  days = 3,
  travelers = 2,
  budget = 35000,
  totalBudget = budget,
  interests = ["Culture", "Heritage"],
  pace = "balanced", // relaxed, balanced, active
  selectedStay = null,
  selectedExperiences = []
}) {
  const dest = destinations.find(d => d.slug === destinationSlug) || destinations[0];
  const numDays = Math.min(7, Math.max(1, Number(days) || 1));
  
  // Available destination attractions
  const allAttractions = [...(dest.attractions || [])];
  
  // Track used attraction IDs to prevent early duplication
  const usedAttractionIds = new Set();
  const assignedExperienceIds = new Set();

  // Curated fallback / leisure items when attractions are exhausted
  const leisureTemplates = {
    morning: [
      {
        id: "leisure-morning-1",
        name: `Sunrise Stroll & Local Chai at ${dest.name}`,
        category: "Relaxation",
        duration: "1.5 hours",
        cost: 60,
        description: "Wake up early for a refreshing stroll through quiet heritage residential quarters as neighborhood tea vendors brew fragrant cardamom chai.",
        isFreeTime: true,
        tip: "A great time for quiet morning photography before the markets wake up."
      },
      {
        id: "leisure-morning-2",
        name: "Morning Yoga & Traditional Breakfast",
        category: "Relaxation",
        duration: "1.5 hours",
        cost: 120,
        description: "Unwind with gentle stretching and meditation followed by regional hot breakfast specialties at your stay or a recommended heritage eatery.",
        isFreeTime: true,
        tip: "Ask your host for the freshest seasonal fruits and warm local bread."
      }
    ],
    afternoon: [
      {
        id: "leisure-afternoon-1",
        name: "Artisan Lane Wandering & Textile Discovery",
        category: "Art & Craft",
        duration: "2 hours",
        cost: 100,
        description: "Explore traditional alleyways, interact with local family craft workshops, and pick up handcrafted souvenirs directly from makers.",
        isFreeTime: true,
        tip: "Always ask permission before taking close-up portraits of artisans at work."
      },
      {
        id: "leisure-afternoon-2",
        name: "Courtyard Reading & Afternoon High Tea",
        category: "Relaxation",
        duration: "2 hours",
        cost: 150,
        description: "Escape the midday sun in a quiet heritage courtyard or botanical garden with a travel book and regional herbal infusions.",
        isFreeTime: true,
        tip: "Enjoy restorative downtime to recharge before the evening activities."
      }
    ],
    evening: [
      {
        id: "leisure-evening-1",
        name: `Sunset Horizon & Street Food Delicacies`,
        category: "Food",
        duration: "2 hours",
        cost: 250,
        description: "Take in the twilight colors over the skyline, followed by tasting beloved street delicacies at a vibrant food square.",
        isFreeTime: true,
        tip: "Head to vendor stalls with high local patronage for the freshest preparations."
      },
      {
        id: "leisure-evening-2",
        name: "Starlit Rooftop Dinner & Folk Music",
        category: "Culture",
        duration: "2.5 hours",
        cost: 400,
        description: "Dine on an open-air terrace overlooking illuminated monuments with gentle acoustic instrumental music playing in the background.",
        isFreeTime: true,
        tip: "Book an outdoor corner table in advance for uninterrupted panoramic night vistas."
      }
    ]
  };

  /**
   * Helper to find best matching item for a slot
   */
  function pickItemForSlot(slot, dayNumber) {
    // 1. Check if user selected an experience matching this slot that hasn't been assigned yet
    const matchingSelectedExp = selectedExperiences.find(exp => {
      if (assignedExperienceIds.has(exp.id)) return false;
      return !exp.suitableSlot || exp.suitableSlot === slot;
    });

    if (matchingSelectedExp) {
      assignedExperienceIds.add(matchingSelectedExp.id);
      return {
        id: matchingSelectedExp.id,
        name: matchingSelectedExp.title,
        category: matchingSelectedExp.category,
        duration: matchingSelectedExp.duration,
        cost: matchingSelectedExp.pricePerPerson,
        description: matchingSelectedExp.description,
        isExperience: true,
        provider: matchingSelectedExp.provider,
        tip: `Organized by local partner: ${matchingSelectedExp.provider}`
      };
    }

    // 2. Filter attractions for this destination
    // Prefer matching slot and matching user interests
    const slotMatches = allAttractions.filter(att => !usedAttractionIds.has(att.id) && att.slot === slot);
    
    // Sort by interest match
    slotMatches.sort((a, b) => {
      const aMatches = interests.includes(a.category) ? 1 : 0;
      const bMatches = interests.includes(b.category) ? 1 : 0;
      return bMatches - aMatches;
    });

    if (slotMatches.length > 0) {
      const chosen = slotMatches[0];
      usedAttractionIds.add(chosen.id);
      return { ...chosen, isExperience: false };
    }

    // 3. If no slot match, try any unused attraction matching interests
    const anyUnused = allAttractions.filter(att => !usedAttractionIds.has(att.id));
    if (anyUnused.length > 0) {
      const chosen = anyUnused[0];
      usedAttractionIds.add(chosen.id);
      return { ...chosen, isExperience: false };
    }

    // 4. If all attractions exhausted or for relaxed pace afternoon, provide curated leisure
    const templates = leisureTemplates[slot] || leisureTemplates.afternoon;
    const templateIdx = (dayNumber - 1) % templates.length;
    return { ...templates[templateIdx] };
  }

  const daysList = [];

  for (let d = 1; d <= numDays; d++) {
    // Determine morning, afternoon, evening activities based on pace
    let morning = pickItemForSlot("morning", d);
    let afternoon = pickItemForSlot("afternoon", d);
    let evening = pickItemForSlot("evening", d);

    // If pace is 'relaxed', keep the afternoon as leisurely downtime
    if (pace === "relaxed" && d > 1) {
      afternoon = {
        id: `relaxed-tea-${d}`,
        name: "Susegad Afternoon Siesta & Tea Break",
        category: "Relaxation",
        duration: "2 hours",
        cost: 100,
        description: "Embrace the unhurried Indian tradition of afternoon rest, followed by tea on the veranda or by the pool.",
        isFreeTime: true,
        tip: "A relaxed pace ensures you experience the local vibe without fatigue."
      };
    }

    daysList.push({
      dayNumber: d,
      theme: d === 1 
        ? "Arrival, Iconic Landmarks & Welcome Flavors"
        : d === 2 
        ? "Heritage Craft, Hidden Streets & Living Culture"
        : d === 3 
        ? "Scenic Panoramas, Nature & Culinary Highlights"
        : `Deep Immersion & Surrounding Valleys (Day ${d})`,
      morning,
      afternoon,
      evening
    });
  }

  return {
    id: `itinerary-${dest.slug}-${Date.now()}`,
    destinationSlug: dest.slug,
    destinationName: dest.name,
    title: `${dest.name} Odyssey (${numDays} Days)`,
    createdAt: new Date().toISOString(),
    daysCount: numDays,
    travelersCount: Number(travelers) || 1,
    budget: Number(budget || totalBudget || 35000) || 35000,
    interests,
    pace,
    selectedStay,
    selectedExperiences,
    days: daysList
  };
}
