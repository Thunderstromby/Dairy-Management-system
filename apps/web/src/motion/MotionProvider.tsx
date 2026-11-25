import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type MotionEnvironment = {
  reducedMotion: boolean;
  finePointer: boolean;
  motionEnabled: boolean;
  pointerEffectsEnabled: boolean;
};

export const MotionContext = createContext<MotionEnvironment>({
  reducedMotion: true,
  finePointer: false,
  motionEnabled: false,
  pointerEffectsEnabled: false,
});

type MotionProviderProps = {
  children: ReactNode;
};

type MediaQuery = Pick<
  MediaQueryList,
  'matches' | 'addEventListener' | 'removeEventListener' | 'addListener' | 'removeListener'
>;

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

const POINTER_PROPERTIES = [
  '--sf-pointer-near-x',
  '--sf-pointer-near-y',
  '--sf-pointer-far-x',
  '--sf-pointer-far-y',
  '--sf-pointer-aura-x',
  '--sf-pointer-aura-y',
  '--sf-image-x',
  '--sf-image-y',
  '--sf-scroll-near',
  '--sf-scroll-far',
] as const;

function getMediaQuery(query: string): MediaQuery | undefined {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return undefined;
  }

  return window.matchMedia(query);
}

function useMediaQuery(query: string, fallback: boolean): boolean {
  const [matches, setMatches] = useState(() => getMediaQuery(query)?.matches ?? fallback);

  useEffect(() => {
    const media = getMediaQuery(query);

    if (!media) {
      setMatches(fallback);
      return;
    }

    const update = () => setMatches(media.matches);
    update();

    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, [query, fallback]);

  return matches;
}

function clampUnit(value: number): number {
  return Math.max(-1, Math.min(1, value));
}

export function MotionProvider({ children }: MotionProviderProps) {
  const reducedMotion = useMediaQuery(REDUCED_MOTION_QUERY, true);
  const finePointer = useMediaQuery(FINE_POINTER_QUERY, false);
  const motionEnabled = !reducedMotion;
  const pointerEffectsEnabled = motionEnabled && finePointer;

  const value = useMemo<MotionEnvironment>(
    () => ({
      reducedMotion,
      finePointer,
      motionEnabled,
      pointerEffectsEnabled,
    }),
    [reducedMotion, finePointer, motionEnabled, pointerEffectsEnabled],
  );

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    root.dataset.motion = String(motionEnabled);
    root.dataset.motionReduced = String(reducedMotion);
    root.dataset.pointerEffects = String(pointerEffectsEnabled);
  }, [motionEnabled, reducedMotion, pointerEffectsEnabled]);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof document === 'undefined' ||
      !pointerEffectsEnabled
    ) {
      return;
    }

    const root = document.documentElement;
    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let scrollY = 0;

    const clearProperties = () => {
      POINTER_PROPERTIES.forEach((property) => root.style.removeProperty(property));
    };

    const apply = () => {
      frame = 0;
      root.style.setProperty('--sf-pointer-near-x', `${(pointerX * 6).toFixed(2)}px`);
      root.style.setProperty('--sf-pointer-near-y', `${(pointerY * 6).toFixed(2)}px`);
      root.style.setProperty('--sf-pointer-far-x', `${(pointerX * 3).toFixed(2)}px`);
      root.style.setProperty('--sf-pointer-far-y', `${(pointerY * 3).toFixed(2)}px`);
      root.style.setProperty('--sf-pointer-aura-x', `${(pointerX * 80).toFixed(2)}px`);
      root.style.setProperty('--sf-pointer-aura-y', `${(pointerY * 60).toFixed(2)}px`);
      root.style.setProperty('--sf-image-x', `${(pointerX * 4).toFixed(2)}px`);
      root.style.setProperty('--sf-image-y', `${(pointerY * 4).toFixed(2)}px`);
      root.style.setProperty('--sf-scroll-near', `${scrollY.toFixed(1)}px`);
      root.style.setProperty('--sf-scroll-far', `${(scrollY * 0.5).toFixed(1)}px`);
    };

    const schedule = () => {
      if (frame !== 0) {
        return;
      }

      if (typeof requestAnimationFrame === 'function') {
        frame = requestAnimationFrame(apply);
      } else {
        apply();
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerX = clampUnit(event.clientX / Math.max(window.innerWidth, 1) / 0.5 - 1);
      pointerY = clampUnit(event.clientY / Math.max(window.innerHeight, 1) / 0.5 - 1);
      schedule();
    };

    const onScroll = () => {
      scrollY = Math.min(Math.max(window.scrollY, 0), 16);
      schedule();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);

      if (frame !== 0 && typeof cancelAnimationFrame === 'function') {
        cancelAnimationFrame(frame);
      }

      clearProperties();
    };
  }, [pointerEffectsEnabled]);

  return <MotionContext.Provider value={value}>{children}</MotionContext.Provider>;
}
