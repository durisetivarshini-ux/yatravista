import React, { useState } from "react";
import { Sparkles, Shield, User, Building, ChevronUp, ChevronDown } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export function DemoRoleSwitcher() {
  const { user, role, switchDemoRole } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div className="bg-theme-surface/95 backdrop-blur-md border border-theme-border rounded-2xl shadow-elevated overflow-hidden transition-all text-xs">
        
        {/* Toggle Header */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3.5 py-2 hover:bg-theme-bg/60 transition-colors w-full cursor-pointer text-left"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-semibold text-theme-text flex items-center gap-1">
            Role: <span className="capitalize text-theme-primary">{role}</span>
          </span>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-theme-primary-light text-theme-primary font-medium ml-1">
            Demo Bar
          </span>
          {isOpen ? (
            <ChevronDown className="w-3.5 h-3.5 text-theme-text-subtle ml-auto" />
          ) : (
            <ChevronUp className="w-3.5 h-3.5 text-theme-text-subtle ml-auto" />
          )}
        </button>

        {/* Collapsible Switcher */}
        {isOpen && (
          <div className="p-3 border-t border-theme-border space-y-2 bg-theme-bg/40 min-w-[220px]">
            <div className="text-[10px] text-theme-text-muted">
              Active User: <span className="font-medium text-theme-text">{user?.name}</span>
            </div>

            <div className="grid grid-cols-1 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => { switchDemoRole("traveller"); setIsOpen(false); }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  role === "traveller"
                    ? "bg-theme-primary text-white border-theme-primary font-semibold"
                    : "bg-theme-surface border-theme-border/70 text-theme-text hover:bg-theme-bg"
                }`}
              >
                <User className="w-3.5 h-3.5" />
                <div className="leading-tight">
                  <div className="text-xs">Traveller (Aarav)</div>
                  <div className={`text-[9px] ${role === "traveller" ? "text-white/80" : "text-theme-text-subtle"}`}>
                    Browse, Book & Manage Trips
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { switchDemoRole("provider"); setIsOpen(false); }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  role === "provider"
                    ? "bg-theme-primary text-white border-theme-primary font-semibold"
                    : "bg-theme-surface border-theme-border/70 text-theme-text hover:bg-theme-bg"
                }`}
              >
                <Building className="w-3.5 h-3.5" />
                <div className="leading-tight">
                  <div className="text-xs">Host / Provider (Rajendra)</div>
                  <div className={`text-[9px] ${role === "provider" ? "text-white/80" : "text-theme-text-subtle"}`}>
                    Listings & Booking Requests
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => { switchDemoRole("admin"); setIsOpen(false); }}
                className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-left transition-all ${
                  role === "admin"
                    ? "bg-theme-primary text-white border-theme-primary font-semibold"
                    : "bg-theme-surface border-theme-border/70 text-theme-text hover:bg-theme-bg"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <div className="leading-tight">
                  <div className="text-xs">Platform Admin</div>
                  <div className={`text-[9px] ${role === "admin" ? "text-white/80" : "text-theme-text-subtle"}`}>
                    Listing Approvals & Audit Log
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
