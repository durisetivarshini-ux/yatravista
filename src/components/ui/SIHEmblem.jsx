import React from "react";

export function SIHEmblem({ size = "md", className = "", variant = "badge" }) {
  if (variant === "badge") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-xs ${className}`}>
        {/* Tricolor Ring Emblem Icon */}
        <div className="w-5 h-5 rounded-full bg-slate-900 border border-amber-400/40 flex items-center justify-center shrink-0">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#FF9933" strokeWidth="2" strokeDasharray="16 16" />
            <circle cx="12" cy="12" r="6" stroke="#138808" strokeWidth="2" />
            <circle cx="12" cy="12" r="2" fill="#000080" />
          </svg>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-bold uppercase tracking-wider text-amber-300 text-[10px]">
            SIH 2026
          </span>
          <span className="text-white/40">•</span>
          <span className="text-white/90 text-[11px]">
            Student Innovation Prototype (#26204)
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 p-3 rounded-2xl bg-theme-surface border border-theme-border text-theme-text ${className}`}>
      <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shrink-0 shadow-sm border border-amber-400/30">
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none">
          <circle cx="16" cy="16" r="14" stroke="#FF9933" strokeWidth="2.5" strokeDasharray="22 10" />
          <circle cx="16" cy="16" r="9" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="16" cy="16" r="4" fill="#138808" />
          <circle cx="16" cy="16" r="1.5" fill="#000080" />
        </svg>
      </div>
      <div>
        <div className="flex items-center gap-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-theme-primary">
            Smart India Hackathon 2026
          </span>
          <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-theme-accent/20 text-theme-accent">
            #26204
          </span>
        </div>
        <p className="text-[11px] text-theme-text-muted leading-tight mt-0.5">
          Travel & Tourism • Student Prototype
        </p>
      </div>
    </div>
  );
}
export default SIHEmblem;
