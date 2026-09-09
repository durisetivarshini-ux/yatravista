import React, { useState, useEffect } from "react";
import { 
  MapPin, 
  Calendar, 
  Wallet, 
  Users, 
  Compass, 
  Gauge, 
  Check, 
  BedDouble, 
  Sparkles, 
  X,
  AlertCircle
} from "lucide-react";
import { destinations } from "../../data/destinations";
import { formatINR } from "../../utils/currencyFormatter";
import { Button } from "../ui/Button";

const PACE_OPTIONS = [
  {
    id: "relaxed",
    label: "Relaxed",
    description: "1-2 sights/day, afternoon tea & downtime, unhurried dinners",
  },
  {
    id: "balanced",
    label: "Balanced",
    description: "2-3 sights/day, comfortable mix of culture, scenic walks & dining",
  },
  {
    id: "active",
    label: "Active",
    description: "Full day discovery, sunrise hikes, packed cultural trails",
  },
];

const INTEREST_OPTIONS = [
  "Culture",
  "Heritage",
  "Nature",
  "Beaches",
  "Food",
  "Relaxation",
  "Adventure",
  "Spiritual",
  "Art & Craft"
];

export function PlannerForm({
  initialDestination = "jaipur",
  initialDays = 3,
  initialBudget = 35000,
  initialTravelers = 2,
  initialPace = "balanced",
  selectedStay,
  clearSelectedStay,
  selectedExperiences = [],
  removeExperience,
  onGenerate,
  isGenerating = false,
}) {
  const [destinationSlug, setDestinationSlug] = useState(initialDestination);
  const [days, setDays] = useState(initialDays);
  const [travelers, setTravelers] = useState(initialTravelers);
  const [budget, setBudget] = useState(initialBudget);
  const [interests, setInterests] = useState(["Culture", "Heritage", "Food"]);
  const [pace, setPace] = useState(initialPace);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialDestination) setDestinationSlug(initialDestination);
  }, [initialDestination]);

  useEffect(() => {
    if (initialDays) setDays(initialDays);
  }, [initialDays]);

  useEffect(() => {
    if (initialBudget) setBudget(initialBudget);
  }, [initialBudget]);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const validate = () => {
    const errs = {};
    if (!destinationSlug) errs.destination = "Please select a destination";
    if (days < 1 || days > 7) errs.days = "Duration must be between 1 and 7 days";
    if (travelers < 1 || travelers > 10) errs.travelers = "Travellers must be between 1 and 10";
    if (budget < 1000) errs.budget = "Please provide an estimated total budget (min ₹1,000)";
    if (interests.length === 0) errs.interests = "Please select at least one travel interest";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onGenerate({
      destinationSlug,
      days: Number(days),
      travelers: Number(travelers),
      budget: Number(budget),
      interests,
      pace,
      selectedStay,
      selectedExperiences,
    });
  };

  const selectedDestObj = destinations.find((d) => d.slug === destinationSlug);

  return (
    <form onSubmit={handleSubmit} className="bg-theme-surface rounded-2xl border border-theme-border p-6 md:p-8 shadow-card space-y-6">
      
      {/* Header Info */}
      <div className="border-b border-theme-border pb-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
          Customized Tour Configuration
        </span>
        <h2 className="text-xl md:text-2xl font-serif font-bold text-theme-text mt-1">
          Smart Travel Itinerary Generator
        </h2>
        <p className="text-xs text-theme-text-muted mt-1">
          Deterministic rule-based planning powered by curated regional data and transparent travel arithmetic.
        </p>
      </div>

      {/* Grid of Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Destination */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-theme-primary" />
            <span>Destination Circuit</span>
          </label>
          <select
            value={destinationSlug}
            onChange={(e) => setDestinationSlug(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-sm text-theme-text font-medium focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
          >
            {destinations.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name} ({d.state} • {d.region})
              </option>
            ))}
          </select>
          {errors.destination && (
            <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.destination}</p>
          )}
        </div>

        {/* Duration (Days) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-theme-primary" />
            <span>Duration (Days)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="7"
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="flex-1 accent-theme-primary cursor-pointer"
            />
            <span className="w-16 text-center px-2 py-1 rounded-lg bg-theme-bg border border-theme-border text-sm font-bold text-theme-primary">
              {days} {days === 1 ? "Day" : "Days"}
            </span>
          </div>
          <span className="text-[11px] text-theme-text-subtle block">
            {days === 1 ? "Day trip (0 hotel nights)" : `${days - 1} night(s) stay`}
          </span>
          {errors.days && (
            <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.days}</p>
          )}
        </div>

        {/* Number of Travellers */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-theme-primary" />
            <span>Travellers</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="1"
              max="10"
              value={travelers}
              onChange={(e) => setTravelers(Number(e.target.value))}
              className="flex-1 accent-theme-primary cursor-pointer"
            />
            <span className="w-16 text-center px-2 py-1 rounded-lg bg-theme-bg border border-theme-border text-sm font-bold text-theme-primary">
              {travelers} {travelers === 1 ? "Person" : "People"}
            </span>
          </div>
          <span className="text-[11px] text-theme-text-subtle block">
            Needs {Math.ceil(travelers / 2)} room(s) @ double occupancy
          </span>
          {errors.travelers && (
            <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.travelers}</p>
          )}
        </div>

        {/* Total Budget in INR */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5 text-theme-primary" />
            <span>Total Budget (INR)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-theme-text-muted font-bold">
              ₹
            </span>
            <input
              type="number"
              step="500"
              min="1000"
              max="1000000"
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
              placeholder="e.g. 35000"
              className="w-full pl-8 pr-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-sm font-semibold text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
            />
          </div>
          <div className="flex gap-1.5 pt-1">
            {[15000, 30000, 50000].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setBudget(preset)}
                className="px-2 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted hover:text-theme-text cursor-pointer"
              >
                ₹{(preset / 1000)}k
              </button>
            ))}
          </div>
          {errors.budget && (
            <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.budget}</p>
          )}
        </div>

      </div>

      {/* Travel Interests (Multi-select) */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-theme-primary" />
          <span>Travel Interests & Themes (Select all that apply)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {INTEREST_OPTIONS.map((interest) => {
            const isChecked = interests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
                  isChecked
                    ? "bg-theme-primary text-white shadow-xs"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text border border-theme-border/60"
                }`}
              >
                {isChecked && <Check className="w-3 h-3" />}
                <span>{interest}</span>
              </button>
            );
          })}
        </div>
        {errors.interests && (
          <p className="text-xs text-rose-600 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.interests}</p>
        )}
      </div>

      {/* Travel Pace Selector */}
      <div className="space-y-2 pt-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1.5">
          <Gauge className="w-3.5 h-3.5 text-theme-primary" />
          <span>Preferred Travel Pace</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {PACE_OPTIONS.map((opt) => {
            const isSelected = pace === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setPace(opt.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-theme-primary bg-theme-primary-light/50 ring-1 ring-theme-primary"
                    : "border-theme-border bg-theme-bg hover:bg-theme-surface"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-bold ${isSelected ? "text-theme-primary" : "text-theme-text"}`}>
                    {opt.label}
                  </span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-theme-primary" />}
                </div>
                <p className="text-[11px] text-theme-text-muted leading-tight">
                  {opt.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Attached Stay and Experiences Indicator */}
      {(selectedStay || (selectedExperiences && selectedExperiences.length > 0)) && (
        <div className="pt-3 border-t border-theme-border/60 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted block">
            Pre-selected Accommodations & Experiences
          </span>
          <div className="flex flex-wrap gap-3">
            {selectedStay && (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-primary-light border border-theme-primary/30 text-xs text-theme-primary font-medium">
                <BedDouble className="w-4 h-4" />
                <span>Stay: <strong>{selectedStay.name}</strong> ({formatINR(selectedStay.pricePerNight)}/nt)</span>
                <button
                  type="button"
                  onClick={clearSelectedStay}
                  className="p-1 hover:bg-theme-primary/10 rounded-full ml-1 cursor-pointer"
                  title="Remove selected stay"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {selectedExperiences?.map((exp) => (
              <div
                key={exp.id}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-theme-accent-light border border-theme-accent/30 text-xs text-theme-text font-medium"
              >
                <Sparkles className="w-4 h-4 text-theme-accent" />
                <span>Exp: <strong>{exp.title}</strong> ({formatINR(exp.pricePerPerson)}/person)</span>
                <button
                  type="button"
                  onClick={() => removeExperience(exp.id)}
                  className="p-1 hover:bg-black/10 rounded-full ml-1 cursor-pointer"
                  title="Remove experience"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submit Action */}
      <div className="pt-4 border-t border-theme-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-theme-text-muted text-center sm:text-left">
          <span>Target Destination: <strong>{selectedDestObj?.name}</strong> • Approx daily baseline: {formatINR(selectedDestObj?.dailyBudgetEstimate || 3500)}/day</span>
        </div>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={isGenerating}
          className="w-full sm:w-auto font-semibold px-8 cursor-pointer"
        >
          {isGenerating ? "Synthesizing Itinerary..." : "Generate Day-by-Day Itinerary"}
        </Button>
      </div>

    </form>
  );
}
