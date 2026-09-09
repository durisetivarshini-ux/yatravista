import React, { useState, useEffect, useRef } from "react";
import { 
  MapPin, 
  Search, 
  ChevronDown, 
  X, 
  Compass, 
  Landmark, 
  Check, 
  Layers,
  Sparkles
} from "lucide-react";
import { statesAndUTs } from "../../data/statesAndUTs";
import { destinations } from "../../data/destinations";

/**
 * Accessible 3-Level Hierarchical Location Selector
 * State / UT -> Destination -> Attraction / Theme
 * Replaces monolithic single dropdowns with clean, searchable selection flow.
 */
export default function LocationHierarchySelector({
  selectedState = "",
  selectedDestination = "",
  selectedAttraction = "",
  searchQuery = "",
  onStateChange = () => {},
  onDestinationChange = () => {},
  onAttractionChange = () => {},
  onSearchChange = () => {},
  onReset = () => {},
  showAttractionFilter = false,
  showSearchInput = true,
  compact = false,
  className = ""
}) {
  const [stateOpen, setStateOpen] = useState(false);
  const [destOpen, setDestOpen] = useState(false);
  const [stateSearch, setStateSearch] = useState("");
  const [destSearch, setDestSearch] = useState("");

  const stateRef = useRef(null);
  const destRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (stateRef.current && !stateRef.current.contains(e.target)) {
        setStateOpen(false);
      }
      if (destRef.current && !destRef.current.contains(e.target)) {
        setDestOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Filtered States
  const filteredStates = statesAndUTs.filter(
    (s) =>
      s.name.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.zone.toLowerCase().includes(stateSearch.toLowerCase()) ||
      s.capital.toLowerCase().includes(stateSearch.toLowerCase())
  );

  // Filtered Destinations based on selected state
  const availableDestinations = destinations.filter((d) => {
    if (!selectedState) return true;
    return d.state.toLowerCase() === selectedState.toLowerCase();
  });

  const filteredDestinations = availableDestinations.filter((d) =>
    d.name.toLowerCase().includes(destSearch.toLowerCase())
  );

  // Selected state object
  const currentStateObj = statesAndUTs.find(
    (s) => s.name.toLowerCase() === selectedState.toLowerCase()
  );

  // Selected destination object
  const currentDestObj = destinations.find(
    (d) => d.slug === selectedDestination || d.name.toLowerCase() === selectedDestination.toLowerCase()
  );

  // Available attractions in the chosen destination
  const availableAttractions = currentDestObj?.attractions || [];

  const handleSelectState = (stateName) => {
    if (selectedState === stateName) {
      onStateChange("");
    } else {
      onStateChange(stateName);
      // Auto-clear incompatible destination and attraction
      onDestinationChange("");
      onAttractionChange("");
    }
    setStateOpen(false);
    setStateSearch("");
  };

  const handleSelectDest = (destSlug) => {
    if (selectedDestination === destSlug) {
      onDestinationChange("");
    } else {
      onDestinationChange(destSlug);
      onAttractionChange("");
    }
    setDestOpen(false);
    setDestSearch("");
  };

  const isFiltered = Boolean(selectedState || selectedDestination || selectedAttraction || searchQuery);

  return (
    <div className={`w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl shadow-sm p-3 md:p-4 transition-all ${className}`}>
      {/* Top Search / Filter Bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-2.5 items-center">
        
        {/* Global Keyword Search */}
        {showSearchInput && (
          <div className={`${showAttractionFilter ? 'md:col-span-4' : 'md:col-span-5'} relative`}>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              Search Pan-India
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search states, cities, temples, crafts..."
                className="w-full pl-9 pr-8 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100 placeholder-stone-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-0.5"
                  title="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Level 1: State / UT Combobox */}
        <div className={`${showSearchInput ? (showAttractionFilter ? 'md:col-span-3' : 'md:col-span-3') : 'md:col-span-6'} relative`} ref={stateRef}>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center justify-between">
            <span>1. State / Union Territory</span>
            {selectedState && (
              <span className="text-[9px] text-amber-700 dark:text-amber-400 font-semibold">Active</span>
            )}
          </label>
          
          <button
            type="button"
            onClick={() => setStateOpen(!stateOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800/80 border rounded-xl text-left transition-all ${
              selectedState
                ? "border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20 text-stone-900 dark:text-white font-medium"
                : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300"
            }`}
            aria-expanded={stateOpen}
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className={`w-3.5 h-3.5 shrink-0 ${selectedState ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
              <span className="truncate">{selectedState || "All 28 States & 8 UTs"}</span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${stateOpen ? "rotate-180" : ""}`} />
          </button>

          {/* State Dropdown Popover */}
          {stateOpen && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={stateSearch}
                    onChange={(e) => setStateSearch(e.target.value)}
                    placeholder="Filter by state or zone..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-1 text-xs space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectState("")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    !selectedState ? "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 font-semibold" : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                  }`}
                >
                  <span>All States & UTs (Pan-India)</span>
                  {!selectedState && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>

                {filteredStates.map((state) => (
                  <button
                    key={state.id}
                    type="button"
                    onClick={() => handleSelectState(state.name)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedState.toLowerCase() === state.name.toLowerCase()
                        ? "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 font-semibold"
                        : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium truncate">{state.name}</div>
                      <div className="text-[10px] text-stone-400">{state.type} • {state.zone} Zone</div>
                    </div>
                    {selectedState.toLowerCase() === state.name.toLowerCase() && (
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Level 2: Destination Combobox (Filtered by Selected State) */}
        <div className={`${showSearchInput ? (showAttractionFilter ? 'md:col-span-3' : 'md:col-span-3') : 'md:col-span-6'} relative`} ref={destRef}>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1 flex items-center justify-between">
            <span>2. Destination City</span>
            <span className="text-[9px] text-stone-400">
              {availableDestinations.length} available
            </span>
          </label>
          
          <button
            type="button"
            onClick={() => setDestOpen(!destOpen)}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800/80 border rounded-xl text-left transition-all ${
              selectedDestination
                ? "border-amber-500/60 bg-amber-50/40 dark:bg-amber-950/20 text-stone-900 dark:text-white font-medium"
                : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-300"
            }`}
            aria-expanded={destOpen}
          >
            <div className="flex items-center gap-2 truncate">
              <Compass className={`w-3.5 h-3.5 shrink-0 ${selectedDestination ? 'text-amber-600 dark:text-amber-400' : 'text-stone-400'}`} />
              <span className="truncate">
                {currentDestObj ? `${currentDestObj.name}, ${currentDestObj.state}` : "All Destinations"}
              </span>
            </div>
            <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${destOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Destination Dropdown Popover */}
          {destOpen && (
            <div className="absolute z-50 left-0 right-0 mt-1.5 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 rounded-xl shadow-xl max-h-72 flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="p-2 border-b border-stone-100 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-800/50">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={destSearch}
                    onChange={(e) => setDestSearch(e.target.value)}
                    placeholder="Search destination city..."
                    className="w-full pl-8 pr-3 py-1.5 text-xs bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                    autoFocus
                  />
                </div>
              </div>

              <div className="overflow-y-auto p-1 text-xs space-y-0.5">
                <button
                  type="button"
                  onClick={() => handleSelectDest("")}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                    !selectedDestination ? "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 font-semibold" : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                  }`}
                >
                  <span>All Destinations in {selectedState || 'India'}</span>
                  {!selectedDestination && <Check className="w-3.5 h-3.5 text-amber-600" />}
                </button>

                {filteredDestinations.map((dest) => (
                  <button
                    key={dest.id}
                    type="button"
                    onClick={() => handleSelectDest(dest.slug)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                      selectedDestination === dest.slug
                        ? "bg-amber-100/70 dark:bg-amber-900/30 text-amber-900 dark:text-amber-300 font-semibold"
                        : "hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-200"
                    }`}
                  >
                    <div className="truncate pr-2">
                      <div className="font-medium truncate">{dest.name}</div>
                      <div className="text-[10px] text-stone-400">{dest.state} • {dest.attractions?.length || 0} Places</div>
                    </div>
                    {selectedDestination === dest.slug && (
                      <Check className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    )}
                  </button>
                ))}

                {filteredDestinations.length === 0 && (
                  <div className="p-3 text-center text-stone-400 text-xs">
                    No destinations match your search.
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Level 3: Attraction / Specific Place (Optional) */}
        {showAttractionFilter && (
          <div className="md:col-span-2 relative">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-1">
              3. Attraction
            </label>
            <select
              value={selectedAttraction}
              onChange={(e) => onAttractionChange(e.target.value)}
              disabled={!currentDestObj || availableAttractions.length === 0}
              className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <option value="">All Places ({availableAttractions.length})</option>
              {availableAttractions.map((att, i) => (
                <option key={i} value={att.name}>
                  {att.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Reset Filters / Clear Action */}
        <div className="md:col-span-1 flex justify-end">
          {isFiltered && (
            <button
              type="button"
              onClick={onReset}
              className="px-2.5 py-1.5 text-xs text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40 rounded-lg font-medium flex items-center gap-1 transition-colors"
              title="Reset all filters"
            >
              <X className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>
          )}
        </div>

      </div>

      {/* Breadcrumb Hierarchy Indicator */}
      {(selectedState || selectedDestination || selectedAttraction) && (
        <div className="mt-2.5 pt-2 border-t border-stone-100 dark:border-stone-800/60 flex items-center flex-wrap gap-1.5 text-[11px] text-stone-500 dark:text-stone-400">
          <span className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1">
            <Layers className="w-3 h-3 text-amber-600" /> Hierarchy:
          </span>
          <span className="bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded text-stone-700 dark:text-stone-300">
            India (All 36 States & UTs)
          </span>
          {selectedState && (
            <>
              <span className="text-stone-300 dark:text-stone-600">›</span>
              <span className="bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-medium px-2 py-0.5 rounded flex items-center gap-1">
                {selectedState}
                <button
                  type="button"
                  onClick={() => handleSelectState("")}
                  className="hover:text-amber-950 dark:hover:text-amber-100"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            </>
          )}
          {currentDestObj && (
            <>
              <span className="text-stone-300 dark:text-stone-600">›</span>
              <span className="bg-amber-100/70 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 font-medium px-2 py-0.5 rounded flex items-center gap-1">
                {currentDestObj.name}
                <button
                  type="button"
                  onClick={() => handleSelectDest("")}
                  className="hover:text-amber-950 dark:hover:text-amber-100"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            </>
          )}
          {selectedAttraction && (
            <>
              <span className="text-stone-300 dark:text-stone-600">›</span>
              <span className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-900 dark:text-emerald-300 font-medium px-2 py-0.5 rounded flex items-center gap-1">
                {selectedAttraction}
                <button
                  type="button"
                  onClick={() => onAttractionChange("")}
                  className="hover:text-emerald-950"
                >
                  <X className="w-2.5 h-2.5" />
                </button>
              </span>
            </>
          )}
        </div>
      )}
    </div>
  );
}
