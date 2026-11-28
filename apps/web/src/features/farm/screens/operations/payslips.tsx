import { useState } from 'react';
import { Download, FileText, LockKeyhole, Printer, ReceiptText, ShieldCheck } from 'lucide-react';
import {
  Badge,
  Card,
  Notice,
  PageHeader,
  PreviewNotice,
  SelectField,
  secondaryButtonClass,
} from './OperationsPrimitives';

export function PayslipsScreen() {
  const [worker, setWorker] = useState('Worker A');
  const [period, setPeriod] = useState('Illustrative period');
  const [status, setStatus] = useState('Pending');

  return (
    <div className="min-h-screen bg-[#fbf9f3] p-4 font-inter sm:p-6 lg:p-8">
      <PageHeader
        eyebrow="Workforce & Finance / Payroll / Payslips"
        title="Worker Payslips & Disbursement Vouchers"
        description="Structured illustrative payslip preview for Farm Admin review. No worker self-service exists."
        badge="Farm Admin only"
        actions={
          <>
            <button type="button" className={secondaryButtonClass} disabled>
              <Printer size={16} aria-hidden="true" /> Print (unwired)
            </button>
            <button type="button" className={secondaryButtonClass} disabled>
              <Download size={16} aria-hidden="true" /> Download (unwired)
            </button>
          </>
        }
      />
      <PreviewNotice />
      <Notice title="No calculated pay is displayed" variant="restricted">
        <LockKeyhole size={12} className="mr-1 inline" aria-hidden="true" />
        Salary, attendance, advances and deductions lines are illustrative metadata only. Net
        payable is shown as &ldquo;Not computed&rdquo; because payroll formulas are unresolved. No
        worker can view or download a payslip.
      </Notice>

      <Card
        title="Payslip Selection"
        subtitle="Illustrative selectors — switching updates this preview only"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <SelectField
            id="payslip-worker"
            label="Select farm worker"
            value={worker}
            onChange={setWorker}
            options={['Worker A', 'Worker B', 'Worker C']}
          />
          <SelectField
            id="payslip-period"
            label="Payroll cycle & date range"
            value={period}
            onChange={setPeriod}
            options={['Illustrative period', 'Illustrative prior period']}
          />
          <SelectField
            id="payslip-status"
            label="Payment status"
            value={status}
            onChange={setStatus}
            options={['Pending', 'Paid']}
          />
        </div>
      </Card>

      <div className="mt-6">
        <Card
          title="Payslip Preview"
          subtitle={`Illustrative voucher · ${worker} · ${period}`}
          actions={<Badge tone={status === 'Paid' ? 'secondary' : 'tertiary'}>{status}</Badge>}
        >
          <div className="rounded-xl border border-[#c4c8bd] bg-[#fbf9f3] p-5">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#c4c8bd] pb-4">
              <div>
                <p className="font-heading text-lg font-bold text-[#2f4126]">
                  Illustrative farm voucher
                </p>
                <p className="mt-1 font-inter text-xs text-[#444840]">
                  Farm-configured currency · illustrative period
                </p>
              </div>
              <ReceiptText size={28} className="text-[#46583b]" aria-hidden="true" />
            </div>

            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Worker</dt>
                <dd className="font-semibold">{worker}</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Identity reference</dt>
                <dd>Redacted</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Salary structure</dt>
                <dd>Illustrative</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Attendance context</dt>
                <dd>Illustrative</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Advances</dt>
                <dd>Not computed</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Deductions</dt>
                <dd>Not computed</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Recorded by</dt>
                <dd>Farm Admin</dd>
              </div>
              <div className="flex justify-between border-b border-[#c4c8bd] pb-2">
                <dt className="text-[#444840]">Net payable</dt>
                <dd className="font-bold text-[#ba1a1a]">Not computed</dd>
              </div>
            </dl>

            <div className="mt-6 border-t border-[#c4c8bd] pt-4">
              <p className="flex items-center gap-2 font-inter text-sm text-[#444840]">
                <ShieldCheck size={16} className="text-[#46583b]" aria-hidden="true" /> Authorized
                by Farm Admin (illustrative)
              </p>
              <p className="mt-3 font-inter text-xs leading-relaxed text-[#444840]">
                <FileText size={12} className="mr-1 inline" aria-hidden="true" />
                Workers have no login account, self-service portal or digital voucher download.
                Print and export remain unwired in this preview.
              </p>
            </div>
          </div>
        </Card>
      </div>
      <p className="mt-4 font-inter text-xs text-[#444840]">
        Local preview only — no voucher is generated, printed or stored.
      </p>
    </div>
  );
}

export default PayslipsScreen;
