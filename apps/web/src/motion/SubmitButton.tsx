export type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

type SubmitButtonProps = {
  state?: SubmitState;
  idleLabel?: string;
};

const STATE_LABELS: Record<Exclude<SubmitState, 'idle'>, string> = {
  submitting: 'Sending…',
  success: 'Inquiry sent',
  error: 'Try again',
};

export function SubmitButton({ state = 'idle', idleLabel = 'Submit inquiry' }: SubmitButtonProps) {
  const label = state === 'idle' ? idleLabel : STATE_LABELS[state];

  return (
    <button
      className="sf-submit"
      type="submit"
      data-state={state}
      disabled={state === 'submitting'}
    >
      <span aria-live="polite">{label}</span>
    </button>
  );
}
