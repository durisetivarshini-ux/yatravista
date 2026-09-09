import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Clock, Wallet, ArrowUpRight, Scale, Sparkles, Calendar, Heart, MapPin, Eye } from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { formatINR } from "../../utils/currencyFormatter";
import { Button } from "../ui/Button";

// Fallback high quality Indian heritage image if remote image fails
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80";

export function DestinationCard({ 
  destination, 
  featured = false, 
  activeInterest = "All",
  activeRegion = "All"
}) {
  const { 
    toggleSaveDestination, 
    isDestinationSaved, 
    comparedDestinations, 
    toggleCompareDestination 
  } = useTrip();
  const [imgSrc, setImgSrc] = useState(destination.heroImage);

  const isSaved = isDestinationSaved(destination.slug);
  const isCompared = comparedDestinations.some(d => d.slug === destination.slug);

  // Determine "Why this matches" explanation based on active filters
  let matchExplanation = null;
  if (activeInterest !== "All" && destination.travelInterests?.some(i => i.toLowerCase() === activeInterest.toLowerCase())) {
    matchExplanation = `Curated for: ${activeInterest}`;
  } else if (activeRegion !== "All" && destination.region === activeRegion) {
    matchExplanation = `Highlight of ${activeRegion} India`;
  }

  return (
    <article className={`group relative flex flex-col bg-theme-surface rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated ${
      isCompared ? "border-theme-primary ring-2 ring-theme-primary/40" : "border-theme-border/80 hover:border-theme-primary/40"
    } overflow-hidden ${featured ? "md:col-span-2 md:flex-row" : ""}`}>
      
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-theme-bg/60 shrink-0 ${
        featured 
          ? "w-full md:w-5/12 min-h-[240px] sm:min-h-[280px] md:min-h-full" 
          : "h-56 sm:h-60 w-full"
      }`}>
        <img
          src={imgSrc}
          alt={`Scenic view of ${destination.name}, ${destination.state}`}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10 pointer-events-none" />

        {/* Region & State Pill Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider bg-white/95 text-theme-primary backdrop-blur-md shadow-xs">
            {destination.region} India
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium bg-black/50 text-white/95 backdrop-blur-md">
            {destination.state}
          </span>
        </div>

        {/* Save to Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveDestination(destination.slug, destination.name);
          }}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer ${
            isSaved
              ? "bg-theme-primary text-white shadow-soft"
              : "bg-white/85 text-theme-text hover:bg-white shadow-xs"
          }`}
          title={isSaved ? "Saved in Wishlist" : "Save to Wishlist"}
          aria-label={isSaved ? `Remove ${destination.name} from saved wishlist` : `Save ${destination.name} to wishlist`}
        >
          <Bookmark className={`w-3.5 h-3.5 ${isSaved ? "fill-white" : ""}`} />
        </button>

        {/* Suggested duration badge on image */}
        <div className="absolute bottom-2.5 left-3 flex items-center gap-1 text-white/95 text-[11px] font-medium drop-shadow-xs">
          <Clock className="w-3.5 h-3.5 text-theme-accent" />
          <span>Suggested: {destination.suggestedDuration}</span>
        </div>

        {/* Attractions count if available */}
        {destination.topAttractions && (
          <div className="absolute bottom-2.5 right-3 text-[10px] font-medium text-white/90 bg-black/40 backdrop-blur-xs px-2 py-0.5 rounded-md">
            {destination.topAttractions.length} Landmarks
          </div>
        )}
      </div>

      {/* Content Body */}
      <div className={`flex-1 p-5 flex flex-col justify-between ${featured ? "gap-2" : ""}`}>
        <div>
          {/* Match Reason Banner if filtered or Featured Highlight */}
          {matchExplanation ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-theme-accent-light text-theme-accent mb-2">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>{matchExplanation}</span>
            </div>
          ) : featured ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-theme-primary-light text-theme-primary mb-2">
              <Sparkles className="w-3 h-3 shrink-0" />
              <span>Featured Destination • Cultural Circuit</span>
            </div>
          ) : null}

          {/* Travel Categories Chips */}
          <div className="flex flex-wrap gap-1 mb-2">
            {destination.travelInterests?.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-theme-tag text-theme-text-muted"
              >
                {interest}
              </span>
            ))}
            {destination.travelInterests?.length > 3 && (
              <span className="px-1.5 py-0.5 text-[9px] text-theme-text-subtle font-medium">
                +{destination.travelInterests.length - 3}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <Link 
            to={`/destinations/${destination.slug}`} 
            className="block group-hover:text-theme-primary transition-colors focus:outline-none focus:underline"
          >
            <h3 className="text-lg sm:text-xl font-serif font-bold text-theme-text leading-tight mb-0.5">
              {destination.name}
            </h3>
            <p className="text-xs font-medium text-theme-accent italic mb-2 line-clamp-1">
              {destination.tagline}
            </p>
          </Link>

          {/* Short description */}
          <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed font-sans mb-3 line-clamp-2">
            {destination.shortDescription}
          </p>

          {/* Extra quick-facts pill strip for featured card */}
          {featured && (
            <div className="grid grid-cols-2 gap-2 my-2.5 p-2 rounded-xl bg-theme-bg/60 border border-theme-border/70 text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-semibold text-theme-text-subtle block leading-tight">Best Season</span>
                  <span className="font-medium text-theme-text truncate block text-[11px]">{destination.bestSeason}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-semibold text-theme-text-subtle block leading-tight">Ideal For</span>
                  <span className="font-medium text-theme-text truncate block text-[11px]">{destination.idealFor}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls: Budget, Explore, Plan, Compare */}
        <div className="pt-3 border-t border-theme-border space-y-2">
          
          <div className="flex items-center justify-between gap-2">
            <div>
              <span className="block text-[9px] uppercase tracking-wider text-theme-text-subtle font-medium">
                Est. Daily Budget
              </span>
              <div className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-theme-primary" title="Illustrative estimate covering lodging, meals, and local transit">
                <Wallet className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-theme-accent" />
                <span>~{formatINR(destination.dailyBudgetEstimate)}</span>
                <span className="text-[10px] text-theme-text-muted font-normal">/ day</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Link
                to={`/destinations/${destination.slug}`}
                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border border-theme-border bg-theme-bg text-theme-text hover:bg-theme-surface hover:border-theme-primary/40 transition-colors"
              >
                <Eye className="w-3 h-3 text-theme-accent" />
                <span>Explore</span>
              </Link>
              <Link
                to={`/planner?destination=${destination.slug}`}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold bg-theme-primary text-white hover:bg-theme-primary-hover shadow-xs transition-colors"
              >
                <span>Plan</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-theme-accent" />
              </Link>
            </div>
          </div>

          {/* Compare Toggle Button */}
          <button
            type="button"
            onClick={() => toggleCompareDestination(destination)}
            className={`w-full flex items-center justify-center gap-1.5 py-1 px-2 rounded-lg text-[11px] font-medium border transition-colors cursor-pointer ${
              isCompared
                ? "bg-theme-primary-light border-theme-primary text-theme-primary font-semibold"
                : "border-theme-border/60 text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            }`}
          >
            <Scale className="w-3 h-3" />
            <span>{isCompared ? "In Comparison (Remove)" : "Compare Destination"}</span>
          </button>

        </div>

      </div>
    </article>
  );
}

export default DestinationCard;
