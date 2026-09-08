import React, { createContext, useContext, useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { createInitialChecklist } from "../data/defaultChecklist";
import confetti from "canvas-confetti";

const TripContext = createContext();

export function TripProvider({ children }) {
  // Saved destinations list (array of slugs)
  const [savedDestinations, setSavedDestinations] = useLocalStorage("yatravista_saved_destinations", ["jaipur", "munnar"]);

  // Raw saved generated itineraries
  const [rawSavedTrips, setRawSavedTrips] = useLocalStorage("yatravista_saved_trips", []);

  // Ensure stored trips conform to schema version 2 (with checklists)
  const [savedTrips, setSavedTripsState] = useState(() => {
    return (rawSavedTrips || []).map(trip => ({
      ...trip,
      checklist: Array.isArray(trip.checklist) && trip.checklist.length > 0 
        ? trip.checklist 
        : createInitialChecklist(),
      days: (trip.days || []).map(d => ({
        ...d,
        note: d.note || ""
      }))
    }));
  });

  const setSavedTrips = (updater) => {
    setSavedTripsState(prev => {
      const nextVal = typeof updater === "function" ? updater(prev) : updater;
      setRawSavedTrips(nextVal);
      return nextVal;
    });
  };

  // Sync state if rawSavedTrips changes outside
  useEffect(() => {
    if (rawSavedTrips && rawSavedTrips.length !== savedTrips.length) {
      setSavedTripsState(rawSavedTrips.map(trip => ({
        ...trip,
        checklist: Array.isArray(trip.checklist) ? trip.checklist : createInitialChecklist()
      })));
    }
  }, [rawSavedTrips]);

  // Destination comparison list (up to 3 destinations)
  const [comparedDestinations, setComparedDestinations] = useState([]);

  // Stays selected for comparison (maximum 3)
  const [comparedStays, setComparedStays] = useState([]);

  // Currently selected stay for the trip planner
  const [selectedStay, setSelectedStay] = useState(null);

  // Selected local experiences for the trip planner
  const [selectedExperiences, setSelectedExperiences] = useState([]);

  // Active working itinerary in the planner
  const [activeItinerary, setActiveItinerary] = useState(null);

  // Track undo deleted trip
  const [recentlyDeletedTrip, setRecentlyDeletedTrip] = useState(null);

  // Feedback toast message
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success", action = null) => {
    setToast({ message, type, action, id: Date.now() });
    setTimeout(() => {
      setToast(prev => (prev?.message === message ? null : prev));
    }, action ? 6500 : 3800);
  };

  // 1. DESTINATION WISHLIST
  const toggleSaveDestination = (slug, destinationName = "Destination") => {
    setSavedDestinations((prev) => {
      const exists = prev.includes(slug);
      if (exists) {
        showToast(`Removed "${destinationName}" from saved destinations`, "info");
        return prev.filter((item) => item !== slug);
      } else {
        showToast(`Saved "${destinationName}" to your wishlist!`, "success");
        try {
          confetti({
            particleCount: 30,
            spread: 50,
            origin: { y: 0.8 },
            colors: ['#1C3B2B', '#C59A45', '#E06D53']
          });
        } catch (_) {}
        return [...prev, slug];
      }
    });
  };

  const isDestinationSaved = (slug) => savedDestinations.includes(slug);

  // 2. DESTINATION COMPARISON
  const toggleCompareDestination = (destination) => {
    setComparedDestinations((prev) => {
      const exists = prev.some((d) => d.slug === destination.slug);
      if (exists) {
        showToast(`Removed "${destination.name}" from comparison`, "info");
        return prev.filter((d) => d.slug !== destination.slug);
      }
      if (prev.length >= 3) {
        showToast("You can compare up to 3 destinations at once.", "warning");
        return prev;
      }
      showToast(`Added "${destination.name}" to comparison (${prev.length + 1}/3)`, "success");
      return [...prev, destination];
    });
  };

  const removeComparedDestination = (slug) => {
    setComparedDestinations((prev) => prev.filter((d) => d.slug !== slug));
  };

  const clearComparedDestinations = () => {
    setComparedDestinations([]);
    showToast("Cleared destination comparison list", "info");
  };

  // 3. SAVED TRIPS CRUD & UTILITIES
  const saveTrip = (itinerary, isNew = false) => {
    if (!itinerary) return;

    const enrichedItinerary = {
      ...itinerary,
      checklist: Array.isArray(itinerary.checklist) && itinerary.checklist.length > 0 
        ? itinerary.checklist 
        : createInitialChecklist(),
      version: 2
    };
    
    setSavedTrips((prev) => {
      const existingIdx = prev.findIndex((t) => t.id === itinerary.id);
      let updated;
      if (existingIdx >= 0 && !isNew) {
        updated = [...prev];
        updated[existingIdx] = { ...enrichedItinerary, updatedAt: new Date().toISOString() };
        showToast(`Updated itinerary "${itinerary.title}"`, "success");
      } else {
        const newTrip = {
          ...enrichedItinerary,
          id: isNew ? `itinerary-${itinerary.destinationSlug}-${Date.now()}` : itinerary.id,
          title: isNew ? `${itinerary.title} (Copy)` : itinerary.title,
          savedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        updated = [newTrip, ...prev];
        showToast(`Saved "${newTrip.title}" to your Saved Trips!`, "success");
        try {
          confetti({
            particleCount: 45,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#1C3B2B', '#C59A45', '#3A7D58']
          });
        } catch (_) {}
      }
      return updated;
    });
  };

  const deleteSavedTrip = (id) => {
    setSavedTrips((prev) => {
      const target = prev.find(t => t.id === id);
      if (target) {
        setRecentlyDeletedTrip(target);
      }
      const filtered = prev.filter((t) => t.id !== id);
      showToast(
        `Deleted itinerary "${target?.title || 'Trip'}"`, 
        "info", 
        { label: "Undo", onClick: () => undoDeleteTrip(target) }
      );
      return filtered;
    });
  };

  const undoDeleteTrip = (tripToRestore) => {
    const item = tripToRestore || recentlyDeletedTrip;
    if (!item) return;
    setSavedTrips((prev) => [item, ...prev]);
    setRecentlyDeletedTrip(null);
    showToast(`Restored "${item.title}"!`, "success");
  };

  const duplicateSavedTrip = (id) => {
    setSavedTrips((prev) => {
      const original = prev.find(t => t.id === id);
      if (!original) return prev;
      const duplicated = {
        ...original,
        id: `itinerary-${original.destinationSlug}-${Date.now()}`,
        title: `${original.title} (Duplicate)`,
        savedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      showToast(`Duplicated "${original.title}"`, "success");
      return [duplicated, ...prev];
    });
  };

  const renameSavedTrip = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setSavedTrips((prev) =>
      prev.map((trip) =>
        trip.id === id ? { ...trip, title: newTitle.trim(), updatedAt: new Date().toISOString() } : trip
      )
    );
    showToast(`Renamed trip to "${newTitle.trim()}"`, "success");
  };

  const updateTripChecklist = (tripId, newChecklist) => {
    setSavedTrips((prev) =>
      prev.map((trip) =>
        trip.id === tripId ? { ...trip, checklist: newChecklist, updatedAt: new Date().toISOString() } : trip
      )
    );
  };

  // 4. IMPORT JSON VALIDATION
  const importTrip = (tripData) => {
    try {
      if (!tripData || typeof tripData !== "object") {
        throw new Error("Invalid JSON structure");
      }
      if (!tripData.destinationSlug || !tripData.daysCount || !Array.isArray(tripData.days)) {
        throw new Error("Missing required itinerary fields (destinationSlug, daysCount, days)");
      }

      const cleanTrip = {
        ...tripData,
        id: `itinerary-${tripData.destinationSlug}-${Date.now()}`,
        title: String(tripData.title || "Imported Indian Itinerary").slice(0, 100),
        daysCount: Math.min(7, Math.max(1, Number(tripData.daysCount) || 3)),
        travelersCount: Math.min(10, Math.max(1, Number(tripData.travelersCount) || 2)),
        budget: Number(tripData.budget) || 35000,
        checklist: Array.isArray(tripData.checklist) && tripData.checklist.length > 0 
          ? tripData.checklist 
          : createInitialChecklist(),
        savedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        version: 2
      };

      setSavedTrips(prev => [cleanTrip, ...prev]);
      showToast(`Successfully imported "${cleanTrip.title}"!`, "success");
      return { success: true, trip: cleanTrip };
    } catch (err) {
      showToast(`Import failed: ${err.message}`, "warning");
      return { success: false, error: err.message };
    }
  };

  // 5. STAYS & EXPERIENCES SELECTION
  const selectStayForTrip = (stay) => {
    setSelectedStay(stay);
    showToast(`Selected "${stay.name}" for your trip planner!`, "success");
  };

  const clearSelectedStay = () => {
    setSelectedStay(null);
    showToast("Cleared selected stay", "info");
  };

  const addExperienceToTrip = (experience) => {
    setSelectedExperiences((prev) => {
      if (prev.some((e) => e.id === experience.id)) {
        showToast("Experience is already added to your planner", "info");
        return prev;
      }
      showToast(`Added "${experience.title}" to your trip!`, "success");
      return [...prev, experience];
    });
  };

  const removeExperienceFromTrip = (experienceId) => {
    setSelectedExperiences((prev) => prev.filter((e) => e.id !== experienceId));
    showToast("Removed experience from trip planner", "info");
  };

  const toggleCompareStay = (stay) => {
    setComparedStays((prev) => {
      const exists = prev.some((s) => s.id === stay.id);
      if (exists) {
        showToast(`Removed "${stay.name}" from comparison`, "info");
        return prev.filter((s) => s.id !== stay.id);
      }
      if (prev.length >= 3) {
        showToast("You can compare up to 3 properties at once. Remove one to add another.", "warning");
        return prev;
      }
      showToast(`Added "${stay.name}" to comparison (${prev.length + 1}/3)`, "success");
      return [...prev, stay];
    });
  };

  const removeComparedStay = (stayId) => {
    setComparedStays((prev) => prev.filter((s) => s.id !== stayId));
  };

  const clearComparedStays = () => {
    setComparedStays([]);
    showToast("Cleared comparison list", "info");
  };

  return (
    <TripContext.Provider
      value={{
        savedDestinations,
        toggleSaveDestination,
        isDestinationSaved,
        comparedDestinations,
        toggleCompareDestination,
        removeComparedDestination,
        clearComparedDestinations,
        savedTrips,
        saveTrip,
        deleteSavedTrip,
        undoDeleteTrip,
        duplicateSavedTrip,
        renameSavedTrip,
        updateTripChecklist,
        importTrip,
        selectedStay,
        selectStayForTrip,
        clearSelectedStay,
        selectedExperiences,
        addExperienceToTrip,
        removeExperienceFromTrip,
        comparedStays,
        toggleCompareStay,
        removeComparedStay,
        clearComparedStays,
        activeItinerary,
        setActiveItinerary,
        toast,
        showToast
      }}
    >
      {children}

      {/* Global Toast Notification */}
      {toast && (
        <div 
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3.5 px-5 py-3.5 rounded-2xl shadow-elevated bg-theme-surface border border-theme-border text-theme-text text-sm font-medium animate-bounce-short transition-all max-w-md"
        >
          <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${toast.type === "warning" ? "bg-amber-500" : toast.type === "info" ? "bg-blue-500" : "bg-emerald-600"}`}></span>
          <span className="flex-1">{toast.message}</span>
          {toast.action && (
            <button
              type="button"
              onClick={() => {
                toast.action.onClick();
                setToast(null);
              }}
              className="px-2.5 py-1 rounded-lg bg-theme-primary text-white text-xs font-bold hover:bg-theme-primary-hover transition-colors cursor-pointer"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      )}
    </TripContext.Provider>
  );
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) {
    throw new Error("useTrip must be used within a TripProvider");
  }
  return context;
}
export default TripProvider;
