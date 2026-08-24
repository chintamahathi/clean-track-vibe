import { createFileRoute } from "@tanstack/react-router";
import { StatusDot } from "@/components/cleantrack/status-pill";
import { municipalRoutes } from "@/lib/data";

export const Route = createFileRoute("/municipal/routes")({
  head: () => ({
    meta: [
      { title: "Routes — ESWACH Control" },
      {
        name: "description",
        content: "Every collection route in the city with live progress, assigned vehicle and status.",
      },
      { property: "og:title", content: "Routes — ESWACH Control" },
      { property: "og:description", content: "Live progress for every collection route in the city." },
    ],
  }),
  component: MunicipalRoutes,
});

const BAR_COLORS = {
  active: "bg-emerald",
  delayed: "bg-amber",
  unavailable: "bg-coral",
} as const;

function MunicipalRoutes() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ivory">Routes</h1>
      <p className="mt-1 text-xs font-medium text-ivory/50">
        {municipalRoutes.length} routes in service this evening.
      </p>

      <ul className="mt-5 space-y-3 pb-4">
        {municipalRoutes.map((r, i) => (
          <li
            key={r.id}
            className="animate-float-in rounded-[1.75rem] bg-forest p-5 ring-1 ring-lime/10"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="truncate text-base font-extrabold tracking-tight text-ivory">{r.name}</p>
                <p className="text-[11px] font-medium text-ivory/50">
                  {r.vehicle} · {r.households} households
                </p>
              </div>
              <StatusDot
                tone={r.status === "active" ? "emerald" : r.status === "delayed" ? "amber" : "coral"}
                label={r.status.toUpperCase()}
              />
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-ivory/10">
                <div
                  className={`h-full rounded-full ${BAR_COLORS[r.status]} transition-all duration-700`}
                  style={{ width: `${r.progress}%` }}
                />
              </div>
              <span className="text-sm font-extrabold tabular-nums text-lime">{r.progress}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
