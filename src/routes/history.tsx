import { createFileRoute } from "@tanstack/react-router";
import { Weight } from "lucide-react";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { history } from "@/lib/data";

export const Route = createFileRoute("/history")({
  head: () => ({
    meta: [
      { title: "Collection history — CleanTrack" },
      {
        name: "description",
        content: "Every collection at your doorstep — dates, times, vehicles and how much waste was collected.",
      },
      { property: "og:title", content: "Collection history — CleanTrack" },
      { property: "og:description", content: "Your complete collection history with statuses and weights." },
    ],
  }),
  component: History,
});

function History() {
  const completed = history.filter((h) => h.status === "completed");
  const kg = completed.reduce((s, h) => s + h.weightKg, 0);

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">History</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">Your last 7 days of collections.</p>

      <div className="mt-4 flex items-center justify-between rounded-3xl bg-forest p-5 text-ivory shadow-card">
        <div>
          <p className="text-big-number !text-3xl text-lime">{completed.length}</p>
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-ivory/60">COLLECTIONS THIS WEEK</p>
        </div>
        <div className="h-10 w-px bg-ivory/15" />
        <div>
          <p className="text-big-number !text-3xl text-ivory">{kg.toFixed(1)}</p>
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-ivory/60">KG COLLECTED</p>
        </div>
      </div>

      <ul className="mt-4 space-y-3 pb-4">
        {history.map((h, i) => (
          <li
            key={h.id}
            className="animate-float-in flex items-center gap-4 rounded-3xl bg-card p-4 shadow-card"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex size-12 shrink-0 flex-col items-center justify-center rounded-2xl bg-pale">
              <span className="text-sm font-extrabold leading-none text-forest">{h.date.split(" ")[1] ?? "•"}</span>
              <span className="text-[9px] font-bold uppercase tracking-wide text-muted-foreground">
                {h.date.split(" ")[0]}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-extrabold text-forest">{h.window}</p>
              <p className="text-[11px] text-muted-foreground">
                {h.vehicle !== "—" ? h.vehicle : "No vehicle dispatched"}
                {h.weightKg > 0 && (
                  <span className="ml-2 inline-flex items-center gap-1 font-semibold text-emerald">
                    <Weight className="size-3" /> {h.weightKg} kg
                  </span>
                )}
              </p>
            </div>
            <StatusPill status={h.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}
