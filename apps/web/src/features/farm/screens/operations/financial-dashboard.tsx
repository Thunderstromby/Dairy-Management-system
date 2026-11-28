import { useState } from 'react';
import {
  ChartColumn,
  CircleAlert,
  Download,
  LockKeyhole,
  ReceiptText,
  TrendingUp,
  Wallet,
} from 'lucide-react';
import {
  Badge,
  Card,
  DataTable,
  EmptyState,
  Notice,
  PageHeader,
  PreviewNotice,
  SectionTitle,
  SelectField,
  secondaryButtonClass,
} from './OperationsPrimitives';

const transactions = [
  {
    date: 'Illustrative',
    ref: 'Illustrative',
    type: 'Income',
    category: 'Milk sales',
    description: 'Illustrative counterparty',
    amount: 'Illustrative',
    method: 'Illustrative',
    by: 'Farm Admin',
    status: 'Recorded',
  },
  {
    date: 'Illustrative',
    ref: 'Illustrative',
    type: 'Expense',
    category: 'Feed',
    description: 'Illustrative payee',
    amount: 'Illustrative',
    method: 'Illustrative',
    by: 'Farm Admin',
    status: 'Recorded',
  },
  {
    date: 'Illustrative',
    ref: 'Illustrative',
    type: 'Expense',
    category: 'Utilities',
    description: 'Illustrative payee',
    amount: 'Illustrative',
    method: 'Illustrative',
    by: 'Farm Admin',
    status: 'Recorded',
  },
] as const;

export function FinancialDashboardScreen() {
  const [period, setPeriod] = useState('Illustrative month');
  const [showEmpty, setShowEmpty] = useState(false);

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Finance / Financial Dashboard"
        title="Farm Financial Performance & Operational Cash Flow"
        description="Illustrative financial overview. Profit/loss and aggregate formulas are not approved and are not computed."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass}>
              <Download size={16} aria-hidden="true" /> Export summary
            </button>
            <button
              type="button"
              className={secondaryButtonClass}
              onClick={() => setShowEmpty((value) => !value)}
            >
              {showEmpty ? 'Restore standard view' : 'Preview empty state'}
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="Direct sums only — no profit formula" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Unpaid sales, asset purchases, consumed stock and cash-versus-accrual treatment are
        unresolved. Totals below are illustrative and no net result is derived. Farm-configured
        currency applies; no conversion is performed.
      </Notice>

      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Recorded income', icon: <TrendingUp size={20} /> },
          { label: 'Recorded expenses', icon: <Wallet size={20} /> },
          { label: 'Net profit / loss', icon: <ChartColumn size={20} /> },
          { label: 'Awaiting receipt', icon: <ReceiptText size={20} /> },
        ].map((item) => (
          <Card key={item.label} title={item.label}>
            <div className="flex items-center justify-between">
              <p className="font-heading text-xl font-bold text-[#2f4126]">
                {item.label === 'Net profit / loss' ? 'Not computed' : 'Illustrative'}
              </p>
              <span className="text-[#46583b]" aria-hidden="true">
                {item.icon}
              </span>
            </div>
            <p className="mt-1 font-inter text-xs text-[#444840]">
              Illustrative period · no source total derived
            </p>
          </Card>
        ))}
      </div>

      <div className="mb-6 w-full sm:w-64">
        <SelectField
          id="finance-period"
          label="Reporting period"
          value={period}
          onChange={setPeriod}
          options={['Illustrative month', 'Illustrative week', 'Illustrative custom range']}
        />
      </div>

      {showEmpty ? (
        <EmptyState title="No verified records in the selected period">
          No illustrative income or expense entries are shown in this preview state. Totals remain
          uncomputed until approved source records and formulas exist.
        </EmptyState>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Income Stream Composition">
              <div className="space-y-3">
                {['Milk sales', 'Livestock', 'Other'].map((label) => (
                  <div key={label}>
                    <div className="flex justify-between font-inter text-xs text-[#444840]">
                      <span>{label}</span>
                      <span>Illustrative</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-[#f0eee8]" aria-hidden="true">
                      <div className="h-full w-1/3 rounded-full bg-[#46583b]" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-inter text-xs text-[#444840]">
                Text summary: illustrative composition only; no percentage is calculated.
              </p>
            </Card>
            <Card title="Operational Expense Allocation">
              <div className="space-y-3">
                {['Feed', 'Labor', 'Veterinary', 'Utilities'].map((label) => (
                  <div key={label}>
                    <div className="flex justify-between font-inter text-xs text-[#444840]">
                      <span>{label}</span>
                      <span>Illustrative</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-[#f0eee8]" aria-hidden="true">
                      <div className="h-full w-1/4 rounded-full bg-[#7a461c]" />
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-3 font-inter text-xs text-[#444840]">
                Text summary: illustrative allocation only; no share is computed.
              </p>
            </Card>
          </div>

          <div className="mt-6">
            <Card title="Direct-Sum Monthly Cash Trend">
              <div className="flex h-40 items-end gap-3" aria-hidden="true">
                {[30, 48, 36, 62, 44, 55].map((height, index) => (
                  <div key={index} className="h-full flex-1 rounded-t bg-[#d9e8c7]">
                    <div
                      className="w-full rounded-t bg-[#46583b]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-inter text-xs text-[#444840]">
                Text summary: six illustrative periods with unverified direct receipts and
                disbursements. No seasonal curve or forecast is implied.
              </p>
            </Card>
          </div>

          <div className="mt-8">
            <SectionTitle note="Illustrative records">
              Recent Verified Transaction Records
            </SectionTitle>
            <DataTable
              headers={[
                'Date & Time',
                'Reference',
                'Type',
                'Category',
                'Description',
                'Amount',
                'Method',
                'Recorded by',
                'Status',
              ]}
            >
              {transactions.map((row, index) => (
                <tr key={`${row.ref}-${index}`}>
                  <td className="px-4 py-3">{row.date}</td>
                  <td className="px-4 py-3">{row.ref}</td>
                  <td className="px-4 py-3">
                    <Badge tone={row.type === 'Income' ? 'secondary' : 'tertiary'}>
                      {row.type}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{row.category}</td>
                  <td className="px-4 py-3">{row.description}</td>
                  <td className="px-4 py-3">{row.amount}</td>
                  <td className="px-4 py-3">{row.method}</td>
                  <td className="px-4 py-3">{row.by}</td>
                  <td className="px-4 py-3">
                    <Badge tone="neutral">{row.status}</Badge>
                  </td>
                </tr>
              ))}
            </DataTable>
          </div>
        </>
      )}
      <p className="mt-4 flex items-center gap-1 font-inter text-xs text-[#444840]">
        <CircleAlert size={12} aria-hidden="true" /> Local preview only — no transaction or summary
        is persisted.
      </p>
    </div>
  );
}

export default FinancialDashboardScreen;
