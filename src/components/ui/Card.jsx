import { cn } from '../../utils/cn';
import React from 'react';

export default function Card({ children, className }) {
  return (
    <div className={cn(
      "bg-surface/70 dark:bg-surface/40 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg rounded-2xl p-5 transition-all duration-300",
      className
    )}>
      {children}
    </div>
  );
}
