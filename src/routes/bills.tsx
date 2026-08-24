import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, CreditCard, FileText, Receipt } from "lucide-react";
import { SubHeader } from "@/components/cleantrack/sub-header";

export const Route = createFileRoute("/bills")({
  head: () => ({
    meta: [
      { title: "Bills & Payments — CleanTrack" },
      { name: "description", content: "View your collection billing status, payment history, and account balance." },
    ],
  }),
  component: Bills,
});

function Bills() {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Bills & Payments" subtitle="Your collection billing account" />

      <section className="animate-float-in relative mt-5 overflow-hidden rounded-[2rem] bg-forest p-6 text-ivory shadow-float">
        <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald/25 blur-2xl" />
        <div className="relative">
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">CURRENT BALANCE</p>
          <p className="mt-2 text-5xl font-extrabold tracking-tight text-ivory">₹0</p>
          <p className="mt-1 text-xs font-semibold text-ivory/55">As of August 2026</p>
        </div>
      </section>

      <section className="animate-float-in mt-4 rounded-[2rem] bg-card p-6 shadow-card" style={{ animationDelay: "60ms" }}>
        <div className="flex items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
            <CheckCircle2 className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold text-forest">Payment Status</p>
            <p className="text-xs font-semibold text-emerald">✓ No pending payments</p>
          </div>
        </div>
      </section>

      <section className="animate-float-in mt-4 flex flex-col items-center justify-center rounded-[2rem] bg-pale py-10 text-center shadow-card" style={{ animationDelay: "100ms" }}>
        <span className="flex size-14 items-center justify-center rounded-full bg-emerald-soft text-emerald">
          <CreditCard className="size-7" />
        </span>
        <h2 className="mt-4 text-base font-extrabold tracking-tight text-forest">NO PENDING PAYMENTS</h2>
        <p className="mx-auto mt-2 max-w-[28ch] text-xs leading-relaxed text-muted-foreground">
          Your waste collection account is up to date. Billing details will appear here when available.
        </p>
      </section>

      <section className="animate-float-in mt-4 space-y-2.5 pb-6" style={{ animationDelay: "140ms" }}>
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">ACCOUNT DETAILS</p>
        {[
          { label: "Service",        value: "Doorstep waste collection" },
          { label: "Billing cycle",  value: "Monthly" },
          { label: "Service area",   value: "Madhapur, Ward 103" },
          { label: "Last bill date", value: "Aug 1, 2026" },
          { label: "Next bill date", value: "Sep 1, 2026" },
        ].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-3xl bg-card px-5 py-4 shadow-card">
            <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
            <span className="text-xs font-extrabold text-forest">{row.value}</span>
          </div>
        ))}
        <div className="mt-2 rounded-[2rem] bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-forest/50">
            <Receipt className="size-4" />
            <p className="text-[10px] font-extrabold tracking-[0.18em]">PAYMENT HISTORY</p>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center py-6 text-center">
            <FileText className="size-8 text-forest/20" />
            <p className="mt-2 text-xs font-semibold text-muted-foreground">No payment history yet.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
