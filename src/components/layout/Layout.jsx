import React from 'react';
import AmbientBackground from './AmbientBackground';

export default function Layout({ children, title, action }) {

  return (
    <div className="relative isolate min-h-screen max-w-6xl mx-auto pb-24">
      <AmbientBackground />
      {/* Header */}
      <header className="fixed max-w-6xl mx-auto top-0 left-0 right-0 z-40 bg-linear-to-bl from-primary/20 via-surface to-accent/10 backdrop-blur-xl px-6 py-4 flex justify-between items-center border-b border-white/5 rounded-b-2xl">
        <h1 className="text-2xl font-extrabold tracking-tight">
          {title}
        </h1>
        <div className="flex items-center gap-3">
          {action}
        </div>
      </header>
      
      {/* Main Content */}
      <main className="relative z-10 px-5 pt-24 max-w-5xl mx-auto animate-in fade-in duration-500">
        {children}
      </main>
    </div>
  );
}
