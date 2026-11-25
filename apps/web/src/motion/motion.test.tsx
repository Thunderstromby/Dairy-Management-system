import { act, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { FieldError } from './FieldError';
import { InlineStatus } from './InlineStatus';
import { MagneticButton } from './MagneticButton';
import { MotionProvider } from './MotionProvider';
import { Reveal } from './Reveal';
import { SubmitButton } from './SubmitButton';
import { WordStagger } from './WordStagger';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';

const observers: IntersectionObserverStub[] = [];

class IntersectionObserverStub {
  private readonly callback: IntersectionObserverCallback;
  private readonly targets: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    observers.push(this);
  }

  observe(target: Element) {
    this.targets.push(target);
  }

  unobserve(target: Element) {
    const index = this.targets.indexOf(target);

    if (index >= 0) {
      this.targets.splice(index, 1);
    }
  }

  disconnect() {
    this.targets.length = 0;
  }

  trigger() {
    const entries = this.targets.map(
      (target) => ({ target, isIntersecting: true }) as IntersectionObserverEntry,
    );
    this.callback(entries, this as unknown as IntersectionObserver);
  }
}

function setMediaState(state: Record<string, boolean>) {
  vi.stubGlobal('matchMedia', (query: string) => ({
    matches: state[query] ?? false,
    media: query,
    onchange: null,
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    addListener: () => undefined,
    removeListener: () => undefined,
    dispatchEvent: () => false,
  }));
}

function visibleFlags(selector: string): boolean[] {
  return Array.from(document.querySelectorAll<HTMLElement>(selector)).map(
    (element) => element.dataset.visible === 'true',
  );
}

describe('motion primitives', () => {
  beforeEach(() => {
    observers.length = 0;
    setMediaState({});
    vi.stubGlobal('IntersectionObserver', IntersectionObserverStub);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    document.documentElement.removeAttribute('data-motion');
    document.documentElement.removeAttribute('data-motion-reduced');
    document.documentElement.removeAttribute('data-pointer-effects');
  });

  it('shows final states immediately when reduced motion is preferred', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: true, [FINE_POINTER_QUERY]: true });

    render(
      <MotionProvider>
        <WordStagger text="Dairy with care" />
        <Reveal>About SmartFarm</Reveal>
      </MotionProvider>,
    );

    expect(document.documentElement.dataset.motion).toBe('false');
    expect(document.documentElement.dataset.pointerEffects).toBe('false');
    expect(visibleFlags('.sf-word')).toEqual([true, true, true]);
    expect(screen.getByText('About SmartFarm').dataset.visible).toBe('true');
  });

  it('staggers text and waits for intersection on fine pointers', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: true });

    render(
      <MotionProvider>
        <WordStagger text="Dairy with care" />
        <Reveal>About SmartFarm</Reveal>
      </MotionProvider>,
    );

    expect(document.documentElement.dataset.motion).toBe('true');
    expect(document.documentElement.dataset.pointerEffects).toBe('true');
    expect(visibleFlags('.sf-word')).toEqual([false, false, false]);
    expect(screen.getByText('About SmartFarm').dataset.visible).toBe('false');

    act(() => {
      observers.forEach((observer) => observer.trigger());
    });

    expect(visibleFlags('.sf-word')).toEqual([true, true, true]);
    expect(screen.getByText('About SmartFarm').dataset.visible).toBe('true');
  });

  it('shows words together but keeps scroll reveal on coarse pointers', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: false });

    render(
      <MotionProvider>
        <WordStagger text="Dairy with care" />
        <Reveal>About SmartFarm</Reveal>
      </MotionProvider>,
    );

    expect(document.documentElement.dataset.pointerEffects).toBe('false');
    expect(visibleFlags('.sf-word')).toEqual([true, true, true]);
    expect(screen.getByText('About SmartFarm').dataset.visible).toBe('false');

    act(() => {
      observers.forEach((observer) => observer.trigger());
    });

    expect(screen.getByText('About SmartFarm').dataset.visible).toBe('true');
  });

  it('enables magnetic movement only for fine pointers', () => {
    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: true });
    const { unmount } = render(
      <MotionProvider>
        <MagneticButton>Contact us</MagneticButton>
      </MotionProvider>,
    );

    expect(document.querySelector<HTMLElement>('.sf-magnetic')?.dataset.magnetic).toBe('true');
    unmount();

    setMediaState({ [REDUCED_MOTION_QUERY]: false, [FINE_POINTER_QUERY]: false });
    render(
      <MotionProvider>
        <MagneticButton>Contact us</MagneticButton>
      </MotionProvider>,
    );

    expect(document.querySelector<HTMLElement>('.sf-magnetic')?.dataset.magnetic).toBe('false');
  });

  it('exposes real form state changes without motion-specific markup', () => {
    render(
      <>
        <SubmitButton state="submitting" />
        <FieldError message="Enter a message." />
        <InlineStatus tone="success">Inquiry received.</InlineStatus>
      </>,
    );

    const button = screen.getByRole('button');
    expect(button.getAttribute('data-state')).toBe('submitting');
    expect(button.hasAttribute('disabled')).toBe(true);
    expect(screen.getByRole('alert').textContent).toBe('Enter a message.');
    expect(screen.getByRole('status').textContent).toBe('Inquiry received.');
  });
});
