import { useState } from 'react';
import { Info, LockKeyhole, Scale, Search, ShieldAlert, Users } from 'lucide-react';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2f4126]';

type Animal = {
  tag: string;
  id: string;
  name: string;
  group: string;
  status: string;
};

const ANIMALS: readonly Animal[] = [
  {
    tag: 'ET-A1042',
    id: 'A-1042',
    name: 'Animal A-1042',
    group: 'Milking group 02',
    status: 'Active',
  },
  {
    tag: 'ET-B2071',
    id: 'B-2071',
    name: 'Animal B-2071',
    group: 'Observation group 04',
    status: 'Separate watch',
  },
  {
    tag: 'ET-C3088',
    id: 'C-3088',
    name: 'Animal C-3088',
    group: 'Milking group 01',
    status: 'Active',
  },
  { tag: 'ET-D4119', id: 'D-4119', name: 'Animal D-4119', group: 'Young stock', status: 'Active' },
  { tag: 'ET-E5120', id: 'E-5120', name: 'Animal E-5120', group: 'Dry group', status: 'Active' },
];

const SUMMARY = [
  { label: 'Herd total', value: '248', note: 'Illustrative active records' },
  { label: 'Milking groups', value: '184', note: 'Illustrative allocation' },
  { label: 'Dry group', value: '32', note: 'Illustrative allocation' },
  { label: 'Young stock', value: '28', note: 'Illustrative allocation' },
] as const;

/** Source: stitch_smartfarm_supervisor_interface_shell/animal_directory_herd_manifest */
export function AnimalDirectoryHerdManifestScreen() {
  const [query, setQuery] = useState('');
  const [group, setGroup] = useState('all');
  const [selected, setSelected] = useState<Animal | null>(null);
  const [noticeText, setNoticeState] = useState('');

  const visible = ANIMALS.filter((animal) => {
    const matchesGroup = group === 'all' || animal.group === group;
    const haystack = `${animal.tag} ${animal.id} ${animal.name} ${animal.group}`.toLowerCase();
    return matchesGroup && haystack.includes(query.trim().toLowerCase());
  });

  return (
    <main className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto w-full max-w-[1600px] space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#556249]">
            <span>Farm Workspace</span>
            <span aria-hidden="true">/</span>
            <span>Animals</span>
            <span className="rounded bg-[#d9e8c7] px-2 py-0.5 text-[#46583b]">Permitted view</span>
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-[#1b1c18]">
            Animal Directory &amp; Herd Manifest
          </h1>
          <p className="max-w-3xl text-sm leading-relaxed text-[#444840]">
            Operational lookup, group allocation and permitted record viewing. Registration,
            parentage changes and animal archiving are restricted to Farm Admin.
          </p>
        </header>

        <div className="flex flex-col gap-4 rounded-xl border-l-4 border-[#7a461c] bg-[#f0eee8] p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <ShieldAlert size={22} aria-hidden="true" className="mt-0.5 shrink-0 text-[#7a461c]" />
            <div>
              <h2 className="font-heading text-sm font-bold text-[#1b1c18]">
                Restricted operational entry mode
              </h2>
              <p className="mt-1 text-sm text-[#444840]">
                Viewing and permitted daily notes are available. Animal registration, lifecycle
                transitions and archive actions require Farm Admin approval.
              </p>
            </div>
          </div>
          <button
            type="button"
            disabled
            title="Farm Admin only"
            className="inline-flex h-11 shrink-0 cursor-not-allowed items-center gap-2 rounded-lg bg-[#e4e2dd] px-4 text-sm font-semibold text-[#75786f]"
          >
            <LockKeyhole size={16} aria-hidden="true" /> Add New Animal — Admin only
          </button>
        </div>

        <section aria-label="Herd summary" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {SUMMARY.map((card) => (
            <article key={card.label} className="rounded-xl border border-[#c4c8bd] bg-white p-4">
              <div className="flex items-center justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {card.label}
                </p>
                <Users size={16} aria-hidden="true" className="text-[#46583b]" />
              </div>
              <p className="mt-3 font-heading text-2xl font-bold text-[#1b1c18]">{card.value}</p>
              <p className="mt-1 text-xs text-[#444840]">{card.note}</p>
            </article>
          ))}
        </section>

        <section className="space-y-4 rounded-xl border border-[#c4c8bd] bg-white p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <label className="relative w-full max-w-md">
              <span className="sr-only">Search animal records</span>
              <Search
                size={18}
                aria-hidden="true"
                className="absolute left-3 top-3 text-[#75786f]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by ear tag or internal ID"
                className={`h-11 w-full rounded-lg border border-[#c4c8bd] bg-[#f0eee8] pl-10 pr-3 text-sm ${focusRing}`}
              />
            </label>
            <div className="flex flex-wrap items-center gap-3">
              <label
                htmlFor="group-filter"
                className="text-xs font-semibold uppercase text-[#444840]"
              >
                Group
              </label>
              <select
                id="group-filter"
                value={group}
                onChange={(event) => setGroup(event.target.value)}
                className={`h-11 rounded-lg border border-[#c4c8bd] bg-[#f0eee8] px-3 text-sm ${focusRing}`}
              >
                <option value="all">All groups</option>
                <option value="Milking group 01">Milking group 01</option>
                <option value="Milking group 02">Milking group 02</option>
                <option value="Dry group">Dry group</option>
                <option value="Young stock">Young stock</option>
                <option value="Observation group 04">Observation group 04</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setGroup('all');
                }}
                className={`rounded-lg border border-[#c4c8bd] px-3 py-2 text-sm font-semibold text-[#444840] ${focusRing}`}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-[#f0eee8] pb-3 text-xs text-[#444840]">
            <span>
              Showing {visible.length} of {ANIMALS.length} illustrative records
            </span>
            <span className="rounded bg-[#f0eee8] px-2 py-0.5">Illustrative</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-[11px] uppercase tracking-wider text-[#444840]">
                  <th scope="col" className="px-3 py-3">
                    Ear tag
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Internal ID
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Animal
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Group allocation
                  </th>
                  <th scope="col" className="px-3 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3 text-right">
                    Permitted actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee8]">
                {visible.map((animal) => (
                  <tr key={animal.id} className="hover:bg-[#fbf9f3]">
                    <td className="px-3 py-3 font-mono font-bold text-[#2f4126]">{animal.tag}</td>
                    <td className="px-3 py-3 text-[#444840]">{animal.id}</td>
                    <td className="px-3 py-3 font-semibold text-[#1b1c18]">{animal.name}</td>
                    <td className="px-3 py-3">{animal.group}</td>
                    <td className="px-3 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d9e8c7] px-2.5 py-1 text-xs font-semibold text-[#46583b]">
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-[#2f4126]"
                          aria-hidden="true"
                        />
                        {animal.status}
                      </span>
                    </td>
                    <td className="px-3 py-3 text-right">
                      <div className="inline-flex gap-2">
                        <button
                          type="button"
                          onClick={() => setSelected(animal)}
                          className={`rounded-lg bg-[#f0eee8] px-3 py-1.5 text-xs font-semibold text-[#1b1c18] ${focusRing}`}
                        >
                          View summary
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setNoticeState(`Weight history preview opened for ${animal.name}.`)
                          }
                          className={`inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-[#444840] ${focusRing}`}
                          aria-label={`View weight history for ${animal.name}`}
                        >
                          <Scale size={16} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="py-12 text-center">
                <p className="font-heading text-base font-bold text-[#1b1c18]">
                  No animal records found
                </p>
                <p className="mt-1 text-sm text-[#444840]">
                  No illustrative record matches the selected ear tag or group.
                </p>
              </div>
            ) : null}
          </div>

          {selected ? (
            <div className="rounded-xl border border-[#c4c8bd] bg-[#f0eee8] p-4">
              <h3 className="font-heading text-sm font-bold text-[#1b1c18]">
                Permitted summary · {selected.name}
              </h3>
              <p className="mt-1 text-sm text-[#444840]">
                Tag {selected.tag} · {selected.group}. Parentage, pedigree and disposal records are
                managed by Farm Admin.
              </p>
              <label
                className="mt-3 block text-xs font-semibold text-[#444840]"
                htmlFor="daily-note"
              >
                Daily observation note (local draft only)
              </label>
              <textarea
                id="daily-note"
                rows={2}
                className={`mt-1 w-full rounded-lg border border-[#c4c8bd] bg-white p-2.5 text-sm ${focusRing}`}
                placeholder="Enter a routine observation. No data is saved in this prototype."
              />
            </div>
          ) : null}
          <p id="local-note-status" role="status" className="text-xs text-[#46583b]">
            {noticeText}
          </p>
        </section>

        <div className="flex items-start gap-3 rounded-xl bg-[#f0eee8] p-4">
          <Info size={18} aria-hidden="true" className="mt-0.5 shrink-0 text-[#46583b]" />
          <p className="text-xs leading-relaxed text-[#444840]">
            Sample values are illustrative. This screen uses record-entry previews only; it does not
            read a tag scanner or change any farm record.
          </p>
        </div>
      </div>
    </main>
  );
}
