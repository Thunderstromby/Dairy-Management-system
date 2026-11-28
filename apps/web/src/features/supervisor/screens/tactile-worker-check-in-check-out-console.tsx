import { useState, type FormEvent } from 'react';
import { BadgeCheck, ClipboardList, Info, LockKeyhole } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

const WORKERS = [
  { id: 'W-01', role: 'Parlor lead' },
  { id: 'W-02', role: 'Feed operator' },
  { id: 'W-03', role: 'Nursery carer' },
] as const;

const LEDGER = [
  { time: 'Sample time', worker: 'W-01', action: 'Check-out', station: 'Parlor' },
  { time: 'Sample time', worker: 'W-02', action: 'Check-in', station: 'Feed alley' },
  { time: 'Sample time', worker: 'W-03', action: 'Check-in', station: 'Nursery' },
] as const;

/**
 * Source: stitch_smartfarm_supervisor_interface_shell/tactile_worker_check_in_check_out_console
 * Hardware/tactile station concepts are excluded by the locked architecture. Only a simple
 * manual record-entry preview is reproduced here.
 */
export function TactileWorkerCheckInCheckOutConsoleScreen() {
  const [worker, setWorker] = useState('W-01');
  const [date, setDate] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [status, setStatus] = useState('Present');
  const [station, setStation] = useState('Parlor');
  const [notes, setNotes] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setMessage('');
    if (!worker || !date) {
      setError('Select a worker and attendance date.');
      return;
    }
    if (!checkIn && !checkOut) {
      setError('Enter at least one check-in or check-out time.');
      return;
    }
    setMessage('Draft validated locally. No attendance record was saved.');
  };

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Workers &amp; attendance</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Manual check-in / check-out</span>
        </nav>

        <header className="space-y-2">
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Worker Check-In &amp; Check-Out
          </h1>
          <p className="max-w-3xl text-sm text-[#444840]">
            Simple manual record-entry preview for daily attendance. No terminal, badge reader, RFID
            scan or device clock is represented.
          </p>
        </header>

        <section className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={19} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
          <p className="text-sm text-[#444840]">
            <strong className="text-[#1b1c18]">Daily attendance only.</strong> Overtime
            authorization and leave approval are managed by Farm Admin. The source tactile-device
            console is intentionally omitted because hardware and tactile stations are excluded.
          </p>
        </section>

        <form
          onSubmit={submit}
          noValidate
          className="space-y-5 rounded-xl border border-[#c4c8bd] bg-white p-6"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="check-worker" className="text-sm font-semibold">
                Worker
              </label>
              <select
                id="check-worker"
                value={worker}
                onChange={(event) => setWorker(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                {WORKERS.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.id} · {item.role}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="check-date" className="text-sm font-semibold">
                Attendance date
              </label>
              <input
                id="check-date"
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="check-in" className="text-sm font-semibold">
                Check-in time
              </label>
              <input
                id="check-in"
                type="time"
                value={checkIn}
                onChange={(event) => setCheckIn(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
            <div className="space-y-1.5">
              <label htmlFor="check-out" className="text-sm font-semibold">
                Check-out time
              </label>
              <input
                id="check-out"
                type="time"
                value={checkOut}
                onChange={(event) => setCheckOut(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-semibold">Attendance status</legend>
            <div className="flex flex-wrap gap-2">
              {['Present', 'Late', 'Absent'].map((item) => (
                <label
                  key={item}
                  className={`cursor-pointer rounded-lg px-4 py-2 text-sm font-semibold ${status === item ? 'bg-[#46583b] text-white' : 'bg-[#f0eee8] text-[#444840]'}`}
                >
                  <input
                    type="radio"
                    name="attendance-status"
                    value={item}
                    checked={status === item}
                    onChange={() => setStatus(item)}
                    className={`sr-only ${focusRing}`}
                  />
                  {item}
                </label>
              ))}
              <span className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg bg-[#e4e2dd] px-4 py-2 text-sm font-semibold text-[#75786f]">
                <LockKeyhole size={14} aria-hidden="true" /> Leave — Farm Admin managed
              </span>
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label htmlFor="check-station" className="text-sm font-semibold">
                Task station
              </label>
              <select
                id="check-station"
                value={station}
                onChange={(event) => setStation(event.target.value)}
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option>Parlor</option>
                <option>Feed alley</option>
                <option>Nursery</option>
                <option>Maintenance</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label htmlFor="check-notes" className="text-sm font-semibold">
                Handover notes (optional)
              </label>
              <input
                id="check-notes"
                type="text"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                placeholder="Routine handover remark"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              />
            </div>
          </div>

          {error ? (
            <p role="alert" className="text-sm font-semibold text-[#ba1a1a]">
              {error}
            </p>
          ) : null}
          {message ? (
            <p role="status" className="rounded-lg bg-[#d9e8c7] px-3 py-2 text-sm text-[#46583b]">
              {message}
            </p>
          ) : null}

          <div className="flex flex-wrap justify-end gap-2 border-t border-[#f0eee8] pt-4">
            <button
              type="button"
              onClick={() => {
                setDate('');
                setCheckIn('');
                setCheckOut('');
                setNotes('');
                setError('');
                setMessage('');
              }}
              className={`h-11 rounded-lg border border-[#c4c8bd] px-5 text-sm font-semibold ${focusRing}`}
            >
              Clear
            </button>
            <button
              type="submit"
              className={`inline-flex h-11 items-center gap-2 rounded-lg bg-[#46583b] px-5 text-sm font-semibold text-white ${focusRing}`}
            >
              <BadgeCheck size={17} aria-hidden="true" /> Validate Attendance Entry
            </button>
          </div>
        </form>

        <section className="space-y-3 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex items-center gap-2">
            <ClipboardList size={18} aria-hidden="true" className="text-[#46583b]" />
            <h2 className="font-heading text-base font-bold text-[#1b1c18]">
              Today&apos;s attendance ledger
            </h2>
          </div>
          <p className="text-sm text-[#444840]">Sample entries · illustrative</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Worker
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Station
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {LEDGER.map((row, index) => (
                  <tr key={`${row.worker}-${index}`}>
                    <td className="px-3 py-3">{row.time}</td>
                    <td className="px-3 py-3 font-mono font-semibold">{row.worker}</td>
                    <td className="px-3 py-3">{row.action}</td>
                    <td className="px-3 py-3">{row.station}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
