/**
 * Calculates a transparent, itemized trip budget breakdown based on user parameters,
 * selected stay, planned experiences, and destination averages.
 */
export function calculateBudgetBreakdown({
  days = 1,
  travelers = 1,
  totalBudget = 0,
  stay = null,
  selectedExperiences = [],
  itineraryDays = [],
  destination = null,
}) {
  const numDays = Math.max(1, Number(days) || 1);
  const numTravelers = Math.max(1, Number(travelers) || 1);
  const enteredBudget = Math.max(0, Number(totalBudget) || 0);

  // 1. Accommodation calculation
  // For a 1-day itinerary, default to 0 hotel nights (day excursion)
  const hotelNights = numDays === 1 ? 0 : numDays - 1;
  const roomCapacity = stay?.maxOccupancy || 2;
  const roomsNeeded = hotelNights > 0 ? Math.ceil(numTravelers / roomCapacity) : 0;
  
  // If user selected a specific stay, use its room price; otherwise use destination daily budget baseline
  const nightlyRoomRate = stay?.pricePerNight ?? (destination ? Math.round(destination.dailyBudgetEstimate * 0.85) : 3000);
  const accommodationTotal = hotelNights * roomsNeeded * nightlyRoomRate;

  // 2. Food & Dining calculation (per traveller basis)
  // Estimated at ₹750/person/day for authentic local breakfasts, thali lunches, street snacks & dinners
  const dailyFoodPerPerson = 750;
  const foodTotal = numDays * numTravelers * dailyFoodPerPerson;

  // 3. Transport calculation (group vehicle basis)
  // Basis: Local dedicated cab hire / auto rentals for city exploration & transfers
  // For 1-4 travellers: 1 hatchback/sedan @ ₹1,400/day
  // For 5-7 travellers: 1 SUV/Innova @ ₹2,400/day
  // For 8-10 travellers: 1 Tempo Traveller @ ₹3,600/day
  let dailyTransportRate = 1400;
  let transportTypeDescription = "Dedicated local cab (Sedan / Hatchback)";
  if (numTravelers >= 8) {
    dailyTransportRate = 3600;
    transportTypeDescription = "12-Seater Tempo Traveller mini-bus";
  } else if (numTravelers >= 5) {
    dailyTransportRate = 2400;
    transportTypeDescription = "Spacious SUV / MPV (6-7 Seater)";
  }
  const transportTotal = numDays * dailyTransportRate;

  // 4. Experiences and Attraction Entry Fees
  // A. Selected community workshops & guided tours (priced per person)
  const selectedExpTotal = selectedExperiences.reduce((sum, exp) => {
    return sum + (Number(exp.pricePerPerson) || 0) * numTravelers;
  }, 0);

  // B. Attraction monument tickets from itinerary days (priced per person)
  let attractionTicketsTotal = 0;
  if (itineraryDays && itineraryDays.length > 0) {
    itineraryDays.forEach(day => {
      const slots = [day.morning, day.afternoon, day.evening];
      slots.forEach(slotItem => {
        if (slotItem && slotItem.cost && !slotItem.isFreeTime) {
          attractionTicketsTotal += (Number(slotItem.cost) || 0) * numTravelers;
        }
      });
    });
  } else if (destination) {
    // Fallback baseline for attraction entrance fees
    attractionTicketsTotal = numDays * 350 * numTravelers;
  }

  const experiencesTotal = selectedExpTotal + attractionTicketsTotal;

  // 5. Total and Budget Variance
  const estimatedTotal = accommodationTotal + foodTotal + transportTotal + experiencesTotal;
  const perPersonCost = Math.round(estimatedTotal / numTravelers);
  const variance = enteredBudget - estimatedTotal;
  const isOverBudget = enteredBudget > 0 && estimatedTotal > enteredBudget;
  const overageAmount = isOverBudget ? estimatedTotal - enteredBudget : 0;
  const budgetUtilizationPct = enteredBudget > 0 ? Math.min(100, Math.round((estimatedTotal / enteredBudget) * 100)) : 100;

  return {
    numDays,
    numTravelers,
    enteredBudget,
    isOverBudget,
    overageAmount,
    variance,
    budgetUtilizationPct,
    estimatedTotal,
    perPersonCost,
    breakdown: {
      accommodation: {
        total: accommodationTotal,
        nights: hotelNights,
        roomsNeeded,
        roomCapacity,
        nightlyRate: nightlyRoomRate,
        stayName: stay?.name || "Curated Standard Heritage/Boutique Stay (Estimated)",
        basis: hotelNights === 0 
          ? "0 nights (1-day excursion, no stay charges)" 
          : `${hotelNights} night(s) × ${roomsNeeded} room(s) @ ₹${nightlyRoomRate.toLocaleString('en-IN')}/night`
      },
      food: {
        total: foodTotal,
        ratePerPersonPerDay: dailyFoodPerPerson,
        basis: `${numDays} day(s) × ${numTravelers} traveler(s) @ ₹${dailyFoodPerPerson}/person/day for meals & refreshments`
      },
      transport: {
        total: transportTotal,
        dailyRate: dailyTransportRate,
        type: transportTypeDescription,
        basis: `${numDays} day(s) × ₹${dailyTransportRate.toLocaleString('en-IN')}/day for ${transportTypeDescription} including fuel & local transfers`
      },
      experiences: {
        total: experiencesTotal,
        selectedExperiencesCost: selectedExpTotal,
        attractionTicketsCost: attractionTicketsTotal,
        selectedCount: selectedExperiences.length,
        basis: selectedExperiences.length > 0 
          ? `${selectedExperiences.length} booked local experience(s) plus monument tickets for ${numTravelers} traveler(s)`
          : `Estimated monument entry tickets and site permits for ${numTravelers} traveler(s)`
      }
    }
  };
}
