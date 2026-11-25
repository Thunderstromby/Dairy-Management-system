import { useInView } from './useInView';
import { useMotionEnvironment } from './useMotionEnvironment';

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
};

export function ImageReveal({ src, alt, className = '' }: ImageRevealProps) {
  const { ref, visible } = useInView<HTMLDivElement>();
  const { motionEnabled } = useMotionEnvironment();

  return (
    <div
      ref={ref}
      className={`sf-image-reveal ${className}`.trim()}
      data-visible={String(motionEnabled ? visible : true)}
    >
      <img src={src} alt={alt} loading="lazy" decoding="async" />
    </div>
  );
}
