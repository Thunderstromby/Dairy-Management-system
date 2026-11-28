import { useState } from 'react';
import { Bell, Info, Search, ShieldCheck } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

type Notice = {
  id: string;
  category: 'Equipment' | 'Shift' | 'Feeding' | 'Routine herd';
  title: string;
  body: string;
  time: string;
  severity: 'Routine notice';
};

const NOTICES: readonly Notice[] = [
  {
    id: 'N-01',
    category: 'Equipment',
    title: 'Service interval reminder',
    body: 'Routine equipment service is approaching. Record maintenance when completed.',
    time: 'Sample time',
    severity: 'Routine notice',
  },
  {
    id: 'N-02',
    category: 'Shift',
    title: 'Shift handover reminder',
    body: 'Afternoon handover notes are due at shift change.',
    time: 'Sample time',
    severity: 'Routine notice',
  },
  {
    id: 'N-03',
    category: 'Feeding',
    title: 'Evening feeding schedule',
    body: 'The evening ration entry is ready to record.',
    time: 'Sample time',
    severity: 'Routine notice',
  },
  {
    id: 'N-04',
    category: 'Routine herd',
    title: 'Fresh cow observation completed',
    body: 'Routine observation round was recorded in the shift log.',
    time: 'Sample time',
    severity: 'Routine notice',
  },
] as const;

const FILTERS = [
  'All permitted',
  'Unread',
  'Equipment',
  'Feeding',
  'Shift',
  'Routine herd',
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/supervisor_notification_center_operational_alerts */
export function SupervisorNotificationCenterOperationalAlertsScreen() {
  const [filter, setFilter] = useState<string>('All permitted');
  const [query, setQuery] = useState('');
  const [readIds, setReadIds] = useState<readonly string[]>([]);
  const [selected, setSelected] = useState<Notice>(NOTICES[0]);

  const visible = NOTICES.filter((notice) => {
    const matchesFilter =
      filter === 'All permitted' ||
      (filter === 'Unread' && !readIds.includes(notice.id)) ||
      filter === notice.category;
    const haystack = `${notice.title} ${notice.body} ${notice.category}`.toLowerCase();
    return matchesFilter && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <nav aria-label="Breadcrumb" className="flex flex-wrap gap-2 text-xs text-[#444840]">
          <span>Farm Workspace</span>
          <span aria-hidden="true">/</span>
          <span>Operational alerts</span>
          <span aria-hidden="true">/</span>
          <span className="font-semibold text-[#1b1c18]">Notification center</span>
        </nav>

        <header className="flex flex-col gap-4 rounded-xl border border-[#c4c8bd] bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <span className="rounded-lg bg-[#d9e8c7] p-2.5 text-[#46583b]">
              <Bell size={22} aria-hidden="true" />
            </span>
            <div>
              <h1 className="font-heading text-2xl font-bold tracking-tight text-[#1b1c18]">
                Operational Notifications &amp; Alert Center
              </h1>
              <p className="mt-1 max-w-2xl text-sm text-[#444840]">
                Routine shift, feeding, equipment and herd notices only. High and Critical health
                alerts are never delivered to this role.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setReadIds(NOTICES.map((notice) => notice.id))}
            className={`inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-[#c4c8bd] px-4 text-sm font-semibold ${focusRing}`}
          >
            Mark all as read
          </button>
        </header>

        <section className="rounded-xl border-l-4 border-[#46583b] bg-[#f0eee8] p-4">
          <div className="flex items-start gap-3">
            <ShieldCheck size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
            <div>
              <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
                Supervisor notification scope
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                This view contains routine operational notices. Notification preferences are
                read-only and no notification export is offered to this role.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-label="Notification overview"
          className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        >
          {[
            { label: 'Permitted notices', value: '16', note: 'Illustrative count' },
            {
              label: 'Unread',
              value: String(NOTICES.length - readIds.length),
              note: 'Local read state',
            },
            { label: 'Shift reminders', value: '7', note: 'Illustrative count' },
            { label: 'Equipment notices', value: '5', note: 'Illustrative count' },
          ].map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                {card.label}
              </p>
              <p className="mt-2 font-heading text-2xl font-bold text-[#2f4126]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div
              className="flex flex-wrap gap-2"
              role="group"
              aria-label="Notification category filter"
            >
              {FILTERS.map((item) => (
                <button
                  key={item}
                  type="button"
                  aria-pressed={filter === item}
                  onClick={() => setFilter(item)}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold ${filter === item ? 'bg-[#2f4126] text-white' : 'bg-[#f0eee8] text-[#444840]'} ${focusRing}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <label className="relative w-full lg:max-w-xs">
              <span className="sr-only">Search notices</span>
              <Search
                size={15}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search routine notices"
                className={`h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-9 pr-3 text-sm ${focusRing}`}
              />
            </label>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            <ul className="space-y-2 lg:col-span-7">
              {visible.map((notice) => {
                const isRead = readIds.includes(notice.id);
                return (
                  <li key={notice.id}>
                    <div className="flex flex-wrap items-start justify-between gap-3 rounded-xl border-l-4 border-[#46583b] bg-[#f0eee8] p-4">
                      <button
                        type="button"
                        onClick={() => setSelected(notice)}
                        className={`min-w-0 flex-1 text-left ${focusRing}`}
                      >
                        <span className="flex flex-wrap items-center gap-2">
                          <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                            {notice.category}
                          </span>
                          <span className="font-mono text-xs text-[#444840]">{notice.id}</span>
                          <span className="text-xs text-[#444840]">{notice.time}</span>
                        </span>
                        <strong className="mt-2 block text-sm text-[#1b1c18]">
                          {notice.title}
                        </strong>
                        <span className="mt-1 block text-xs text-[#444840]">{notice.body}</span>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setReadIds((current) =>
                            current.includes(notice.id)
                              ? current.filter((id) => id !== notice.id)
                              : [...current, notice.id],
                          )
                        }
                        className={`shrink-0 rounded-lg border border-[#c4c8bd] bg-white px-3 py-1.5 text-xs font-semibold ${focusRing}`}
                      >
                        {isRead ? 'Mark unread' : 'Mark read'}
                      </button>
                    </div>
                  </li>
                );
              })}
              {visible.length === 0 ? (
                <li className="rounded-xl border border-[#c4c8bd] p-8 text-center">
                  <p className="font-heading text-base font-bold">No routine notices found</p>
                  <p className="mt-1 text-sm text-[#444840]">
                    Adjust the category or search filter.
                  </p>
                </li>
              ) : null}
            </ul>

            <aside className="rounded-xl border border-[#c4c8bd] bg-white p-5 lg:col-span-5">
              <h2 className="font-heading text-base font-bold text-[#1b1c18]">Notice inspector</h2>
              <p className="mt-1 text-xs text-[#444840]">Selected routine notice</p>
              <div className="mt-4 rounded-lg bg-[#f0eee8] p-4">
                <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-[#46583b]">
                  {selected.severity}
                </span>
                <h3 className="mt-2 font-heading text-base font-bold text-[#1b1c18]">
                  {selected.title}
                </h3>
                <p className="mt-2 text-sm text-[#444840]">{selected.body}</p>
                <p className="mt-3 text-xs text-[#444840]">
                  {selected.category} · {selected.time} ·{' '}
                  {readIds.includes(selected.id) ? 'Read' : 'Unread'}
                </p>
              </div>
              <p className="mt-4 flex items-start gap-2 text-xs text-[#444840]">
                <Info size={14} aria-hidden="true" className="mt-0.5 shrink-0" />
                No clinical severity, escalation action or notification export is available here.
              </p>
            </aside>
          </div>
        </section>

        <section className="space-y-3 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <h2 className="font-heading text-base font-bold text-[#1b1c18]">
            Routine notice history
          </h2>
          <p className="text-sm text-[#444840]">Sample archive · illustrative</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Time
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Summary
                  </th>
                  <th scope="col" className="px-3 py-3">
                    State
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {NOTICES.map((notice) => (
                  <tr key={notice.id}>
                    <td className="px-3 py-3">{notice.time}</td>
                    <td className="px-3 py-3">{notice.category}</td>
                    <td className="px-3 py-3 text-[#444840]">{notice.title}</td>
                    <td className="px-3 py-3">{readIds.includes(notice.id) ? 'Read' : 'Unread'}</td>
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
