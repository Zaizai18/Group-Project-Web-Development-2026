import React, { useState } from 'react';

// Sample hotspot pins located across our visual interactive panel layout
const SPOTLIGHT_PINS = [
  {
    id: 1,
    title: "Tsukiji Outer Market",
    type: "Food Spot",
    city: "Tokyo",
    dish: "Fresh Tuna Sushi & Tamagoyaki Omlets",
    activity: "Early morning fish market tasting walk",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=400&q=80",
    topOffset: "25%",
    leftOffset: "75%"
  },
  {
    id: 2,
    title: "Trastevere District Bistro",
    type: "Food Spot",
    city: "Rome",
    dish: "Traditional Guanciale Carbonara Sauce",
    activity: "Alleyway restaurant exploration & espresso tasting",
    img: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80",
    topOffset: "45%",
    leftOffset: "48%"
  },
  {
    id: 3,
    title: "Uluwatu Coast Point",
    type: "Activity Spot",
    city: "Bali",
    dish: "Traditional Seafood Jimbaran Barbecue",
    activity: "Cliffside temple tours and reef surfing",
    img: "https://images.unsplash.com/photo-1337996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    topOffset: "70%",
    leftOffset: "65%"
  }
];

export default function Explore() {
  const [activePin, setActivePin] = useState(null);

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-left font-sans text-xs text-slate-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-5 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide">Interactive Heatmap</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Click the pins on the grid array to reveal signature local dishes and activities</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
          
          {/* VISUAL MAP PANEL GRID */}
          <div className="md:col-span-2 bg-[#0A2540] h-80 rounded-xl relative overflow-hidden shadow-md border border-slate-800 bg-radial-pattern">
            
            {/* Grid decorative background lines to simulate radar/coordinates */}
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 opacity-10 pointer-events-none">
              {[...Array(24)].map((_, i) => (
                <div key={i} className="border border-white"></div>
              ))}
            </div>

            {/* Instruction Banner Overlay */}
            <div className="absolute bottom-2 left-2 bg-black/40 text-white backdrop-blur-sm px-2 py-1 rounded text-[9px] font-medium uppercase tracking-wider z-10">
              🗺️ Interactive Navigation Grid Matrix
            </div>

            {/* Rendering Pins Over Map Surface Area */}
            {SPOTLIGHT_PINS.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(pin)}
                style={{ top: pin.topOffset, left: pin.leftOffset }}
                className={`absolute w-4 h-4 rounded-full flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all ${
                  activePin?.id === pin.id 
                    ? "bg-white text-[#0A2540] scale-125 ring-4 ring-blue-500/50" 
                    : "bg-emerald-400 text-slate-900 hover:scale-110 animate-pulse"
                }`}
              >
                <span className="text-[8px] font-black">📍</span>
              </button>
            ))}

          </div>

          {/* DYNAMIC POPUP DETAILS SIDEBAR */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm h-80 flex flex-col justify-between">
            {!activePin ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 font-medium uppercase tracking-wider px-4">
                <span className="text-lg mb-1">🗺️</span>
                <p className="text-[10px]">No Hotspot selected</p>
                <p className="text-[9px] text-slate-300 normal-case mt-0.5">Click any active pulse indicator on the radar board grid to open localized popups.</p>
              </div>
            ) : (
              <div className="flex flex-col h-full justify-between animate-fadeIn">
                <div>
                  
                  {/* Card Header Tag */}
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded tracking-wider">
                      {activePin.city} Hub
                    </span>
                    <span className="text-[8px] font-bold uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded tracking-wider">
                      {activePin.type}
                    </span>
                  </div>

                  {/* Hotspot Image */}
                  <img src={activePin.img} alt={activePin.title} className="h-24 w-full object-cover rounded-lg mb-2.5 border border-slate-100" />
                  
                  <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wide mb-2">{activePin.title}</h3>
                  
                  {/* Info Breakdown Lines */}
                  <div className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                    <p><strong>🍲 Popular Food item:</strong> <br /> <span className="text-slate-500">{activePin.dish}</span></p>
                    <p><strong>🎯 Signature Action:</strong> <br /> <span className="text-slate-500">{activePin.activity}</span></p>
                  </div>

                </div>

                <button 
                  onClick={() => setActivePin(null)}
                  className="mt-3 text-center text-[9px] font-bold uppercase text-slate-400 hover:text-slate-600 bg-slate-50 hover:bg-slate-100 py-1 rounded border border-slate-200 transition-colors cursor-pointer tracking-wider"
                >
                  Close Window Info
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}