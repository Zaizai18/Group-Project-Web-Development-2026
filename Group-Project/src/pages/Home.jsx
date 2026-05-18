import React, { useState, useRef } from 'react';
import heroImage from '../assets/image/travel.webp'; 
import HomeForm from '../components/homeForm'; 
import { supabase } from "../utils/supabaseClient"; 

export default function Home() {
  const formRef = useRef(null);

  const [username, setUsername] = useState('');
  const [favoriteCuisine, setFavoriteCuisine] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedDietary, setSelectedDietary] = useState([]);
  const [otherDietary, setOtherDietary] = useState('');
  const [isOtherChecked, setIsOtherChecked] = useState(false);

  const handleMonthChange = (month) => {
    setSelectedMonths(prev => 
      prev.includes(month) ? prev.filter(m => m !== month) : [...prev, month]
    );
  };

  const handleDietaryChange = (restriction) => {
    setSelectedDietary(prev => 
      prev.includes(restriction) ? prev.filter(d => d !== restriction) : [...prev, restriction]
    );
  };

  const handleSubmitPreferences = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter a username to save your travel preferences!");
      return;
    }

    const finalDietary = [...selectedDietary];
    if (isOtherChecked && otherDietary.trim()) {
      finalDietary.push(otherDietary.trim());
    }

    localStorage.setItem("userTravelPreferences", JSON.stringify({
      username,
      favoriteCuisine,
      travel_months: selectedMonths,
      dietary_restrictions: finalDietary
    }));

    window.dispatchEvent(new Event("localPreferencesUpdated"));

    const { data, error } = await supabase
      .from('reviews_page') 
      .insert([
        { 
          username: username,
          cuisine: favoriteCuisine,
          travel_months: selectedMonths, 
          dietary_restrictions: finalDietary,
          liked: true,
          destination_name: "Quiz Registration", 
          suggestion_name: `Prefers ${favoriteCuisine || "Universal"} food`, 
          feedback: "Initial dashboard setup from quiz." 
        }
      ]);

    if (error) {
      console.error("Supabase error:", error.message);
    }

    alert("Preferences saved successfully! Let's tailor your journey.");
    
    setUsername('');
    setFavoriteCuisine('');
    setSelectedMonths([]);
    setSelectedDietary([]);
    setOtherDietary('');
    setIsOtherChecked(false);
  };
  
  return (
    <div className="w-full flex flex-col">
      {/* Hero Banner Area */}
      <div 
        className="h-[600px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${heroImage})` }}
      >
        <div className="text-center text-white px-10 flex flex-col items-center gap-4">
          <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter" 
            style={{ textShadow: '0px 2px 0px #0e4e8e' }}
          >
            Unlock your Journey: <br /> 
            <span className="text-xl md:text-2xl font-bold tracking-normal normal-case block mt-2">
              Discover, Explore, Experience!
            </span>
          </h2>

          <button 
            type="button"
            onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="mt-4 bg-[#0e4e8e] hover:bg-blue-600 text-white font-bold uppercase tracking-wider text-xs px-5 py-2.5 rounded shadow transition-all cursor-pointer"
          >
            Take Travel Quiz ↓
          </button>
        </div>
      </div>

      {/* Form Wrapper Section Container */}
      <div 
        ref={formRef} 
        className="bg-[#E5E5E5] text-gray-800 p-8 md:p-12 border-t border-gray-300 scroll-mt-6 shadow-brand-red"
      >
        <div className="max-w-4xl mx-auto">
          <HomeForm 
            username={username}
            setUsername={setUsername}
            favoriteCuisine={favoriteCuisine}
            setFavoriteCuisine={setFavoriteCuisine}
            selectedMonths={selectedMonths}
            handleMonthChange={handleMonthChange}
            selectedDietary={selectedDietary}
            handleDietaryChange={handleDietaryChange}
            isOtherChecked={isOtherChecked}
            setIsOtherChecked={setIsOtherChecked}
            otherDietary={otherDietary}
            setOtherDietary={setOtherDietary}
            handleSubmitPreferences={handleSubmitPreferences}
          />
        </div>
      </div>
    </div>
  );
} 