import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { 
  Sparkles, 
  Printer, 
  Bookmark, 
  Edit3,
  Copy,
  Luggage,
  CalendarDays,
  AlertCircle,
  Save,
  Check
} from "lucide-react";
import { PlannerForm } from "../components/planner/PlannerForm";
import { ItineraryDay } from "../components/planner/ItineraryDay";
import { BudgetSummary } from "../components/planner/BudgetSummary";
import { BudgetOptimizerModal } from "../components/planner/BudgetOptimizerModal";
import { TripChecklist } from "../components/planner/TripChecklist";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useTrip } from "../context/TripContext";
import { generateItinerary } from "../utils/itineraryGenerator";
import { calculateBudgetBreakdown } from "../utils/budgetCalculator";
import { destinations } from "../data/destinations";
import { createInitialChecklist } from "../data/defaultChecklist";

export function TripPlanner() {
  const [searchParams] = useSearchParams();
  const { 
    selectedStay, 
    selectStayForTrip,
    clearSelectedStay, 
    selectedExperiences, 
    removeExperienceFromTrip,
    saveTrip,
    savedTrips,
    showToast
  } = useTrip();

  // Query parameter pre-fills
  const initialDestParam = searchParams.get("destination") || "jaipur";
  const initialDaysParam = parseInt(searchParams.get("days"), 10) || 3;
  const initialBudgetParam = parseInt(searchParams.get("budget"), 10) || 35000;

  const [itinerary, setItinerary] = useState(() => {
    return generateItinerary({
      destinationSlug: initialDestParam,
      days: initialDaysParam,
      travelers: 2,
      budget: initialBudgetParam,
      interests: ["Culture", "Heritage", "Food"],
      pace: "balanced",
      selectedStay,
      selectedExperiences
    });
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [isRenameModalOpen, setIsRenameModalOpen] = useState(false);
  const [isOptimizerModalOpen, setIsOptimizerModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule"); // schedule | checklist
  const [editedTitle, setEditedTitle] = useState(itinerary?.title || "");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Warn user before leaving page if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes in your itinerary. Are you sure you want to leave?";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Update itinerary when URL search params change
  useEffect(() => {
    const updated = generateItinerary({
      destinationSlug: initialDestParam,
      days: initialDaysParam,
      travelers: 2,
      budget: initialBudgetParam,
      interests: ["Culture", "Heritage", "Food"],
      pace: "balanced",
      selectedStay,
      selectedExperiences
    });
    setItinerary(updated);
    setEditedTitle(updated.title);
    setHasUnsavedChanges(false);
  }, [initialDestParam, initialDaysParam, initialBudgetParam]);

  const handleGenerate = (formData) => {
    setIsGenerating(true);
    setTimeout(() => {
      const newPlan = generateItinerary(formData);
      setItinerary(newPlan);
      setEditedTitle(newPlan.title);
      setIsGenerating(false);
      setHasUnsavedChanges(true);
      showToast("Generated customized day-by-day itinerary!", "success");

      const el = document.getElementById("itinerary-results-anchor");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  const handleReplaceActivity = (dayNumber, slotKey, newItem) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            [slotKey]: newItem,
          };
        }
        return d;
      });
      setHasUnsavedChanges(true);
      showToast(`Updated Day ${dayNumber} ${slotKey} activity`, "info");
      return {
        ...prev,
        days: updatedDays,
      };
    });
  };

  const handleRemoveActivity = (dayNumber, slotKey) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          return {
            ...d,
            [slotKey]: {
              id: `leisure-${Date.now()}`,
              name: "Free Leisure & Unscheduled Exploration",
              category: "Relaxation",
              duration: "2 hours",
              cost: 0,
              description: "Open time slot. Browse quiet market lanes, enjoy a veranda beverage, or take an unhurried siesta.",
              isFreeTime: true,
            },
          };
        }
        return d;
      });
      setHasUnsavedChanges(true);
      showToast(`Set Day ${dayNumber} ${slotKey} to free leisure time`, "info");
      return {
        ...prev,
        days: updatedDays,
      };
    });
  };

  // Move slots Up or Down within a day
  const handleMoveSlot = (dayNumber, slotKey, direction) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const order = ["morning", "afternoon", "evening"];
      const currentIndex = order.indexOf(slotKey);
      const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

      if (targetIndex < 0 || targetIndex >= order.length) return prev;

      const targetSlotKey = order[targetIndex];

      const updatedDays = prev.days.map((d) => {
        if (d.dayNumber === dayNumber) {
          const currentItem = d[slotKey];
          const targetItem = d[targetSlotKey];
          return {
            ...d,
            [slotKey]: targetItem,
            [targetSlotKey]: currentItem
          };
        }
        return d;
      });

      setHasUnsavedChanges(true);
      showToast(`Swapped Day ${dayNumber} ${slotKey} and ${targetSlotKey} activities`, "info");
      return {
        ...prev,
        days: updatedDays
      };
    });
  };

  const handleUpdateDayNote = (dayNumber, noteText) => {
    setItinerary((prev) => {
      if (!prev) return prev;
      const updatedDays = prev.days.map((d) =>
        d.dayNumber === dayNumber ? { ...d, note: noteText } : d
      );
      setHasUnsavedChanges(true);
      return {
        ...prev,
        days: updatedDays
      };
    });
  };

  const handleUpdateChecklist = (newChecklist) => {
    setItinerary((prev) => ({
      ...prev,
      checklist: newChecklist
    }));
    setHasUnsavedChanges(true);
  };

  // Budget calculations
  const budgetBreakdown = useMemo(() => {
    if (!itinerary) return null;
    const dest = destinations.find((d) => d.slug === itinerary.destinationSlug);
    return calculateBudgetBreakdown({
      days: itinerary.daysCount,
      travelers: itinerary.travelersCount,
      totalBudget: itinerary.budget,
      stay: itinerary.selectedStay || selectedStay,
      selectedExperiences: itinerary.selectedExperiences || selectedExperiences,
      itineraryDays: itinerary.days,
      destination: dest,
    });
  }, [itinerary, selectedStay, selectedExperiences]);

  // Optimization handlers
  const handleApplyStayOptimization = (cheaperStay) => {
    selectStayForTrip(cheaperStay);
    setItinerary(prev => ({
      ...prev,
      selectedStay: cheaperStay
    }));
    setHasUnsavedChanges(true);
    showToast(`Applied ${cheaperStay.name} to reduce hotel budget!`, "success");
  };

  const handleApplyActivityOptimization = (dayNumber, slotKey, newItem) => {
    handleReplaceActivity(dayNumber, slotKey, newItem);
  };

  // Save actions
  const isTripAlreadySaved = savedTrips.some(t => t.id === itinerary?.id);

  const handleSaveItinerary = (asNew = false) => {
    if (!itinerary) return;
    saveTrip(itinerary, asNew);
    setHasUnsavedChanges(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveRename = () => {
    if (!editedTitle.trim()) return;
    setItinerary((prev) => ({ ...prev, title: editedTitle.trim() }));
    setIsRenameModalOpen(false);
    setHasUnsavedChanges(true);
    showToast("Renamed itinerary title", "success");
  };

  // Destination Mismatch Detection
  const hasStayMismatch = selectedStay && selectedStay.destinationSlug !== itinerary?.destinationSlug;
  const mismatchedExperiences = selectedExperiences.filter(e => e.destinationSlug !== itinerary?.destinationSlug);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Editorial Header */}
      <div className="border-b border-theme-border pb-6 space-y-3 no-print">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Intelligent Travel Synthesis (Demo Planner)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-theme-text">
          Smart Travel Itinerary Planner
        </h1>
        <p className="text-sm text-theme-text-muted max-w-2xl leading-relaxed">
          Powered by transparent, rule-based algorithmic planning and verified regional Indian data. Build realistic itineraries that reflect true room tariffs, meals, and local transit.
        </p>

        {/* Destination Mismatch Alert Banner if any attached items differ */}
        {(hasStayMismatch || mismatchedExperiences.length > 0) && (
          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-900 text-xs flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold block">Destination Alignment Note:</span>
              <p>
                {hasStayMismatch && `Selected stay "${selectedStay.name}" belongs to ${selectedStay.destinationSlug.toUpperCase()}, which differs from current plan (${itinerary?.destinationName}). `}
                {mismatchedExperiences.length > 0 && `${mismatchedExperiences.length} selected experience(s) are located in other regions.`}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* 1. PLANNER FORM */}
      <div className="no-print">
        <PlannerForm
          initialDestination={initialDestParam}
          initialDays={initialDaysParam}
          initialBudget={initialBudgetParam}
          selectedStay={selectedStay}
          clearSelectedStay={clearSelectedStay}
          selectedExperiences={selectedExperiences}
          removeExperience={removeExperienceFromTrip}
          onGenerate={handleGenerate}
          isGenerating={isGenerating}
        />
      </div>

      <div id="itinerary-results-anchor" />

      {/* 2. ITINERARY RESULTS & TOOLBAR */}
      {itinerary && (
        <div className="space-y-8 itinerary-print-container">
          
          {/* Action Toolbar */}
          <div className="p-4 sm:p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-theme-text">
                  {itinerary.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setIsRenameModalOpen(true)}
                  className="p-1.5 text-theme-text-muted hover:text-theme-text rounded-lg hover:bg-theme-bg transition-colors no-print cursor-pointer"
                  title="Rename Itinerary"
                  aria-label="Rename trip"
                >
                  <Edit3 className="w-4 h-4" />
                </button>

                {hasUnsavedChanges && (
                  <span className="no-print px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-500/20 text-amber-800 border border-amber-400/40 animate-pulse">
                    Unsaved Changes
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs text-theme-text-muted">
                <span>{itinerary.daysCount} Days</span>
                <span>•</span>
                <span>{itinerary.travelersCount} Traveller(s)</span>
                <span>•</span>
                <span className="capitalize">{itinerary.pace} Pace</span>
                <span>•</span>
                <span>Destination: <strong>{itinerary.destinationName}</strong></span>
              </div>
            </div>

            {/* Actions: Save, Update, Print */}
            <div className="flex flex-wrap items-center gap-2.5 no-print">
              {isTripAlreadySaved ? (
                <>
                  <Button
                    onClick={() => handleSaveItinerary(false)}
                    variant="primary"
                    size="sm"
                    icon={Save}
                  >
                    Update Saved Trip
                  </Button>
                  <Button
                    onClick={() => handleSaveItinerary(true)}
                    variant="secondary"
                    size="sm"
                    icon={Copy}
                  >
                    Save as Copy
                  </Button>
                </>
              ) : (
                <Button
                  onClick={() => handleSaveItinerary(false)}
                  variant="primary"
                  size="sm"
                  icon={Bookmark}
                >
                  Save Itinerary
                </Button>
              )}

              <Button
                onClick={handlePrint}
                variant="secondary"
                size="sm"
                icon={Printer}
              >
                Print / Save as PDF
              </Button>
            </div>

          </div>

          {/* Section Tabs: Day-by-Day Schedule vs Trip Checklist */}
          <div className="flex border-b border-theme-border gap-6 text-sm font-semibold no-print">
            <button
              type="button"
              onClick={() => setActiveTab("schedule")}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "schedule"
                  ? "border-theme-primary text-theme-primary"
                  : "border-transparent text-theme-text-muted hover:text-theme-text"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Day-by-Day Schedule</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("checklist")}
              className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
                activeTab === "checklist"
                  ? "border-theme-primary text-theme-primary"
                  : "border-transparent text-theme-text-muted hover:text-theme-text"
              }`}
            >
              <Luggage className="w-4 h-4" />
              <span>Packing & Essentials Checklist</span>
            </button>
          </div>

          {/* TAB 1: SCHEDULE */}
          {activeTab === "schedule" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Days Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center justify-between pb-2">
                  <h3 className="text-lg font-serif font-bold text-theme-text">
                    Daily Schedule & Activities
                  </h3>
                  <span className="text-xs text-theme-text-muted no-print">
                    Use Up/Down arrows to reorder slots or pencil to add notes
                  </span>
                </div>

                {itinerary.days.map((day) => (
                  <ItineraryDay
                    key={day.dayNumber}
                    day={day}
                    destinationSlug={itinerary.destinationSlug}
                    onReplaceActivity={handleReplaceActivity}
                    onRemoveActivity={handleRemoveActivity}
                    onMoveSlot={handleMoveSlot}
                    onUpdateDayNote={handleUpdateDayNote}
                  />
                ))}
              </div>

              {/* Budget Summary Column */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                <BudgetSummary 
                  budgetCalculation={budgetBreakdown} 
                  onOpenBudgetOptimizer={() => setIsOptimizerModalOpen(true)}
                />
              </div>

            </div>
          )}

          {/* TAB 2: PACKING CHECKLIST */}
          {activeTab === "checklist" && (
            <div className="max-w-4xl mx-auto">
              <TripChecklist
                checklist={itinerary.checklist || createInitialChecklist()}
                onUpdateChecklist={handleUpdateChecklist}
              />
            </div>
          )}

        </div>
      )}

      {/* Rename Modal */}
      <Modal
        isOpen={isRenameModalOpen}
        onClose={() => setIsRenameModalOpen(false)}
        title="Rename Your Trip Itinerary"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted mb-1">
              Itinerary Title
            </label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-sm font-serif font-semibold text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
              placeholder="e.g. Rajasthan Royal Winter Holiday"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button
              onClick={() => setIsRenameModalOpen(false)}
              variant="secondary"
              size="sm"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveRename}
              variant="primary"
              size="sm"
            >
              Save Title
            </Button>
          </div>
        </div>
      </Modal>

      {/* Budget Optimizer Modal */}
      <BudgetOptimizerModal
        isOpen={isOptimizerModalOpen}
        onClose={() => setIsOptimizerModalOpen(false)}
        itinerary={itinerary}
        budgetCalculation={budgetBreakdown}
        onApplyStayChange={handleApplyStayOptimization}
        onApplyActivityChange={handleApplyActivityOptimization}
      />

    </div>
  );
}
export default TripPlanner;
