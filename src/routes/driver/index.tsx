import { createFileRoute, Link } from "@tanstack/react-router";
import { MapPin, Navigation, TriangleAlert } from "lucide-react";
import { CountUp } from "@/components/cleantrack/count-up";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { driverToday } from "@/lib/data";

export const Route = createFileRoute("/driver/")({
  head: () => ({
    meta: [
      { title: "Today's route — CleanTrack Driver" },
      {
        name: "description",
        content: "Your route at a glance: progress, households collected and your next stop — built for the road.",
      },
      { property: "og:title", content: "Today's route — CleanTrack Driver" },
      { property: "og:description", content: "Route progress, households and next stop for collection drivers." },
    ],
  }),
  component: DriverToday,
});

function DriverToday() {
  return (
    <div className="px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Good evening,</p>
          <h1 className="text-xl font-extrabold tracking-tight text-forest">{driverToday.name}</h1>
        </div>
        <span className="rounded-full bg-forest px-3.5 py-2 text-[11px] font-extrabold tracking-wider text-lime">
          {driverToday.vehicle}
        </span>
      </header>

      {/* route progress hero */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-7 text-center text-ivory shadow-float">
        <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">TODAY'S ROUTE</p>
        <h2 className="mt-1 text-sm font-bold text-ivory/80">{driverToday.route}</h2>
        <div className="mt-5 flex justify-center">
          <ProgressRing
            value={driverToday.progress}
            size={190}
            stroke={16}
            color="var(--lime)"
            track="color-mix(in oklab, var(--ivory) 12%, transparent)"
          >
            <p className="text-[3.4rem] font-extrabold leading-none tracking-tight text-ivory">
              <CountUp to={driverToday.progress} />
              <span className="text-2xl text-lime">%</span>
            </p>
            <p className="mt-1 text-[9px] font-extrabold tracking-[0.18em] text-ivory/55">COMPLETE</p>
          </ProgressRing>
        </div>
        <div className="mt-6 grid grid-cols-3 divide-x divide-ivory/12">
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-ivory">{driverToday.households}</p>
            <p className="mt-0.5 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">HOUSEHOLDS</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-emerald">{driverToday.collected}</p>
            <p className="mt-0.5 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">COLLECTED</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold tracking-tight text-lime">{driverToday.remaining}</p>
            <p className="mt-0.5 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">REMAINING</p>
          </div>
        </div>
      </section>

      {/* next stop */}
      <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-forest/50">NEXT STOP</p>
          <span className="rounded-full bg-cyan/15 px-3 py-1 text-[10px] font-extrabold tracking-wide text-forest ring-1 ring-cyan/40">
            {driverToday.nextStop.etaMin} MIN
          </span>
        </div>
        <div className="mt-3 flex items-start gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
            <MapPin className="size-5" />
          </span>
          <div>
            <p className="text-base font-extrabold tracking-tight text-forest">{driverToday.nextStop.label}</p>
            <p className="text-xs text-muted-foreground">{driverToday.nextStop.address}</p>
            <p className="mt-1 text-[11px] font-bold text-emerald">{driverToday.nextStop.distanceM} m ahead</p>
          </div>
        </div>
        <Link
          to="/driver/map"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-extrabold tracking-[0.06em] text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          <Navigation className="size-4" strokeWidth={2.6} />
          NAVIGATE TO STOP
        </Link>
      </section>

      <Link
        to="/driver/issues"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-soft py-4 text-sm font-extrabold tracking-[0.06em] text-[oklch(0.55_0.13_70)] ring-1 ring-amber/35 transition-transform hover:scale-[1.01]"
      >
        <TriangleAlert className="size-4" />
        REPORT AN ISSUE
      </Link>
    </div>
  );
}
