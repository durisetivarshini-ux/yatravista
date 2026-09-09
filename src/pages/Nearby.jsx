import React, { useState, useEffect } from "react";
import { 
  Navigation, 
  MapPin, 
  Compass, 
  Sparkles, 
  AlertCircle, 
  Check, 
  Search, 
  ExternalLink, 
  Landmark, 
  Clock, 
  SlidersHorizontal,
  Layers,
  ArrowRight
} from "lucide-react";
import { 
  calculateHaversineDistance, 
  formatDistance, 
  getDirectionsUrl, 
  majorIndianHubs 
} from "../utils/geo";
import { destinations } from "../data/destinations";
import { templesData } from "../data/temples";
import AttractionCard from "../components/attractions/AttractionCard";

export default function Nearby() {
  const [userCoords, setUserCoords] = useState(null);
  const [locationStatus, setLocationStatus] = useState("idle"); // "idle", "requesting", "granted", "denied", "error", "manual"
  const [locationLabel, setLocationLabel] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxRadiusKm, setMaxRadiusKm] = useState(500); // default 500 km radius
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Spiritual", "Heritage", "Nature", "Culture", "Architecture"];

  // Aggregate all places with coordinates
  const allPlaces = [];

  // 1. Temples
  templesData.forEach((t) => {
    if (t.coordinates) {
      allPlaces.push({
        id: `temple-${t.id}`,
        name: t.name,
        category: "Spiritual",
        destination: t.destination,
        state: t.state,
        coordinates: t.coordinates,
        image: t.image,
        imageCredit: t.imageCredit,
        description: t.historicalSignificance,
        duration: `${t.suggestedDurationHours || 3} hours`,
        cost: "Free / Public Access",
        address: t.address,
        isTemple: true
      });
    }
  });

  // 2. Attractions from Destinations
  destinations.forEach((d) => {
    d.attractions?.forEach((att, idx) => {
      // Use attraction coords or fallback to destination coords
      const coords = att.coordinates || d.coordinates;
      if (coords) {
        allPlaces.push({
          id: `att-${d.slug}-${idx}`,
          name: att.name,
          category: att.category || "Heritage",
          destination: d.name,
          state: d.state,
          coordinates: coords,
          image: att.image || d.heroImage,
          imageCredit: att.imageCredit,
          description: att.description || d.shortDescription,
          duration: att.duration || "2 hours",
          cost: att.cost || 0,
          address: att.address || d.name,
          isRegionalExcursion: att.isRegionalExcursion
        });
      }
    });
  });

  // Handle Voluntary Geolocation Request
  const handleRequestLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error");
      setErrorMessage("Geolocation is not supported by your browser. Please select a city manually below.");
      return;
    }

    setLocationStatus("requesting");
    setErrorMessage("");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserCoords({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLocationStatus("granted");
        setLocationLabel("Current Device GPS");
      },
      (error) => {
        setLocationStatus("denied");
        if (error.code === error.PERMISSION_DENIED) {
          setErrorMessage("Location permission was denied. You can select your current starting city manually below.");
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          setErrorMessage("Location position is currently unavailable. Please pick a city manually.");
        } else if (error.code === error.TIMEOUT) {
          setErrorMessage("Location request timed out. Please try again or select manually.");
        } else {
          setErrorMessage("Unable to retrieve location. Please choose a city below.");
        }
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  };

  // Handle Manual Hub Selection
  const handleSelectManualHub = (hub) => {
    setUserCoords({ lat: hub.lat, lng: hub.lng });
    setLocationStatus("manual");
    setLocationLabel(`${hub.name}, ${hub.state}`);
  };

  // Calculate distances & filter
  const calculatedPlaces = allPlaces.map((place) => {
    let distance = null;
    if (userCoords && place.coordinates) {
      distance = calculateHaversineDistance(
        userCoords.lat,
        userCoords.lng,
        place.coordinates.lat,
        place.coordinates.lng
      );
    }
    return { ...place, distance };
  });

  // Filter & Sort
  const filteredPlaces = calculatedPlaces
    .filter((p) => {
      if (userCoords && p.distance !== null && p.distance > maxRadiusKm) {
        return false;
      }
      if (selectedCategory !== "All") {
        if (selectedCategory === "Spiritual" && !p.isTemple && p.category !== "Spiritual") {
          return false;
        }
        if (selectedCategory !== "Spiritual" && p.category?.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(q);
        const matchDest = p.destination.toLowerCase().includes(q);
        const matchState = p.state.toLowerCase().includes(q);
        if (!matchName && !matchDest && !matchState) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (a.distance === null) return 0;
      if (b.distance === null) return 0;
      return a.distance - b.distance;
    });

  return (
    <div className="min-h-screen bg-stone-50/60 dark:bg-stone-950 py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Hero */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300">
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              <span>Proximity & Directions Explorer</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 dark:text-white">
              Nearby Places & Directions
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
              Use your location to calculate approximate straight-line distances to nearby heritage monuments, sacred temples, and scenic getaways with 1-click external navigation.
            </p>

            {/* Privacy & Methodology Guarantee */}
            <div className="text-[11px] text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-800/60 p-2.5 rounded-xl border border-stone-200 dark:border-stone-700">
              ℹ️ <strong>Privacy Notice:</strong> Geolocation is strictly voluntary and requested only when you click the button. Precise coordinates are never saved to analytics, database, or persistent profile records. Distance is calculated straight-line (Haversine formula).
            </div>
          </div>
        </div>

        {/* Location Controls Card */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-stone-700 dark:text-stone-300">
                1. Set Your Starting Location
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Current Origin: <strong className="text-amber-700 dark:text-amber-400">{locationLabel || "Not Set (Showing All India)"}</strong>
              </p>
            </div>

            {/* "Use My Location" Button */}
            <button
              type="button"
              onClick={handleRequestLocation}
              disabled={locationStatus === "requesting"}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 self-start sm:self-auto disabled:opacity-50"
            >
              <Navigation className="w-4 h-4" />
              <span>{locationStatus === "requesting" ? "Locating..." : "Use My Location"}</span>
            </button>
          </div>

          {/* Error / Denied Feedback */}
          {errorMessage && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Manual Hub Selection Quick Pills */}
          <div className="pt-2 border-t border-stone-100 dark:border-stone-800 space-y-2">
            <div className="text-[11px] font-semibold text-stone-500 dark:text-stone-400">
              Or Choose a City / Hub Manually:
            </div>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {majorIndianHubs.map((hub) => (
                <button
                  key={hub.name}
                  type="button"
                  onClick={() => handleSelectManualHub(hub)}
                  className={`px-2.5 py-1 text-xs rounded-lg border transition-all flex items-center gap-1 ${
                    locationLabel === `${hub.name}, ${hub.state}`
                      ? "bg-amber-600 text-white border-amber-600 font-semibold shadow-xs"
                      : "bg-stone-50 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-100"
                  }`}
                >
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{hub.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter Bar (Categories, Radius, Keyword Search) */}
        <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-4 shadow-sm space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            
            {/* Search */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search attraction, city, or temple..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs md:text-sm bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl focus:ring-2 focus:ring-amber-500 text-stone-800 dark:text-stone-100"
              />
            </div>

            {/* Radius Slider (if userCoords available) */}
            {userCoords && (
              <div className="md:col-span-4 flex items-center gap-2 text-xs">
                <span className="text-stone-500 whitespace-nowrap">Radius:</span>
                <input
                  type="range"
                  min="50"
                  max="1500"
                  step="50"
                  value={maxRadiusKm}
                  onChange={(e) => setMaxRadiusKm(Number(e.target.value))}
                  className="w-full accent-amber-600 cursor-pointer"
                />
                <span className="font-semibold text-stone-700 dark:text-stone-300 whitespace-nowrap">
                  {maxRadiusKm} km
                </span>
              </div>
            )}

            {/* Clear Filters */}
            <div className={`${userCoords ? 'md:col-span-3' : 'md:col-span-7'} flex justify-end`}>
              {(selectedCategory !== "All" || searchQuery || userCoords) && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchQuery("");
                    setUserCoords(null);
                    setLocationLabel("");
                    setLocationStatus("idle");
                  }}
                  className="text-xs text-amber-700 dark:text-amber-400 font-semibold hover:underline"
                >
                  Reset All Filters
                </button>
              )}
            </div>

          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-stone-100 dark:border-stone-800 text-xs">
            <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider shrink-0 mr-1">
              Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg font-medium shrink-0 transition-all ${
                  selectedCategory === cat
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 hover:bg-stone-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
          <span>
            Showing <strong>{filteredPlaces.length}</strong> verified locations {userCoords ? `sorted by straight-line distance from ${locationLabel}` : "(Pan-India)"}
          </span>
        </div>

        {/* Results Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-3xl p-12 text-center text-stone-400 space-y-3">
            <Compass className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-700" />
            <p className="text-base font-medium text-stone-600 dark:text-stone-300">
              No places found within this search criteria or radius.
            </p>
            <p className="text-xs text-stone-400 max-w-md mx-auto">
              Try increasing your radius slider or changing category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="group bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
                    <img
                      src={place.image}
                      alt={place.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Category Pill */}
                    <div className="absolute top-3 left-3 flex gap-1">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-stone-900/80 backdrop-blur-xs text-amber-300">
                        {place.category}
                      </span>
                    </div>

                    {/* Distance Badge if available */}
                    {place.distance !== null && (
                      <div className="absolute top-3 right-3 px-2.5 py-1 bg-amber-500/95 text-stone-950 text-xs font-bold rounded-full shadow-sm">
                        {formatDistance(place.distance)}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 dark:text-stone-400">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span className="truncate">{place.destination}, {place.state}</span>
                    </div>

                    <h3 className="font-serif text-lg font-bold text-stone-900 dark:text-white group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
                      {place.name}
                    </h3>

                    <p className="text-xs text-stone-600 dark:text-stone-300 line-clamp-2 leading-relaxed">
                      {place.description}
                    </p>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 pt-2 border-t border-stone-100 dark:border-stone-800/80 grid grid-cols-2 gap-2">
                  <a
                    href={getDirectionsUrl(place.coordinates, place.name, `${place.destination}, ${place.state}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-600" />
                    <span>Get Directions</span>
                    <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
                  </a>

                  <a
                    href={`/destinations/${place.destination.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex items-center justify-center gap-1 px-3 py-2 text-xs font-semibold rounded-xl bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                  >
                    <span>View Guide</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
