import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Users, Star, Check, Scale, Info, ArrowRight } from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { formatINR } from "../../utils/currencyFormatter";
import { Button } from "../ui/Button";

const FALLBACK_STAY_IMAGE = "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80";

export function StayCard({ stay, onSelectForTrip }) {
  const { selectedStay, selectStayForTrip, comparedStays, toggleCompareStay } = useTrip();
  const [imgSrc, setImgSrc] = useState(stay.image);

  const isSelected = selectedStay?.id === stay.id;
  const isCompared = comparedStays.some((s) => s.id === stay.id);

  return (
    <div className={`group relative flex flex-col bg-theme-surface rounded-2xl border transition-all duration-300 hover:shadow-elevated overflow-hidden ${
      isSelected ? "border-theme-primary ring-2 ring-theme-primary/20" : "border-theme-border"
    }`}>
      
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden bg-theme-bg/60">
        <img
          src={imgSrc}
          alt={stay.name}
          loading="lazy"
          onError={() => setImgSrc(FALLBACK_STAY_IMAGE)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Demo Data Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-black/70 text-amber-300 backdrop-blur-md">
          <Info className="w-3 h-3" />
          <span>Demo Property</span>
        </div>

        {/* Category Pill */}
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-theme-primary backdrop-blur-md shadow-xs">
          {stay.category}
        </div>

        {/* Destination & Price on Image bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
          <div>
            <span className="text-xs text-white/80 capitalize">
              {stay.destinationSlug}
            </span>
            <div className="flex items-center gap-1 text-xs text-amber-300 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-300" />
              <span>{stay.rating}</span>
              <span className="text-white/60">({stay.reviewsCount} reviews)</span>
            </div>
          </div>

          <div className="text-right">
            <span className="text-lg font-bold font-serif text-white">
              {formatINR(stay.pricePerNight)}
            </span>
            <span className="text-[11px] text-white/80 block -mt-1">/ night</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/stays/${stay.id}`} className="block group-hover:text-theme-primary transition-colors">
            <h3 className="text-lg font-serif font-bold text-theme-text mb-1 line-clamp-1">
              {stay.name}
            </h3>
            <p className="text-xs text-theme-accent italic mb-2 line-clamp-1">
              {stay.tagline}
            </p>
          </Link>

          <p className="text-xs text-theme-text-muted leading-relaxed mb-4 line-clamp-2">
            {stay.description}
          </p>

          {/* Occupancy & Top Amenities */}
          <div className="flex items-center gap-3 text-xs text-theme-text-muted mb-3 pb-3 border-b border-theme-border/60">
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-theme-primary" />
              <span>Up to {stay.maxOccupancy} Guests / room</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {stay.amenities?.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-theme-tag text-theme-text-muted flex items-center gap-1"
              >
                <Check className="w-2.5 h-2.5 text-emerald-600" />
                <span>{amenity}</span>
              </span>
            ))}
            {stay.amenities?.length > 3 && (
              <span className="px-1.5 py-0.5 text-[10px] text-theme-text-subtle">
                +{stay.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Action Controls: Add to Trip and Compare */}
        <div className="pt-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                selectStayForTrip(stay);
                if (onSelectForTrip) onSelectForTrip(stay);
              }}
              variant={isSelected ? "secondary" : "primary"}
              size="sm"
              className="flex-1"
            >
              {isSelected ? "Selected for Trip ✓" : "Add to Trip"}
            </Button>

            <Link
              to={`/stays/${stay.id}`}
              className="p-2 rounded-xl border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
              title="View full property specifications"
              aria-label={`View details for ${stay.name}`}
            >
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Compare Checkbox */}
          <button
            type="button"
            onClick={() => toggleCompareStay(stay)}
            className={`flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
              isCompared
                ? "bg-theme-primary-light border-theme-primary text-theme-primary font-semibold"
                : "border-transparent text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isCompared ? "In Comparison (Remove)" : "Compare Property"}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
