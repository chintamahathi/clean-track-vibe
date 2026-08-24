import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Brain } from "lucide-react";
import { CountUp } from "@/components/cleantrack/count-up";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { alerts, overflowPoint, routeMonitor } from "@/lib/data";

export const Route = createFileRoute("/municipal/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — ESWACH Control" },
      {
        name: "description",
        content: "Vehicle outages, overflow risks and delays — prioritized and actionable in one tap.",
      },
      { property: "og:title", content: "Alerts — ESWACH Control" },
      { property: "og:description", content: "Prioritized municipal alerts with one-tap actions." },
    ],
  }),
  component: MunicipalAlerts,
});

const LEVEL_STYLES = {
  critical: {
    ring: "ring-coral/35",
    bg: "bg-coral/12",
    badge: "bg-coral text-primary-foreground",
    icon: "🚨",
    text: "text-coral",
  },
  warning: {
    ring: "ring-amber/35",
    bg: "bg-amber/10",
    badge: "bg-amber text-forest-deep",
    icon: "⚠",
    text: "text-amber",
  },
  info: {
    ring: "ring-cyan/30",
    bg: "bg-cyan/10",
    badge: "bg-cyan text-forest-deep",
    icon: "✓",
    text: "text-cyan",
  },
} as const;

function MunicipalAlerts() {
  const fillColor =
    overflowPoint.fill >= 90 ? "var(--coral)" : overflowPoint.fill >= 70 ? "var(--amber)" : "var(--emerald)";

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ivory">Alerts</h1>
      <p className="mt-1 text-xs font-medium text-ivory/50">
        {alerts.length + 2} open · prioritized by impact on residents.
      </p>

      {/* AI-generated alerts */}
      <section className="mt-4 space-y-3">
        <div className="animate-float-in rounded-[1.75rem] bg-amber/12 p-5 ring-1 ring-amber/35">
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.18em] text-amber">
              <Brain className="size-3.5" /> SMART DELAY DETECTED
            </p>
            <span className="text-[10px] font-semibold text-ivory/40">just now</span>
          </div>
          <p className="mt-2 text-lg font-extrabold tracking-tight text-ivory">
            {routeMonitor.vehicle} · Traffic congestion
          </p>
          <p className="mt-0.5 text-xs text-ivory/55">
            Suggested reroute via <span className="font-bold text-lime">Lane 6 → Main Road</span> · est. +4 min
          </p>
          <Link
            to="/municipal/insights"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-amber px-3.5 py-2.5 text-[10px] font-extrabold tracking-[0.08em] text-forest-deep transition-transform hover:scale-105"
          >
            APPLY REROUTE <ArrowRight className="size-3" strokeWidth={3} />
          </Link>
        </div>
        <div className="animate-float-in rounded-[1.75rem] bg-cyan/10 p-5 ring-1 ring-cyan/30" style={{ animationDelay: "60ms" }}>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-[10px] font-extrabold tracking-[0.18em] text-cyan">
              <Brain className="size-3.5" /> PREDICTED DELAY
            </p>
            <span className="text-[10px] font-semibold text-ivory/40">forecast</span>
          </div>
          <p className="mt-2 text-lg font-extrabold tracking-tight text-ivory">Madhapur Route · {routeMonitor.vehicle}</p>
          <p className="mt-0.5 text-xs text-ivory/55">
            15 min delay likely due to traffic + high waste volume · probability{" "}
            <span className="font-bold text-cyan">78%</span>
          </p>
          <Link
            to="/municipal/monitor"
            className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-cyan px-3.5 py-2.5 text-[10px] font-extrabold tracking-[0.08em] text-forest-deep transition-transform hover:scale-105"
          >
            OPEN ROUTE MONITOR <ArrowRight className="size-3" strokeWidth={3} />
          </Link>
        </div>
      </section>

      {/* overflow visualization */}
      <section className="animate-float-in mt-5 flex items-center gap-6 rounded-[2rem] bg-forest p-6 ring-1 ring-coral/25">
        <ProgressRing
          value={overflowPoint.fill}
          size={128}
          stroke={13}
          color={fillColor}
          track="color-mix(in oklab, var(--ivory) 10%, transparent)"
        >
          <p className="text-3xl font-extrabold tracking-tight text-ivory">
            <CountUp to={overflowPoint.fill} />%
          </p>
        </ProgressRing>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-coral">OVERFLOW RISK</p>
          <h2 className="mt-1 text-base font-extrabold tracking-tight text-ivory">{overflowPoint.id}</h2>
          <p className="text-xs text-ivory/55">{overflowPoint.area}</p>
          <p className="mt-2 text-sm font-extrabold text-ivory">
            {overflowPoint.currentKg} <span className="font-medium text-ivory/45">/ {overflowPoint.capacityKg} KG</span>
          </p>
          <p className="mt-1 text-[11px] font-bold text-amber">
            🧠 Prediction: overflow in 26 min · +2.1 kg/min
          </p>
          <button
            type="button"
            className="mt-3 rounded-xl bg-coral px-4 py-2.5 text-[10px] font-extrabold tracking-[0.1em] text-primary-foreground transition-transform hover:scale-105"
          >
            DISPATCH VEHICLE
          </button>
        </div>
      </section>

      {/* alert cards */}
      <ul className="mt-4 space-y-3 pb-4">
        {alerts.map((a, i) => {
          const s = LEVEL_STYLES[a.level];
          return (
            <li
              key={a.id}
              className={`animate-float-in rounded-[1.75rem] ${s.bg} p-5 ring-1 ${s.ring}`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <p className={`text-[10px] font-extrabold tracking-[0.18em] ${s.text}`}>
                  {s.icon} {a.title}
                </p>
                <span className="text-[10px] font-semibold text-ivory/40">{a.time}</span>
              </div>
              <div className="mt-2 flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate text-lg font-extrabold tracking-tight text-ivory">{a.detail}</p>
                  <p className="text-xs text-ivory/55">{a.meta}</p>
                </div>
                <button
                  type="button"
                  className={`flex shrink-0 items-center gap-1.5 rounded-xl px-3.5 py-2.5 text-[10px] font-extrabold tracking-[0.08em] ${s.badge} transition-transform hover:scale-105`}
                >
                  {a.action}
                  <ArrowRight className="size-3" strokeWidth={3} />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
