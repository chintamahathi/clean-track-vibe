import { Check, Droplets, Recycle } from "lucide-react";

type WasteState = "collected" | "pending";

function Row({ icon, label, state }: { icon: React.ReactNode; label: string; state: WasteState }) {
  const done = state === "collected";
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex size-10 items-center justify-center rounded-2xl ${
          done ? "bg-emerald-soft text-emerald" : "bg-amber-soft text-[oklch(0.6_0.13_70)]"
        }`}
      >
        {icon}
      </span>
      <p className="text-sm font-extrabold tracking-wide text-forest">{label}</p>
      <span
        className={`ml-auto flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-extrabold tracking-[0.1em] ${
          done
            ? "bg-emerald text-primary-foreground"
            : "bg-amber-soft text-[oklch(0.55_0.13_70)] ring-1 ring-amber/35"
        }`}
      >
        {done ? <Check className="size-3" strokeWidth={3} /> : <span className="size-2 animate-pulse rounded-full bg-current" />}
        {done ? "COLLECTED" : "PENDING"}
      </span>
    </div>
  );
}

/** Today's wet/dry segregation status. */
export function WetDryStatus({ wet, dry }: { wet: WasteState; dry: WasteState }) {
  return (
    <div className="rounded-[2rem] bg-card p-5 shadow-card">
      <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">TODAY'S COLLECTION</p>
      <div className="mt-3 space-y-3">
        <Row icon={<Droplets className="size-5" />} label="WET WASTE" state={wet} />
        <Row icon={<Recycle className="size-5" />} label="DRY WASTE" state={dry} />
      </div>
    </div>
  );
}
