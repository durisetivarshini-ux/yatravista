import React, { useState } from "react";
import { 
  Lock, 
  Mail, 
  User, 
  Compass, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Building2,
  Luggage,
  MapPin,
  HeartHandshake
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import YatraVistaLogo from "../components/ui/YatraVistaLogo";
import SIHEmblem from "../components/ui/SIHEmblem";

export default function Login() {
  const { login, register, loginAsDemo, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mode, setMode] = useState("login"); // "login" or "register"
  const [role, setRole] = useState("traveller"); // "traveller" or "provider"
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    businessName: "",
    home_city: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectPath = location.state?.from || (user?.role === "provider" ? "/provider/dashboard" : user?.role === "admin" ? "/admin/dashboard" : "/");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role,
          phone: formData.phone,
          businessName: formData.businessName,
          home_city: formData.home_city
        });
      }
      navigate(redirectPath);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleFastDemo = async (roleName) => {
    setLoading(true);
    setError("");
    try {
      await loginAsDemo(roleName);
      if (roleName === "provider") navigate("/provider/dashboard");
      else if (roleName === "admin") navigate("/admin/dashboard");
      else navigate("/explore");
    } catch (err) {
      setError(err.message || "Failed to switch demo account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 dark:bg-stone-950 flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 bg-white dark:bg-stone-900 rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl">
        
        {/* Left Editorial Visual Banner */}
        <div className="lg:col-span-5 relative bg-stone-900 text-white p-8 sm:p-10 flex flex-col justify-between overflow-hidden">
          {/* Background Photography */}
          <img
            src="https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80"
            alt="Indian Heritage"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-stone-950/70" />

          {/* Top Branding */}
          <div className="relative z-10 space-y-4">
            <Link to="/" className="inline-block">
              <YatraVistaLogo size="md" />
            </Link>
            <div className="pt-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Pan-India Tourism Hub
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold leading-tight drop-shadow-md">
              Discover Authentic India Across 36 States & UTs.
            </h2>
            <p className="text-xs text-stone-300 leading-relaxed">
              Explore ancient temples, heritage homestays, living artisan guilds, and deterministic travel budgets with zero hidden markups.
            </p>
          </div>

          {/* Feature Bullets */}
          <div className="relative z-10 space-y-3 pt-6 border-t border-white/10 text-xs text-stone-300">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>All 28 States & 8 Union Territories Catalogued</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Sacred Temples & Pilgrimage Etiquette Guides</span>
            </div>
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Instant Sandbox Bookings & Deterministic Itineraries</span>
            </div>
          </div>

          {/* Bottom SIH Prototype Badge */}
          <div className="relative z-10 pt-6">
            <SIHEmblem variant="minimal" className="opacity-90" />
          </div>
        </div>

        {/* Right Authentication Form Area */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          
          {/* Top Form Header & Tabs */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
                  {mode === "login" ? "Welcome Back" : "Create Account"}
                </h1>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  {mode === "login"
                    ? "Sign in to access your trips, wishlist, and bookings."
                    : "Join YatraVista as an explorer or local hospitality host."}
                </p>
              </div>

              {/* Guest Exploration Link */}
              <Link
                to="/explore"
                className="px-3.5 py-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 rounded-xl transition-colors flex items-center gap-1"
              >
                <span>Explore as Guest</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-2 gap-1 bg-stone-100 dark:bg-stone-800 p-1 rounded-xl mb-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setMode("login")}
                className={`py-2 rounded-lg transition-all ${
                  mode === "login"
                    ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode("register")}
                className={`py-2 rounded-lg transition-all ${
                  mode === "register"
                    ? "bg-white dark:bg-stone-900 text-stone-900 dark:text-white shadow-sm"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Role Selection (Only during register) */}
            {mode === "register" && (
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  type="button"
                  onClick={() => setRole("traveller")}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center gap-2.5 ${
                    role === "traveller"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 text-stone-900 dark:text-white font-semibold"
                      : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <Luggage className={`w-4 h-4 ${role === "traveller" ? "text-amber-600" : "text-stone-400"}`} />
                  <div>
                    <div>Traveller</div>
                    <div className="text-[10px] text-stone-400 font-normal">Plan trips & book stays</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("provider")}
                  className={`p-2.5 rounded-xl border text-left transition-all text-xs flex items-center gap-2.5 ${
                    role === "provider"
                      ? "border-amber-600 bg-amber-50/50 dark:bg-amber-950/30 text-stone-900 dark:text-white font-semibold"
                      : "border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400"
                  }`}
                >
                  <Building2 className={`w-4 h-4 ${role === "provider" ? "text-amber-600" : "text-stone-400"}`} />
                  <div>
                    <div>Host / Provider</div>
                    <div className="text-[10px] text-stone-400 font-normal">List homestays & tours</div>
                  </div>
                </button>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 rounded-xl text-xs font-medium">
                {error}
              </div>
            )}

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {mode === "register" && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Aarav Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                    />
                  </div>
                </div>
              )}

              {mode === "register" && role === "provider" && (
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                    Business / Homestay Name *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Marari Beach Heritage Homestay"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs md:text-sm font-semibold shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2"
              >
                <span>{loading ? "Processing..." : mode === "login" ? "Sign In to YatraVista" : "Complete Registration"}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* Fast 1-Click Demo Logins for Hackathon Evaluators */}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 dark:text-stone-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                <span>1-Click Evaluator Fast Logins:</span>
              </span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleFastDemo("traveller")}
                className="px-2 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 rounded-lg text-[11px] font-medium text-center transition-colors"
              >
                Demo Traveller
              </button>
              <button
                type="button"
                onClick={() => handleFastDemo("provider")}
                className="px-2 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 rounded-lg text-[11px] font-medium text-center transition-colors"
              >
                Demo Host
              </button>
              <button
                type="button"
                onClick={() => handleFastDemo("admin")}
                className="px-2 py-1.5 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 rounded-lg text-[11px] font-medium text-center transition-colors"
              >
                Demo Admin
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
