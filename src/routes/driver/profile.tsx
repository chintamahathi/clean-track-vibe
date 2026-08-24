import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight, Clock, History, MapPin, Truck, Wrench } from "lucide-react";
import { RoleSwitcher } from "@/components/cleantrack/shell";
import { driverProfile } from "@/lib/data";

export const Route = createFileRoute("/driver/profile")({
  head: () => ({
    meta: [
      { title: "Driver profile — CleanTrack" },
      { name: "description", content: "Vehicle, shift, assigned route and colonies for collection drivers." },
      { property: "og:title", content: "Driver profile — CleanTrack" },
      { property: "og:description", content: "Vehicle, shift and route assignment details." },
    ],
  }),
  component: DriverProfile,
});

function DriverProfile() {
  const p = driverProfile;
  return (
    <div className="px-5 pt-6">
      {/* identity */}
      <header className="animate-float-in flex items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-forest text-lg font-extrabold text-lime shadow-lift">
          RK
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-forest">{p.name}</h1>
          <p className="text-xs font-semibold text-muted-foreground">
            {p.id} · {p.phone}
          </p>
        </div>
      </header>

      {/* vehicle */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-6 text-ivory shadow-float">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">YOUR VEHICLE</p>
          <span className="flex items-center gap-1.5 rounded-full bg-emerald/20 px-3 py-1 text-[10px] font-extrabold tracking-widest text-lime ring-1 ring-lime/25">
            <Wrench className="size-3" /> {p.vehicle.maintenance.toUpperCase()}
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <p className="text-4xl font-extrabold tracking-tight text-ivory">{p.vehicle.id}</p>
            <p className="mt-1 text-xs text-ivory/55">{p.vehicle.type}</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold tracking-tight text-lime">{p.vehicle.capacityKg} kg</p>
            <p className="text-[9px] font-extrabold tracking-[0.14em] text-ivory/45">CAPACITY</p>
          </div>
        </div>
        <p className="mt-4 border-t border-ivory/12 pt-3 text-[11px] font-semibold text-ivory/55">
          Last service {p.vehicle.lastService} · next due in 12 days
        </p>
      </section>

      {/* shift + route */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-card p-5 shadow-card">
          <Clock className="size-5 text-emerald" />
          <p className="mt-3 text-sm font-extrabold text-forest">{p.shift.label}</p>
          <p className="text-[11px] text-muted-foreground">{p.shift.time}</p>
        </div>
        <div className="rounded-3xl bg-card p-5 shadow-card">
          <Truck className="size-5 text-emerald" />
          <p className="mt-3 text-sm font-extrabold text-forest">{p.route.name}</p>
          <p className="text-[11px] text-muted-foreground">{p.route.households} households</p>
        </div>
      </div>

      {/* colonies */}
      <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">ASSIGNED COLONIES & STREETS</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {p.colonies.map((c) => (
            <span key={c} className="flex items-center gap-1.5 rounded-full bg-pale px-3.5 py-2 text-xs font-bold text-forest">
              <MapPin className="size-3.5 text-emerald" /> {c}
            </span>
          ))}
        </div>
      </section>

      <Link
        to="/driver/history"
        className="mt-4 flex items-center justify-between rounded-[2rem] bg-card p-5 shadow-card transition-transform hover:scale-[1.01]"
      >
        <span className="flex items-center gap-3 text-sm font-extrabold text-forest">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-pale text-forest">
            <History className="size-5" />
          </span>
          Route history
        </span>
        <ChevronRight className="size-4 text-forest/40" />
      </Link>

      <div className="mt-6 flex justify-center pb-2">
        <RoleSwitcher />
      </div>
    </div>
  );
}
