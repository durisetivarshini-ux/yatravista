import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { 
  Compass, 
  BedDouble, 
  Sparkles, 
  CalendarDays, 
  Bookmark, 
  Menu, 
  X, 
  Ticket, 
  Building, 
  Shield, 
  User, 
  LogOut, 
  ChevronDown,
  MapPin,
  Layers,
  Landmark,
  Home as HomeIcon,
  Luggage
} from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { useAuth } from "../../context/AuthContext";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { YatraVistaLogo } from "../ui/YatraVistaLogo";
import { Button } from "../ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [exploreDropdownOpen, setExploreDropdownOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(false);

  const location = useLocation();
  const { savedDestinations, savedTrips } = useTrip();
  const { user, role, isAuthenticated, logout, openAuthModal, switchDemoRole } = useAuth();

  const userMenuRef = useRef(null);
  const exploreMenuRef = useRef(null);

  const totalSaved = (savedDestinations?.length || 0) + (savedTrips?.length || 0);

  // Close menus on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (exploreMenuRef.current && !exploreMenuRef.current.contains(e.target)) {
        setExploreDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isExploreActive = ["/explore", "/states", "/temples", "/nearby"].some(path => 
    location.pathname.startsWith(path)
  );

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-theme-surface/92 border-b border-theme-border/80 transition-colors duration-300">
      {/* Top Smart India Hackathon Student Context Ribbon */}
      <div className="bg-theme-nav text-white/90 text-[11px] py-1 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-white/10 flex-wrap">
        <span className="inline-block px-2 py-0.5 rounded bg-theme-accent/30 text-amber-200 font-semibold uppercase text-[9px] tracking-wider">
          SIH 2026 • Prototype #26204
        </span>
        <span className="text-white/80">
          Smart India Hackathon 2026 Student Prototype — Travel & Tourism
        </span>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="group focus:outline-none focus:ring-2 focus:ring-theme-primary rounded-xl p-1 shrink-0"
            aria-label="YatraVista Home"
          >
            <YatraVistaLogo size="md" />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1.5" aria-label="Main Navigation">
            {/* 1. Home */}
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`
              }
            >
              <HomeIcon className="w-3.5 h-3.5 text-theme-text-subtle" />
              <span>Home</span>
            </NavLink>

            {/* 2. Explore Dropdown Menu */}
            <div className="relative" ref={exploreMenuRef}>
              <button
                type="button"
                onClick={() => setExploreDropdownOpen(!exploreDropdownOpen)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isExploreActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`}
                aria-expanded={exploreDropdownOpen}
              >
                <Compass className={`w-3.5 h-3.5 ${isExploreActive ? "text-theme-primary" : "text-theme-text-subtle"}`} />
                <span>Explore</span>
                <ChevronDown className={`w-3 h-3 text-theme-text-subtle transition-transform ${exploreDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {exploreDropdownOpen && (
                <div className="absolute left-0 mt-2 w-64 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated p-2 space-y-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                  <Link
                    to="/explore"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-theme-bg text-theme-text transition-colors"
                  >
                    <Compass className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">All Destinations Directory</div>
                      <div className="text-[10px] text-theme-text-muted">60+ curated Indian tourist circuits</div>
                    </div>
                  </Link>

                  <Link
                    to="/states"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-theme-bg text-theme-text transition-colors"
                  >
                    <Layers className="w-4 h-4 text-theme-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Browse 36 States & UTs</div>
                      <div className="text-[10px] text-theme-text-muted">Explore India by geographic zones</div>
                    </div>
                  </Link>

                  <Link
                    to="/temples"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-theme-bg text-theme-text transition-colors"
                  >
                    <Landmark className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Temples & Spiritual Journeys</div>
                      <div className="text-[10px] text-theme-text-muted">Jyotirlingas, Char Dham & Divya Desams</div>
                    </div>
                  </Link>

                  <Link
                    to="/nearby"
                    onClick={() => setExploreDropdownOpen(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-theme-bg text-theme-text transition-colors"
                  >
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold">Nearby Places & Directions</div>
                      <div className="text-[10px] text-theme-text-muted">Proximity calculator & GPS navigation</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Stays */}
            <NavLink
              to="/stays"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`
              }
            >
              <BedDouble className="w-3.5 h-3.5 text-theme-text-subtle" />
              <span>Stays</span>
            </NavLink>

            {/* 4. Experiences */}
            <NavLink
              to="/experiences"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`
              }
            >
              <Sparkles className="w-3.5 h-3.5 text-theme-text-subtle" />
              <span>Experiences</span>
            </NavLink>

            {/* 5. Trip Planner */}
            <NavLink
              to="/planner"
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`
              }
            >
              <CalendarDays className="w-3.5 h-3.5 text-theme-text-subtle" />
              <span>Trip Planner</span>
            </NavLink>
          </nav>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />

            {/* User Account / Profile Menu */}
            {isAuthenticated ? (
              <div className="relative" ref={userMenuRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 py-1.5 px-2.5 rounded-xl border border-theme-border bg-theme-surface hover:bg-theme-bg text-xs font-medium transition-colors"
                >
                  <img
                    src={user?.avatar_url || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"}
                    alt={user?.name}
                    className="w-6 h-6 rounded-full object-cover border border-theme-border"
                  />
                  <div className="text-left leading-tight hidden xl:block">
                    <div className="text-xs font-semibold text-theme-text">{user?.name?.split(" ")[0]}</div>
                    <div className="text-[9px] uppercase font-bold text-theme-primary capitalize">{role}</div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-theme-text-subtle" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated p-2 space-y-1 z-50 text-xs animate-in fade-in zoom-in-95 duration-100">
                    <div className="p-2 border-b border-theme-border">
                      <div className="font-semibold text-theme-text">{user?.name}</div>
                      <div className="text-[11px] text-theme-text-muted truncate">{user?.email}</div>
                      <div className="mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-theme-primary-light text-theme-primary uppercase">
                        Role: {role}
                      </div>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text font-medium"
                    >
                      <User className="w-3.5 h-3.5 text-theme-primary" />
                      <span>My Profile & Settings</span>
                    </Link>

                    <Link
                      to="/saved"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-theme-bg text-theme-text"
                    >
                      <div className="flex items-center gap-2">
                        <Bookmark className="w-3.5 h-3.5 text-theme-accent" />
                        <span>My Saved Trips</span>
                      </div>
                      {totalSaved > 0 && (
                        <span className="px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-theme-primary text-white">
                          {totalSaved}
                        </span>
                      )}
                    </Link>

                    <Link
                      to="/bookings"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text"
                    >
                      <Ticket className="w-3.5 h-3.5 text-theme-accent" />
                      <span>My Bookings</span>
                    </Link>

                    {role === "provider" && (
                      <Link
                        to="/provider/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text font-semibold text-amber-700 dark:text-amber-400"
                      >
                        <Building className="w-3.5 h-3.5" />
                        <span>Host Dashboard</span>
                      </Link>
                    )}

                    {role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text font-semibold text-red-600"
                      >
                        <Shield className="w-3.5 h-3.5" />
                        <span>Admin Control Center</span>
                      </Link>
                    )}

                    <div className="pt-1 border-t border-theme-border space-y-1">
                      <div className="text-[10px] text-theme-text-subtle px-2 pt-1 font-semibold uppercase">
                        Quick Demo Switcher
                      </div>
                      <button
                        type="button"
                        onClick={() => { switchDemoRole("traveller"); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1 rounded hover:bg-theme-bg text-[11px] text-theme-text"
                      >
                        👤 Switch to Traveller
                      </button>
                      <button
                        type="button"
                        onClick={() => { switchDemoRole("provider"); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1 rounded hover:bg-theme-bg text-[11px] text-theme-text"
                      >
                        🏨 Switch to Host Provider
                      </button>
                      <button
                        type="button"
                        onClick={() => { switchDemoRole("admin"); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1 rounded hover:bg-theme-bg text-[11px] text-theme-text"
                      >
                        🛡️ Switch to Platform Admin
                      </button>
                    </div>

                    <div className="pt-1 border-t border-theme-border">
                      <button
                        type="button"
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 p-2 rounded-lg hover:bg-red-50 text-red-600 text-xs font-semibold"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Button
                variant="secondary"
                size="sm"
                to="/login"
              >
                Sign In
              </Button>
            )}

            {/* Single Prominent Plan Trip Action */}
            <Button
              to="/planner"
              variant="primary"
              size="sm"
              icon={CalendarDays}
              className="font-medium bg-theme-accent hover:bg-theme-accent/90 text-white shadow-sm"
            >
              Plan Trip
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
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
        <div className="lg:hidden border-t border-theme-border bg-theme-surface/98 backdrop-blur-lg px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-2 duration-200 shadow-elevated max-h-[85vh] overflow-y-auto">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
          >
            <HomeIcon className="w-4 h-4 text-theme-primary" />
            <span>Home</span>
          </NavLink>

          {/* Mobile Explore Submenu */}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
              className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            >
              <div className="flex items-center gap-3">
                <Compass className="w-4 h-4 text-theme-primary" />
                <span>Explore Destinations</span>
              </div>
              <ChevronDown className={`w-4 h-4 transition-transform ${mobileExploreOpen ? "rotate-180" : ""}`} />
            </button>

            {mobileExploreOpen && (
              <div className="pl-9 pr-2 py-1 space-y-1 text-xs">
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-theme-text hover:text-theme-primary"
                >
                  All Destinations Directory
                </Link>
                <Link
                  to="/states"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-theme-text hover:text-theme-primary"
                >
                  Browse 36 States & UTs
                </Link>
                <Link
                  to="/temples"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-theme-text hover:text-theme-primary"
                >
                  Temples & Spiritual Journeys
                </Link>
                <Link
                  to="/nearby"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-2 text-theme-text hover:text-theme-primary"
                >
                  Nearby Places & Directions
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/stays"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
          >
            <BedDouble className="w-4 h-4 text-theme-primary" />
            <span>Stays</span>
          </NavLink>

          <NavLink
            to="/experiences"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
          >
            <Sparkles className="w-4 h-4 text-theme-primary" />
            <span>Artisan Experiences</span>
          </NavLink>

          <NavLink
            to="/planner"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
          >
            <CalendarDays className="w-4 h-4 text-theme-primary" />
            <span>Trip Planner</span>
          </NavLink>

          {isAuthenticated ? (
            <>
              <NavLink
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
              >
                <User className="w-4 h-4 text-theme-primary" />
                <span>My Profile & Settings</span>
              </NavLink>

              <NavLink
                to="/saved"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
              >
                <div className="flex items-center gap-3">
                  <Bookmark className="w-4 h-4 text-theme-primary" />
                  <span>My Saved Trips</span>
                </div>
                {totalSaved > 0 && (
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-theme-primary text-white">
                    {totalSaved}
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/bookings"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
              >
                <Ticket className="w-4 h-4 text-theme-primary" />
                <span>My Bookings</span>
              </NavLink>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold text-theme-primary hover:bg-theme-bg"
            >
              <User className="w-4 h-4" />
              <span>Sign In / Create Account</span>
            </Link>
          )}

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
