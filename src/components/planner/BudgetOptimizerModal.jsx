import React from "react";
import { 
  BedDouble, 
  TrendingDown, 
  Ticket, 
  Coffee,
  AlertCircle
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { stays } from "../../data/stays";
import { destinations } from "../../data/destinations";
import { formatINR } from "../../utils/currencyFormatter";

export function BudgetOptimizerModal({
  isOpen,
  onClose,
  itinerary,
  budgetCalculation,
  onApplyStayChange,
  onApplyActivityChange
}) {
  if (!isOpen || !itinerary || !budgetCalculation) return null;

  const { overageAmount, numTravelers, breakdown } = budgetCalculation;
  const destinationSlug = itinerary.destinationSlug;
  const destinationObj = destinations.find(d => d.slug === destinationSlug);

  // 1. Check if there is a cheaper stay option in the same destination
  const currentStayRate = breakdown?.accommodation?.nightlyRate || 3000;
  const currentStayName = breakdown?.accommodation?.stayName || "Current Stay";
  const hotelNights = breakdown?.accommodation?.nights || 0;
  const roomsNeeded = breakdown?.accommodation?.roomsNeeded || 1;

  const destinationStays = stays.filter(s => s.destinationSlug === destinationSlug);
  const cheaperStays = destinationStays
    .filter(s => s.pricePerNight < currentStayRate)
    .sort((a, b) => a.pricePerNight - b.pricePerNight);

  const bestCheaperStay = cheaperStays[0];
  const staySavings = bestCheaperStay && hotelNights > 0
    ? (currentStayRate - bestCheaperStay.pricePerNight) * hotelNights * roomsNeeded
    : 0;

  // 2. Find high-cost activities across days that could be optimized
  const paidActivities = [];
  itinerary.days.forEach(day => {
    ["morning", "afternoon", "evening"].forEach(slotKey => {
      const item = day[slotKey];
      if (item && item.cost > 200 && !item.isFreeTime) {
        paidActivities.push({
          dayNumber: day.dayNumber,
          slotKey,
          item,
          totalCost: (item.cost || 0) * numTravelers
        });
      }
    });
  });

  // Sort paid activities by highest cost
  paidActivities.sort((a, b) => b.totalCost - a.totalCost);

  const suggestions = [];

  // Suggestion A: Cheaper Stay
  if (bestCheaperStay && staySavings > 0) {
    suggestions.push({
      id: "opt-stay",
      type: "stay",
      icon: BedDouble,
      title: `Switch to ${bestCheaperStay.name}`,
      current: `${currentStayName} (~${formatINR(currentStayRate)}/nt)`,
      proposed: `${bestCheaperStay.name} (~${formatINR(bestCheaperStay.pricePerNight)}/nt)`,
      estimatedSaving: staySavings,
      tradeoff: `Saves budget while retaining authentic regional ambiance. Category: ${bestCheaperStay.category}.`,
      action: () => {
        onApplyStayChange(bestCheaperStay);
        onClose();
      }
    });
  }

  // Suggestion B: Replace highest paid activity with low-cost / free sightseeing
  if (paidActivities.length > 0) {
    const topPaid = paidActivities[0];
    const availableAttractions = destinationObj?.attractions || [];
    const lowCostAttraction = availableAttractions.find(a => (a.cost || 0) < topPaid.item.cost && a.id !== topPaid.item.id);

    if (lowCostAttraction) {
      const activitySavings = (topPaid.item.cost - (lowCostAttraction.cost || 0)) * numTravelers;
      suggestions.push({
        id: "opt-activity-alt",
        type: "activity",
        icon: Ticket,
        title: `Replace Day ${topPaid.dayNumber} ${topPaid.slotKey} Activity`,
        current: `${topPaid.item.name} (${formatINR(topPaid.item.cost)}/person)`,
        proposed: `${lowCostAttraction.name} (${formatINR(lowCostAttraction.cost)}/person)`,
        estimatedSaving: activitySavings,
        tradeoff: `Maintains cultural discovery with a lower entry fee (~${formatINR(activitySavings)} group saving).`,
        action: () => {
          onApplyActivityChange(topPaid.dayNumber, topPaid.slotKey, {
            ...lowCostAttraction,
            isExperience: false
          });
          onClose();
        }
      });
    }

    // Suggestion C: Convert paid afternoon to relaxed free leisure
    const freeTimeSavings = topPaid.item.cost * numTravelers;
    suggestions.push({
      id: "opt-free-time",
      type: "leisure",
      icon: Coffee,
      title: `Convert Day ${topPaid.dayNumber} ${topPaid.slotKey} to Free Leisure`,
      current: `${topPaid.item.name} (${formatINR(topPaid.item.cost)}/person)`,
      proposed: `Self-Guided Walking & Courtyard Chai (Free)`,
      estimatedSaving: freeTimeSavings,
      tradeoff: `Gives unhurried downtime to explore local bazaar lanes without scheduled tickets or workshop fees.`,
      action: () => {
        onApplyActivityChange(topPaid.dayNumber, topPaid.slotKey, {
          id: `free-leisure-${Date.now()}`,
          name: "Unscheduled Leisure & Heritage Lane Stroll",
          category: "Relaxation",
          duration: "2 hours",
          cost: 0,
          description: "Open time slot to rest, browse artisan shops, or enjoy a local cafe at your own rhythm.",
          isFreeTime: true,
          tip: "A zero-cost pause to absorb the local culture without rushed scheduling."
        });
        onClose();
      }
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Budget Optimizer — Find Lower-Cost Options"
      maxWidth="max-w-2xl"
    >
      <div className="space-y-5">
        
        {/* Overage Alert */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/40 text-amber-950 flex items-start gap-3">
          <TrendingDown className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-amber-900 text-sm">
              Potential Savings to Bridge {formatINR(overageAmount)} Variance
            </h4>
            <p className="text-amber-800 leading-relaxed">
              We analyzed your current itinerary and found {suggestions.length} realistic modifications using verified local alternatives in <strong>{destinationObj?.name || "your destination"}</strong>.
            </p>
          </div>
        </div>

        {/* Suggestions List */}
        {suggestions.length === 0 ? (
          <div className="text-center py-6 space-y-2">
            <AlertCircle className="w-8 h-8 text-theme-text-muted mx-auto" />
            <h5 className="text-sm font-semibold text-theme-text">No Cheaper Options Available in Dataset</h5>
            <p className="text-xs text-theme-text-muted max-w-sm mx-auto">
              Your selected itinerary already uses the most cost-effective lodging and activities for this region. To reduce costs further, consider reducing duration or travelers.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            {suggestions.map((sug) => {
              const Icon = sug.icon;
              return (
                <div
                  key={sug.id}
                  className="p-4 rounded-2xl border border-theme-border bg-theme-surface hover:border-theme-primary/40 transition-all space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-theme-primary-light text-theme-primary flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="text-sm font-serif font-bold text-theme-text">
                          {sug.title}
                        </h5>
                        <span className="text-[11px] font-bold text-emerald-600">
                          Estimated Saving: ~{formatINR(sug.estimatedSaving)}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={sug.action}
                      variant="primary"
                      size="sm"
                      className="shrink-0 text-xs"
                    >
                      Apply Suggestion
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs p-3 rounded-xl bg-theme-bg/60 border border-theme-border/60">
                    <div>
                      <span className="text-theme-text-subtle text-[10px] uppercase tracking-wider block font-semibold">
                        Current
                      </span>
                      <span className="text-theme-text font-medium line-clamp-1">{sug.current}</span>
                    </div>
                    <div>
                      <span className="text-emerald-700 text-[10px] uppercase tracking-wider block font-semibold">
                        Proposed Replacement
                      </span>
                      <span className="text-theme-text font-semibold line-clamp-1">{sug.proposed}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-theme-text-muted leading-relaxed italic">
                    💡 Trade-off note: {sug.tradeoff}
                  </p>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-theme-border flex justify-end gap-2">
          <Button onClick={onClose} variant="secondary" size="sm">
            Close
          </Button>
        </div>

      </div>
    </Modal>
  );
}
export default BudgetOptimizerModal;
