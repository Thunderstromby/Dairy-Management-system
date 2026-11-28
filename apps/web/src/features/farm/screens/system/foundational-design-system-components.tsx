import { Check, Info, Search, ShieldCheck } from 'lucide-react';
import { useState, type ReactNode } from 'react';

const tokens = [
  { name: 'Background', value: '#fbf9f3', swatch: 'bg-[#fbf9f3]', text: 'text-[#1b1c18]' },
  { name: 'Surface', value: '#ffffff', swatch: 'bg-white', text: 'text-[#1b1c18]' },
  { name: 'Primary', value: '#2f4126', swatch: 'bg-[#2f4126]', text: 'text-white' },
  { name: 'Primary container', value: '#46583b', swatch: 'bg-[#46583b]', text: 'text-white' },
  { name: 'Secondary container', value: '#d9e8c7', swatch: 'bg-[#d9e8c7]', text: 'text-[#1b1c18]' },
  { name: 'Tertiary container', value: '#7a461c', swatch: 'bg-[#7a461c]', text: 'text-white' },
  { name: 'Outline variant', value: '#c4c8bd', swatch: 'bg-[#c4c8bd]', text: 'text-[#1b1c18]' },
  { name: 'On surface', value: '#1b1c18', swatch: 'bg-[#1b1c18]', text: 'text-white' },
  { name: 'On surface variant', value: '#444840', swatch: 'bg-[#444840]', text: 'text-white' },
  { name: 'Secondary', value: '#556249', swatch: 'bg-[#556249]', text: 'text-white' },
] as const;

function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    neutral: 'bg-[#eae8e2] text-[#444840]',
    primary: 'bg-[#d9e8c7] text-[#2f4126]',
    danger: 'bg-[#7a461c] text-white',
    outline: 'border border-[#c4c8bd] bg-white text-[#444840]',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${tones[tone] ?? tones.neutral}`}
    >
      {children}
    </span>
  );
}

export function FoundationalDesignSystemComponentsScreen() {
  const [query, setQuery] = useState('');
  const [checked, setChecked] = useState(true);

  return (
    <div className="w-full bg-[#fbf9f3] font-inter text-[#1b1c18]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-4 md:p-6">
        <header className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-heading text-lg font-bold">SmartFarm</span>
            <Badge tone="danger">
              <ShieldCheck size={12} className="mr-1" aria-hidden="true" /> Farm Admin UI foundation
            </Badge>
            <Badge>Component reference — not a route</Badge>
          </div>
          <h1 className="font-heading mt-2 text-2xl font-bold tracking-tight">
            Foundational design system components
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-[#444840]">
            Small reference sheet for approved colour tokens, typography, badges, controls and table
            density. All example content is illustrative; no live or operational data is shown.
          </p>
        </header>

        <section
          aria-labelledby="tokens-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="tokens-title" className="font-heading text-lg font-bold">
            Colour tokens
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {tokens.map((token) => (
              <div key={token.name} className="rounded-xl border border-[#c4c8bd] p-3">
                <span
                  className={`flex h-12 w-full items-center justify-center rounded-lg border border-[#c4c8bd] ${token.swatch} ${token.text}`}
                >
                  <span className="font-mono text-[10px]">{token.value}</span>
                </span>
                <p className="mt-2 text-xs font-semibold">{token.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="type-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="type-title" className="font-heading text-lg font-bold">
            Typography
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <div className="rounded-xl bg-[#f5f3ed] p-4">
              <p className="font-mono text-[11px] text-[#556249]">font-heading · Manrope</p>
              <p className="font-heading mt-2 text-2xl font-bold tracking-tight">
                Farm operations heading
              </p>
            </div>
            <div className="rounded-xl bg-[#f5f3ed] p-4">
              <p className="font-mono text-[11px] text-[#556249]">font-inter · Inter</p>
              <p className="mt-2 text-sm leading-relaxed text-[#444840]">
                Body copy uses tabular, readable numerals and restrained contrast for dense records.
              </p>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="badges-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="badges-title" className="font-heading text-lg font-bold">
            Status badges
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#444840]">
                Animal lifecycle
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="primary">Active</Badge>
                <Badge>Sold</Badge>
                <Badge>Deceased</Badge>
                <Badge tone="outline">Removed</Badge>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#444840]">
                Health severity
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge>Low</Badge>
                <Badge tone="outline">Moderate</Badge>
                <Badge tone="danger">High</Badge>
                <Badge tone="danger">Critical — Admin only</Badge>
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-[#444840]">
                Milk quality
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge tone="primary">Good</Badge>
                <Badge>Average</Badge>
                <Badge tone="danger">Poor / withheld</Badge>
              </div>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#444840]">
            Status is never conveyed by colour alone; labels are always present.
          </p>
        </section>

        <section
          aria-labelledby="controls-title"
          className="rounded-xl border border-[#c4c8bd] bg-white p-6 shadow-sm"
        >
          <h2 id="controls-title" className="font-heading text-lg font-bold">
            Form controls
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label htmlFor="ref-search" className="mb-1.5 block text-xs font-semibold">
                Search field
              </label>
              <div className="relative">
                <Search
                  size={16}
                  aria-hidden="true"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#444840]"
                />
                <input
                  id="ref-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Illustrative filter"
                  className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] pl-9 pr-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
                />
              </div>
            </div>
            <div>
              <label htmlFor="ref-select" className="mb-1.5 block text-xs font-semibold">
                Select field
              </label>
              <select
                id="ref-select"
                className="h-10 w-full rounded-lg border border-[#c4c8bd] bg-[#f5f3ed] px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
              >
                <option>Illustrative option</option>
                <option>Another example</option>
              </select>
            </div>
            <label className="flex items-center gap-2 self-end pb-2 text-sm">
              <input
                type="checkbox"
                checked={checked}
                onChange={(event) => setChecked(event.target.checked)}
                className="h-4 w-4 accent-[#46583b]"
              />
              Illustrative checkbox
            </label>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#46583b] px-4 py-2 text-sm font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-[#2f4126] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              <Check size={16} aria-hidden="true" /> Primary action
            </button>
            <button
              type="button"
              className="rounded-lg border border-[#c4c8bd] bg-white px-4 py-2 text-sm font-medium text-[#1b1c18] transition-colors motion-reduce:transition-none hover:bg-[#f0eee8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#46583b]"
            >
              Secondary action
            </button>
          </div>
        </section>

        <section
          aria-labelledby="table-title"
          className="overflow-hidden rounded-xl border border-[#c4c8bd] bg-white shadow-sm"
        >
          <div className="border-b border-[#c4c8bd] bg-[#f5f3ed] px-4 py-3">
            <h2 id="table-title" className="font-heading text-base font-bold">
              Table density sample
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-left text-sm">
              <thead>
                <tr className="bg-[#f0eee8] text-xs uppercase tracking-wide text-[#444840]">
                  <th scope="col" className="px-4 py-3 font-semibold">
                    Reference
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    Category
                  </th>
                  <th scope="col" className="px-3 py-3 font-semibold">
                    State
                  </th>
                  <th scope="col" className="px-4 py-3 text-right font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {[
                  ['EX-001', 'Animal', 'Active'],
                  ['EX-002', 'Milk', 'Recorded'],
                  ['EX-003', 'Inventory', 'Flagged'],
                ].map((row) => (
                  <tr key={row[0]}>
                    <td className="px-4 py-3 font-mono text-xs">{row[0]}</td>
                    <td className="px-3 py-3 text-xs">{row[1]}</td>
                    <td className="px-3 py-3">
                      <Badge tone={row[2] === 'Flagged' ? 'danger' : 'primary'}>{row[2]}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-[#556249]">Illustrative</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="flex items-start gap-2 rounded-xl bg-white p-4 text-xs text-[#444840] shadow-sm">
          <Info size={14} className="mt-0.5 shrink-0 text-[#46583b]" aria-hidden="true" />
          Reference sheet only — not an authenticated product route. Motion uses short transitions,
          is reduced-motion safe, and introduces no live status, telemetry, or 3D content.
        </p>
      </div>
    </div>
  );
}
