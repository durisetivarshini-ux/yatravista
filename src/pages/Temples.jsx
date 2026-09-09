import React, { useState } from "react";
import { 
  Landmark, 
  Sparkles, 
  Search, 
  MapPin, 
  ShieldCheck, 
  Info, 
  Compass, 
  Sun,
  Layers,
  Check,
  X
} from "lucide-react";
import { templesData } from "../data/temples";
import { statesAndUTs } from "../data/statesAndUTs";
import TempleCard from "../components/temples/TempleCard";
import LocationHierarchySelector from "../components/ui/LocationHierarchySelector";

export default function Temples() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCircuit, setSelectedCircuit] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const circuits = [
    "All",
    "12 Jyotirlingas",
    "All India Char Dham",
    "Divya Desams",
    "Shakti Peethas",
    "Coastal Karnataka",
    "South Indian Sacred Pilgrimage"
  ];

  // Filtered Temples
  const filteredTemples = templesData.filter((t) => {
    // State match
    if (selectedState && t.state.toLowerCase() !== selectedState.toLowerCase()) {
      return false;
    }

    // Circuit match
    if (selectedCircuit !== "All") {
      if (!t.circuit?.toLowerCase().includes(selectedCircuit.toLowerCase())) {
        return false;
      }
    }

    // Search query match across name, deity, tradition, city
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = t.name.toLowerCase().includes(q) || t.commonName?.toLowerCase().includes(q);
      const matchDeity = t.deity?.toLowerCase().includes(q);
      const matchCity = t.destination?.toLowerCase().includes(q);
      const matchState = t.state?.toLowerCase().includes(q);
      const matchTradition = t.tradition?.toLowerCase().includes(q);
      if (!matchName && !matchDeity && !matchCity && !matchState && !matchTradition) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Page Header Banner */}
        <div className="relative rounded-3xl overflow-hidden bg-stone-900 text-white p-8 md:p-12 shadow-xl border border-stone-800">
          <img
            src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80"
            alt="Sacred Indian Temples"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent" />

          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sacred India & Pilgrimage Guide</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
              Temples & Spiritual Journeys
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Explore India’s ancient sacred abodes, Jyotirlingas, Shakti Peethas, and Divya Desams with verified visitor etiquette, dress codes, verified official administration portals, and directions.
            </p>

            {/* Official Darshan Safety Notice */}
            <div className="pt-2 flex items-center gap-2 text-[11px] text-amber-200/90 bg-black/40 px-3 py-2 rounded-xl border border-amber-500/20 backdrop-blur-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Official Information Guarantee:</strong> YatraVista does not charge for darshan tickets. All sevas and passes are redirected to official state Devasthanam and temple trust portals.
              </span>
            </div>
          </div>
        </div>

        {/* Hierarchical Search & Filters */}
        <div className="space-y-3">
          <LocationHierarchySelector
            selectedState={selectedState}
            onStateChange={setSelectedState}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onReset={() => {
              setSelectedState("");
              setSelectedCircuit("All");
              setSearchQuery("");
            }}
            showAttractionFilter={false}
          />

          {/* Pilgrimage Circuit Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <span className="text-stone-400 font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1">
              Circuit:
            </span>
            {circuits.map((circ) => (
              <button
                key={circ}
                type="button"
                onClick={() => setSelectedCircuit(circ)}
                className={`px-3 py-1.5 rounded-xl font-medium shrink-0 transition-all ${
                  selectedCircuit === circ
                    ? "bg-amber-600 text-white shadow-sm"
                    : "bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
                }`}
              >
                {circ}
              </button>
            ))}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>
            Showing <strong>{filteredTemples.length}</strong> sacred shrines & pilgrimage sites
          </span>
          {(selectedState || selectedCircuit !== "All" || searchQuery) && (
            <button
              type="button"
              onClick={() => {
                setSelectedState("");
                setSelectedCircuit("All");
                setSearchQuery("");
              }}
              className="text-amber-700 dark:text-amber-400 font-semibold hover:underline"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Temples Grid */}
        {filteredTemples.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center text-stone-400 space-y-3">
            <Landmark className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
            <p className="text-base font-medium text-stone-600 dark:text-stone-300">
              No spiritual destinations match your active filters.
            </p>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Try selecting a different State/UT or reset your search keywords.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedState("");
                setSelectedCircuit("All");
                setSearchQuery("");
              }}
              className="px-4 py-2 bg-amber-600 text-white rounded-xl text-xs font-semibold"
            >
              Show All Sacred Temples
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
