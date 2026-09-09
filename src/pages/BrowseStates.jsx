import React, { useState } from "react";
import { 
  MapPin, 
  Search, 
  Layers, 
  Compass, 
  ShieldCheck, 
  Check, 
  ArrowRight,
  Landmark,
  Building,
  Flag
} from "lucide-react";
import { Link } from "react-router-dom";
import { statesAndUTs, getZoneList } from "../data/statesAndUTs";
import { destinations } from "../data/destinations";

export default function BrowseStates() {
  const [selectedZone, setSelectedZone] = useState("All Zones");
  const [selectedType, setSelectedType] = useState("All"); // "All", "State", "Union Territory"
  const [search, setSearch] = useState("");

  const zones = getZoneList();

  const filteredStates = statesAndUTs.filter((item) => {
    if (selectedZone !== "All Zones" && item.zone !== selectedZone) {
      return false;
    }
    if (selectedType !== "All" && item.type !== selectedType) {
      return false;
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = item.name.toLowerCase().includes(q);
      const matchCapital = item.capital.toLowerCase().includes(q);
      const matchAttraction = item.topAttractions?.some((a) => a.toLowerCase().includes(q));
      if (!matchName && !matchCapital && !matchAttraction) return false;
    }
    return true;
  });

  const statesCount = statesAndUTs.filter((s) => s.type === "State").length;
  const utsCount = statesAndUTs.filter((s) => s.type === "Union Territory").length;

  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">
              <Layers className="w-3.5 h-3.5 text-amber-600" />
              <span>Pan-India Geographic Coverage</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Browse India by State & Union Territory
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Explore the unique cultural tapestry, heritage temples, culinary traditions, and top tourist circuits across all <strong>{statesCount} States</strong> and <strong>{utsCount} Union Territories</strong>.
            </p>

            {/* Coverage Summary Chip */}
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
              <span className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 rounded-lg font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Pan-India Coverage (36 Jurisdictions)</span>
              </span>
              <span className="px-3 py-1 bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 rounded-lg">
                60+ Verified Destination Circuits
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search Input */}
            <div className="md:col-span-6 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search state, capital, or top landmark (e.g., Srisailam, Taj Mahal, Leh)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
              />
            </div>

            {/* Type Selector (State / UT) */}
            <div className="md:col-span-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
              >
                <option value="All">All Types ({statesAndUTs.length})</option>
                <option value="State">States ({statesCount})</option>
                <option value="Union Territory">Union Territories ({utsCount})</option>
              </select>
            </div>

            {/* Clear Button */}
            <div className="md:col-span-3 flex justify-end">
              {(selectedZone !== "All Zones" || selectedType !== "All" || search) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedZone("All Zones");
                    setSelectedType("All");
                    setSearch("");
                  }}
                  className="px-3 py-1.5 text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  Reset Filters
                </button>
              )}
            </div>

          </div>

          {/* Zones Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider shrink-0 mr-1">
              Zone:
            </span>
            {zones.map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setSelectedZone(z)}
                className={`px-3 py-1 rounded-lg font-medium shrink-0 transition-all ${
                  selectedZone === z
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
                }`}
              >
                {z}
              </button>
            ))}
          </div>
        </div>

        {/* States & UTs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStates.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* State Banner Image */}
                <div className="relative h-44 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 backdrop-blur-xs text-amber-300">
                      {item.zone} Zone
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-white/80 dark:bg-stone-900/80 backdrop-blur-xs text-stone-800 dark:text-stone-200">
                      {item.type}
                    </span>
                  </div>

                  {/* Name on Image */}
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="font-serif text-xl font-bold leading-tight drop-shadow-sm">
                      {item.name}
                    </h3>
                    <p className="text-[11px] text-stone-300">
                      Capital: <span className="text-amber-200 font-medium">{item.capital}</span>
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Top Attractions Chips */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1.5">
                      Key Highlights & Landmarks:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {item.topAttractions?.map((att, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[11px] bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 rounded-md"
                        >
                          {att}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-4 pt-0">
                <Link
                  to={`/explore?state=${encodeURIComponent(item.name)}`}
                  className="w-full py-2 bg-stone-50 dark:bg-stone-800 hover:bg-amber-600 hover:text-white dark:hover:bg-amber-600 text-stone-800 dark:text-stone-200 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore {item.name} Destinations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
