import React from "react";
import { Search, X, ArrowUpDown, Filter, RotateCcw } from "lucide-react";
import { regions, travelInterestOptions } from "../../data/destinations";

export function DestinationFilters({
  searchTerm,
  setSearchTerm,
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
    (selectedRegion && selectedRegion !== "All") || 
    (selectedInterest && selectedInterest !== "All") || 
    (sortBy && sortBy !== "popular")
  );

  return (
    <div className="bg-theme-surface rounded-2xl border border-theme-border p-6 shadow-sm mb-8 space-y-5">
      
      {/* Search Bar & Sort Row */}
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-subtle" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by city, state, or keywords (e.g. Jaipur, Kerala, Ghats)..."
            className="w-full pl-11 pr-10 py-3 rounded-xl bg-theme-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-subtle focus:outline-none focus:ring-2 focus:ring-theme-primary transition-all"
            aria-label="Search destinations"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-theme-text-subtle hover:text-theme-text p-1 cursor-pointer"
              aria-label="Clear search text"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-theme-text-muted shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3.5 py-3 rounded-xl bg-theme-bg border border-theme-border text-sm text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer font-medium"
            aria-label="Sort destinations"
          >
            <option value="popular">Sort: Featured & Curated</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="budget-asc">Sample Budget: Low to High</option>
            <option value="budget-desc">Sample Budget: High to Low</option>
          </select>
        </div>

      </div>

      {/* Region Filter Pills & Interest Dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-theme-border/60">
        
        {/* Regions */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted mr-1.5 flex items-center gap-1">
            <Filter className="w-3 h-3 text-theme-primary" />
            <span>Region:</span>
          </span>
          {regions.map((region) => {
            const isActive = selectedRegion === region;
            return (
              <button
                key={region}
                type="button"
                onClick={() => setSelectedRegion(region)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-theme-primary text-white shadow-xs"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text hover:bg-theme-tag"
                }`}
              >
                {region === "All" ? "All India" : `${region} India`}
              </button>
            );
          })}
        </div>

        {/* Travel Interests */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
            Theme:
          </span>
          <select
            value={selectedInterest}
            onChange={(e) => setSelectedInterest(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer font-medium"
            aria-label="Filter by travel interest"
          >
            {travelInterestOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt === "All" ? "All Travel Themes" : opt}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Applied Filter Chips Bar */}
      {isFiltered && (
        <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-theme-border/50 text-xs">
          <span className="text-[11px] font-semibold text-theme-text-muted uppercase tracking-wider">
            Active Filters:
          </span>

          {searchTerm && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-theme-primary-light text-theme-primary font-medium">
              <span>Keyword: "{searchTerm}"</span>
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="hover:text-theme-text"
                aria-label="Remove search keyword filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedRegion !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-theme-primary-light text-theme-primary font-medium">
              <span>Region: {selectedRegion}</span>
              <button
                type="button"
                onClick={() => setSelectedRegion("All")}
                className="hover:text-theme-text"
                aria-label="Remove region filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {selectedInterest !== "All" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-theme-primary-light text-theme-primary font-medium">
              <span>Theme: {selectedInterest}</span>
              <button
                type="button"
                onClick={() => setSelectedInterest("All")}
                className="hover:text-theme-text"
                aria-label="Remove theme filter"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}

          {sortBy !== "popular" && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-theme-tag text-theme-text-muted font-medium">
              <span>Sort: {sortBy}</span>
              <button
                type="button"
                onClick={() => setSortBy("popular")}
                className="hover:text-theme-text"
                aria-label="Reset sorting"
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
            <span>Clear all filters</span>
          </button>
        </div>
      )}

      {/* Result Count Status */}
      <div className="flex items-center justify-between text-xs text-theme-text-muted">
        <span>
          Showing <strong className="text-theme-text font-semibold">{totalResults}</strong> destination{totalResults === 1 ? "" : "s"}
        </span>
      </div>

    </div>
  );
}
export default DestinationFilters;
