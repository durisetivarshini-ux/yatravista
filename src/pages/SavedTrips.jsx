import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Bookmark, 
  CalendarDays, 
  Trash2, 
  Edit3, 
  AlertTriangle, 
  Compass, 
  Info,
  Copy,
  Download,
  Upload,
  Search,
  ArrowUpDown,
  Luggage
} from "lucide-react";
import { useTrip } from "../context/TripContext";
import { destinations } from "../data/destinations";
import { formatINR } from "../utils/currencyFormatter";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { EmptyState } from "../components/ui/EmptyState";
import { DestinationCard } from "../components/destinations/DestinationCard";
import { TripChecklist } from "../components/planner/TripChecklist";

export function SavedTrips() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const { 
    savedDestinations, 
    savedTrips, 
    deleteSavedTrip, 
    renameSavedTrip,
    duplicateSavedTrip,
    updateTripChecklist,
    importTrip,
    setActiveItinerary
  } = useTrip();

  const [activeTab, setActiveTab] = useState("itineraries");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("updated-desc");
  const [deleteConfirmTripId, setDeleteConfirmTripId] = useState(null);
  const [renameTripModal, setRenameTripModal] = useState(null);
  const [renameInput, setRenameInput] = useState("");
  const [activeChecklistTrip, setActiveChecklistTrip] = useState(null);

  // Hydrate saved destinations
  const hydratedDestinations = destinations.filter((d) =>
    savedDestinations.includes(d.slug)
  );

  // Filter & Sort saved trips
  const filteredTrips = useMemo(() => {
    return (savedTrips || [])
      .filter((trip) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
          trip.title?.toLowerCase().includes(q) ||
          trip.destinationName?.toLowerCase().includes(q) ||
          trip.destinationSlug?.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        if (sortBy === "updated-desc") {
          return new Date(b.updatedAt || b.savedAt || 0) - new Date(a.updatedAt || a.savedAt || 0);
        }
        if (sortBy === "name-asc") {
          return (a.title || "").localeCompare(b.title || "");
        }
        if (sortBy === "destination") {
          return (a.destinationName || "").localeCompare(b.destinationName || "");
        }
        if (sortBy === "budget-desc") {
          return (b.budget || 0) - (a.budget || 0);
        }
        return 0;
      });
  }, [savedTrips, searchQuery, sortBy]);

  const handleOpenRename = (trip) => {
    setRenameTripModal(trip);
    setRenameInput(trip.title);
  };

  const handleConfirmRename = () => {
    if (renameTripModal && renameInput.trim()) {
      renameSavedTrip(renameTripModal.id, renameInput.trim());
      setRenameTripModal(null);
    }
  };

  const handleReopenTrip = (trip) => {
    setActiveItinerary(trip);
    navigate(`/planner?destination=${trip.destinationSlug}&days=${trip.daysCount}&budget=${trip.budget}`);
  };

  // Export trip as JSON
  const handleExportTrip = (trip) => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(trip, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `YatraVista-${trip.destinationSlug}-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Import trip from JSON
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        importTrip(parsed);
      } catch (_) {
        alert("Invalid JSON file. Please select a valid YatraVista export file.");
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Editorial Header */}
      <div className="border-b border-theme-border pb-6 space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
              <Bookmark className="w-3.5 h-3.5" />
              <span>Personal Travel Vault</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-theme-text">
              My Saved Itineraries & Wishlist
            </h1>
            <p className="text-sm text-theme-text-muted max-w-2xl leading-relaxed">
              Manage saved Indian destinations, custom generated itineraries, and packing checklists. Stored locally in your browser.
            </p>
          </div>

          {/* Import / Export JSON buttons */}
          <div className="flex items-center gap-2.5">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json,application/json"
              className="hidden"
            />
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="secondary"
              size="sm"
              icon={Upload}
            >
              Import JSON Itinerary
            </Button>
          </div>
        </div>
        
        <div className="p-3 rounded-xl bg-theme-surface border border-theme-border text-xs text-theme-text-muted flex items-center gap-2">
          <Info className="w-4 h-4 text-theme-accent shrink-0" />
          <span>
            <strong>Local Persistence:</strong> Your saved items are preserved automatically in browser local storage. You can export JSON files anytime for offline backups.
          </span>
        </div>
      </div>

      {/* Segmented Tab Controls */}
      <div className="flex border-b border-theme-border gap-6 text-sm font-semibold">
        <button
          type="button"
          onClick={() => setActiveTab("itineraries")}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "itineraries"
              ? "border-theme-primary text-theme-primary"
              : "border-transparent text-theme-text-muted hover:text-theme-text"
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span>Saved Itineraries ({savedTrips.length})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("destinations")}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
            activeTab === "destinations"
              ? "border-theme-primary text-theme-primary"
              : "border-transparent text-theme-text-muted hover:text-theme-text"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Destination Wishlist ({hydratedDestinations.length})</span>
        </button>
      </div>

      {/* TAB 1: SAVED ITINERARIES */}
      {activeTab === "itineraries" && (
        <div className="space-y-6">
          
          {/* Search & Sort Controls */}
          {savedTrips.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4 rounded-2xl bg-theme-surface border border-theme-border">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-subtle" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search saved trips by name or destination..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text focus:outline-none focus:ring-1 focus:ring-theme-primary"
                />
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="w-3.5 h-3.5 text-theme-text-muted" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs font-medium text-theme-text cursor-pointer"
                >
                  <option value="updated-desc">Last Updated</option>
                  <option value="name-asc">Trip Title (A-Z)</option>
                  <option value="destination">Destination</option>
                  <option value="budget-desc">Budget (Highest)</option>
                </select>
              </div>
            </div>
          )}

          {savedTrips.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No saved itineraries yet"
              description="You haven't saved any customized itineraries yet. Use the Smart Trip Planner to generate and save your dream tour."
              actionText="Open Trip Planner"
              actionTo="/planner"
            />
          ) : filteredTrips.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-semibold text-theme-text">No trips match "{searchQuery}"</p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="text-xs text-theme-accent hover:underline font-medium cursor-pointer"
              >
                Clear search query
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredTrips.map((trip) => {
                const checklistItems = trip.checklist || [];
                const completedChecklist = checklistItems.filter(i => i.completed).length;

                return (
                  <div
                    key={trip.id}
                    className="bg-theme-surface rounded-2xl border border-theme-border p-6 shadow-card hover:shadow-elevated transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary inline-block mb-1.5">
                            {trip.destinationName} • {trip.daysCount} Days
                          </span>
                          <h3 className="text-xl font-serif font-bold text-theme-text">
                            {trip.title}
                          </h3>
                        </div>

                        {/* Top Action Icons */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => duplicateSavedTrip(trip.id)}
                            className="p-1.5 rounded-lg text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                            title="Duplicate itinerary"
                            aria-label="Duplicate"
                          >
                            <Copy className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleExportTrip(trip)}
                            className="p-1.5 rounded-lg text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                            title="Export trip JSON"
                            aria-label="Export JSON"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenRename(trip)}
                            className="p-1.5 rounded-lg text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                            title="Rename itinerary"
                            aria-label="Rename"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmTripId(trip.id)}
                            className="p-1.5 rounded-lg text-theme-text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete itinerary"
                            aria-label="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-theme-bg/60 border border-theme-border/60 text-xs space-y-1 text-theme-text-muted">
                        <div className="flex justify-between">
                          <span>Travellers:</span>
                          <strong className="text-theme-text">{trip.travelersCount} Person(s)</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Travel Pace:</span>
                          <strong className="text-theme-text capitalize">{trip.pace}</strong>
                        </div>
                        <div className="flex justify-between">
                          <span>Stated Budget Limit:</span>
                          <strong className="text-theme-primary">{formatINR(trip.budget)}</strong>
                        </div>
                      </div>

                      {/* Checklist Quick Status */}
                      <div className="flex items-center justify-between pt-1">
                        <button
                          type="button"
                          onClick={() => setActiveChecklistTrip(trip)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-theme-primary hover:underline cursor-pointer"
                        >
                          <Luggage className="w-3.5 h-3.5" />
                          <span>Packing Checklist ({completedChecklist}/{checklistItems.length} packed)</span>
                        </button>
                      </div>

                      {/* Tags preview */}
                      <div className="flex flex-wrap gap-1">
                        {trip.interests?.map((i) => (
                          <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                            {i}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-theme-border flex items-center justify-between gap-3">
                      <span className="text-[11px] text-theme-text-subtle">
                        Saved: {new Date(trip.savedAt || trip.createdAt).toLocaleDateString()}
                      </span>

                      <Button
                        onClick={() => handleReopenTrip(trip)}
                        variant="primary"
                        size="sm"
                      >
                        Reopen in Planner
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED DESTINATIONS */}
      {activeTab === "destinations" && (
        <div>
          {hydratedDestinations.length === 0 ? (
            <EmptyState
              icon={Compass}
              title="Your wishlist is empty"
              description="Click the bookmark icon on any destination card or guide to save it here for future reference."
              actionText="Explore Destinations"
              actionTo="/explore"
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hydratedDestinations.map((dest) => (
                <DestinationCard key={dest.slug} destination={dest} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmTripId && (
        <Modal
          isOpen={true}
          onClose={() => setDeleteConfirmTripId(null)}
          title="Confirm Itinerary Deletion"
          maxWidth="max-w-md"
        >
          <div className="space-y-4 text-xs text-theme-text-muted leading-relaxed">
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>
                Are you sure you want to delete this itinerary? You will have a brief window to undo this action.
              </span>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-theme-border">
              <Button
                onClick={() => setDeleteConfirmTripId(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  deleteSavedTrip(deleteConfirmTripId);
                  setDeleteConfirmTripId(null);
                }}
                variant="danger"
                size="sm"
              >
                Delete Itinerary
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Rename Modal */}
      {renameTripModal && (
        <Modal
          isOpen={true}
          onClose={() => setRenameTripModal(null)}
          title="Rename Saved Trip"
          maxWidth="max-w-md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-theme-text-muted mb-1">
                New Trip Title
              </label>
              <input
                type="text"
                value={renameInput}
                onChange={(e) => setRenameInput(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-theme-bg border border-theme-border text-sm font-serif font-semibold text-theme-text focus:outline-none focus:ring-2 focus:ring-theme-primary"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-theme-border">
              <Button
                onClick={() => setRenameTripModal(null)}
                variant="secondary"
                size="sm"
              >
                Cancel
              </Button>
              <Button
                onClick={handleConfirmRename}
                variant="primary"
                size="sm"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Checklist View Modal */}
      {activeChecklistTrip && (
        <Modal
          isOpen={true}
          onClose={() => setActiveChecklistTrip(null)}
          title={`Checklist — ${activeChecklistTrip.title}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <TripChecklist
              checklist={activeChecklistTrip.checklist || []}
              onUpdateChecklist={(newChecklist) => {
                updateTripChecklist(activeChecklistTrip.id, newChecklist);
                setActiveChecklistTrip(prev => ({ ...prev, checklist: newChecklist }));
              }}
            />
            <div className="flex justify-end pt-2">
              <Button onClick={() => setActiveChecklistTrip(null)} variant="secondary" size="sm">
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default SavedTrips;
