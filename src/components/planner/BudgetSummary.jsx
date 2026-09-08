import React from "react";
import { 
  Wallet, 
  BedDouble, 
  Utensils, 
  Car, 
  Ticket, 
  AlertTriangle, 
  CheckCircle2, 
  Info,
  Sparkles
} from "lucide-react";
import { formatINR } from "../../utils/currencyFormatter";
import { Button } from "../ui/Button";

export function BudgetSummary({ budgetCalculation, onOpenBudgetOptimizer }) {
  if (!budgetCalculation) return null;

  const {
    enteredBudget,
    estimatedTotal,
    perPersonCost,
    isOverBudget,
    overageAmount,
    variance,
    budgetUtilizationPct,
    numDays,
    numTravelers,
    breakdown,
  } = budgetCalculation;

  const { accommodation, food, transport, experiences } = breakdown;

  return (
    <div className="bg-theme-surface rounded-2xl border border-theme-border p-6 shadow-card space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-theme-border pb-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-theme-accent flex items-center gap-1.5">
            <Wallet className="w-3.5 h-3.5" />
            <span>Estimated Budget Arithmetic</span>
          </span>
          <h3 className="text-xl font-serif font-bold text-theme-text mt-0.5">
            Total Trip Cost Breakdown
          </h3>
        </div>

        <div className="text-left sm:text-right">
          <span className="text-xs text-theme-text-muted block">Estimated Total for {numTravelers} Traveller(s)</span>
          <span className="text-2xl font-serif font-bold text-theme-primary">
            {formatINR(estimatedTotal)}
          </span>
          <span className="text-[11px] text-theme-text-subtle block">
            (~{formatINR(perPersonCost)} / person)
          </span>
        </div>
      </div>

      {/* Over-budget or Within-budget Banner */}
      {isOverBudget ? (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-400/40 text-amber-900 space-y-3">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-bold text-amber-800">
                Trip Exceeds Stated Budget by {formatINR(overageAmount)}
              </h4>
              <p className="text-xs text-amber-700 leading-relaxed">
                Your stated budget is <strong>{formatINR(enteredBudget)}</strong>, while the realistic sample estimate comes to <strong>{formatINR(estimatedTotal)}</strong>.
              </p>
            </div>
          </div>

          {onOpenBudgetOptimizer && (
            <div className="pt-2 border-t border-amber-300/40 flex justify-end">
              <Button
                onClick={onOpenBudgetOptimizer}
                variant="primary"
                size="sm"
                icon={Sparkles}
                className="bg-amber-700 hover:bg-amber-800 text-white font-semibold text-xs"
              >
                Find Lower-Cost Options
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-400/40 text-emerald-950 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-emerald-800">
              Comfortably Within Stated Budget!
            </h4>
            <p className="text-xs text-emerald-700 leading-relaxed">
              Estimated total is <strong>{formatINR(estimatedTotal)}</strong> against your planned limit of <strong>{formatINR(enteredBudget)}</strong>. You have approximately <strong>{formatINR(variance)}</strong> remaining buffer for personalized shopping, souvenirs, or spontaneous dining.
            </p>
          </div>
        </div>
      )}

      {/* Progress Bar of Budget Utilization */}
      {enteredBudget > 0 && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-theme-text-muted">
            <span>Budget Utilization</span>
            <span className="font-semibold text-theme-text">
              {budgetUtilizationPct}% of {formatINR(enteredBudget)}
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-theme-bg overflow-hidden border border-theme-border/60">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isOverBudget ? "bg-amber-600" : "bg-theme-primary"
              }`}
              style={{ width: `${Math.min(100, budgetUtilizationPct)}%` }}
            />
          </div>
        </div>
      )}

      {/* Itemized Categories List */}
      <div className="divide-y divide-theme-border/70 border border-theme-border rounded-xl overflow-hidden text-xs">
        
        {/* 1. Accommodation */}
        <div className="p-4 bg-theme-surface hover:bg-theme-bg/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-theme-primary-light text-theme-primary flex items-center justify-center shrink-0">
              <BedDouble className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-theme-text text-sm">Accommodation</h5>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                  Per Room Basis
                </span>
              </div>
              <p className="text-theme-text-muted mt-0.5">
                {accommodation.basis}
              </p>
              <span className="text-[11px] text-theme-text-subtle italic">
                Property: {accommodation.stayName}
              </span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-sm font-bold text-theme-primary font-serif">
              {formatINR(accommodation.total)}
            </span>
          </div>
        </div>

        {/* 2. Food & Dining */}
        <div className="p-4 bg-theme-surface hover:bg-theme-bg/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
              <Utensils className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-theme-text text-sm">Food & Regional Dining</h5>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                  Per Traveller Basis
                </span>
              </div>
              <p className="text-theme-text-muted mt-0.5">
                {food.basis}
              </p>
              <span className="text-[11px] text-theme-text-subtle italic">
                Includes regional breakfast, traditional thali lunch, snacks & dinner
              </span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-sm font-bold text-theme-primary font-serif">
              {formatINR(food.total)}
            </span>
          </div>
        </div>

        {/* 3. Local Transport */}
        <div className="p-4 bg-theme-surface hover:bg-theme-bg/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-theme-text text-sm">Dedicated Local Transport</h5>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                  Group Vehicle Basis
                </span>
              </div>
              <p className="text-theme-text-muted mt-0.5">
                {transport.basis}
              </p>
              <span className="text-[11px] text-theme-text-subtle italic">
                Vehicle: {transport.type} (includes driver allowance & city transfers)
              </span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-sm font-bold text-theme-primary font-serif">
              {formatINR(transport.total)}
            </span>
          </div>
        </div>

        {/* 4. Experiences & Sightseeing */}
        <div className="p-4 bg-theme-surface hover:bg-theme-bg/30 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h5 className="font-bold text-theme-text text-sm">Experiences & Monument Tickets</h5>
                <span className="px-1.5 py-0.5 rounded text-[10px] bg-theme-tag text-theme-text-muted">
                  Per Traveller Basis
                </span>
              </div>
              <p className="text-theme-text-muted mt-0.5">
                {experiences.basis}
              </p>
              <span className="text-[11px] text-theme-text-subtle italic">
                Direct community support for artisans and local licensed guides
              </span>
            </div>
          </div>
          <div className="text-right sm:self-center">
            <span className="text-sm font-bold text-theme-primary font-serif">
              {formatINR(experiences.total)}
            </span>
          </div>
        </div>

      </div>

      {/* Disclosures note */}
      <div className="p-3.5 rounded-xl bg-theme-bg/50 border border-theme-border/60 text-[11px] text-theme-text-muted flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-theme-accent shrink-0 mt-0.5" />
        <span>
          <strong>Calculation transparency:</strong> Estimates are based on verified market averages for mid-to-premium travel in India. Inter-city flights/trains are not included to allow flexible points of origin.
        </span>
      </div>

    </div>
  );
}
export default BudgetSummary;
