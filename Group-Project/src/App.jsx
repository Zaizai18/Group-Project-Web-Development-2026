import { useState } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Travel from './pages/Travel';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import Explore from './pages/Explore';
import Wrapup from './pages/Wrapup';

export default function App() {
  const [page, setPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header 
        page={page} 
        setPage={setPage} 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen} 
      />

      <main className="flex-grow mt-[75px]">
        {page === 'home' && <Home />}
        {page === 'travel' && <Travel />}
        {page === 'reviews' && <Reviews />}
        {page === 'blog' && <Blog />}
        {page === 'explore' && <Explore />}
        {page === 'wrapup' && <Wrapup />}
      </main>
    </div>
  );
}