import React from "react";
import { useState } from "react";

function reviewsForm()
{
    const [forminput, setOutput] = useState({
        suggestion_name: '',
        liked: true,
        feedback: '' 
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOutput({...forminput, [name]: value});
    };

    const handleSubmit =  aysnc (e) => {
        e.preventDefault();
        
        //call supabase to insert form input state
        const {data, error} = await supabase
        .from('reviews_page')
        .insert([   //add the inputed data from sql onto the table
            {
                suggestion_name: forminput.suggestion_name,
                liked: forminput.liked,
                feedback: forminput.feedback
            }
        ]),

        if (error) {

        }

    };

    return (
        <div className="review-container">
            <h2>Rate our Recommendations!</h2>
            <form className="reviewForm">
                <input name="place_name" type="text" placeholder="Country" onChange={handleChange} />
                <textarea name="comment" value={forminput.place_name} onChange={handleChange}/>
                <div className="buttons">
                    <button
                        type="button"
                        className={forminput.liked ? "active" : ""}
                        onClick={() => setOutput({...forminput, liked: true})}
                    >
                    👍 
                    </button>
                    <button
                        type="button"
                        className={forminput.liked ? "active" : ""}
                        onClick={() => setOutput({...forminput, liked: false})}
                    >
                    👎 
                    </button>
                </div>
                <button type="submit" > Submit</button>
            </form>
            
        </div>
    );
}

export default reviewsForm;