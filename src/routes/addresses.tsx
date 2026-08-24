import { createFileRoute, Link } from "@tanstack/react-router";
import { House, MapPin, PencilLine, Plus, Star, Truck } from "lucide-react";
import { useState } from "react";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { savedAddresses } from "@/lib/data";

export const Route = createFileRoute("/addresses")({
  head: () => ({
    meta: [
      { title: "Saved addresses — ESWACH" },
      { name: "description", content: "Home, work and other addresses — each with its assigned truck and collection window." },
      { property: "og:title", content: "Saved addresses — ESWACH" },
      { property: "og:description", content: "Manage multiple collection addresses." },
    ],
  }),
  component: Addresses,
});

function Addresses() {
  const [primaryId, setPrimaryId] = useState("home");

  return (
    <div className="px-5 pt-6">
      <SubHeader title="Saved addresses" subtitle="Track collections at every place that matters." />

      <ul className="mt-5 space-y-3">
        {savedAddresses.map((a, i) => {
          const primary = a.id === primaryId;
          return (
            <li
              key={a.id}
              className={`animate-float-in rounded-[1.75rem] p-5 transition-all ${
                primary ? "bg-forest text-ivory shadow-float" : "bg-card text-forest shadow-card"
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] ${
                    primary ? "bg-lime text-forest-deep" : "bg-pale text-forest"
                  }`}
                >
                  {a.label === "HOME" ? <House className="size-3" /> : <MapPin className="size-3" />}
                  {a.label}
                </span>
                {primary ? (
                  <span className="flex items-center gap-1 text-[10px] font-extrabold tracking-wide text-lime">
                    <Star className="size-3.5 fill-current" /> PRIMARY
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => setPrimaryId(a.id)}
                    className="text-[10px] font-extrabold tracking-wide text-emerald"
                  >
                    SET PRIMARY
                  </button>
                )}
              </div>

              <p className="mt-3 text-base font-extrabold tracking-tight">{a.address}</p>
              <p className={`text-xs ${primary ? "text-ivory/55" : "text-muted-foreground"}`}>
                {a.colony} · {a.street} · {a.ward}
              </p>

              <div className={`mt-4 grid grid-cols-3 gap-2 border-t pt-4 ${primary ? "border-ivory/12" : "border-forest/8"}`}>
                <div>
                  <p className={`flex items-center gap-1 text-sm font-extrabold ${primary ? "text-lime" : "text-forest"}`}>
                    <Truck className="size-3.5" /> {a.truck}
                  </p>
                  <p className={`mt-0.5 text-[9px] font-extrabold tracking-[0.12em] ${primary ? "text-ivory/45" : "text-muted-foreground"}`}>
                    ASSIGNED
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-extrabold ${primary ? "text-ivory" : "text-forest"}`}>{a.schedule}</p>
                  <p className={`mt-0.5 text-[9px] font-extrabold tracking-[0.12em] ${primary ? "text-ivory/45" : "text-muted-foreground"}`}>
                    SCHEDULE
                  </p>
                </div>
                <div>
                  <p className={`text-sm font-extrabold ${primary ? "text-ivory" : "text-forest"}`}>{a.window}</p>
                  <p className={`mt-0.5 text-[9px] font-extrabold tracking-[0.12em] ${primary ? "text-ivory/45" : "text-muted-foreground"}`}>
                    WINDOW
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-5 space-y-2.5 pb-4">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.06em] text-ivory shadow-lift transition-transform hover:scale-[1.01]"
        >
          <Plus className="size-4" strokeWidth={2.6} /> ADD ADDRESS
        </button>
        <Link
          to="/location"
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-pale py-4 text-sm font-extrabold tracking-[0.06em] text-forest transition-transform hover:scale-[1.01]"
        >
          <PencilLine className="size-4" /> CHANGE LOCATION
        </Link>
      </div>
    </div>
  );
}
