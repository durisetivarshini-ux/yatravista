import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Compass, 
  ArrowRight, 
  MapPin, 
  Calendar, 
  Wallet, 
  Sparkles, 
  BedDouble, 
  HeartHandshake, 
  ChevronRight
} from "lucide-react";
import { destinations, collections } from "../data/destinations";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { Button } from "../components/ui/Button";

export function Home() {
  const navigate = useNavigate();
  const [searchDestination, setSearchDestination] = useState("jaipur");
  const [searchDays, setSearchDays] = useState(3);
  const [searchBudget, setSearchBudget] = useState(35000);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    navigate(`/planner?destination=${searchDestination}&days=${searchDays}&budget=${searchBudget}`);
  };

  // Curate 3 featured destinations for editorial asymmetry
  const featuredDestination = destinations.find(d => d.slug === "jaipur");
  const secondaryDestinations = destinations.filter(d => ["goa", "munnar", "varanasi"].includes(d.slug));

  return (
    <div className="space-y-20 pb-20">
      
      {/* 1. CINEMATIC EDITORIAL HERO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with warm gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85"
            alt="Majestic Indian Palace & Golden Sunlight"
            className="w-full h-full object-cover object-center filter brightness-[0.78]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-black/40 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-12">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white tracking-wide font-medium shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Curated Indian Journeys • Student Innovation Prototype (SIH #26204)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold text-white tracking-tight leading-[1.12] drop-shadow-sm">
            Discover India. <br />
            <span className="italic font-normal text-amber-200">Make every journey your own.</span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-white/85 leading-relaxed font-sans drop-shadow">
            Experience the cultural soul of India through authentic heritage stays, artisan-led workshops, and intelligent day-by-day itineraries tailored to your time and budget.
          </p>

          {/* Quick CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Button
              to="/planner"
              variant="primary"
              size="lg"
              className="bg-theme-accent hover:bg-theme-accent/90 text-white font-semibold shadow-elevated"
              icon={ArrowRight}
              iconPosition="right"
            >
              Plan My Trip
            </Button>
            <Button
              to="/explore"
              variant="secondary"
              size="lg"
              className="bg-white/90 hover:bg-white text-theme-primary font-semibold border-white/30 backdrop-blur-md"
            >
              Explore Destinations
            </Button>
          </div>

          {/* EDITORIAL SEARCH PANEL */}
          <div className="max-w-4xl mx-auto mt-10">
            <form
              onSubmit={handleHeroSearch}
              className="p-4 sm:p-5 rounded-2xl bg-theme-surface/95 backdrop-blur-md border border-theme-border shadow-elevated grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-left"
            >
              {/* Destination Dropdown */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-theme-primary" />
                  <span>Destination</span>
                </label>
                <select
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-semibold text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary cursor-pointer"
                >
                  {destinations.map((d) => (
                    <option key={d.slug} value={d.slug}>
                      {d.name} ({d.state})
                    </option>
                  ))}
                </select>
              </div>

              {/* Duration Slider/Select */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-theme-primary" />
                  <span>Duration</span>
                </label>
                <select
                  value={searchDays}
                  onChange={(e) => setSearchDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-semibold text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary cursor-pointer"
                >
                  <option value="1">1 Day (Excursion)</option>
                  <option value="2">2 Days (Weekend)</option>
                  <option value="3">3 Days (Recommended)</option>
                  <option value="4">4 Days (Relaxed)</option>
                  <option value="5">5 Days (Immersive)</option>
                  <option value="7">7 Days (Full Circuit)</option>
                </select>
              </div>

              {/* Sample Budget */}
              <div className="space-y-1">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-theme-text-muted flex items-center gap-1">
                  <Wallet className="w-3 h-3 text-theme-primary" />
                  <span>Estimated Budget</span>
                </label>
                <select
                  value={searchBudget}
                  onChange={(e) => setSearchBudget(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-semibold text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary cursor-pointer"
                >
                  <option value="15000">₹15,000 (Budget Friendly)</option>
                  <option value="30000">₹30,000 (Standard Comfort)</option>
                  <option value="50000">₹50,000 (Premium Heritage)</option>
                  <option value="80000">₹80,000 (Luxury Experiential)</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="sm:col-span-3 lg:col-span-1 flex items-end">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full justify-center h-[38px] text-xs font-semibold"
                >
                  Start Planner
                </Button>
              </div>
            </form>
          </div>

        </div>
      </section>

      {/* 1.5 DISCOVERY HUBS SPOTLIGHT (States, Temples, Nearby) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1: Sacred Temples */}
          <Link
            to="/temples"
            className="group p-6 rounded-3xl bg-theme-surface border border-theme-border shadow-elevated hover:border-theme-accent/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-theme-text group-hover:text-theme-accent transition-colors">
                Temples & Spiritual Journeys
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Tirumala, Srisailam, Meenakshi Amman, Kashi Vishwanath, Kedarnath, and Mahakaleshwar with verified etiquette, dress codes, and official portals.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-theme-border/60 flex items-center gap-1.5 text-xs font-semibold text-theme-accent">
              <span>Explore Pilgrimage Guide</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Browse 36 States & UTs */}
          <Link
            to="/states"
            className="group p-6 rounded-3xl bg-theme-surface border border-theme-border shadow-elevated hover:border-theme-primary/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-theme-primary-light text-theme-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-theme-text group-hover:text-theme-primary transition-colors">
                Browse All 36 States & UTs
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Complete geographic coverage across all 28 Indian States and 8 Union Territories with curated tourist circuits and monuments.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-theme-border/60 flex items-center gap-1.5 text-xs font-semibold text-theme-primary">
              <span>View Pan-India Directory</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Nearby & Directions */}
          <Link
            to="/nearby"
            className="group p-6 rounded-3xl bg-theme-surface border border-theme-border shadow-elevated hover:border-emerald-500/50 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-theme-text group-hover:text-emerald-600 transition-colors">
                Nearby Places & Directions
              </h3>
              <p className="text-xs text-theme-text-muted leading-relaxed">
                Use voluntary location access to discover heritage sites and temples closest to you with 1-click external maps navigation.
              </p>
            </div>
            <div className="pt-4 mt-2 border-t border-theme-border/60 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              <span>Find Places Near Me</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

        </div>
      </section>

      {/* 2. THREE-STEP "HOW IT WORKS" WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
            Designed for Meaningful Travel
          </span>
          <h2 className="text-3xl font-serif font-bold text-theme-text">
            From Inspiration to a Reality-Checked Itinerary
          </h2>
          <p className="text-sm text-theme-text-muted">
            Three simple steps to curate authentic Indian trips without hidden costs or chaotic planning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Step 1 */}
          <div className="p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm hover:shadow-card transition-all space-y-4 relative">
            <span className="text-4xl font-serif font-bold text-theme-primary/15 absolute top-6 right-6">
              01
            </span>
            <div className="w-12 h-12 rounded-xl bg-theme-primary-light text-theme-primary flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-theme-text">
              Discover Authentic India
            </h3>
            <p className="text-xs text-theme-text-muted leading-relaxed">
              Explore curated Indian destinations with illustrative daily budgets, seasonal highlights, and cultural heritage insights.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm hover:shadow-card transition-all space-y-4 relative">
            <span className="text-4xl font-serif font-bold text-theme-primary/15 absolute top-6 right-6">
              02
            </span>
            <div className="w-12 h-12 rounded-xl bg-theme-accent-light text-theme-accent flex items-center justify-center">
              <BedDouble className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-theme-text">
              Choose Stays & Experiences
            </h3>
            <p className="text-xs text-theme-text-muted leading-relaxed">
              Compare boutique homestays, royal havelis, and community-led workshops. Add your favorites to your working trip blueprint.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 rounded-2xl bg-theme-surface border border-theme-border shadow-sm hover:shadow-card transition-all space-y-4 relative">
            <span className="text-4xl font-serif font-bold text-theme-primary/15 absolute top-6 right-6">
              03
            </span>
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-theme-text">
              Generate & Save Itinerary
            </h3>
            <p className="text-xs text-theme-text-muted leading-relaxed">
              Receive a transparent morning-afternoon-evening plan with itemized room, dining, and transit calculations. Modify slots and print.
            </p>
          </div>

        </div>
      </section>

      {/* 3. ASYMMETRIC EDITORIAL DESTINATIONS SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-4 border-b border-theme-border">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
              Curated Highlights
            </span>
            <h2 className="text-3xl font-serif font-bold text-theme-text mt-1">
              Featured Regional Destinations
            </h2>
            <p className="text-sm text-theme-text-muted mt-1">
              Immerse yourself in Rajasthan's forts, Kerala's tea mist, and the eternal spiritual rhythm of Varanasi.
            </p>
          </div>

          <Button
            to="/explore"
            variant="secondary"
            size="md"
            icon={ArrowRight}
            iconPosition="right"
          >
            Browse All 8 Destinations
          </Button>
        </div>

        {/* Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDestination && (
            <DestinationCard destination={featuredDestination} featured={true} />
          )}
          {secondaryDestinations.map((dest) => (
            <DestinationCard key={dest.slug} destination={dest} />
          ))}
        </div>
      </section>

      {/* 4. TRAVEL COLLECTIONS */}
      <section className="bg-theme-surface py-16 border-y border-theme-border transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
              Themed Portfolios
            </span>
            <h2 className="text-3xl font-serif font-bold text-theme-text">
              Curated Travel Collections
            </h2>
            <p className="text-sm text-theme-text-muted">
              Choose your travel mood—from regal palaces to coastal breezes and mountain ridgelines.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {collections.map((coll) => (
              <div
                key={coll.id}
                className="group relative rounded-2xl overflow-hidden shadow-card border border-theme-border bg-theme-bg flex flex-col justify-end min-h-[340px] p-6 hover:shadow-elevated transition-all"
              >
                <img
                  src={coll.image}
                  alt={coll.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="relative z-10 space-y-2 text-white">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-white/20 backdrop-blur-md">
                    {coll.badge}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-white">
                    {coll.title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed line-clamp-2 font-sans">
                    {coll.subtitle}
                  </p>
                  <Link
                    to={`/explore?region=${coll.id === 'coastal-retreats' ? 'West' : coll.id === 'mountain-trails' ? 'South' : 'All'}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-amber-300 group-hover:underline pt-2"
                  >
                    <span>Explore Collection</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. LOCAL BUSINESS & ARTISAN SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-theme-primary text-white shadow-elevated relative overflow-hidden">
          
          {/* Subtle background motif */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-white/5 pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Responsible Local Tourism</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-serif font-bold leading-tight">
                Empowering Grassroots Artisans & Family Stays
              </h2>

              <p className="text-sm text-white/80 leading-relaxed max-w-xl">
                Tourism should nurture the communities that host us. By highlighting multi-generational handloom weavers in Varanasi, cashew distillers in Goa, and organic coffee growers in Coorg, YatraVista connects travelers directly with the people who preserve India’s intangible cultural legacy.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="block text-amber-300 font-bold text-lg font-serif">100%</span>
                  <span className="text-white/80">Direct provider clarity</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                  <span className="block text-amber-300 font-bold text-lg font-serif">Zero</span>
                  <span className="text-white/80">Hidden commissions</span>
                </div>
                <div className="p-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 col-span-2 sm:col-span-1">
                  <span className="block text-amber-300 font-bold text-lg font-serif">GI-Tagged</span>
                  <span className="text-white/80">Living Indian crafts</span>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  to="/experiences"
                  variant="secondary"
                  size="md"
                  className="bg-white text-theme-primary hover:bg-white/90 font-semibold"
                >
                  Discover Local Experiences
                </Button>
              </div>
            </div>

            {/* Right Card with quote */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 space-y-4 text-white">
                <div className="inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold bg-amber-300/20 text-amber-300">
                  Demonstration Artisan Profile
                </div>
                <p className="italic font-serif text-base text-amber-100 leading-relaxed">
                  “When a traveler sits on our handloom veranda in Madanpura and learns how zari silk takes 15 days to craft, they don’t just buy a textile—they honor three generations of our family’s devotion.”
                </p>
                <div className="flex items-center gap-3 pt-2 border-t border-white/10 text-xs">
                  <div className="w-8 h-8 rounded-full bg-theme-accent text-white flex items-center justify-center font-bold">
                    M
                  </div>
                  <div>
                    <span className="font-semibold block">Mohammed Ansari</span>
                    <span className="text-white/70 text-[11px]">Illustrative Master Handloom Weaver (Varanasi Demonstration)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6. SMART PLANNER CALLOUT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-theme-surface border border-theme-border shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
              College Demonstration Prototype
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-theme-text">
              Ready to create your custom itinerary?
            </h2>
            <p className="text-sm text-theme-text-muted leading-relaxed">
              Test our deterministic rule-based planner with sample stays, estimated meals, transit rates, and attraction tickets. Save and print your plan with zero sign-up required.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              to="/planner"
              variant="primary"
              size="lg"
              icon={Sparkles}
              iconPosition="right"
              className="font-semibold shadow-soft"
            >
              Open Trip Planner
            </Button>
            <Button
              to="/about"
              variant="secondary"
              size="lg"
            >
              About the SIH Project
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
