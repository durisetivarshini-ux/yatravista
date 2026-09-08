import React from "react";

export function YatraVistaLogo({ size = "md", className = "", showTagline = true, inverted = false }) {
  const sizeMap = {
    sm: { icon: "w-8 h-8", title: "text-lg", tag: "text-[8px]" },
    md: { icon: "w-10 h-10", title: "text-2xl", tag: "text-[9px]" },
    lg: { icon: "w-14 h-14", title: "text-3xl", tag: "text-[11px]" }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon Badge */}
      <div className={`${currentSize.icon} shrink-0 rounded-xl bg-theme-primary flex items-center justify-center text-white shadow-soft transition-transform group-hover:scale-105 border border-white/10`}>
        <svg viewBox="0 0 48 48" className="w-full h-full p-1.5" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Heritage Arch (Jharokha/Chhatri outline) */}
          <path
            d="M12 40V22C12 15.3726 17.3726 10 24 10C30.6274 10 36 15.3726 36 22V40"
            stroke="#FDFBF7"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="currentColor"
            fillOpacity="0.15"
          />
          {/* Pointed Arch Peak Detail */}
          <path
            d="M20 10C22 7 24 5 24 5C24 5 26 7 28 10"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Golden Sun / Lotus Crest */}
          <circle cx="24" cy="18" r="3.5" fill="#D4AF37" />
          {/* Winding Scenic Journey Path */}
          <path
            d="M15 40C15 34 21 33 24 30C27 27 33 27 33 22"
            stroke="#FDFBF7"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeDasharray="1 0"
          />
          {/* Base Platform */}
          <line x1="10" y1="40" x2="38" y2="40" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <span className={`${currentSize.title} font-serif font-bold tracking-tight leading-none ${inverted ? "text-white" : "text-theme-primary"}`}>
          Yatra<span className="text-theme-accent italic font-normal">Vista</span>
        </span>
        {showTagline && (
          <span className={`${currentSize.tag} tracking-widest uppercase font-sans font-semibold mt-0.5 ${inverted ? "text-white/75" : "text-theme-text-muted"}`}>
            Curated Journeys of India
          </span>
        )}
      </div>
    </div>
  );
}
export default YatraVistaLogo;
