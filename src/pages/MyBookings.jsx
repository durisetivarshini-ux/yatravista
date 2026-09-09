import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Wallet, 
  CheckCircle2, 
  Clock3, 
  XCircle, 
  AlertCircle, 
  Printer, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  ExternalLink,
  PlusCircle,
  FileText
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTrip } from "../context/TripContext";
import { api } from "../utils/api";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";

export function MyBookings() {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const { savedTrips } = useTrip();
  const navigate = useNavigate();

  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all"); // "all", "upcoming", "pending", "past", "cancelled"
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // Cancellation Modal state
  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [cancelTarget, setCancelTarget] = useState(null);
  const [cancelReason, setCancelReason] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await api.getMyBookings();
      setBookings(res.bookings || []);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, user?.id]);

  const handleCancelBooking = async () => {
    if (!cancelTarget) return;
    setCancelling(true);
    try {
      await api.cancelBooking(cancelTarget.id, cancelReason);
      setCancelModalOpen(false);
      setCancelTarget(null);
      setCancelReason("");
      await fetchBookings();
    } catch (err) {
      alert(err.message || "Failed to cancel booking.");
    } finally {
      setCancelling(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    if (activeTab === "all") return true;
    if (activeTab === "upcoming") return b.booking_status === "confirmed";
    if (activeTab === "pending") return b.booking_status === "pending";
    if (activeTab === "cancelled") return b.booking_status === "cancelled" || b.booking_status === "declined";
    if (activeTab === "past") return b.booking_status === "confirmed" && new Date(b.check_in_date) < new Date();
    return true;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case "confirmed":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
            <CheckCircle2 className="w-3 h-3" />
            <span>Confirmed</span>
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-700 border border-amber-500/20">
            <Clock3 className="w-3 h-3" />
            <span>Pending Host Approval</span>
          </span>
        );
      case "declined":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-500/10 text-red-700 border border-red-500/20">
            <XCircle className="w-3 h-3" />
            <span>Declined by Host</span>
          </span>
        );
      case "cancelled":
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-zinc-500/10 text-zinc-600 border border-zinc-500/20">
            <XCircle className="w-3 h-3" />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-theme-primary-light text-theme-primary flex items-center justify-center mx-auto">
          <Building className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-theme-text">Sign In to View Your Bookings</h2>
        <p className="text-sm text-theme-text-muted max-w-md mx-auto">
          Access your confirmed stays, artisan workshops, local guided tours, and printable travel summaries.
        </p>
        <Button variant="primary" size="md" onClick={() => openAuthModal("login")}>
          Sign In / Demo Login
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-theme-border">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent">
              Traveller Portal
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-theme-primary-light text-theme-primary">
              Real-time Database
            </span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-theme-text mt-1">
            My Bookings & Reservations
          </h1>
          <p className="text-sm text-theme-text-muted mt-1">
            Track pending requests, confirmed stays, artisan workshops, and provider communication.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            to="/explore"
            variant="secondary"
            size="sm"
          >
            Explore More
          </Button>
          <Button
            to="/planner"
            variant="primary"
            size="sm"
            icon={ArrowRight}
            iconPosition="right"
          >
            Open Trip Planner
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-theme-border">
        {[
          { id: "all", label: `All Bookings (${bookings.length})` },
          { id: "upcoming", label: `Confirmed (${bookings.filter(b => b.booking_status === "confirmed").length})` },
          { id: "pending", label: `Pending (${bookings.filter(b => b.booking_status === "pending").length})` },
          { id: "cancelled", label: `Cancelled (${bookings.filter(b => b.booking_status === "cancelled" || b.booking_status === "declined").length})` }
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-theme-primary text-white shadow-soft"
                : "bg-theme-surface border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {loading ? (
        <div className="py-20 text-center text-sm text-theme-text-muted">
          Loading your bookings...
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-theme-surface border border-theme-border space-y-4">
          <div className="w-12 h-12 rounded-full bg-theme-bg flex items-center justify-center mx-auto text-theme-text-subtle">
            <Building className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-serif font-bold text-theme-text">No Bookings Found</h3>
          <p className="text-xs text-theme-text-muted max-w-md mx-auto">
            You don't have any bookings in this view. Browse curated heritage stays, guided tours, and artisan workshops to start your journey.
          </p>
          <Button to="/stays" variant="primary" size="sm">
            Browse Heritage Stays
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredBookings.map((b) => {
            const isStay = b.booking_type === "stay";
            return (
              <div
                key={b.id}
                className="p-5 rounded-2xl bg-theme-surface border border-theme-border hover:shadow-soft transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5"
              >
                {/* Left Listing Info */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <img
                    src={b.listing_image || "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=300&q=80"}
                    alt={b.listing_title}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 border border-theme-border"
                  />
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold text-theme-primary uppercase px-2 py-0.5 rounded bg-theme-primary-light">
                        {b.booking_reference}
                      </span>
                      {getStatusBadge(b.booking_status)}
                      <span className="text-xs text-theme-text-subtle capitalize">• {b.booking_type}</span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-theme-text truncate">
                      {b.listing_title}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-theme-text-muted flex-wrap">
                      <span className="flex items-center gap-1 font-medium text-theme-text">
                        <Calendar className="w-3.5 h-3.5 text-theme-accent" />
                        <span>{isStay ? `${b.check_in_date} to ${b.check_out_date}` : `${b.check_in_date} (${b.slot_time || "Morning"})`}</span>
                      </span>
                      <span>
                        • {isStay ? `${b.guests_count} Guests, ${b.rooms_count} Room(s)` : `${b.guests_count} Participant(s)`}
                      </span>
                    </div>

                    <div className="text-xs text-theme-text-subtle flex items-center gap-1">
                      <span>Hosted by</span>
                      <Link to={`/providers/${b.provider_id}`} className="font-medium text-theme-text hover:text-theme-primary underline">
                        {b.provider_business_name || b.provider_name}
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Right Actions & Amount */}
                <div className="flex md:flex-col items-end justify-between md:justify-center w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-theme-border shrink-0 gap-3">
                  <div className="text-left md:text-right">
                    <span className="text-[10px] uppercase font-semibold text-theme-text-subtle block">Total Booked Amount</span>
                    <span className="text-lg font-serif font-bold text-theme-primary">{formatINR(b.total_amount)}</span>
                    <span className="text-[10px] text-theme-text-subtle block">
                      {b.payment_status === "demo_confirmed" ? "Demo Paid (Sandbox)" : "Payment at Check-in"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setSelectedBooking(b)}
                    >
                      Summary Details
                    </Button>

                    {b.booking_status === "pending" || b.booking_status === "confirmed" ? (
                      <button
                        type="button"
                        onClick={() => {
                          setCancelTarget(b);
                          setCancelModalOpen(true);
                        }}
                        className="text-xs font-semibold text-red-600 hover:text-red-700 px-2.5 py-1.5 rounded-lg border border-red-200 hover:bg-red-50 transition-colors"
                      >
                        Cancel
                      </button>
                    ) : null}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Booking Summary Details Modal */}
      {selectedBooking && (
        <Modal
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          title={`Booking Summary • ${selectedBooking.booking_reference}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-5">
            
            <div className="p-4 rounded-xl bg-theme-bg/80 border border-theme-border space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-theme-text-subtle font-semibold block">
                    Booking Reference
                  </span>
                  <span className="text-sm font-mono font-bold text-theme-primary">
                    {selectedBooking.booking_reference}
                  </span>
                </div>
                <div>{getStatusBadge(selectedBooking.booking_status)}</div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-theme-border text-xs">
                <div>
                  <span className="text-theme-text-subtle block text-[11px]">Listing:</span>
                  <span className="font-semibold text-theme-text">{selectedBooking.listing_title}</span>
                </div>
                <div>
                  <span className="text-theme-text-subtle block text-[11px]">Provider:</span>
                  <span className="font-semibold text-theme-text">{selectedBooking.provider_business_name || selectedBooking.provider_name}</span>
                </div>
                <div>
                  <span className="text-theme-text-subtle block text-[11px]">Dates / Schedule:</span>
                  <span className="font-semibold text-theme-text">
                    {selectedBooking.booking_type === "stay" 
                      ? `${selectedBooking.check_in_date} to ${selectedBooking.check_out_date}` 
                      : `${selectedBooking.check_in_date} • ${selectedBooking.slot_time || "Day Slot"}`}
                  </span>
                </div>
                <div>
                  <span className="text-theme-text-subtle block text-[11px]">Guests / Units:</span>
                  <span className="font-semibold text-theme-text">
                    {selectedBooking.booking_type === "stay"
                      ? `${selectedBooking.guests_count} Guests (${selectedBooking.rooms_count} Room)`
                      : `${selectedBooking.guests_count} Person(s)`}
                  </span>
                </div>
              </div>
            </div>

            {/* Price Snapshot */}
            {selectedBooking.price_snapshot && (
              <div className="p-3.5 rounded-xl bg-theme-surface border border-theme-border text-xs space-y-1.5">
                <div className="font-semibold text-theme-text mb-2">Price Breakdown Snapshot</div>
                <div className="flex justify-between text-theme-text-muted">
                  <span>Base Rate per Unit:</span>
                  <span>{formatINR(selectedBooking.price_snapshot.price_per_unit || selectedBooking.price_per_unit)}</span>
                </div>
                <div className="flex justify-between text-theme-text-muted">
                  <span>Taxes & Fees (GST 5%):</span>
                  <span>{formatINR(selectedBooking.taxes_fees)}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-theme-border font-bold text-sm text-theme-text">
                  <span>Total Amount:</span>
                  <span className="text-theme-primary font-serif">{formatINR(selectedBooking.total_amount)}</span>
                </div>
              </div>
            )}

            {/* Provider notes / Decline reason */}
            {selectedBooking.provider_notes && (
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800">
                <strong>Host Confirmation Note:</strong> {selectedBooking.provider_notes}
              </div>
            )}

            {selectedBooking.cancellation_reason && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-800">
                <strong>Cancellation / Decline Reason:</strong> {selectedBooking.cancellation_reason}
              </div>
            )}

            {/* Print & Planner Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                icon={Printer}
                onClick={() => window.print()}
              >
                Print Summary
              </Button>

              <Button
                to={`/planner?destination=${selectedBooking.destination_slug || "jaipur"}`}
                variant="primary"
                size="sm"
                icon={PlusCircle}
              >
                Link to Itinerary Planner
              </Button>
            </div>

            <p className="text-[10px] text-theme-text-subtle text-center">
              * A booking summary is a verification voucher and not a legal tax invoice.
            </p>
          </div>
        </Modal>
      )}

      {/* Cancellation Confirmation Modal */}
      {cancelModalOpen && cancelTarget && (
        <Modal
          isOpen={cancelModalOpen}
          onClose={() => setCancelModalOpen(false)}
          title="Cancel Booking Request"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <p className="text-xs text-theme-text-muted">
              Are you sure you want to cancel booking <strong className="text-theme-text">{cancelTarget.booking_reference}</strong> for <strong>{cancelTarget.listing_title}</strong>?
            </p>

            <div>
              <label className="block text-xs font-medium text-theme-text-muted mb-1">
                Reason for Cancellation (Optional)
              </label>
              <textarea
                rows={2}
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                placeholder="e.g. Change of travel plans, flight rescheduled..."
                className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
              />
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setCancelModalOpen(false)}
              >
                Keep Booking
              </Button>
              <button
                type="button"
                onClick={handleCancelBooking}
                disabled={cancelling}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                {cancelling ? "Cancelling..." : "Confirm Cancellation"}
              </button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default MyBookings;
