import React, { useState } from "react";
import { 
  CheckCircle2, 
  Circle, 
  Plus, 
  Trash2, 
  Luggage, 
  Sparkles,
  ShieldCheck
} from "lucide-react";
import { Button } from "../ui/Button";

export function TripChecklist({ checklist = [], onUpdateChecklist }) {
  const [newItemText, setNewItemText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Clothing & Weather Essentials");
  const [activeFilterCategory, setActiveFilterCategory] = useState("All");

  const categories = [
    "All",
    "Documents & Confirmations",
    "Clothing & Weather Essentials",
    "Electronics & Daily Gear",
    "Health & Personal Care",
    "Responsible Travel Reminders"
  ];

  const toggleItem = (id) => {
    const updated = checklist.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateChecklist(updated);
  };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!newItemText.trim()) return;

    const newItem = {
      id: `custom-${Date.now()}`,
      text: newItemText.trim(),
      category: selectedCategory === "All" ? "Clothing & Weather Essentials" : selectedCategory,
      completed: false
    };

    onUpdateChecklist([...checklist, newItem]);
    setNewItemText("");
  };

  const handleDeleteItem = (id) => {
    onUpdateChecklist(checklist.filter(item => item.id !== id));
  };

  const completedCount = checklist.filter(i => i.completed).length;
  const totalCount = checklist.length;
  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = activeFilterCategory === "All"
    ? checklist
    : checklist.filter(i => i.category === activeFilterCategory);

  // Group filtered items by category
  const groupedItems = filteredItems.reduce((acc, item) => {
    const cat = item.category || "General";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  return (
    <div className="bg-theme-surface rounded-2xl border border-theme-border p-6 shadow-card space-y-6">
      
      {/* Header & Progress */}
      <div className="border-b border-theme-border pb-4 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-theme-primary-light text-theme-primary flex items-center justify-center">
              <Luggage className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-serif font-bold text-theme-text">
                Trip Preparation & Packing Checklist
              </h3>
              <p className="text-xs text-theme-text-muted">
                Essential items, documents, and responsible travel reminders for your Indian journey
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-semibold text-theme-primary">
              {completedCount} of {totalCount} packed ({progressPct}%)
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 rounded-full bg-theme-bg overflow-hidden border border-theme-border/60">
          <div
            className="h-full bg-emerald-600 transition-all duration-300 rounded-full"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        {categories.map((cat) => {
          const isActive = activeFilterCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilterCategory(cat)}
              className={`px-3 py-1 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-theme-primary text-white shadow-xs"
                  : "bg-theme-bg text-theme-text-muted hover:text-theme-text hover:bg-theme-tag"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Add Custom Item Form */}
      <form onSubmit={handleAddItem} className="flex flex-col sm:flex-row gap-2.5 pt-1">
        <input
          type="text"
          value={newItemText}
          onChange={(e) => setNewItemText(e.target.value)}
          placeholder="Add custom packing item (e.g. Temple socks, extra memory card)..."
          className="flex-1 px-3.5 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text placeholder:text-theme-text-subtle focus:outline-none focus:ring-2 focus:ring-theme-primary"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2 rounded-xl bg-theme-bg border border-theme-border text-xs text-theme-text font-medium focus:outline-none focus:ring-2 focus:ring-theme-primary cursor-pointer"
        >
          {categories.filter(c => c !== "All").map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <Button type="submit" variant="primary" size="sm" icon={Plus}>
          Add Item
        </Button>
      </form>

      {/* Grouped Checklist Items */}
      <div className="space-y-5">
        {Object.entries(groupedItems).map(([categoryName, items]) => (
          <div key={categoryName} className="space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent block">
              {categoryName}
            </span>
            <div className="divide-y divide-theme-border/50 border border-theme-border rounded-xl bg-theme-bg/30 overflow-hidden">
              {items.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3 flex items-center justify-between gap-3 text-xs transition-colors cursor-pointer hover:bg-theme-bg/80 select-none ${
                    item.completed ? "bg-theme-bg/20 text-theme-text-muted" : "text-theme-text"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    ) : (
                      <Circle className="w-4 h-4 text-theme-text-subtle shrink-0" />
                    )}
                    <span className={item.completed ? "line-through text-theme-text-muted/75" : "font-medium"}>
                      {item.text}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteItem(item.id);
                    }}
                    className="p-1 rounded-lg text-theme-text-subtle hover:text-rose-600 hover:bg-rose-50 transition-colors"
                    title="Delete item"
                    aria-label="Delete item"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Disclaimers */}
      <div className="p-3 rounded-xl bg-theme-bg/50 border border-theme-border/60 text-[11px] text-theme-text-muted flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-theme-primary shrink-0 mt-0.5" />
        <span>
          <strong>Privacy Note:</strong> Checklist items are stored strictly in your local browser storage. YatraVista never requests sensitive personal document uploads.
        </span>
      </div>

    </div>
  );
}
export default TripChecklist;
