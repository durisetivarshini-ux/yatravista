import React, { useState } from "react";
import { 
  Landmark, 
  MapPin, 
  Clock, 
  Navigation, 
  ExternalLink, 
  ShieldCheck, 
  Sparkles, 
  Calendar,
  Info,
  ChevronDown,
  Plus
} from "lucide-react";
import { getDirectionsUrl } from "../../utils/geo";
import { useTrip } from "../../context/TripContext";

export default function TempleCard({ temple, onPlanPilgrimage }) {
  const [showDetails, setShowDetails] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { addActivityToDay } = useTrip();
  const [toast, setToast] = useState(false);

  const fallbackImage = "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1000&q=80";

  const directionsUrl = getDirectionsUrl(
    temple.coordinates,
    temple.name,
    `${temple.destination}, ${temple.state}`
  );

  const handleAddPilgrimage = () => {
    if (onPlanPilgrimage) {
      onPlanPilgrimage(temple);
      return;
    }
    if (addActivityToDay) {
      addActivityToDay(1, {
        title: `${temple.commonName || temple.name} Darshan`,
        category: "Spiritual",
        cost: 0,
        timeSlot: "Morning",
        duration: `${temple.suggestedDurationHours || 3} hours`
      });
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    }
  };

  return (
    <div className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between">
      {/* Top Media Header */}
      <div className="relative h-56 md:h-64 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={imgError ? fallbackImage : (temple.image || fallbackImage)}
          alt={temple.name}
          onError={() => setImgError(true)}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />

        {/* Floating Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Circuit Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider bg-amber-500/90 text-stone-950 rounded-full shadow-sm">
            {temple.circuit || "Spiritual Heritage"}
          </span>
        </div>

        {/* Image Credit */}
        {temple.imageCredit && (
          <div className="absolute top-3 right-3 text-[9px] text-white/80 bg-black/50 px-2 py-0.5 rounded-full backdrop-blur-xs">
            {temple.imageCredit}
          </div>
        )}

        {/* Temple Name on Gradient */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-1.5 text-xs text-amber-300 mb-0.5 font-medium">
            <MapPin className="w-3.5 h-3.5" />
            <span>{temple.destination}, {temple.state}</span>
          </div>
          <h3 className="font-serif text-xl font-bold leading-snug drop-shadow-sm">
            {temple.name}
          </h3>
          {temple.commonName && temple.commonName !== temple.name && (
            <p className="text-xs text-stone-300 italic">
              Known as: {temple.commonName}
            </p>
          )}
        </div>
      </div>

      {/* Main Content Body */}
      <div className="p-4 md:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Deity & Tradition Highlights */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 rounded-xl p-3 text-xs space-y-1">
            <div className="flex items-start gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-stone-900 dark:text-white">Presiding Deity: </span>
                <span className="text-stone-700 dark:text-stone-300">{temple.deity}</span>
              </div>
            </div>
            <div className="flex items-start gap-2 text-[11px] text-stone-600 dark:text-stone-400">
              <Landmark className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-stone-800 dark:text-stone-200">Tradition: </span>
                <span>{temple.tradition}</span>
              </div>
            </div>
          </div>

          {/* Historical Significance */}
          <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {temple.historicalSignificance}
          </p>

          {/* Collapsible Etiquette & Visitor Guidelines */}
          <div className="border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full px-3 py-2 text-xs font-semibold flex items-center justify-between bg-stone-50 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-750 transition-colors"
            >
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                <Info className="w-3.5 h-3.5" />
                <span>Visitor Protocol & Dress Code</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showDetails ? "rotate-180" : ""}`} />
            </button>

            {showDetails && (
              <div className="p-3 bg-white dark:bg-stone-900 text-xs space-y-2 border-t border-stone-100 dark:border-stone-800 text-stone-600 dark:text-stone-300 animate-in fade-in duration-200">
                <div>
                  <span className="font-semibold text-stone-900 dark:text-white">Dress Code: </span>
                  <span>{temple.visitorEtiquette?.dressCode || "Traditional Indian attire required."}</span>
                </div>
                {temple.visitorEtiquette?.electronicsPolicy && (
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Electronics: </span>
                    <span>{temple.visitorEtiquette.electronicsPolicy}</span>
                  </div>
                )}
                {temple.bestVisitingMonths && (
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-white">Best Season: </span>
                    <span>{temple.bestVisitingMonths}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer & Actions */}
        <div className="pt-3 border-t border-stone-100 dark:border-stone-800 space-y-2.5">
          {/* Official Portal Link (Crucial for Genuine Bookings / Darshan) */}
          {temple.officialPortal && (
            <div className="flex items-center justify-between text-[11px] bg-stone-50 dark:bg-stone-800/60 p-2 rounded-lg">
              <div className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{temple.officialPortal.name}</span>
              </div>
              <a
                href={temple.officialPortal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-700 dark:text-amber-400 hover:underline flex items-center gap-0.5 shrink-0 ml-2 font-semibold"
                title="Open official administration portal"
              >
                <span>Official Link</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          )}

          {/* Action Buttons Grid */}
          <div className="grid grid-cols-2 gap-2">
            <a
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
            >
              <Navigation className="w-3.5 h-3.5 text-amber-600" />
              <span>Get Directions</span>
            </a>

            <button
              type="button"
              onClick={handleAddPilgrimage}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>{toast ? "Added to Trip!" : "Plan Pilgrimage"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
