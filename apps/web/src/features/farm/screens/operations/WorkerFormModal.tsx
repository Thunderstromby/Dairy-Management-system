import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { AddWorkerScreen } from './add-worker';

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function WorkerFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((element) => element.offsetParent !== null);
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-[#191d18]/60 p-2 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Worker registration"
        className="my-2 w-full max-w-5xl overflow-hidden rounded-xl bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-[#c4c8bd] px-4 py-2.5">
          <p className="font-inter text-xs font-semibold uppercase tracking-wider text-[#556249]">
            Farm Admin · local preview · no record is saved
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close worker registration"
            className="rounded p-1.5 text-[#444840] transition-colors hover:bg-[#f0eee8]"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="max-h-[82vh] overflow-y-auto">
          <AddWorkerScreen compact onCancel={onClose} />
        </div>
      </div>
    </div>
  );
}
