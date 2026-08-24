import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, MapPin, TriangleAlert } from "lucide-react";
import { CityMap, MapContainer, MapControls, TRUCK_POS } from "@/components/cleantrack/map";
import { StatusDot } from "@/components/cleantrack/status-pill";
import { driverToday } from "@/lib/data";

export const Route = createFileRoute("/driver/map")({
  head: () => ({
    meta: [
      { title: "Route map — CleanTrack Driver" },
      {
        name: "description",
        content: "Your live route: completed stops in emerald, current leg in cyan, remaining in grey.",
      },
      { property: "og:title", content: "Route map — CleanTrack Driver" },
      { property: "og:description", content: "Live route visualization with stop-by-stop progress." },
    ],
  }),
  component: DriverRoute,
});

function DriverRoute() {
  return (
    <div className="flex h-full flex-col">
      <MapContainer className="animate-float-in mx-4 mt-4 h-[56dvh] min-h-[400px]">
        <CityMap routeProgress={driverToday.progress} truck={{ x: TRUCK_POS.x, y: TRUCK_POS.y, color: "var(--cyan)" }} />
        <MapControls />
        {/* legend */}
        <div className="glass-panel absolute left-3 top-3 z-20 space-y-1.5 rounded-2xl p-3 text-forest">
          <StatusDot tone="emerald" label="Completed" />
          <br />
          <StatusDot tone="cyan" label="Current leg" />
          <br />
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide">
            <span className="size-2 rounded-full bg-forest/20" aria-hidden />
            Remaining
          </span>
        </div>
      </MapContainer>

      {/* next stop bottom sheet */}
      <section className="animate-sheet-up relative z-10 mx-4 -mt-10 rounded-[2rem] bg-card p-5 shadow-float">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-forest/10" />
        <div className="flex items-center gap-4">
          <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-forest text-lime">
            <MapPin className="size-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">NEXT · {driverToday.nextStop.etaMin} MIN · {driverToday.nextStop.distanceM} M</p>
            <h1 className="text-lg font-extrabold tracking-tight text-forest">{driverToday.nextStop.label}</h1>
            <p className="text-xs text-muted-foreground">{driverToday.nextStop.address}</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
          <Link
            to="/driver/verify"
            className="flex items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-extrabold tracking-[0.05em] text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            <CheckCircle2 className="size-4" strokeWidth={2.6} />
            MARK COLLECTED
          </Link>
          <button
            type="button"
            aria-label="Report a problem at this stop"
            className="flex w-14 items-center justify-center rounded-2xl bg-coral-soft text-coral ring-1 ring-coral/30 transition-transform hover:scale-105"
          >
            <TriangleAlert className="size-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
