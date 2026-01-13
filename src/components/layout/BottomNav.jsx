import { Home, Book, PlusCircle } from 'lucide-react';
import { cn } from '../../utils/cn';
import React from 'react';

export default function BottomNav({ activeTab, onTabChange, onAdd }) {

  const NavItem = ({ id, icon: Icon, label }) => (
    <button
      onClick={() => onTabChange(id)}
      className={cn(
        "flex flex-col items-center gap-1 p-2 transition-colors",
        activeTab === id ? "text-primary" : "text-text/40 hover:text-text/70"
      )}
    >
      <Icon size={24} />
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
  
  return (
    <div className="fixed max-w-6xl mx-auto bottom-0 left-0 right-0 bg-surface/80  backdrop-blur-xl border-t border-white/10 pb-safe pt-2 px-6 flex justify-between items-center z-40 h-20">
      <NavItem id="dashboard" icon={Home} label="Home" />
      
      {/* Floating Add Button in Center */}
      <button 
        onClick={onAdd}
        className="mb-8 bg-primary text-white p-4 rounded-full shadow-lg shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
      >
        <PlusCircle size={28} />
      </button>

      <NavItem id="books" icon={Book} label="Books" />
    </div>
  );
}
