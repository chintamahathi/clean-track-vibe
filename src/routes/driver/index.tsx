import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ChevronRight, MapPin, Navigation, Play, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { getArea, onAreaChange } from "@/lib/driverArea";
import { driverToday } from "@/lib/data";

export const Route = createFileRoute("/driver/")({
  head: () => ({
    meta: [
      { title: "Today's route — ESWACH Driver" },
      {
        name: "description",
        content: "Your route at a glance: stops remaining, next stop — built for the road.",
      },
    ],
  }),
  component: DriverToday,
});

function DriverToday() {
  const [area, setArea] = useState(getArea);
  useEffect(() => onAreaChange(() => setArea(getArea())), []);

  return (
    <div className="px-5 pt-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground">Good evening,</p>
          <h1 className="text-xl font-extrabold tracking-tight text-forest">{driverToday.name}</h1>
        </div>
        {/* Area badge — replaces vehicle ID as primary identity */}
        <div className="flex flex-col items-end gap-0.5">
          <span className="rounded-full bg-forest px-3.5 py-2 text-[11px] font-extrabold tracking-wider text-lime">
            {area.id}
          </span>
          <span className="pr-1 text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
            {area.name}
          </span>
        </div>
      </header>

      {/* route progress hero — STOPS REMAINING replaces % ring */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-7 text-center text-ivory shadow-float">
        <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">TODAY'S ROUTE</p>
        <h2 className="mt-1 text-sm font-bold text-ivory/80">{area.id} — {area.name}</h2>

        <div className="mt-5">
          <p className="text-[3.4rem] font-extrabold leading-none tracking-tight text-ivory">
            {driverToday.remaining}
          </p>
          <p className="mt-2 text-[10px] font-extrabold tracking-[0.2em] text-lime">STOPS REMAINING</p>
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

      {/* route management */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-xs font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.02]"
        >
          <Play className="size-4" />
          START ROUTE
        </button>
        <button
          type="button"
          className="flex items-center justify-center gap-2 rounded-2xl bg-coral-soft py-4 text-xs font-extrabold tracking-[0.06em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.02]"
        >
          <CheckCircle2 className="size-4" />
          END ROUTE
        </button>
      </section>

      <div className="mt-4 space-y-2 pb-4">
        {(
          [
            { to: "/driver/verify", icon: CheckCircle2, label: "Verify a collection", sub: "GPS + QR + waste confirmation" },
            { to: "/driver/profile", icon: UserRound, label: "Driver profile", sub: "Vehicle, maintenance & colonies" },
          ] as const
        ).map((row) => (
          <Link
            key={row.to}
            to={row.to}
            className="flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card transition-transform hover:scale-[1.01]"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
              <row.icon className="size-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-extrabold text-forest">{row.label}</span>
              <span className="block text-[11px] text-muted-foreground">{row.sub}</span>
            </span>
            <ChevronRight className="size-4 shrink-0 text-forest/35" />
          </Link>
        ))}
      </div>
    </div>
  );
}
