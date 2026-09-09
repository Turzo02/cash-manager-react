import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

const ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
};

export default function Toast({ notification, onClose }) {
  if (!notification) return null;

  const Icon = ICONS[notification.type] || ICONS.info;

  return (
    <div className="fixed left-4 right-4 top-20 z-[60] flex justify-center pointer-events-none sm:left-auto sm:right-6 sm:justify-end">
      <div
        role="status"
        className="pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl border border-white/10 bg-surface/95 px-4 py-3 text-sm shadow-xl shadow-black/30 backdrop-blur-md"
      >
        <Icon
          size={18}
          className={notification.type === 'error' ? 'text-red-300' : 'text-emerald-300'}
        />
        <span className="flex-1">{notification.message}</span>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 text-muted hover:bg-white/10 hover:text-white"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
