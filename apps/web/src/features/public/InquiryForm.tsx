import { useState, type FormEvent } from 'react';
import { getDataSource } from '@smartfarm/data-source';
import { LocalDraftStatus } from '../../components/LocalDraftStatus';
import type { DataSource } from '../../data/types';

type InquiryFormProps = {
  source?: DataSource;
};

export function InquiryForm({ source = getDataSource() }: InquiryFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState<string>();
  const [draftSaved, setDraftSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDraftSaved(false);

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Complete all required fields before saving a local draft.');
      return;
    }

    try {
      source.drafts().create(`Inquiry draft: ${name.trim()}`);
      setError(undefined);
      setDraftSaved(true);
    } catch {
      setError('DATA_SOURCE_NOT_WIRED: inquiry delivery is not connected in production builds.');
    }
  };

  return (
    <form className="sf-form-stack" onSubmit={handleSubmit} noValidate>
      <div className="sf-field">
        <label htmlFor="inquiry-name">
          Your name <span className="sf-field__required">*</span>
        </label>
        <input
          id="inquiry-name"
          className="sf-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>
      <div className="sf-field">
        <label htmlFor="inquiry-email">
          Email address <span className="sf-field__required">*</span>
        </label>
        <input
          id="inquiry-email"
          className="sf-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </div>
      <div className="sf-field">
        <label htmlFor="inquiry-message">
          How can we help? <span className="sf-field__required">*</span>
        </label>
        <textarea
          id="inquiry-message"
          className="sf-textarea"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          required
        />
        <span className="sf-field__hint">
          Additional inquiry fields are pending owner approval.
        </span>
      </div>

      {error ? (
        <p role="alert" style={{ color: 'var(--color-error)', margin: 0 }}>
          {error}
        </p>
      ) : null}
      {draftSaved ? <LocalDraftStatus /> : null}

      <button className="sf-button sf-button--primary" type="submit">
        Submit Inquiry
      </button>
    </form>
  );
}
