import { Sun, Moon } from 'lucide-react';
import React, { } from 'react';
import { useTheme } from '../../context/useTheme';



export default function Layout({ children, title, action }) {
    const [theme, toggleTheme] = useTheme();

  return (
    <div className="min-h-screen max-w-6xl mx-auto pb-24">
      {/* Header */}
      <header className="fixed max-w-6xl mx-auto top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md px-6 py-4 flex justify-between items-center border-b border-white/5">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-linear-to-r from-primary to-purple-500">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          {action}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full bg-surface/50 hover:bg-surface border border-white/10 transition-all"
          >
            {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="px-5 pt-24 max-w-5xl mx-auto animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
