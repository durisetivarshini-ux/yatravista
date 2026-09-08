import React, { useState, useRef, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import { useTheme, themeOptions } from "../../context/ThemeContext";

export function ThemeSwitcher({ minimal = false }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const activeTheme = themeOptions.find((t) => t.id === theme) || themeOptions[0];

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all duration-200 cursor-pointer ${
          minimal 
            ? "border-white/20 text-white/90 hover:bg-white/10" 
            : "border-theme-border bg-theme-surface text-theme-text hover:bg-theme-bg shadow-sm"
        }`}
        title={`Current Theme: ${activeTheme.name}. Click to switch theme.`}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        <Palette className="w-3.5 h-3.5 text-theme-accent" />
        <span className="hidden sm:inline">{activeTheme.name}</span>
        <div className="flex -space-x-1 items-center">
          {activeTheme.swatches.map((color, idx) => (
            <span
              key={idx}
              className="w-2.5 h-2.5 rounded-full ring-1 ring-white/40 shadow-xs"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-theme-surface border border-theme-border shadow-elevated py-2 z-50 animate-in fade-in-50 zoom-in-95">
          <div className="px-3.5 py-2 border-b border-theme-border/60">
            <p className="text-xs font-semibold text-theme-text uppercase tracking-wider">
              Editorial Themes
            </p>
            <p className="text-[11px] text-theme-text-muted mt-0.5">
              Select an aesthetic color palette
            </p>
          </div>
          <div className="p-1.5 space-y-1">
            {themeOptions.map((opt) => {
              const isSelected = opt.id === theme;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => {
                    setTheme(opt.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs text-left transition-all ${
                    isSelected
                      ? "bg-theme-primary-light text-theme-primary font-semibold"
                      : "text-theme-text hover:bg-theme-bg"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span>{opt.name}</span>
                      <div className="flex -space-x-1 items-center">
                        {opt.swatches.map((color, idx) => (
                          <span
                            key={idx}
                            className="w-2.5 h-2.5 rounded-full ring-1 ring-white/50"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-[10px] text-theme-text-muted leading-tight">
                      {opt.description}
                    </p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-theme-primary shrink-0 ml-2" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
