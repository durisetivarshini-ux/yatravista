import React from "react";
import { Search, X, ArrowUpDown, Filter, RotateCcw, MapPin, Sparkles, Layers } from "lucide-react";
import { regions, travelInterestOptions } from "../../data/destinations";
import { statesAndUTs } from "../../data/statesAndUTs";

export function DestinationFilters({
  searchTerm,
  setSearchTerm,
  selectedState,
  setSelectedState,
  selectedRegion,
  setSelectedRegion,
  selectedInterest,
  setSelectedInterest,
  sortBy,
  setSortBy,
  onReset,
  totalResults
}) {
  const isFiltered = Boolean(
    (searchTerm && searchTerm.trim()) ||
    (selectedState && selectedState !== "All") ||
    (selectedRegion && selectedRegion !== "All") ||
    (selectedInterest && selectedInterest !== "All") ||
    (sortBy && sortBy !== "popular")
  );

  return (
    <div className="space-y-4">
      
      {/* Primary Compact Search Panel (Elevated Card) */}
      <div className="bg-theme-surface/95 backdrop-blur-md rounded-2xl border border-theme-border p-4 sm:p-5 shadow-elevated transition-all">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          
          {/* Keyword Search (Span 5) */}
          <div className="lg:col-span-5 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-subtle pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destination, state, or attraction..."
              className="w-full pl-10 pr-9 py-2.5 rounded-xl bg-theme-bg/80 border border-theme-border text-sm text-theme-text placeholder:text-theme-text-subtle focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all font-sans"
              aria-label="Search destinations, states, or attractions"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-theme-text-subtle hover:text-theme-text p-1 cursor-pointer"
                aria-label="Clear search input"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* State & Union Territory Dropdown (Span 3) */}
          <div className="lg:col-span-3 relative">
            <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-accent pointer-events-none" />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-theme-bg/80 border border-theme-border text-sm text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer font-medium appearance-none truncate"
              aria-label="Select State or Union Territory"
            >
              <option value="All">All States & UTs (36)</option>
              <optgroup label="States">
                {statesAndUTs.filter(s => s.type === 'State').map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </optgroup>
              <optgroup label="Union Territories">
                {statesAndUTs.filter(s => s.type === 'Union Territory').map((s) => (
                  <option key={s.id} value={s.name}>{s.name}</option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Travel Category / Theme Dropdown (Span 3) */}
          <div className="lg:col-span-3 relative">
            <Sparkles className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-accent pointer-events-none" />
            <select
              value={selectedInterest}
              onChange={(e) => setSelectedInterest(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 rounded-xl bg-theme-bg/80 border border-theme-border text-sm text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer font-medium appearance-none truncate"
              aria-label="Filter by travel interest"
            >
              {travelInterestOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt === "All" ? "All Travel Categories" : opt}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Search / Filter Status Button (Span 1) */}
          <div className="lg:col-span-1 flex items-center justify-end">
            <button
              type="button"
              onClick={() => {
                // Triggers visual feedback / keeps focused
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-theme-primary text-white text-xs font-semibold hover:bg-theme-primary-hover transition-all flex items-center justify-center gap-1.5 shadow-soft cursor-pointer"
              aria-label="Apply destination filters"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="lg:hidden">Search</span>
            </button>
          </div>

        </div>
      </div>

      {/* Secondary Compact Control Bar (Regions, Sorting, Results & Budget Note) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs bg-theme-surface/50 rounded-xl p-3 border border-theme-border/60">
        
        {/* Region Quick-Filter Pills */}
        <div className="flex items-center gap-1.5 flex-wrap overflow-x-auto py-0.5">
          <span className="font-semibold text-theme-text-muted flex items-center gap-1 mr-1 shrink-0">
            <Layers className="w-3 h-3 text-theme-primary" />
            <span>Region:</span>
          </span>
          {regions.map((region) => {
            const isActive = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? "bg-theme-primary text-white shadow-xs font-semibold"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text hover:bg-theme-tag"
                }`}
              >
                {region === "All" ? "All India" : region}
              </button>
            );
          })}
        </div>

        {/* Sort & Budget Note */}
        <div className="flex items-center gap-3 shrink-0 self-end md:self-auto flex-wrap sm:flex-nowrap">
          <span className="text-[11px] text-theme-text-muted italic hidden lg:inline">
            * Budgets are illustrative estimates.
          </span>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-theme-text-muted shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-2.5 py-1 rounded-lg bg-theme-bg border border-theme-border text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary cursor-pointer font-medium"
              aria-label="Sort destination results"
            >
              <option value="popular">Sort: Curated</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="budget-asc">Budget: Low to High</option>
              <option value="budget-desc">Budget: High to Low</option>
            </select>
          </div>
        </div>

      </div>

      {/* Applied Filter Chips Bar */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">
            Active:
          </span>

          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-theme-primary-light text-theme-primary font-medium">
              <span>Keyword: "{searchTerm}"</span>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="hover:text-theme-text cursor-pointer"
                aria-label="Remove keyword filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedState !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-theme-primary-light text-theme-primary font-medium">
              <span>State: {selectedState}</span>
              <button
                type="button"
                onClick={() => setSelectedState("All")}
                className="hover:text-theme-text cursor-pointer"
                aria-label="Remove state filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedRegion !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-theme-primary-light text-theme-primary font-medium">
              <span>Region: {selectedRegion}</span>
              <button
                type="button"
                onClick={() => setSelectedRegion("All")}
                className="hover:text-theme-text cursor-pointer"
                aria-label="Remove region filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedInterest !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-theme-primary-light text-theme-primary font-medium">
              <span>Category: {selectedInterest}</span>
              <button
                type="button"
                onClick={() => setSelectedInterest("All")}
                className="hover:text-theme-text cursor-pointer"
                aria-label="Remove category filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortBy !== "popular" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-theme-tag text-theme-text-muted font-medium">
              <span>Sort: {sortBy}</span>
              <button
                type="button"
                onClick={() => setSortBy("popular")}
                className="hover:text-theme-text cursor-pointer"
                aria-label="Reset sort order"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onReset}
            className="ml-auto inline-flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-semibold hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        </div>
      )}

      {/* Result Count and Status */}
      <div className="flex items-center justify-between text-xs text-theme-text-muted pt-1">
        <span>
          Showing <strong className="text-theme-text font-semibold">{totalResults}</strong> destination{totalResults === 1 ? "" : "s"} across India
        </span>
      </div>

    </div>
  );
}

export default DestinationFilters;
