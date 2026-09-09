import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Globe, Sparkles, Phone, Mail, ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Button } from "../ui/Button";

export function ProviderCard({ provider, compact = false, className = "" }) {
  if (!provider) return null;

  const displayName = provider.business_name || provider.name || "Local Heritage Host";
  const languagesList = Array.isArray(provider.languages) 
    ? provider.languages.join(", ") 
    : "English, Hindi";

  if (compact) {
    return (
      <div className={`p-4 rounded-xl bg-theme-bg/60 border border-theme-border/80 flex items-center justify-between gap-3 ${className}`}>
        <div className="flex items-center gap-3">
          <img
            src={provider.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`}
            alt={displayName}
            className="w-10 h-10 rounded-full object-cover border border-theme-border shrink-0"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-serif font-bold text-theme-text">{displayName}</span>
              <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[9px] font-semibold bg-emerald-500/10 text-emerald-700">
                <ShieldCheck className="w-2.5 h-2.5" />
                <span>Platform Approved</span>
              </span>
            </div>
            <div className="text-[10px] text-theme-text-muted flex items-center gap-2 mt-0.5">
              {provider.location && (
                <span className="flex items-center gap-0.5">
                  <MapPin className="w-2.5 h-2.5 text-theme-accent" />
                  <span>{provider.location}</span>
                </span>
              )}
              <span>• Speaks {languagesList}</span>
            </div>
          </div>
        </div>

        <Link
          to={`/providers/${provider.id || provider.user_id}`}
          className="text-xs font-semibold text-theme-primary hover:underline flex items-center gap-0.5 shrink-0"
        >
          <span>Host Profile</span>
          <ArrowUpRight className="w-3 h-3" />
        </Link>
      </div>
    );
  }

  return (
    <div className={`p-6 rounded-2xl bg-theme-surface border border-theme-border shadow-soft ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-theme-border">
        
        <div className="flex items-center gap-3.5">
          <img
            src={provider.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(displayName)}`}
            alt={displayName}
            className="w-14 h-14 rounded-2xl object-cover border-2 border-theme-primary/20 shadow-xs shrink-0"
          />
          <div>
            <div className="text-[10px] uppercase tracking-wider font-semibold text-theme-accent mb-0.5">
              Hosted & Provided By
            </div>
            <h4 className="text-lg font-serif font-bold text-theme-text flex items-center gap-2">
              <span>{displayName}</span>
            </h4>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-500/10 text-emerald-700 border border-emerald-500/20">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                <span>Platform Approved Host</span>
              </span>
              <span className="text-[10px] text-theme-text-subtle bg-theme-bg px-2 py-0.5 rounded-md border border-theme-border/60">
                Demo Provider
              </span>
            </div>
          </div>
        </div>

        <Button
          to={`/providers/${provider.id || provider.user_id}`}
          variant="secondary"
          size="sm"
          icon={ArrowUpRight}
          iconPosition="right"
        >
          View Full Profile
        </Button>
      </div>

      {provider.tagline && (
        <p className="text-xs font-medium text-theme-accent italic mt-3.5 mb-2">
          “{provider.tagline}”
        </p>
      )}

      {provider.bio && (
        <p className="text-xs text-theme-text-muted leading-relaxed mb-4">
          {provider.bio}
        </p>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-theme-border/60 text-xs text-theme-text-muted">
        {provider.location && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-theme-accent shrink-0" />
            <span className="truncate">{provider.location}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-theme-accent shrink-0" />
          <span className="truncate">{languagesList}</span>
        </div>
        {provider.public_phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-theme-accent shrink-0" />
            <span className="truncate">{provider.public_phone}</span>
          </div>
        )}
      </div>

      <div className="mt-4 p-2.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-[10px] text-amber-800 leading-tight">
        ℹ️ <strong>Demonstration Booking Scope:</strong> Fictional demonstration provider created for Smart India Hackathon 2026. No real financial charges or reservations occur.
      </div>
    </div>
  );
}
export default ProviderCard;
