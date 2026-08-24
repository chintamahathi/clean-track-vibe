import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, Calendar, ChevronDown, FileText, Map, MapPin, Route as RouteIcon, ShieldCheck, Truck, UserRound, Users } from "lucide-react";
import { useState } from "react";
import { manageSections } from "@/lib/data";

export const Route = createFileRoute("/municipal/manage")({
  head: () => ({
    meta: [
      { title: "Management — CleanTrack Control" },
      { name: "description", content: "Mobile-first administration: users, drivers, vehicles, colonies, routes, points and schedules." },
      { property: "og:title", content: "Management — CleanTrack Control" },
      { property: "og:description", content: "Mobile-first municipal administration." },
    ],
  }),
  component: Manage,
});

const SECTION_ICONS: Record<string, typeof Users> = {
  users: Users,
  drivers: UserRound,
  vehicles: Truck,
  colonies: MapPin,
  routes: RouteIcon,
  points: Map,
  schedules: Calendar,
  areas: ShieldCheck,
};

function Manage() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="px-5 pt-6">
      <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">ADMINISTRATION</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">Management</h1>
      <p className="mt-1 text-xs font-medium text-ivory/50">Tap a card to expand — no dense tables.</p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {manageSections.map((s, i) => {
          const Icon = SECTION_ICONS[s.id] ?? Users;
          const expanded = open === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => setOpen(expanded ? null : s.id)}
              className={`animate-float-in rounded-[1.75rem] p-5 text-left transition-all ${
                expanded ? "col-span-2 bg-forest ring-1 ring-lime/25" : "bg-forest ring-1 ring-lime/10"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="flex items-center justify-between">
                <span className={`flex size-10 items-center justify-center rounded-2xl ${expanded ? "bg-lime text-forest-deep" : "bg-lime/15 text-lime"}`}>
                  <Icon className="size-5" />
                </span>
                <ChevronDown className={`size-4 text-ivory/40 transition-transform ${expanded ? "rotate-180" : ""}`} />
              </div>
              <p className="mt-3 text-2xl font-extrabold tracking-tight text-ivory">{s.count}</p>
              <p className="text-[10px] font-extrabold tracking-[0.14em] text-ivory/50">{s.label.toUpperCase()}</p>

              {expanded && (
                <ul className="animate-float-in mt-4 space-y-2 border-t border-ivory/10 pt-4">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 rounded-2xl bg-ivory/6 px-4 py-3 text-xs font-bold text-ivory ring-1 ring-ivory/8">
                      <span className="size-1.5 rounded-full bg-emerald" /> {item}
                    </li>
                  ))}
                </ul>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 pb-4">
        <Link
          to="/municipal/complaints"
          className="flex items-center gap-3 rounded-[1.75rem] bg-coral/12 p-5 ring-1 ring-coral/30 transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-coral/20 text-coral">
            <Bell className="size-5" />
          </span>
          <span className="text-xs font-extrabold tracking-wide text-ivory">Complaint center</span>
        </Link>
        <Link
          to="/municipal/points"
          className="flex items-center gap-3 rounded-[1.75rem] bg-cyan/10 p-5 ring-1 ring-cyan/25 transition-transform hover:scale-[1.02]"
        >
          <span className="flex size-10 items-center justify-center rounded-2xl bg-cyan/20 text-cyan">
            <FileText className="size-5" />
          </span>
          <span className="text-xs font-extrabold tracking-wide text-ivory">Points & reports</span>
        </Link>
      </div>
    </div>
  );
}
