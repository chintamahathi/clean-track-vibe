import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2, OctagonAlert, Users, Wrench, Truck, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { issueTypes } from "@/lib/data";

export const Route = createFileRoute("/driver/issues")({
  head: () => ({
    meta: [
      { title: "Report an issue — CleanTrack Driver" },
      {
        name: "description",
        content: "One-tap issue reporting built for the road: road blocked, breakdown, vehicle or staff issues.",
      },
      { property: "og:title", content: "Report an issue — CleanTrack Driver" },
      { property: "og:description", content: "Fast, icon-driven issue reporting for drivers." },
    ],
  }),
  component: DriverIssues,
});

const ISSUE_ICONS: Record<string, LucideIcon> = {
  "road-blocked": OctagonAlert,
  breakdown: Truck,
  "vehicle-issue": Wrench,
  "staff-issue": Users,
};

function DriverIssues() {
  const [selected, setSelected] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <span className="animate-scale-in flex size-20 items-center justify-center rounded-full bg-emerald-soft">
          <CheckCircle2 className="size-10 text-emerald" strokeWidth={2.2} />
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-forest">Control has been notified</h1>
        <p className="mt-2 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
          A backup vehicle is being assigned to your route. You'll get instructions here shortly.
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(false);
            setSelected(null);
          }}
          className="mt-8 rounded-2xl bg-forest px-8 py-4 text-sm font-extrabold tracking-wide text-ivory shadow-lift"
        >
          BACK TO ROUTE
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">Report an issue</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">
        Big buttons, zero typing — safe to use between stops.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {issueTypes.map((issue, i) => {
          const Icon = ISSUE_ICONS[issue.id] ?? OctagonAlert;
          const active = selected === issue.id;
          return (
            <button
              key={issue.id}
              type="button"
              onClick={() => setSelected(issue.id)}
              className={`animate-float-in flex min-h-36 flex-col items-start justify-between rounded-[1.75rem] p-5 text-left transition-all ${
                active ? "bg-coral text-primary-foreground shadow-float scale-[1.02]" : "bg-card text-forest shadow-card"
              }`}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <span
                className={`flex size-12 items-center justify-center rounded-2xl ${
                  active ? "bg-primary-foreground/15 text-primary-foreground" : "bg-coral-soft text-coral"
                }`}
              >
                <Icon className="size-6" strokeWidth={2.1} />
              </span>
              <span>
                <span className="block text-base font-extrabold leading-tight">{issue.label}</span>
                <span
                  className={`mt-1 block text-[11px] leading-snug ${active ? "text-primary-foreground/75" : "text-muted-foreground"}`}
                >
                  {issue.hint}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={() => setSent(true)}
        className="mt-5 w-full rounded-2xl bg-coral py-4 text-sm font-extrabold tracking-[0.06em] text-primary-foreground shadow-lift transition-all enabled:hover:scale-[1.01] enabled:active:scale-[0.98] disabled:opacity-40"
      >
        SEND TO CONTROL CENTER
      </button>
    </div>
  );
}
