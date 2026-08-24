import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Building2, Check, House, Truck, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { BrandMark } from "@/components/cleantrack/shell";

export const Route = createFileRoute("/role-select")({
  head: () => ({
    meta: [
      { title: "Choose your role — ESWACH" },
      { name: "description", content: "Continue as a resident, collection driver, or municipal control team." },
      { property: "og:title", content: "Choose your role — ESWACH" },
      { property: "og:description", content: "Continue as a resident, collection driver, or municipal control team." },
    ],
  }),
  component: RoleSelect,
});

type RoleId = "resident" | "driver" | "municipal";

const ROLES: { id: RoleId; label: string; hint: string; to: string; icon: LucideIcon }[] = [
  {
    id: "resident",
    label: "Resident",
    hint: "Track your truck, schedules, requests & impact",
    to: "/",
    icon: House,
  },
  {
    id: "driver",
    label: "Driver",
    hint: "Today's route, collections & issue reporting",
    to: "/driver",
    icon: Truck,
  },
  {
    id: "municipal",
    label: "Municipal Control",
    hint: "Live fleet map, alerts, routes & analytics",
    to: "/municipal",
    icon: Building2,
  },
];

function RoleSelect() {
  const [role, setRole] = useState<RoleId>("resident");
  const navigate = useNavigate();
  const selected = ROLES.find((r) => r.id === role)!;

  return (
    <div className="flex h-full min-h-dvh flex-col px-7 pt-10">
      <div className="animate-float-in">
        <BrandMark />
      </div>

      <h1 className="animate-float-in mt-8 text-3xl font-extrabold leading-tight tracking-tight text-forest">
        Who's using
        <br />
        ESWACH?
      </h1>
      <p className="animate-float-in mt-2 text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
        Select your role to continue to your dashboard.
      </p>

      <div className="animate-float-in mt-7 space-y-3" role="radiogroup" aria-label="Select your role" style={{ animationDelay: "140ms" }}>
        {ROLES.map((r) => {
          const active = r.id === role;
          const Icon = r.icon;
          return (
            <button
              key={r.id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setRole(r.id)}
              className={`flex w-full items-center gap-4 rounded-[1.75rem] p-5 text-left shadow-card ring-2 transition-all duration-200 ${
                active ? "bg-forest ring-emerald/60" : "bg-card ring-transparent hover:ring-forest/15"
              }`}
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${
                  active ? "bg-lime/20 text-lime" : "bg-pale text-forest"
                }`}
              >
                <Icon className="size-5" strokeWidth={2.2} />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-sm font-extrabold ${active ? "text-ivory" : "text-forest"}`}>{r.label}</span>
                <span className={`block text-[11px] font-semibold ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {r.hint}
                </span>
              </span>
              <span
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                  active ? "border-lime bg-lime text-forest-deep" : "border-forest/15 text-transparent"
                }`}
              >
                <Check className="size-3.5" strokeWidth={3.5} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-8">
        <button
          type="button"
          onClick={() => navigate({ to: selected.to })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-all hover:scale-[1.01] active:scale-[0.98]"
        >
          CONTINUE AS {selected.label.toUpperCase()} <ArrowRight className="size-4" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}
