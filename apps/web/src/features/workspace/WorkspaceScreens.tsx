import { getDataSource } from '@smartfarm/data-source';
import { AlertCircle, LockKeyhole } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { ScreenDefinition } from '../../app/types';
import { LocalDraftStatus } from '../../components/LocalDraftStatus';
import { ScreenTemplateRenderer } from './ScreenTemplates';

function SuspensionConfirmation({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);
  const [error, setError] = useState<string>();
  const openerRef = useRef<HTMLButtonElement>(null);
  const confirmRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      confirmRef.current?.focus();
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    openerRef.current?.focus();
  };

  return (
    <div className="sf-panel">
      <div className="sf-panel__head">
        <h2>Explicit confirmation</h2>
        <LockKeyhole size={18} aria-hidden="true" />
      </div>
      <p className="sf-panel__hint">
        Suspension is an access-changing action. This preview records a local draft only and does
        not change any workspace status.
      </p>
      <button
        ref={openerRef}
        className="sf-button sf-button--danger"
        type="button"
        onClick={() => setOpen(true)}
      >
        Review suspension draft
      </button>
      {draftSaved ? (
        <div style={{ marginTop: 16 }}>
          <LocalDraftStatus />
        </div>
      ) : null}
      {error ? (
        <p role="alert" style={{ color: 'var(--color-error)', marginTop: 16 }}>
          {error}
        </p>
      ) : null}

      {open ? (
        <div className="sf-dialog-backdrop" role="presentation">
          <div
            className="sf-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="suspend-title"
          >
            <h2 id="suspend-title">Confirm suspension draft</h2>
            <p>
              {title} is access-changing. Confirming stores a local draft; it does not suspend a
              workspace or revoke any session.
            </p>
            <div className="sf-dialog__actions">
              <button className="sf-button sf-button--secondary" type="button" onClick={close}>
                Cancel
              </button>
              <button
                ref={confirmRef}
                className="sf-button sf-button--danger"
                type="button"
                onClick={() => {
                  setDraftSaved(false);
                  try {
                    getDataSource().drafts().create(`${title} suspension draft`);
                    setError(undefined);
                    setDraftSaved(true);
                  } catch (reason) {
                    setError(
                      reason instanceof Error ? reason.message : 'This action is unavailable.',
                    );
                  } finally {
                    close();
                  }
                }}
              >
                Save draft
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function WorkspaceScreen({ screen }: { screen: ScreenDefinition }) {
  const request = {
    id: screen.id,
    title: screen.title,
    template: screen.template,
    description: screen.description,
  };

  if (screen.id === 'platform.workspace-suspension') {
    return <SuspensionConfirmation title={screen.title} />;
  }

  if (screen.template === 'state') {
    return (
      <div className="sf-panel" style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <AlertCircle size={20} aria-hidden="true" />
        <div>
          <h2 style={{ margin: '0 0 8px', fontSize: 18 }}>{screen.title}</h2>
          <p className="sf-panel__hint" style={{ marginBottom: 0 }}>
            This state is shown for layout review only. No token, email, synchronization, or upload
            is simulated.
          </p>
        </div>
      </div>
    );
  }

  return <ScreenTemplateRenderer request={request} />;
}
