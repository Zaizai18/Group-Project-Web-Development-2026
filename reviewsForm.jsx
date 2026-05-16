// components/ReviewsForm.jsx
import React, { useState } from "react";
import { supabase } from "./supabaseClient";

function ReviewsForm() { // Capitalized name
    const [forminput, setOutput] = useState({
        suggestion_name: '',
        liked: true,
        feedback: '',
        destination_name: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOutput({ ...forminput, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Simple Rubric Form Validation
        if (!forminput.suggestion_name || !forminput.destination_name || !forminput.feedback) {
            alert("Please fill out all required fields!");
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
            alert("Something went wrong submitting!");
        } else {
            alert("Review submitted successfully!");
            setOutput({
                suggestion_name: '',
                liked: true,
                feedback: '',
                destination_name: ''            
            });
        }
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold mb-4 text-[#0A2540]">Rate our Recommendations!</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input 
                    name="suggestion_name" 
                    type="text" 
                    placeholder="What did we suggest?" 
                    className="border p-2 rounded"
                    value={forminput.suggestion_name} 
                    onChange={handleChange} 
                />
                
                <div className="flex gap-4 items-center">
                    <span className="font-semibold text-gray-700">Did you like it?</span>
                    <button
                        type="button"
                        className={p-2 border rounded ${forminput.liked === true ? "bg-green-500 text-white" : "bg-gray-100"}}
                        onClick={() => setOutput({ ...forminput, liked: true })}
                    >👍 Yes</button>
                    <button
                        type="button"
                        className={p-2 border rounded ${forminput.liked === false ? "bg-red-500 text-white" : "bg-gray-100"}}
                        onClick={() => setOutput({ ...forminput, liked: false })}
                    >👎 No</button>
                </div>

                <textarea 
                    name="feedback" 
                    placeholder="Give us feedback on what you liked..." 
                    className="border p-2 rounded h-24"
                    value={forminput.feedback} 
                    onChange={handleChange}
                />

                <textarea 
                    name="destination_name" 
                    placeholder="Where did you go? (Destination Country/City)" 
                    className="border p-2 rounded h-20"
                    value={forminput.destination_name} 
                    onChange={handleChange}
                />
                
                <button type="submit" className="bg-[#0A2540] text-white py-2 rounded font-bold uppercase tracking-wider hover:opacity-90">
                    Submit Review
                </button>
            </form> 
        </div>
    );
}

export default ReviewsForm;