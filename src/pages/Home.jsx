import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Compass, 
  ArrowRight, 
  MapPin, 
  Sparkles, 
  BedDouble, 
  HeartHandshake, 
  ChevronRight,
  Landmark,
  Layers,
  Navigation,
  ShieldCheck,
  Search,
  Calendar,
  Wallet,
  Clock,
  ExternalLink
} from "lucide-react";
import { destinations, collections } from "../data/destinations";
import { statesAndUTs, getZoneList } from "../data/statesAndUTs";
import { templesData } from "../data/temples";
import { stays } from "../data/stays";
import { experiences } from "../data/experiences";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { StayCard } from "../components/stays/StayCard";
import TempleCard from "../components/temples/TempleCard";
import { Button } from "../components/ui/Button";

export function Home() {
  const navigate = useNavigate();

  // Search Panel State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All");
  const [locationLoading, setLocationLoading] = useState(false);

  // States Tab Zone
  const [selectedZone, setSelectedZone] = useState("North");

  const zones = ["North", "South", "West", "East", "Central", "Northeast", "Islands"];

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("q", searchQuery.trim());
    if (selectedInterest !== "All") params.set("interest", selectedInterest);
    navigate(`/explore?${params.toString()}`);
  };

  const handleUseLocation = () => {
    setLocationLoading(true);
    if (!navigator.geolocation) {
      navigate("/nearby");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      () => {
        setLocationLoading(false);
        navigate("/nearby");
      },
      () => {
        setLocationLoading(false);
        navigate("/nearby");
      },
      { timeout: 8000 }
    );
  };

  // Filtered States by Zone
  const statesInZone = statesAndUTs.filter(s => s.zone === selectedZone).slice(0, 4);

  // Curated Featured Destinations
  const featuredDestinations = destinations.filter(d => 
    ["jaipur", "varanasi", "munnar", "goa", "udaipur", "hampi"].includes(d.slug)
  );

  // Featured Temples
  const featuredTemples = templesData.slice(0, 3);

  // Featured Stays & Experiences
  const sampleStays = stays.slice(0, 3);
  const sampleExperiences = experiences.slice(0, 2);

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. PREMIUM IMAGE-BACKGROUND HERO */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Large Travel Photography Background with Subtle Dark Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="Majestic Indian Heritage Palace"
            className="w-full h-full object-cover object-center filter brightness-[0.72]"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-black/45 to-black/60" />
        </div>

        {/* Hero Content Area */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-8 sm:pt-12">
          
          {/* Secondary SIH Prototype Label */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white tracking-wide font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>SIH 2026 • Student Prototype (#26204) — Travel & Tourism</span>
          </div>

          {/* Clean Main Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.15] drop-shadow-md">
            Discover India. <br />
            <span className="italic font-normal text-amber-200">Plan a journey that feels like you.</span>
          </h1>

          {/* Short Supporting Line */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/90 leading-relaxed font-sans drop-shadow">
            Explore iconic places, sacred temples, heritage stays and local experiences.
          </p>

          {/* Primary & Secondary Hero Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <Button
              to="/explore"
              variant="primary"
              size="lg"
              className="bg-theme-accent hover:bg-theme-accent/90 text-white font-semibold shadow-elevated px-7 py-3"
            >
              Explore Destinations
            </Button>
            <Button
              to="/planner"
              variant="secondary"
              size="lg"
              className="bg-white/95 hover:bg-white text-theme-primary font-semibold border-white/30 backdrop-blur-md px-7 py-3 shadow-md"
              icon={ArrowRight}
              iconPosition="right"
            >
              Plan My Trip
            </Button>
          </div>

          {/* 2. REFINED HERO SEARCH PANEL */}
          <div className="max-w-4xl mx-auto mt-8 sm:mt-10">
            <form
              onSubmit={handleHeroSearch}
              className="p-4 sm:p-5 rounded-3xl bg-theme-surface/98 backdrop-blur-lg border border-theme-border shadow-elevated grid grid-cols-1 md:grid-cols-12 gap-3 text-left"
            >
              {/* Search Query Input */}
              <div className="md:col-span-5 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted flex items-center gap-1">
                  <Search className="w-3 h-3 text-theme-primary" />
                  <span>State, Destination or Attraction</span>
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g. Jaipur, Varanasi, Srisailam, Taj Mahal..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-xs sm:text-sm text-theme-text placeholder:text-theme-text-subtle focus:outline-none focus:ring-2 focus:ring-theme-primary"
                  />
                </div>
              </div>

              {/* Travel Interest Filter */}
              <div className="md:col-span-4 space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-theme-text-muted flex items-center gap-1">
                  <Compass className="w-3 h-3 text-theme-primary" />
                  <span>Travel Theme</span>
                </label>
                <select
                  value={selectedInterest}
                  onChange={(e) => setSelectedInterest(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-xs sm:text-sm font-medium text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
                >
                  <option value="All">All Travel Themes</option>
                  <option value="Heritage">Heritage & Historic Forts</option>
                  <option value="Spirituality">Temples & Spiritual Shrines</option>
                  <option value="Nature">Nature & Mountain Trails</option>
                  <option value="Beach">Beaches & Coastal Getaways</option>
                  <option value="Art & Craft">Local Artisan & Craft Masterclasses</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="md:col-span-3 flex items-end gap-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="flex-1 justify-center h-[42px] text-xs font-semibold bg-theme-primary hover:bg-theme-primary-hover text-white rounded-xl shadow-xs"
                >
                  Search
                </Button>

                {/* Optional "Use My Location" Proximity Button */}
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={locationLoading}
                  className="h-[42px] px-3 rounded-xl border border-theme-border bg-theme-bg hover:bg-theme-tag text-theme-text text-xs flex items-center justify-center transition-colors shrink-0"
                  title="Find places near your current location"
                >
                  <Navigation className={`w-4 h-4 text-emerald-600 ${locationLoading ? "animate-spin" : ""}`} />
                </button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 3. BROWSE INDIA BY STATE & UNION TERRITORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>36 States & Union Territories</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
              Browse India by Geographic Zone
            </h2>
          </div>

          <Link
            to="/states"
            className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
          >
            <span>View All 36 States & UTs Directory</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Zone Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          {zones.map((zone) => (
            <button
              key={zone}
              type="button"
              onClick={() => setSelectedZone(zone)}
              className={`px-4 py-2 rounded-xl font-medium shrink-0 transition-all ${
                selectedZone === zone
                  ? "bg-theme-primary text-white shadow-xs font-semibold"
                  : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
              }`}
            >
              {zone} India
            </button>
          ))}
        </div>

        {/* States Grid in Zone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statesInZone.map((st) => (
            <Link
              key={st.id}
              to={`/explore?state=${encodeURIComponent(st.name)}`}
              className="group rounded-2xl overflow-hidden bg-theme-surface border border-theme-border shadow-xs hover:shadow-card transition-all flex flex-col justify-between"
            >
              <div className="relative h-40 w-full overflow-hidden bg-theme-bg">
                <img
                  src={st.image}
                  alt={st.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="font-serif text-lg font-bold leading-tight">
                    {st.name}
                  </h3>
                  <p className="text-[11px] text-amber-200">Capital: {st.capital}</p>
                </div>
              </div>

              <div className="p-3.5 space-y-2">
                <p className="text-xs text-theme-text-muted line-clamp-2">
                  {st.description}
                </p>
                <div className="text-[11px] font-semibold text-theme-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Explore circuits in {st.name}</span>
                  <ChevronRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. FEATURED CURATED DESTINATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme-border pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
              Curated Editorial Highlights
            </span>
            <h2 className="text-3xl font-serif font-bold text-theme-text mt-1">
              Iconic Indian Heritage Circuits
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-muted mt-1 max-w-xl">
              Authentic architecture, vibrant craft communities, and transparent estimated daily budgets.
            </p>
          </div>

          <Link
            to="/explore"
            className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
          >
            <span>Explore All {destinations.length} Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Featured Grid with 100% Accurate Verified Photographs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </section>

      {/* 5. TEMPLES & SPIRITUAL JOURNEYS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-amber-950/10 dark:bg-amber-950/30 border border-amber-500/20 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-amber-500/20 text-amber-800 dark:text-amber-300">
                <Landmark className="w-3.5 h-3.5" />
                <span>Sacred India & Pilgrimage Etiquette</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
                Temples & Spiritual Journeys
              </h2>
              <p className="text-xs sm:text-sm text-theme-text-muted leading-relaxed">
                Discover the architectural grandeur and sacred serenity of India’s most revered Jyotirlingas, Shakti Peethas, and Divya Desams with verified visitor guidelines and direct official administration links.
              </p>
            </div>

            <Link
              to="/temples"
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-sm"
            >
              <span>Explore All Temples</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Temples Cards Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>

          {/* Official Portal Guarantee Notice */}
          <div className="p-3 bg-white/70 dark:bg-stone-900/70 border border-amber-500/20 rounded-xl text-[11px] text-theme-text-muted flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Official Portal Guarantee:</strong> YatraVista redirects all seva booking and darshan passes to verified government Devasthanams and temple administration trusts without ticket scalping.
            </span>
          </div>
        </div>
      </section>

      {/* 6. SAMPLE STAYS & LOCAL EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Heritage Stays */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
                Demonstration Accommodations
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text mt-1">
                Authentic Heritage Stays & Homestays
              </h2>
            </div>
            <Link
              to="/stays"
              className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
            >
              <span>View All Stays</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {sampleStays.map((stay) => (
              <StayCard key={stay.id} stay={stay} />
            ))}
          </div>
        </div>

        {/* Local Experiences */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-theme-border pb-4">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
                Artisan Immersions & Guided Walks
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text mt-1">
                Connect Directly with Local Craft Masters
              </h2>
            </div>
            <Link
              to="/experiences"
              className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-1"
            >
              <span>View All Experiences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleExperiences.map((exp) => (
              <div
                key={exp.id}
                className="p-6 rounded-3xl bg-theme-surface border border-theme-border shadow-xs hover:shadow-card transition-all flex flex-col sm:flex-row gap-5"
              >
                <img
                  src={exp.image}
                  alt={exp.title}
                  className="w-full sm:w-44 h-40 object-cover rounded-2xl shrink-0"
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
                    <h3 className="text-base font-serif font-bold text-theme-text">
                      {exp.title}
                    </h3>
                    <p className="text-xs text-theme-text-muted leading-relaxed mt-1 line-clamp-2">
                      {exp.description}
                    </p>
                    <span className="text-[11px] text-theme-text-subtle block mt-1">
                      Hosted by: {exp.provider}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-theme-border/60 flex items-center justify-between">
                    <span className="text-sm font-bold text-theme-primary font-serif">
                      ₹{exp.pricePerPerson?.toLocaleString('en-IN')}
                      <span className="text-[10px] text-theme-text-muted font-normal"> / person</span>
                    </span>
                    <Button
                      to={`/planner?destination=${exp.destinationSlug}`}
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
        </div>

      </section>

      {/* 7. THREE-STEP USER WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-theme-surface border border-theme-border shadow-card space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
              Frictionless Travel Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
              How YatraVista Works
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-muted">
              Three connected steps to discover, calculate, and coordinate authentic Indian journeys.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-theme-bg/60 border border-theme-border/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-theme-primary-light text-theme-primary font-serif font-bold text-lg flex items-center justify-center mx-auto shadow-xs">
                1
              </div>
              <h3 className="font-serif font-bold text-theme-text text-base">
                Discover Authentic India
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Filter destinations across 36 States & UTs by geographic zone, heritage themes, temples, and verified attractions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-theme-bg/60 border border-theme-border/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-theme-accent-light text-theme-accent font-serif font-bold text-lg flex items-center justify-center mx-auto shadow-xs">
                2
              </div>
              <h3 className="font-serif font-bold text-theme-text text-base">
                Build & Optimize Itineraries
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Generate 1-7 day schedules with transparent math across lodging, dining, local transport, and activity slots.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-theme-bg/60 border border-theme-border/60 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 font-serif font-bold text-lg flex items-center justify-center mx-auto shadow-xs">
                3
              </div>
              <h3 className="font-serif font-bold text-theme-text text-base">
                Save & Request Bookings
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Bookmark places to your wishlist, save plans, and submit demonstration booking requests directly to verified hosts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. INSPIRING FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-theme-nav text-white p-8 sm:p-12 md:p-16 text-center shadow-xl border border-white/10">
          <img
            src="https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=80"
            alt="Scenic India"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Ready to embark on your next Indian odyssey?
            </h2>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
              Create a custom multi-day itinerary with transparent budget estimates, verified temple etiquette, and authentic heritage stays.
            </p>
            <div className="pt-2 flex flex-wrap justify-center gap-3">
              <Button
                to="/planner"
                variant="primary"
                size="lg"
                className="bg-theme-accent hover:bg-theme-accent/90 text-white font-semibold px-8 py-3.5 shadow-elevated"
              >
                Launch Smart Trip Planner
              </Button>
              <Button
                to="/temples"
                variant="secondary"
                size="lg"
                className="bg-white/90 hover:bg-white text-theme-primary font-semibold px-6 py-3.5"
              >
                Explore Sacred Temples
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
export default Home;
