import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Compass, Scale, Sparkles, MapPin, Landmark, Mountain, Waves, Palette, Flame, ArrowRight } from "lucide-react";
import { destinations } from "../data/destinations";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { DestinationFilters } from "../components/destinations/DestinationFilters";
import { DestinationComparison } from "../components/destinations/DestinationComparison";
import { EmptyState } from "../components/ui/EmptyState";
import { useTrip } from "../context/TripContext";

// Visual travel categories dataset with curated photography
const VISUAL_CATEGORIES = [
  {
    id: "Spiritual",
    title: "Temples & Spiritual",
    subtitle: "Sacred Ghats & Shrines",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    link: "/temples",
    isExternalRoute: true,
    icon: Flame,
  },
  {
    id: "Heritage",
    title: "Heritage & Culture",
    subtitle: "Forts, Palaces & Dynasties",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    isExternalRoute: false,
    icon: Landmark,
  },
  {
    id: "Nature",
    title: "Mountains & Nature",
    subtitle: "Tea Ridges & Alpine Valleys",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=600&q=80",
    isExternalRoute: false,
    icon: Mountain,
  },
  {
    id: "Coastal",
    title: "Beaches & Backwaters",
    subtitle: "Palm Lagoons & Coastlines",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    isExternalRoute: false,
    icon: Waves,
  },
  {
    id: "Artisan",
    title: "Artisan Experiences",
    subtitle: "Handloom & Craft Masterclasses",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    link: "/experiences",
    isExternalRoute: true,
    icon: Palette,
  },
];

export function Explore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { comparedDestinations } = useTrip();

  const initialRegion = searchParams.get("region") || "All";
  const initialInterest = searchParams.get("interest") || "All";
  const initialState = searchParams.get("state") || "All";
  const initialSearch = searchParams.get("q") || "";
  const initialSort = searchParams.get("sort") || "popular";

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedInterest, setSelectedInterest] = useState(initialInterest);
  const [sortBy, setSortBy] = useState(initialSort);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);

  // Sync state changes back into URL params
  useEffect(() => {
    const params = {};
    if (searchTerm.trim()) params.q = searchTerm.trim();
    if (selectedState !== "All") params.state = selectedState;
    if (selectedRegion !== "All") params.region = selectedRegion;
    if (selectedInterest !== "All") params.interest = selectedInterest;
    if (sortBy !== "popular") params.sort = sortBy;
    setSearchParams(params, { replace: true });
  }, [searchTerm, selectedState, selectedRegion, selectedInterest, sortBy, setSearchParams]);

  // Reset all filters
  const handleReset = () => {
    setSearchTerm("");
    setSelectedState("All");
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
          const matchAttractions = dest.topAttractions?.some(a => a.toLowerCase().includes(q));
          if (!matchName && !matchState && !matchTagline && !matchDesc && !matchAttractions) {
            return false;
          }
        }

        // State filter
        if (selectedState !== "All" && dest.state.toLowerCase() !== selectedState.toLowerCase()) {
          return false;
        }

        // Region filter
        if (selectedRegion !== "All" && dest.region !== selectedRegion) {
          return false;
        }

        // Travel interest filter
        if (selectedInterest !== "All") {
          const hasInterest = dest.travelInterests?.some(
            (item) => item.toLowerCase().includes(selectedInterest.toLowerCase()) || selectedInterest.toLowerCase().includes(item.toLowerCase())
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
  }, [searchTerm, selectedState, selectedRegion, selectedInterest, sortBy]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. EDITORIAL PHOTO HERO SECTION */}
      <section className="relative min-h-[380px] lg:min-h-[420px] flex items-center justify-center overflow-hidden bg-theme-surface border-b border-theme-border">
        
        {/* Background Photograph */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=85"
            alt="Amber Fort and Maota Lake, Jaipur, Rajasthan"
            className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-1000"
          />
          {/* Subtle Multi-Layer Dark Gradient for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-black/20 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex flex-col items-center text-center">
          
          {/* Curated Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/15 text-amber-200 backdrop-blur-md border border-amber-300/30 mb-4 shadow-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Indian Destinations</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-tight max-w-4xl drop-shadow-md">
            Explore the Wonders of India
          </h1>

          {/* Supporting Subtitle */}
          <p className="mt-3 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl font-light leading-relaxed drop-shadow-xs">
            Discover heritage cities, sacred temples, mountain escapes and local experiences.
          </p>

          {/* Destination Comparison Floating Badge if selected */}
          {comparedDestinations.length > 0 && (
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setIsComparisonOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-theme-primary text-white text-xs font-semibold shadow-elevated hover:bg-theme-primary-hover transition-all cursor-pointer"
              >
                <Scale className="w-4 h-4 text-theme-accent" />
                <span>Compare Destinations ({comparedDestinations.length}/3)</span>
              </button>
            </div>
          )}

          {/* Location Credit */}
          <div className="absolute bottom-3 right-4 sm:right-6 text-[11px] text-white/75 bg-black/40 backdrop-blur-xs px-2.5 py-0.5 rounded-md flex items-center gap-1 font-sans">
            <MapPin className="w-3 h-3 text-amber-300" />
            <span>Amber Fort & Maota Lake, Rajasthan</span>
          </div>

        </div>
      </section>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* 2. COMPACT SEARCH & FILTER PANEL */}
        <section aria-label="Search and filter destinations">
          <DestinationFilters
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedState={selectedState}
            setSelectedState={setSelectedState}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            selectedInterest={selectedInterest}
            setSelectedInterest={setSelectedInterest}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onReset={handleReset}
            totalResults={filteredDestinations.length}
          />
        </section>

        {/* 3. VISUAL TRAVEL CATEGORIES ROW */}
        <section aria-label="Browse by travel categories">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base sm:text-lg font-serif font-bold text-theme-text flex items-center gap-2">
              <Compass className="w-4 h-4 text-theme-primary" />
              <span>Browse by Travel Theme</span>
            </h2>
            <span className="text-xs text-theme-text-muted">
              Click a theme to filter results
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {VISUAL_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedInterest.toLowerCase().includes(cat.id.toLowerCase());

              if (cat.isExternalRoute && !isSelected) {
                return (
                  <Link
                    key={cat.id}
                    to={cat.link}
                    className="group relative h-28 sm:h-32 rounded-xl overflow-hidden border border-theme-border/80 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-theme-primary"
                  >
                    <img
                      src={cat.image}
                      alt={cat.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
                    
                    <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
                      <div className="flex items-center gap-1.5 text-amber-300 mb-0.5">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Explore</span>
                      </div>
                      <h3 className="text-xs sm:text-sm font-serif font-bold leading-tight line-clamp-1">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-white/80 font-sans line-clamp-1">
                        {cat.subtitle}
                      </p>
                    </div>
                  </Link>
                );
              }

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => {
                    if (isSelected) {
                      setSelectedInterest("All");
                    } else {
                      setSelectedInterest(cat.id);
                    }
                  }}
                  className={`group relative h-28 sm:h-32 rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-theme-primary ${
                    isSelected
                      ? "ring-2 ring-theme-primary border-theme-primary shadow-elevated"
                      : "border-theme-border/80 shadow-xs hover:shadow-md"
                  }`}
                >
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className={`absolute inset-0 transition-colors ${
                    isSelected 
                      ? "bg-gradient-to-t from-theme-primary/95 via-theme-primary/60 to-theme-primary/30" 
                      : "bg-gradient-to-t from-black/85 via-black/40 to-transparent"
                  }`} />
                  
                  <div className="absolute inset-0 p-3 flex flex-col justify-end text-white">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5 text-amber-300">
                        <Icon className="w-3.5 h-3.5" />
                        <span className="text-[10px] font-semibold uppercase tracking-wider">Theme</span>
                      </div>
                      {isSelected && (
                        <span className="text-[9px] bg-white text-theme-primary font-bold px-1.5 py-0.5 rounded">
                          Active
                        </span>
                      )}
                    </div>
                    <h3 className="text-xs sm:text-sm font-serif font-bold leading-tight line-clamp-1">
                      {cat.title}
                    </h3>
                    <p className="text-[10px] text-white/80 font-sans line-clamp-1">
                      {cat.subtitle}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* 4. DESTINATION RESULTS GRID OR EMPTY STATE */}
        <section aria-label="Curated destination listings">
          {filteredDestinations.length === 0 ? (
            <EmptyState
              title="No destinations match your criteria"
              description="We couldn't find any curated destinations matching your active filters or search terms. Try clearing your filters or changing search keywords."
              actionText="Reset All Filters"
              onActionClick={handleReset}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((dest, idx) => (
                <DestinationCard 
                  key={dest.slug} 
                  destination={dest} 
                  featured={idx === 0 && filteredDestinations.length > 3}
                  activeInterest={selectedInterest}
                  activeRegion={selectedRegion}
                />
              ))}
            </div>
          )}
        </section>

      </main>

      {/* 5. DESTINATION COMPARISON MODAL */}
      <DestinationComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />

    </div>
  );
}

export default Explore;
