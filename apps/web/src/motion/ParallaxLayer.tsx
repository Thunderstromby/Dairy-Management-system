import type { CSSProperties, ReactNode } from 'react';
import { useMotionEnvironment } from './useMotionEnvironment';

type ParallaxDepth = 'near' | 'far';

type ParallaxLayerProps = {
  children?: ReactNode;
  depth?: ParallaxDepth;
  className?: string;
};

export function ParallaxLayer({ children, depth = 'far', className = '' }: ParallaxLayerProps) {
  const { pointerEffectsEnabled } = useMotionEnvironment();

  return (
    <div
      aria-hidden="true"
      className={`sf-parallax ${className}`.trim()}
      data-parallax={String(pointerEffectsEnabled)}
      style={
        {
          '--sf-pointer-shift-x': `var(--sf-pointer-${depth}-x, 0px)`,
          '--sf-pointer-shift-y': `var(--sf-pointer-${depth}-y, 0px)`,
          '--sf-scroll-shift': `var(--sf-scroll-${depth}, 0px)`,
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
