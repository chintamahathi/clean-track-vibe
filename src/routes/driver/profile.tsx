import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, ChevronRight, Clock, History, LogOut, MapPin, Truck, Wrench, X } from "lucide-react";
import { useEffect, useState } from "react";
import { RoleSwitcher } from "@/components/cleantrack/shell";
import { DRIVER_AREAS, getArea, onAreaChange, setArea } from "@/lib/driverArea";
import { driverProfile } from "@/lib/data";

export const Route = createFileRoute("/driver/profile")({
  head: () => ({
    meta: [
      { title: "Driver profile — ESWACH" },
      { name: "description", content: "Vehicle, shift, assigned route and colonies for collection drivers." },
      { property: "og:title", content: "Driver profile — ESWACH" },
      { property: "og:description", content: "Vehicle, shift and route assignment details." },
    ],
  }),
  component: DriverProfile,
});

function DriverProfile() {
  const p = driverProfile;
  const navigate = useNavigate();
  const [area, setAreaState] = useState(getArea);
  const [showPicker, setShowPicker] = useState(false);
  const [pending, setPending] = useState(area.id);

  useEffect(() => onAreaChange(() => setAreaState(getArea())), []);

  function confirmArea() {
    setArea(pending);
    setAreaState(getArea());
    setShowPicker(false);
  }

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

      {/* current area */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">CURRENT AREA</p>
          <button
            type="button"
            onClick={() => { setPending(area.id); setShowPicker((s) => !s); }}
            className="rounded-full bg-forest px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-lime transition-transform hover:scale-105"
          >
            CHANGE AREA
          </button>
        </div>
        <p className="mt-2 text-2xl font-extrabold tracking-tight text-forest">{area.id}</p>
        <p className="text-sm font-bold text-muted-foreground">{area.name} · {area.ward}</p>

        {/* inline area picker */}
        {showPicker && (
          <div className="animate-float-in mt-4 space-y-1.5 border-t border-forest/8 pt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] font-extrabold tracking-[0.14em] text-forest/50">SELECT AREA</p>
              <button type="button" onClick={() => setShowPicker(false)} className="text-muted-foreground"><X className="size-4" /></button>
            </div>
            {DRIVER_AREAS.map((a) => (
              <button
                key={a.id}
                type="button"
                onClick={() => setPending(a.id)}
                className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-sm transition-all ${
                  pending === a.id ? "bg-forest text-ivory shadow-lift" : "bg-pale text-forest hover:bg-secondary"
                }`}
              >
                <span className="font-extrabold">{a.id} — {a.name}</span>
                {pending === a.id && <Check className="size-4 text-lime" strokeWidth={3} />}
              </button>
            ))}
            <button
              type="button"
              disabled={pending === area.id}
              onClick={confirmArea}
              className="mt-2 w-full rounded-2xl bg-emerald py-3 text-xs font-extrabold tracking-[0.06em] text-primary-foreground shadow-lift transition-all disabled:opacity-40 enabled:hover:scale-[1.01]"
            >
              CONFIRM AREA
            </button>
          </div>
        )}
      </section>

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

      <button
        type="button"
        onClick={() => {
          window.localStorage.removeItem("ct_onboarded");
          navigate({ to: "/role-select" });
        }}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-card py-4 text-xs font-extrabold tracking-[0.08em] text-destructive shadow-card ring-1 ring-destructive/20 transition-all hover:scale-[1.01] active:scale-[0.98]"
      >
        <LogOut className="size-4" /> LOG OUT
      </button>

      <div className="mt-6 flex justify-center pb-2">
        <RoleSwitcher />
      </div>
    </div>
  );
}
