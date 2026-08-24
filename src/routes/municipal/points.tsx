import { createFileRoute } from "@tanstack/react-router";
import { Clock4, MapPin, Plus, Siren, Truck } from "lucide-react";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { collectionPoints } from "@/lib/data";

export const Route = createFileRoute("/municipal/points")({
  head: () => ({
    meta: [
      { title: "Collection points — CleanTrack Control" },
      { name: "description", content: "Manage collection points: capacity, fill, schedules, overflow risk and emergency dispatch." },
      { property: "og:title", content: "Collection points — CleanTrack Control" },
      { property: "og:description", content: "Collection point management with overflow prediction." },
    ],
  }),
  component: MunicipalPoints,
});

const RISK = {
  ok: { label: "HEALTHY", classes: "bg-emerald/15 text-emerald ring-emerald/30" },
  high: { label: "HIGH", classes: "bg-amber/12 text-amber ring-amber/35" },
  critical: { label: "OVERFLOW RISK", classes: "bg-coral/15 text-coral ring-coral/35" },
} as const;

function MunicipalPoints() {
  return (
    <div className="px-5 pt-6">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">INFRASTRUCTURE</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">Collection points</h1>
        </div>
        <button
          type="button"
          className="flex items-center gap-1.5 rounded-full bg-lime px-4 py-2.5 text-[10px] font-extrabold tracking-wide text-forest-deep transition-transform hover:scale-105"
        >
          <Plus className="size-3.5" strokeWidth={3} /> ADD POINT
        </button>
      </div>

      <ul className="mt-5 space-y-3 pb-4">
        {collectionPoints.map((p, i) => {
          const risk = RISK[p.status];
          const fillColor = p.status === "critical" ? "var(--coral)" : p.status === "high" ? "var(--amber)" : "var(--emerald)";
          return (
            <li
              key={p.id}
              className="animate-float-in rounded-[1.75rem] bg-forest p-5 ring-1 ring-lime/10"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-4">
                <ProgressRing value={p.fill} size={76} stroke={8} color={fillColor} track="color-mix(in oklab, var(--ivory) 10%, transparent)">
                  <p className="text-sm font-extrabold tracking-tight text-ivory">{p.fill}%</p>
                </ProgressRing>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate text-base font-extrabold tracking-tight text-ivory">{p.id}</p>
                    <span className={`shrink-0 rounded-full px-2.5 py-1 text-[8px] font-extrabold tracking-[0.12em] ring-1 ${risk.classes}`}>
                      {risk.label}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ivory/50">
                    <MapPin className="size-3 text-cyan" /> {p.area}
                  </p>
                  <p className="mt-1 text-[11px] font-bold text-ivory/70">
                    {p.currentKg} / {p.capacityKg} kg · {p.wasteType}
                  </p>
                </div>
              </div>

              {p.overflowHours !== null && (
                <p className="mt-3 rounded-2xl bg-coral/12 px-4 py-2.5 text-[11px] font-bold text-coral ring-1 ring-coral/25">
                  🤖 Predicted overflow in ~{p.overflowHours} hours — recommend dispatching nearest vehicle
                </p>
              )}

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-ivory/10 pt-4 text-[10px] font-bold text-ivory/55">
                <span className="flex items-center gap-1.5">
                  <Truck className="size-3.5 text-lime" /> {p.vehicle}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock4 className="size-3.5 text-lime" /> {p.schedule}
                </span>
                <span className="text-right text-cyan">Next {p.next}</span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="rounded-2xl bg-lime py-3 text-[10px] font-extrabold tracking-[0.08em] text-forest-deep transition-transform hover:scale-[1.02]"
                >
                  ASSIGN NEAREST VEHICLE
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-1.5 rounded-2xl bg-coral/15 py-3 text-[10px] font-extrabold tracking-[0.08em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.02]"
                >
                  <Siren className="size-3.5" /> EMERGENCY COLLECTION
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
