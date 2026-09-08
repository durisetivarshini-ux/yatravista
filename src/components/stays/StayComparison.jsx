import React from "react";
import { X, Check, Scale, Star, Trash2 } from "lucide-react";
import { useTrip } from "../../context/TripContext";
import { formatINR } from "../../utils/currencyFormatter";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

export function StayComparison({ isOpen, onClose }) {
  const { comparedStays, removeComparedStay, clearComparedStays, selectStayForTrip, selectedStay } = useTrip();

  if (!isOpen) return null;

  // Gather unique amenities across compared stays
  const allAmenities = Array.from(
    new Set(comparedStays.flatMap((stay) => stay.amenities || []))
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Compare Accommodations (Sample Demo Data)"
      maxWidth="max-w-5xl"
    >
      {comparedStays.length === 0 ? (
        <div className="text-center py-12">
          <Scale className="w-12 h-12 text-theme-text-subtle mx-auto mb-3" />
          <p className="text-theme-text-muted text-sm mb-4">
            No properties selected for comparison yet. Select "Compare Property" on up to 3 stays to view side-by-side specs.
          </p>
          <Button onClick={onClose} variant="primary" size="sm">
            Browse Stays
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          
          {/* Top Bar with Clear button */}
          <div className="flex items-center justify-between pb-3 border-b border-theme-border">
            <p className="text-xs text-theme-text-muted">
              Comparing <strong>{comparedStays.length}</strong> of 3 max properties. Prices and parameters are illustrative estimates.
            </p>
            <button
              type="button"
              onClick={clearComparedStays}
              className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1 font-medium"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear comparison</span>
            </button>
          </div>

          {/* Comparison Grid */}
          <div className="overflow-x-auto pb-4">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr>
                  <th className="p-3 bg-theme-bg/50 border border-theme-border text-xs font-semibold text-theme-text-muted w-1/4">
                    Specification
                  </th>
                  {comparedStays.map((stay) => (
                    <th
                      key={stay.id}
                      className="p-3 bg-theme-surface border border-theme-border text-sm font-serif font-bold text-theme-text w-1/4 align-top"
                    >
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => removeComparedStay(stay.id)}
                          className="absolute -top-1 -right-1 p-1 rounded-full text-theme-text-subtle hover:text-rose-600 hover:bg-rose-50"
                          title="Remove from comparison"
                          aria-label={`Remove ${stay.name}`}
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <img
                          src={stay.image}
                          alt={stay.name}
                          className="w-full h-28 object-cover rounded-lg mb-2 shadow-xs"
                        />
                        <h4 className="line-clamp-1">{stay.name}</h4>
                        <span className="text-xs font-sans font-normal text-theme-accent block capitalize">
                          {stay.destinationSlug}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="text-xs divide-y divide-theme-border">
                
                {/* Price per night */}
                <tr>
                  <td className="p-3 font-medium text-theme-text-muted bg-theme-bg/30">
                    Sample Nightly Rate
                  </td>
                  {comparedStays.map((stay) => (
                    <td key={stay.id} className="p-3 font-semibold text-theme-primary text-sm">
                      {formatINR(stay.pricePerNight)}
                      <span className="text-[10px] text-theme-text-muted block font-normal">/ room / night</span>
                    </td>
                  ))}
                </tr>

                {/* Category */}
                <tr>
                  <td className="p-3 font-medium text-theme-text-muted bg-theme-bg/30">
                    Category
                  </td>
                  {comparedStays.map((stay) => (
                    <td key={stay.id} className="p-3 font-medium text-theme-text">
                      <span className="px-2 py-0.5 rounded bg-theme-tag text-theme-text">
                        {stay.category}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Room Capacity */}
                <tr>
                  <td className="p-3 font-medium text-theme-text-muted bg-theme-bg/30">
                    Room Capacity
                  </td>
                  {comparedStays.map((stay) => (
                    <td key={stay.id} className="p-3 text-theme-text">
                      Up to {stay.maxOccupancy} Guests
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-3 font-medium text-theme-text-muted bg-theme-bg/30">
                    Guest Feedback
                  </td>
                  {comparedStays.map((stay) => (
                    <td key={stay.id} className="p-3 text-theme-text">
                      <div className="flex items-center gap-1 font-semibold text-amber-600">
                        <Star className="w-3 h-3 fill-amber-500" />
                        <span>{stay.rating}</span>
                        <span className="text-theme-text-subtle font-normal">({stay.reviewsCount})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Amenities Matrix */}
                {allAmenities.map((amenity) => (
                  <tr key={amenity}>
                    <td className="p-2.5 text-theme-text-muted bg-theme-bg/20 font-medium">
                      {amenity}
                    </td>
                    {comparedStays.map((stay) => {
                      const hasAmenity = stay.amenities?.includes(amenity);
                      return (
                        <td key={stay.id} className="p-2.5 text-center">
                          {hasAmenity ? (
                            <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                          ) : (
                            <span className="text-theme-text-subtle">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}

                {/* Action button row */}
                <tr>
                  <td className="p-3 font-medium text-theme-text-muted bg-theme-bg/30">
                    Trip Selection
                  </td>
                  {comparedStays.map((stay) => {
                    const isCurrent = selectedStay?.id === stay.id;
                    return (
                      <td key={stay.id} className="p-3">
                        <Button
                          onClick={() => {
                            selectStayForTrip(stay);
                            onClose();
                          }}
                          variant={isCurrent ? "secondary" : "primary"}
                          size="sm"
                          className="w-full text-xs"
                        >
                          {isCurrent ? "Selected ✓" : "Select for Trip"}
                        </Button>
                      </td>
                    );
                  })}
                </tr>

              </tbody>
            </table>
          </div>

        </div>
      )}
    </Modal>
  );
}
