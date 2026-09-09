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
  ExternalLink,
  Flame,
  Mountain,
  Waves,
  Palette
} from "lucide-react";
import { destinations } from "../data/destinations";
import { statesAndUTs } from "../data/statesAndUTs";
import { templesData } from "../data/temples";
import { stays } from "../data/stays";
import { experiences } from "../data/experiences";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { StayCard } from "../components/stays/StayCard";
import TempleCard from "../components/temples/TempleCard";
import { Button } from "../components/ui/Button";

// Choose your kind of journey categories
const JOURNEY_CATEGORIES = [
  {
    id: "Heritage",
    title: "Heritage",
    subtitle: "Forts & Palaces",
    image: "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80",
    link: "/explore?interest=Heritage",
    icon: Landmark,
  },
  {
    id: "Temples",
    title: "Temples",
    subtitle: "Spiritual Journeys",
    image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=600&q=80",
    link: "/temples",
    icon: Flame,
  },
  {
    id: "Nature",
    title: "Nature",
    subtitle: "Mountains & Valleys",
    image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&w=600&q=80",
    link: "/explore?interest=Nature",
    icon: Mountain,
  },
  {
    id: "Beaches",
    title: "Beaches",
    subtitle: "Coastal Escapes",
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80",
    link: "/explore?interest=Coastal",
    icon: Waves,
  },
  {
    id: "Experiences",
    title: "Local Experiences",
    subtitle: "Artisans & Cuisine",
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=600&q=80",
    link: "/experiences",
    icon: Palette,
  },
];

export function Home() {
  const navigate = useNavigate();

  // Search Strip State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedInterest, setSelectedInterest] = useState("All");

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

  // Filtered States by Zone
  const statesInZone = statesAndUTs.filter(s => s.zone === selectedZone).slice(0, 4);

  // Curated Featured Destinations (Standardized cards)
  const featuredDestinations = destinations.filter(d => 
    ["jaipur", "udaipur", "varanasi", "munnar", "goa", "hampi"].includes(d.slug)
  );

  // Featured Temples, Stays, Experiences
  const featuredTemples = templesData.slice(0, 3);
  const sampleStays = stays.slice(0, 3);
  const sampleExperiences = experiences.slice(0, 2);

  return (
    <div className="space-y-16 lg:space-y-20 pb-20">
      
      {/* 1. COMPOSED LEFT-ALIGNED HERO (42% Left Text, 58% Right Image) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column (~42%): Headline, Introduction, Actions */}
          <div className="lg:col-span-5 space-y-6 text-left">
            
            {/* Small Understated Label */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-[0.14em] uppercase font-sans bg-theme-primary-light text-theme-primary border border-theme-primary/15">
              <Sparkles className="w-3.5 h-3.5 text-theme-accent" />
              <span>Your Next Journey Starts Here</span>
            </div>

            {/* Main Headline: Manrope 700 */}
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[72px] font-heading font-extrabold text-theme-primary tracking-tight leading-[1.06]">
              Find your own<br />
              <span className="text-theme-text">India<span className="text-theme-accent">.</span></span>
            </h1>

            {/* Supporting Introduction */}
            <p className="text-base sm:text-lg lg:text-[19px] text-theme-text-muted leading-relaxed font-sans max-w-xl">
              Discover remarkable places, meaningful local experiences and stays worth travelling for.
            </p>

            {/* Hero Action CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Button
                to="/explore"
                variant="primary"
                size="lg"
                className="bg-theme-primary hover:bg-theme-primary-hover text-white font-semibold shadow-elevated px-7 py-3 rounded-xl"
              >
                Explore Destinations
              </Button>
              <Button
                to="/planner"
                variant="secondary"
                size="lg"
                className="bg-theme-surface hover:bg-theme-bg text-theme-primary border-theme-border font-semibold px-7 py-3 rounded-xl shadow-xs"
                icon={ArrowRight}
                iconPosition="right"
              >
                Build My Trip
              </Button>
            </div>

          </div>

          {/* Right Column (~58%): Striking, Bright Indian Destination Photograph */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] sm:aspect-[16/10] w-full rounded-3xl overflow-hidden shadow-elevated border border-theme-border bg-theme-surface">
              <img
                src="https://images.unsplash.com/photo-1615836245337-f5b9b2303f10?auto=format&fit=crop&w=1600&q=85"
                alt="Lake Pichola and City Palace, Udaipur, Rajasthan"
                className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                loading="eager"
              />
              {/* Subtle bottom gradient for location credit readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Accurate Location Caption on Image */}
              <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-6 text-xs font-sans text-white/95 bg-black/45 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5 shadow-sm">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
                <span className="font-medium">Lake Pichola & City Palace, Udaipur, Rajasthan</span>
              </div>
            </div>
          </div>

        </div>

        {/* 2. COMPACT SEARCH STRIP (Directly beneath hero) */}
        <div className="mt-8 sm:mt-12">
          <form
            onSubmit={handleHeroSearch}
            className="p-3 sm:p-4 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            {/* Search Input (Span 6) */}
            <div className="lg:col-span-6 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-text-subtle pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search destination, state, or attraction..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-sm text-theme-text placeholder:text-theme-text-subtle focus:outline-none focus:ring-2 focus:ring-theme-primary font-sans"
                aria-label="Search destination or state"
              />
            </div>

            {/* Travel Interest Dropdown (Span 4) */}
            <div className="lg:col-span-4 relative">
              <Compass className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-theme-accent pointer-events-none" />
              <select
                value={selectedInterest}
                onChange={(e) => setSelectedInterest(e.target.value)}
                className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-sm text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer font-medium"
                aria-label="Filter by travel interest"
              >
                <option value="All">All Travel Themes</option>
                <option value="Heritage">Heritage & Forts</option>
                <option value="Spiritual">Spiritual & Temples</option>
                <option value="Nature">Nature & Mountains</option>
                <option value="Coastal">Beaches & Coastal</option>
                <option value="Art & Craft">Artisans & Crafts</option>
              </select>
            </div>

            {/* Search Action Button (Span 2) */}
            <div className="lg:col-span-2">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-theme-primary hover:bg-theme-primary-hover text-white text-sm font-semibold transition-all shadow-soft flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* 3. CHOOSE YOUR KIND OF JOURNEY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-heading font-bold text-theme-primary tracking-tight">
              Choose your kind of journey
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-muted mt-0.5">
              Explore India across five distinct travel styles
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-semibold text-theme-accent hover:underline flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {JOURNEY_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.id}
                to={cat.link}
                className="group relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-theme-border shadow-xs hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-theme-primary"
              >
                <img
                  src={cat.image}
                  alt={cat.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                
                <div className="absolute inset-0 p-3.5 flex flex-col justify-end text-white">
                  <div className="flex items-center gap-1.5 text-amber-300 mb-1">
                    <Icon className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Style</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-heading font-bold leading-tight">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-white/80 font-sans line-clamp-1 mt-0.5">
                    {cat.subtitle}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. CURATED DESTINATIONS (Uniform 3-Column Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-theme-primary-light text-theme-primary mb-1.5">
              <Landmark className="w-3 h-3" />
              <span>Curated Circuits</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-theme-primary tracking-tight">
              Featured Indian Destinations
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-muted mt-0.5">
              Handpicked heritage cities, tranquil backwaters, and cultural capitals
            </p>
          </div>
          <Link
            to="/explore"
            className="text-xs sm:text-sm font-semibold text-theme-accent hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All 36 Destinations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </section>

      {/* 5. BROWSE BY STATE & UNION TERRITORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-theme-surface rounded-3xl border border-theme-border p-6 sm:p-8 lg:p-10 shadow-sm space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-theme-accent-light text-theme-accent mb-1.5">
                <Layers className="w-3 h-3" />
                <span>Pan-India Coverage</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-theme-primary tracking-tight">
                Browse by State & Union Territory
              </h2>
              <p className="text-xs sm:text-sm text-theme-text-muted mt-0.5">
                All 28 States and 8 Union Territories catalogued with top attractions and cultural summaries
              </p>
            </div>
            <Link
              to="/states"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-theme-primary hover:text-theme-primary-hover hover:underline"
            >
              <span>View All 36 States & UTs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Regional Zone Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-theme-border/60">
            {zones.map((zone) => (
              <button
                key={zone}
                type="button"
                onClick={() => setSelectedZone(zone)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedZone === zone
                    ? "bg-theme-primary text-white shadow-xs"
                    : "bg-theme-bg text-theme-text-muted hover:text-theme-text hover:bg-theme-tag"
                }`}
              >
                {zone} India
              </button>
            ))}
          </div>

          {/* States Cards in Selected Zone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {statesInZone.map((state) => (
              <Link
                key={state.id}
                to={`/states/${state.id}`}
                className="group relative h-48 rounded-2xl overflow-hidden border border-theme-border shadow-xs hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={state.image}
                  alt={state.name}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300">
                    {state.type} • {state.zone}
                  </span>
                  <h3 className="text-base font-heading font-bold text-white leading-tight mt-0.5">
                    {state.name}
                  </h3>
                  <p className="text-[11px] text-white/80 font-sans line-clamp-1 mt-1">
                    {state.tagline}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TEMPLES & SPIRITUAL SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-theme-accent-light text-theme-accent mb-1.5">
              <Flame className="w-3 h-3" />
              <span>Sacred Shrines & Pilgrimage</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-theme-primary tracking-tight">
              Temples & Spiritual Journeys
            </h2>
            <p className="text-xs sm:text-sm text-theme-text-muted mt-0.5">
              Verified darshan timings, dress code guidelines, and direct booking links
            </p>
          </div>
          <Link
            to="/temples"
            className="text-xs sm:text-sm font-semibold text-theme-accent hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Explore All Temples</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredTemples.map((temple) => (
            <TempleCard key={temple.id} temple={temple} />
          ))}
        </div>
      </section>

      {/* 7. HERITAGE STAYS & ARTISAN EXPERIENCES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Stays Spotlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BedDouble className="w-5 h-5 text-theme-primary" />
                <h3 className="text-xl font-heading font-bold text-theme-primary">
                  Authentic Heritage Stays
                </h3>
              </div>
              <Link to="/stays" className="text-xs font-semibold text-theme-accent hover:underline">
                View All Stays
              </Link>
            </div>
            <div className="space-y-3">
              {sampleStays.map((stay) => (
                <StayCard key={stay.id} stay={stay} compact={true} />
              ))}
            </div>
          </div>

          {/* Artisan Experiences Spotlight */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-theme-accent" />
                <h3 className="text-xl font-heading font-bold text-theme-primary">
                  Artisan Masterclasses & Walks
                </h3>
              </div>
              <Link to="/experiences" className="text-xs font-semibold text-theme-accent hover:underline">
                View All Experiences
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {sampleExperiences.map((exp) => (
                <Link
                  key={exp.id}
                  to={`/experiences/${exp.id}`}
                  className="group bg-theme-surface rounded-2xl border border-theme-border overflow-hidden shadow-xs hover:shadow-elevated transition-all flex flex-col"
                >
                  <div className="h-36 overflow-hidden relative">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/95 text-theme-primary">
                      {exp.category}
                    </span>
                  </div>
                  <div className="p-3.5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-heading font-bold text-sm text-theme-text line-clamp-1 group-hover:text-theme-primary">
                        {exp.title}
                      </h4>
                      <p className="text-xs text-theme-text-muted line-clamp-2 mt-1">
                        {exp.shortDescription}
                      </p>
                    </div>
                    <div className="pt-2 mt-2 border-t border-theme-border/60 flex items-center justify-between text-xs font-semibold text-theme-primary">
                      <span>₹{exp.price} / person</span>
                      <span className="text-[11px] text-theme-accent group-hover:underline">Explore →</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 8. 3-STEP SMART TRAVEL PLANNER CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-theme-primary text-white p-8 sm:p-12 shadow-elevated relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-4 text-left">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/15 text-amber-200 border border-amber-300/30">
              Interactive Itinerary Builder
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-white tracking-tight leading-tight">
              Craft your personalized journey across India in minutes.
            </h2>
            <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed">
              Add iconic landmarks, verified heritage stays, and artisan immersions. Get realistic daily budget breakdowns and downloadable itineraries.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Button
                to="/planner"
                variant="primary"
                size="lg"
                className="bg-theme-accent hover:bg-theme-accent/90 text-white font-semibold shadow-soft px-7 py-3 rounded-xl"
              >
                Launch Smart Trip Planner
              </Button>
              <Button
                to="/explore"
                variant="secondary"
                size="lg"
                className="bg-white/10 hover:bg-white/20 text-white border-white/20 font-semibold px-7 py-3 rounded-xl"
              >
                Browse Destinations First
              </Button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
