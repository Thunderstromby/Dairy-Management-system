import { useRef, type PointerEvent, type ReactNode } from 'react';
import { useMotionEnvironment } from './useMotionEnvironment';

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
};

export function MagneticButton({
  children,
  className = '',
  type = 'button',
  onClick,
}: MagneticButtonProps) {
  const innerRef = useRef<HTMLSpanElement>(null);
  const { pointerEffectsEnabled } = useMotionEnvironment();

  const reset = () => {
    const inner = innerRef.current;

    if (!inner) {
      return;
    }

    inner.style.setProperty('--sf-mag-x', '0px');
    inner.style.setProperty('--sf-mag-y', '0px');
  };

  const onPointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    const inner = innerRef.current;

    if (!pointerEffectsEnabled || !inner) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const offsetX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 8;
    const offsetY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 8;

    inner.style.setProperty('--sf-mag-x', `${offsetX.toFixed(2)}px`);
    inner.style.setProperty('--sf-mag-y', `${offsetY.toFixed(2)}px`);
  };

  return (
    <button
      type={type}
      className={className}
      onClick={onClick}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      onBlur={reset}
    >
      <span ref={innerRef} className="sf-magnetic" data-magnetic={String(pointerEffectsEnabled)}>
        {children}
      </span>
    </button>
  );
}
