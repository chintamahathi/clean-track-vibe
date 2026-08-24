import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Calendar, Camera, CheckCircle2, Clock4, MapPin, Plus, TriangleAlert, Truck } from "lucide-react";
import { useState } from "react";
import { StepTimeline } from "@/components/cleantrack/timeline";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { complaints, complaintTimeline, type Complaint, type ComplaintStatus } from "@/lib/data";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Missed your trash? — ESWACH" },
      { name: "description", content: "Report a missed collection, skipped street, or vehicle issue in seconds." },
    ],
  }),
  component: Complaints,
});

const STATUS_PILL: Record<ComplaintStatus, { status: "scheduled"|"nearby"|"on-route"|"completed"; label: string }> = {
  new: { status: "scheduled", label: "NEW" }, assigned: { status: "nearby", label: "ASSIGNED" },
  "in-progress": { status: "on-route", label: "IN PROGRESS" }, resolved: { status: "completed", label: "RESOLVED" },
};

const MISSED_OPTIONS = [
  { id: "no-arrive", emoji: "🚛", label: "TRUCK DIDN'T COME",    hint: "The vehicle never reached your street" },
  { id: "skipped",   emoji: "📍", label: "STREET WAS SKIPPED",   hint: "Truck passed nearby but missed your lane" },
  { id: "missed",    emoji: "🗑", label: "COLLECTION WAS MISSED", hint: "Truck arrived but waste wasn't collected" },
  { id: "breakdown", emoji: "🔧", label: "VEHICLE ISSUE",         hint: "A mechanical problem stopped the route" },
  { id: "other",     emoji: "⚠",  label: "OTHER",                hint: "Something else went wrong" },
] as const;
type MissedOptionId = (typeof MISSED_OPTIONS)[number]["id"];

function NewComplaintFlow({ onDone }: { onDone: () => void }) {
  const [reason, setReason] = useState<MissedOptionId | null>(null);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="animate-sheet-up mt-5 rounded-[2rem] bg-pale p-7 text-center shadow-card">
        <CheckCircle2 className="mx-auto size-12 text-emerald" strokeWidth={2.2} />
        <h2 className="mt-4 text-xl font-extrabold tracking-tight text-forest">Report received</h2>
        <p className="mx-auto mt-2 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">A backup vehicle has been queued. We'll notify you with a new ETA shortly.</p>
        <button type="button" onClick={onDone} className="mt-6 rounded-2xl bg-forest px-6 py-3 text-xs font-extrabold tracking-wide text-ivory">DONE</button>
      </div>
    );
  }

  return (
    <div className="animate-float-in mt-5 space-y-3 pb-6">
      {MISSED_OPTIONS.map((opt) => {
        const active = reason === opt.id;
        return (
          <button key={opt.id} type="button" onClick={() => setReason(opt.id)}
            className={`flex w-full items-center gap-4 rounded-3xl p-4 text-left transition-all ${active ? "bg-forest text-ivory shadow-float scale-[1.01]" : "bg-card text-forest shadow-card hover:scale-[1.005]"}`}>
            <span className={`flex size-12 shrink-0 items-center justify-center rounded-2xl text-xl ${active ? "bg-lime/20" : "bg-amber-soft"}`}>{opt.emoji}</span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold">{opt.label}</span>
              <span className={`block text-[11px] ${active ? "text-ivory/60" : "text-muted-foreground"}`}>{opt.hint}</span>
            </span>
            <span className={`ml-auto size-5 shrink-0 rounded-full border-2 transition-colors ${active ? "border-lime bg-lime" : "border-forest/20"}`} />
          </button>
        );
      })}
      {/* Description — saved with the report to the backend */}
      <div className="pt-1">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe what happened..."
          rows={3}
          className="w-full resize-none rounded-2xl bg-card px-4 py-3 text-sm font-medium text-forest placeholder:text-muted-foreground shadow-card ring-1 ring-forest/8 focus:outline-none focus:ring-2 focus:ring-emerald/40"
        />
      </div>
      <button type="button" disabled={!reason} onClick={() => setSubmitted(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-all enabled:hover:scale-[1.01] enabled:active:scale-[0.98] disabled:opacity-40">
        REPORT MISSED COLLECTION <ArrowRight className="size-4" strokeWidth={2.6} />
      </button>
    </div>
  );
}

function Complaints() {
  const [selected, setSelected] = useState<Complaint | null>(null);
  const [showNewForm, setShowNewForm] = useState(false);
  if (selected) return <ComplaintDetail complaint={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="px-5 pt-6">
      <header>
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-emerald">REPORT A PROBLEM</p>
        <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight text-forest">Missed your trash?</h1>
        <p className="mt-1 text-xs font-medium text-muted-foreground">Tell us what happened — we'll send a backup and keep you updated.</p>
      </header>

      {!showNewForm ? (
        <button type="button" onClick={() => setShowNewForm(true)}
          className="animate-float-in mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]">
          <TriangleAlert className="size-4" /> REPORT MISSED COLLECTION
        </button>
      ) : (
        <NewComplaintFlow onDone={() => setShowNewForm(false)} />
      )}

      {!showNewForm && (
        <>
          <p className="mt-6 text-[10px] font-extrabold tracking-[0.18em] text-forest/50">PREVIOUS REPORTS</p>
          <ul className="mt-3 space-y-3 pb-6">
            {complaints.map((c, i) => {
              const pill = STATUS_PILL[c.status];
              return (
                <li key={c.id}>
                  <button type="button" onClick={() => setSelected(c)}
                    className="animate-float-in w-full rounded-[1.75rem] bg-card p-5 text-left shadow-card transition-transform hover:scale-[1.01]"
                    style={{ animationDelay: `${i * 60}ms` }}>
                    <div className="flex items-center justify-between">
                      <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">REPORT #{c.id}</p>
                      <StatusPill status={pill.status} label={pill.label} />
                    </div>
                    <p className="mt-2 text-base font-extrabold tracking-tight text-forest">{c.category}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground"><MapPin className="size-3.5 text-emerald" /> {c.location}</p>
                    <div className="mt-3 flex items-center justify-between border-t border-forest/8 pt-3 text-[11px] font-semibold text-muted-foreground">
                      <span>{c.time}</span>
                      {c.hasPhoto && <span className="flex items-center gap-1 text-forest/60"><Camera className="size-3.5" /> Photo</span>}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}

function ComplaintDetail({ complaint, onBack }: { complaint: Complaint; onBack: () => void }) {
  const [cancelled, setCancelled] = useState(false);
  const pill = STATUS_PILL[complaint.status];
  return (
    <div className="px-5 pt-6">
      <SubHeader title={`Report #${complaint.id}`} onBack={onBack} />
      <div className="mt-1 ml-14">
        <h2 className="text-lg font-extrabold tracking-tight text-forest">{complaint.category}</h2>
        <div className="mt-1 inline-block"><StatusPill status={pill.status} label={cancelled ? "CANCELLED" : pill.label} /></div>
      </div>
      <section className="animate-float-in mt-5 rounded-[2rem] bg-card p-6 shadow-card">
        <StepTimeline steps={cancelled ? complaintTimeline.map((s) => ({ ...s, state: "pending" as const })) : complaintTimeline} />
      </section>
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-forest p-4 text-ivory shadow-float">
          <Truck className="size-5 text-lime" />
          <p className="mt-2 text-sm font-extrabold">{complaint.assigned?.split(" · ")[0]}</p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-ivory/45">ASSIGNED</p>
        </div>
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <Clock4 className="size-5 text-emerald" />
          <p className="mt-2 text-sm font-extrabold text-forest">{complaint.expected}</p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-muted-foreground">EXPECTED RESOLUTION</p>
        </div>
      </section>
      {complaint.hasPhoto && (
        <section className="mt-4 rounded-[2rem] bg-pale p-5">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-forest/50">ATTACHED EVIDENCE</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-lime"><Camera className="size-6" /></span>
            <div className="space-y-1 text-[11px] font-semibold text-muted-foreground">
              <p className="flex items-center gap-1.5"><MapPin className="size-3.5 text-emerald" /> {complaint.location}</p>
              <p className="flex items-center gap-1.5"><Calendar className="size-3.5 text-emerald" /> Aug 24<Clock4 className="ml-1 size-3.5 text-emerald" /> 6:42 PM — auto-attached</p>
            </div>
          </div>
        </section>
      )}
      <div className="mt-5 space-y-2.5 pb-6">
        <button type="button" className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.01]">
          <Plus className="size-4" strokeWidth={2.6} /> ADD INFORMATION
        </button>
        {!cancelled && complaint.status !== "resolved" && (
          <button type="button" onClick={() => setCancelled(true)} className="w-full rounded-2xl bg-coral-soft py-4 text-sm font-extrabold tracking-[0.06em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.01]">
            CANCEL REPORT
          </button>
        )}
      </div>
    </div>
  );
}
