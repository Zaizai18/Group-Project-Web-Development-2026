import React, { useState } from 'react';

const SPOTLIGHT_PINS = [
  {
    id: 1,
    title: "Tsukiji Outer Market",
    type: "Food Spot",
    city: "Tokyo",
    country: "Japan",
    season: "Winter",
    dietary: ["Halal", "Vegetarian"],
    dish: "Fresh Tuna Sushi & Tamagoyaki Omelettes",
    activity: "Early morning fish market tasting walk",
    img: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=90",
    topOffset: "20%",
    leftOffset: "76%"
  },
  {
    id: 2,
    title: "Trastevere District Bistro",
    type: "Food Spot",
    city: "Rome",
    country: "Italy",
    season: "Spring",
    dietary: ["Vegetarian"],
    dish: "Traditional Guanciale Carbonara",
    activity: "Alleyway restaurant exploration & espresso tasting",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=90",
    topOffset: "30%",
    leftOffset: "50%"
  },
  {
    id: 3,
    title: "Uluwatu Coast & Temple",
    type: "Activity Spot",
    city: "Bali",
    country: "Indonesia",
    season: "Summer",
    dietary: ["Vegan", "Vegetarian"],
    dish: "Traditional Seafood Jimbaran BBQ",
    activity: "Cliffside temple tours and reef surfing",
    img: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=90",
    topOffset: "58%",
    leftOffset: "72%"
  },
  {
    id: 4,
    title: "Jemaa el-Fnaa Square",
    type: "Food Spot",
    city: "Marrakech",
    country: "Morocco",
    season: "Winter",
    dietary: ["Halal", "Vegan"],
    dish: "Lamb Tagine with Preserved Lemons",
    activity: "Night market food stalls & storyteller circles",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8a58e3c?auto=format&fit=crop&w=800&q=90",
    topOffset: "38%",
    leftOffset: "44%"
  },
  {
    id: 5,
    title: "Torres del Paine Trek",
    type: "Activity Spot",
    city: "Patagonia",
    country: "Chile",
    season: "Spring",
    dietary: ["Vegan", "Vegetarian"],
    dish: "Curanto — traditional Chilean earth oven feast",
    activity: "W Trek — 80km through glaciers and granite towers",
    img: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=800&q=90",
    topOffset: "78%",
    leftOffset: "28%"
  },
  {
    id: 6,
    title: "Kerala Backwaters",
    type: "Food Spot",
    city: "Alleppey",
    country: "India",
    season: "Summer",
    dietary: ["Halal", "Vegan", "Vegetarian"],
    dish: "Karimeen Pollichathu — banana leaf grilled fish",
    activity: "Houseboat cruise through monsoon backwaters",
    img: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=90",
    topOffset: "45%",
    leftOffset: "64%"
  },
  {
    id: 7,
    title: "Chengdu Hotpot District",
    type: "Food Spot",
    city: "Chengdu",
    country: "China",
    season: "Autumn",
    dietary: ["Vegan", "Vegetarian"],
    dish: "Mala Sichuan Hotpot with hand-mixed dipping sauce",
    activity: "Evening hotpot under ginkgo trees + panda reserve",
    img: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=90",
    topOffset: "28%",
    leftOffset: "68%"
  },
  {
    id: 8,
    title: "Kadıköy Market",
    type: "Food Spot",
    city: "Istanbul",
    country: "Turkey",
    season: "Spring",
    dietary: ["Halal"],
    dish: "Balık Ekmek — fresh Bosphorus mackerel sandwich",
    activity: "Asian side market walk + ferry crossing at sunset",
    img: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=90",
    topOffset: "25%",
    leftOffset: "56%"
  },
  {
    id: 9,
    title: "Queenstown Adventure Hub",
    type: "Activity Spot",
    city: "Queenstown",
    country: "New Zealand",
    season: "Autumn",
    dietary: ["Vegetarian"],
    dish: "Otago lamb rack with local pinot noir",
    activity: "Bungee jumping, paragliding, and glacier hiking",
    img: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=800&q=90",
    topOffset: "82%",
    leftOffset: "82%"
  }
];

const SEASON_COLORS = {
  Winter: "bg-blue-100 text-blue-700",
  Spring: "bg-green-100 text-green-700",
  Summer: "bg-amber-100 text-amber-700",
  Autumn: "bg-orange-100 text-orange-700"
};

const ALL_SEASONS = ["All", "Spring", "Summer", "Autumn", "Winter"];
const ALL_DIETARY = ["All", "Halal", "Vegetarian", "Vegan"];

export default function Explore() {
  const [activePin, setActivePin] = useState(null);
  const [filterSeason, setFilterSeason] = useState("All");
  const [filterDietary, setFilterDietary] = useState("All");

  const visiblePins = SPOTLIGHT_PINS.filter(pin => {
    const seasonMatch = filterSeason === "All" || pin.season === filterSeason;
    const dietaryMatch = filterDietary === "All" || pin.dietary.includes(filterDietary);
    return seasonMatch && dietaryMatch;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-left font-sans text-xs text-slate-700">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-4 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide">Interactive Heatmap</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Click the pins on the grid to reveal signature local dishes and activities</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-4">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Season</p>
            <div className="flex gap-1 flex-wrap">
              {ALL_SEASONS.map(s => (
                <button
                  key={s}
                  onClick={() => { setFilterSeason(s); setActivePin(null); }}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-all cursor-pointer ${
                    filterSeason === s
                      ? "bg-[#0A2540] text-white border-[#0A2540]"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Dietary</p>
            <div className="flex gap-1 flex-wrap">
              {ALL_DIETARY.map(d => (
                <button
                  key={d}
                  onClick={() => { setFilterDietary(d); setActivePin(null); }}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-all cursor-pointer ${
                    filterDietary === d
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">

          {/* VISUAL MAP PANEL */}
          <div className="md:col-span-2 bg-[#0A2540] h-96 rounded-xl relative overflow-hidden shadow-md border border-slate-800">

            {/* Grid background */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-5 opacity-10 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="border border-white"></div>
              ))}
            </div>

            {/* Instruction Banner */}
            <div className="absolute bottom-2 left-2 bg-black/40 text-white backdrop-blur-sm px-2 py-1 rounded text-[9px] font-medium uppercase tracking-wider z-10">
              🗺️ Interactive Navigation Grid Matrix
            </div>

            {/* Pin count badge */}
            <div className="absolute top-2 right-2 bg-black/40 text-white backdrop-blur-sm px-2 py-1 rounded text-[9px] font-medium z-10">
              {visiblePins.length} spot{visiblePins.length !== 1 ? 's' : ''} visible
            </div>

            {/* All pins (greyed out if filtered) */}
            {SPOTLIGHT_PINS.map((pin) => {
              const isVisible = visiblePins.find(p => p.id === pin.id);
              const isActive = activePin?.id === pin.id;
              return (
                <button
                  key={pin.id}
                  onClick={() => isVisible && setActivePin(pin)}
                  style={{ top: pin.topOffset, left: pin.leftOffset }}
                  className={`absolute w-5 h-5 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 transition-all ${
                    !isVisible
                      ? "bg-slate-600 opacity-30 cursor-not-allowed"
                      : isActive
                      ? "bg-white text-[#0A2540] scale-150 ring-4 ring-blue-400/60 cursor-pointer"
                      : "bg-emerald-400 text-slate-900 hover:scale-125 animate-pulse cursor-pointer"
                  }`}
                >
                  <span className="text-[8px]">📍</span>
                </button>
              );
            })}
          </div>

          {/* POPUP SIDEBAR */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm h-96 flex flex-col justify-between">
            {!activePin ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 font-medium uppercase tracking-wider px-4">
                <span className="text-2xl mb-2">🗺️</span>
                <p className="text-[10px]">No Hotspot Selected</p>
                <p className="text-[9px] text-slate-300 normal-case mt-1">
                  {visiblePins.length > 0
                    ? `Click any glowing pin to explore. ${visiblePins.length} spot${visiblePins.length !== 1 ? 's' : ''} match your filters.`
                    : "No spots match your current filters. Try adjusting them."}
                </p>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between">
                <div className="overflow-y-auto">

                  {/* Tags row */}
                  <div className="flex justify-between items-center mb-2 flex-wrap gap-1">
                    <span className="text-[8px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded tracking-wider">
                      {activePin.city}, {activePin.country}
                    </span>
                    <span className={`text-[8px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wider ${SEASON_COLORS[activePin.season]}`}>
                      {activePin.season}
                    </span>
                  </div>

                  {/* Type badge */}
                  <div className="mb-2">
                    <span className="text-[8px] font-bold uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded tracking-wider">
                      {activePin.type}
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={activePin.img}
                    alt={activePin.title}
                    className="h-24 w-full object-cover rounded-lg mb-2.5 border border-slate-100"
                  />

                  <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wide mb-2">{activePin.title}</h3>

                  {/* Dietary badges */}
                  <div className="flex gap-1 flex-wrap mb-2">
                    {activePin.dietary.map(d => (
                      <span key={d} className="text-[8px] font-bold uppercase bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded tracking-widest">{d}</span>
                    ))}
                  </div>

                  <div className="space-y-2 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                    <p><strong>🍲 Popular Dish:</strong><br /><span className="text-slate-500">{activePin.dish}</span></p>
                    <p><strong>🎯 Signature Activity:</strong><br /><span className="text-slate-500">{activePin.activity}</span></p>
                  </div>
                </div>

                <button
                  onClick={() => setActivePin(null)}
                  className="mt-3 text-center text-[9px] font-bold uppercase text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 py-1 rounded border border-slate-200 transition-colors cursor-pointer tracking-wider"
                >
                  Close ✕
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Destination list below map */}
        <div className="mt-5">
          <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-2">All Visible Destinations</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {visiblePins.map(pin => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin)}
                className={`text-left p-2 rounded-lg border transition-all cursor-pointer ${
                  activePin?.id === pin.id
                    ? "border-[#0A2540] bg-[#0A2540] text-white"
                    : "border-slate-200 bg-white hover:border-slate-400"
                }`}
              >
                <p className={`text-[9px] font-black uppercase tracking-wide ${activePin?.id === pin.id ? "text-white" : "text-[#0A2540]"}`}>{pin.city}</p>
                <p className={`text-[8px] uppercase tracking-wider ${activePin?.id === pin.id ? "text-slate-300" : "text-slate-400"}`}>{pin.country} · {pin.type}</p>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {pin.dietary.map(d => (
                    <span key={d} className={`text-[7px] font-bold uppercase px-1 py-0.5 rounded tracking-widest ${activePin?.id === pin.id ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700"}`}>{d}</span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}