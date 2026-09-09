import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Building, 
  MapPin, 
  Globe, 
  Phone, 
  Mail, 
  ShieldCheck, 
  Sparkles, 
  Star, 
  ArrowLeft, 
  ArrowUpRight,
  BedDouble,
  Compass
} from "lucide-react";
import { api } from "../utils/api";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { BookingModal } from "../components/bookings/BookingModal";

export function ProviderProfile() {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState(null);

  useEffect(() => {
    async function loadProvider() {
      setLoading(true);
      try {
        const res = await api.getProvider(id);
        setProvider(res.provider);
      } catch (err) {
        console.error("Error loading provider profile:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProvider();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-sm text-theme-text-muted">
        Loading host profile...
      </div>
    );
  }

  if (!provider) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-serif font-bold text-theme-text">Provider Profile Not Found</h2>
        <Button to="/explore" variant="primary">Browse Destinations</Button>
      </div>
    );
  }

  const displayName = provider.business_name || provider.name;
  const languagesList = Array.isArray(provider.languages) ? provider.languages.join(", ") : "English, Hindi";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Back Button */}
      <div>
        <Link
          to="/stays"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-text-muted hover:text-theme-primary transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Stays & Experiences</span>
        </Link>
      </div>

      {/* Host Bio Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-theme-surface border border-theme-border shadow-soft space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <img
            src={provider.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`}
            alt={displayName}
            className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-theme-primary/20 shadow-xs shrink-0"
          />

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Platform Approved Host</span>
              </span>
              <span className="text-xs text-theme-text-subtle bg-theme-bg px-2.5 py-0.5 rounded-full border border-theme-border/60">
                Demonstration Host
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
              {displayName}
            </h1>

            {provider.tagline && (
              <p className="text-sm font-medium text-theme-accent italic">
                “{provider.tagline}”
              </p>
            )}

            <div className="flex items-center gap-4 text-xs text-theme-text-muted flex-wrap pt-1">
              {provider.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-theme-accent" />
                  <span>{provider.location}</span>
                </span>
              )}
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-theme-accent" />
                <span>Languages: {languagesList}</span>
              </span>
            </div>
          </div>
        </div>

        {provider.bio && (
          <div className="pt-4 border-t border-theme-border/70 text-sm text-theme-text-muted leading-relaxed max-w-3xl font-sans">
            {provider.bio}
          </div>
        )}

        {/* Demo disclaimer */}
        <div className="p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-amber-800 leading-relaxed">
          ℹ️ <strong>Demonstration Identity Notice:</strong> This profile represents a verified demonstration operator created for Smart India Hackathon 2026. No real financial charges or reservations occur.
        </div>
      </div>

      {/* Hosted Listings Section */}
      <div className="space-y-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
            Published Services
          </span>
          <h2 className="text-2xl font-serif font-bold text-theme-text mt-1">
            Listings & Experiences by {displayName}
          </h2>
        </div>

        {provider.listings?.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-theme-surface border border-theme-border text-sm text-theme-text-muted">
            No active listings published yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {provider.listings?.map((l) => (
              <div
                key={l.id}
                className="group rounded-2xl bg-theme-surface border border-theme-border overflow-hidden flex flex-col justify-between hover:shadow-elevated transition-all"
              >
                <div>
                  <div className="relative h-52 w-full overflow-hidden bg-theme-bg">
                    <img
                      src={l.image}
                      alt={l.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/90 text-theme-primary backdrop-blur-md capitalize">
                      {l.category}
                    </span>
                    <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-medium bg-black/40 text-white backdrop-blur-md">
                      {l.destination_name || l.destination_slug}
                    </span>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-lg font-serif font-bold text-theme-text line-clamp-1">{l.title}</h3>
                    <p className="text-xs text-theme-accent italic line-clamp-1">{l.tagline}</p>
                    <p className="text-xs text-theme-text-muted line-clamp-3 leading-relaxed">{l.description}</p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-theme-border/60 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-base font-serif font-bold text-theme-primary">{formatINR(l.price)}</span>
                    <span className="text-[10px] text-theme-text-muted"> / {l.price_unit?.replace("_", " ")}</span>
                  </div>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setSelectedListing(l)}
                  >
                    {l.category === "stay" ? "Book Stay" : "Request Experience"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {selectedListing && (
        <BookingModal
          listing={selectedListing}
          isOpen={!!selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}

    </div>
  );
}
export default ProviderProfile;
