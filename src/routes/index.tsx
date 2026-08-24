import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Leaf, MapPin, Navigation, Truck, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import truckImg from "@/assets/truck.png";
import { CountUp } from "@/components/cleantrack/count-up";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { WetDryStatus } from "@/components/cleantrack/waste-status";
import { collectionSchedule, impact, resident, truck, wetDryToday } from "@/lib/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CleanTrack — Your collection, live" },
      {
        name: "description",
        content:
          "Track your garbage truck in real time, see your ETA and never miss a collection again. Uber-style tracking for waste collection.",
      },
      { property: "og:title", content: "CleanTrack — Your collection, live" },
      { property: "og:description", content: "Live ETA for your garbage collection. Know exactly when the truck arrives." },
    ],
  }),
  component: Index,
});

function Index() {
  // Demo: ETA gently shifts to showcase the animated number transition.
  const [eta, setEta] = useState(truck.etaMin);
  useEffect(() => {
    const t = setInterval(() => setEta((e) => (e === 12 ? 18 : 12)), 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="px-5 pt-6">
      {/* header */}
      <header className="flex items-center justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--emerald),var(--cyan))] text-sm font-extrabold text-primary-foreground shadow-lift">
            A
          </span>
          <div className="min-w-0">
            <p className="text-xs font-medium text-muted-foreground">Good evening,</p>
            <h1 className="text-lg font-extrabold tracking-tight text-forest">{resident.name}</h1>
            <div className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
              <MapPin className="size-3 text-emerald" />
              {resident.area}
            </div>
          </div>
        </div>
        <Link
          to="/profile"
          aria-label="Open profile"
          className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card shadow-card"
        >
          <UserRound className="size-[18px] text-forest" />
        </Link>
      </header>

      {/* hero collection card */}
      <section className="animate-float-in relative mt-5 overflow-hidden rounded-[2rem] bg-forest p-6 text-ivory shadow-float">
        <div
          aria-hidden
          className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald/25 blur-2xl"
        />
        <div aria-hidden className="absolute -bottom-24 -left-10 size-48 rounded-full bg-lime/15 blur-2xl" />

        <div className="relative">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">YOUR GARBAGE COLLECTION</p>
            <StatusPill status="on-route" />
          </div>

          <div className="mt-3 flex items-center gap-2">
            <span className="rounded-full bg-ivory/10 px-3 py-1 text-[11px] font-bold tracking-wider text-ivory/85 ring-1 ring-ivory/15">
              {truck.id}
            </span>
            <span className="text-[11px] font-medium text-ivory/55">{truck.route}</span>
          </div>

          <div className="mt-1 flex items-end justify-between">
            <div>
              <div className="text-mega text-ivory">
                <CountUp to={eta} />
                <span className="ml-1 text-[1.6rem] font-extrabold tracking-tight text-lime">MIN</span>
              </div>
              <p className="mt-1 text-xs font-semibold text-ivory/60">
                Estimated arrival · {truck.window}
              </p>
            </div>
            <img
              src={truckImg}
              alt="CleanTrack collection truck"
              width={1024}
              height={1024}
              className="-mb-3 -mr-5 w-36 -rotate-2 drop-shadow-[0_18px_20px_oklch(0.15_0.03_168_/_45%)]"
            />
          </div>

          <Link
            to="/track"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-lime py-4 text-sm font-extrabold tracking-[0.08em] text-forest-deep transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            <Navigation className="size-4" strokeWidth={2.6} />
            TRACK VEHICLE
          </Link>
        </div>
      </section>

      {/* notification */}
      <section className="animate-sheet-up glass-panel mt-4 flex items-start gap-3 rounded-3xl p-4" style={{ animationDelay: "120ms" }}>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
          <Truck className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">TRUCK NEARBY</p>
          <p className="mt-0.5 text-sm font-bold text-forest">
            {truck.id} is approximately 3 minutes away.
          </p>
          <p className="text-xs text-muted-foreground">Keep your waste ready at the gate.</p>
        </div>
      </section>

      {/* missed + impact */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <Link
          to="/requests"
          className="group rounded-3xl bg-card p-4 shadow-card transition-transform hover:scale-[1.02]"
        >
          <p className="text-sm font-extrabold leading-snug text-forest">Did we miss you today?</p>
          <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">Report a missed collection</p>
          <span className="mt-3 flex size-8 items-center justify-center rounded-full bg-secondary text-forest transition-transform group-hover:translate-x-1">
            <ChevronRight className="size-4" />
          </span>
        </Link>
        <Link
          to="/impact"
          className="group rounded-3xl bg-pale p-4 shadow-card transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-soft text-emerald">
            <Leaf className="size-4" />
          </span>
          <p className="mt-3 text-big-number text-forest !text-3xl">
            {impact.streakDays}
            <span className="ml-1 text-xs font-bold text-emerald">DAYS</span>
          </p>
          <p className="text-[11px] font-semibold text-muted-foreground">Collection streak</p>
        </Link>
      </div>

      {/* wet / dry segregation status */}
      <div className="animate-float-in mt-4" style={{ animationDelay: "180ms" }}>
        <WetDryStatus wet={wetDryToday.wet} dry={wetDryToday.dry} />
      </div>

      {/* collection schedule (expandable) */}
      <ScheduleCard />

      {/* nearby collection points */}
      <Link
        to="/points"
        className="group mt-4 flex items-center gap-3 rounded-3xl bg-card p-4 shadow-card transition-transform hover:scale-[1.01]"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-amber-soft text-[oklch(0.6_0.13_70)]">
          <MapPin className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold text-forest">Nearby collection points</span>
          <span className="block text-[11px] text-muted-foreground">Point #14 · 250 m · 82% full</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-forest/40 transition-transform group-hover:translate-x-1" />
      </Link>

    </div>
  );
}

function ScheduleCard() {
  const [open, setOpen] = useState(false);
  const rows = [
    ["Frequency", collectionSchedule.frequency],
    ["Schedule", collectionSchedule.days],
    ["Window", collectionSchedule.window],
    ["Assigned vehicle", collectionSchedule.vehicle],
    ["Next collection", collectionSchedule.nextCollection],
    ["Last collection", collectionSchedule.lastCollection],
  ];
  return (
    <section className="animate-float-in mt-4 rounded-[2rem] bg-card p-5 shadow-card" style={{ animationDelay: "240ms" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} className="flex w-full items-center gap-3 text-left">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
          <Truck className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold text-forest">Collection schedule</span>
          <span className="block text-[11px] text-muted-foreground">
            {collectionSchedule.frequency} · {collectionSchedule.window} · {collectionSchedule.vehicle}
          </span>
        </span>
        <ChevronDown className={`size-4 shrink-0 text-forest/40 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <dl className="animate-float-in mt-4 space-y-2 border-t border-forest/8 pt-4">
          {rows.map(([k, v]) => (
            <div key={k} className="flex items-center justify-between text-xs">
              <dt className="font-semibold text-muted-foreground">{k}</dt>
              <dd className="font-extrabold text-forest">{v}</dd>
            </div>
          ))}
        </dl>
      )}
    </section>
  );
}
