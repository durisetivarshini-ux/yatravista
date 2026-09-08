export const DEFAULT_CHECKLIST_TEMPLATES = [
  {
    category: "Documents & Confirmations",
    items: [
      { id: "doc-1", text: "Government-issued Photo ID / Passport", completed: false },
      { id: "doc-2", text: "Train / Flight / Bus tickets (offline PDF or printed)", completed: false },
      { id: "doc-3", text: "Homestay / Hotel booking reference IDs", completed: false },
      { id: "doc-4", text: "Emergency contact numbers & local cab coordinator", completed: false }
    ]
  },
  {
    category: "Clothing & Weather Essentials",
    items: [
      { id: "cloth-1", text: "Breathable cottons or lightweight layers for temple visits", completed: false },
      { id: "cloth-2", text: "Comfortable walking shoes / sandals (easy to remove at shrines)", completed: false },
      { id: "cloth-3", text: "Scarf / Shawl (for sun protection or modest shrine entry)", completed: false },
      { id: "cloth-4", text: "Rain jacket / compact umbrella (for hill stations & coastal rains)", completed: false }
    ]
  },
  {
    category: "Electronics & Daily Gear",
    items: [
      { id: "tech-1", text: "Phone charger & high-capacity power bank (10,000mAh+)", completed: false },
      { id: "tech-2", text: "UPI digital payment setup + Emergency cash (INR ₹2,000 in small notes)", completed: false },
      { id: "tech-3", text: "Offline Google Maps downloaded for destination zone", completed: false }
    ]
  },
  {
    category: "Health & Personal Care",
    items: [
      { id: "health-1", text: "Reusable insulated water bottle with filter", completed: false },
      { id: "health-2", text: "Personal first-aid: ORS sachets, digestive aid, band-aids", completed: false },
      { id: "health-3", text: "Sunscreen lotion (SPF 30+) & insect repellent", completed: false }
    ]
  },
  {
    category: "Responsible Travel Reminders",
    items: [
      { id: "resp-1", text: "Cloth tote bag for plastic-free market shopping", completed: false },
      { id: "resp-2", text: "Cash ready for direct artisan tipping & craft guilds", completed: false }
    ]
  }
];

export function createInitialChecklist() {
  return DEFAULT_CHECKLIST_TEMPLATES.flatMap(cat =>
    cat.items.map(item => ({
      ...item,
      category: cat.category,
      id: `${item.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
    }))
  );
}
