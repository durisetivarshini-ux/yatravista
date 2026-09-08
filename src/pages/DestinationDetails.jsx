import React from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Bookmark, 
  Clock, 
  ArrowLeft, 
  Sparkles, 
  ArrowRight,
  Share2
} from "lucide-react";
import { destinations } from "../data/destinations";
import { stays } from "../data/stays";
import { experiences } from "../data/experiences";
import { useTrip } from "../context/TripContext";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { StayCard } from "../components/stays/StayCard";

export function DestinationDetails() {
  const { slug } = useParams();
  const { toggleSaveDestination, isDestinationSaved, showToast } = useTrip();

  const destination = destinations.find((d) => d.slug === slug);

  if (!destination) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-3xl font-serif font-bold text-theme-text">
          Destination Not Found
        </h2>
        <p className="text-sm text-theme-text-muted">
          The requested destination guide does not exist in our curated Indian directory.
        </p>
        <Button to="/explore" variant="primary" size="md">
          Back to All Destinations
        </Button>
      </div>
    );
  }

  const isSaved = isDestinationSaved(destination.slug);
  const relatedStays = stays.filter((s) => s.destinationSlug === destination.slug);
  const relatedExperiences = experiences.filter((e) => e.destinationSlug === destination.slug);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast("Destination link copied to clipboard!", "info");
    }
  };

  return (
    <div className="space-y-12 pb-20">
      
      {/* 1. HERO BANNER */}
      <section className="relative h-[65vh] min-h-[450px] flex items-end pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <img
          src={destination.heroImage}
          alt={destination.name}
          className="absolute inset-0 w-full h-full object-cover filter brightness-[0.75]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col md:flex-row md:items-end justify-between gap-6 text-white">
          <div className="space-y-3 max-w-3xl">
            
            {/* Breadcrumb & Navigation */}
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 text-xs text-white/80 hover:text-white mb-2 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Destinations Directory</span>
            </Link>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                {destination.region} India
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-black/40 backdrop-blur-md">
                {destination.state}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-theme-accent text-white backdrop-blur-md">
                Best: {destination.bestSeason}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-white">
              {destination.name}
            </h1>

            <p className="text-sm sm:text-base text-amber-200 font-serif italic">
              “{destination.tagline}”
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => toggleSaveDestination(destination.slug, destination.name)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-medium backdrop-blur-md border transition-all cursor-pointer ${
                isSaved
                  ? "bg-theme-primary text-white border-theme-primary"
                  : "bg-white/20 text-white border-white/30 hover:bg-white/30"
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
              <span>{isSaved ? "Saved to Wishlist" : "Save Destination"}</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="p-2.5 rounded-xl bg-white/20 text-white hover:bg-white/30 backdrop-blur-md border border-white/30 transition-all"
              title="Share destination link"
              aria-label="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>

            <Button
              to={`/planner?destination=${destination.slug}`}
              variant="primary"
              size="md"
              icon={Sparkles}
              iconPosition="right"
              className="bg-theme-accent hover:bg-theme-accent/90 text-white font-semibold shadow-soft"
            >
              Plan a Trip Here
            </Button>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-card grid grid-cols-2 md:grid-cols-4 gap-6 text-xs">
          <div>
            <span className="text-theme-text-subtle font-medium uppercase tracking-wider block text-[10px]">
              Suggested Duration
            </span>
            <span className="text-sm font-bold text-theme-text font-serif">
              {destination.suggestedDuration}
            </span>
          </div>
          <div>
            <span className="text-theme-text-subtle font-medium uppercase tracking-wider block text-[10px]">
              Sample Daily Budget
            </span>
            <span className="text-sm font-bold text-theme-primary font-serif">
              ~{formatINR(destination.dailyBudgetEstimate)} / day
            </span>
          </div>
          <div>
            <span className="text-theme-text-subtle font-medium uppercase tracking-wider block text-[10px]">
              Ideal Traveler Profile
            </span>
            <span className="text-xs font-semibold text-theme-text line-clamp-1">
              {destination.idealFor}
            </span>
          </div>
          <div>
            <span className="text-theme-text-subtle font-medium uppercase tracking-wider block text-[10px]">
              Primary Themes
            </span>
            <div className="flex flex-wrap gap-1 mt-0.5">
              {destination.travelInterests?.slice(0, 2).map((t) => (
                <span key={t} className="px-1.5 py-0.5 rounded bg-theme-tag text-[10px] font-medium text-theme-text-muted">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT: OVERVIEW, ATTRACTIONS, STAYS, EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Overview & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
                About {destination.name}
              </h2>
              <p className="text-sm text-theme-text-muted leading-relaxed font-sans text-justify sm:text-left">
                {destination.fullDescription}
              </p>
            </div>

            {/* Travel Interests Tags */}
            <div className="space-y-2 pt-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted block">
                Travel Styles & Interests
              </span>
              <div className="flex flex-wrap gap-2">
                {destination.travelInterests?.map((interest) => (
                  <span
                    key={interest}
                    className="px-3 py-1 rounded-xl text-xs font-medium bg-theme-tag text-theme-text"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Attractions Grid */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-serif font-bold text-theme-text">
                  Key Attractions & Cultural Landmarks
                </h3>
                <span className="text-xs text-theme-text-muted">
                  Curated with optimal visit windows
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {destination.attractions?.map((att) => (
                  <div
                    key={att.id}
                    className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs hover:border-theme-primary/30 transition-all space-y-2 flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-theme-tag text-theme-text">
                          {att.category}
                        </span>
                        <div className="flex items-center gap-1 text-theme-text-muted">
                          <Clock className="w-3 h-3 text-theme-accent" />
                          <span>{att.duration}</span>
                        </div>
                      </div>

                      <h4 className="text-base font-serif font-bold text-theme-text">
                        {att.name}
                      </h4>
                      <p className="text-xs text-theme-text-muted leading-relaxed mt-1">
                        {att.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-theme-border/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1 text-theme-primary font-medium">
                        <span className="text-[11px] text-theme-text-muted">Est. ticket:</span>
                        <span className="font-bold">{att.cost ? formatINR(att.cost) : "Free"}</span>
                      </div>
                      <span className="text-[11px] text-theme-accent italic capitalize">
                        Best in {att.slot}
                      </span>
                    </div>

                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Sidebar: Plan Card & Gallery */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick Trip Planner Box */}
            <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-card space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
                Smart Itinerary Demo
              </span>
              <h3 className="text-xl font-serif font-bold text-theme-text">
                Build a {destination.name} Odyssey
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Generate a morning-to-evening day-by-day plan with transparent room and transport calculations for {destination.name}.
              </p>

              <div className="p-3.5 rounded-xl bg-theme-bg text-xs space-y-1.5 text-theme-text-muted">
                <div className="flex justify-between">
                  <span>Recommended stay:</span>
                  <strong className="text-theme-text">{destination.suggestedDuration}</strong>
                </div>
                <div className="flex justify-between">
                  <span>Est. daily cost:</span>
                  <strong className="text-theme-primary">{formatINR(destination.dailyBudgetEstimate)}/person</strong>
                </div>
              </div>

              <Button
                to={`/planner?destination=${destination.slug}`}
                variant="primary"
                size="md"
                className="w-full justify-center"
              >
                Launch Planner for {destination.name}
              </Button>
            </div>

            {/* Photo Gallery */}
            {destination.gallery && destination.gallery.length > 0 && (
              <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-3">
                <h4 className="text-sm font-serif font-bold text-theme-text">
                  Glimpses of {destination.name}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {destination.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`${destination.name} scene ${idx + 1}`}
                      className="w-full h-24 object-cover rounded-xl shadow-xs"
                      loading="lazy"
                    />
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

        {/* RELATED STAYS */}
        <div className="space-y-6 pt-6 border-t border-theme-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
                Sample Accommodations
              </span>
              <h3 className="text-2xl font-serif font-bold text-theme-text mt-0.5">
                Stays in and around {destination.name}
              </h3>
            </div>
            <Link
              to="/stays"
              className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
            >
              <span>View All Demonstrator Stays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {relatedStays.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted">
              Sample properties for this destination will be expanded in the upcoming hackathon release.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedStays.map((stay) => (
                <StayCard key={stay.id} stay={stay} />
              ))}
            </div>
          )}
        </div>

        {/* RELATED EXPERIENCES */}
        <div className="space-y-6 pt-6 border-t border-theme-border">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
                Local Community Immersions
              </span>
              <h3 className="text-2xl font-serif font-bold text-theme-text mt-0.5">
                Artisan Workshops & Guided Trails
              </h3>
            </div>
            <Link
              to="/experiences"
              className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {relatedExperiences.length === 0 ? (
            <div className="p-8 text-center rounded-2xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted">
              Community workshops for this destination are currently being onboarded.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedExperiences.map((exp) => (
                <div
                  key={exp.id}
                  className="p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-xs hover:shadow-card transition-all flex flex-col sm:flex-row gap-5"
                >
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full sm:w-44 h-40 object-cover rounded-xl shrink-0"
                    loading="lazy"
                  />
                  <div className="flex-1 flex flex-col justify-between space-y-2">
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-theme-accent-light text-theme-accent">
                          {exp.category}
                        </span>
                        <span className="text-theme-text-muted font-medium">{exp.duration}</span>
                      </div>
                      <h4 className="text-base font-serif font-bold text-theme-text">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-theme-text-muted leading-relaxed mt-1 line-clamp-2">
                        {exp.description}
                      </p>
                      <span className="text-[11px] text-theme-text-subtle block mt-1">
                        Organized by: {exp.provider}
                      </span>
                    </div>

                    <div className="pt-3 border-t border-theme-border/60 flex items-center justify-between">
                      <span className="text-sm font-bold text-theme-primary font-serif">
                        {formatINR(exp.pricePerPerson)}
                        <span className="text-[10px] text-theme-text-muted font-normal"> / person</span>
                      </span>
                      <Button
                        to={`/planner?destination=${destination.slug}`}
                        variant="secondary"
                        size="sm"
                      >
                        Add to Trip
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </section>

    </div>
  );
}
