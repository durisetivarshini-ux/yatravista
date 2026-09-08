import React from "react";
import { Compass, Home } from "lucide-react";
import { Button } from "../components/ui/Button";

export function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="max-w-md mx-auto space-y-6">
        
        <div className="w-20 h-20 rounded-3xl bg-theme-primary-light text-theme-primary mx-auto flex items-center justify-center shadow-card">
          <Compass className="w-10 h-10 stroke-[1.5]" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-semibold uppercase tracking-widest text-theme-accent">
            Error 404 • Page Uncharted
          </span>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-theme-text">
            Lost on the Travel Path?
          </h1>
          <p className="text-sm text-theme-text-muted leading-relaxed">
            The destination or page you are seeking does not exist or has been shifted in our curated Indian itinerary catalog.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            to="/"
            variant="primary"
            size="md"
            icon={Home}
          >
            Return to Home
          </Button>
          <Button
            to="/explore"
            variant="secondary"
            size="md"
          >
            Explore Destinations
          </Button>
        </div>

      </div>
    </div>
  );
}
