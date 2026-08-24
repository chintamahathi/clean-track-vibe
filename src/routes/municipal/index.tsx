import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Radio } from "lucide-react";
import { CountUp } from "@/components/cleantrack/count-up";
import { RoleSwitcher } from "@/components/cleantrack/shell";
import { alerts, municipalKpis } from "@/lib/data";

export const Route = createFileRoute("/municipal/")({
  head: () => ({
    meta: [
      { title: "City Control Center — CleanTrack" },
      {
        name: "description",
        content: "Live fleet overview: active, delayed and unavailable vehicles, route completion and incidents across the city.",
      },
      { property: "og:title", content: "City Control Center — CleanTrack" },
      { property: "og:description", content: "Live municipal fleet overview with oversized KPIs and alerts." },
    ],
  }),
  component: MunicipalOverview,
});

function MunicipalOverview() {
  const critical = alerts[0]!;
  return (
    <div className="px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">MUNICIPAL CONTROL</p>
          <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">City Control Center</h1>
        </div>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald/15 px-3 py-1.5 text-[10px] font-extrabold tracking-widest text-emerald ring-1 ring-emerald/30">
          <Radio className="size-3 animate-pulse" />
          LIVE
        </span>
      </header>

      {/* hero KPI */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-7 ring-1 ring-lime/10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-mega text-ivory">
              <CountUp to={municipalKpis.active} />
            </p>
            <p className="mt-1 text-[10px] font-extrabold tracking-[0.2em] text-emerald">VEHICLES ACTIVE</p>
          </div>
          <div className="flex gap-6 pb-2 text-right">
            <div>
              <p className="text-4xl font-extrabold tracking-tight text-amber">
                <CountUp to={municipalKpis.delayed} />
              </p>
              <p className="mt-1 text-[9px] font-extrabold tracking-[0.16em] text-ivory/50">DELAYED</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold tracking-tight text-coral">
                <CountUp to={municipalKpis.unavailable} />
              </p>
              <p className="mt-1 text-[9px] font-extrabold tracking-[0.16em] text-ivory/50">UNAVAILABLE</p>
            </div>
          </div>
        </div>
      </section>

      {/* routes complete */}
      <section className="mt-4 rounded-[2rem] bg-forest p-6 ring-1 ring-lime/10">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-big-number text-lime">
              <CountUp to={municipalKpis.routesComplete} />%
            </p>
            <p className="mt-1 text-[10px] font-extrabold tracking-[0.18em] text-ivory/55">ROUTES COMPLETE</p>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-3xl font-extrabold tracking-tight text-amber">{municipalKpis.missed}</p>
              <p className="mt-0.5 text-[9px] font-extrabold tracking-[0.14em] text-ivory/50">MISSED</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold tracking-tight text-coral">{municipalKpis.overflow}</p>
              <p className="mt-0.5 text-[9px] font-extrabold tracking-[0.14em] text-ivory/50">OVERFLOW</p>
            </div>
          </div>
        </div>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-ivory/10">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--lime))] transition-all duration-1000"
            style={{ width: `${municipalKpis.routesComplete}%` }}
          />
        </div>
      </section>

      {/* priority alert */}
      <Link
        to="/municipal/alerts"
        className="animate-sheet-up mt-4 block rounded-[2rem] bg-coral/12 p-5 ring-1 ring-coral/30 transition-transform hover:scale-[1.01]"
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-coral">🚨 {critical.title}</p>
          <span className="text-[10px] font-semibold text-ivory/40">{critical.time}</span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xl font-extrabold tracking-tight text-ivory">{critical.detail}</p>
            <p className="text-xs text-ivory/55">{critical.meta}</p>
          </div>
          <span className="flex size-10 items-center justify-center rounded-full bg-coral text-primary-foreground">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </Link>

      <div className="mt-6 flex justify-center pb-2">
        <RoleSwitcher dark />
      </div>
    </div>
  );
}
