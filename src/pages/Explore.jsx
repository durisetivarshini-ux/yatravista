import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Compass, Scale } from "lucide-react";
import { destinations } from "../data/destinations";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { DestinationFilters } from "../components/destinations/DestinationFilters";
import { DestinationComparison } from "../components/destinations/DestinationComparison";
import { EmptyState } from "../components/ui/EmptyState";
import { useTrip } from "../context/TripContext";

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comparedDestinations } = useTrip();

  const initialRegion = searchParams.get("region") || "All";
  const initialInterest = searchParams.get("interest") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "popular";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedInterest, setSelectedInterest] = useState(initialInterest);
  const [sortBy, setSortBy] = useState(initialSort);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Sync state changes back into URL params
  useEffect(() => {
    const params = {};
    if (searchTerm.trim()) params.q = searchTerm.trim();
    if (selectedRegion !== "All") params.region = selectedRegion;
    if (selectedInterest !== "All") params.interest = selectedInterest;
    if (sortBy !== "popular") params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedRegion, selectedInterest, sortBy, setSearchParams]);

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setSelectedRegion("All");
    setSelectedInterest("All");
    setSortBy("popular");
    setSearchParams({});
  };

  // Filter and sort logic
  const filteredDestinations = useMemo(() => {
    return destinations
      .filter((dest) => {
        // Search matching
        if (searchTerm.trim()) {
          const q = searchTerm.toLowerCase();
          const matchName = dest.name.toLowerCase().includes(q);
          const matchState = dest.state.toLowerCase().includes(q);
          const matchTagline = dest.tagline?.toLowerCase().includes(q);
          const matchDesc = dest.shortDescription?.toLowerCase().includes(q);
          if (!matchName && !matchState && !matchTagline && !matchDesc) {
            return false;
          }
        }

        // Region filter
        if (selectedRegion !== "All" && dest.region !== selectedRegion) {
          return false;
        }

        // Travel interest filter
        if (selectedInterest !== "All") {
          const hasInterest = dest.travelInterests?.some(
            (item) => item.toLowerCase() === selectedInterest.toLowerCase()
          );
          if (!hasInterest) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "name-asc") {
          return a.name.localeCompare(b.name);
        }
        if (sortBy === "budget-asc") {
          return a.dailyBudgetEstimate - b.dailyBudgetEstimate;
        }
        if (sortBy === "budget-desc") {
          return b.dailyBudgetEstimate - a.dailyBudgetEstimate;
        }
        return 0; // "popular" / curated default order
      });
  }, [searchTerm, selectedRegion, selectedInterest, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-theme-border pb-6 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Indian Destinations</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-theme-text">
              Explore the Wonders of India
            </h1>
            <p className="text-sm text-theme-text-muted max-w-2xl leading-relaxed">
              From tranquil backwaters and cloud-kissed spice ridges to thousand-year-old riverfronts. Filter by geography, theme, or sample daily budget to discover your next expedition.
            </p>
          </div>

          {/* Destination Comparison Trigger Button */}
          {comparedDestinations.length > 0 && (
            <button
              type="button"
              onClick={() => setIsComparisonOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary text-white text-xs font-semibold shadow-elevated hover:bg-theme-primary-hover transition-all cursor-pointer animate-bounce-short"
            >
              <Scale className="w-4 h-4 text-theme-accent" />
              <span>Compare Destinations ({comparedDestinations.length}/3)</span>
            </button>
          )}
        </div>

        <p className="text-[11px] text-theme-accent font-medium italic pt-2">
          * Note: Daily budgets shown are sample illustrative estimates covering standard lodging, meals, and local commuting.
        </p>
      </div>

      {/* Filter Component */}
      <DestinationFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        selectedInterest={selectedInterest}
        setSelectedInterest={setSelectedInterest}
        sortBy={sortBy}
        setSortBy={setSortBy}
        onReset={handleReset}
        totalResults={filteredDestinations.length}
      />

      {/* Grid of Results or Empty State */}
      {filteredDestinations.length === 0 ? (
        <EmptyState
          title="No destinations match your criteria"
          description="We couldn't find any curated destinations matching your active filters or search terms. Try clearing your filters."
          actionText="Reset All Filters"
          onActionClick={handleReset}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((dest) => (
            <DestinationCard 
              key={dest.slug} 
              destination={dest} 
              activeInterest={selectedInterest}
              activeRegion={selectedRegion}
            />
          ))}
        </div>
      )}

      {/* Destination Comparison Modal */}
      <DestinationComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

    </div>
  );
}
export default Explore;
