import { createFileRoute } from "@tanstack/react-router";
import { BellRing, Brain, ChevronDown, Check, Shuffle, TriangleAlert, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { CityMap, HOME_POS, MapContainer, MapControls, TRUCK_POS } from "@/components/cleantrack/map";
import { CountUp } from "@/components/cleantrack/count-up";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { StatusPill } from "@/components/cleantrack/status-pill";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { backupVehicle, etaPrediction, truck } from "@/lib/data";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track your truck live — CleanTrack" },
      { name: "description", content: "Watch SAT-247 approach your home in real time with a live ETA and collection status." },
    ],
  }),
  component: Track,
});

const NOTIFY_OPTIONS = [5, 10, 15, 20, 30] as const;
type BackupPhase = "normal" | "breakdown" | "searching" | "found" | "assigned";

function Track() {
  const [eta, setEta] = useState(truck.etaMin);
  const [phase, setPhase] = useState<BackupPhase>("normal");
  const [showEtaWhy, setShowEtaWhy] = useState(false);
  const [notifyMin, setNotifyMin] = useState<number>(10);
  const [notifySaved, setNotifySaved] = useState(false);
  const [showNotifyMenu, setShowNotifyMenu] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setEta((e) => (e === 12 ? 18 : 12)), 7000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (phase === "breakdown") { const t = setTimeout(() => setPhase("searching"), 1600); return () => clearTimeout(t); }
    if (phase === "searching") { const t = setTimeout(() => setPhase("found"), 2400); return () => clearTimeout(t); }
    if (phase === "found")     { const t = setTimeout(() => setPhase("assigned"), 2600); return () => clearTimeout(t); }
    return undefined;
  }, [phase]);

  const effectiveEta = phase === "assigned" ? backupVehicle.etaMin : eta;
  const truckNearby = effectiveEta <= notifyMin;

  function handleSaveNotify(min: number) {
    setNotifyMin(min);
    setNotifySaved(true);
    setShowNotifyMenu(false);
    setTimeout(() => setNotifySaved(false), 3000);
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 pt-5">
        <SubHeader title="Track" />
      </div>

      <MapContainer className="animate-float-in mx-4 mt-4 h-[48dvh] min-h-[320px]">
        <CityMap
          truck={{ x: TRUCK_POS.x, y: TRUCK_POS.y, ...(phase === "normal" ? {} : { color: "var(--coral)" }) }}
          home={HOME_POS}
          {...(phase === "found" || phase === "assigned"
            ? { vehicles: [{ id: backupVehicle.id, x: 128, y: 330, status: "active" as const }], selectedId: backupVehicle.id }
            : {})}
        />
        <MapControls />
        <div className="glass-panel absolute left-3 top-3 z-20 max-w-[220px] rounded-3xl p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-base font-extrabold tracking-tight text-forest">{phase === "assigned" ? backupVehicle.id : truck.id}</p>
            {phase === "normal" ? <StatusPill status="on-route" label="● LIVE" className="!px-2.5 !py-1" />
              : phase === "assigned" ? <StatusPill status="nearby" label="BACKUP" className="!px-2.5 !py-1" />
              : <StatusPill status="unavailable" className="!px-2.5 !py-1" />}
          </div>
          <p className="mt-2 text-3xl font-extrabold tracking-tight text-forest">
            {phase === "normal" || phase === "assigned" ? (
              <><CountUp to={effectiveEta} /><span className="ml-1 text-sm font-extrabold text-emerald">MIN AWAY</span></>
            ) : (
              <span className="text-lg font-extrabold text-coral">
                {phase === "breakdown" ? "UNAVAILABLE" : phase === "searching" ? "FINDING BACKUP…" : "BACKUP FOUND"}
              </span>
            )}
          </p>
          <p className="mt-1 text-[11px] font-semibold text-muted-foreground">{truck.route}</p>
        </div>
      </MapContainer>

      {phase !== "normal" && (
        <section className={`animate-sheet-up relative z-10 mx-4 -mt-6 mb-2 rounded-[1.75rem] p-4 shadow-float ${phase === "assigned" ? "bg-forest text-ivory" : "bg-coral text-primary-foreground"}`}>
          {phase === "assigned" ? (
            <div>
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-lime">🚛 BACKUP VEHICLE ASSIGNED</p>
              <p className="mt-1 text-sm font-extrabold">{backupVehicle.id} · new ETA {backupVehicle.etaMin} min</p>
              <button type="button" onClick={() => setPhase("normal")} className="mt-2 text-[10px] font-extrabold tracking-wide text-ivory/60 underline">RESET DEMO</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/15">
                {phase === "searching" ? <Zap className="size-5 animate-pulse" /> : phase === "found" ? <Shuffle className="size-5" /> : <TriangleAlert className="size-5" />}
              </span>
              <div className="min-w-0">
                <p className="text-[10px] font-extrabold tracking-[0.14em]">
                  {phase === "breakdown" ? "🚨 SAT-247 UNAVAILABLE" : phase === "searching" ? "SEARCHING FOR BACKUP…" : "NEARBY VEHICLE FOUND"}
                </p>
                {phase === "found" && <p className="mt-0.5 text-xs font-bold">{backupVehicle.id} · {backupVehicle.distanceKm} km away</p>}
              </div>
            </div>
          )}
        </section>
      )}

      {truckNearby && notifySaved && (
        <div className="animate-sheet-up mx-4 -mt-2 mb-2 flex items-start gap-3 rounded-3xl bg-forest p-4 text-ivory shadow-float">
          <span className="text-xl">🚛</span>
          <div>
            <p className="text-[10px] font-extrabold tracking-[0.16em] text-lime">YOUR TRUCK IS NEARBY</p>
            <p className="mt-0.5 text-sm font-bold">{phase === "assigned" ? backupVehicle.id : truck.id} arrives in approximately {effectiveEta} minutes.</p>
          </div>
        </div>
      )}

      <section className="animate-sheet-up relative z-10 mx-4 -mt-10 rounded-[2rem] bg-card p-5 shadow-float">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-forest/10" />
        <div className="flex items-center gap-5">
          <ProgressRing value={Math.round(((truck.totalStops - truck.stopsRemaining) / truck.totalStops) * 100)} size={104} stroke={10} color="var(--emerald)">
            <div className="text-center">
              <p className="text-2xl font-extrabold tracking-tight text-forest"><CountUp to={effectiveEta} /></p>
              <p className="text-[9px] font-extrabold tracking-[0.14em] text-emerald">MIN ETA</p>
            </div>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-extrabold tracking-tight text-forest">Almost there</h1>
            <p className="mt-0.5 text-xs font-medium leading-relaxed text-muted-foreground">{truck.id} is on the {truck.route}.</p>
            <p className="mt-2 text-xs font-bold text-forest">Arrival window <span className="text-emerald">{truck.window}</span></p>
          </div>
        </div>

        {/* NOTIFY ME */}
        <div className="mt-4 rounded-2xl bg-pale p-4">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-forest/50">NOTIFY ME</p>
          <div className="relative mt-2">
            <button type="button" onClick={() => setShowNotifyMenu((s) => !s)}
              className="flex w-full items-center justify-between gap-2 rounded-2xl bg-card px-4 py-3 text-sm font-extrabold tracking-wide text-forest shadow-card">
              <div className="flex items-center gap-2">
                <BellRing className="size-4 text-emerald" />
                <span>{notifyMin} MINUTES BEFORE</span>
              </div>
              <ChevronDown className={`size-4 text-forest/40 transition-transform ${showNotifyMenu ? "rotate-180" : ""}`} />
            </button>
            {showNotifyMenu && (
              <div className="animate-float-in absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-2xl bg-card shadow-float ring-1 ring-forest/8">
                {NOTIFY_OPTIONS.map((min) => (
                  <button key={min} type="button" onClick={() => handleSaveNotify(min)}
                    className={`flex w-full items-center justify-between px-4 py-3 text-sm font-bold transition-colors hover:bg-pale ${notifyMin === min ? "text-forest" : "text-forest/70"}`}>
                    <span>{min} min before</span>
                    {notifyMin === min && <Check className="size-4 text-emerald" strokeWidth={3} />}
                  </button>
                ))}
              </div>
            )}
          </div>
          {!notifySaved ? (
            <button type="button" onClick={() => handleSaveNotify(notifyMin)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-3 text-sm font-extrabold tracking-[0.06em] text-ivory transition-transform hover:scale-[1.01] active:scale-[0.98]">
              <BellRing className="size-4" /> SAVE NOTIFICATION PREFERENCE
            </button>
          ) : (
            <div className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-emerald-soft py-3 text-sm font-extrabold tracking-wide text-emerald ring-1 ring-emerald/25">
              <Check className="size-4" strokeWidth={3} /> Notification preference saved.
            </div>
          )}
        </div>

        {/* Smart ETA */}
        <div className="mt-3 rounded-2xl bg-pale p-4">
          <button type="button" onClick={() => setShowEtaWhy((s) => !s)} className="flex w-full items-center gap-2.5 text-left">
            <Brain className="size-4 shrink-0 text-emerald" />
            <span className="flex-1 text-xs font-extrabold tracking-wide text-forest">
              SMART ETA · {etaPrediction.time} · <span className="text-emerald">CONFIDENCE {etaPrediction.confidence}</span>
            </span>
            <ChevronDown className={`size-4 text-forest/40 transition-transform ${showEtaWhy ? "rotate-180" : ""}`} />
          </button>
          {showEtaWhy && (
            <ul className="animate-float-in mt-3 space-y-1.5 border-t border-forest/8 pt-3">
              {etaPrediction.factors.filter((f) => !f.toLowerCase().includes("stops remaining")).map((f) => (
                <li key={f} className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
                  <span className="size-1.5 rounded-full bg-emerald" /> {f}
                </li>
              ))}
            </ul>
          )}
        </div>

        {phase === "normal" && (
          <button type="button" onClick={() => setPhase("breakdown")}
            className="mt-3 w-full py-1 text-center text-[10px] font-extrabold tracking-[0.14em] text-forest/35">
            DEMO · SIMULATE BREAKDOWN
          </button>
        )}
      </section>
      <div className="h-6" />
    </div>
  );
}
