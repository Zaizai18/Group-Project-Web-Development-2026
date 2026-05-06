import React from "react";
import { useState } from "react";
//sql needs to be imported to 

function TravelWrap()
{
    const [forminput, setOutput] = useState({
        place_name: '',
        comment: '',
        liked: true,
        recommend: true 
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setOutput({...forminput, [name]: value});
    };

    const handleSubmit =  aysnc (e) => {
        e.preventDefault();
        
        //call supabase to insert form input state
        const {data, error} = await supabase 
        .from('Travel Wrap')
        .insert([   //add the inputed data from sql onto the table
            {
                place_name: forminput.place_name,
                comment: forminput.comment,
                liked: forminput.liked,
                recommend: forminput.recommend
            }
        ]),

        if (error) {
            
        }



        //clear the form so
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
            
        </div>//ask SQL database for data
    );
}

export default TravelWrap;