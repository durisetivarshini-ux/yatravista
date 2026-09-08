import React, { useState } from "react";
import { 
  Sun, 
  CloudSun, 
  Moon, 
  Sparkles, 
  RefreshCw, 
  Trash2, 
  Info,
  ArrowUp,
  ArrowDown,
  StickyNote,
  Check
} from "lucide-react";
import { formatINR } from "../../utils/currencyFormatter";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { destinations } from "../../data/destinations";

const SLOT_CONFIG = {
  morning: {
    label: "Morning Exploration",
    timeWindow: "08:30 AM — 12:30 PM",
    icon: Sun,
    colorClass: "text-amber-600 bg-amber-50 border-amber-200",
  },
  afternoon: {
    label: "Afternoon Cultural Immersion",
    timeWindow: "01:30 PM — 05:00 PM",
    icon: CloudSun,
    colorClass: "text-emerald-700 bg-emerald-50 border-emerald-200",
  },
  evening: {
    label: "Evening Twilight & Dining",
    timeWindow: "05:30 PM — 09:30 PM",
    icon: Moon,
    colorClass: "text-indigo-700 bg-indigo-50 border-indigo-200",
  },
};

export function ItineraryDay({
  day,
  destinationSlug,
  onReplaceActivity,
  onRemoveActivity,
  onMoveSlot,
  onUpdateDayNote,
}) {
  const [replaceModalSlot, setReplaceModalSlot] = useState(null);
  const [isNoteOpen, setIsNoteOpen] = useState(Boolean(day.note));
  const [noteText, setNoteText] = useState(day.note || "");
  const [isNoteSaved, setIsNoteSaved] = useState(false);

  // Find destination to get available replacement pool
  const destObj = destinations.find((d) => d.slug === destinationSlug) || destinations[0];
  const availableAttractions = destObj?.attractions || [];

  const handleOpenReplace = (slotKey) => {
    setReplaceModalSlot(slotKey);
  };

  const handleSelectReplacement = (newItem) => {
    if (replaceModalSlot) {
      onReplaceActivity(day.dayNumber, replaceModalSlot, newItem);
      setReplaceModalSlot(null);
    }
  };

  const handleSaveNote = () => {
    if (onUpdateDayNote) {
      onUpdateDayNote(day.dayNumber, noteText);
      setIsNoteSaved(true);
      setTimeout(() => setIsNoteSaved(false), 2000);
    }
  };

  const slots = ["morning", "afternoon", "evening"];

  return (
    <div className="bg-theme-surface rounded-2xl border border-theme-border overflow-hidden shadow-card mb-6 transition-all">
      
      {/* Day Header */}
      <div className="bg-theme-bg/70 px-6 py-4 border-b border-theme-border flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-xl bg-theme-primary text-white font-serif font-bold text-base flex items-center justify-center shadow-xs">
            {day.dayNumber}
          </span>
          <div>
            <h3 className="text-lg font-serif font-bold text-theme-text">
              Day {day.dayNumber}: {day.theme}
            </h3>
            <span className="text-xs text-theme-text-muted">
              Structured sequence with designated travel transitions
            </span>
          </div>
        </div>

        {/* Action to Toggle Daily Note */}
        <button
          type="button"
          onClick={() => setIsNoteOpen(!isNoteOpen)}
          className={`no-print inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors cursor-pointer ${
            day.note
              ? "bg-amber-500/10 border-amber-400/40 text-amber-900"
              : "border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg"
          }`}
          title="Add or view personal notes for this day"
        >
          <StickyNote className="w-3.5 h-3.5 text-amber-600" />
          <span>{day.note ? "Edit Day Note" : "+ Add Day Note"}</span>
        </button>
      </div>

      {/* Daily Note Section */}
      {isNoteOpen && (
        <div className="px-6 py-3 bg-amber-50/50 border-b border-amber-200/50 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-semibold text-amber-900 uppercase tracking-wider flex items-center gap-1">
              <StickyNote className="w-3 h-3 text-amber-700" />
              <span>Personal Day Note & Reminders</span>
            </label>
            {isNoteSaved && (
              <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                <Check className="w-3 h-3" /> Saved!
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <textarea
              rows={2}
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="e.g. Carry scarf for shrine, wake up at 5:30 AM for sunrise boat, bring extra water..."
              className="flex-1 px-3 py-2 rounded-xl bg-white border border-amber-200 text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Button
              onClick={handleSaveNote}
              variant="primary"
              size="sm"
              className="self-end text-xs"
            >
              Save Note
            </Button>
          </div>
        </div>
      )}

      {/* Slots List */}
      <div className="p-6 divide-y divide-theme-border/60 space-y-6">
        {slots.map((slotKey, idx) => {
          const item = day[slotKey];
          const config = SLOT_CONFIG[slotKey];
          const SlotIcon = config.icon;

          if (!item) {
            return (
              <div key={slotKey} className="pt-6 first:pt-0">
                <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-theme-border bg-theme-bg/40 text-xs text-theme-text-muted">
                  <span>No activity assigned for {config.label}</span>
                  <button
                    type="button"
                    onClick={() => handleOpenReplace(slotKey)}
                    className="text-theme-primary font-semibold hover:underline cursor-pointer"
                  >
                    + Add Activity
                  </button>
                </div>
              </div>
            );
          }

          return (
            <div key={slotKey} className="pt-6 first:pt-0">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                
                {/* Time Slot & Badge */}
                <div className="md:w-52 shrink-0 space-y-1">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-xs font-semibold ${config.colorClass}`}>
                    <SlotIcon className="w-3.5 h-3.5" />
                    <span>{config.label.split(" ")[0]}</span>
                  </div>
                  <div className="text-[11px] text-theme-text-muted font-medium block">
                    {config.timeWindow}
                  </div>
                  <div className="text-[11px] text-theme-text-subtle">
                    ~{item.duration || "2 hours"}
                  </div>
                </div>

                {/* Main Activity Details */}
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-theme-tag text-theme-text-muted">
                      {item.category || "Sightseeing"}
                    </span>
                    {item.isExperience && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-theme-accent-light text-theme-accent flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Local Community Experience</span>
                      </span>
                    )}
                    {item.isFreeTime && (
                      <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700">
                        Leisure & Downtime
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-serif font-bold text-theme-text">
                    {item.name}
                  </h4>

                  <p className="text-xs text-theme-text-muted leading-relaxed font-sans">
                    {item.description}
                  </p>

                  {item.tip && (
                    <div className="flex items-start gap-1.5 text-xs text-theme-primary bg-theme-primary-light/40 p-2.5 rounded-lg">
                      <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                      <span>{item.tip}</span>
                    </div>
                  )}

                  {item.provider && (
                    <div className="text-[11px] text-theme-text-muted font-medium">
                      Provided by: <strong className="text-theme-text">{item.provider}</strong>
                    </div>
                  )}
                </div>

                {/* Cost and Slot Controls */}
                <div className="md:w-44 shrink-0 flex flex-col md:items-end justify-between self-stretch pt-2 md:pt-0">
                  <div className="text-left md:text-right mb-3">
                    <span className="block text-[10px] uppercase tracking-wider text-theme-text-subtle font-medium">
                      Estimated Cost
                    </span>
                    <span className="text-sm font-bold text-theme-primary font-serif">
                      {item.cost ? formatINR(item.cost) : "Free Access"}
                    </span>
                    <span className="text-[10px] text-theme-text-muted block">
                      {item.cost ? "/ person estimate" : "No ticket fee"}
                    </span>
                  </div>

                  {/* Actions: Move Up/Down, Replace, Remove */}
                  <div className="flex items-center gap-1.5 no-print">
                    {/* Move Up */}
                    {idx > 0 && onMoveSlot && (
                      <button
                        type="button"
                        onClick={() => onMoveSlot(day.dayNumber, slotKey, "up")}
                        className="p-1.5 rounded-lg border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                        title="Move activity to earlier slot"
                        aria-label="Move earlier"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Move Down */}
                    {idx < slots.length - 1 && onMoveSlot && (
                      <button
                        type="button"
                        onClick={() => onMoveSlot(day.dayNumber, slotKey, "down")}
                        className="p-1.5 rounded-lg border border-theme-border text-theme-text-muted hover:text-theme-text hover:bg-theme-bg transition-colors"
                        title="Move activity to later slot"
                        aria-label="Move later"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {/* Replace */}
                    <button
                      type="button"
                      onClick={() => handleOpenReplace(slotKey)}
                      className="p-1.5 rounded-lg border border-theme-border text-theme-text-muted hover:text-theme-primary hover:bg-theme-bg transition-colors"
                      title="Replace this activity with another option"
                      aria-label="Replace activity"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => onRemoveActivity(day.dayNumber, slotKey)}
                      className="p-1.5 rounded-lg border border-theme-border text-theme-text-muted hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Remove activity and free up time slot"
                      aria-label="Remove activity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Modal to Replace Activity */}
      {replaceModalSlot && (
        <Modal
          isOpen={true}
          onClose={() => setReplaceModalSlot(null)}
          title={`Replace Day ${day.dayNumber} ${SLOT_CONFIG[replaceModalSlot].label}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <p className="text-xs text-theme-text-muted">
              Choose an alternative attraction, cultural workshop, or leisurely pause for this slot:
            </p>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {/* Option to set as free time */}
              <button
                type="button"
                onClick={() =>
                  handleSelectReplacement({
                    id: `custom-free-${Date.now()}`,
                    name: "Personal Leisure & Exploration Time",
                    category: "Relaxation",
                    duration: "2 hours",
                    cost: 0,
                    description: "Free time to relax, browse local shops, visit a rooftop cafe, or rest at your stay.",
                    isFreeTime: true,
                    tip: "Take it easy and absorb the local atmosphere at your own pace."
                  })
                }
                className="w-full text-left p-3 rounded-xl border border-dashed border-theme-border hover:border-theme-primary bg-theme-bg/40 hover:bg-theme-surface transition-all flex items-center justify-between cursor-pointer"
              >
                <div>
                  <h5 className="text-sm font-semibold text-theme-text">Convert to Free Time / Self-guided Leisure</h5>
                  <p className="text-xs text-theme-text-muted">No scheduled activity or ticket cost</p>
                </div>
                <span className="text-xs font-semibold text-theme-primary">Select</span>
              </button>

              {/* Destination attractions */}
              {availableAttractions.map((att) => (
                <button
                  key={att.id}
                  type="button"
                  onClick={() => handleSelectReplacement(att)}
                  className="w-full text-left p-3.5 rounded-xl border border-theme-border hover:border-theme-primary bg-theme-surface hover:bg-theme-primary-light/20 transition-all flex items-start justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-theme-tag font-medium text-theme-text-muted">
                        {att.category}
                      </span>
                      <h5 className="text-sm font-serif font-bold text-theme-text">{att.name}</h5>
                    </div>
                    <p className="text-xs text-theme-text-muted line-clamp-2">{att.description}</p>
                    <span className="text-[11px] text-theme-text-subtle block">Duration: ~{att.duration}</span>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-theme-primary block font-serif">{formatINR(att.cost)}</span>
                    <span className="text-[10px] text-theme-text-muted">/ person</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-theme-border flex justify-end">
              <Button onClick={() => setReplaceModalSlot(null)} variant="secondary" size="sm">
                Cancel
              </Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
}
export default ItineraryDay;
