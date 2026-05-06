import React from "react";
import { useState, useEffect } from "react";
import "./reviewsForm.jsx";
import { supabase } from "./supabaseClient.js";
//sql needs to be imported to 

const processCountries = (data) => {
    const likedTrips = data.filter(trip => trip.liked === true);
    const trip_counts = {};

    
    likedTrips.forEach(trip => {
        // Corrected variable name: trip.destination_name
        const name = trip.destination_name; 
        const activity = trip.suggestion_name; 

        if (!name[name])
        {
            trip_counts[name] = {total: 0, activites: {} };
        }

        trip_counts[name] += 1;
    });

    return Object.entries(trip_counts)
        .map(([name, stats]) => {
            const top_activity = Object.entries(stats.activites).reduce((a, b) => (a[1] > b[1] ? a : b));
            return {
                name: name,
                count: stats.total,
                topActivity: stats.topActivity
            };
        })
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);
};

function TravelWrap()
{
    //get the country data and the function to change it 
    const [stats, setStats] = useState([]);

    //page life cycle
    useEffect(() => {
        async function getMyData() {
            const {data, error} = await supabase.from('reviews_page').select('suggestion_name, liked, destination_name');
            if (!error & data) {
                const topFive = processCountries(data);
                setStats(topFive);
            } else {
                console.error("error fetching wrap:", error)
            }
        }
        getMyData();
    }, []);
    
    return (
        <div className="review-container">
            <h2>Your Travel History Wrapped!</h2>
            
            <p> You visited {item[0].name} the most! You enjoyed {}</p>
            <table>
                <tbody>
                    {stats.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.count} visits</td>
                            <td>{item.topActivity} </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>  
    );
}

export default TravelWrap;