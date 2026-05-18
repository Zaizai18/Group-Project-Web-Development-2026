import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";

// Helper function with a safety guard for Object.entries
const processCountries = (data) => {
    if (!data || data.length === 0) return []; // Guard Clause

    const likedTrips = data.filter(trip => trip.liked === true);
    const trip_counts = {};

    likedTrips.forEach(trip => {
        const name = trip.destination_name || "Unknown Destination"; 
        const activity = trip.suggestion_name || "General Sightseeing"; 

        if (!trip_counts[name]) {
            trip_counts[name] = { total: 0, activities: {} };
        }

        trip_counts[name].total += 1;
        trip_counts[name].activities[activity] = (trip_counts[name].activities[activity] || 0) + 1;
    });

    // Ensure trip_counts isn't empty before calling Object.entries
    if (Object.keys(trip_counts).length === 0) return [];

    return Object.entries(trip_counts)
    .map(([name, s]) => {                              // just 's' instead of 'stats'
        const activityEntries = Object.entries(s?.activities ?? {});
        const topActivity = activityEntries.length > 0 
            ? activityEntries.reduce((a, b) => (a[1] > b[1] ? a : b))[0] 
            : "Exploration";
        return {
            name: name,
            count: s.total,
            topActivity: topActivity
        };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
};

function TravelWrap() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalLiked, setTotalLiked] = useState(0);
    const [quote, setQuote] = useState({ text: "Adventure awaits!", author: "Traveler" });

    useEffect(() => {
        async function getMyData() {
            try {
                // External API Fetch for the project requirement
                const quoteRes = await fetch("https://api.quotable.io/random?tags=travel");
                if (quoteRes.ok) {
                    const quoteData = await quoteRes.json();
                    setQuote({ text: quoteData.content, author: quoteData.author });
                }

                const { data, error } = await supabase
                    .from('reviews_page')
                    .select('*');
                
                if (!error && data) {
                    const likedCount = data.filter(trip => trip.liked === true).length;
                    setTotalLiked(likedCount);
                    
                    const processed = processCountries(data);
                    setStats(processed);
                }
            } catch (err) {
                console.error("System Error:", err);
            } finally {
                setLoading(false); // Clears the "Compiling" screen
            }
        }
        getMyData();
    }, []);
    
    if (loading) return <div className="text-center p-10 font-medium text-gray-600">Compiling your global metrics footprint...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#E5E5E5] rounded-xl shadow-md mt-8 text-gray-800">
            {/* Travel Quote (API) Section */}
            <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-blue-500 italic shadow-sm">
                <p className="text-gray-700">"{quote.text}"</p>
                <p className="text-right text-xs font-bold text-blue-600 mt-1">— {quote.author}</p>
            </div>

            <h2 className="text-3xl font-extrabold text-[#0A2540] mb-4 text-center uppercase tracking-tight">Your Travel History Wrapped!</h2>
            
            {stats.length > 0 ? (
                <>
                    <p className="text-lg text-center font-semibold mb-6 text-gray-700"> 
                        You visited <span className="text-blue-600 underline font-bold">{stats[0].name}</span> the most! 
                    </p>
                    <table className="w-full bg-white rounded-lg overflow-hidden shadow">
                        <thead className="bg-[#0A2540] text-white">
                            <tr>
                                <th className="p-3 text-left">Destination</th>
                                <th className="p-3 text-left">Visits</th>
                                <th className="p-3 text-left">Top Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-bold text-gray-900">{item.name}</td>
                                    <td className="p-3 text-gray-600">{item.count}</td>
                                    <td className="p-3 italic text-blue-800 font-medium">{item.topActivity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <div className="text-center p-8 bg-white rounded-lg">
                    <h2 className="text-xl font-bold text-[#0A2540]">Travel Wrapped</h2>
                    <p className="text-gray-600">Your wrap unlocks once you've liked some trips!</p>
                    <p className="mt-4 font-mono text-blue-600 font-bold">Likes Found: {totalLiked}</p>
                </div> 
            )}   
        </div>  
    );
}

export default TravelWrap;