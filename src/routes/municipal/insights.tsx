import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, BellRing, Brain, Route as RouteIcon, Shuffle, Sparkles } from "lucide-react";
import { demandAreas, predictedDelay, routeOptimization, smartDelay } from "@/lib/data";

export const Route = createFileRoute("/municipal/insights")({
  head: () => ({
    meta: [
      { title: "Smart insights — ESWACH Control" },
      { name: "description", content: "Predictive operations: delay detection, smart ETAs, route optimization and demand forecasting." },
      { property: "og:title", content: "Smart insights — ESWACH Control" },
      { property: "og:description", content: "Predictive fleet intelligence for municipal operations." },
    ],
  }),
  component: Insights,
});

const DEMAND_STYLE = {
  high: "bg-coral/15 text-coral ring-coral/35",
  medium: "bg-amber/12 text-amber ring-amber/35",
  low: "bg-emerald/15 text-emerald ring-emerald/30",
} as const;

function Insights() {
  return (
    <div className="px-5 pt-6">
      <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">SMART INSIGHTS</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">Predictive operations</h1>
      <p className="mt-1 text-xs font-medium text-ivory/50">Act before residents notice.</p>

      {/* smart delay detection */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-amber/10 p-5 ring-1 ring-amber/35">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-amber">⚠ SMART DELAY DETECTION</p>
        <div className="mt-2 flex items-end justify-between">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-ivory">{smartDelay.vehicle}</p>
            <p className="text-xs text-ivory/55">{smartDelay.route}</p>
          </div>
          <p className="text-right text-2xl font-extrabold tracking-tight text-amber">
            {smartDelay.behindMin}
            <span className="ml-1 text-xs">MIN BEHIND</span>
          </p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {[
            { label: "VIEW ROUTE", icon: RouteIcon },
            { label: "NOTIFY DRIVER", icon: BellRing },
            { label: "ASSIGN BACKUP", icon: Shuffle },
          ].map((a) => (
            <button
              key={a.label}
              type="button"
              className="flex flex-col items-center gap-1.5 rounded-2xl bg-forest py-3 text-[9px] font-extrabold tracking-[0.08em] text-ivory ring-1 ring-ivory/10 transition-transform hover:scale-[1.03]"
            >
              <a.icon className="size-4 text-amber" /> {a.label}
            </button>
          ))}
        </div>
      </section>

      {/* predicted delay */}
      <section className="animate-float-in mt-4 rounded-[2rem] bg-forest p-5 ring-1 ring-cyan/25" style={{ animationDelay: "80ms" }}>
        <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.18em] text-cyan">
          <Brain className="size-4" /> PREDICTED DELAY
        </p>
        <p className="mt-2 text-base font-extrabold leading-snug tracking-tight text-ivory">
          {predictedDelay.vehicle} is likely to arrive ~{predictedDelay.lateMin} minutes late.
        </p>
        <p className="mt-1 text-xs text-ivory/55">Reason: {predictedDelay.reason}</p>
        <div className="mt-4 flex gap-2">
          <button type="button" className="flex-1 rounded-2xl bg-lime py-3 text-[10px] font-extrabold tracking-[0.08em] text-forest-deep transition-transform hover:scale-[1.02]">
            NOTIFY RESIDENTS
          </button>
          <button type="button" className="flex-1 rounded-2xl bg-ivory/10 py-3 text-[10px] font-extrabold tracking-[0.08em] text-ivory ring-1 ring-ivory/15 transition-transform hover:scale-[1.02]">
            ASSIGN BACKUP
          </button>
        </div>
      </section>

      {/* route optimization */}
      <section className="animate-float-in mt-4 rounded-[2rem] bg-forest p-6 ring-1 ring-lime/10" style={{ animationDelay: "140ms" }}>
        <p className="flex items-center gap-2 text-[10px] font-extrabold tracking-[0.18em] text-emerald">
          <Sparkles className="size-4" /> ROUTE OPTIMIZATION
        </p>
        <div className="mt-4 flex items-center justify-center gap-5">
          <div className="text-center">
            <p className="text-4xl font-extrabold tracking-tight text-ivory/70">{routeOptimization.currentMin}</p>
            <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-ivory/45">CURRENT · MIN</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-lime/15 text-lime">
            <ArrowDown className="size-5 rotate-[-90deg]" />
          </span>
          <div className="text-center">
            <p className="text-4xl font-extrabold tracking-tight text-lime">{routeOptimization.optimizedMin}</p>
            <p className="mt-1 text-[9px] font-extrabold tracking-[0.14em] text-emerald">OPTIMIZED · MIN</p>
          </div>
        </div>
        <p className="mt-4 text-center text-xs font-semibold text-ivory/55">
          Saves {routeOptimization.distanceSavedKm} km · covers {routeOptimization.households} households
        </p>
        <button type="button" className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-3.5 text-xs font-extrabold tracking-[0.06em] text-primary-foreground transition-transform hover:scale-[1.01]">
          APPLY OPTIMIZED ROUTE <ArrowRight className="size-4" strokeWidth={2.6} />
        </button>
      </section>

      {/* demand prediction */}
      <section className="animate-float-in mb-4 mt-4 rounded-[2rem] bg-forest p-6 ring-1 ring-lime/10" style={{ animationDelay: "200ms" }}>
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-ivory/50">HIGH DEMAND AREAS · TOMORROW</p>
        <ul className="mt-3 space-y-2.5">
          {demandAreas.map((d) => (
            <li key={d.name} className="flex items-center gap-3">
              <p className="w-24 shrink-0 text-sm font-extrabold text-ivory">{d.name}</p>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-ivory/10">
                <div
                  className={`h-full rounded-full ${d.level === "high" ? "bg-coral" : d.level === "medium" ? "bg-amber" : "bg-emerald"}`}
                  style={{ width: d.level === "high" ? "92%" : d.level === "medium" ? "62%" : "34%" }}
                />
              </div>
              <span className={`rounded-full px-2.5 py-1 text-[9px] font-extrabold tracking-[0.1em] ring-1 ${DEMAND_STYLE[d.level]}`}>
                {d.level.toUpperCase()}
              </span>
              <span className="w-10 text-right text-xs font-extrabold text-ivory/70">{d.expected}</span>
            </li>
          ))}
        </ul>
        <Link to="/municipal/analytics" className="mt-4 flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.12em] text-cyan">
          FULL ANALYTICS <ArrowRight className="size-3" strokeWidth={3} />
        </Link>
      </section>
    </div>
  );
}
