import {
  CheckCircle2,
  CircleSlash,
  Clock4,
  Navigation,
  Radio,
  CalendarClock,
  type LucideIcon,
} from "lucide-react";
import type { CollectionStatus } from "@/lib/data";

type PillTone = "on-route" | "nearby" | "delayed" | "unavailable" | "completed" | "scheduled" | "active";

const CONFIG: Record<string, { label: string; icon: LucideIcon; classes: string; dot?: string }> = {
  "on-route": {
    label: "ON ROUTE",
    icon: Navigation,
    classes: "bg-emerald-soft text-emerald border border-emerald/25",
  },
  active: {
    label: "ACTIVE",
    icon: Navigation,
    classes: "bg-emerald-soft text-emerald border border-emerald/25",
  },
  nearby: {
    label: "NEARBY",
    icon: Radio,
    classes: "bg-cyan/15 text-forest border border-cyan/40",
  },
  delayed: {
    label: "DELAYED",
    icon: Clock4,
    classes: "bg-amber-soft text-[oklch(0.55_0.13_70)] border border-amber/35",
  },
  unavailable: {
    label: "UNAVAILABLE",
    icon: CircleSlash,
    classes: "bg-coral-soft text-coral border border-coral/30",
  },
  completed: {
    label: "COMPLETED",
    icon: CheckCircle2,
    classes: "bg-emerald text-primary-foreground border border-emerald",
  },
  scheduled: {
    label: "SCHEDULED",
    icon: CalendarClock,
    classes: "bg-secondary text-secondary-foreground border border-border",
  },
};

const FALLBACK = CONFIG["scheduled"]!;

export function StatusPill({
  status,
  label,
  className = "",
}: {
  status: CollectionStatus | PillTone;
  label?: string;
  className?: string;
}) {
  const cfg = CONFIG[status] ?? FALLBACK;
  const Icon = cfg.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[0.08em] ${cfg.classes} ${className}`}
    >
      <Icon className="size-3" strokeWidth={2.6} />
      {label ?? cfg.label}
    </span>
  );
}

/** Small colored dot with an accessible text label next to it. */
export function StatusDot({ tone, label }: { tone: "emerald" | "amber" | "coral" | "cyan"; label: string }) {
  const color =
    tone === "emerald" ? "bg-emerald" : tone === "amber" ? "bg-amber" : tone === "coral" ? "bg-coral" : "bg-cyan";
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-wide">
      <span className={`size-2 rounded-full ${color}`} aria-hidden />
      {label}
    </span>
  );
}
