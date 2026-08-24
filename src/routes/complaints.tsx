import { createFileRoute } from "@tanstack/react-router";
import { Calendar, Camera, Clock4, MapPin, Plus, Truck, UserRound } from "lucide-react";
import { useState } from "react";
import { StepTimeline } from "@/components/cleantrack/timeline";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { complaints, complaintTimeline, type Complaint, type ComplaintStatus } from "@/lib/data";

export const Route = createFileRoute("/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints — CleanTrack" },
      { name: "description", content: "Track every complaint from submitted to confirmed — with assigned vehicles and expected resolution." },
      { property: "og:title", content: "Complaints — CleanTrack" },
      { property: "og:description", content: "Full complaint lifecycle with live status timeline." },
    ],
  }),
  component: Complaints,
});

const STATUS_PILL: Record<ComplaintStatus, { status: "scheduled" | "nearby" | "on-route" | "completed"; label: string }> = {
  new: { status: "scheduled", label: "NEW" },
  assigned: { status: "nearby", label: "ASSIGNED" },
  "in-progress": { status: "on-route", label: "IN PROGRESS" },
  resolved: { status: "completed", label: "RESOLVED" },
};

function Complaints() {
  const [selected, setSelected] = useState<Complaint | null>(null);

  if (selected) return <ComplaintDetail complaint={selected} onBack={() => setSelected(null)} />;

  return (
    <div className="px-5 pt-6">
      <SubHeader title="Complaints" subtitle="Every report, tracked to resolution." />

      <ul className="mt-5 space-y-3 pb-4">
        {complaints.map((c, i) => {
          const pill = STATUS_PILL[c.status];
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setSelected(c)}
                className="animate-float-in w-full rounded-[1.75rem] bg-card p-5 text-left shadow-card transition-transform hover:scale-[1.01]"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">COMPLAINT #{c.id}</p>
                  <StatusPill status={pill.status} label={pill.label} />
                </div>
                <p className="mt-2 text-base font-extrabold tracking-tight text-forest">{c.category}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="size-3.5 text-emerald" /> {c.location}
                </p>
                <div className="mt-3 flex items-center justify-between border-t border-forest/8 pt-3 text-[11px] font-semibold text-muted-foreground">
                  <span>{c.time}</span>
                  {c.hasPhoto && (
                    <span className="flex items-center gap-1 text-forest/60">
                      <Camera className="size-3.5" /> Photo
                    </span>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ComplaintDetail({ complaint, onBack }: { complaint: Complaint; onBack: () => void }) {
  const [cancelled, setCancelled] = useState(false);
  const pill = STATUS_PILL[complaint.status];

  return (
    <div className="px-5 pt-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back to complaints"
          className="flex size-11 items-center justify-center rounded-full bg-card text-forest shadow-card"
        >
          ←
        </button>
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">COMPLAINT #{complaint.id}</p>
          <h1 className="text-xl font-extrabold tracking-tight text-forest">{complaint.category}</h1>
        </div>
        <div className="ml-auto">
          <StatusPill status={pill.status} label={cancelled ? "CANCELLED" : pill.label} />
        </div>
      </div>

      {/* timeline */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-card p-6 shadow-card">
        <StepTimeline steps={cancelled ? complaintTimeline.map((s) => ({ ...s, state: "pending" as const })) : complaintTimeline} />
      </section>

      {/* assigned + expected */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-forest p-4 text-ivory shadow-float">
          <Truck className="size-5 text-lime" />
          <p className="mt-2 text-sm font-extrabold">{complaint.assigned?.split(" · ")[0]}</p>
          <p className="flex items-center gap-1 text-[11px] text-ivory/55">
            <UserRound className="size-3" /> {complaint.assigned?.split(" · ")[1]}
          </p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-ivory/45">ASSIGNED</p>
        </div>
        <div className="rounded-3xl bg-card p-4 shadow-card">
          <Clock4 className="size-5 text-emerald" />
          <p className="mt-2 text-sm font-extrabold text-forest">{complaint.expected}</p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-muted-foreground">EXPECTED RESOLUTION</p>
        </div>
      </section>

      {/* attached evidence */}
      {complaint.hasPhoto && (
        <section className="mt-4 rounded-[2rem] bg-pale p-5">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-forest/50">ATTACHED EVIDENCE</p>
          <div className="mt-3 flex items-center gap-3">
            <span className="flex size-14 items-center justify-center rounded-2xl bg-forest text-lime">
              <Camera className="size-6" />
            </span>
            <div className="space-y-1 text-[11px] font-semibold text-muted-foreground">
              <p className="flex items-center gap-1.5">
                <MapPin className="size-3.5 text-emerald" /> {complaint.location}
              </p>
              <p className="flex items-center gap-1.5">
                <Calendar className="size-3.5 text-emerald" /> Aug 24
                <Clock4 className="ml-1 size-3.5 text-emerald" /> 6:42 PM — auto-attached
              </p>
            </div>
          </div>
        </section>
      )}

      {/* actions */}
      <div className="mt-5 space-y-2.5 pb-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.01]"
        >
          <Plus className="size-4" strokeWidth={2.6} /> ADD INFORMATION
        </button>
        {!cancelled && complaint.status !== "resolved" && (
          <button
            type="button"
            onClick={() => setCancelled(true)}
            className="w-full rounded-2xl bg-coral-soft py-4 text-sm font-extrabold tracking-[0.06em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.01]"
          >
            CANCEL COMPLAINT
          </button>
        )}
      </div>
    </div>
  );
}
