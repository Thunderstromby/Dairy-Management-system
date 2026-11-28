import { useState } from 'react';
import { Download, FileBarChart, LockKeyhole, Printer, ReceiptText } from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  secondaryButtonClass,
} from './OperationsPrimitives';

type Report = 'Certified monthly' | 'Custom range' | 'Print preview' | 'Zero transactions';

export function FinancialReportsScreen() {
  const [report, setReport] = useState<Report>('Certified monthly');
  const [rangeStart, setRangeStart] = useState('');
  const [rangeEnd, setRangeEnd] = useState('');

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Finance / Financial Reports"
        title="Farm Financial Reports & Statement Generator"
        description="Illustrative statement structure. Report calculations remain blocked pending approval of inclusion rules."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass} disabled>
              <Download size={16} aria-hidden="true" /> PDF (unwired)
            </button>
            <button type="button" className={secondaryButtonClass} disabled>
              <FileBarChart size={16} aria-hidden="true" /> Excel (unwired)
            </button>
            <button type="button" className={secondaryButtonClass} disabled>
              <Printer size={16} aria-hidden="true" /> Print (unwired)
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Reporting rules are unresolved" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Inclusion of unpaid milk sales, livestock purchases, consumed stock, clinical write-offs and
        cash-versus-accrual treatment is not approved. No profit/loss, total or apportionment is
        produced; automated ledger exports, tax returns and bank feeds are excluded.
      </Notice>

      <Card
        title="Reporting Period"
        subtitle="Illustrative selection — switching states changes this preview only"
      >
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Report state">
          {(
            ['Certified monthly', 'Custom range', 'Print preview', 'Zero transactions'] as const
          ).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={report === item}
              onClick={() => setReport(item)}
              className={
                report === item
                  ? 'rounded-lg bg-[#46583b] px-3 py-2 font-inter text-sm font-semibold text-white transition-colors duration-200 motion-reduce:transition-none'
                  : 'rounded-lg bg-white px-3 py-2 font-inter text-sm text-[#444840] transition-colors duration-200 hover:bg-[#f0eee8] motion-reduce:transition-none'
              }
            >
              {item}
            </button>
          ))}
        </div>
        {report === 'Custom range' ? (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <SelectField
              id="report-start"
              label="Range start"
              value={rangeStart}
              onChange={setRangeStart}
              options={['', 'Illustrative start']}
            />
            <SelectField
              id="report-end"
              label="Range end"
              value={rangeEnd}
              onChange={setRangeEnd}
              options={['', 'Illustrative end']}
            />
          </div>
        ) : null}
      </Card>

      {report === 'Zero transactions' ? (
        <div className="mt-6 rounded-xl border border-dashed border-[#c4c8bd] bg-white px-6 py-12 text-center">
          <p className="font-heading text-base font-bold text-[#1b1c18]">
            Zero verified transactions in selected range
          </p>
          <p className="mt-2 font-inter text-sm text-[#444840]">
            No illustrative report values are available for this state.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Total income', 'Total expenses', 'Net profit / loss', 'Verified records'].map(
              (label) => (
                <Card key={label} title={label}>
                  <p className="font-heading text-xl font-bold text-[#2f4126]">Not computed</p>
                  <p className="mt-1 font-inter text-xs text-[#444840]">
                    Illustrative report period
                  </p>
                </Card>
              ),
            )}
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Card title="Monthly Income vs. Expense Trajectory">
              <div className="flex h-32 items-end gap-2" aria-hidden="true">
                {[35, 52, 40, 58, 46, 64].map((height, index) => (
                  <div key={index} className="h-full flex-1 rounded-t bg-[#d9e8c7]">
                    <div
                      className="w-full rounded-t bg-[#46583b]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-inter text-xs text-[#444840]">
                Text summary: illustrative bars only; no comparison or trend is calculated.
              </p>
            </Card>
            <Card title="Cost Apportionment">
              <div className="space-y-3">
                {['Feed', 'Labor', 'Veterinary', 'Utilities'].map((label) => (
                  <div key={label}>
                    <div className="flex justify-between font-inter text-xs text-[#444840]">
                      <span>{label}</span>
                      <span>Not computed</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-[#f0eee8]" aria-hidden="true">
                      <div className="h-full w-1/4 rounded-full bg-[#7a461c]" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-inter text-xs text-[#444840]">
                Bars are illustrative; no apportionment formula is applied.
              </p>
            </Card>
          </div>

          <div className="mt-8 space-y-6">
            <Card title="Income Statement Summary">
              <div className="mb-4 flex items-center gap-2">
                <h3 className="font-heading text-base font-bold text-[#1b1c18]">
                  1. Operating revenue streams
                </h3>
                <Badge tone="outline">Illustrative</Badge>
              </div>
              <DataTable
                headers={['Stream reference', 'Description', 'Volume reference', 'Verified total']}
              >
                <tr>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Illustrative stream</td>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Not computed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Illustrative stream</td>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Not computed</td>
                </tr>
              </DataTable>
            </Card>

            <Card title="Expense Breakdown by Category">
              <DataTable
                headers={[
                  'Expense reference',
                  'Category & purpose',
                  'Receipt reference',
                  'Incurred total',
                ]}
              >
                <tr>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Illustrative purpose</td>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Not computed</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Illustrative purpose</td>
                  <td className="px-4 py-3">Illustrative</td>
                  <td className="px-4 py-3">Not computed</td>
                </tr>
              </DataTable>
            </Card>

            <Card title="Revenue by Enterprise Stream">
              <p className="font-inter text-sm text-[#444840]">
                Enterprise stream analysis is illustrative. No category total is derived.
              </p>
            </Card>
            <Card title="Audit Trail & Immutability Chain">
              <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
                <ReceiptText size={16} aria-hidden="true" /> No integrity hash or immutable seal is
                generated in this preview.
              </p>
            </Card>
          </div>
        </>
      )}
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no report is generated, exported or printed.
      </p>
    </div>
  );
}

export default FinancialReportsScreen;
