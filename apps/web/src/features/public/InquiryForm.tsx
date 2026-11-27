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
      setError('Inquiry delivery is not available yet. Please try again later.');
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-deep-forest"
          htmlFor="name"
        >
          Your Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
          className="w-full rounded-xl border border-border-subtle bg-warm-ivory/40 px-4 py-3 text-sm text-deep-forest placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-pasture-green"
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-deep-forest"
          htmlFor="email"
        >
          Work Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@yourfarm.example"
          className="w-full rounded-xl border border-border-subtle bg-warm-ivory/40 px-4 py-3 text-sm text-deep-forest placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-pasture-green"
        />
      </div>
      <div>
        <label
          className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-deep-forest"
          htmlFor="message"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          required
          rows={3}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Tell us about your farm and operations"
          className="w-full rounded-xl border border-border-subtle bg-warm-ivory/40 px-4 py-3 text-sm text-deep-forest placeholder:text-muted-text focus:outline-none focus:ring-2 focus:ring-pasture-green"
        />
        <span className="mt-1 block text-[11px] text-muted-text">
          Additional inquiry fields are pending owner approval.
        </span>
      </div>

      {error ? (
        <p role="alert" className="text-xs text-red-700">
          {error}
        </p>
      ) : null}
      {draftSaved ? <LocalDraftStatus /> : null}

      <button
        type="submit"
        className="mt-2 w-full rounded-lg bg-pasture-green py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[#2d6346]"
      >
        Submit Inquiry
      </button>
    </form>
  );
}
