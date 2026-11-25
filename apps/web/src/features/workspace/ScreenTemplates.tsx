import { AlertCircle, Download, FileText, LoaderCircle, Search } from 'lucide-react';
import { getDataSource } from '@smartfarm/data-source';
import { useState, type FormEvent } from 'react';
import { useScreenData } from '../../app/useScreenData';
import { usePrototypeRole } from '../../auth/prototype-role';
import { LocalDraftStatus } from '../../components/LocalDraftStatus';
import { IllustrativeChart } from '../../components/IllustrativeChart';
import type {
  PrototypeScreenData,
  ScreenDataRequest,
  ScreenField,
  ScreenMetric,
  ScreenRow,
} from '../../data/types';

function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <div className="sf-state">
      <h3>{title}</h3>
      <p>{body}</p>
    </div>
  );
}

function MetricGrid({ metrics }: { metrics: readonly ScreenMetric[] }) {
  return (
    <div className="sf-grid sf-grid--4">
      {metrics.map((metric) => (
        <div className="sf-kpi" key={metric.label}>
          <div className="sf-kpi__label">
            <FileText size={16} aria-hidden="true" />
            {metric.label}
          </div>
          <div className="sf-kpi__value">{metric.value}</div>
          {metric.unit ? <div className="sf-kpi__unit">{metric.unit}</div> : null}
        </div>
      ))}
    </div>
  );
}

function StatusBadge({ label, tone }: { label: string; tone: string }) {
  return <span className={`sf-badge sf-badge--${tone}`}>{label}</span>;
}

function RecordTable({
  columns,
  rows,
  emptyTitle = 'No results',
}: {
  columns: readonly string[];
  rows: readonly ScreenRow[];
  emptyTitle?: string;
}) {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLowerCase();
  const visibleRows = normalized
    ? rows.filter((row) => row.cells.some((cell) => cell.toLowerCase().includes(normalized)))
    : rows;

  return (
    <div className="sf-panel">
      <div className="sf-panel__head">
        <h2>Structured records</h2>
        <label className="sf-toolbar" style={{ marginBottom: 0 }}>
          <Search size={16} aria-hidden="true" />
          <span className="sf-field">
            <span className="sf-field__hint">Search this preview</span>
            <input
              className="sf-input"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter rows"
            />
          </span>
        </label>
      </div>

      {visibleRows.length === 0 ? (
        <EmptyState title={emptyTitle} body="No visible row matches this filter." />
      ) : (
        <div className="sf-table-wrap">
          <table className="sf-table">
            <thead>
              <tr>
                {columns.map((column) => (
                  <th scope="col" key={column}>
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visibleRows.map((row, index) => (
                <tr key={`${row.cells.join('-')}-${index}`}>
                  {row.cells.map((cell, cellIndex) => (
                    <td key={`${cell}-${cellIndex}`}>
                      {cellIndex === 3 && row.status ? (
                        <StatusBadge label={row.status.label} tone={row.status.tone} />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: ScreenField;
  value: string;
  onChange: (value: string) => void;
}) {
  const id = `field-${field.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="sf-field" key={field.label}>
      <label htmlFor={id}>
        {field.label} {field.required ? <span className="sf-field__required">*</span> : null}
      </label>
      {field.control === 'textarea' ? (
        <textarea
          id={id}
          className="sf-textarea"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      ) : (
        <input
          id={id}
          className="sf-input"
          type={field.control === 'password' ? 'password' : field.control}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      )}
      {field.hint ? <span className="sf-field__hint">{field.hint}</span> : null}
    </div>
  );
}

function ScreenForm({ request, data }: { request: ScreenDataRequest; data: PrototypeScreenData }) {
  const [values, setValues] = useState<Record<string, string>>({});
  const [error, setError] = useState<string>();
  const [saved, setSaved] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaved(false);
    setError(undefined);

    const missing = data.fields.find((field) => field.required && !values[field.label]?.trim());

    if (missing) {
      setError(`${missing.label} is required.`);
      return;
    }

    try {
      getDataSource().drafts().create(`${request.title} draft`);
      setSaved(true);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'This action is not available.');
    }
  };

  return (
    <div className="sf-panel">
      <div className="sf-panel__head">
        <h2>{request.title} form</h2>
        <p className="sf-panel__hint">{data.notice}</p>
      </div>

      <form className="sf-form-stack" onSubmit={handleSubmit} noValidate>
        <div className="sf-grid sf-grid--2">
          {data.fields.map((field) => (
            <FieldControl
              key={field.label}
              field={field}
              value={values[field.label] ?? ''}
              onChange={(value) => setValues((current) => ({ ...current, [field.label]: value }))}
            />
          ))}
        </div>

        {error ? (
          <p role="alert" style={{ color: 'var(--color-error)', margin: 0 }}>
            {error}
          </p>
        ) : null}
        {saved ? <LocalDraftStatus /> : null}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="sf-button sf-button--primary" type="submit">
            {request.template === 'login' ? 'Continue preview' : 'Save local draft'}
          </button>
          <button
            className="sf-button sf-button--secondary"
            type="button"
            onClick={() => {
              setValues({});
              setSaved(false);
              setError(undefined);
            }}
          >
            Reset form
          </button>
        </div>

        {request.template === 'login' ? (
          <p className="sf-panel__hint">
            No authentication is performed. Use the preview role selector above to choose an
            authorized role.
          </p>
        ) : null}
      </form>
    </div>
  );
}

function SectionList({ data }: { data: PrototypeScreenData }) {
  return (
    <div className="sf-grid sf-grid--2">
      {data.sections.map((section) => (
        <section className="sf-card" key={section.title}>
          <h2 className="sf-card__title">{section.title}</h2>
          <p className="sf-card__body">{section.body}</p>
        </section>
      ))}
    </div>
  );
}

function DashboardTemplate({ data }: { data: PrototypeScreenData }) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <MetricGrid metrics={data.metrics} />
      <div style={{ height: 20 }} />
      <div className="sf-grid sf-grid--2">
        <div className="sf-panel">
          <div className="sf-panel__head">
            <h2>Operational preview</h2>
          </div>
          {data.chart ? (
            <IllustrativeChart data={data.chart} />
          ) : (
            <EmptyState title="No chart" body="No chart is configured for this screen." />
          )}
        </div>
        <SectionList data={data} />
      </div>
    </>
  );
}

function ListTemplate({ data }: { data: PrototypeScreenData }) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <MetricGrid metrics={data.metrics} />
      <div style={{ height: 20 }} />
      <RecordTable columns={data.columns} rows={data.rows} />
      <SectionList data={data} />
    </>
  );
}

function FormTemplate({
  request,
  data,
}: {
  request: ScreenDataRequest;
  data: PrototypeScreenData;
}) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <ScreenForm request={request} data={data} />
      <div style={{ height: 20 }} />
      <SectionList data={data} />
    </>
  );
}

function DetailTemplate({ data }: { data: PrototypeScreenData }) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <MetricGrid metrics={data.metrics} />
      <div style={{ height: 20 }} />
      <RecordTable columns={data.columns} rows={data.rows} emptyTitle="No details" />
      <div style={{ height: 20 }} />
      <SectionList data={data} />
    </>
  );
}

function ReportTemplate({
  data,
  canUseReports,
}: {
  data: PrototypeScreenData;
  canUseReports: boolean;
}) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <MetricGrid metrics={data.metrics} />
      <div style={{ height: 20 }} />
      <div className="sf-panel">
        <div className="sf-panel__head">
          <h2>Trend preview</h2>
          <span className="sf-topbar__badge">Illustrative</span>
        </div>
        {data.chart ? (
          <IllustrativeChart data={data.chart} />
        ) : (
          <EmptyState title="No chart" body="No chart is configured for this report." />
        )}
        {canUseReports ? (
          <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
            <button className="sf-button sf-button--secondary" type="button" disabled>
              <Download size={16} aria-hidden="true" /> Export — unwired
            </button>
            <button className="sf-button sf-button--secondary" type="button" disabled>
              <FileText size={16} aria-hidden="true" /> Print — unwired
            </button>
          </div>
        ) : (
          <p className="sf-panel__hint" style={{ marginTop: 16, marginBottom: 0 }}>
            Report export and print are not available for this preview role.
          </p>
        )}
      </div>
      <div style={{ height: 20 }} />
      <RecordTable columns={data.columns} rows={data.rows} />
      <div style={{ height: 20 }} />
      <SectionList data={data} />
    </>
  );
}

function SettingsTemplate({
  request,
  data,
}: {
  request: ScreenDataRequest;
  data: PrototypeScreenData;
}) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <ScreenForm request={request} data={data} />
      <div style={{ height: 20 }} />
      <SectionList data={data} />
    </>
  );
}

function StateTemplate({ data }: { data: PrototypeScreenData }) {
  return (
    <>
      <div className="sf-notice">{data.notice}</div>
      <div className="sf-panel">
        <div className="sf-panel__head">
          <h2>State preview</h2>
          <AlertCircle size={18} aria-hidden="true" />
        </div>
        {data.sections.map((section) => (
          <div key={section.title} style={{ marginBottom: 16 }}>
            <h3 className="sf-card__title">{section.title}</h3>
            <p className="sf-card__body">{section.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export function ScreenTemplateRenderer({ request }: { request: ScreenDataRequest }) {
  const { role } = usePrototypeRole();
  const canUseReports = role === 'farm-admin' || role === 'super-admin';
  const { data, error } = useScreenData(request);

  if (error) {
    return (
      <div className="sf-state" role="alert">
        <h3>Screen data unavailable</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="sf-state" role="status">
        <LoaderCircle size={24} aria-hidden="true" className="sf-spin" />
        <h3>Loading screen layout…</h3>
      </div>
    );
  }

  switch (request.template) {
    case 'dashboard':
      return <DashboardTemplate data={data} />;
    case 'form':
    case 'login':
      return <FormTemplate request={request} data={data} />;
    case 'detail':
      return <DetailTemplate data={data} />;
    case 'report':
      return <ReportTemplate data={data} canUseReports={canUseReports} />;
    case 'settings':
      return <SettingsTemplate request={request} data={data} />;
    case 'state':
      return <StateTemplate data={data} />;
    case 'list':
    default:
      return <ListTemplate data={data} />;
  }
}
