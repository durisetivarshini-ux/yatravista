import React from "react";

/**
 * YatraVistaLogo - Modern Indian Travel Editorial Brand Identity
 * Monogram: "YV" journey path with rising sun motif
 * Typography: Manrope wordmark with terracotta accent
 */
export function YatraVistaLogo({ size = "md", className = "", showTagline = true, inverted = false, iconOnly = false }) {
  const sizeMap = {
    sm: { icon: "w-8 h-8", title: "text-lg", tag: "text-[8.5px]" },
    md: { icon: "w-10 h-10", title: "text-2xl", tag: "text-[9.5px]" },
    lg: { icon: "w-13 h-13", title: "text-3xl", tag: "text-[11px]" }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  const IconSVG = (
    <div className={`${currentSize.icon} shrink-0 rounded-xl ${inverted ? "bg-white/10 text-white" : "bg-[#123C3A] text-white"} flex items-center justify-center shadow-soft transition-transform group-hover:scale-105 border ${inverted ? "border-white/20" : "border-[#123C3A]/10"}`}>
      <svg viewBox="0 0 48 48" className="w-full h-full p-2" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Subtle rising sun arc behind the valley/journey */}
        <circle cx="24" cy="18" r="5" fill="#B6492D" />
        <path
          d="M17 18C17 14.134 20.134 11 24 11C27.866 11 31 14.134 31 18"
          stroke="#FAF7F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="2 2"
          opacity="0.8"
        />

        {/* Clean flowing "YV" journey monogram */}
        {/* Left branch of Y turning into a gentle flowing path */}
        <path
          d="M14 15L24 28L34 15"
          stroke="#FAF7F1"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Stem of Y flowing downward like a winding road into a V-valley apex */}
        <path
          d="M24 28V37C24 37 28 35 32 37"
          stroke="#FAF7F1"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Terracotta road horizon marker */}
        <circle cx="32" cy="37" r="2" fill="#B6492D" />
      </svg>
    </div>
  );

  if (iconOnly) {
    return <div className={`inline-flex items-center ${className}`}>{IconSVG}</div>;
  }

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {IconSVG}

      {/* Wordmark */}
      <div className="flex flex-col">
        <span className={`${currentSize.title} font-heading font-extrabold tracking-tight leading-none ${inverted ? "text-white" : "text-[#123C3A]"}`}>
          Yatra<span className="text-[#B6492D] font-semibold">Vista</span>
        </span>
        {showTagline && (
          <span className={`${currentSize.tag} tracking-[0.14em] uppercase font-sans font-semibold mt-1 ${inverted ? "text-white/70" : "text-[#56635F]"}`}>
            Curated Journeys of India
          </span>
        )}
      </div>
    </div>
  );
}

export default YatraVistaLogo;
