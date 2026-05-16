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

    useEffect(() => {
        async function getMyData() {
            const { data, error } = await supabase
                .from('reviews_page')
                .select('destination_name, liked, suggestion_name');
                
            if (!error && data) {
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
            <h2 className="text-3xl font-extrabold text-[#0A2540] mb-4 text-center uppercase tracking-tight">Your Travel History Wrapped!</h2>
            
            {stats.length > 0 ? (
                <>
                    <p className="text-lg text-center font-semibold mb-6 text-gray-700"> 
                        You visited <span className="text-blue-600 underline font-bold">{stats[0].name}</span> the most! 
                        Top highlight activity: <span className="italic">"{stats[0].topActivity}"</span>.
                    </p>
                    <table className="w-full bg-white rounded-lg overflow-hidden shadow">
                        <thead className="bg-[#0A2540] text-white">
                            <tr>
                                <th className="p-3 text-left">Destination</th>
                                <th className="p-3 text-left">Visits Registered</th>
                                <th className="p-3 text-left">Top Recommended Activity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.map((item, index) => (
                                <tr key={index} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="p-3 font-bold text-gray-900">{item.name}</td>
                                    <td className="p-3 text-gray-600">{item.count} visits logged</td>
                                    <td className="p-3 italic text-blue-800 font-medium">{item.topActivity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            ) : (
                <p className="text-center text-gray-500 py-8">No matching logs found yet! Submit liked spots on the reviews page to build your history summary footprint.</p>
            )}
        </div>  
    );
}

export default TravelWrap;