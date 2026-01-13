import { cn } from '../../utils/cn';

export default function Button({ children, variant = 'primary', className, ...props }) {
  const variants = {
    primary: "bg-primary/90 hover:bg-primary text-white shadow-lg shadow-primary/30",
    secondary: "bg-surface/50 hover:bg-surface/80 border border-white/10 dark:border-white/5",
    danger: "bg-red-500/90 hover:bg-red-600 text-white shadow-lg shadow-red-500/30",
    ghost: "hover:bg-black/5 dark:hover:bg-white/5",
  };

  return (
    <button 
      className={cn(
        "px-4 py-3 rounded-xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
