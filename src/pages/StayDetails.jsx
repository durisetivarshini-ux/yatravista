import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Star, 
  Check, 
  Info, 
  Scale
} from "lucide-react";
import { stays } from "../data/stays";
import { destinations } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";

export function StayDetails() {
  const { id } = useParams();
  const { selectedStay, selectStayForTrip, toggleCompareStay, comparedStays } = useTrip();

  const stay = stays.find((s) => s.id === id);

  if (!stay) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-serif font-bold text-theme-text">Property Not Found</h2>
        <p className="text-sm text-theme-text-muted">The requested demonstration property is not in our records.</p>
        <Button to="/stays" variant="primary" size="md">
          Back to Accommodations
        </Button>
      </div>
    );
  }

  const destination = destinations.find((d) => d.slug === stay.destinationSlug);
  const isSelected = selectedStay?.id === stay.id;
  const isCompared = comparedStays.some((s) => s.id === stay.id);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Top Breadcrumb */}
      <Link
        to="/stays"
        className="inline-flex items-center gap-1.5 text-xs text-theme-text-muted hover:text-theme-text transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to Accommodations Directory</span>
      </Link>

      {/* Main Property Card */}
      <div className="bg-theme-surface rounded-3xl border border-theme-border overflow-hidden shadow-card">
        
        {/* Photo Hero Banner */}
        <div className="relative h-80 sm:h-96 w-full overflow-hidden bg-theme-bg/60">
          <img
            src={stay.image}
            alt={stay.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

          {/* Demonstration Notice Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/75 text-amber-300 backdrop-blur-md">
            <Info className="w-3.5 h-3.5" />
            <span>Fictional Demonstration Accommodation</span>
          </div>

          <div className="absolute top-4 right-4 px-3.5 py-1 rounded-full text-xs font-bold bg-white/90 text-theme-primary backdrop-blur-md shadow-xs">
            {stay.category}
          </div>

          {/* Title on Image */}
          <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
            <div className="flex items-center gap-2 text-xs text-white/80">
              <MapPin className="w-3.5 h-3.5 text-theme-accent" />
              <span>{stay.address}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-white">
              {stay.name}
            </h1>
            <p className="text-sm text-amber-200 italic font-serif">
              “{stay.tagline}”
            </p>
          </div>
        </div>

        {/* Property Specs Body */}
        <div className="p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Description & Amenities */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="space-y-3">
              <h2 className="text-xl font-serif font-bold text-theme-text">
                Property Overview
              </h2>
              <p className="text-sm text-theme-text-muted leading-relaxed font-sans">
                {stay.description}
              </p>
            </div>

            {/* Room Specifications */}
            <div className="p-5 rounded-2xl bg-theme-bg/50 border border-theme-border/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-theme-text-subtle uppercase tracking-wider block text-[10px] font-semibold">
                  Room Capacity
                </span>
                <div className="flex items-center gap-1.5 font-bold text-theme-text text-sm mt-0.5">
                  <Users className="w-4 h-4 text-theme-primary" />
                  <span>Up to {stay.maxOccupancy} Guests</span>
                </div>
              </div>

              <div>
                <span className="text-theme-text-subtle uppercase tracking-wider block text-[10px] font-semibold">
                  Demonstration Rating
                </span>
                <div className="flex items-center gap-1.5 font-bold text-amber-700 text-sm mt-0.5">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{stay.rating} / 5.0</span>
                  <span className="text-theme-text-muted font-normal text-xs">({stay.reviewsCount} sample reviews)</span>
                </div>
              </div>

              <div>
                <span className="text-theme-text-subtle uppercase tracking-wider block text-[10px] font-semibold">
                  Location Circuit
                </span>
                <span className="font-semibold text-theme-text block text-xs mt-0.5 capitalize">
                  {destination?.name || stay.destinationSlug}, {destination?.state}
                </span>
              </div>
            </div>

            {/* Amenities Matrix */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-theme-text">
                Included Amenities & Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {stay.amenities?.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-2 p-3 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-text"
                  >
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Educational Disclaimer */}
            <div className="p-4 rounded-xl bg-theme-bg/60 border border-theme-border text-xs text-theme-text-muted space-y-1">
              <span className="font-semibold text-theme-text block">Demonstrator Data Note:</span>
              <p>
                In a production deployment, this listing would query live hotel inventory feeds (e.g. Booking.com / StayFlex API). For this hackathon prototype, room calculations are processed locally inside your browser.
              </p>
            </div>

          </div>

          {/* Right Column: Pricing & Add-to-Trip Card */}
          <div className="lg:col-span-4">
            <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated space-y-6 sticky top-28">
              
              <div className="border-b border-theme-border pb-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-theme-text-subtle block">
                  Illustrative Room Tariff
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl font-serif font-bold text-theme-primary">
                    {formatINR(stay.pricePerNight)}
                  </span>
                  <span className="text-xs text-theme-text-muted">/ room / night</span>
                </div>
                <span className="text-[11px] text-theme-text-subtle block mt-0.5">
                  Taxes and local breakfast included
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => selectStayForTrip(stay)}
                  variant={isSelected ? "secondary" : "primary"}
                  size="lg"
                  className="w-full justify-center font-semibold"
                >
                  {isSelected ? "Selected for Trip ✓" : "Add to Trip Planner"}
                </Button>

                <Button
                  to={`/planner?destination=${stay.destinationSlug}`}
                  variant="accent"
                  size="md"
                  className="w-full justify-center text-xs"
                >
                  Plan Full Itinerary with this Stay
                </Button>

                <button
                  type="button"
                  onClick={() => toggleCompareStay(stay)}
                  className="w-full py-2 rounded-xl text-xs font-medium border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Scale className="w-3.5 h-3.5" />
                  <span>{isCompared ? "Remove from Comparison" : "Compare with Other Stays"}</span>
                </button>
              </div>

              <div className="pt-4 border-t border-theme-border text-[11px] text-theme-text-muted space-y-1">
                <p>
                  <strong>No Payment Processing:</strong> Selecting this property incorporates its rates into your overall travel budget breakdown.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
