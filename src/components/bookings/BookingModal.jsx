import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Calendar, 
  Users, 
  BedDouble, 
  Clock, 
  ShieldCheck, 
  Info, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle,
  ArrowRight,
  FileText
} from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../utils/api";
import { formatINR } from "../../utils/currencyFormatter";
import confetti from "canvas-confetti";

export function BookingModal({ listing, isOpen, onClose, defaultDate }) {
  const { user, isAuthenticated, openAuthModal } = useAuth();
  const navigate = useNavigate();

  // Tomorrow as min date
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);

  const threeDaysLaterStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split("T")[0];
  }, []);

  const isStay = listing?.category === "stay";

  // Form State
  const [checkInDate, setCheckInDate] = useState(defaultDate || tomorrowStr);
  const [checkOutDate, setCheckOutDate] = useState(threeDaysLaterStr);
  const [slotTime, setSlotTime] = useState("10:00 AM - 01:00 PM");
  const [guestsCount, setGuestsCount] = useState(2);
  const [roomsCount, setRoomsCount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [error, setError] = useState("");

  // Calculate pricing
  const calculation = useMemo(() => {
    if (!listing) return { nights: 1, units: 1, subtotal: 0, taxes: 0, total: 0 };

    const price = listing.price || 0;
    let units = 1;
    let nights = 1;

    if (isStay) {
      const d1 = new Date(checkInDate);
      const d2 = new Date(checkOutDate);
      nights = Math.max(1, Math.round((d2 - d1) / (1000 * 60 * 60 * 24)) || 1);
      units = nights * (roomsCount || 1);
    } else {
      units = guestsCount || 1;
    }

    const subtotal = price * units;
    const taxes = Math.round(subtotal * 0.05); // 5% GST & Demo service fee
    const total = subtotal + taxes;

    return { nights, units, subtotal, taxes, total };
  }, [listing, isStay, checkInDate, checkOutDate, roomsCount, guestsCount]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!isAuthenticated) {
      openAuthModal("login");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        listing_id: listing.id,
        check_in_date: checkInDate,
        check_out_date: isStay ? checkOutDate : undefined,
        slot_time: !isStay ? slotTime : undefined,
        guests_count: Number(guestsCount),
        rooms_count: isStay ? Number(roomsCount) : undefined,
        special_requests: specialRequests
      };

      const res = await api.createBooking(payload);
      setConfirmedBooking(res.booking);

      // Trigger celebratory confetti
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (err) {
      setError(err.message || "Failed to submit booking request. Please check your dates and capacity.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleModalClose = () => {
    setConfirmedBooking(null);
    setError("");
    onClose();
  };

  if (!listing) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      title={confirmedBooking ? "Booking Request Submitted" : `Request to Book • ${listing.title}`}
      maxWidth="max-w-xl"
    >
      {confirmedBooking ? (
        /* Success Screen */
        <div className="text-center py-4 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <h3 className="text-xl font-serif font-bold text-theme-text">
              Request Sent to Host!
            </h3>
            <p className="text-xs text-theme-text-muted mt-1 max-w-md mx-auto">
              Your booking request reference is <span className="font-mono font-bold text-theme-primary">{confirmedBooking.booking_reference}</span>. 
              The provider will review your request and confirm availability shortly.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-theme-bg border border-theme-border text-left text-xs space-y-2 max-w-md mx-auto">
            <div className="flex justify-between">
              <span className="text-theme-text-subtle">Listing:</span>
              <span className="font-medium text-theme-text truncate max-w-[220px]">{listing.title}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-subtle">Dates / Timing:</span>
              <span className="font-medium text-theme-text">
                {isStay ? `${checkInDate} to ${checkOutDate} (${calculation.nights} nights)` : `${checkInDate} • ${slotTime}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-theme-text-subtle">Guests / Units:</span>
              <span className="font-medium text-theme-text">
                {isStay ? `${guestsCount} Guests (${roomsCount} Room)` : `${guestsCount} Participants`}
              </span>
            </div>
            <div className="flex justify-between pt-2 border-t border-theme-border font-semibold text-theme-primary">
              <span>Estimated Total (Snapshot):</span>
              <span>{formatINR(calculation.total)}</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="secondary"
              size="md"
              onClick={handleModalClose}
            >
              Continue Browsing
            </Button>
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => {
                handleModalClose();
                navigate("/bookings");
              }}
            >
              Go to My Bookings
            </Button>
          </div>
        </div>
      ) : (
        /* Booking Request Form */
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Listing Snippet */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-theme-bg/60 border border-theme-border">
            <img
              src={listing.image}
              alt={listing.title}
              className="w-16 h-14 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-serif font-bold text-theme-text truncate">{listing.title}</h4>
              <p className="text-[11px] text-theme-accent italic truncate">{listing.tagline}</p>
              <div className="text-xs font-semibold text-theme-primary mt-0.5">
                {formatINR(listing.price)} <span className="text-[10px] font-normal text-theme-text-muted">/ {listing.price_unit?.replace("_", " ")}</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Date & Guest Inputs */}
          {isStay ? (
            /* Stay Dates */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    required
                    min={tomorrowStr}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    required
                    min={checkInDate || tomorrowStr}
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Number of Rooms
                  </label>
                  <select
                    value={roomsCount}
                    onChange={(e) => setRoomsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  >
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>{num} Room{num > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Total Guests
                  </label>
                  <select
                    value={guestsCount}
                    onChange={(e) => setGuestsCount(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  >
                    {[1, 2, 3, 4, 5, 6, 8].map((num) => (
                      <option key={num} value={num}>{num} Guest{num > 1 ? "s" : ""}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ) : (
            /* Experience / Tour Dates */
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Session Date
                  </label>
                  <input
                    type="date"
                    required
                    min={tomorrowStr}
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-theme-text-muted mb-1">
                    Available Time Slot
                  </label>
                  <select
                    value={slotTime}
                    onChange={(e) => setSlotTime(e.target.value)}
                    className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                  >
                    <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="10:00 AM - 01:00 PM">Midday (10:00 AM - 01:00 PM)</option>
                    <option value="02:30 PM - 05:30 PM">Afternoon (02:30 PM - 05:30 PM)</option>
                    <option value="06:00 PM - 08:30 PM">Evening Sunset (06:00 PM - 08:30 PM)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-theme-text-muted mb-1">
                  Number of Participants (Max {listing.capacity || 8})
                </label>
                <select
                  value={guestsCount}
                  onChange={(e) => setGuestsCount(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                >
                  {Array.from({ length: listing.capacity || 8 }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num} Person{num > 1 ? "s" : ""}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Special Requests */}
          <div>
            <label className="block text-xs font-medium text-theme-text-muted mb-1">
              Special Requests / Dietary Preferences (Optional)
            </label>
            <input
              type="text"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              placeholder="e.g. Vegetarian breakfast, early check-in, ground floor room..."
              className="w-full px-3 py-2 bg-theme-bg border border-theme-border rounded-xl text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
            />
          </div>

          {/* Price Breakdown */}
          <div className="p-3.5 rounded-xl bg-theme-bg/80 border border-theme-border text-xs space-y-2">
            <div className="font-semibold text-theme-text flex items-center justify-between">
              <span>Transparent Price Breakdown</span>
              <span className="text-[10px] font-normal text-theme-text-subtle">Snapshot basis</span>
            </div>

            <div className="flex justify-between text-theme-text-muted">
              <span>
                {formatINR(listing.price)} × {isStay ? `${calculation.nights} night(s) × ${roomsCount} room` : `${guestsCount} participant(s)`}
              </span>
              <span>{formatINR(calculation.subtotal)}</span>
            </div>

            <div className="flex justify-between text-theme-text-muted">
              <span>Estimated Taxes & Platform GST (5%)</span>
              <span>{formatINR(calculation.taxes)}</span>
            </div>

            <div className="flex justify-between pt-2 border-t border-theme-border text-sm font-bold text-theme-text">
              <span>Estimated Total</span>
              <span className="text-theme-primary font-serif text-base">{formatINR(calculation.total)}</span>
            </div>
          </div>

          {/* Policy & Trust Note */}
          <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-[11px] text-emerald-800 space-y-1">
            <div className="font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Cancellation Terms & Host Confirmation:</span>
            </div>
            <p className="text-[10px] text-emerald-700 leading-relaxed">
              {listing.cancellation_policy || "Free cancellation up to 48 hours prior to start."}
            </p>
            <p className="text-[9px] text-emerald-600 italic">
              * This is a demonstration student prototype. Submission creates a pending request with capacity verification.
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center"
            disabled={submitting}
          >
            {submitting ? "Submitting Booking Request..." : "Request to Book (No Immediate Charge)"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
export default BookingModal;
