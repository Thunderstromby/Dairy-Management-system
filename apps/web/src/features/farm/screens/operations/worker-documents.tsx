import { useState } from 'react';
import { Download, Eye, FileText, FolderLock, LockKeyhole, Search, Upload, X } from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Field,
  FilterBar,
  Notice,
  PageHeader,
  Pagination,
  PreviewNotice,
  SelectField,
  TextField,
  inputClass,
  primaryButtonClass,
  secondaryButtonClass,
  selectClass,
} from './OperationsPrimitives';

const documents = [
  {
    id: 'Illustrative',
    worker: 'Worker A',
    category: 'Identity',
    title: 'Identity document (front / back)',
    date: 'Illustrative',
    status: 'Verified',
  },
  {
    id: 'Illustrative',
    worker: 'Worker A',
    category: 'Agreement',
    title: 'Employment agreement',
    date: 'Illustrative',
    status: 'Verified',
  },
  {
    id: 'Illustrative',
    worker: 'Worker B',
    category: 'Certificate',
    title: 'Farm safety certificate',
    date: 'Illustrative',
    status: 'Illustrative',
  },
  {
    id: 'Illustrative',
    worker: 'Worker C',
    category: 'Identity',
    title: 'Identity document',
    date: 'Illustrative',
    status: 'Pending',
  },
] as const;

export function WorkerDocumentsScreen() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All types');
  const [showUpload, setShowUpload] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const visible = documents.filter((doc) => {
    const matches =
      doc.title.toLowerCase().includes(search.trim().toLowerCase()) ||
      doc.worker.toLowerCase().includes(search.trim().toLowerCase());
    return matches && (category === 'All types' || doc.category === category);
  });

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workers / Worker Documents"
        title="Worker Documents & Statutory Verification"
        description="Illustrative document metadata register. No public URLs, downloads or file storage are provided in this preview."
        badge="Farm Admin"
        actions={
          <button
            type="button"
            className={primaryButtonClass}
            onClick={() => setShowUpload((value) => !value)}
          >
            <Upload size={16} aria-hidden="true" /> Upload document (local preview)
          </button>
        }
      />
      <PreviewNotice />
      <Notice title="Private metadata only" variant="restricted">
        <FolderLock size={12} className="mr-1 inline" aria-hidden="true" />
        Worker documents are private records with opaque references. Workers have no login access;
        no permanent public URL or file download is produced here.
      </Notice>

      {showUpload ? (
        <Card
          title="Upload Permitted Worker Document"
          subtitle="Illustrative form — no file is uploaded"
          actions={
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setShowUpload(false)}
            >
              <X size={16} aria-hidden="true" /> Close
            </button>
          }
        >
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
            <SelectField
              id="document-worker"
              label="Target worker"
              value="Worker A"
              onChange={() => undefined}
              options={['Worker A', 'Worker B', 'Worker C']}
              required
            />
            <SelectField
              id="document-category"
              label="Document category"
              value="Identity"
              onChange={() => undefined}
              options={['Identity', 'Agreement', 'Certificate', 'Other permitted']}
              required
            />
            <TextField
              id="document-identity"
              label="Identity reference"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative — redacted"
              required
              hint="Duplicate identity references are rejected by the server in the real system."
            />
            <TextField
              id="document-title"
              label="Document title / description"
              value=""
              onChange={() => undefined}
              placeholder="Illustrative title"
              required
            />
            <TextField
              id="document-date"
              label="Issue / execution date"
              type="date"
              value=""
              onChange={() => undefined}
              required
            />
            <Field
              label="File attachment"
              htmlFor="document-file"
              hint="Supported formats and size limits are enforced by the server; no upload occurs here."
            >
              <input id="document-file" type="file" className={inputClass + ' h-auto py-2'} />
            </Field>
            <div className="flex items-end gap-2 sm:col-span-2">
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setShowUpload(false)}
              >
                Cancel
              </button>
              <button type="submit" className={primaryButtonClass}>
                Save metadata (local preview)
              </button>
            </div>
          </form>
        </Card>
      ) : null}

      <div className="mt-6">
        <FilterBar>
          <div className="min-w-[220px] flex-1">
            <label
              htmlFor="document-search"
              className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#444840]"
            >
              Search documents
            </label>
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-3 text-[#444840]"
                aria-hidden="true"
              />
              <input
                id="document-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search worker or document title"
                className={inputClass + ' pl-9'}
              />
            </div>
          </div>
          <div className="w-full sm:w-52">
            <Field label="Document type" htmlFor="document-filter-type">
              <select
                id="document-filter-type"
                className={selectClass}
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              >
                {['All types', 'Identity', 'Agreement', 'Certificate', 'Other permitted'].map(
                  (option) => (
                    <option key={option}>{option}</option>
                  ),
                )}
              </select>
            </Field>
          </div>
        </FilterBar>
        <DataTable
          headers={[
            'Record ID',
            'Worker',
            'Category',
            'Document title',
            'Recorded date',
            'Status',
            'Actions',
          ]}
          caption="Illustrative document metadata — no files, URLs or checksums are exposed"
        >
          {visible.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-10 text-center text-[#444840]">
                No illustrative document metadata matches these filters.
              </td>
            </tr>
          ) : (
            visible.map((doc, index) => (
              <tr key={`${doc.id}-${index}`}>
                <td className="px-4 py-3 font-semibold text-[#2f4126]">{doc.id}</td>
                <td className="px-4 py-3">{doc.worker}</td>
                <td className="px-4 py-3">
                  <Badge tone="neutral">{doc.category}</Badge>
                </td>
                <td className="px-4 py-3">
                  <FileText size={14} className="mr-1 inline" aria-hidden="true" />
                  {doc.title}
                </td>
                <td className="px-4 py-3">{doc.date}</td>
                <td className="px-4 py-3">
                  <Badge
                    tone={
                      doc.status === 'Verified'
                        ? 'secondary'
                        : doc.status === 'Pending'
                          ? 'tertiary'
                          : 'outline'
                    }
                  >
                    {doc.status}
                  </Badge>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                      aria-label={`Inspect ${doc.title} metadata`}
                      onClick={() => setPreview(doc.title)}
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      type="button"
                      className="rounded p-1.5 text-[#444840] hover:bg-[#f0eee8]"
                      aria-label="Download is unavailable in this preview"
                      disabled
                    >
                      <Download size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </DataTable>
        <Pagination page={page} pageCount={4} onChange={setPage} />
      </div>

      {preview ? (
        <div className="mt-6">
          <Card
            title="Document Inspection"
            subtitle={`Illustrative · ${preview}`}
            actions={
              <button
                type="button"
                className={secondaryButtonClass}
                onClick={() => setPreview(null)}
              >
                <X size={16} aria-hidden="true" /> Close
              </button>
            }
          >
            <p className="font-inter text-sm text-[#444840]">
              <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
              Only metadata is shown. File content, watermarks and hashes from the source export are
              intentionally omitted; no document is opened or downloaded.
            </p>
          </Card>
        </div>
      ) : null}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no document metadata is stored.
      </p>
    </div>
  );
}

export default WorkerDocumentsScreen;
