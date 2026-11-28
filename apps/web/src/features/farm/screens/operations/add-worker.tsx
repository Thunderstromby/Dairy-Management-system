import { useState } from 'react';
import {
  ArrowLeft,
  BadgeCheck,
  CircleAlert,
  FileUp,
  LockKeyhole,
  Save,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import {
  Badge,
  Card,
  Notice,
  PageHeader,
  SelectField,
  TextField,
  primaryButtonClass,
  secondaryButtonClass,
} from './OperationsPrimitives';

export function AddWorkerScreen() {
  const [name, setName] = useState('');
  const [identity, setIdentity] = useState('');
  const [role, setRole] = useState('Milking parlor operator');
  const [employment, setEmployment] = useState('Permanent');
  const [startDate, setStartDate] = useState('');
  const [notes, setNotes] = useState('');
  const [feedback, setFeedback] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workers / Add Worker"
        title="Register New Farm Worker"
        description="Illustrative personnel intake form. Workers are records only — no application login is provisioned."
        badge="Farm Admin"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <ArrowLeft size={16} aria-hidden="true" /> Cancel &amp; return
            </button>
            <button type="button" className={primaryButtonClass} onClick={() => setFeedback(true)}>
              <Save size={16} aria-hidden="true" /> Save (local preview)
            </button>
          </>
        }
      />
      <Notice title="Record-only worker model" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        No login account, PIN, device credential or self-service access is generated. Identity
        strings below are illustrative placeholders, never realistic CNIC values.
      </Notice>
      {feedback ? (
        <div
          role="status"
          className="mb-6 rounded-xl border border-[#d9e8c7] bg-[#d9e8c7]/50 p-4 font-inter text-sm text-[#2f4126]"
        >
          Local preview only — no worker record has been saved and no uniqueness check was run.
        </div>
      ) : null}

      <form
        className="space-y-6"
        onSubmit={(event) => {
          event.preventDefault();
          setFeedback(true);
        }}
      >
        <Card
          title="Identity & Personal Profile"
          subtitle="Illustrative fields; do not enter real personal data"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField
              id="worker-name"
              label="Worker name"
              value={name}
              onChange={setName}
              placeholder="Illustrative name"
              required
            />
            <TextField
              id="worker-identity"
              label="National identity reference"
              value={identity}
              onChange={setIdentity}
              placeholder="Illustrative reference — redacted"
              required
              hint="Uniqueness rules are enforced by the server in the real system; no check runs here."
            />
            <TextField
              id="worker-dob"
              label="Date of birth"
              type="date"
              value=""
              onChange={() => undefined}
            />
            <SelectField
              id="worker-gender"
              label="Gender"
              value="Not specified"
              onChange={() => undefined}
              options={['Not specified', 'Female', 'Male']}
            />
            <TextField
              id="worker-contact"
              label="Emergency contact"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative contact"
            />
            <TextField
              id="worker-address"
              label="Residential address"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative address"
            />
          </div>
        </Card>

        <Card title="Operational & Farm Role" subtitle="Assignment details are illustrative">
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="worker-role"
              label="Assigned role & department"
              value={role}
              onChange={setRole}
              options={[
                'Milking parlor operator',
                'Feeding & nutrition technician',
                'Veterinary assistant',
                'General farm hand',
              ]}
              required
            />
            <SelectField
              id="worker-employment"
              label="Employment type"
              value={employment}
              onChange={setEmployment}
              options={['Permanent', 'Shift contract', 'Seasonal']}
              required
            />
            <TextField
              id="worker-start"
              label="Date of joining"
              type="date"
              value={startDate}
              onChange={setStartDate}
              required
            />
            <SelectField
              id="worker-station"
              label="Assigned shift & station"
              value="Morning shift"
              onChange={() => undefined}
              options={['Morning shift', 'Evening shift', 'General duties']}
              required
            />
            <SelectField
              id="worker-lead"
              label="Reporting lead"
              value="Supervisor A"
              onChange={() => undefined}
              options={['Supervisor A', 'Supervisor B']}
            />
            <div className="flex items-end">
              <Badge tone="secondary">
                <UserRound size={12} aria-hidden="true" /> Record token: illustrative
              </Badge>
            </div>
          </div>
        </Card>

        <Card
          title="Statutory Document Associations"
          subtitle="Metadata only — no files are uploaded or stored"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-4">
              <p className="flex items-center gap-2 font-heading text-sm font-bold text-[#1b1c18]">
                <BadgeCheck size={16} aria-hidden="true" /> Identity document
              </p>
              <p className="mt-1 font-inter text-xs text-[#444840]">
                Illustrative attachment metadata
              </p>
              <button type="button" className={secondaryButtonClass + ' mt-3'}>
                <FileUp size={14} aria-hidden="true" /> Attach (local preview)
              </button>
            </div>
            <div className="rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] p-4">
              <p className="flex items-center gap-2 font-heading text-sm font-bold text-[#1b1c18]">
                <ShieldCheck size={16} aria-hidden="true" /> Employment agreement
              </p>
              <p className="mt-1 font-inter text-xs text-[#444840]">
                Illustrative attachment metadata
              </p>
              <button type="button" className={secondaryButtonClass + ' mt-3'}>
                <FileUp size={14} aria-hidden="true" /> Attach (local preview)
              </button>
            </div>
            <div className="sm:col-span-2">
              <TextField
                id="worker-doc-notes"
                label="Document notes"
                value={notes}
                onChange={setNotes}
                placeholder="Illustrative note"
              />
            </div>
          </div>
        </Card>

        <Notice title="Duplicate identity handling" variant="warning">
          <CircleAlert size={12} className="mr-1 inline" aria-hidden="true" />
          The real system rejects duplicate identity references per workspace. This preview does not
          perform a uniqueness check and stores nothing.
        </Notice>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={secondaryButtonClass}>
            Reset form
          </button>
          <button type="button" className={secondaryButtonClass}>
            Save incomplete draft (local preview)
          </button>
          <button type="submit" className={primaryButtonClass}>
            Authorize &amp; register worker (local preview)
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddWorkerScreen;
