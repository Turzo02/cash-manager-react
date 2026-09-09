import { cn } from '../../utils/cn';
import React from 'react';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "bg-surface/75 backdrop-blur-xl border border-white/5 shadow-xl shadow-black/35 rounded-3xl p-5 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
