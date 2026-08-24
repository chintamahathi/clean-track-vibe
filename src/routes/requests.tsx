import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  MapPinOff,
  PackageX,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { missedReasons } from "@/lib/data";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Requests — ESWACH" },
      { name: "description", content: "Report a missed collection in a few taps — no long forms." },
      { property: "og:title", content: "Requests — ESWACH" },
      { property: "og:description", content: "Report missed collections in seconds." },
    ],
  }),
  component: Requests,
});

const MISSED_ICONS: Record<string, LucideIcon> = {
  "no-arrive": Truck,
  skipped: MapPinOff,
  full: PackageX,
  breakdown: Wrench,
  other: HelpCircle,
};

function Requests() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">Requests</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">
        Report a missed collection, without the paperwork.
      </p>
      <MissedForm />
    </div>
  );
}

function MissedForm() {
  const [reason, setReason] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="animate-sheet-up mt-5 rounded-[2rem] bg-pale p-7 text-center shadow-card">
        <CheckCircle2 className="mx-auto size-12 text-emerald" strokeWidth={2.2} />
        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-forest">Report received</h2>
        <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
          No stress — a backup vehicle has been queued for your street. We'll notify you with a new ETA shortly.
        </p>
        <button
          type="button"
          onClick={() => { setDone(false); setReason(null); setDescription(""); }}
          className="mt-6 rounded-2xl bg-forest px-6 py-3 text-xs font-extrabold tracking-wide text-ivory"
        >
          DONE
        </button>
      </div>
    );
  }

  return (
    <div className="animate-float-in mt-5 space-y-3 pb-4">
      <p className="text-sm font-medium text-muted-foreground">What happened today? Tap the closest match.</p>
      {missedReasons.map((r) => {
        const Icon = MISSED_ICONS[r.id] ?? HelpCircle;
        const active = reason === r.id;
        return (
          <button
            key={r.id}
            type="button"
            onClick={() => setReason(r.id)}
            className={`flex w-full items-center gap-4 rounded-3xl p-4 text-left transition-all ${
              active ? "bg-forest text-ivory shadow-float scale-[1.01]" : "bg-card text-forest shadow-card"
            }`}
          >
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-lime/20 text-lime" : "bg-amber-soft text-[oklch(0.6_0.13_70)]"}`}>
              <Icon className="size-6" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">{r.label}</span>
              <span className={`block text-[11px] ${active ? "text-ivory/60" : "text-muted-foreground"}`}>{r.hint}</span>
            </span>
            <span className={`ml-auto size-5 shrink-0 rounded-full border-2 transition-colors ${active ? "border-lime bg-lime" : "border-forest/20"}`} />
          </button>
        );
      })}

      {/* Description — saved with the report to the backend */}
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Describe what happened..."
        rows={3}
        className="w-full resize-none rounded-2xl bg-card px-4 py-3 text-sm font-medium text-forest placeholder:text-muted-foreground shadow-card ring-1 ring-forest/8 focus:outline-none focus:ring-2 focus:ring-emerald/40"
      />

      <button
        type="button"
        disabled={!reason}
        onClick={() => setDone(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-all enabled:hover:scale-[1.01] enabled:active:scale-[0.98] disabled:opacity-40"
      >
        REPORT MISSED COLLECTION <ArrowRight className="size-4" strokeWidth={2.6} />
      </button>
    </div>
  );
}
