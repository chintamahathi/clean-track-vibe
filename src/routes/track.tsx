import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { CityMap, HOME_POS, MapContainer, MapControls, TRUCK_POS } from "@/components/cleantrack/map";
import { CountUp } from "@/components/cleantrack/count-up";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { truck } from "@/lib/data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track your truck live — CleanTrack" },
      {
        name: "description",
        content: "Watch SAT-247 approach your home in real time with a live ETA, route progress and stop count.",
      },
      { property: "og:title", content: "Track your truck live — CleanTrack" },
      { property: "og:description", content: "Real-time truck tracking with live ETA and route progress." },
    ],
  }),
  component: Track,
});

function Track() {
  const [eta, setEta] = useState(truck.etaMin);
  useEffect(() => {
    const t = setInterval(() => setEta((e) => (e === 12 ? 18 : 12)), 7000);
    return () => clearInterval(t);
  }, []);

  const progress = Math.round(((truck.totalStops - truck.stopsRemaining) / truck.totalStops) * 100);

  return (
    <div className="flex h-full flex-col">
      {/* map hero */}
      <MapContainer className="animate-float-in mx-4 mt-4 h-[52dvh] min-h-[380px]">
        <CityMap truck={{ x: TRUCK_POS.x, y: TRUCK_POS.y }} home={HOME_POS} />
        <MapControls />

        {/* floating vehicle card */}
        <div className="glass-panel absolute left-3 top-3 z-20 max-w-[220px] rounded-3xl p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-extrabold tracking-tight text-forest">{truck.id}</p>
            <StatusPill status="on-route" label="● LIVE" className="!px-2.5 !py-1" />
          </div>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-forest">
            <CountUp to={eta} />
            <span className="ml-1 text-sm font-extrabold text-emerald">MIN AWAY</span>
          </p>
          <p className="mt-1 text-[11px] font-semibold text-muted-foreground">
            {truck.route} · {truck.stopsRemaining} stops remaining
          </p>
        </div>
      </MapContainer>

      {/* floating bottom sheet */}
      <section className="animate-sheet-up relative z-10 mx-4 -mt-10 rounded-[2rem] bg-card p-5 shadow-float">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-forest/10" />
        <div className="flex items-center gap-5">
          <ProgressRing value={progress} size={104} stroke={10} color="var(--emerald)">
            <div className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-forest">
                <CountUp to={eta} />
              </p>
              <p className="text-[9px] font-extrabold tracking-[0.14em] text-emerald">MIN ETA</p>
            </div>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-extrabold tracking-tight text-forest">Almost there</h1>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-muted-foreground">
              {truck.id} has passed {truck.totalStops - truck.stopsRemaining} of {truck.totalStops} stops on the{" "}
              {truck.route}.
            </p>
            <p className="mt-2 text-xs font-bold text-forest">
              Arrival window <span className="text-emerald">{truck.window}</span>
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-pale p-3">
          <span className="flex size-10 items-center justify-center rounded-full bg-forest text-xs font-extrabold text-lime">
            RK
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-extrabold text-forest">{truck.driver}</p>
            <p className="text-[11px] text-muted-foreground">Your collection driver today</p>
          </div>
          <button
            type="button"
            aria-label={`Call ${truck.driver}`}
            className="flex size-10 items-center justify-center rounded-full bg-emerald text-primary-foreground shadow-lift transition-transform hover:scale-105"
          >
            <Phone className="size-4" />
          </button>
        </div>

        <button
          type="button"
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          <BellRing className="size-4" />
          NOTIFY ME WHEN 3 MIN AWAY
        </button>
      </section>
    </div>
  );
}
