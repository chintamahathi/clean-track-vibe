import { createFileRoute } from "@tanstack/react-router";
import { StatusPill } from "@/components/cleantrack/status-pill";

export const Route = createFileRoute("/driver/history")({
  head: () => ({
    meta: [
      { title: "Route history — ESWACH Driver" },
      {
        name: "description",
        content: "Your past routes, completion rates and households served.",
      },
      { property: "og:title", content: "Route history — ESWACH Driver" },
      { property: "og:description", content: "Past routes and completion performance for drivers." },
    ],
  }),
  component: DriverHistory,
});

const PAST_ROUTES = [
  { id: "d1", date: "Today", route: "Madhapur Route", households: 438, completion: 72, status: "on-route" as const },
  { id: "d2", date: "Aug 22", route: "Madhapur Route", households: 438, completion: 100, status: "completed" as const },
  { id: "d3", date: "Aug 21", route: "Madhapur Route", households: 436, completion: 100, status: "completed" as const },
  { id: "d4", date: "Aug 20", route: "Kondapur Route", households: 392, completion: 96, status: "completed" as const },
  { id: "d5", date: "Aug 19", route: "Madhapur Route", households: 438, completion: 68, status: "delayed" as const },
];

function DriverHistory() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">Route history</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">Your last 5 shifts on the road.</p>

      <div className="mt-4 rounded-3xl bg-forest p-5 text-center text-ivory shadow-card">
        <p className="text-big-number text-lime">94%</p>
        <p className="text-[10px] font-extrabold tracking-[0.14em] text-ivory/60">AVG. COMPLETION THIS WEEK</p>
      </div>

      <ul className="mt-4 space-y-3 pb-4">
        {PAST_ROUTES.map((r, i) => (
          <li
            key={r.id}
            className="animate-float-in rounded-3xl bg-card p-4 shadow-card"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-extrabold text-forest">{r.route}</p>
                <p className="text-[11px] text-muted-foreground">
                  {r.date} · {r.households} households
                </p>
              </div>
              <StatusPill status={r.status} />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-emerald transition-all duration-700"
                  style={{ width: `${r.completion}%` }}
                />
              </div>
              <span className="text-xs font-extrabold text-forest">{r.completion}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
