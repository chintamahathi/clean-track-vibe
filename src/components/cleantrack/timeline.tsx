import { Check } from "lucide-react";
import type { TimelineStep } from "@/lib/data";

/** Vertical progress timeline: done → current → pending steps. */
export function StepTimeline({ steps, dark = false }: { steps: TimelineStep[]; dark?: boolean }) {
  return (
    <ol>
      {steps.map((s, i) => {
        const last = i === steps.length - 1;
        return (
          <li key={s.label} className="relative flex gap-4 pb-6 last:pb-0">
            {!last && (
              <span
                aria-hidden
                className={`absolute left-[15px] top-9 h-[calc(100%-28px)] w-0.5 rounded-full ${
                  s.state === "done" ? "bg-emerald" : dark ? "bg-ivory/12" : "bg-forest/12"
                }`}
              />
            )}
            <span
              className={`flex size-8 shrink-0 items-center justify-center rounded-full ${
                s.state === "done"
                  ? "bg-emerald text-primary-foreground"
                  : s.state === "current"
                    ? "bg-lime text-forest-deep shadow-glow-emerald"
                    : dark
                      ? "bg-ivory/8 text-ivory/35 ring-1 ring-ivory/12"
                      : "bg-secondary text-forest/35 ring-1 ring-forest/10"
              }`}
            >
              {s.state === "done" ? (
                <Check className="size-4" strokeWidth={3} />
              ) : s.state === "current" ? (
                <span className="size-2.5 animate-pulse rounded-full bg-forest-deep" />
              ) : (
                <span className="size-2 rounded-full bg-current" />
              )}
            </span>
            <div className="min-w-0 pt-1">
              <p
                className={`text-xs font-extrabold tracking-[0.12em] ${
                  s.state === "pending" ? (dark ? "text-ivory/35" : "text-forest/35") : dark ? "text-ivory" : "text-forest"
                }`}
              >
                {s.label}
              </p>
              {s.time && (
                <p className={`mt-0.5 text-[11px] font-medium ${dark ? "text-ivory/50" : "text-muted-foreground"}`}>
                  {s.time}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
