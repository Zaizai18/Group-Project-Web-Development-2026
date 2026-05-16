import React from 'react';

const BLOG_POSTS = [
  {
    id: 1,
    title: "A Culinary Journey Through Tokyo",
    category: "Food Culture",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&w=400&q=80",
    excerpt: "Discover the history behind authentic Tokyo street food, from the secrets of a perfect ramen broth to the etiquette of traditional sushi bars.",
    tag: "Japanese"
  },
  {
    id: 2,
    title: "Mastering the Art of Roman Pasta",
    category: "Cuisine History",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=400&q=80",
    excerpt: "Carbonara, Cacio e Pepe, and Amatriciana. We dive deep into the specific techniques that Roman chefs use to achieve immaculate creaminess.",
    tag: "Italian"
  },
  {
    id: 3,
    title: "Hidden Cliff Temples of Bali",
    category: "Adventure Guide",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&q=80",
    excerpt: "Get off the beaten path. A complete breakdown of coastal trails, cultural rules, and sunset views at Bali's ancient hillside structures.",
    tag: "Activities"
  }
];

export default function Blog() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 text-left font-sans text-xs text-slate-700">
      <div className="max-w-4xl mx-auto">
        
        {/* Page Header */}
        <div className="mb-5 border-b border-slate-200 pb-3">
          <h2 className="text-xl font-black text-[#0A2540] uppercase tracking-wide">The Global Blog</h2>
          <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Explore global dishes, cultural insights, and travel guides</p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col group hover:border-slate-300 transition-all">
              
              {/* Image Block */}
              <div className="relative">
                <span className="absolute top-2 left-2 text-[8px] font-bold uppercase bg-[#0A2540] text-white px-1.5 py-0.5 rounded tracking-widest shadow-sm">
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
                  <h3 className="text-sm font-black text-[#0A2540] uppercase tracking-wide line-clamp-2 group-hover:text-blue-900 transition-colors">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-slate-500 leading-relaxed text-[11px]">
                    {post.excerpt}
                  </p>
                </div>

                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-end">
                  <span className="text-[#0A2540] font-bold uppercase text-[9px] tracking-wider group-hover:translate-x-1 transition-transform inline-block">
                    Read Article →
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}