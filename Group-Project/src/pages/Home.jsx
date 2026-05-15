import heroImage from '../assets/image/travel.webp'; 

export default function Home() {
  const months = ["janurary", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const dietary = ["Halal", "Vegan", "Vegetarian", "No peanuts", "No eggs", "No seafood or shellfish", "No Soy", "No Milk"];

  return (
    <section>
      <div 
        className="h-[600px] bg-cover bg-center relative flex items-center justify-center"
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${heroImage})` }}
      >
        <div className="text-center text-white px-10">
        <h2 className="text-2xl md:text-5xl font-bold uppercase tracking-tighter" 
        style={{ textShadow: '1px 2px 0px #0e4e8e' }}
        >
        Unlock your Journey: <br /> 
        <span className="text-xl md:text-2xl font-bold tracking-normal normal-case">
          Discover, Explore, Experience!
        </span>
        </h2>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto p-10 bg-[#E5E5E5]">
        <div className="mb-8">
          <p className="text-lg font-bold mb-4">What months are you looking to travel in?</p>
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {months.map(m => (
              <label key={m} className="flex items-center gap-1 uppercase text-[12px] font-bold cursor-pointer">
                <input type="checkbox" className="w-4 h-4" /> {m}
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 mb-10">
          <div className="flex items-center gap-2">
            <label className="font-bold">UserName:</label>
            <input type="text" placeholder="enter your account or name" className="border border-gray-500 px-2 py-1 bg-white w-60 text-sm" />
          </div>
          <div className="flex items-center gap-2">
            <label className="font-bold">What is your favorite cuisine?</label>
            <input type="text" placeholder="Favorite cuisine or foods yo" className="border border-gray-500 px-2 py-1 bg-white w-60 text-sm" />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-6">Enter any dietary restrictions you have:</h2>
          <div className="flex flex-col gap-2">
            {dietary.map(item => (
              <label key={item} className="flex items-center gap-3 text-lg cursor-pointer">
                <input type="checkbox" className="w-4 h-4" /> {item}
              </label>
            ))}
            <div className="flex items-center mt-2">
               <input type="checkbox" className="mr-3" />
               <input type="text" placeholder="other" className="border border-gray-400 px-2 py-1 bg-white w-48" />
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold">What activities do you enjoy?</h2>
      </div>
    </section>
  );
}