export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-muted pl-1">{label}</label>}
      <input
        className="bg-surface-raised/65 border border-white/5 rounded-2xl px-4 py-3 text-text focus:outline-none focus:border-primary/60 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted/50"
        {...props}
      />
    </div>
  );
}
