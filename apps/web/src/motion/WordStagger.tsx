import { Fragment, type CSSProperties } from 'react';
import { useInView } from './useInView';
import { useMotionEnvironment } from './useMotionEnvironment';

type WordStaggerProps = {
  text: string;
  className?: string;
};

export function WordStagger({ text, className = '' }: WordStaggerProps) {
  const { ref, visible } = useInView<HTMLSpanElement>();
  const { pointerEffectsEnabled } = useMotionEnvironment();
  const words = text.split(/\s+/).filter(Boolean);
  const isVisible = pointerEffectsEnabled ? visible : true;

  return (
    <span
      ref={ref}
      className={`sf-word-stagger ${className}`.trim()}
      data-stagger={String(pointerEffectsEnabled)}
    >
      {words.map((word, index) => (
        <Fragment key={`${word}-${index}`}>
          {index > 0 ? ' ' : null}
          <span
            className="sf-word"
            data-visible={String(isVisible)}
            style={{ '--sf-word-delay': `${index * 45}ms` } as CSSProperties}
          >
            {word}
          </span>
        </Fragment>
      ))}
    </span>
  );
}
