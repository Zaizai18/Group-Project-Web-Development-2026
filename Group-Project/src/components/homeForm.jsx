import React from 'react';
import recommendations from '../data/recommendations.json';

export default function homeForm({
  username,
  setUsername,
  favoriteCuisine,
  setFavoriteCuisine,
  selectedMonths,
  handleMonthChange,
  selectedDietary,
  handleDietaryChange,
  isOtherChecked,
  setIsOtherChecked,
  otherDietary,
  setOtherDietary,
  handleSubmitPreferences
}) {
  const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const dietaryOptions = ["Halal", "Vegan", "Vegetarian", "No peanuts", "No eggs", "No seafood", "No Soy", "No Milk"];

  const getFilteredSuggestions = (userInput) => {
  // Convert input to lowercase to avoid case-sensitivity edge cases
  const searchKey = userInput.toLowerCase().trim();

  return recommendations.filter((item) => {
    // Check if the keyword exists in the destination, cuisine, or tags array
    return (
      item.destination.toLowerCase().includes(searchKey) ||
      item.cuisine.toLowerCase().includes(searchKey) ||
      item.keywords.some(tag => tag.toLowerCase().includes(searchKey))
    );
  });
  };
  return (
    <form onSubmit={handleSubmitPreferences} className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md border border-gray-300 text-left">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h3 className="text-xl font-bold text-gray-900">Travel Questionnaire</h3>
        <p className="text-xs text-gray-500 mt-1">Complete your preferences to customize your travel dashboard.</p>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600 uppercase">UserName:</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username" 
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-gray-600 uppercase">Favorite Cuisine:</label>
          <input 
            type="text" 
            value={favoriteCuisine}
            onChange={(e) => setFavoriteCuisine(e.target.value)}
            placeholder="e.g. Italian, Mexican, Japanese" 
            className="border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" 
          />
        </div>
      </div>

      {/* Months */}
      <div className="mb-6">
        <label className="text-xs font-bold text-gray-600 uppercase block mb-3">When do you want to travel?</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {months.map(m => (
            <label key={m} className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-xs uppercase cursor-pointer select-none ${selectedMonths.includes(m) ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-gray-300'}`}>
              <input type="checkbox" checked={selectedMonths.includes(m)} onChange={() => handleMonthChange(m)} className="w-4 h-4 text-blue-600" /> {m}
            </label>
          ))}
        </div>
      </div>

      {/* Dietary */}
      <div className="mb-6">
        <label className="text-xs font-bold text-gray-600 uppercase block mb-3">Dietary Restrictions:</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
          {dietaryOptions.map(item => (
            <label key={item} className={`flex items-center gap-3 px-4 py-2.5 border rounded-lg text-sm cursor-pointer select-none ${selectedDietary.includes(item) ? 'bg-green-50 border-green-500 text-green-700 font-bold' : 'bg-white border-gray-300'}`}>
              <input type="checkbox" checked={selectedDietary.includes(item)} onChange={() => handleDietaryChange(item)} className="w-4 h-4 text-green-600" /> {item}
            </label>
          ))}
        </div>

        {/* Other Input Row */}
        <div className="flex justify-start mt-4">
          <div className={`flex items-center gap-3 px-4 py-2 border rounded-lg w-full max-w-sm ${isOtherChecked ? 'bg-green-50 border-green-500' : 'border-gray-300'}`}>
            <input 
              type="checkbox" 
              checked={isOtherChecked}
              onChange={(e) => {
                setIsOtherChecked(e.target.checked);
                if (!e.target.checked) setOtherDietary('');
              }}
              className="w-4 h-4 text-green-600"
            />
            <input 
              type="text" 
              placeholder="Other restriction" 
              disabled={!isOtherChecked}
              value={otherDietary}
              onChange={(e) => setOtherDietary(e.target.value)}
              className={`bg-transparent w-full text-sm focus:outline-none ${!isOtherChecked ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`} 
            />
          </div>
        </div>
      </div>

      {/* Centered Button */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex justify-center">
        <button type="submit" className="bg-[#0A2540] hover:bg-[#12365a] text-white font-bold uppercase text-xs px-8 py-3 rounded-lg shadow transition-all cursor-pointer">
          Save My Preferences
        </button>
      </div>
    </form>
  );
}
