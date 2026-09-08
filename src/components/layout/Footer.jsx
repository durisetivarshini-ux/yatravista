import React from "react";
import { Link } from "react-router-dom";
import { Compass, Sparkles } from "lucide-react";
import { YatraVistaLogo } from "../ui/YatraVistaLogo";
import { SIHEmblem } from "../ui/SIHEmblem";

export function Footer() {
  return (
    <footer className="bg-theme-nav text-white/85 pt-16 pb-12 border-t border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Editorial Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <YatraVistaLogo size="md" inverted={true} />
            <p className="text-sm text-white/70 max-w-sm leading-relaxed">
              An editorial travel discovery and smart trip-planning platform designed for authentic Indian exploration. Supporting local heritage stays, artisan clusters, and responsible tourism.
            </p>
            <div className="pt-2">
              <SIHEmblem variant="badge" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-theme-accent font-semibold">
              Explore Platform
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/explore" className="hover:text-white transition-colors">
                  Destinations Directory
                </Link>
              </li>
              <li>
                <Link to="/stays" className="hover:text-white transition-colors">
                  Heritage & Boutique Stays
                </Link>
              </li>
              <li>
                <Link to="/experiences" className="hover:text-white transition-colors">
                  Local Community Workshops
                </Link>
              </li>
              <li>
                <Link to="/planner" className="hover:text-white transition-colors">
                  Smart Trip Planner
                </Link>
              </li>
              <li>
                <Link to="/saved" className="hover:text-white transition-colors">
                  My Saved Itineraries
                </Link>
              </li>
            </ul>
          </div>

          {/* Featured Destinations */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-theme-accent font-semibold">
              Top Destinations
            </h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>
                <Link to="/destinations/jaipur" className="hover:text-white transition-colors">
                  Jaipur, Rajasthan
                </Link>
              </li>
              <li>
                <Link to="/destinations/goa" className="hover:text-white transition-colors">
                  Goa (Latin Quarters & Coast)
                </Link>
              </li>
              <li>
                <Link to="/destinations/munnar" className="hover:text-white transition-colors">
                  Munnar, Kerala
                </Link>
              </li>
              <li>
                <Link to="/destinations/varanasi" className="hover:text-white transition-colors">
                  Varanasi, Uttar Pradesh
                </Link>
              </li>
              <li>
                <Link to="/destinations/coorg" className="hover:text-white transition-colors">
                  Coorg, Karnataka
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Ethics Disclosures */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-theme-accent font-semibold">
              Project Context
            </h4>
            <p className="text-xs text-white/60 leading-relaxed">
              Developed as a student innovation project addressing fragmented travel discovery and lack of budget clarity in Indian tourism.
            </p>
            <div className="pt-2">
              <Link 
                to="/about"
                className="inline-flex items-center gap-1.5 text-xs text-amber-300 hover:underline font-medium"
              >
                <span>Read Project Architecture & Roadmap</span>
                <Sparkles className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* SIH Hackathon Disclaimer & Copyright Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} YatraVista. Smart India Hackathon 2026 Student Innovation Prototype (#26204). Stays, prices, and itineraries are curated demonstration data. Does not represent official government endorsement or commercial booking transactions.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <Link to="/about" className="hover:text-white/80 transition-colors">
              Problem Statement #26204
            </Link>
            <Link to="/showcase" className="hover:text-white/80 transition-colors">
              Architecture & Code
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
export default Footer;
