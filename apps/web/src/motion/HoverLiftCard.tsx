import type { ReactNode } from 'react';
import { useMotionEnvironment } from './useMotionEnvironment';

type HoverLiftCardProps = {
  children: ReactNode;
  className?: string;
};

export function HoverLiftCard({ children, className = '' }: HoverLiftCardProps) {
  const { pointerEffectsEnabled } = useMotionEnvironment();

  return (
    <div
      className={`sf-hover-lift ${className}`.trim()}
      data-animate={String(pointerEffectsEnabled)}
    >
      {children}
    </div>
  );
}
