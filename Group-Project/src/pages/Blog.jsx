import React, { useState } from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "A Culinary Journey Through Tokyo",
    category: "Food Culture",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80",
    excerpt: "Discover the history behind authentic Tokyo street food, from the secrets of a perfect ramen broth to the etiquette of traditional sushi bars.",
    tag: "Japanese",
    season: "Winter",
    dietary: ["Halal", "Vegetarian"],
    fullContent: `Tokyo's street food scene is one of the most diverse and refined in the world. From the bustling stalls of Tsukiji Outer Market to the quiet ramen shops tucked into Shinjuku alleyways, every corner of the city holds a culinary story.\n\nRamen broth is the soul of Japanese comfort food. Master chefs simmer pork bones for up to 18 hours to achieve the rich, cloudy tonkotsu base that defines Hakata-style ramen. In Tokyo, you'll find shoyu (soy sauce) and shio (salt) broths that are lighter but equally complex.\n\nSushi etiquette is an art form in itself. At traditional omakase restaurants, you eat each piece immediately after it's placed in front of you — never leaving it to sit. Wasabi is placed directly on the fish by the chef, so adding more from the side dish is considered impolite.\n\nFor halal and vegetarian travelers, Tokyo has grown remarkably accommodating. Look for "yasai" (vegetable) ramen shops and seek out tofu-centric kaiseki experiences in the Yanaka district.`
  },
  {
    id: 2,
    title: "Mastering the Art of Roman Pasta",
    category: "Cuisine History",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80",
    excerpt: "Carbonara, Cacio e Pepe, and Amatriciana. We dive deep into the specific techniques that Roman chefs use to achieve immaculate creaminess.",
    tag: "Italian",
    season: "Spring",
    dietary: ["Vegetarian"],
    fullContent: `Rome's pasta tradition is deceptively simple — and that simplicity is everything. The four pillars of Roman pasta are Cacio e Pepe, Carbonara, Amatriciana, and Gricia, and each one teaches you something profound about Italian cooking philosophy.\n\nCarbonara is perhaps the most misunderstood pasta globally. The authentic version contains zero cream. The magic comes from the emulsification of egg yolks, Pecorino Romano, and a splash of starchy pasta water — whisked together off the heat so they coat every strand of rigatoni or spaghetti without scrambling.\n\nCacio e Pepe is the purist's pasta. Two ingredients beyond the pasta itself: aged Pecorino and coarsely cracked black pepper. The technique of adding pasta water gradually while tossing creates a silky sauce that clings without clumping.\n\nFor vegetarian visitors, Rome is surprisingly friendly — Cacio e Pepe and many antipasto platters are naturally meat-free. Ask your server "senza carne" and most trattorias will guide you to their best plant-based options.`
  },
  {
    id: 3,
    title: "Hidden Cliff Temples of Bali",
    category: "Adventure Guide",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80",
    excerpt: "Get off the beaten path. A complete breakdown of coastal trails, cultural rules, and sunset views at Bali's ancient hillside structures.",
    tag: "Activities",
    season: "Summer",
    dietary: ["Vegan", "Vegetarian"],
    fullContent: `Bali's temples are not tourist attractions — they are living, breathing spiritual centers that have anchored Balinese Hindu culture for centuries. The most iconic, Pura Luhur Uluwatu, perches 70 meters above the Indian Ocean on sheer limestone cliffs at the southwestern tip of the island.\n\nThe coastal trail from Uluwatu down to Padang Padang Beach is one of the most dramatic walking routes in Southeast Asia. Carved stone steps wind past wild monkeys (hold your belongings tight) and through dense tropical forest before opening to panoramic ocean views.\n\nCultural rules are non-negotiable: you must wear a sarong and sash to enter any temple grounds — these are available for rent at every entrance. Women who are menstruating are asked not to enter, as this is considered a sacred boundary in Balinese Hindu belief.\n\nThe famous Kecak fire dance is performed at Uluwatu every evening at sunset. Arrive 45 minutes early for a front-row seat as the sun drops into the ocean behind the performers.\n\nFor food after your temple visit, the warung stalls at Jimbaran Bay serve fresh seafood barbecued on open grills right on the beach. Vegan and vegetarian options like nasi campur (mixed rice plates) and gado-gado (peanut sauce salad) are available everywhere.`
  },
  {
    id: 4,
    title: "Morocco in Winter: Souks, Spice & Silence",
    category: "Seasonal Travel",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80",
    excerpt: "Winter is the best-kept secret of Moroccan travel. Fewer crowds, cooler temperatures, and the most atmospheric souks you'll ever walk through.",
    tag: "Moroccan",
    season: "Winter",
    dietary: ["Halal", "Vegan"],
    fullContent: `December through February is arguably the finest time to visit Morocco. The summer heat that turns Marrakech into an oven has long passed, and the medinas feel intimate rather than overwhelming.\n\nThe Jemaa el-Fnaa square in Marrakech at winter dusk is something otherworldly — smoke rising from a hundred food stalls, storytellers gesturing to circles of listeners, the call to prayer echoing off 12th-century minarets. This is not a performance put on for tourists. This is daily life.\n\nMoroccan cuisine is almost entirely halal by default, making it one of the most accessible destinations for Muslim travelers. Tagine — slow-cooked lamb or chicken with preserved lemons and olives, topped with almonds and served in its namesake clay pot — is the dish that will define your trip. For vegans, zaalouk (smoked eggplant and tomato salad) and harira (lentil soup) are outstanding.\n\nThe souks of Fes are the most intact medieval market system in the world. Get genuinely lost in them. The leather tanneries, the brass workers, the spice merchants measuring out cumin and ras el hanout with brass scoops — it is sensory overload in the best possible way.\n\nStay in a riad — a traditional courtyard home converted into a boutique hotel — for the complete experience. Many are hidden behind unmarked wooden doors in narrow alleyways, revealing their tiled splendor only once you step inside.`
  },
  {
    id: 5,
    title: "Spring Hiking in Patagonia",
    category: "Adventure Guide",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=600&q=80",
    excerpt: "The W Trek, the towers at sunrise, and the most dramatic landscapes on Earth. Everything you need to know before you lace up your boots.",
    tag: "Activities",
    season: "Spring",
    dietary: ["Vegan", "Vegetarian"],
    fullContent: `Patagonia sits at the end of the world, and it feels like it. The Torres del Paine National Park in Chilean Patagonia is a UNESCO Biosphere Reserve encompassing glaciers, turquoise lakes, and the iconic granite towers that pierce the sky above everything else.\n\nOctober and November — Patagonian spring — is the sweet spot for hiking. Crowds have not yet peaked, wildflowers are blooming across the pampas, and the notoriously unpredictable Patagonian weather behaves slightly better than it does in summer.\n\nThe W Trek is a 5-day, 80km route that connects the park's three major landmarks: the Torres (towers), the Valle del Francés, and the Grey Glacier. It's physically demanding but does not require technical climbing — good fitness and solid waterproof gear are all you need.\n\nFor the sunrise view of the Torres, you must start hiking from Refugio Las Torres at 4am. The 2.5-hour approach in the dark is brutal, but the moment the first light hits the pink granite towers and turns the glacial lake below them copper-gold is worth every step.\n\nFood on the trail is hearty and filling. Most refugios along the route serve all-you-can-eat dinners of pasta, lentil soup, and grilled meats. Vegetarians and vegans should notify the refugio in advance — most can accommodate with advance notice.`
  },
  {
    id: 6,
    title: "India's Summer Monsoon Table",
    category: "Food Culture",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=600&q=80",
    excerpt: "When the rains come to Kerala, the food transforms. Discover the seasonal dishes that only appear during monsoon season — and why they're extraordinary.",
    tag: "Indian",
    season: "Summer",
    dietary: ["Vegan", "Vegetarian", "Halal"],
    fullContent: `Kerala's monsoon season, from June through August, is when the state comes alive in ways the dry season never reveals. The Western Ghats turn an impossible shade of green, the backwaters swell, and home kitchens begin preparing dishes that are specifically tied to this season.\n\nKarimeen pollichathu — pearl spot fish marinated in a paste of shallots, ginger, green chili, and coconut oil, then wrapped in banana leaf and grilled — only tastes this good when the fish are at their freshest, just before monsoon disrupts fishing seasons. The banana leaf does something magical to the marinade during cooking.\n\nSadya is Kerala's great vegetarian feast, served on banana leaves with 20 to 30 separate dishes arranged in precise order. It is traditionally eaten during Onam harvest festival in August, and the sequence in which you eat each component is considered as important as the food itself. Start from the top left: pickle, banana chips, pappadom. Work your way through avial, olan, erissery, and a dozen others before the server ladles the payasam (rice pudding dessert) over banana leaf.\n\nFor halal travelers, Malabar cuisine from northern Kerala is one of India's great hidden gems. Malabar biryani, made with long-grain kaima rice, is considered by many food historians to be among the oldest and most refined biryani traditions in the country.`
  },
  {
    id: 7,
    title: "Autumn Foliage and Hotpot in Sichuan",
    category: "Seasonal Travel",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80",
    excerpt: "October in Chengdu means misty mountains, ginkgo-lined boulevards, and the greatest hotpot experience on the planet. Here's how to do it right.",
    tag: "Chinese",
    season: "Autumn",
    dietary: ["Vegan", "Vegetarian"],
    fullContent: `Chengdu in autumn is golden. The city's famous ginkgo trees turn the boulevards into rivers of yellow light, the humidity of summer has broken, and the evenings are cool enough to make Sichuan hotpot feel like the perfect meal — which it always is, at any temperature.\n\nSichuan hotpot is not like any other hotpot tradition. The broth is a deep red, shimmering with Sichuan peppercorns and dried chilies, and it produces a sensation called "mala" — simultaneously numbing and spicy in a way that is genuinely addictive. You order raw ingredients — thinly sliced beef, lotus root, tofu, tripe, mung bean noodles — and cook them tableside in the boiling broth.\n\nThe dipping sauce station is where personal preference takes over. Most locals mix sesame paste, sesame oil, fermented bean curd, chili oil, spring onions, and coriander into a bowl that they customize to their exact specifications.\n\nVegetarians and vegans will find Sichuan hotpot surprisingly accessible — the vegetarian broth option (available at most restaurants) is just as complex and flavorful, and the vegetable and tofu selection is enormous. Mapo tofu, another Sichuan signature dish, can be made without meat and is one of the most satisfying vegan dishes in the world.\n\nFor the autumn foliage, take the two-hour high-speed train from Chengdu to Jiuzhaigou — a UNESCO World Heritage valley of multi-colored glacial lakes surrounded by forested mountain peaks that peak in color in mid-October.`
  },
  {
    id: 8,
    title: "New Zealand: Where to Eat Between Adventures",
    category: "Food Culture",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&w=600&q=80",
    excerpt: "Between bungee jumps and glacier hikes, New Zealand's food scene has quietly become one of the Southern Hemisphere's finest. Here's where to eat.",
    tag: "Oceanian",
    season: "Autumn",
    dietary: ["Vegetarian"],
    fullContent: `New Zealand's food story is one of the most underrated in the world. Built on exceptional raw ingredients — world-class lamb, wild venison, Pacific seafood, and some of the cleanest dairy on earth — its restaurant scene has evolved rapidly over the past decade.\n\nQualetown on the South Island is the adventure capital of the world, but it's also home to some surprisingly serious dining. Rata, the flagship restaurant of celebrated chef Josh Emett, serves New Zealand produce prepared with classical French technique in a converted heritage building downtown.\n\nWellington, the capital, punches far above its weight for a city of 215,000 people. The Te Aro neighborhood is a grid of coffee roasters, natural wine bars, and chef-driven small plates restaurants. Ortega Fish Shack has been serving local seafood chowder and whole roasted fish for nearly two decades without compromising.\n\nThe Marlborough wine region at the top of the South Island produces the world's defining expression of Sauvignon Blanc. Plan a morning of cellar door visits in the Wairau Valley — most vineyards are open without appointment, and the combination of wine, local cheese, and the mountain backdrop is genuinely extraordinary.\n\nFor vegetarians, New Zealand's cafe culture is excellent. Avocado toast may have become a cliché globally, but New Zealand's version — made with Hass avocados from Northland orchards and served on genuine sourdough — is the original, and it remains exceptional.`
  },
  {
    id: 9,
    title: "The Halal Food Trail Through Istanbul",
    category: "Food Culture",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=600&q=80",
    excerpt: "Istanbul is one of the world's great food cities — and it's almost entirely halal-friendly. A neighborhood-by-neighborhood guide to eating your way across the Bosphorus.",
    tag: "Turkish",
    season: "Spring",
    dietary: ["Halal"],
    fullContent: `Istanbul sits at the intersection of two continents, and its food reflects that position perfectly. Turkish cuisine draws from Central Asian, Middle Eastern, Balkan, and Mediterranean traditions simultaneously, and in Istanbul you can taste all of them within a single afternoon.\n\nKaraköy, on the European side near the Galata Bridge, is the city's most vibrant food neighborhood. Balık ekmek — fresh mackerel grilled on boats moored along the Bosphorus and served in crusty bread with pickled cabbage and lemon — is the iconic street snack of the area, and it costs almost nothing.\n\nThe Grand Bazaar is not primarily a food destination, but the Egyptian Spice Bazaar (Mısır Çarşısı) next to it absolutely is. Stalls overflow with dried fruits, nuts, lokum (Turkish delight), baklava, and spice blends. Buy a mix of pul biber (Aleppo pepper flakes) and sumac to recreate Turkish flavors at home.\n\nFor a full sit-down meal, Çiya Sofrası in the Kadıköy market on the Asian side is considered one of the most important restaurants in Turkey. Owner-chef Musa Dağdeviren has spent decades researching and reviving forgotten Anatolian recipes, and the daily changing menu is a culinary history lesson.\n\nAlmost every restaurant in Istanbul is halal by default. Alcohol-free establishments are clearly marked. The city is one of the most seamlessly accessible destinations in the world for Muslim travelers.`
  }
];

const ALL_SEASONS = ["All", "Spring", "Summer", "Autumn", "Winter"];
const ALL_DIETARY = ["All", "Halal", "Vegetarian", "Vegan"];

export default function Blog() {
  const [selectedSeason, setSelectedSeason] = useState("All");
  const [selectedDietary, setSelectedDietary] = useState("All");
  const [openPost, setOpenPost] = useState(null);

  const filtered = BLOG_POSTS.filter(post => {
    const seasonMatch = selectedSeason === "All" || post.season === selectedSeason;
    const dietaryMatch = selectedDietary === "All" || post.dietary.includes(selectedDietary);
    return seasonMatch && dietaryMatch;
  });

  if (openPost) {
    return (
      <div className="min-h-screen bg-slate-50 p-4 font-sans text-slate-700">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => setOpenPost(null)}
            className="mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-[#0A2540] flex items-center gap-1 transition-colors"
          >
            ← Back to Blog
          </button>
          <img src={openPost.image} alt={openPost.title} className="w-full h-52 object-cover rounded-xl mb-4 border border-slate-200" />
          <div className="flex gap-2 mb-2 flex-wrap">
            <span className="text-[8px] font-bold uppercase bg-[#0A2540] text-white px-1.5 py-0.5 rounded tracking-widest">{openPost.category}</span>
            <span className="text-[8px] font-bold uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded tracking-widest">{openPost.season}</span>
            {openPost.dietary.map(d => (
              <span key={d} className="text-[8px] font-bold uppercase bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded tracking-widest">{d}</span>
            ))}
          </div>
          <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide mb-1">{openPost.title}</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-4">{openPost.readTime}</p>
          <div className="text-sm text-slate-600 leading-relaxed space-y-4">
            {openPost.fullContent.split('\n\n').map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-left font-sans text-xs text-slate-700">
      <div className="max-w-5xl mx-auto">

        {/* Page Header */}
        <div className="mb-5 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide">The Global Blog</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Explore global dishes, cultural insights, and travel guides</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-5">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Season</p>
            <div className="flex gap-1 flex-wrap">
              {ALL_SEASONS.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSeason(s)}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-all cursor-pointer ${
                    selectedSeason === s
                      ? "bg-[#0A2540] text-white border-[#0A2540]"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400 mb-1">Dietary</p>
            <div className="flex gap-1 flex-wrap">
              {ALL_DIETARY.map(d => (
                <button
                  key={d}
                  onClick={() => setSelectedDietary(d)}
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded border transition-all cursor-pointer ${
                    selectedDietary === d
                      ? "bg-emerald-600 text-white border-emerald-600"
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-3">{filtered.length} article{filtered.length !== 1 ? 's' : ''} found</p>

        {/* Blog Posts Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <p className="text-2xl mb-2">🌍</p>
            <p className="text-[11px] uppercase tracking-wider font-bold">No articles match your filters</p>
            <p className="text-[10px] mt-1">Try adjusting your season or dietary selection</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filtered.map((post) => (
              <div key={post.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col group hover:border-slate-300 hover:shadow-md transition-all">

                {/* Image Block */}
                <div className="relative">
                  <span className="absolute top-2 left-2 text-[8px] font-bold uppercase bg-[#0A2540] text-white px-1.5 py-0.5 rounded tracking-widest shadow-sm z-10">
                    {post.category}
                  </span>
                  <img src={post.image} alt={post.title} className="h-32 w-full object-cover grayscale-[15%] group-hover:grayscale-0 transition-all" />
                </div>

                {/* Content Block */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-[9px] text-slate-400 font-medium uppercase tracking-wider mb-1">
                      <span>Tag: {post.tag}</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Dietary badges */}
                    <div className="flex gap-1 flex-wrap mb-2">
                      <span className="text-[8px] font-bold uppercase bg-amber-50 text-amber-700 px-1.5 py-0.5 rounded tracking-widest">{post.season}</span>
                      {post.dietary.map(d => (
                        <span key={d} className="text-[8px] font-bold uppercase bg-emerald-50 text-emerald-700 px-1.5 py-0.5 rounded tracking-widest">{d}</span>
                      ))}
                    </div>

                    <h3 className="text-sm font-black text-[#0A2540] uppercase tracking-wide line-clamp-2 group-hover:text-blue-900 transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-slate-500 leading-relaxed text-[11px] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => setOpenPost(post)}
                      className="text-[#0A2540] font-bold uppercase text-[9px] tracking-wider group-hover:translate-x-1 transition-transform inline-block cursor-pointer hover:text-blue-800"
                    >
                      Read Article →
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}