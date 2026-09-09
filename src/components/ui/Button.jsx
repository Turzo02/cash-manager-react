import { cn } from '../../utils/cn';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: "bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:scale-[1.02]",
    secondary: "bg-surface-raised/70 hover:bg-surface-raised border border-white/5 text-muted hover:text-white",
    danger: "bg-red-500/90 hover:bg-red-500 text-white shadow-lg shadow-red-500/30 hover:scale-[1.02]",
    ghost: "hover:bg-surface-raised hover:text-white",
  };

  return (
    <button 
      className={cn(
        "px-4 py-3 rounded-2xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
