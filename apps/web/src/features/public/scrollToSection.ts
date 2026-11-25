import type { MouseEvent } from 'react';

type SectionLinkEvent = MouseEvent<HTMLAnchorElement>;

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return true;
  }

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function scrollToSection(event: SectionLinkEvent, id: string): void {
  event.preventDefault();

  const target = document.getElementById(id);

  if (!target) {
    return;
  }

  target.scrollIntoView({
    behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    block: 'start',
  });
}
