import { STITCH_ASSETS } from './stitchAssets';

type StitchLogoProps = {
  className?: string;
};

export function StitchLogo({ className = 'h-9 w-9' }: StitchLogoProps) {
  return (
    <img
      src={STITCH_ASSETS.logo}
      alt="SmartFarm Logo"
      className={`object-contain transition-transform group-hover:scale-105 motion-reduce:transform-none ${className}`}
    />
  );
}
