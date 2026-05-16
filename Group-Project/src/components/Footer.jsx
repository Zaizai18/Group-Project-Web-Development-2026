export default function Footer() {
  return (
    <footer className="bg-[#0A2540] text-slate-400 text-[11px] font-sans border-t-2 border-red-600 py-6 px-4 shadow-brand-red">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        
        <div className="text-center sm:text-left">
          <span className="text-white font-bold uppercase tracking-wider text-xs block">
            THE GLOBAL FACTOR
          </span>
        </div>
        <div className="flex items-center justify-center text-[10px] uppercase tracking-widest font-medium">
          <span className="text-slate-500 mr-1.5 px-2 py-0.5 rounded font-bold text-center">
            BY: Zainab Shahzadi, Ryan Lui, Ishra Basrey, Farmiha Aktar
          </span>
        </div>
        <div className="text-center sm:text-right text-[10px] text-slate-500 uppercase tracking-wider font-medium">
          &copy; {new Date().getFullYear()} All Rights Reserved.
        </div>

      </div>
    </footer>
  );
}