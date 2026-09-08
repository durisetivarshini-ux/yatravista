import React from "react";
import { 
  ShieldCheck, 
  Target, 
  Lightbulb, 
  Users, 
  CheckCircle2, 
  Clock, 
  Layers,
  Code,
  Compass,
  ArrowRight
} from "lucide-react";
import { SIHEmblem } from "../components/ui/SIHEmblem";
import { Button } from "../components/ui/Button";

export function About() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* 1. EDITORIAL HEADER & SIH BADGE */}
      <div className="border-b border-theme-border pb-8 space-y-4">
        <SIHEmblem variant="card" />

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-theme-text">
          About the YatraVista Prototype
        </h1>

        <p className="text-base sm:text-lg text-theme-text-muted max-w-3xl leading-relaxed">
          A student innovation prototype developed for the Smart India Hackathon 2026 (Travel & Tourism Theme, Problem ID #26204). Designed to bridge the gap between fragmented tourism discovery, opaque budget forecasting, and marginalized local artisan economies.
        </p>

        <div className="p-4 rounded-2xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted leading-relaxed">
          <p>
            <strong>Student Prototype Disclosure:</strong> YatraVista is an independent academic demonstration project. It is not affiliated with or endorsed by any government agency. All prices, stays, and listings shown are curated demonstration data to test client-side trip planning algorithms.
          </p>
        </div>
      </div>

      {/* 2. THE TOURISM PROBLEM */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              The Tourism Challenges We Address
            </h2>
            <p className="text-xs text-theme-text-muted">
              Identified friction points in contemporary Indian leisure & cultural travel
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-theme-text-muted leading-relaxed">
          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-2 shadow-xs">
            <h3 className="font-serif font-bold text-sm text-theme-text">
              1. Fragmented & Overwhelming Discovery
            </h3>
            <p>
              Travellers often juggle 6 to 10 disconnected blogs, map tabs, and reviews to plan a simple 4-day tour. High-traffic commercial listings overshadow intimate heritage experiences.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-2 shadow-xs">
            <h3 className="font-serif font-bold text-sm text-theme-text">
              2. Opaque Budget Forecasting
            </h3>
            <p>
              Most travel planners display hotel rates without factoring in realistic per-person meal expenses, local vehicle hire, and site tickets, leading to unexpected trip cost overruns.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-theme-surface border border-theme-border space-y-2 shadow-xs">
            <h3 className="font-serif font-bold text-sm text-theme-text">
              3. Exclusion of Grassroots Artisans
            </h3>
            <p>
              Small-scale homestays, rural guides, and generational handloom weavers struggle to gain visibility on commission-heavy global booking portals.
            </p>
          </div>
        </div>
      </section>

      {/* 3. THE YATRAVISTA SOLUTION & WORKFLOW */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-theme-primary-light text-theme-primary flex items-center justify-center shrink-0">
            <Lightbulb className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Implemented End-to-End Workflow
            </h2>
            <p className="text-xs text-theme-text-muted">
              From inspiration to actionable itinerary with zero sign-up friction
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border space-y-2">
            <span className="w-6 h-6 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-[11px]">1</span>
            <h4 className="font-serif font-bold text-sm text-theme-text">Discovery & Compare</h4>
            <p className="text-theme-text-muted">Filter 8 curated Indian regions and compare up to 3 destinations side-by-side.</p>
          </div>
          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border space-y-2">
            <span className="w-6 h-6 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-[11px]">2</span>
            <h4 className="font-serif font-bold text-sm text-theme-text">Stays & Workshops</h4>
            <p className="text-theme-text-muted">Attach boutique homestays and community artisan workshops to your itinerary.</p>
          </div>
          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border space-y-2">
            <span className="w-6 h-6 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-[11px]">3</span>
            <h4 className="font-serif font-bold text-sm text-theme-text">Algorithm & Optimizer</h4>
            <p className="text-theme-text-muted">Generate day-by-day plan with transparent math, slot reordering, and budget optimizer.</p>
          </div>
          <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border space-y-2">
            <span className="w-6 h-6 rounded-full bg-theme-primary text-white flex items-center justify-center font-bold text-[11px]">4</span>
            <h4 className="font-serif font-bold text-sm text-theme-text">Vault & Export</h4>
            <p className="text-theme-text-muted">Manage checklists, export/import JSON itineraries, and print formatted PDFs.</p>
          </div>
        </div>
      </section>

      {/* 4. TECHNOLOGY JUSTIFICATION */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl font-serif font-bold text-theme-text">
              Technology Stack Justification
            </h2>
            <p className="text-xs text-theme-text-muted">
              Modern frontend architecture chosen for high responsiveness, zero latency, and zero backend cost
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-theme-text-muted">
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-1">
            <strong className="text-theme-text text-sm block">React + Vite</strong>
            <p>Fast client-side reactivity enabling instantaneous multi-day schedule generation and budget recalculation without page refreshes.</p>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-1">
            <strong className="text-theme-text text-sm block">TailwindCSS + CSS Tokens</strong>
            <p>Provides 4 switchable color themes (Royal Sandstone, Kerala Rainforest, Varanasi Twilight, Kashmir Mist) with accessible contrast.</p>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-1">
            <strong className="text-theme-text text-sm block">LocalStorage with Versioned Schema</strong>
            <p>Guarantees privacy and offline persistence without requiring user accounts or database servers.</p>
          </div>
          <div className="p-4 rounded-xl bg-theme-surface border border-theme-border space-y-1">
            <strong className="text-theme-text text-sm block">JSON Serialization & Print Engine</strong>
            <p>Clean portability for importing/exporting trip blueprints and producing ink-friendly printable PDFs.</p>
          </div>
        </div>
      </section>

      {/* 5. ROADMAP & LIMITATIONS */}
      <section className="space-y-6">
        <div className="p-6 rounded-3xl bg-theme-surface border border-theme-border space-y-4">
          <h3 className="text-lg font-serif font-bold text-theme-text">Current Capabilities & Future Integrations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-theme-text-muted">
            <div className="space-y-2">
              <span className="font-bold text-emerald-700 block uppercase tracking-wider text-[11px]">Implemented in Prototype:</span>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>8 Curated Indian destinations with regional details</li>
                <li>Side-by-side Destination & Stay comparison tools</li>
                <li>Deterministic rule-based multi-day itinerary generation</li>
                <li>Itemized room, meal, vehicle, and ticket cost math</li>
                <li>Over-budget optimizer with lower-cost recommendations</li>
                <li>Trip packing & preparation checklist</li>
                <li>JSON export/import and print stylesheets</li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-theme-accent block uppercase tracking-wider text-[11px]">Future Production Integrations:</span>
              <ul className="space-y-1.5 list-disc list-inside">
                <li>Direct live hotel API feeds (e.g. StayFlex / Booking protocols)</li>
                <li>ONDC (Open Network for Digital Commerce) unified tourism protocol</li>
                <li>State tourism board GIS mapping & crowd density feeds</li>
                <li>Multilingual voice navigation (Hindi, Tamil, Bengali, Marathi)</li>
              </ul>
            </div>
          </div>

          <div className="pt-4 border-t border-theme-border flex items-center justify-between">
            <Button to="/planner" variant="primary" size="md" icon={Compass}>
              Try Trip Planner
            </Button>
            <Button to="/showcase" variant="secondary" size="md" icon={Code}>
              View Architecture & Code
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
export default About;
