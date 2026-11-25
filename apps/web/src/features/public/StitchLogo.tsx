import { useState } from 'react';
import { STITCH_ASSETS } from './stitchAssets';

type StitchLogoProps = {
  className?: string;
};

export function StitchLogo({ className = 'h-9 w-9' }: StitchLogoProps) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div
      className={`flex items-center justify-center rounded-md bg-white p-1 shadow-sm transition-transform group-hover:scale-105 ${className}`}
    >
      {imageFailed ? (
        <span className="font-heading text-sm font-extrabold text-deep-forest" aria-hidden="true">
          S
        </span>
      ) : (
        <img
          src={STITCH_ASSETS.logo}
          alt="SmartFarm Logo"
          className="h-full w-full object-contain"
          onError={() => setImageFailed(true)}
        />
      )}
    </div>
  );
}
