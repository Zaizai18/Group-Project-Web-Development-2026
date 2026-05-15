export default function Header({ page, setPage, isNavOpen, setIsNavOpen }) {
  const navItems = ['home', 'travel', 'reviews', 'blog', 'explore', 'wrapup', 'contact'];

  return (
    <header className="bg-[#0A2540] text-white fixed top-0 left-0 w-full z-[1000] h-[75px] flex items-center border-b border-[#1a3a5a]">
      <div className="w-full h-full flex items-center px-8 relative">
        
        <div 
          className="flex flex-col cursor-pointer leading-[0.9] select-none text-center" 
          onClick={() => setPage('home')}
        >
          <h1 
            className="text-xl md:text-2xl font-bold tracking-widest uppercase"
            style={{ textShadow: '0px 2px 0px rgb(163, 37, 37)' }}
          >
            THE GLOBAL<br />FACTOR
          </h1>
        </div>

        <div className="flex items-center ml-auto">
          <nav className="hidden lg:flex">
            {navItems.map((p) => (
              <a 
                key={p} 
                onClick={() => setPage(p)}
                className={`px-8 py-2 font-bold uppercase text-[13px] tracking-widest cursor-pointer transition-opacity duration-200 hover:opacity-60 
                ${page === p ? 'opacity-100' : 'opacity-100'}
                `}
              >
                {p}
              </a>
            ))}
          </nav>

          <button className="lg:hidden text-3xl ml-4" onClick={() => setIsNavOpen(!isNavOpen)}>
            {isNavOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav 
          className={`${isNavOpen ? 'max-h-[500px]' : 'max-h-0'} 
          lg:hidden absolute top-[75px] left-0 w-full bg-[#0A2540] flex flex-col overflow-hidden transition-all duration-300 border-t border-[#1a3a5a] shadow-xl`}
        >
          {navItems.map((p) => (
            <a 
              key={p} 
              onClick={() => { setPage(p); setIsNavOpen(false); }} 
              className={`p-4 text-center font-bold uppercase border-b border-[#1a3a5a] cursor-pointer ${
                page === p ? 'bg-[#1a3a5a]' : ''
              }`}
            >
              {p}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}