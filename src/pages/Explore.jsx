import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Compass, Scale, Sparkles, MapPin, Landmark, Mountain, Waves, Palette, Flame } from "lucide-react";
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

// Verified Working Indian Heritage Hero Photography with Fallbacks
const PRIMARY_HERO_IMAGE = "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1920&q=85";
const FALLBACK_HERO_IMAGE = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1920&q=85";

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
  
  // Hero Image Error and Fallback State
  const [heroImgSrc, setHeroImgSrc] = useState(PRIMARY_HERO_IMAGE);
  const [heroImgError, setHeroImgError] = useState(false);

  const handleHeroImageError = () => {
    if (heroImgSrc === PRIMARY_HERO_IMAGE) {
      setHeroImgSrc(FALLBACK_HERO_IMAGE);
    } else {
      setHeroImgError(true);
    }
  };

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
      
      {/* 1. BRIGHTENED & REBALANCED PHOTO HERO */}
      <section className="relative min-h-[380px] sm:min-h-[420px] lg:min-h-[440px] flex items-center justify-center overflow-hidden bg-theme-primary border-b border-theme-border">
        
        {/* Background Photograph with Natural Colours & Clear Skies */}
        {!heroImgError ? (
          <div className="absolute inset-0 z-0">
            <img
              src={heroImgSrc}
              alt={heroImgSrc === PRIMARY_HERO_IMAGE ? "Amber Fort Ramparts, Jaipur, Rajasthan" : "Taj Mahal Citadel, Agra, Uttar Pradesh"}
              onError={handleHeroImageError}
              className="w-full h-full object-cover object-[center_35%] transform scale-100"
            />
            {/* Subtle & Clean Neutral Gradient (Preserves Sandstone & Sky Vibrancy while guaranteeing text legibility) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/20" />
          </div>
        ) : (
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-theme-primary via-theme-primary/90 to-theme-nav" />
        )}

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 lg:py-16 w-full flex flex-col items-center text-center">
          
          {/* Curated Understated Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium tracking-[0.12em] uppercase font-sans bg-black/40 text-[#F0CF88] backdrop-blur-md border border-[#F0CF88]/30 mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#F0CF88]" />
            <span>Curated Indian Destinations</span>
          </div>

          {/* Main Title: Balanced proportions (56-64px desktop, 34-40px mobile) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-serif font-semibold text-white tracking-tight leading-[1.14] max-w-[800px] text-center drop-shadow-sm">
            Explore the Wonders of <span className="text-[#F0CF88]">India</span>
          </h1>

          {/* Short Supporting Subtitle: 18-20px desktop, 16-18px mobile */}
          <p className="mt-4 text-base sm:text-lg md:text-[19px] text-[#FFF9EF]/90 max-w-[620px] font-sans font-normal leading-relaxed text-balance drop-shadow-xs">
            Heritage cities, sacred temples and unforgettable local experiences.
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

          {/* Accurate Verified Location Credit */}
          {!heroImgError && (
            <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 text-xs font-sans text-white/80 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#F0CF88]" />
              <span>{heroImgSrc === PRIMARY_HERO_IMAGE ? "Amber Fort Ramparts, Jaipur, Rajasthan" : "Taj Mahal Citadel, Agra, Uttar Pradesh"}</span>
            </div>
          )}

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
                    className="group relative h-28 sm:h-30 rounded-xl overflow-hidden border border-theme-border/80 shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-theme-primary"
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
                  className={`group relative h-28 sm:h-30 rounded-xl overflow-hidden border transition-all duration-300 hover:-translate-y-0.5 cursor-pointer text-left focus:outline-none focus:ring-2 focus:ring-theme-primary ${
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

        {/* 4. DESTINATION RESULTS GRID (Consistent 3-column desktop layout for ALL cards) */}
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
