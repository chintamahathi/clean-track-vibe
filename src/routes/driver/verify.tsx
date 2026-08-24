import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, CircleSlash, Droplets, MapPin, QrCode, Recycle, ScanLine, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { driverToday } from "@/lib/data";

export const Route = createFileRoute("/driver/verify")({
  head: () => ({
    meta: [
      { title: "Collection verification — CleanTrack Driver" },
      { name: "description", content: "GPS-verified collection logging: scan, mark collected, mark missed — in seconds." },
      { property: "og:title", content: "Collection verification — CleanTrack Driver" },
      { property: "og:description", content: "Fast, GPS-verified collection logging for drivers." },
    ],
  }),
  component: DriverVerify,
});

function DriverVerify() {
  const [wet, setWet] = useState(true);
  const [dry, setDry] = useState(false);
  const [qr, setQr] = useState(false);
  const [result, setResult] = useState<"collected" | "missed" | null>(null);

  if (result) {
    const collected = result === "collected";
    return (
      <div className="flex h-full flex-col items-center justify-center px-8 text-center">
        <span
          className={`animate-scale-in flex size-20 items-center justify-center rounded-full ${
            collected ? "bg-emerald-soft" : "bg-coral-soft"
          }`}
        >
          {collected ? (
            <ShieldCheck className="size-10 text-emerald" strokeWidth={2.2} />
          ) : (
            <CircleSlash className="size-10 text-coral" strokeWidth={2.2} />
          )}
        </span>
        <h1 className="mt-6 text-2xl font-extrabold tracking-tight text-forest">
          {collected ? "Collection verified" : "Marked as missed"}
        </h1>
        {collected && (
          <div className="animate-float-in mt-5 w-full space-y-2 rounded-3xl bg-card p-5 text-left shadow-card">
            {[
              "GPS VERIFIED",
              qr ? "QR VERIFIED" : "QR SKIPPED",
              "TIMESTAMP 6:21 PM",
              wet && dry ? "WET + DRY LOGGED" : wet ? "WET LOGGED" : "DRY LOGGED",
            ].map((t) => (
              <p key={t} className="flex items-center gap-2.5 text-xs font-extrabold tracking-[0.1em] text-forest">
                <Check className="size-4 text-emerald" strokeWidth={3} /> {t}
              </p>
            ))}
          </div>
        )}
        <p className="mt-3 max-w-[30ch] text-sm leading-relaxed text-muted-foreground">
          {collected
            ? "Proof of collection saved — the resident and control center can see it happened here."
            : "Control has been notified and a backup slot will be scheduled for this stop."}
        </p>
        <Link
          to="/driver/map"
          className="mt-8 rounded-2xl bg-forest px-8 py-4 text-sm font-extrabold tracking-wide text-ivory shadow-lift"
        >
          NEXT STOP
        </Link>
      </div>
    );
  }

  return (
    <div className="px-5 pt-6">
      <p className="text-[10px] font-extrabold tracking-[0.2em] text-emerald">{driverToday.nextStop.label.toUpperCase()}</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-forest">Collection verification</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">{driverToday.nextStop.address}</p>

      {/* GPS proof */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-5 text-ivory shadow-float">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-2xl bg-lime/20 text-lime">
            <MapPin className="size-5" />
          </span>
          <div>
            <p className="text-sm font-extrabold tracking-wide text-lime">GPS VERIFIED ✓</p>
            <p className="text-[11px] text-ivory/60">LOCATION MATCHED · 6:21 PM</p>
          </div>
        </div>
      </section>

      {/* wet / dry */}
      <section className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setWet((v) => !v)}
          className={`flex items-center gap-3 rounded-3xl p-4 transition-all ${
            wet ? "bg-emerald text-primary-foreground shadow-lift" : "bg-card text-forest shadow-card"
          }`}
        >
          <Droplets className="size-5" />
          <span className="text-sm font-extrabold">WET</span>
          <span className={`ml-auto flex size-6 items-center justify-center rounded-full ${wet ? "bg-primary-foreground/20" : "bg-forest/10"}`}>
            {wet && <Check className="size-3.5" strokeWidth={3} />}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setDry((v) => !v)}
          className={`flex items-center gap-3 rounded-3xl p-4 transition-all ${
            dry ? "bg-emerald text-primary-foreground shadow-lift" : "bg-card text-forest shadow-card"
          }`}
        >
          <Recycle className="size-5" />
          <span className="text-sm font-extrabold">DRY</span>
          <span className={`ml-auto flex size-6 items-center justify-center rounded-full ${dry ? "bg-primary-foreground/20" : "bg-forest/10"}`}>
            {dry && <Check className="size-3.5" strokeWidth={3} />}
          </span>
        </button>
      </section>

      {/* actions */}
      <div className="mt-5 space-y-2.5 pb-4">
        <button
          type="button"
          onClick={() => setQr(true)}
          className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold tracking-[0.06em] transition-all ${
            qr ? "bg-cyan/20 text-forest ring-2 ring-cyan" : "bg-card text-forest shadow-card hover:scale-[1.01]"
          }`}
        >
          {qr ? <QrCode className="size-4" /> : <ScanLine className="size-4" />}
          {qr ? "QR VERIFIED ✓" : "SCAN QR"}
        </button>
        <button
          type="button"
          onClick={() => setResult("collected")}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-extrabold tracking-[0.06em] text-primary-foreground shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          <Check className="size-4" strokeWidth={3} /> MARK COLLECTED
        </button>
        <button
          type="button"
          onClick={() => setResult("missed")}
          className="w-full rounded-2xl bg-coral-soft py-4 text-sm font-extrabold tracking-[0.06em] text-coral ring-1 ring-coral/30 transition-transform hover:scale-[1.01]"
        >
          MARK MISSED
        </button>
      </div>
    </div>
  );
}
