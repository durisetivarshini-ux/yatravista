import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Building, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  PauseCircle, 
  PlayCircle, 
  Edit, 
  ShieldCheck, 
  Sparkles, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Save, 
  Eye,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { api } from "../utils/api";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

export function ProviderDashboard() {
  const { user, role, providerProfile, switchDemoRole } = useAuth();

  const [activeTab, setActiveTab] = useState("requests"); // "requests", "listings", "profile"
  const [requests, setRequests] = useState([]);
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Listing Create/Edit Modal state
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [editingListing, setEditingListing] = useState(null);
  const [listingForm, setListingForm] = useState({
    destination_slug: "jaipur",
    category: "stay",
    title: "",
    tagline: "",
    price: 3500,
    price_unit: "per_night",
    capacity: 2,
    max_rooms: 2,
    address: "",
    description: "",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    cancellation_policy: "Free cancellation up to 48 hours prior to check-in/start.",
    status: "pending_review"
  });
  const [savingListing, setSavingListing] = useState(false);

  // Response to booking modal
  const [respondModalOpen, setRespondModalOpen] = useState(false);
  const [targetBooking, setTargetBooking] = useState(null);
  const [respondAction, setRespondAction] = useState("confirm"); // "confirm" | "decline"
  const [providerNotes, setProviderNotes] = useState("");
  const [responding, setResponding] = useState(false);

  // Profile Settings Form state
  const [profileForm, setProfileForm] = useState({
    business_name: providerProfile?.business_name || user?.name || "",
    tagline: providerProfile?.tagline || "",
    bio: providerProfile?.bio || "",
    location: providerProfile?.location || "Jaipur, Rajasthan",
    languages: providerProfile?.languages || ["English", "Hindi"],
    public_phone: providerProfile?.public_phone || "+91 94140 12345",
    public_email: providerProfile?.public_email || user?.email || ""
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [reqRes, listRes] = await Promise.all([
        api.getProviderRequests().catch(() => ({ requests: [] })),
        api.getListings({ providerId: user?.id }).catch(() => ({ listings: [] }))
      ]);
      setRequests(reqRes.requests || []);
      setListings(listRes.listings || []);
    } catch (err) {
      console.error("Error loading provider dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user?.id]);

  const handleOpenNewListing = () => {
    setEditingListing(null);
    setListingForm({
      destination_slug: "jaipur",
      category: "stay",
      title: "",
      tagline: "",
      price: 3500,
      price_unit: "per_night",
      capacity: 2,
      max_rooms: 2,
      address: "",
      description: "",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
      cancellation_policy: "Free cancellation up to 48 hours prior to check-in/start.",
      status: "pending_review"
    });
    setListingModalOpen(true);
  };

  const handleSaveListing = async (e) => {
    e.preventDefault();
    setSavingListing(true);
    try {
      if (editingListing) {
        await api.updateListing(editingListing.id, listingForm);
      } else {
        await api.createListing(listingForm);
      }
      setListingModalOpen(false);
      await fetchData();
    } catch (err) {
      alert(err.message || "Failed to save listing.");
    } finally {
      setSavingListing(false);
    }
  };

  const handleRespondToBooking = async () => {
    if (!targetBooking) return;
    setResponding(true);
    try {
      await api.respondToBooking(
        targetBooking.id,
        respondAction,
        respondAction === "confirm" ? providerNotes : null,
        respondAction === "decline" ? providerNotes : null
      );
      setRespondModalOpen(false);
      setTargetBooking(null);
      setProviderNotes("");
      await fetchData();
    } catch (err) {
      alert(err.message || "Failed to respond to booking.");
    } finally {
      setResponding(false);
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);
    try {
      await api.updateProviderProfile(profileForm);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      alert(err.message || "Failed to update profile.");
    } finally {
      setSavingProfile(false);
    }
  };

  if (role !== "provider" && role !== "admin") {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-700 flex items-center justify-center mx-auto">
          <Building className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-theme-text">Host / Provider Portal Access</h2>
        <p className="text-sm text-theme-text-muted max-w-md mx-auto">
          You are currently logged in as a <strong>{role}</strong>. Switch to a Host/Provider account to manage properties, workshops, and incoming booking requests.
        </p>
        <Button variant="primary" size="md" onClick={() => switchDemoRole("provider")}>
          Switch to Demo Provider (Rajendra)
        </Button>
      </div>
    );
  }

  const pendingRequests = requests.filter(r => r.booking_status === "pending");
  const confirmedRequests = requests.filter(r => r.booking_status === "confirmed");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-theme-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
              Host Management Portal
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Platform Approved Host</span>
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-theme-text mt-1">
            {profileForm.business_name || user?.name}'s Dashboard
          </h1>
          <p className="text-sm text-theme-text-muted mt-1">
            Manage your stays, guided trails, master artisan workshops, and review guest requests.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            to={`/providers/${user?.id}`}
            variant="secondary"
            size="sm"
            icon={Eye}
          >
            Public Host Profile
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenNewListing}
          >
            Create New Listing
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs">
          <div className="text-xs font-medium text-theme-text-muted">Pending Requests</div>
          <div className="text-2xl font-serif font-bold text-amber-600 mt-1">
            {pendingRequests.length}
          </div>
          <div className="text-[11px] text-theme-text-subtle mt-0.5">Awaiting your confirmation</div>
        </div>

        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs">
          <div className="text-xs font-medium text-theme-text-muted">Active Listings</div>
          <div className="text-2xl font-serif font-bold text-theme-text mt-1">
            {listings.length}
          </div>
          <div className="text-[11px] text-theme-text-subtle mt-0.5">Published & in moderation</div>
        </div>

        <div className="p-5 rounded-2xl bg-theme-surface border border-theme-border shadow-xs">
          <div className="text-xs font-medium text-theme-text-muted">Confirmed Volume</div>
          <div className="text-2xl font-serif font-bold text-emerald-700 mt-1">
            {formatINR(confirmedRequests.reduce((acc, r) => acc + (r.total_amount || 0), 0))}
          </div>
          <div className="text-[11px] text-theme-text-subtle mt-0.5">{confirmedRequests.length} total bookings confirmed</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-theme-border pb-2">
        <button
          type="button"
          onClick={() => setActiveTab("requests")}
          className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "requests"
              ? "bg-theme-primary text-white shadow-soft"
              : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text"
          }`}
        >
          Booking Requests ({requests.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("listings")}
          className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "listings"
              ? "bg-theme-primary text-white shadow-soft"
              : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text"
          }`}
        >
          My Listings ({listings.length})
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("profile")}
          className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
            activeTab === "profile"
              ? "bg-theme-primary text-white shadow-soft"
              : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text"
          }`}
        >
          Host Profile Settings
        </button>
      </div>

      {/* Tab 1: Booking Requests */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-theme-surface border border-theme-border space-y-2">
              <Clock className="w-8 h-8 text-theme-text-subtle mx-auto" />
              <h4 className="text-base font-serif font-bold text-theme-text">No incoming booking requests</h4>
              <p className="text-xs text-theme-text-muted">When travellers request stays or workshops, they will appear here for your review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {requests.map((r) => {
                const isPending = r.booking_status === "pending";
                return (
                  <div
                    key={r.id}
                    className={`p-5 rounded-2xl bg-theme-surface border transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4 ${
                      isPending ? "border-amber-500/40 bg-amber-500/[0.02]" : "border-theme-border"
                    }`}
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <img
                        src={r.listing_image}
                        alt={r.listing_title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0 border border-theme-border"
                      />
                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold text-theme-primary uppercase px-2 py-0.5 rounded bg-theme-primary-light">
                            {r.booking_reference}
                          </span>
                          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize ${
                            r.booking_status === "confirmed" 
                              ? "bg-emerald-500/10 text-emerald-700" 
                              : r.booking_status === "pending"
                              ? "bg-amber-500/10 text-amber-700 font-bold"
                              : "bg-red-500/10 text-red-700"
                          }`}>
                            {r.booking_status}
                          </span>
                        </div>

                        <h3 className="text-base font-serif font-bold text-theme-text truncate">
                          {r.listing_title}
                        </h3>

                        <div className="text-xs text-theme-text-muted flex items-center gap-3 flex-wrap">
                          <span>👤 Guest: <strong>{r.traveller_name}</strong> ({r.traveller_email})</span>
                          <span>• 📅 {r.check_in_date} {r.check_out_date ? `to ${r.check_out_date}` : `(${r.slot_time || "Day"})`}</span>
                          <span>• 👥 {r.guests_count} Person(s)</span>
                        </div>

                        {r.provider_notes && (
                          <div className="text-[11px] text-emerald-700 font-medium">
                            ✓ Your Note: {r.provider_notes}
                          </div>
                        )}
                        {r.cancellation_reason && (
                          <div className="text-[11px] text-red-600">
                            Reason: {r.cancellation_reason}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex md:flex-col items-end justify-between w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-theme-border shrink-0 gap-2">
                      <div className="text-left md:text-right">
                        <span className="text-base font-serif font-bold text-theme-primary block">{formatINR(r.total_amount)}</span>
                        <span className="text-[10px] text-theme-text-subtle">Itemized Total</span>
                      </div>

                      {isPending ? (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setTargetBooking(r);
                              setRespondAction("confirm");
                              setProviderNotes("Delighted to accept your booking! Looking forward to hosting you.");
                              setRespondModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors flex items-center gap-1 shadow-xs cursor-pointer"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Accept</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setTargetBooking(r);
                              setRespondAction("decline");
                              setProviderNotes("Fully booked for this specific slot.");
                              setRespondModalOpen(true);
                            }}
                            className="px-3 py-1.5 rounded-xl bg-theme-surface border border-red-200 text-red-600 hover:bg-red-50 text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            <span>Decline</span>
                          </button>
                        </div>
                      ) : null}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Listings Management */}
      {activeTab === "listings" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl bg-theme-surface border border-theme-border overflow-hidden flex flex-col justify-between hover:shadow-soft transition-all"
              >
                <div>
                  <div className="relative h-44 w-full">
                    <img
                      src={l.image}
                      alt={l.title}
                      className="w-full h-full object-cover"
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md ${
                      l.status === "approved"
                        ? "bg-emerald-500/90 text-white"
                        : l.status === "pending_review"
                        ? "bg-amber-500/90 text-white"
                        : "bg-zinc-800/90 text-white"
                    }`}>
                      {l.status?.replace("_", " ")}
                    </span>
                    <span className="absolute top-3 right-3 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-white/90 text-theme-primary capitalize">
                      {l.category}
                    </span>
                  </div>

                  <div className="p-4 space-y-1.5">
                    <h4 className="text-base font-serif font-bold text-theme-text line-clamp-1">{l.title}</h4>
                    <p className="text-xs text-theme-accent italic line-clamp-1">{l.tagline}</p>
                    <p className="text-xs text-theme-text-muted line-clamp-2">{l.description}</p>
                  </div>
                </div>

                <div className="p-4 pt-0 border-t border-theme-border/60 mt-3 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-serif font-bold text-theme-primary">{formatINR(l.price)}</span>
                    <span className="text-[10px] text-theme-text-muted"> / {l.price_unit?.replace("_", " ")}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingListing(l);
                        setListingForm(l);
                        setListingModalOpen(true);
                      }}
                      className="p-1.5 rounded-lg border border-theme-border hover:bg-theme-bg text-theme-text transition-colors"
                      title="Edit listing"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Host Profile Settings */}
      {activeTab === "profile" && (
        <div className="max-w-2xl bg-theme-surface border border-theme-border rounded-2xl p-6 space-y-5">
          <div>
            <h3 className="text-lg font-serif font-bold text-theme-text">Public Business Profile</h3>
            <p className="text-xs text-theme-text-muted mt-0.5">
              These details are displayed on your listings and host profile page.
            </p>
          </div>

          {profileSuccess && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-800 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Host profile updated successfully!</span>
            </div>
          )}

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Business / Estate / Guild Name
              </label>
              <input
                type="text"
                required
                value={profileForm.business_name}
                onChange={(e) => setProfileForm({ ...profileForm, business_name: e.target.value })}
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={profileForm.tagline}
                onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                About / Introduction (Bio)
              </label>
              <textarea
                rows={3}
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Business Location
                </label>
                <input
                  type="text"
                  value={profileForm.location}
                  onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Public Contact Phone
                </label>
                <input
                  type="text"
                  value={profileForm.public_phone}
                  onChange={(e) => setProfileForm({ ...profileForm, public_phone: e.target.value })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="md"
              icon={Save}
              disabled={savingProfile}
            >
              {savingProfile ? "Saving..." : "Save Profile Changes"}
            </Button>
          </form>
        </div>
      )}

      {/* Response to Booking Modal */}
      {respondModalOpen && targetBooking && (
        <Modal
          isOpen={respondModalOpen}
          onClose={() => setRespondModalOpen(false)}
          title={respondAction === "confirm" ? "Accept Booking Request" : "Decline Booking Request"}
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-theme-text-muted">
              {respondAction === "confirm"
                ? `Confirming request ${targetBooking.booking_reference} for ${targetBooking.traveller_name}.`
                : `Declining request ${targetBooking.booking_reference}. Please provide a brief note for the traveller.`}
            </p>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                {respondAction === "confirm" ? "Confirmation Message to Guest" : "Reason for Declining"}
              </label>
              <textarea
                rows={2}
                value={providerNotes}
                onChange={(e) => setProviderNotes(e.target.value)}
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setRespondModalOpen(false)}
              >
                Cancel
              </Button>
              <button
                type="button"
                onClick={handleRespondToBooking}
                disabled={responding}
                className={`px-4 py-2 rounded-xl text-white text-xs font-semibold shadow-xs transition-colors ${
                  respondAction === "confirm" ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {responding ? "Updating..." : respondAction === "confirm" ? "Confirm Booking" : "Decline Request"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Create / Edit Listing Modal */}
      {listingModalOpen && (
        <Modal
          isOpen={listingModalOpen}
          onClose={() => setListingModalOpen(false)}
          title={editingListing ? "Edit Listing" : "Create New Bookable Listing"}
          maxWidth="max-w-xl"
        >
          <form onSubmit={handleSaveListing} className="space-y-4">
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Service Category
                </label>
                <select
                  value={listingForm.category}
                  onChange={(e) => setListingForm({ 
                    ...listingForm, 
                    category: e.target.value,
                    price_unit: e.target.value === "stay" ? "per_night" : "per_person"
                  })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
                >
                  <option value="stay">Heritage Stay / Hotel / Homestay</option>
                  <option value="tour">Guided Heritage Tour</option>
                  <option value="workshop">Artisan Workshop / Masterclass</option>
                  <option value="experience">Local Cultural Experience</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Destination
                </label>
                <select
                  value={listingForm.destination_slug}
                  onChange={(e) => setListingForm({ ...listingForm, destination_slug: e.target.value })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
                >
                  <option value="jaipur">Jaipur (Rajasthan)</option>
                  <option value="udaipur">Udaipur (Rajasthan)</option>
                  <option value="varanasi">Varanasi (Uttar Pradesh)</option>
                  <option value="munnar">Munnar (Kerala)</option>
                  <option value="alappuzha">Alappuzha (Kerala)</option>
                  <option value="leh">Leh (Ladakh)</option>
                  <option value="goa">Goa</option>
                  <option value="coorg">Coorg (Karnataka)</option>
                  <option value="hampi">Hampi (Karnataka)</option>
                  <option value="kolkata">Kolkata (West Bengal)</option>
                  <option value="darjeeling">Darjeeling (West Bengal)</option>
                  <option value="shillong">Shillong (Meghalaya)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Listing Title
              </label>
              <input
                type="text"
                required
                value={listingForm.title}
                onChange={(e) => setListingForm({ ...listingForm, title: e.target.value })}
                placeholder="e.g. Alsisar Haveli Courtyard Suite"
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Tagline
              </label>
              <input
                type="text"
                value={listingForm.tagline}
                onChange={(e) => setListingForm({ ...listingForm, tagline: e.target.value })}
                placeholder="e.g. 19th-century royal haveli with fresco courtyard"
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Price in INR
                </label>
                <input
                  type="number"
                  required
                  min={100}
                  value={listingForm.price}
                  onChange={(e) => setListingForm({ ...listingForm, price: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Capacity ({listingForm.category === "stay" ? "Max guests / room" : "Max participants"})
                </label>
                <input
                  type="number"
                  required
                  min={1}
                  value={listingForm.capacity}
                  onChange={(e) => setListingForm({ ...listingForm, capacity: Number(e.target.value) })}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Description
              </label>
              <textarea
                rows={3}
                required
                value={listingForm.description}
                onChange={(e) => setListingForm({ ...listingForm, description: e.target.value })}
                placeholder="Describe the stay, itinerary, authentic craft, or inclusions..."
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                High-Resolution Image URL
              </label>
              <input
                type="url"
                required
                value={listingForm.image}
                onChange={(e) => setListingForm({ ...listingForm, image: e.target.value })}
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-theme-border">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setListingModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={savingListing}
              >
                {savingListing ? "Submitting..." : editingListing ? "Update Listing" : "Submit for Admin Review"}
              </Button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
export default ProviderDashboard;
