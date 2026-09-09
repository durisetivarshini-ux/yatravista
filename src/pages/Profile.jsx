import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  MapPin, 
  Globe, 
  Heart, 
  Calendar, 
  Briefcase, 
  LogOut, 
  Save, 
  ShieldCheck, 
  Check, 
  Compass, 
  Sparkles,
  Luggage,
  Clock,
  ArrowRight
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";
import { travelInterestOptions, destinations } from "../data/destinations";
import { templesData } from "../data/temples";
import AttractionCard from "../components/attractions/AttractionCard";

export default function Profile() {
  const { user, logout, updateProfile, api } = useAuth();
  const { savedTrips, deleteTrip } = useTrip();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("settings"); // "settings", "trips", "bookings", "wishlist"
  const [bookings, setBookings] = useState([]);
  const [loadingBookings, setLoadingBookings] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    home_city: "",
    preferred_language: "English",
    travel_interests: [],
    avatar_url: ""
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        phone: user.phone || "",
        home_city: user.home_city || "",
        preferred_language: user.preferred_language || "English",
        travel_interests: user.travel_interests || ["Heritage", "Culture"],
        avatar_url: user.avatar_url || ""
      });
    }
  }, [user]);

  // Load Bookings when tab is active
  useEffect(() => {
    if (activeTab === "bookings" && user && api?.get) {
      setLoadingBookings(true);
      api.get("/bookings/my")
        .then((res) => {
          setBookings(res.data?.bookings || []);
        })
        .catch((err) => {
          console.error("Failed to fetch bookings", err);
        })
        .finally(() => {
          setLoadingBookings(false);
        });
    }
  }, [activeTab, user, api]);

  const handleInterestToggle = (interest) => {
    if (formData.travel_interests.includes(interest)) {
      setFormData({
        ...formData,
        travel_interests: formData.travel_interests.filter((i) => i !== interest)
      });
    } else {
      setFormData({
        ...formData,
        travel_interests: [...formData.travel_interests, interest]
      });
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSaveSuccess(false);

    try {
      if (updateProfile) {
        await updateProfile(formData);
      } else if (api?.put) {
        await api.put("/auth/profile", formData);
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 4000);
    } catch (err) {
      alert("Failed to update profile: " + (err.response?.data?.error || err.message));
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Find wishlisted items
  const wishlistedAttractions = [];
  if (user?.wishlist?.length > 0) {
    destinations.forEach((dest) => {
      dest.attractions?.forEach((att) => {
        if (user.wishlist.includes(att.name)) {
          wishlistedAttractions.push({ ...att, destinationName: dest.name, stateName: dest.state });
        }
      });
    });
  }

  const avatarsList = [
    `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(formData.name || 'Yatra')}`,
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80"
  ];

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl space-y-4">
          <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto">
            <User className="w-8 h-8" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-white">
            Traveller Account Required
          </h2>
          <p className="text-sm text-stone-600 dark:text-stone-300">
            Please log in or create an account to manage your profile, saved trips, and booking history.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
            <Link
              to="/login"
              className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-sm font-semibold transition-colors"
            >
              Sign In to Account
            </Link>
            <Link
              to="/"
              className="px-6 py-2.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 rounded-xl text-sm font-semibold transition-colors"
            >
              Explore as Guest
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Header Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="relative">
              <img
                src={formData.avatar_url || user.avatar_url || avatarsList[0]}
                alt={user.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-4 border-amber-500/20 shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
                {user.role}
              </span>
            </div>

            <div className="flex-1 text-center sm:text-left space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 dark:text-white">
                    {user.name}
                  </h1>
                  <p className="text-sm text-stone-500 dark:text-stone-400 flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-stone-400" />
                    <span>{user.email}</span>
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 rounded-xl transition-colors self-center sm:self-start"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log Out</span>
                </button>
              </div>

              {/* Badges / Quick Metadata */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-2 text-xs text-stone-600 dark:text-stone-400">
                {user.home_city && (
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800">
                    <MapPin className="w-3.5 h-3.5 text-amber-600" />
                    <span>{user.home_city}</span>
                  </span>
                )}
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-stone-100 dark:bg-stone-800">
                  <Globe className="w-3.5 h-3.5 text-amber-600" />
                  <span>{user.preferred_language || 'English'}</span>
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Session</span>
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 mt-8 pt-6 border-t border-stone-100 dark:border-stone-800 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab("settings")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "settings"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              <User className="w-4 h-4" />
              <span>Personal Settings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("trips")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "trips"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              <Luggage className="w-4 h-4" />
              <span>My Saved Trips ({savedTrips?.length || 0})</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("bookings")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "bookings"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>My Bookings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("wishlist")}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 shrink-0 ${
                activeTab === "wishlist"
                  ? "bg-amber-600 text-white shadow-sm"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
              }`}
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist ({user.wishlist?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Personal Settings Form */}
        {activeTab === "settings" && (
          <form onSubmit={handleSaveProfile} className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Edit Profile Information
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                Customize your preferences, language, and travel interests to personalize itinerary suggestions.
              </p>
            </div>

            {saveSuccess && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Profile updated and synchronized successfully!</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                  Full Display Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                  Email Address (Verified)
                </label>
                <input
                  type="email"
                  disabled
                  value={user.email}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-100 dark:bg-stone-800/50 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-500 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                  Home City / Starting Point
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hyderabad, Bengaluru, Delhi"
                  value={formData.home_city}
                  onChange={(e) => setFormData({ ...formData, home_city: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1.5">
                  Preferred Language
                </label>
                <select
                  value={formData.preferred_language}
                  onChange={(e) => setFormData({ ...formData, preferred_language: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500/50 text-stone-800 dark:text-stone-100"
                >
                  <option value="English">English</option>
                  <option value="Hindi">Hindi (हिंदी)</option>
                  <option value="Telugu">Telugu (తెలుగు)</option>
                  <option value="Tamil">Tamil (தமிழ்)</option>
                  <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
                  <option value="Malayalam">Malayalam (മലയാളം)</option>
                  <option value="Bengali">Bengali (বাংলা)</option>
                  <option value="Marathi">Marathi (मराठी)</option>
                  <option value="Gujarati">Gujarati (ગુજરાતી)</option>
                </select>
              </div>
            </div>

            {/* Travel Interests Pills */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-2">
                Travel & Cultural Interests
              </label>
              <div className="flex flex-wrap gap-2">
                {travelInterestOptions.filter((opt) => opt !== "All").map((interest) => {
                  const selected = formData.travel_interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => handleInterestToggle(interest)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                        selected
                          ? "bg-amber-600 text-white shadow-sm"
                          : "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200"
                      }`}
                    >
                      {selected && <Check className="w-3 h-3 text-white" />}
                      <span>{interest}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs md:text-sm font-semibold shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? "Saving Changes..." : "Save Profile Settings"}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: My Saved Trips */}
        {activeTab === "trips" && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  My Saved Itineraries
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Plans created with our deterministic itinerary generator.
                </p>
              </div>
              <Link
                to="/planner"
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl transition-colors"
              >
                + Plan New Trip
              </Link>
            </div>

            {savedTrips?.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-3">
                <Luggage className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
                <p className="text-sm">You haven’t saved any trips yet.</p>
                <Link
                  to="/planner"
                  className="inline-block text-amber-600 dark:text-amber-400 font-semibold text-xs hover:underline"
                >
                  Create your first customized itinerary →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {savedTrips.map((saved) => (
                  <div
                    key={saved.id}
                    className="border border-stone-200 dark:border-stone-800 rounded-2xl p-4 hover:border-amber-500/50 transition-all space-y-3 bg-stone-50/50 dark:bg-stone-800/30"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-bold text-stone-900 dark:text-white">
                          {saved.tripTitle || `${saved.destination} Journey`}
                        </h3>
                        <p className="text-xs text-stone-500 flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3 text-amber-600" />
                          <span>{saved.destination} • {saved.durationDays} Days</span>
                        </p>
                      </div>
                      <span className="text-xs font-bold text-amber-700 dark:text-amber-400">
                        ₹{(saved.totalBudget || 0).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200/60 dark:border-stone-700/60">
                      <span className="text-stone-400">
                        {saved.travelersCount || 1} Travelers
                      </span>
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/planner?loadTrip=${saved.id}`}
                          className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-semibold"
                        >
                          Open Plan
                        </Link>
                        <button
                          type="button"
                          onClick={() => deleteTrip(saved.id)}
                          className="px-2 py-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: My Bookings */}
        {activeTab === "bookings" && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                  Booking Reservations
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  Stay reservations, guided heritage walks, and artisan masterclasses.
                </p>
              </div>
              <Link
                to="/bookings"
                className="px-4 py-2 bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <span>Full Bookings Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {loadingBookings ? (
              <div className="text-center py-12 text-stone-400 text-sm">
                Loading reservations...
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-3">
                <Briefcase className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
                <p className="text-sm">No reservations found.</p>
                <Link
                  to="/stays"
                  className="inline-block text-amber-600 dark:text-amber-400 font-semibold text-xs hover:underline"
                >
                  Explore verified homestays & heritage retreats →
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div
                    key={b.id}
                    className="border border-stone-200 dark:border-stone-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-50/50 dark:bg-stone-800/30"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-stone-900 dark:text-white">
                          {b.listing_title || "Service Reservation"}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          b.booking_status === 'confirmed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                            : b.booking_status === 'declined' || b.booking_status === 'cancelled'
                            ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                        }`}>
                          {b.booking_status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        Ref: <span className="font-mono">{b.booking_reference}</span> • {b.check_in_date ? `Dates: ${b.check_in_date} to ${b.check_out_date}` : `Slot: ${b.slot_time || 'General'}`}
                      </p>
                    </div>

                    <div className="text-right">
                      <div className="text-sm font-bold text-stone-900 dark:text-white">
                        ₹{(b.total_amount || 0).toLocaleString()}
                      </div>
                      <div className="text-[10px] text-stone-400">
                        {b.guests_count} Guests
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Wishlist */}
        {activeTab === "wishlist" && (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 md:p-8 shadow-sm space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-white">
                Saved Wishlist Items
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Monuments, heritage temples, and attractions you have bookmarked.
              </p>
            </div>

            {wishlistedAttractions.length === 0 ? (
              <div className="text-center py-12 text-stone-400 space-y-3">
                <Heart className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
                <p className="text-sm">Your wishlist is currently empty.</p>
                <Link
                  to="/explore"
                  className="inline-block text-amber-600 dark:text-amber-400 font-semibold text-xs hover:underline"
                >
                  Browse destinations & click the heart icon to save places →
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {wishlistedAttractions.map((att, i) => (
                  <AttractionCard
                    key={i}
                    attraction={att}
                    destinationName={att.destinationName}
                    stateName={att.stateName}
                  />
                ))}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
