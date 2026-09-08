import React from "react";
import { Link } from "react-router-dom";
import { 
  Scale, 
  X, 
  MapPin, 
  Calendar, 
  Wallet, 
  Sparkles, 
  BedDouble, 
  ArrowRight,
  Clock
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useTrip } from "../../context/TripContext";
import { stays } from "../../data/stays";
import { experiences } from "../../data/experiences";
import { formatINR } from "../../utils/currencyFormatter";

export function DestinationComparison({ isOpen, onClose }) {
  const { comparedDestinations, removeComparedDestination, clearComparedDestinations } = useTrip();

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Compare Indian Destinations (${comparedDestinations.length}/3)`}
      maxWidth="max-w-6xl"
    >
      <div className="space-y-6">
        
        {comparedDestinations.length === 0 ? (
          <div className="text-center py-12 space-y-3">
            <Scale className="w-10 h-10 text-theme-text-muted mx-auto" />
            <h4 className="text-base font-serif font-bold text-theme-text">
              No Destinations in Comparison
            </h4>
            <p className="text-xs text-theme-text-muted max-w-sm mx-auto">
              Select "Compare Destination" on up to 3 destination cards to view a side-by-side comparison of budgets, seasons, and highlights.
            </p>
            <Button onClick={onClose} variant="primary" size="sm">
              Explore Destinations
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            
            <div className="flex items-center justify-between pb-2 border-b border-theme-border text-xs text-theme-text-muted">
              <span>Comparing {comparedDestinations.length} regional destination(s)</span>
              <button
                type="button"
                onClick={clearComparedDestinations}
                className="text-theme-accent hover:underline font-medium cursor-pointer"
              >
                Clear all
              </button>
            </div>

            {/* Comparison Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-${Math.max(1, comparedDestinations.length)} gap-6 overflow-x-auto`}>
              {comparedDestinations.map((dest) => {
                const destStays = stays.filter(s => s.destinationSlug === dest.slug);
                const destExp = experiences.filter(e => e.destinationSlug === dest.slug);

                return (
                  <div
                    key={dest.slug}
                    className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-card flex flex-col justify-between space-y-5 relative"
                  >
                    {/* Top remove button */}
                    <button
                      type="button"
                      onClick={() => removeComparedDestination(dest.slug)}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-md z-10 transition-colors"
                      title="Remove from comparison"
                      aria-label={`Remove ${dest.name}`}
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Image & Header */}
                    <div className="space-y-3">
                      <div className="relative h-40 rounded-xl overflow-hidden bg-theme-bg">
                        <img
                          src={dest.heroImage}
                          alt={dest.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                        <div className="absolute bottom-3 left-3 text-white">
                          <span className="text-[10px] font-semibold uppercase tracking-wider bg-theme-primary/80 px-2 py-0.5 rounded-md">
                            {dest.region} India
                          </span>
                          <h4 className="text-xl font-serif font-bold text-white mt-1">
                            {dest.name}
                          </h4>
                          <span className="text-xs text-white/80">{dest.state}</span>
                        </div>
                      </div>

                      <p className="text-xs text-theme-accent italic font-serif">
                        “{dest.tagline}”
                      </p>
                    </div>

                    {/* Metrics Table */}
                    <div className="space-y-3 text-xs divide-y divide-theme-border/60">
                      
                      {/* Suggested Duration */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-theme-text-muted flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Duration</span>
                        </span>
                        <strong className="text-theme-text">{dest.suggestedDuration}</strong>
                      </div>

                      {/* Best Season */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-theme-text-muted flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Best Season</span>
                        </span>
                        <strong className="text-theme-text">{dest.bestSeason}</strong>
                      </div>

                      {/* Sample Daily Budget */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-theme-text-muted flex items-center gap-1.5">
                          <Wallet className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Sample Budget</span>
                        </span>
                        <strong className="text-theme-primary font-serif">
                          ~{formatINR(dest.dailyBudgetEstimate)} / day
                        </strong>
                      </div>

                      {/* Inventory Count */}
                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-theme-text-muted flex items-center gap-1.5">
                          <BedDouble className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Curated Stays</span>
                        </span>
                        <span className="font-semibold text-theme-text">{destStays.length} verified stays</span>
                      </div>

                      <div className="pt-2 flex items-center justify-between">
                        <span className="text-theme-text-muted flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-theme-primary" />
                          <span>Artisan Workshops</span>
                        </span>
                        <span className="font-semibold text-theme-text">{destExp.length} local experiences</span>
                      </div>

                      {/* Key Interests */}
                      <div className="pt-2 space-y-1.5">
                        <span className="text-theme-text-muted block font-semibold text-[11px] uppercase tracking-wider">
                          Key Themes:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {dest.travelInterests?.map(i => (
                            <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                              {i}
                            </span>
                          ))}
                        </div>
                      </div>

                    </div>

                    {/* Action */}
                    <div className="pt-3 border-t border-theme-border">
                      <Button
                        to={`/planner?destination=${dest.slug}`}
                        onClick={onClose}
                        variant="primary"
                        size="sm"
                        className="w-full justify-center text-xs font-semibold"
                        icon={ArrowRight}
                        iconPosition="right"
                      >
                        Plan Trip in {dest.name}
                      </Button>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>
        )}

      </div>
    </Modal>
  );
}
export default DestinationComparison;
