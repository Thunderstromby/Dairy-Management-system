import { useState } from 'react';
import {
  ChevronRight,
  Droplets,
  Eye,
  History,
  PawPrint,
  RefreshCw,
  Scale,
  Search,
  SlidersHorizontal,
  Tag,
} from 'lucide-react';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#46583b]';

type Animal = {
  tag: string;
  internalId: string;
  name: string;
  cohort: string;
  breed: string;
  group: string;
  pen: string;
  status: string;
  tone: 'primary' | 'tertiary' | 'neutral' | 'secondary';
  weight: string;
  lineage: string;
};

const animals: Animal[] = [
  {
    tag: 'TAG-A-01',
    internalId: 'ID-0001',
    name: 'Animal A',
    cohort: 'Lactation 3 · day 112 (illustrative)',
    breed: 'Holstein Friesian',
    group: 'Lactating cow',
    pen: 'Pen 04',
    status: 'Active lactation',
    tone: 'primary',
    weight: '642 kg',
    lineage: 'Dam: Tag D-01 / Sire: Sire S-01',
  },
  {
    tag: 'TAG-A-02',
    internalId: 'ID-0002',
    name: 'Animal B',
    cohort: 'Lactation 2 (illustrative)',
    breed: 'Jersey',
    group: 'Lactating cow',
    pen: 'Pen 02',
    status: 'Active lactation',
    tone: 'primary',
    weight: '485 kg',
    lineage: 'Dam: Tag D-02 / Sire: Sire S-02',
  },
  {
    tag: 'TAG-A-03',
    internalId: 'ID-0003',
    name: 'Animal C',
    cohort: 'Clinical hold (illustrative)',
    breed: 'Brown Swiss cross',
    group: 'Dry / clinical hold',
    pen: 'Pen H-1',
    status: 'Dry (hold)',
    tone: 'tertiary',
    weight: '690 kg',
    lineage: 'Dam: Tag D-03 / Sire: Sire S-03',
  },
  {
    tag: 'TAG-A-04',
    internalId: 'ID-0004',
    name: 'Animal D',
    cohort: 'Lactation 1 (illustrative)',
    breed: 'Holstein Friesian',
    group: 'Lactating cow',
    pen: 'Pen 04',
    status: 'Active lactation',
    tone: 'primary',
    weight: '615 kg',
    lineage: 'Dam: Tag D-04 / Sire: Sire S-04',
  },
  {
    tag: 'TAG-A-05',
    internalId: 'ID-0005',
    name: 'Animal E',
    cohort: 'Age 4.5 months (illustrative)',
    breed: 'Holstein calf',
    group: 'Nursery calf',
    pen: 'Pen 01-A',
    status: 'Active (growth)',
    tone: 'secondary',
    weight: '142 kg',
    lineage: 'Dam: Tag D-01 / Sire: Sire S-01',
  },
  {
    tag: 'TAG-A-06',
    internalId: 'ID-0006',
    name: 'Animal F',
    cohort: 'Off-site registry (illustrative)',
    breed: 'Holstein Friesian',
    group: 'Sold / transferred',
    pen: 'External',
    status: 'Sold',
    tone: 'neutral',
    weight: '610 kg',
    lineage: 'Dam: Tag D-05 / Sire: Sire S-05',
  },
];

const statusTone: Record<Animal['tone'], string> = {
  primary: 'bg-[#d9e8c7] text-[#2f4126]',
  tertiary: 'bg-[#ffdcc6] text-[#7a461c]',
  neutral: 'bg-[#eae8e2] text-[#444840]',
  secondary: 'bg-[#d4e9c3] text-[#3a4c30]',
};

const filters = [
  { label: 'Category / group', options: ['All groups', 'Lactating', 'Dry', 'Heifers', 'Calves'] },
  { label: 'Breed', options: ['All breeds', 'Holstein Friesian', 'Jersey', 'Brown Swiss cross'] },
  {
    label: 'Lifecycle status',
    options: ['All active', 'Sold / transferred', 'Deceased', 'Removed'],
  },
  { label: 'Pen assignment', options: ['All pens', 'Pen 01', 'Pen 02', 'Pen 04', 'Isolation pen'] },
];

export function HerdRegistryAnimalDirectory() {
  const [query, setQuery] = useState('');
  const [filterValues, setFilterValues] = useState<string[]>(
    filters.map((filter) => filter.options[0]),
  );
  const [advanced, setAdvanced] = useState(false);

  const visible = animals.filter((animal) => {
    const matchesQuery = `${animal.tag} ${animal.name} ${animal.breed} ${animal.pen}`
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilters = filterValues.every((value, index) => {
      if (index === 0)
        return value === 'All groups' || animal.group.toLowerCase().includes(value.toLowerCase());
      if (index === 1)
        return value === 'All breeds' || animal.breed.toLowerCase().includes(value.toLowerCase());
      if (index === 2)
        return (
          value === 'All active' ||
          animal.status.toLowerCase().includes(value.toLowerCase().split(' ')[0])
        );
      return (
        value === 'All pens' ||
        animal.pen.toLowerCase().includes(value.toLowerCase().replace('pen ', 'pen '))
      );
    });
    return matchesQuery && matchesFilters;
  });

  return (
    <div className="w-full bg-[#fbf9f3] px-4 py-6 font-inter text-[#1b1c18] sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-5">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
              <span>Livestock architecture</span>
              <ChevronRight aria-hidden="true" size={13} />
              <span className="text-[#2f4126]">Active ledger</span>
            </div>
            <h1 className="mt-1 font-heading text-2xl font-bold tracking-tight text-[#1b1c18] sm:text-3xl">
              Herd Registry & Animal Directory
            </h1>
            <p className="mt-1 text-sm text-[#444840]">
              All counts and records on this screen are illustrative — not live farm data.
            </p>
          </div>
          <p className="text-xs text-[#444840]">
            Add Animal is available in the Farm Admin-only registration screen. Export and batch
            audit controls are not wired in this prototype.
          </p>
        </header>

        <section
          aria-label="Herd summary"
          className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4"
        >
          {[
            {
              label: 'Total registered herd',
              value: '1,280',
              unit: 'head',
              detail: '91.4% capacity (illustrative)',
              icon: <PawPrint aria-hidden="true" size={18} />,
            },
            {
              label: 'Active milking',
              value: '890',
              unit: 'head',
              detail: 'Pens 02 and 04 (illustrative)',
              icon: <Droplets aria-hidden="true" size={18} />,
            },
            {
              label: 'Dry / gestation',
              value: '210',
              unit: 'head',
              detail: '16.4% of herd (illustrative)',
              icon: <Scale aria-hidden="true" size={18} />,
            },
            {
              label: 'Calves & heifers',
              value: '180',
              unit: 'head',
              detail: 'Nursery cohort (illustrative)',
              icon: <Tag aria-hidden="true" size={18} />,
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                  {card.label}
                </span>
                <span className="text-[#2f4126]">{card.icon}</span>
              </div>
              <p className="mt-3 font-heading text-2xl font-bold text-[#2f4126]">
                {card.value}{' '}
                <span className="text-sm font-semibold text-[#444840]">{card.unit}</span>
              </p>
              <p className="mt-1 text-xs text-[#444840]">{card.detail}</p>
              <span className="mt-2 inline-block rounded bg-[#f0eee8] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#444840]">
                Illustrative
              </span>
            </div>
          ))}
        </section>

        <section className="rounded-xl border border-[#c4c8bd]/50 bg-white shadow-sm">
          <div className="flex flex-col gap-3 p-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative min-w-[240px] flex-1">
                <Search
                  aria-hidden="true"
                  size={16}
                  className="absolute left-3 top-2.5 text-[#444840]"
                />
                <label htmlFor="herd-search" className="sr-only">
                  Search animals
                </label>
                <input
                  id="herd-search"
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search tag, animal, breed or pen"
                  className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] py-2 pl-9 pr-3 text-sm text-[#1b1c18] placeholder:text-[#444840] ${focus}`}
                />
              </div>
              <button
                type="button"
                aria-pressed={advanced}
                onClick={() => setAdvanced((open) => !open)}
                className={`inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] px-3 py-2 text-sm font-semibold text-[#1b1c18] ${focus}`}
              >
                <SlidersHorizontal aria-hidden="true" size={15} /> Advanced query
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setFilterValues(filters.map((filter) => filter.options[0]));
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg bg-[#f0eee8] p-2 text-[#444840] ${focus}`}
                aria-label="Reset filters"
              >
                <RefreshCw aria-hidden="true" size={15} />
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {filters.map((filter, index) => (
                <div key={filter.label}>
                  <label
                    htmlFor={`filter-${index}`}
                    className="mb-1 block text-xs font-semibold text-[#444840]"
                  >
                    {filter.label}
                  </label>
                  <select
                    id={`filter-${index}`}
                    value={filterValues[index]}
                    onChange={(event) =>
                      setFilterValues((current) =>
                        current.map((v, i) => (i === index ? event.target.value : v)),
                      )
                    }
                    className={`w-full rounded-lg border border-[#c4c8bd] bg-[#fbf9f3] px-3 py-2 text-sm text-[#1b1c18] ${focus}`}
                  >
                    {filter.options.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            {advanced ? (
              <p className="rounded-lg bg-[#f5f3ed] p-3 text-xs text-[#444840]">
                Additional query options are preview-only; no server request is made.
              </p>
            ) : null}
          </div>

          <div className="overflow-x-auto border-t border-[#c4c8bd]/50">
            <table className="w-full min-w-[1080px] border-collapse text-left text-sm">
              <thead className="bg-[#f0eee8] text-[11px] font-semibold uppercase tracking-wider text-[#444840]">
                <tr>
                  <th scope="col" className="px-3 py-3">
                    <input
                      type="checkbox"
                      aria-label="Select all visible animals"
                      className={`h-4 w-4 accent-[#2f4126] ${focus}`}
                    />
                  </th>
                  {[
                    'Ear tag',
                    'Internal ID',
                    'Animal & cohort',
                    'Breed',
                    'Group & pen',
                    'Lifecycle status',
                    'Weight',
                    'Lineage',
                    'Actions',
                  ].map((heading) => (
                    <th key={heading} scope="col" className="whitespace-nowrap px-3 py-3">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eae8e2]">
                {visible.map((animal) => (
                  <tr key={animal.tag} className="hover:bg-[#f5f3ed]">
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        aria-label={`Select ${animal.name}`}
                        className={`h-4 w-4 accent-[#2f4126] ${focus}`}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 font-semibold text-[#2f4126]">
                      <span className="inline-flex items-center gap-1 rounded bg-[#f0eee8] px-2 py-0.5 font-mono text-xs">
                        <Tag aria-hidden="true" size={12} /> {animal.tag}
                      </span>
                    </td>
                    <td className="px-3 py-3 font-mono text-xs text-[#444840]">
                      {animal.internalId}
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-heading text-sm font-bold text-[#1b1c18]">{animal.name}</p>
                      <p className="text-xs text-[#444840]">{animal.cohort}</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="font-medium">{animal.breed}</p>
                      <p className="text-xs text-[#444840]">Female (bovine)</p>
                    </td>
                    <td className="px-3 py-3">
                      <p className="text-sm font-semibold text-[#2f4126]">{animal.group}</p>
                      <p className="text-xs text-[#444840]">{animal.pen}</p>
                    </td>
                    <td className="px-3 py-3">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[animal.tone]}`}
                      >
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" />
                        {animal.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-right font-heading text-sm font-bold">
                      {animal.weight}
                    </td>
                    <td className="px-3 py-3 text-xs text-[#444840]">{animal.lineage}</td>
                    <td className="px-3 py-3 text-right">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          aria-label={`View ${animal.name}`}
                          className={`rounded-lg p-1.5 text-[#444840] hover:bg-[#f0eee8] ${focus}`}
                        >
                          <Eye aria-hidden="true" size={16} />
                        </button>
                        <button
                          type="button"
                          aria-label={`History for ${animal.name}`}
                          className={`rounded-lg p-1.5 text-[#444840] hover:bg-[#f0eee8] ${focus}`}
                        >
                          <History aria-hidden="true" size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {visible.length === 0 ? (
              <div className="flex flex-col items-center gap-2 px-4 py-12 text-center">
                <PawPrint aria-hidden="true" size={32} className="text-[#444840]" />
                <h2 className="font-heading text-base font-bold">No matching livestock found</h2>
                <p className="max-w-md text-sm text-[#444840]">
                  No illustrative animal matches the current search or filter selection. Adjust the
                  filters or search again.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setFilterValues(filters.map((filter) => filter.options[0]));
                  }}
                  className={`rounded-lg bg-[#eae8e2] px-4 py-2 text-sm font-semibold ${focus}`}
                >
                  Clear filters
                </button>
              </div>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 bg-[#f5f3ed] px-4 py-3 text-xs text-[#444840]">
            <span>
              Showing {visible.length} of {animals.length} illustrative records
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="rounded-lg bg-[#eae8e2] px-2.5 py-1 opacity-60"
              >
                Previous
              </button>
              <button
                type="button"
                aria-current="page"
                className={`rounded-lg bg-[#2f4126] px-2.5 py-1 font-semibold text-white ${focus}`}
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="rounded-lg bg-[#eae8e2] px-2.5 py-1 opacity-60"
              >
                Next
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            ['Ear-tag verification', 'Illustrative registry coverage note.'],
            ['Veterinary protocol', 'Routine checks shown as informational text only.'],
            ['Herd weight overview', 'Illustrative average; no growth formula applied.'],
          ].map(([title, detail]) => (
            <div
              key={title}
              className="rounded-xl border border-[#c4c8bd]/50 bg-white p-4 shadow-sm"
            >
              <p className="font-heading text-sm font-bold text-[#1b1c18]">{title}</p>
              <p className="mt-1 text-xs text-[#444840]">{detail}</p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
