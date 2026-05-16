import React from "react";
import { supabase } from "./supabaseClient";
import { useState } from "react";

function ReviewsForm()
{
    const [forminput, setOutput] = useState({
        suggestion_name: '',
        liked: true,
        feedback: '',
        destination_name: '',
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOutput({...forminput, [name]: value});
    };

    const handleSubmit =  async (e) => {
        e.preventDefault();
        
        //call supabase to insert form input state
        const {data, error} = await supabase
        .from('reviews_page').insert([   //add the inputed data from sql onto the table
            {
                suggestion_name: forminput.suggestion_name,
                liked: forminput.liked,
                feedback: forminput.feedback,
                destination_name: forminput.destination_name,  
            }
        ]);

        if (error) {
            console.error("error inserting data: ", error.message);
            alert("something went wrong submitting!");
        } else {
            console.log("Success! data saved:", data);
            alert("review is submitted!");

            //clear the form after submitted
            setOutput({
                suggestion_name: '',
                liked: true,
                feedback: '',
                destination_name: '',
            });
        }

    };

    return (
        <div className="review-container">
            <h2>Rate our Recommendations!</h2>
            <form className="reviewForm" onSubmit={handleSubmit}>
                <input name="suggestion_name" type="text" placeholder="what did we suggest?" value={forminput.suggestion_name} onChange={handleChange} />
                <textarea name="comment" value={forminput.comment} onChange={handleChange}/>
                <div className="buttons">
                    <button
                        type="button"
                        className={forminput.liked === true ? "active" : ""}
                        onClick={() => setOutput({...forminput, liked: true})}
                    >
                    👍 
                    </button>
                    <button
                        type="button"
                        className={forminput.liked === false ? "active" : ""}
                        onClick={() => setOutput({...forminput, liked: false})}
                    >
                    👎 
                    </button>
                </div>
                <textarea name="feedback" type="text" placeholder="give us feedback on what u liked about our suggestions? is this a trip you want to make in the future again?" value={forminput.feedback} onChange={handleChange}></textarea>

                <textarea name="destination_name" type="text" placeholder="where did you go?" value={forminput.destination_name} onChange={handleChange}></textarea>
                
                <p>Share your feedback about your trip...</p>
                <button type="submit"> Submit</button>
            </form> 
        </div>
    );
}

export default ReviewsForm;