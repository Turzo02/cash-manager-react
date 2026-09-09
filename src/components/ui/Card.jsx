import { cn } from '../../utils/cn';
import React from 'react';

export default function Card({ children, className, lightweight = false }) {
  return (
    <div className={cn(
      lightweight
        ? "bg-surface/90 border border-white/5 rounded-3xl p-5"
        : "bg-surface/75 backdrop-blur-xl border border-white/5 shadow-xl shadow-black/35 rounded-3xl p-5 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
