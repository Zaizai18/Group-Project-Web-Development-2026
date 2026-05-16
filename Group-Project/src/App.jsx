import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer'; // 1. Import the new footer component
import Home from './pages/Home';
import Travel from './pages/Travel';
import Reviews from './pages/Reviews';
import Blog from './pages/Blog';
import Explore from './pages/Explore';
import Wrapup from './pages/Wrapup';
import Contact from './pages/Contact';

export default function App() {
  const [page, setPage] = useState('home');
  const [isNavOpen, setIsNavOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Interactive Global Multi-page Navigation */}
      <Header 
        page={page} 
        setPage={setPage} 
        isNavOpen={isNavOpen} 
        setIsNavOpen={setIsNavOpen} 
      />

      {/* Primary Dynamic Display Port */}
      <main className="flex-grow mt-[75px]">
        {page === 'home' && <Home />}
        {page === 'travel' && <Travel />}
        {page === 'reviews' && <Reviews />}
        {page === 'blog' && <Blog />}
        {page === 'explore' && <Explore />}
        {page === 'wrapup' && <Wrapup />}
        {page === 'contact' && <Contact />}
      </main>

      <Footer />
      
    </div>
  );
}