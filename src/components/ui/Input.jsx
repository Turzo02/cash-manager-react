export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm font-medium opacity-80 pl-1">{label}</label>}
      <input
        className="dark:bg-indigo-300/30 border border-black/5 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-text/30"
        {...props}
      />
    </div>
  );
}
