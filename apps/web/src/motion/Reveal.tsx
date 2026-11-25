import type { CSSProperties, ReactNode } from 'react';
import { useInView } from './useInView';
import { useMotionEnvironment } from './useMotionEnvironment';

type RevealProps = {
  children: ReactNode;
  delayMs?: number;
  className?: string;
};

export function Reveal({ children, delayMs = 0, className = '' }: RevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const { motionEnabled } = useMotionEnvironment();

  return (
    <div
      ref={ref}
      className={`sf-reveal ${className}`.trim()}
      data-visible={String(motionEnabled ? visible : true)}
      style={{ '--sf-delay': `${delayMs}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}
