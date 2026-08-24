import { createFileRoute } from "@tanstack/react-router";
import { Clock4, Navigation, TriangleAlert } from "lucide-react";
import { CityMap, COLLECTION_POINTS, MapContainer, MapControls } from "@/components/cleantrack/map";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { collectionPoints } from "@/lib/data";

export const Route = createFileRoute("/points")({
  head: () => ({
    meta: [
      { title: "Nearby collection points — ESWACH" },
      { name: "description", content: "Fill levels, last collection times and overflow risk for collection points near you." },
      { property: "og:title", content: "Nearby collection points — ESWACH" },
      { property: "og:description", content: "Live fill levels and overflow risk near you." },
    ],
  }),
  component: Points,
});

const STATUS_STYLE = {
  ok: { label: "🟢 HEALTHY", classes: "bg-emerald-soft text-emerald ring-emerald/25" },
  high: { label: "🟡 HIGH", classes: "bg-amber-soft text-[oklch(0.55_0.13_70)] ring-amber/35" },
  critical: { label: "🔴 OVERFLOW RISK", classes: "bg-coral-soft text-coral ring-coral/30" },
} as const;

function Points() {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Nearby collection points" subtitle="Secondary to your doorstep pickup — for overflow days." />

      <MapContainer className="animate-float-in mt-5 h-56">
        <CityMap route={false} home={{ x: 330, y: 96 }} truck={null} points={false}>
          {COLLECTION_POINTS.slice(0, 3).map((pt, i) => {
            const status = collectionPoints[i]?.status ?? "ok";
            const color = status === "critical" ? "var(--coral)" : status === "high" ? "var(--amber)" : "var(--emerald)";
            return (
              <g key={i} transform={`translate(${pt.x} ${pt.y})`}>
                <circle r="14" fill={color} opacity="0.3" className="animate-marker-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
                <circle r="8" fill={color} stroke="var(--cream)" strokeWidth="3" />
              </g>
            );
          })}
        </CityMap>
        <MapControls />
      </MapContainer>

      <ul className="mt-5 space-y-3 pb-4">
        {collectionPoints.map((p, i) => {
          const s = STATUS_STYLE[p.status];
          const fillColor = p.status === "critical" ? "var(--coral)" : p.status === "high" ? "var(--amber)" : "var(--emerald)";
          return (
            <li
              key={p.id}
              className="animate-float-in rounded-[1.75rem] bg-card p-5 shadow-card"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center gap-4">
                <ProgressRing value={p.fill} size={72} stroke={8} color={fillColor}>
                  <p className="text-sm font-extrabold tracking-tight text-forest">{p.fill}%</p>
                </ProgressRing>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-base font-extrabold tracking-tight text-forest">{p.id}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.area} · {p.distanceM} m away
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground">
                    <Clock4 className="size-3.5 text-emerald" /> Last collected {p.lastCollected}
                  </p>
                </div>
                <span className={`shrink-0 rounded-full px-3 py-1.5 text-[9px] font-extrabold tracking-[0.1em] ring-1 ${s.classes}`}>
                  {s.label}
                </span>
              </div>

              {p.overflowHours !== null && (
                <p className="mt-3 rounded-2xl bg-coral-soft px-4 py-2.5 text-[11px] font-bold text-coral ring-1 ring-coral/25">
                  Predicted overflow in ~{p.overflowHours} hours
                </p>
              )}

              <div className="mt-4 grid grid-cols-2 gap-2">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-coral-soft py-3 text-[10px] font-extrabold tracking-[0.08em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.02]"
                >
                  <TriangleAlert className="size-3.5" /> REPORT OVERFLOW
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-2xl bg-forest py-3 text-[10px] font-extrabold tracking-[0.08em] text-ivory transition-transform hover:scale-[1.02]"
                >
                  <Navigation className="size-3.5" /> GET DIRECTIONS
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
