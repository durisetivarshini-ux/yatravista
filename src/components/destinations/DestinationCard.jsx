import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Bookmark, Clock, Wallet, ArrowUpRight, Scale, Sparkles, Calendar, Heart } from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { formatINR } from "../../utils/currencyFormatter";
import { Button } from "../ui/Button";

// Fallback high quality placeholder if remote image fails
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
    matchExplanation = `Curated for your interest in ${activeInterest}`;
  } else if (activeRegion !== "All" && destination.region === activeRegion) {
    matchExplanation = `Key highlight of ${activeRegion} India Circuit`;
  }

  return (
    <article className={`group relative flex flex-col bg-theme-surface rounded-2xl border transition-all duration-300 hover:shadow-elevated ${
      isCompared ? "border-theme-primary ring-1 ring-theme-primary/30" : "border-theme-border/90 hover:border-theme-primary/30"
    } overflow-hidden ${featured ? "md:col-span-2 md:flex-row" : ""}`}>
      
      {/* Image Container */}
      <div className={`relative overflow-hidden bg-theme-bg/60 shrink-0 ${
        featured 
          ? "w-full md:w-5/12 min-h-[220px] sm:min-h-[260px] md:min-h-full" 
          : "h-56 sm:h-64 w-full"
      }`}>
        <img
          src={imgSrc}
          alt={`Scenic view of ${destination.name}, ${destination.state}`}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent pointer-events-none" />

        {/* Region & State Pill */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex items-center gap-1.5 sm:gap-2">
          <span className="px-2.5 sm:px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider bg-white/90 text-theme-primary backdrop-blur-md shadow-xs">
            {destination.region} India
          </span>
          <span className="px-2 sm:px-2.5 py-1 rounded-full text-[11px] sm:text-xs font-medium bg-black/40 text-white/90 backdrop-blur-md">
            {destination.state}
          </span>
        </div>

        {/* Save Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleSaveDestination(destination.slug, destination.name);
          }}
          className={`absolute top-3 sm:top-4 right-3 sm:right-4 w-8 sm:w-9 h-8 sm:h-9 rounded-full flex items-center justify-center transition-all duration-200 backdrop-blur-md cursor-pointer ${
            isSaved
              ? "bg-theme-primary text-white shadow-soft"
              : "bg-white/80 text-theme-text hover:bg-white shadow-xs"
          }`}
          aria-label={isSaved ? `Remove ${destination.name} from saved wishlist` : `Save ${destination.name} to wishlist`}
        >
          <Bookmark className={`w-3.5 sm:w-4 h-3.5 sm:h-4 ${isSaved ? "fill-white" : ""}`} />
        </button>

        {/* Suggested duration on image */}
        <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 flex items-center gap-1.5 text-white/95 text-xs font-medium">
          <Clock className="w-3.5 h-3.5 text-theme-accent" />
          <span>Suggested {destination.suggestedDuration}</span>
        </div>
      </div>

      {/* Content Body */}
      <div className={`flex-1 p-5 sm:p-6 lg:p-7 flex flex-col justify-between ${
        featured ? "gap-3" : ""
      }`}>
        <div>
          {/* Match Reason Banner if filtered or Featured Highlight */}
          {matchExplanation ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-theme-accent-light text-theme-accent mb-2.5">
              <Sparkles className="w-3 h-3" />
              <span>{matchExplanation}</span>
            </div>
          ) : featured ? (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-theme-primary-light text-theme-primary mb-2.5">
              <Sparkles className="w-3 h-3" />
              <span>Featured Destination • Golden Triangle Circuit</span>
            </div>
          ) : null}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2.5">
            {destination.travelInterests?.slice(0, 3).map((interest) => (
              <span
                key={interest}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-theme-tag text-theme-text-muted"
              >
                {interest}
              </span>
            ))}
            {destination.travelInterests?.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-theme-text-subtle font-medium">
                +{destination.travelInterests.length - 3}
              </span>
            )}
          </div>

          {/* Title & Tagline */}
          <Link to={`/destinations/${destination.slug}`} className="block group-hover:text-theme-primary transition-colors">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-theme-text mb-0.5">
              {destination.name}
            </h3>
            <p className="text-xs font-medium text-theme-accent italic mb-2.5">
              {destination.tagline}
            </p>
          </Link>

          {/* Short description */}
          <p className="text-sm text-theme-text-muted leading-relaxed font-sans mb-3 line-clamp-3">
            {destination.shortDescription}
          </p>

          {/* Extra quick-facts pill strip for featured card */}
          {featured && (
            <div className="grid grid-cols-2 gap-2 my-3 p-2.5 rounded-xl bg-theme-bg/60 border border-theme-border/70 text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-theme-text-subtle block leading-tight">Best Season</span>
                  <span className="font-medium text-theme-text truncate block text-[11px]">{destination.bestSeason}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-semibold text-theme-text-subtle block leading-tight">Ideal For</span>
                  <span className="font-medium text-theme-text truncate block text-[11px]">{destination.idealFor}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Controls: Metrics, Compare, Plan */}
        <div className="pt-3.5 border-t border-theme-border space-y-2.5">
          
          <div className="flex items-center justify-between gap-2 flex-wrap sm:flex-nowrap">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-theme-text-subtle font-medium">
                Est. Daily Budget
              </span>
              <div className="flex items-center gap-1 text-sm font-semibold text-theme-primary">
                <Wallet className="w-3.5 h-3.5 text-theme-accent" />
                <span>~{formatINR(destination.dailyBudgetEstimate)}</span>
                <span className="text-[10px] text-theme-text-muted font-normal">/ day</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                to={`/destinations/${destination.slug}`}
                variant="secondary"
                size="sm"
              >
                Guide
              </Button>
              <Button
                to={`/planner?destination=${destination.slug}`}
                variant="primary"
                size="sm"
                icon={ArrowUpRight}
                iconPosition="right"
              >
                Plan Trip
              </Button>
            </div>
          </div>

          {/* Compare Toggle Button */}
          <button
            type="button"
            onClick={() => toggleCompareDestination(destination)}
            className={`w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isCompared
                ? "bg-theme-primary-light border-theme-primary text-theme-primary font-semibold"
                : "border-theme-border/60 text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? "In Comparison (Remove)" : "Compare Destination"}</span>
          </button>

        </div>

      </div>
    </article>
  );
}
export default DestinationCard;
