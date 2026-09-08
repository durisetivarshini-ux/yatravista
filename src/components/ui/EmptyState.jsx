import React from "react";
import { Compass } from "lucide-react";
import { Button } from "./Button";

export function EmptyState({
  icon: Icon = Compass,
  title = "No results found",
  description = "Try adjusting your filters or search terms to discover more destinations.",
  actionText,
  actionTo,
  onActionClick,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-12 my-8 rounded-2xl border border-dashed border-theme-border bg-theme-surface/50 max-w-lg mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-theme-primary-light flex items-center justify-center text-theme-primary mb-4 shadow-sm">
        <Icon className="w-8 h-8 stroke-[1.5]" />
      </div>
      <h3 className="text-xl font-serif font-semibold text-theme-text mb-2">
        {title}
      </h3>
      <p className="text-theme-text-muted text-sm max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionText && (
        <Button
          to={actionTo}
          onClick={onActionClick}
          variant="primary"
          size="md"
        >
          {actionText}
        </Button>
      )}
    </div>
  );
}
