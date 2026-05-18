import React, { useState, useEffect } from 'react';

const LOCAL_DESTINATIONS = [
  {
    id: 1,
    city: "Tokyo",
    country: "Japan",
    season: "Spring",
    image_url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80",
    popular_food: "Sushi, Ramen, & Gyoza",
    activities: "Visit ancient shrines, explore Akihabara tech shops"
  },
  {
    id: 2,
    city: "Rome",
    country: "Italy",
    season: "Summer",
    image_url: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80",
    popular_food: "Pasta Carbonara, Pizza, & Gelato",
    activities: "Tour the Colosseum, throw a coin in the Trevi Fountain"
  },
  {
    id: 3,
    city: "Bali",
    country: "Indonesia",
    season: "Fall",
    image_url: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80",
    popular_food: "Nasi Goreng & Chicken Satay",
    activities: "Surf at Kuta beach, tour beautiful hillside temples"
  },
  {
    id: 4,
    city: "Paris",
    country: "France",
    season: "Spring",
    image_url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80",
    popular_food: "Croissants, Escargot, & Macarons",
    activities: "Climb the Eiffel Tower, view art collections at the Louvre"
  },
  {
    id: 5,
    city: "Reykjavik",
    country: "Iceland",
    season: "Winter",
    image_url: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    popular_food: "Kjötsúpa (Lamb Soup) & Rye Bread Ice Cream",
    activities: "Hunt for the Northern Lights, relax in the Blue Lagoon hot springs"
  },
  {
    id: 6,
    city: "Oaxaca",
    country: "Mexico",
    season: "Fall",
    image_url: "https://images.unsplash.com/photo-1512813583145-baaa340ef29f?auto=format&fit=crop&w=800&q=80",
    popular_food: "Mole Poblano, Tlayudas, & Mezcal",
    activities: "Celebrate Day of the Dead, explore the ruins of Monte Albán"
  },
  {
    id: 7,
    city: "New York City",
    country: "United States",
    season: "Winter",
    image_url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=800&q=80",
    popular_food: "New York Slice Pizza, Bagels, & Cheesecake",
    activities: "Ice skate at Rockefeller Center, see a live Broadway show"
  },
  {
    id: 8,
    city: "Cape Town",
    country: "South Africa",
    season: "Summer",
    image_url: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80",
    popular_food: "Biltong, Bobotie, & Fresh Seafood",
    activities: "Ride the cableway up Table Mountain, see penguins at Boulders Beach"
  }
];

export default function Travel() {
  const [preferences, setPreferences] = useState(null);
  const [selectedSeason, setSelectedSeason] = useState("All");
  
  const [countriesCount, setCountriesCount] = useState(0);
  const [challengeOne, setChallengeOne] = useState(false);
  const [challengeTwo, setChallengeTwo] = useState(false);

  const taskPoints = (challengeOne ? 25 : 0) + (challengeTwo ? 25 : 0);
  const countryPoints = countriesCount * 10;
  const milestoneBonus = countriesCount >= 3 ? 50 : 0;
  const totalScore = taskPoints + countryPoints + milestoneBonus;

  const loadPreferences = () => {
    const savedQuiz = localStorage.getItem("userTravelPreferences");
    if (savedQuiz) {
      setPreferences(JSON.parse(savedQuiz));
    } else {
      setPreferences(null);
    }
  };

  useEffect(() => {
    loadPreferences();
    window.addEventListener('storage', loadPreferences);
    window.addEventListener('localPreferencesUpdated', loadPreferences);
    return () => {
      window.removeEventListener('storage', loadPreferences);
      window.removeEventListener('localPreferencesUpdated', loadPreferences);
    };
  }, []);

  const handleClearProfile = () => {
    localStorage.removeItem("userTravelPreferences");
    setCountriesCount(0);
    setChallengeOne(false);
    setChallengeTwo(false);
    setSelectedSeason("All");
    loadPreferences(); 
  };

  let displayedDestinations = selectedSeason === "All" 
    ? LOCAL_DESTINATIONS 
    : LOCAL_DESTINATIONS.filter(dest => dest.season === selectedSeason);

  if (preferences) {
    displayedDestinations = displayedDestinations.filter(dest => {
      const matchesCuisine = preferences.favoriteCuisine 
        ? dest.popular_food.toLowerCase().includes(preferences.favoriteCuisine.toLowerCase()) ||
          dest.city.toLowerCase().includes(preferences.favoriteCuisine.toLowerCase())
        : false;

      let matchesMonth = false;
      if (preferences.travel_months && preferences.travel_months.length > 0) {
        matchesMonth = preferences.travel_months.some(month => {
          const cleanMonth = month.toLowerCase().trim();
          if (dest.season === "Spring" && ["march", "april", "may"].includes(cleanMonth)) return true;
          if (dest.season === "Summer" && ["june", "july", "august"].includes(cleanMonth)) return true;
          if (dest.season === "Fall" && ["september", "october", "november"].includes(cleanMonth)) return true;
          if (dest.season === "Winter" && ["december", "january", "february"].includes(cleanMonth)) return true;
          return false;
        });
      }

      if (!preferences.favoriteCuisine && (!preferences.travel_months || preferences.travel_months.length === 0)) {
        return true;
      }

      return matchesCuisine || matchesMonth;
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-left font-sans text-xs text-slate-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Strip */}
        <div className="mb-5 border-b border-slate-200 pb-3 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide">The Global Dashboard</h2>
            <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Your Personalized Journey Metrics</p>
          </div>
          {preferences && (
            <button 
              onClick={handleClearProfile}
              className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-md border border-red-200 transition-colors cursor-pointer uppercase tracking-wider"
            >
              Reset Data
            </button>
          )}
        </div>

        {!preferences ? (
          <div className="bg-white p-8 rounded-xl border border-slate-200 text-center max-w-sm mx-auto my-12 shadow-sm">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs">No active traveler logs found.</p>
            <p className="text-slate-400 mt-1 text-[11px]">Please complete the travel questionnaire on the home page first!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* SCOREBOARD & STATS METRICS PANEL */}
            <div className="flex flex-col gap-4">
              
              <div className="bg-[#0A2540] text-white p-3.5 rounded-xl shadow-md border border-slate-800">
                <h4 className="font-bold text-slate-300 uppercase tracking-widest text-[9px] mb-1">Global Exploration Score</h4>
                <div className="flex items-baseline justify-between mt-1">
                  <span className="text-2xl font-black tracking-tight text-white">{totalScore} <span className="text-xs font-normal text-slate-400">XP</span></span>
                  <span className="text-[9px] font-bold tracking-wider uppercase bg-white/10 px-2 py-0.5 rounded text-white">
                    {countriesCount >= 3 ? "Nomad Elite" : "Explorer"}
                  </span>
                </div>
                {milestoneBonus > 0 && (
                  <p className="text-[9px] text-emerald-300 font-bold mt-2 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/30 uppercase tracking-wide text-center">
                    Milestone Unlocked +50 XP
                  </p>
                )}
              </div>

              <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-2">Footprint Tracker</h4>
                <div className="mb-2.5 text-slate-600">
                  <p className="text-[11px]">User: <strong className="text-[#0A2540] font-bold uppercase">{preferences.username}</strong></p>
                  <p className="text-[10px] text-slate-400 uppercase mt-0.5">Cuisine focus: {preferences.favoriteCuisine || "Universal"}</p>
                </div>
                
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-200 flex items-center justify-between px-3">
                  <span className="font-bold text-slate-500 uppercase tracking-wider text-[9px]">Places Visited:</span>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => setCountriesCount(Math.max(0, countriesCount - 1))} className="w-5 h-5 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded text-xs font-bold transition-colors shadow-sm">-</button>
                    <span className="font-black text-[#0A2540] text-sm w-4 text-center">{countriesCount}</span>
                    <button onClick={() => setCountriesCount(countriesCount + 1)} className="w-5 h-5 flex items-center justify-center bg-white hover:bg-slate-100 border border-slate-300 text-slate-700 rounded text-xs font-bold transition-colors shadow-sm">+</button>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3.5 border border-slate-200 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-400 uppercase tracking-wider text-[9px] mb-2.5">Active Directives</h4>
                <div className="space-y-2.5">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={challengeOne} 
                      onChange={(e) => setChallengeOne(e.target.checked)} 
                      className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-[#0A2540] focus:ring-0 cursor-pointer" 
                    />
                    <div>
                      <p className={`font-bold uppercase tracking-wide text-[10px] ${challengeOne ? 'line-through text-slate-300' : 'text-slate-800'}`}>Local Foodie (+25 XP)</p>
                      <p className="text-slate-400 text-[10px]">Sample local cuisine from recommendation cards</p>
                    </div>
                  </label>

                  <label className="flex items-start gap-2.5 cursor-pointer select-none pt-2.5 border-t border-slate-100">
                    <input 
                      type="checkbox" 
                      checked={challengeTwo} 
                      onChange={(e) => setChallengeTwo(e.target.checked)} 
                      className="w-3.5 h-3.5 mt-0.5 rounded border-slate-300 text-[#0A2540] focus:ring-0 cursor-pointer" 
                    />
                    <div>
                      <p className={`font-bold uppercase tracking-wide text-[10px] ${challengeTwo ? 'line-through text-slate-300' : 'text-slate-800'}`}>Global Explorer (+25 XP)</p>
                      <p className="text-slate-400 text-[10px]">Review your custom interactive destination tabs</p>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* SUGGESTION RESULTS STRIP & DYNAMIC CARDS LAYOUT */}
            <div className="md:col-span-2 space-y-3">
              <div className="bg-white p-2 border border-slate-200 rounded-xl shadow-sm flex gap-1.5 items-center">
                <span className="font-bold text-slate-400 uppercase px-1 text-[9px] tracking-wider">Target Season:</span>
                {["All", "Spring", "Summer", "Fall", "Winter"].map((season) => (
                  <button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded transition-all cursor-pointer border ${
                      selectedSeason === season
                        ? "bg-[#0A2540] border-[#0A2540] text-white shadow-sm"
                        : "bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100"
                    }`}
                  >
                    {season}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {displayedDestinations.map((dest) => (
                  <div key={dest.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col relative group hover:border-slate-300 transition-all">
                    <span className="absolute top-2 right-2 text-[8px] font-bold uppercase bg-[#0A2540] text-white px-1.5 py-0.5 rounded tracking-widest shadow-sm">
                      {dest.season}
                    </span>

                    <img 
                      src={dest.image_url} 
                      alt={dest.city} 
                      loading="lazy"
                      className="h-28 w-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all" 
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                    
                    <div className="p-3 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-black text-[#0A2540] uppercase tracking-wide">
                          {dest.city}, <span className="text-slate-400 font-semibold text-xs">{dest.country}</span>
                        </h3>
                        
                        <div className="mt-2.5 space-y-2 border-t border-slate-100 pt-2 text-[11px] text-slate-600">
                          <p><strong className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">🍲 Featured Cuisine:</strong> {dest.popular_food}</p>
                          <p><strong className="text-[10px] text-slate-400 uppercase tracking-wider block mb-0.5">🎯 Signature Activity:</strong> {dest.activities}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {displayedDestinations.length === 0 && (
                <div className="bg-white border border-slate-200 rounded-xl p-6 text-center text-slate-400 font-bold uppercase tracking-wider text-[9px]">
                  No items match your quiz inputs or selected seasonal filter.
                </div>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}