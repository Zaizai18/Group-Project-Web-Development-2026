import React, { useState } from "react";
import { supabase } from "../utils/supabaseClient";

function reviewsForm() {
    const [forminput, setOutput] = useState({
        suggestion_name: '',
        liked: true,
        feedback: '',
        destination_name: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOutput({ ...forminput, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Quick form guard validation
        if (!forminput.suggestion_name.trim() || !forminput.destination_name.trim() || !forminput.feedback.trim()) {
            alert("Please fill out what we suggested, your feedback, and where you went before submitting!");
            return;
        }
        
        const { data, error } = await supabase
            .from('reviews_page')
            .insert([
                {
                    suggestion_name: forminput.suggestion_name,
                    liked: forminput.liked,
                    feedback: forminput.feedback,
                    destination_name: forminput.destination_name, 
                }
            ]);

        if (error) {
            console.error("error inserting data: ", error.message);
            alert(`Something went wrong: ${error.message}`);
        } else {
            console.log("Success! data saved:", data);
            alert("review is submitted!");
            
            // Clean state reset
            setOutput({
                suggestion_name: '',
                liked: true,
                feedback: '',
                destination_name: '',       
            });
        }
    };

    return (
        <div className="review-container max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10 text-gray-800">
            <h2 className="text-2xl font-bold mb-4 text-[#0A2540]">Rate our Recommendations!</h2>
            <form className="reviewForm flex flex-col gap-4" onSubmit={handleSubmit}>
                
                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">What did we suggest?</label>
                    <input 
                        name="suggestion_name" 
                        type="text" 
                        placeholder="What did we suggest?" 
                        className="border p-2 rounded w-full bg-white text-gray-800"
                        value={forminput.suggestion_name} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="flex gap-4 items-center my-2">
                    <span className="font-semibold text-gray-700">Did you like it?</span>
                    <button
                        type="button"
                        className={`p-2 px-4 border rounded-md transition-colors ${forminput.liked === true ? "bg-green-500 text-white font-bold" : "bg-gray-100"}`}
                        onClick={() => setOutput({ ...forminput, liked: true })}
                    >
                        👍 
                    </button>
                    <button
                        type="button"
                        className={`p-2 px-4 border rounded-md transition-colors ${forminput.liked === false ? "bg-red-500 text-white font-bold" : "bg-gray-100"}`}
                        onClick={() => setOutput({ ...forminput, liked: false })}
                    >
                        👎 
                    </button>
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Where did you go?</label>
                    <textarea 
                        name="destination_name" 
                        placeholder="where did you go?" 
                        className="border p-2 rounded h-20 w-full bg-white text-gray-800"
                        value={forminput.destination_name} 
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Your Feedback:</label>
                    <textarea 
                        name="feedback" 
                        placeholder="Provide us feedback on what you liked about our suggestions? is this a trip you want to make in the future again?" 
                        className="border p-2 rounded h-28 w-full bg-white text-gray-800"
                        value={forminput.feedback} 
                        onChange={handleChange}
                    />
                </div>

                <button type="submit" className="bg-[#0A2540] text-white py-2 rounded font-bold uppercase tracking-wider hover:opacity-90 mt-2">
                    Submit
                </button>
            </form> 
        </div>
    );
}

export default reviewsForm;