import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Clock, 
  Users, 
  MapPin, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  ArrowLeft, 
  Calendar, 
  Wallet,
  ArrowUpRight,
  Info
} from "lucide-react";
import { api } from "../utils/api";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { ProviderCard } from "../components/providers/ProviderCard";
import { BookingModal } from "../components/bookings/BookingModal";
import { useTrip } from "../context/TripContext";

export function ExperienceDetails() {
  const { id } = useParams();
  const { addExperienceToTrip, isExperienceSelected } = useTrip();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    async function loadListing() {
      setLoading(true);
      try {
        const res = await api.getListing(id);
        setListing(res.listing);
      } catch (err) {
        console.error("Error loading experience:", err);
      } finally {
        setLoading(false);
      }
    }
    loadListing();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-theme-text-muted">
        Loading experience details...
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-theme-text">Experience Not Found</h2>
        <Button to="/experiences" variant="primary">Browse Experiences</Button>
      </div>
    );
  }

  const isSelectedForTrip = isExperienceSelected(listing.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Link */}
      <div>
        <Link
          to="/experiences"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-text-muted hover:text-theme-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Artisan Experiences & Guided Tours</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Column: Details, Image, Inclusions */}
        <div className="lg:col-span-2 space-y-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
                {listing.category?.replace("_", " ")}
              </span>
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-theme-bg text-theme-text-muted border border-theme-border">
                {listing.destination_name || listing.destination_slug}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-theme-text">
              {listing.title}
            </h1>

            {listing.tagline && (
              <p className="text-base text-theme-accent italic font-medium">
                “{listing.tagline}”
              </p>
            )}
          </div>

          {/* Hero Image */}
          <div className="relative h-[360px] sm:h-[420px] rounded-3xl overflow-hidden border border-theme-border shadow-soft bg-theme-bg">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* About / Description */}
          <div className="space-y-4">
            <h3 className="text-xl font-serif font-bold text-theme-text">About this Cultural Experience</h3>
            <p className="text-sm text-theme-text-muted leading-relaxed font-sans">
              {listing.description}
            </p>
          </div>

          {/* What's Included / Amenities */}
          {listing.amenities?.length > 0 && (
            <div className="space-y-4 p-6 rounded-2xl bg-theme-surface border border-theme-border">
              <h3 className="text-lg font-serif font-bold text-theme-text flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-theme-accent" />
                <span>What’s Included & Highlights</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {listing.amenities.map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-theme-text font-medium">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Host Provider Card */}
          {listing.provider && (
            <div className="space-y-3">
              <h3 className="text-lg font-serif font-bold text-theme-text">Meet Your Local Host & Guide</h3>
              <ProviderCard provider={listing.provider} />
            </div>
          )}

        </div>

        {/* Right Column: Sticky Booking Widget */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 p-6 rounded-3xl bg-theme-surface border border-theme-border shadow-elevated space-y-6">
            
            <div>
              <span className="text-xs uppercase font-semibold text-theme-text-subtle tracking-wider block">
                Session Fee
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-serif font-bold text-theme-primary">
                  {formatINR(listing.price)}
                </span>
                <span className="text-xs text-theme-text-muted">/ person</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-theme-bg border border-theme-border text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-theme-text-subtle">Capacity:</span>
                <span className="font-semibold text-theme-text">Max {listing.capacity || 8} Participants</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-theme-text-subtle">Cancellation:</span>
                <span className="font-semibold text-emerald-700">Free within 24h</span>
              </div>
            </div>

            <div className="space-y-3">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => setBookingModalOpen(true)}
              >
                Request to Book Slot
              </Button>

              <Button
                variant="secondary"
                size="md"
                className="w-full justify-center"
                onClick={() => addExperienceToTrip(listing)}
              >
                {isSelectedForTrip ? "✓ Added to Planner Itinerary" : "Add to Trip Itinerary"}
              </Button>
            </div>

            <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[11px] text-amber-800 space-y-1">
              <div className="font-semibold flex items-center gap-1">
                <Info className="w-3.5 h-3.5" />
                <span>Transparent Booking Terms:</span>
              </div>
              <p className="text-[10px] text-amber-700 leading-relaxed">
                Your request is directly routed to the verified host. Payment and scheduling confirmation occur seamlessly in sandbox demo mode.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Booking Modal */}
      {bookingModalOpen && (
        <BookingModal
          listing={listing}
          isOpen={bookingModalOpen}
          onClose={() => setBookingModalOpen(false)}
        />
      )}

    </div>
  );
}
export default ExperienceDetails;
