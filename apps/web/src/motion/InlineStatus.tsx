import type { ReactNode } from 'react';

type InlineStatusProps = {
  tone: 'success' | 'error';
  children: ReactNode;
};

export function InlineStatus({ tone, children }: InlineStatusProps) {
  return (
    <div className="sf-toast" data-tone={tone} role={tone === 'error' ? 'alert' : 'status'}>
      {children}
    </div>
  );
}
