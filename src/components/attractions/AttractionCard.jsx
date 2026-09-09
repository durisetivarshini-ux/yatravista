import React, { useState } from "react";
import { 
  MapPin, 
  Clock, 
  Navigation, 
  Heart, 
  Plus, 
  ExternalLink, 
  ShieldCheck, 
  Info,
  Calendar,
  Sparkles,
  Compass
} from "lucide-react";
import { getDirectionsUrl, getOsmUrl } from "../../utils/geo";
import { useAuth } from "../../context/AuthContext";
import { useTrip } from "../../context/TripContext";

export default function AttractionCard({
  attraction,
  destinationName = "",
  stateName = "",
  onAddToTrip = null,
  compact = false,
  showDirections = true
}) {
  const { user, api } = useAuth();
  const { trip, addActivityToDay } = useTrip();
  const [isWishlisted, setIsWishlisted] = useState(
    user?.wishlist?.includes(attraction.name) || false
  );
  const [isWishlisting, setIsWishlisting] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80";

  const handleToggleWishlist = async () => {
    if (!user) {
      alert("Please log in to save places to your wishlist.");
      return;
    }
    setIsWishlisting(true);
    try {
      if (api?.post) {
        await api.post("/auth/wishlist/toggle", { itemId: attraction.name });
      }
      setIsWishlisted(!isWishlisted);
    } catch (err) {
      console.error("Failed to toggle wishlist", err);
    } finally {
      setIsWishlisting(false);
    }
  };

  const handleAddItinerary = () => {
    if (onAddToTrip) {
      onAddToTrip(attraction);
      return;
    }
    // Default add to Day 1 of current trip if available
    if (addActivityToDay) {
      addActivityToDay(1, {
        title: attraction.name,
        category: attraction.category || "Sightseeing",
        cost: attraction.cost || 0,
        timeSlot: "Morning",
        duration: attraction.duration || "2 hours"
      });
      setAddedToast(true);
      setTimeout(() => setAddedToast(false), 3000);
    }
  };

  const directionsUrl = getDirectionsUrl(
    attraction.coordinates,
    attraction.name,
    `${destinationName}, ${stateName}`
  );

  return (
    <div className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
      {/* Attraction Image Banner */}
      <div className="relative h-48 md:h-52 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={imgError ? fallbackImage : (attraction.image || fallbackImage)}
          alt={attraction.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Category & Region Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider bg-stone-900/80 backdrop-blur-md text-amber-300 rounded-full border border-amber-500/20 shadow-sm">
            {attraction.category || "Heritage"}
          </span>
          {attraction.isRegionalExcursion && (
            <span className="px-2.5 py-1 text-[10px] font-semibold bg-emerald-900/80 backdrop-blur-md text-emerald-200 rounded-full border border-emerald-500/30">
              Regional Excursion
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleToggleWishlist}
          disabled={isWishlisting}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-sm ${
            isWishlisted
              ? "bg-rose-500 text-white shadow-rose-500/30"
              : "bg-white/80 dark:bg-stone-900/80 text-stone-700 dark:text-stone-300 hover:text-rose-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
        </button>

        {/* Image Credit (Subtle overlay) */}
        {attraction.imageCredit && (
          <div className="absolute bottom-1.5 right-2 text-[9px] text-white/70 bg-black/40 px-1.5 py-0.5 rounded backdrop-blur-xs">
            Photo: {attraction.imageCredit}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Location Line */}
          <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400 mb-1">
            <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="truncate">
              {destinationName ? `${destinationName}, ` : ""}{stateName || "India"}
            </span>
            {attraction.address && (
              <span className="truncate text-[11px] text-stone-400 dark:text-stone-500">
                • {attraction.address}
              </span>
            )}
          </div>

          {/* Attraction Title */}
          <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {attraction.name}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 mt-1.5 leading-relaxed">
            {attraction.description || "Iconic landmark showcasing cultural heritage, historical architecture, and regional traditions."}
          </p>
        </div>

        {/* Planning Metadata */}
        <div className="pt-2.5 border-t border-stone-100 dark:border-stone-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              <span>Est. {attraction.duration || "2 - 3 hrs"}</span>
            </div>
            <div>
              {attraction.cost === 0 || attraction.cost === "Free" ? (
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Free Entry</span>
              ) : (
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {typeof attraction.cost === 'number' ? `₹${attraction.cost}` : (attraction.cost || "Public Access")}
                </span>
              )}
            </div>
          </div>

          {/* Source Verification Note */}
          {attraction.sourceInfo && (
            <div className="text-[10px] text-stone-400 dark:text-stone-500 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" />
              <span className="truncate">{attraction.sourceInfo}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {/* Get Directions Link */}
            {showDirections && (
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-amber-100/60 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-300 transition-colors"
                title="Open exact coordinates in Google Maps"
              >
                <Navigation className="w-3.5 h-3.5 text-amber-600" />
                <span>Directions</span>
                <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
              </a>
            )}

            {/* Add to Itinerary Button */}
            <button
              type="button"
              onClick={handleAddItinerary}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm hover:shadow transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{addedToast ? "Added to Trip!" : "Add to Trip"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
