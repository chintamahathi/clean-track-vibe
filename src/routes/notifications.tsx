import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCheck } from "lucide-react";
import { useState } from "react";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { notifications } from "@/lib/data";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — ESWACH" },
      { name: "description", content: "Event-driven alerts that matter: truck approaching, delays, missed collections and backup vehicles." },
      { property: "og:title", content: "Notifications — ESWACH" },
      { property: "og:description", content: "Smart, event-driven collection notifications." },
    ],
  }),
  component: Notifications,
});

const TONES = {
  emerald: "bg-emerald-soft text-emerald ring-emerald/25",
  amber: "bg-amber-soft text-[oklch(0.55_0.13_70)] ring-amber/35",
  coral: "bg-coral-soft text-coral ring-coral/30",
  cyan: "bg-cyan/15 text-forest ring-cyan/40",
} as const;

function Notifications() {
  const [read, setRead] = useState(false);

  return (
    <div className="px-5 pt-6">
      <div className="flex items-start justify-between">
        <SubHeader title="Notifications" subtitle="Only what needs your attention." />
        <button
          type="button"
          onClick={() => setRead(true)}
          className="mt-1 flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-[10px] font-extrabold tracking-wide text-forest shadow-card"
        >
          <CheckCheck className="size-3.5" /> {read ? "ALL READ" : "MARK READ"}
        </button>
      </div>

      <ul className="mt-5 space-y-3 pb-4">
        {notifications.map((n, i) => (
          <li
            key={n.id}
            className={`animate-float-in rounded-[1.75rem] bg-card p-5 shadow-card transition-opacity ${read ? "opacity-70" : ""}`}
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <span className={`rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[0.12em] ring-1 ${TONES[n.tone]}`}>
                {n.icon} {n.title}
              </span>
              <span className="text-[10px] font-semibold text-muted-foreground">{n.time}</span>
            </div>
            <p className="mt-3 text-sm font-semibold leading-relaxed text-forest">{n.body}</p>
            {n.action && (
              <Link
                to="/requests"
                className="mt-3 inline-flex items-center gap-1.5 rounded-xl bg-forest px-4 py-2.5 text-[10px] font-extrabold tracking-[0.1em] text-ivory transition-transform hover:scale-105"
              >
                {n.action} <ArrowRight className="size-3" strokeWidth={3} />
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
