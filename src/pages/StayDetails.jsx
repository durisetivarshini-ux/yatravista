import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  MapPin, 
  Users, 
  Star, 
  Check, 
  Scale, 
  Sparkles, 
  ShieldCheck, 
  Info,
  CalendarDays,
  ArrowRight
} from "lucide-react";
import { stays } from "../data/stays";
import { destinations } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { ProviderCard } from "../components/providers/ProviderCard";
import { BookingModal } from "../components/bookings/BookingModal";

export function StayDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedStay, selectStayForTrip, comparedStays, toggleCompareStay } = useTrip();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  const stay = stays.find((s) => s.id === id);

  if (!stay) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-theme-text">Stay Not Found</h2>
        <p className="text-sm text-theme-text-muted">The requested heritage stay could not be located.</p>
        <Button to="/stays" variant="primary">Return to Stays Directory</Button>
      </div>
    );
  }

  const destination = destinations.find((d) => d.slug === stay.destinationSlug);
  const isSelected = selectedStay?.id === stay.id;
  const isCompared = comparedStays.some((s) => s.id === stay.id);

  // Attached Demo Provider Info based on region
  const providerData = {
    id: stay.destinationSlug === "jaipur" || stay.destinationSlug === "udaipur" ? "usr-provider-01" : "usr-provider-02",
    name: stay.destinationSlug === "jaipur" || stay.destinationSlug === "udaipur" ? "Rajendra Singh Rathore" : "Meenakshi Kurup",
    business_name: stay.destinationSlug === "jaipur" || stay.destinationSlug === "udaipur" 
      ? "Rathore Heritage Estates & Guilds" 
      : "Malabar Coast Heritage & Plantation Stays",
    tagline: stay.destinationSlug === "jaipur" || stay.destinationSlug === "udaipur"
      ? "Preserving 5th-generation Rajput hospitality & Sanganeri block craft"
      : "Living traditions among cardamom hills, spice groves and backwaters",
    bio: "Certified local hospitality provider committed to heritage architecture preservation, farm-fresh dining, and authentic regional cultural immersion.",
    location: `${destination?.name || "Jaipur"}, ${destination?.state || "Rajasthan"}`,
    languages: ["English", "Hindi"],
    services: ["Heritage Stays", "Local Guides", "Cultural Workshops"],
    verified_status: "approved",
    public_phone: "+91 94140 12345",
    public_email: "host@yatravista.demo",
    is_demo: 1
  };

  const bookableListing = {
    id: stay.id,
    provider_id: providerData.id,
    destination_slug: stay.destinationSlug,
    category: "stay",
    title: stay.name,
    tagline: stay.tagline,
    price: stay.pricePerNight,
    price_unit: "per_night",
    capacity: stay.maxOccupancy || 2,
    max_rooms: 3,
    address: stay.address,
    description: stay.description,
    image: stay.image,
    cancellation_policy: "Free cancellation up to 48 hours prior to check-in."
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Back Link */}
      <div>
        <Link
          to="/stays"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-text-muted hover:text-theme-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Heritage Stays</span>
        </Link>
      </div>

      {/* Main Stay Profile Card */}
      <div className="bg-theme-surface border border-theme-border rounded-3xl overflow-hidden shadow-soft">
        
        {/* Hero Image Section */}
        <div className="relative h-80 sm:h-[420px] w-full overflow-hidden bg-theme-bg">
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
                  <span className="text-theme-text-muted font-normal text-xs">({stay.reviewsCount} reviews)</span>
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

            {/* Provider Section */}
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-theme-text">Property Host & Hospitality Guild</h3>
              <ProviderCard provider={providerData} />
            </div>

          </div>

          {/* Right Column: Pricing & Booking Actions */}
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
                  Includes heritage breakfast & taxes
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center font-semibold"
                  onClick={() => setBookingModalOpen(true)}
                >
                  Request to Book Stay
                </Button>

                <Button
                  onClick={() => selectStayForTrip(stay)}
                  variant={isSelected ? "secondary" : "secondary"}
                  size="md"
                  className="w-full justify-center font-medium text-xs"
                >
                  {isSelected ? "Selected in Planner ✓" : "Add to Trip Planner"}
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
                  <strong>Transparent Booking:</strong> Submitting a request creates a pending reservation with provider review. No real credit card charges occur.
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          listing={bookableListing}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

    </div>
  );
}
export default StayDetails;
