import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  Compass, 
  BedDouble, 
  Sparkles, 
  CalendarDays, 
  Bookmark, 
  Menu, 
  X, 
  Info,
  Code
} from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { YatraVistaLogo } from "../ui/YatraVistaLogo";
import { Button } from "../ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { savedDestinations, savedTrips } = useTrip();

  const totalSaved = (savedDestinations?.length || 0) + (savedTrips?.length || 0);

  const navLinks = [
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/stays", label: "Stays", icon: BedDouble },
    { to: "/experiences", label: "Experiences", icon: Sparkles },
    { to: "/planner", label: "Trip Planner", icon: CalendarDays },
    { to: "/saved", label: "Saved Trips", icon: Bookmark, badge: totalSaved > 0 ? totalSaved : null },
    { to: "/showcase", label: "Folder & Code", icon: Code },
    { to: "/about", label: "About SIH", icon: Info },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-theme-surface/90 border-b border-theme-border/80 transition-colors duration-300">
      {/* Top Smart India Hackathon Student Context Ribbon */}
      <div className="bg-theme-nav text-white/85 text-[11px] py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-white/10">
        <span className="inline-block px-1.5 py-0.5 rounded bg-theme-accent/30 text-amber-200 font-semibold uppercase text-[9px] tracking-wider">
          SIH 2026 • Prototype #26204
        </span>
        <span className="hidden sm:inline text-white/80">
          Smart India Hackathon 2026 Student Prototype — Travel & Tourism
        </span>
        <span className="sm:hidden text-white/80">
          SIH 2026 Travel Prototype
        </span>
        <span className="text-white/40">•</span>
        <Link to="/showcase" className="text-amber-300 hover:underline font-medium text-[10px] flex items-center gap-1">
          <span>View Folder Structure & Code</span>
        </Link>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo / Brand */}
          <Link 
            to="/" 
            className="group focus:outline-none focus:ring-2 focus:ring-theme-primary rounded-xl p-1"
            aria-label="YatraVista Home"
          >
            <YatraVistaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-1.5" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs lg:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                      : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-theme-primary" : "text-theme-text-subtle"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-theme-primary text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions: Theme Selector & Plan CTA */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />
            <Button
              to="/planner"
              variant="primary"
              size="sm"
              icon={CalendarDays}
              className="font-medium"
            >
              Plan My Trip
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeSwitcher minimal={false} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-theme-text hover:bg-theme-bg focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-theme-border bg-theme-surface/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-elevated">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-theme-primary" />
                  <span>{link.label}</span>
                </div>
                {link.badge && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-theme-primary text-white">
                    {link.badge}
                  </span>
                )}
              </NavLink>
            );
          })}

          <div className="pt-3 border-t border-theme-border">
            <Button
              to="/planner"
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              size="md"
              icon={CalendarDays}
              className="w-full justify-center"
            >
              Start Trip Planner
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
export default Navbar;
