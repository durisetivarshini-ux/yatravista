import React, { useState } from "react";
import { 
  Folder, 
  FileCode, 
  Copy, 
  Check, 
  Code, 
  Layers, 
  ShieldCheck, 
  Sparkles, 
  ChevronRight, 
  ChevronDown,
  Terminal,
  Cpu,
  BookOpen
} from "lucide-react";
import { Button } from "../components/ui/Button";

const CODE_SNIPPETS = {
  "itineraryGenerator.js": {
    path: "src/utils/itineraryGenerator.js",
    category: "Algorithm",
    description: "Deterministic, rule-based morning/afternoon/evening itinerary sequencer with pace adaptation and landmark deduplication.",
    code: `// Rule-based deterministic sequencer for Indian travel itineraries
export function generateItinerary({
  destinationSlug = "jaipur",
  days = 3,
  travelers = 2,
  interests = ["Culture", "Heritage"],
  pace = "balanced", // relaxed, balanced, active
  selectedStay = null,
  selectedExperiences = []
}) {
  const dest = destinations.find(d => d.slug === destinationSlug) || destinations[0];
  const numDays = Math.min(7, Math.max(1, Number(days) || 1));
  const allAttractions = [...(dest.attractions || [])];
  const usedAttractionIds = new Set();
  const assignedExperienceIds = new Set();

  // Pick optimal attraction for morning, afternoon, evening slots
  function pickItemForSlot(slot, dayNumber) {
    // 1. Inject selected community workshops matching slot
    const matchingSelectedExp = selectedExperiences.find(exp => {
      if (assignedExperienceIds.has(exp.id)) return false;
      return !exp.suitableSlot || exp.suitableSlot === slot;
    });

    if (matchingSelectedExp) {
      assignedExperienceIds.add(matchingSelectedExp.id);
      return { ...matchingSelectedExp, isExperience: true };
    }

    // 2. Match unvisited landmark matching user interests & slot
    const slotMatches = allAttractions.filter(
      att => !usedAttractionIds.has(att.id) && att.slot === slot
    );
    if (slotMatches.length > 0) {
      const chosen = slotMatches[0];
      usedAttractionIds.add(chosen.id);
      return { ...chosen, isExperience: false };
    }

    // 3. Fallback to curated leisure downtime template
    return leisureTemplates[slot][(dayNumber - 1) % 2];
  }

  // Iterate over days and generate structured themes
  const daysList = [];
  for (let d = 1; d <= numDays; d++) {
    let morning = pickItemForSlot("morning", d);
    let afternoon = pickItemForSlot("afternoon", d);
    let evening = pickItemForSlot("evening", d);
    daysList.push({ dayNumber: d, morning, afternoon, evening });
  }
  return { id: \`itinerary-\${dest.slug}-\${Date.now()}\`, days: daysList };
}`
  },

  "budgetCalculator.js": {
    path: "src/utils/budgetCalculator.js",
    category: "Arithmetic Engine",
    description: "Transparent cost decomposition covering lodging, dining allowances, vehicle hire, and attraction entry tickets.",
    code: `// Itemized trip budget decomposition engine
export function calculateBudgetBreakdown({
  days = 1,
  travelers = 1,
  totalBudget = 0,
  stay = null,
  selectedExperiences = [],
  itineraryDays = [],
  destination = null,
}) {
  // 1. Accommodation: 0 hotel nights for 1-day excursion; N-1 nights for multi-day
  const hotelNights = days === 1 ? 0 : days - 1;
  const roomCapacity = stay?.maxOccupancy || 2;
  const roomsNeeded = hotelNights > 0 ? Math.ceil(travelers / roomCapacity) : 0;
  const nightlyRate = stay?.pricePerNight ?? 3000;
  const accommodationTotal = hotelNights * roomsNeeded * nightlyRate;

  // 2. Food & Dining: ₹750/person/day for regional meals
  const foodTotal = days * travelers * 750;

  // 3. Transit: Dedicated vehicle scaled by group size
  let dailyTransport = travelers >= 8 ? 3600 : travelers >= 5 ? 2400 : 1400;
  const transportTotal = days * dailyTransport;

  // 4. Experiences & Sights: Selected workshops + scheduled monument entry fees
  const experiencesTotal = selectedExperiences.reduce(
    (sum, exp) => sum + exp.pricePerPerson * travelers, 0
  );

  const estimatedTotal = accommodationTotal + foodTotal + transportTotal + experiencesTotal;
  const isOverBudget = totalBudget > 0 && estimatedTotal > totalBudget;
  const overageAmount = isOverBudget ? estimatedTotal - totalBudget : 0;

  return { estimatedTotal, isOverBudget, overageAmount, breakdown: { ... } };
}`
  },

  "ThemeContext.jsx": {
    path: "src/context/ThemeContext.jsx",
    category: "Design System",
    description: "CSS Variable-driven dynamic theming supporting Heritage (Ivory/Green/Gold), Coastal (Seafoam/Blue/Coral), and Mountain (Mist/Pine/Terracotta).",
    code: `export const themeOptions = [
  { id: "heritage", name: "Heritage", swatches: ["#FAF7F2", "#1C3B2B", "#C59A45"] },
  { id: "coastal", name: "Coastal", swatches: ["#F4F8FA", "#104C64", "#E06D53"] },
  { id: "mountain", name: "Mountain", swatches: ["#F2F4F3", "#2B463C", "#B87042"] }
];

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useLocalStorage("yatravista_theme", "heritage");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themeOptions }}>
      {children}
    </ThemeContext.Provider>
  );
}`
  },

  "TripContext.jsx": {
    path: "src/context/TripContext.jsx",
    category: "State Management",
    description: "Global React Context managing wishlist persistence, 3-property stay comparisons, active itineraries, and custom toast notifications.",
    code: `export function TripProvider({ children }) {
  const [savedDestinations, setSavedDestinations] = useLocalStorage("yatravista_saved_destinations", ["jaipur", "munnar"]);
  const [savedTrips, setSavedTrips] = useLocalStorage("yatravista_saved_trips", []);
  const [comparedStays, setComparedStays] = useState([]);
  const [selectedStay, setSelectedStay] = useState(null);

  // Up to 3 stays comparison
  const toggleCompareStay = (stay) => {
    setComparedStays(prev => {
      if (prev.some(s => s.id === stay.id)) return prev.filter(s => s.id !== stay.id);
      if (prev.length >= 3) return prev; // Limit to 3 max
      return [...prev, stay];
    });
  };

  return (
    <TripContext.Provider value={{ savedDestinations, savedTrips, comparedStays, toggleCompareStay, ... }}>
      {children}
    </TripContext.Provider>
  );
}`
  }
};

const PROJECT_TREE = [
  {
    name: "yatravista/",
    type: "folder",
    children: [
      {
        name: "public/",
        type: "folder",
        children: [
          { name: "favicon.svg", type: "file", desc: "Original brand SVG mark" }
        ]
      },
      {
        name: "src/",
        type: "folder",
        children: [
          {
            name: "components/",
            type: "folder",
            children: [
              { name: "layout/ (Navbar, Footer, PageLayout)", type: "file", desc: "Top bar, multi-theme selector & SIH banner" },
              { name: "ui/ (Button, Modal, EmptyState, ThemeSwitcher)", type: "file", desc: "Accessible reusable primitives" },
              { name: "destinations/ (DestinationCard, DestinationFilters)", type: "file", desc: "Filter pills, budget sorting, wishlist" },
              { name: "stays/ (StayCard, StayComparison)", type: "file", desc: "3-property side-by-side comparison modal" },
              { name: "planner/ (PlannerForm, ItineraryDay, BudgetSummary)", type: "file", desc: "Morning/afternoon/evening slot organizer" }
            ]
          },
          {
            name: "pages/",
            type: "folder",
            children: [
              { name: "Home.jsx", type: "file", desc: "Cinematic hero, collections, workflow" },
              { name: "Explore.jsx", type: "file", desc: "8 Indian destinations directory" },
              { name: "DestinationDetails.jsx", type: "file", desc: "Rich circuit guide & landmark sights" },
              { name: "Stays.jsx & StayDetails.jsx", type: "file", desc: "13 demonstrator properties & room tariffs" },
              { name: "Experiences.jsx", type: "file", desc: "12 artisan community workshops" },
              { name: "TripPlanner.jsx", type: "file", desc: "Rule-based synthesis & print export" },
              { name: "SavedTrips.jsx", type: "file", desc: "Local storage saved itineraries vault" },
              { name: "About.jsx", type: "file", desc: "SIH problem #26204 & team placeholders" },
              { name: "NotFound.jsx", type: "file", desc: "Custom 404 recovery page" }
            ]
          },
          {
            name: "utils/",
            type: "folder",
            children: [
              { name: "itineraryGenerator.js", type: "file", desc: "Slot sequencer & pace adaptation" },
              { name: "budgetCalculator.js", type: "file", desc: "Itemized cost arithmetic formulas" },
              { name: "currencyFormatter.js", type: "file", desc: "Indian Rupee (₹) number formatting" }
            ]
          },
          {
            name: "context/",
            type: "folder",
            children: [
              { name: "ThemeContext.jsx", type: "file", desc: "3-theme switcher with localStorage" },
              { name: "TripContext.jsx", type: "file", desc: "Saved trips, wishlist & stay comparison" }
            ]
          },
          {
            name: "data/",
            type: "folder",
            children: [
              { name: "destinations.js", type: "file", desc: "8 curated Indian destination datasets" },
              { name: "stays.js", type: "file", desc: "13 fictional demo hotel/homestay listings" },
              { name: "experiences.js", type: "file", desc: "12 local artisan workshops" }
            ]
          },
          { name: "styles/index.css", type: "file", desc: "Custom theme properties & print styles" },
          { name: "App.jsx & main.jsx", type: "file", desc: "React Router & application mount" }
        ]
      },
      { name: "tailwind.config.js", type: "file", desc: "Tailwind CSS tokens & custom fonts" },
      { name: "README.md", type: "file", desc: "Full developer & hackathon documentation" }
    ]
  }
];

export function ProjectShowcase() {
  const [selectedFile, setSelectedFile] = useState("itineraryGenerator.js");
  const [copied, setCopied] = useState(false);

  const activeSnippet = CODE_SNIPPETS[selectedFile];

  const handleCopyCode = () => {
    if (activeSnippet && navigator.clipboard) {
      navigator.clipboard.writeText(activeSnippet.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="border-b border-theme-border pb-6 space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-theme-primary-light text-theme-primary">
          <Code className="w-3.5 h-3.5" />
          <span>Architecture & Code Showcase</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-theme-text">
          Project Folder & Source Code Explorer
        </h1>
        <p className="text-sm text-theme-text-muted max-w-2xl leading-relaxed">
          Designed for Smart India Hackathon problem statement #26204 evaluation. Explore the modular file hierarchy, deterministic calculation algorithms, and React Context state machine.
        </p>
      </div>

      {/* Grid: Folder Tree & Live Code Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Folder Tree */}
        <div className="lg:col-span-4 bg-theme-surface rounded-2xl border border-theme-border p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between border-b border-theme-border pb-3">
            <h2 className="font-serif font-bold text-base text-theme-text flex items-center gap-2">
              <Folder className="w-4 h-4 text-theme-accent" />
              <span>Project Directory</span>
            </h2>
            <span className="text-[10px] uppercase font-bold text-theme-text-muted bg-theme-tag px-2 py-0.5 rounded">
              Modular Structure
            </span>
          </div>

          <div className="text-xs space-y-2 font-mono text-theme-text max-h-[520px] overflow-y-auto pr-1">
            {PROJECT_TREE[0].children.map((section, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-theme-primary">
                  <Folder className="w-3.5 h-3.5 text-theme-accent shrink-0" />
                  <span>{section.name}</span>
                </div>
                
                <div className="pl-4 border-l border-theme-border/80 space-y-1.5 mt-1">
                  {section.children?.map((item, itemIdx) => (
                    <div key={itemIdx} className="space-y-1">
                      {item.type === "folder" ? (
                        <div>
                          <span className="font-semibold text-theme-text flex items-center gap-1">
                            <Folder className="w-3 h-3 text-amber-600" />
                            <span>{item.name}</span>
                          </span>
                          <div className="pl-3 border-l border-theme-border/60 space-y-1 mt-1">
                            {item.children?.map((sub, subIdx) => (
                              <div key={subIdx} className="text-[11px] text-theme-text-muted">
                                <span className="font-medium text-theme-text">{sub.name}</span>
                                <span className="text-[10px] text-theme-text-subtle block font-sans">
                                  {sub.desc}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[11px] text-theme-text-muted">
                          <span className="font-medium text-theme-text">{item.name}</span>
                          <span className="text-[10px] text-theme-text-subtle block font-sans">
                            {item.desc}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-theme-border text-[11px] text-theme-text-muted">
            <span>Clean separation: Reusable Components, Page Routes, Utilities, Data Models, and Custom Hooks.</span>
          </div>
        </div>

        {/* Right Column: Code Viewer with Tabs */}
        <div className="lg:col-span-8 bg-theme-surface rounded-2xl border border-theme-border shadow-card overflow-hidden flex flex-col">
          
          {/* File Selector Tabs */}
          <div className="bg-theme-bg/80 border-b border-theme-border px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {Object.keys(CODE_SNIPPETS).map((fileName) => {
                const isSelected = selectedFile === fileName;
                return (
                  <button
                    key={fileName}
                    type="button"
                    onClick={() => setSelectedFile(fileName)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                      isSelected
                        ? "bg-theme-primary text-white shadow-xs"
                        : "bg-theme-surface text-theme-text-muted hover:text-theme-text border border-theme-border"
                    }`}
                  >
                    {fileName}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-theme-surface border border-theme-border text-xs font-semibold text-theme-text hover:bg-theme-bg shadow-xs cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Snippet Header Info */}
          <div className="p-4 bg-theme-primary-light/30 border-b border-theme-border flex items-center justify-between text-xs">
            <div className="space-y-0.5">
              <span className="font-mono font-bold text-theme-primary">
                {activeSnippet.path}
              </span>
              <p className="text-[11px] text-theme-text-muted">
                {activeSnippet.description}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded bg-theme-primary text-white font-semibold text-[10px] uppercase tracking-wider shrink-0">
              {activeSnippet.category}
            </span>
          </div>

          {/* Syntax Code Container */}
          <div className="p-5 bg-neutral-900 text-neutral-100 overflow-x-auto font-mono text-xs leading-relaxed max-h-[520px] select-text">
            <pre className="whitespace-pre">
              <code>{activeSnippet.code}</code>
            </pre>
          </div>

        </div>

      </div>

      {/* SIH Evaluation Highlights */}
      <div className="p-8 rounded-3xl bg-theme-surface border border-theme-border shadow-card grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-theme-text-muted">
        <div className="space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-theme-text">
            <Cpu className="w-4 h-4 text-theme-primary" />
            <span>Deterministic Rule Engine</span>
          </div>
          <p>
            Algorithm avoids overlapping landmarks, adapts morning/afternoon/evening slots to traveler pace, and fills gaps with leisurely cultural moments.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-theme-text">
            <Layers className="w-4 h-4 text-theme-primary" />
            <span>Pure React 19 & Tailwind 3</span>
          </div>
          <p>
            No heavy third-party bloat. Built with clean custom hooks, CSS variable token bindings, accessible modals, and print stylesheet hooks.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 font-serif font-bold text-sm text-theme-text">
            <BookOpen className="w-4 h-4 text-theme-primary" />
            <span>Zero API Key Dependency</span>
          </div>
          <p>
            Designed so evaluators can run the full website offline or locally without configuring billing tokens or third-party accounts.
          </p>
        </div>
      </div>

    </div>
  );
}
