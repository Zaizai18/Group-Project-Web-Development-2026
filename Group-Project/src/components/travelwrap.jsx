import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient.js";

const processCountries = (data) => {
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

    return Object.entries(trip_counts)
        .map(([name, stats]) => {
            const activityEntries = Object.entries(stats.activities);
            const topActivity = activityEntries.length > 0 
                ? activityEntries.reduce((a, b) => (a[1] > b[1] ? a : b))[0] 
                : "Exploration";

            return {
                name: name,
                count: stats.total,
                topActivity: topActivity
            };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};

function TravelWrap() {
    const [stats, setStats] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalLiked, setTotalLiked] = useState(0); // Added this state

    const [quote, setQuote] = useState({ text: "", author: "" });
    useEffect(() => {
        async function getMyData() {
            try {
                const quoteRes = await fetch("https://api.quotable.io/random?tags=travel");
                const quoteData = await quoteRes.json();
                setQuote({ text: quoteData.content, author: quoteData.author });
            } catch (err) {
                console.error("API Fetch error:", err);
            }

            const { data, error } = await supabase
                .from('reviews_page')
                .select('*');
                
            if (!error && data) {
                // Count the liked trips before processing the top 5
                const likedCount = data.filter(trip => trip.liked === true).length;
                setTotalLiked(likedCount);

                const topFive = processCountries(data);
                setStats(topFive);
            } else {
                console.error("error fetching wrap data summary:", error);
            }
            setLoading(false);
        }
        getMyData();
    }, []);
    
    if (loading) return <div className="text-center p-10 font-medium text-gray-600">Compiling your global metrics footprint...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-[#E5E5E5] rounded-xl shadow-md mt-8 text-gray-800">
            {/* Travel Quote Section (External API) */}
            {quote.text && (
                <div className="mb-6 p-4 bg-white rounded-lg border-l-4 border-blue-500 italic shadow-sm">
                    <p className="text-gray-700">"{quote.text}"</p>
                    <p className="text-right text-sm font-bold text-blue-600">— {quote.author}</p>
                </div>
            )}
            
            <h2 className="text-3xl font-extrabold text-[#0A2540] mb-4 text-center uppercase tracking-tight">Your Travel History Wrapped!</h2>
            
            {stats.length > 0 ? (
                <>
                    {/* ... (Keep your existing table JSX here) ... */}
                </>
            ) : (
                <div className="text-center p-6 bg-white rounded-lg">
                    <h2 className="text-xl font-bold mb-2">Travel Wrapped Locked</h2>
                    <p className="text-gray-600">Keep exploring! Your travel wrap unlocks once you've liked your first few trips.</p>
                    <p className="mt-4 font-mono text-blue-600 font-bold">
                        Current progress: {totalLiked} liked trips
                    </p>
                </div> 
            )}   
        </div>  
    );
}

export default TravelWrap;