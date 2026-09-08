import React, { useState, useMemo } from "react";
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  HeartHandshake, 
  Check, 
  AlertCircle,
  Info,
  ShieldCheck,
  Eye
} from "lucide-react";
import { experiences, experienceCategories } from "../data/experiences";
import { destinations } from "../data/destinations";
import { useTrip } from "../context/TripContext";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

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
          Step inside generational craft studios, natural dye workshops, spice estates, and heritage music chambers. Every experience supports local grassroots practitioners.
        </p>

        <div className="p-3.5 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted flex items-start gap-2.5">
          <Info className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
          <span>
            <strong>Demonstrator Data Notice:</strong> Workshop names, sample rates, and schedules are illustrative curriculum representations designed for SIH prototype #26204. "Add to Trip" bundles the estimated workshop fee into your itinerary breakdown without financial processing.
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
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? "bg-theme-primary text-white shadow-xs"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Destination Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">
            Destination:
          </span>
          <select
            value={selectedDestination}
            onChange={(e) => setSelectedDestination(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
          >
            <option value="All">All Regions</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => {
          const isSelected = selectedExperiences.some((e) => e.id === exp.id);
          const destObj = destinations.find((d) => d.slug === exp.destinationSlug);

          return (
            <article
              key={exp.id}
              className="group flex flex-col bg-theme-surface rounded-2xl border border-theme-border overflow-hidden shadow-xs hover:shadow-card transition-all"
            >
              {/* Image Container */}
              <div className="relative h-52 w-full overflow-hidden bg-theme-bg/60">
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-white/90 text-theme-primary backdrop-blur-md">
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
                  
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-theme-text-subtle block font-medium">
                        Tariff
                      </span>
                      <span className="text-base font-bold text-theme-primary font-serif">
                        {formatINR(exp.pricePerPerson)}
                      </span>
                      <span className="text-[10px] text-theme-text-muted block -mt-0.5">/ person</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setDetailedExperience(exp)}
                        className="p-2 rounded-xl border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                        title="View full experience specifications & etiquette"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {isSelected ? (
                        <Button
                          onClick={() => removeExperienceFromTrip(exp.id)}
                          variant="secondary"
                          size="sm"
                          className="border-rose-200 text-rose-700 hover:bg-rose-50"
                        >
                          Remove from Trip
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleAddExperience(exp)}
                          variant="primary"
                          size="sm"
                        >
                          Add to Trip
                        </Button>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </article>
          );
        })}
      </div>

      {/* Experience Details Modal */}
      {detailedExperience && (
        <Modal
          isOpen={true}
          onClose={() => setDetailedExperience(null)}
          title={detailedExperience.title}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-5 text-xs text-theme-text-muted">
            <div className="relative h-56 rounded-2xl overflow-hidden bg-theme-bg">
              <img
                src={detailedExperience.image}
                alt={detailedExperience.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 backdrop-blur-md">
                  {detailedExperience.category}
                </span>
                <h4 className="text-xl font-serif font-bold mt-1 text-white">
                  {detailedExperience.title}
                </h4>
              </div>
            </div>

            <div className="space-y-3">
              <h5 className="text-sm font-serif font-bold text-theme-text">What You Will Experience</h5>
              <p className="leading-relaxed font-sans">{detailedExperience.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-theme-bg/60 border border-theme-border/60">
              <div>
                <span className="text-[10px] uppercase font-bold text-theme-text-subtle block">Host Community</span>
                <strong className="text-theme-text text-xs">{detailedExperience.provider}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-theme-text-subtle block">Duration & Timing</span>
                <strong className="text-theme-text text-xs">{detailedExperience.duration}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-theme-text-subtle block">Tariff Structure</span>
                <strong className="text-theme-primary text-xs font-serif">{formatINR(detailedExperience.pricePerPerson)} / person</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-theme-text-subtle block">Destination Circuit</span>
                <strong className="text-theme-text text-xs capitalize">{detailedExperience.destinationSlug}</strong>
              </div>
            </div>

            {/* Cultural Etiquette */}
            <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-950 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-900 text-xs">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                <span>Cultural Etiquette & Respectful Conduct</span>
              </div>
              <p className="text-[11px] text-amber-800 leading-relaxed">
                Please remove footwear before stepping onto weaving platforms and sacred chambers. Always ask before photographing artisan elders. Direct fair-trade gratuities are welcome.
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-theme-border">
              <Button onClick={() => setDetailedExperience(null)} variant="secondary" size="sm">
                Close
              </Button>
              <Button
                onClick={() => {
                  handleAddExperience(detailedExperience);
                  setDetailedExperience(null);
                }}
                variant="primary"
                size="sm"
              >
                Add to Trip Planner
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Destination Mismatch Clarification Modal */}
      {destinationMismatchModal && (
        <Modal
          isOpen={true}
          onClose={() => setDestinationMismatchModal(null)}
          title="Destination Alignment Note"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs text-theme-text-muted leading-relaxed">
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-900 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>
                You currently have a selected stay in <strong>{destinationMismatchModal.currentDestination}</strong>, but this experience takes place in <strong>{destinationMismatchModal.newDestination}</strong>.
              </span>
            </div>

            <p>
              Would you like to bundle this experience with your trip?
            </p>

            <div className="pt-3 border-t border-theme-border flex flex-col sm:flex-row justify-end gap-2">
              <Button
                onClick={() => setDestinationMismatchModal(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  addExperienceToTrip(destinationMismatchModal.experience);
                  setDestinationMismatchModal(null);
                }}
                variant="primary"
                size="sm"
              >
                Add Experience
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default Experiences;
