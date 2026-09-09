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
  Code,
  Ticket,
  Building,
  Shield,
  User,
  LogOut,
  ChevronDown
} from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { useAuth } from "../../context/AuthContext";
import { ThemeSwitcher } from "../ui/ThemeSwitcher";
import { YatraVistaLogo } from "../ui/YatraVistaLogo";
import { Button } from "../ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const location = useLocation();
  const { savedDestinations, savedTrips } = useTrip();
  const { user, role, isAuthenticated, logout, openAuthModal, switchDemoRole } = useAuth();

  const totalSaved = (savedDestinations?.length || 0) + (savedTrips?.length || 0);

  const baseNavLinks = [
    { to: "/explore", label: "Explore", icon: Compass },
    { to: "/stays", label: "Stays", icon: BedDouble },
    { to: "/experiences", label: "Experiences", icon: Sparkles },
    { to: "/planner", label: "Trip Planner", icon: CalendarDays },
    { to: "/saved", label: "My Trips", icon: Bookmark, badge: totalSaved > 0 ? totalSaved : null },
    { to: "/bookings", label: "My Bookings", icon: Ticket },
  ];

  // Role-specific portals
  if (role === "provider") {
    baseNavLinks.push({ to: "/provider/dashboard", label: "Host Dashboard", icon: Building });
  } else if (role === "admin") {
    baseNavLinks.push({ to: "/admin/dashboard", label: "Admin Portal", icon: Shield });
  }

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-theme-surface/90 border-b border-theme-border/80 transition-colors duration-300">
      {/* Top Smart India Hackathon Student Context Ribbon */}
      <div className="bg-theme-nav text-white/85 text-[11px] py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2 border-b border-white/10 flex-wrap">
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
          <span>Folder & Code Structure</span>
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
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {baseNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "text-theme-primary bg-theme-primary-light font-semibold shadow-xs"
                      : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? "text-theme-primary" : "text-theme-text-subtle"}`} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="ml-1 inline-flex items-center justify-center px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-theme-primary text-white">
                      {link.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Actions: Theme Selector & User Menu */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeSwitcher />

            {/* Auth / Role Menu */}
            {isAuthenticated ? (
              <div className="relative">
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
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated p-2 space-y-1 z-50 text-xs">
                    <div className="p-2 border-b border-theme-border">
                      <div className="font-semibold text-theme-text">{user?.name}</div>
                      <div className="text-[11px] text-theme-text-muted truncate">{user?.email}</div>
                      <div className="mt-1 inline-block px-2 py-0.5 rounded-full text-[9px] font-bold bg-theme-primary-light text-theme-primary uppercase">
                        Role: {role}
                      </div>
                    </div>

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
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text"
                      >
                        <Building className="w-3.5 h-3.5 text-theme-accent" />
                        <span>Host Dashboard</span>
                      </Link>
                    )}

                    {role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-theme-bg text-theme-text"
                      >
                        <Shield className="w-3.5 h-3.5 text-red-600" />
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
                onClick={() => openAuthModal("login")}
              >
                Sign In
              </Button>
            )}

            <Button
              to="/planner"
              variant="primary"
              size="sm"
              icon={CalendarDays}
              className="font-medium"
            >
              Plan Trip
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
          {baseNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;

            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium ${
                  isActive
                    ? "text-theme-primary bg-theme-primary-light font-semibold"
                    : "text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-theme-primary" />
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

          <div className="pt-3 border-t border-theme-border space-y-2">
            <div className="text-xs text-theme-text-subtle font-semibold px-2">Role Switcher:</div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => { switchDemoRole("traveller"); setMobileMenuOpen(false); }}
                className="py-1.5 rounded-lg border text-xs text-center"
              >
                👤 Traveller
              </button>
              <button
                type="button"
                onClick={() => { switchDemoRole("provider"); setMobileMenuOpen(false); }}
                className="py-1.5 rounded-lg border text-xs text-center"
              >
                🏨 Host
              </button>
              <button
                type="button"
                onClick={() => { switchDemoRole("admin"); setMobileMenuOpen(false); }}
                className="py-1.5 rounded-lg border text-xs text-center"
              >
                🛡️ Admin
              </button>
            </div>

            <Button
              to="/planner"
              onClick={() => setMobileMenuOpen(false)}
              variant="primary"
              size="md"
              icon={CalendarDays}
              className="w-full justify-center mt-2"
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
