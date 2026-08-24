import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Clock4,
  HelpCircle,
  House,
  Leaf,
  MapPin,
  MapPinOff,
  PackageX,
  Recycle,
  Sofa,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import { AttachMedia } from "@/components/cleantrack/attach";
import { CityMap, HOME_POS, MapContainer } from "@/components/cleantrack/map";
import { StepTimeline } from "@/components/cleantrack/timeline";
import { missedReasons, resident, timeSlots, wasteTypes } from "@/lib/data";

export const Route = createFileRoute("/requests")({
  head: () => ({
    meta: [
      { title: "Requests — CleanTrack" },
      {
        name: "description",
        content: "Request a special pickup or report a missed collection in a few taps — no long forms.",
      },
      { property: "og:title", content: "Requests — CleanTrack" },
      { property: "og:description", content: "Request pickups and report missed collections in seconds." },
    ],
  }),
  component: Requests,
});

const WASTE_ICONS: Record<string, LucideIcon> = {
  household: House,
  recyclables: Recycle,
  garden: Leaf,
  bulky: Sofa,
};

const MISSED_ICONS: Record<string, LucideIcon> = {
  "no-arrive": Truck,
  skipped: MapPinOff,
  full: PackageX,
  breakdown: Wrench,
  other: HelpCircle,
};

function Requests() {
  const [tab, setTab] = useState<"pickup" | "missed">("pickup");
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">Requests</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">
        Special pickups & missed collections, without the paperwork.
      </p>

      {/* segmented tabs */}
      <div className="mt-4 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1">
        {(
          [
            { id: "pickup", label: "Special pickup" },
            { id: "missed", label: "Missed collection" },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full py-2.5 text-xs font-extrabold tracking-wide transition-all ${
              tab === t.id ? "bg-forest text-ivory shadow-lift" : "text-forest/55"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* request types */}
      <div className="mt-3 flex flex-wrap gap-2">
        {(
          [
            { id: "missed", label: "🚫 Missed collection", tab: "missed" },
            { id: "pickup", label: "✨ Special pickup", tab: "pickup" },
            { id: "bulk", label: "🛋 Bulk waste", tab: "pickup", waste: "bulky" },
            { id: "garden", label: "🌿 Garden waste", tab: "pickup", waste: "garden" },
          ] as const
        ).map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => setTab(r.tab)}
            className="rounded-full bg-card px-3.5 py-2 text-[11px] font-bold text-forest shadow-card transition-transform hover:scale-105"
          >
            {r.label}
          </button>
        ))}
      </div>

      {tab === "pickup" ? <PickupForm /> : <MissedForm />}
    </div>
  );
}

function PickupForm() {
  const [waste, setWaste] = useState("household");
  const [slot, setSlot] = useState(timeSlots[0]);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="animate-sheet-up mt-5 rounded-[2rem] bg-forest p-7 text-center text-ivory shadow-float">
        <CheckCircle2 className="mx-auto size-12 text-lime" strokeWidth={2.2} />
        <h2 className="mt-4 text-xl font-extrabold tracking-tight">Pickup scheduled</h2>
        <p className="mx-auto mt-2 max-w-[26ch] text-sm text-ivory/65">
          A vehicle will collect your {wasteTypes.find((w) => w.id === waste)?.label.toLowerCase()} waste {slot}.
        </p>
        <div className="mx-auto mt-6 max-w-60 text-left">
          <StepTimeline
            steps={[
              { label: "Request submitted", time: "Just now", state: "done" },
              { label: "Vehicle assigned", time: "SAT-220 on the way", state: "done" },
              { label: "Pickup in progress", time: slot ?? "Today", state: "current" },
              { label: "Completed", state: "pending" },
            ]}
          />
        </div>
        <button
          type="button"
          onClick={() => setDone(false)}
          className="mt-6 rounded-2xl bg-lime px-6 py-3 text-xs font-extrabold tracking-wide text-forest-deep"
        >
          NEW REQUEST
        </button>
      </div>
    );
  }

  return (
    <div className="animate-float-in mt-5 space-y-4 pb-4">
      {/* location */}
      <MapContainer className="h-40">
        <CityMap route={false} points={false} home={HOME_POS} truck={null} />
        <div className="glass-panel absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-2xl p-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-forest text-lime">
            <MapPin className="size-4" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold tracking-[0.14em] text-emerald">PICKUP LOCATION</p>
            <p className="truncate text-xs font-bold text-forest">{resident.address}</p>
          </div>
        </div>
      </MapContainer>

      {/* waste type */}
      <div>
        <p className="mb-2 text-[10px] font-extrabold tracking-[0.16em] text-forest/50">WHAT ARE WE COLLECTING?</p>
        <div className="grid grid-cols-2 gap-3">
          {wasteTypes.map((w) => {
            const Icon = WASTE_ICONS[w.id] ?? House;
            const active = waste === w.id;
            return (
              <button
                key={w.id}
                type="button"
                onClick={() => setWaste(w.id)}
                className={`rounded-3xl p-4 text-left transition-all ${
                  active
                    ? "bg-forest text-ivory shadow-float scale-[1.02]"
                    : "bg-card text-forest shadow-card hover:scale-[1.01]"
                }`}
              >
                <span
                  className={`flex size-10 items-center justify-center rounded-2xl ${
                    active ? "bg-lime/20 text-lime" : "bg-emerald-soft text-emerald"
                  }`}
                >
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <p className="mt-3 text-sm font-extrabold">{w.label}</p>
                <p className={`mt-0.5 text-[11px] leading-snug ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {w.hint}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* time */}
      <div>
        <p className="mb-2 text-[10px] font-extrabold tracking-[0.16em] text-forest/50">WHEN?</p>
        <div className="flex flex-wrap gap-2">
          {timeSlots.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-3 text-xs font-bold transition-all ${
                slot === s ? "bg-emerald text-primary-foreground shadow-lift" : "bg-card text-forest shadow-card"
              }`}
            >
              <Clock4 className="size-3.5" />
              {s}
            </button>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setDone(true)}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
      >
        REQUEST PICKUP <ArrowRight className="size-4" strokeWidth={2.6} />
      </button>
    </div>
  );
}

function MissedForm() {
  const [reason, setReason] = useState<string | null>(null);
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
          onClick={() => {
            setDone(false);
            setReason(null);
          }}
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
            <span
              className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${
                active ? "bg-lime/20 text-lime" : "bg-amber-soft text-[oklch(0.6_0.13_70)]"
              }`}
            >
              <Icon className="size-6" strokeWidth={2} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-extrabold">{r.label}</span>
              <span className={`block text-[11px] ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                {r.hint}
              </span>
            </span>
            <span
              className={`ml-auto size-5 shrink-0 rounded-full border-2 transition-colors ${
                active ? "border-lime bg-lime" : "border-forest/20"
              }`}
            />
          </button>
        );
      })}
      <div className="pt-1">
        <p className="mb-2 text-[10px] font-extrabold tracking-[0.16em] text-forest/50">ADD EVIDENCE (OPTIONAL)</p>
        <AttachMedia />
      </div>
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
