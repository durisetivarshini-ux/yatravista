import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  HeartHandshake, 
  Check, 
  AlertCircle,
  Info,
  ShieldCheck,
  Eye,
  Calendar,
  ArrowUpRight
} from "lucide-react";
import { experiences, experienceCategories } from "../data/experiences";
import { destinations } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { BookingModal } from "../components/bookings/BookingModal";

export function Experiences() {
  const { 
    selectedExperiences, 
    addExperienceToTrip, 
    removeExperienceFromTrip, 
    selectedStay 
  } = useTrip();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState("All");
  const [destinationMismatchModal, setDestinationMismatchModal] = useState(null);
  const [detailedExperience, setDetailedExperience] = useState(null);
  const [bookingTarget, setBookingTarget] = useState(null);

  const filteredExperiences = useMemo(() => {
    return experiences.filter((exp) => {
      if (selectedCategory !== "All" && exp.category !== selectedCategory) {
        return false;
      }
      if (selectedDestination !== "All" && exp.destinationSlug !== selectedDestination) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedDestination]);

  const handleAddExperience = (exp) => {
    if (selectedStay && selectedStay.destinationSlug !== exp.destinationSlug) {
      setDestinationMismatchModal({
        experience: exp,
        currentDestination: selectedStay.destinationSlug,
        newDestination: exp.destinationSlug,
      });
      return;
    }
    addExperienceToTrip(exp);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-theme-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-accent-light text-theme-accent">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Local Community Engagements</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-theme-text">
          Authentic Artisan & Cultural Experiences
        </h1>
        <p className="text-sm text-theme-text-muted max-w-2xl leading-relaxed">
          Step inside generational craft studios, natural dye workshops, spice estates, and heritage music chambers. Every experience connects directly with local master practitioners.
        </p>

        <div className="p-3.5 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted flex items-start gap-2.5">
          <Info className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
          <span>
            <strong>Demonstrator Booking Scope:</strong> Workshop dates, sample rates, and schedules are designed for SIH prototype #26204. You can submit a demonstration booking request or bundle estimates into your smart trip itinerary.
          </span>
        </div>
      </div>

      {/* "Why Choose Local?" Educational Section */}
      <section className="p-8 rounded-3xl bg-theme-surface border border-theme-border shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-primary-light text-theme-primary flex items-center justify-center shrink-0">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-serif font-bold text-theme-text">
              Why Support Grassroots & Local Tourism?
            </h2>
            <p className="text-xs text-theme-text-muted">
              The ethical framework behind Smart India Hackathon problem statement #26204
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-theme-text-muted leading-relaxed">
          <div className="space-y-2 p-4 rounded-xl bg-theme-bg/60 border border-theme-border/60">
            <h3 className="font-serif font-bold text-theme-text text-sm">
              Direct Economic Benefit
            </h3>
            <p>
              Traditional tourism aggregators often retain 25-40% in platform fees. Direct community booking models ensure maximum revenue reaches artisan families and indigenous guides.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-theme-bg/60 border border-theme-border/60">
            <h3 className="font-serif font-bold text-theme-text text-sm">
              Intangible Heritage Revival
            </h3>
            <p>
              Centuries-old techniques like Bagru Dabu mud-resist printing and Banaras jacquard silk weaving depend on active patronage. Immersive workshops give craft elders a platform to teach younger generations.
            </p>
          </div>

          <div className="space-y-2 p-4 rounded-xl bg-theme-bg/60 border border-theme-border/60">
            <h3 className="font-serif font-bold text-theme-text text-sm">
              Low Environmental Footprint
            </h3>
            <p>
              Small-batch walking tours, non-motorized canoe excursions in Goan mangroves, and organic coffee cuppings disperse tourist impact away from congested monument gates into rural hinterlands.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="bg-theme-surface rounded-2xl border border-theme-border p-5 shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted mr-1">
            Category:
          </span>
          {experienceCategories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`py-1.5 px-3 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                  isActive
                    ? "bg-theme-primary text-white font-semibold shadow-xs"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text hover:bg-theme-border"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Destination Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-theme-text-muted">Region:</span>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-3 py-1.5 rounded-xl text-xs bg-theme-bg text-theme-text border border-theme-border focus:outline-none focus:ring-1 focus:ring-theme-primary"
          >
            <option value="All">All Circuits</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} ({d.state})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Grid of Experiences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => {
          const isSelected = selectedExperiences?.some((item) => item.id === exp.id);
          const destObj = destinations.find((d) => d.slug === exp.destinationSlug);

          const bookableListing = {
            id: exp.id,
            provider_id: "usr-provider-01",
            destination_slug: exp.destinationSlug,
            category: "workshop",
            title: exp.title,
            tagline: exp.provider,
            price: exp.pricePerPerson,
            price_unit: "per_person",
            capacity: 8,
            address: `${destObj?.name || "Jaipur"}, ${destObj?.state || "India"}`,
            description: exp.description,
            image: exp.image,
            cancellation_policy: "Free cancellation up to 24 hours prior to session."
          };

          return (
            <article
              key={exp.id}
              className={`group flex flex-col bg-theme-surface rounded-2xl border transition-all duration-300 hover:shadow-elevated overflow-hidden ${
                isSelected ? "border-theme-primary ring-2 ring-theme-primary/20" : "border-theme-border"
              }`}
            >
              {/* Image & Badges */}
              <div className="relative h-56 w-full overflow-hidden bg-theme-bg/60">
                <img
                  src={exp.image}
                  alt={exp.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold bg-white/90 text-theme-primary backdrop-blur-md shadow-xs">
                  {exp.category}
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                  <div className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-theme-accent" />
                    <span>{destObj?.name || exp.destinationSlug}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-theme-accent" />
                    <span>{exp.duration}</span>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-bold text-theme-text group-hover:text-theme-primary transition-colors">
                    {exp.title}
                  </h3>

                  <p className="text-xs text-theme-text-muted leading-relaxed line-clamp-3 font-sans">
                    {exp.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] text-theme-text-subtle block font-medium">
                      Host Community / Practitioner:
                    </span>
                    <span className="text-xs font-semibold text-theme-text block">
                      {exp.provider}
                    </span>
                  </div>

                  {/* Key Highlights */}
                  <div className="pt-2 space-y-1">
                    {exp.highlights?.slice(0, 2).map((h, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-theme-text-muted">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="line-clamp-1">{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer and Controls */}
                <div className="pt-4 border-t border-theme-border/60 space-y-3">
                  
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-theme-text-subtle block font-medium">
                        Tariff
                      </span>
                      <span className="text-base font-bold text-theme-primary font-serif">
                        {formatINR(exp.pricePerPerson)}
                      </span>
                      <span className="text-[10px] text-theme-text-muted block -mt-0.5">/ person</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setBookingTarget(bookableListing)}
                      >
                        Book Slot
                      </Button>

                      {isSelected ? (
                        <button
                          type="button"
                          onClick={() => removeExperienceFromTrip(exp.id)}
                          className="px-2.5 py-1.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-semibold transition-colors"
                        >
                          In Plan ✓
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddExperience(exp)}
                          className="px-2.5 py-1.5 rounded-xl border border-theme-border text-theme-text hover:bg-theme-bg text-xs font-medium transition-colors"
                        >
                          + Planner
                        </button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </article>
          );
        })}
      </div>

      {/* Booking Modal */}
      {bookingTarget && (
        <BookingModal
          listing={bookingTarget}
          isOpen={!!bookingTarget}
          onClose={() => setBookingTarget(null)}
        />
      )}

      {/* Destination Mismatch Modal */}
      {destinationMismatchModal && (
        <Modal
          isOpen={true}
          onClose={() => setDestinationMismatchModal(null)}
          title="Circuit Mismatch Warning"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold">Different Geographical Location</strong>
                Your selected stay is in <strong>{destinationMismatchModal.currentDestination}</strong>, but this experience takes place in <strong>{destinationMismatchModal.newDestination}</strong>.
              </div>
            </div>

            <p className="text-theme-text-muted">
              Adding this activity will create an itinerary spanning across multiple circuits. Do you want to proceed and add it to your travel plan?
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-theme-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setDestinationMismatchModal(null)}
              >
                Keep Existing Circuit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  addExperienceToTrip(destinationMismatchModal.experience);
                  setDestinationMismatchModal(null);
                }}
              >
                Add Anyway
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default Experiences;
