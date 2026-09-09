import React, { useState, useMemo } from "react";
import { 
  BedDouble, 
  Scale, 
  Info 
} from "lucide-react";
import { stays, stayCategories } from "../data/stays";
import { StayCard } from "../components/stays/StayCard";
import { StayComparison } from "../components/stays/StayComparison";
import { EmptyState } from "../components/ui/EmptyState";
import { useTrip } from "../context/TripContext";
import LocationHierarchySelector from "../components/ui/LocationHierarchySelector";

export function Stays() {
  const { comparedStays } = useTrip();

  const [selectedState, setSelectedState] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedAmenity, setSelectedAmenity] = useState("All");
  const [sortBy, setSortBy] = useState("recommended");
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // All distinct amenities across properties
  const allAmenities = useMemo(() => {
    const list = Array.from(new Set(stays.flatMap((s) => s.amenities || [])));
    return ["All", ...list];
  }, []);

  const handleReset = () => {
    setSelectedState("");
    setSelectedDestination("All");
    setSearchQuery("");
    setSelectedCategory("All");
    setMaxPrice(10000);
    setSelectedAmenity("All");
    setSortBy("recommended");
  };

  const filteredStays = useMemo(() => {
    return stays
      .filter((stay) => {
        if (selectedState && stay.state?.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }
        if (selectedDestination !== "All" && stay.destinationSlug !== selectedDestination) {
          return false;
        }
        if (selectedCategory !== "All" && stay.category !== selectedCategory) {
          return false;
        }
        if (stay.pricePerNight > maxPrice) {
          return false;
        }
        if (selectedAmenity !== "All" && !stay.amenities?.includes(selectedAmenity)) {
          return false;
        }
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = stay.title.toLowerCase().includes(q);
          const matchLoc = stay.location?.toLowerCase().includes(q);
          const matchState = stay.state?.toLowerCase().includes(q);
          const matchDesc = stay.description?.toLowerCase().includes(q);
          if (!matchTitle && !matchLoc && !matchState && !matchDesc) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.pricePerNight - b.pricePerNight;
        if (sortBy === "price-desc") return b.pricePerNight - a.pricePerNight;
        if (sortBy === "rating-desc") return b.rating - a.rating;
        return 0; // recommended
      });
  }, [selectedDestination, selectedCategory, maxPrice, selectedAmenity, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header with Demo Disclosure */}
      <div className="border-b border-theme-border pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
              <BedDouble className="w-3.5 h-3.5" />
              <span>Demonstration Accommodations Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-theme-text">
              Authentic Stays Across India
            </h1>
            <p className="text-sm text-theme-text-muted max-w-2xl">
              Compare restored royal havelis, family-run spice homestays, and eco-resorts. Select a stay to attach its real room capacity and pricing directly to your itinerary budget.
            </p>
          </div>

          {/* Comparison Trigger Pill */}
          {comparedStays.length > 0 && (
            <button
              type="button"
              onClick={() => setIsComparisonOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-theme-primary text-white text-xs font-semibold shadow-elevated hover:bg-theme-primary-hover transition-all animate-bounce-short"
            >
              <Scale className="w-4 h-4 text-theme-accent" />
              <span>Compare Properties ({comparedStays.length}/3)</span>
            </button>
          )}
        </div>

        {/* Demo Notice Banner */}
        <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-900 text-xs flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Demonstration Data:</strong> Room rates, property names, and availability are illustrative samples created for the Smart India Hackathon prototype. The "Add to Trip" button attaches the property's pricing to your planner without booking or processing financial transactions.
          </span>
        </div>
      </div>

      {/* Hierarchical Location Filter */}
      <LocationHierarchySelector
        selectedState={selectedState}
        selectedDestination={selectedDestination === "All" ? "" : selectedDestination}
        onStateChange={(state) => {
          setSelectedState(state);
          setSelectedDestination("All");
        }}
        onDestinationChange={(slug) => {
          setSelectedDestination(slug || "All");
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={handleReset}
        showAttractionFilter={false}
      />

      {/* Property Specific Filters (Category, Price Slider, Amenity, Sorting) */}
      <div className="bg-theme-surface rounded-2xl border border-theme-border p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
          
          {/* Property Category */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
              Property Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-medium text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
            >
              {stayCategories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="space-y-1">
            <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
              <span>Max Nightly Rate</span>
              <span className="text-theme-primary font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min="2000"
              max="15000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-theme-primary cursor-pointer mt-2"
            />
          </div>

          {/* Amenity Filter */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
              Key Amenity
            </label>
            <select
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-medium text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
            >
              {allAmenities.map((a) => (
                <option key={a} value={a}>
                  {a === "All" ? "All Amenities" : a}
                </option>
              ))}
            </select>
          </div>

          {/* Sort By */}
          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
              Sort Results
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-medium text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
            >
              <option value="recommended">Recommended & Curated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Guest Rating: Highest First</option>
            </select>
          </div>

        </div>

        {/* Amenity Filter & Count */}
        <div className="pt-4 border-t border-theme-border/60 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold uppercase tracking-wider text-theme-text-muted">
              Key Amenity:
            </span>
            <select
              value={selectedAmenity}
              onChange={(e) => setSelectedAmenity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text cursor-pointer"
            >
              {allAmenities.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-4 text-theme-text-muted">
            <span>
              Showing <strong>{filteredStays.length}</strong> demonstrator propert{filteredStays.length === 1 ? "y" : "ies"}
            </span>

            {(selectedDestination !== "All" || selectedCategory !== "All" || maxPrice < 10000 || selectedAmenity !== "All") && (
              <button
                type="button"
                onClick={handleReset}
                className="text-theme-accent hover:underline font-medium cursor-pointer"
              >
                Reset filters
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Stays Grid or Empty State */}
      {filteredStays.length === 0 ? (
        <EmptyState
          title="No accommodations found"
          description="No demonstration properties matched your combined filters. Try increasing your max nightly rate or selecting 'All Categories'."
          actionText="Clear Filters"
          onActionClick={handleReset}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStays.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      )}

      {/* Comparison Modal */}
      <StayComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

    </div>
  );
}
