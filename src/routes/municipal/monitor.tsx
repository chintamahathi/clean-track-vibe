import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CityMap, MapContainer, ROUTE_D } from "@/components/cleantrack/map";
import { routeMonitor } from "@/lib/data";

export const Route = createFileRoute("/municipal/monitor")({
  head: () => ({
    meta: [
      { title: "Route monitoring — CleanTrack Control" },
      { name: "description", content: "Replay any vehicle's route: completed, missed and deviated streets with timestamps." },
      { property: "og:title", content: "Route monitoring — CleanTrack Control" },
      { property: "og:description", content: "Route replay and street-level compliance monitoring." },
    ],
  }),
  component: Monitor,
});

const MISSED = [
  { x: 140, y: 336 },
  { x: 246, y: 196 },
];

function Monitor() {
  const pathRef = useRef<SVGPathElement>(null);
  const [len, setLen] = useState(0);
  const [t, setT] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (pathRef.current) setLen(pathRef.current.getTotalLength());
  }, []);

  useEffect(() => {
    if (!playing) return;
    const i = setInterval(() => setT((v) => Math.min(1, v + 0.008)), 50);
    return () => clearInterval(i);
  }, [playing]);

  useEffect(() => {
    if (t >= 1) setPlaying(false);
  }, [t]);

  const pt = len && pathRef.current ? pathRef.current.getPointAtLength(len * t) : null;
  const stats = [
    { label: "ASSIGNED", value: routeMonitor.assignedStreets, tone: "text-ivory" },
    { label: "COMPLETED", value: routeMonitor.completedStreets, tone: "text-emerald" },
    { label: "REMAINING", value: routeMonitor.remainingStreets, tone: "text-cyan" },
    { label: "MISSED", value: routeMonitor.missedStreets, tone: "text-coral" },
  ];

  return (
    <div className="flex h-full flex-col px-4 pt-6">
      <div className="px-1">
        <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">ROUTE MONITORING</p>
        <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">
          {routeMonitor.vehicle} <span className="text-base font-bold text-ivory/50">· {routeMonitor.date}</span>
        </h1>
      </div>

      {/* replay map */}
      <MapContainer className="animate-float-in mt-4 h-[46dvh] min-h-[340px] ring-1 ring-lime/10">
        <CityMap theme="dark" route={false} points={false}>
          {/* full route, muted */}
          <path ref={pathRef} d={ROUTE_D} fill="none" stroke="color-mix(in oklab, var(--ivory) 18%, transparent)" strokeWidth="6" strokeLinecap="round" />
          {/* replayed portion */}
          <path d={ROUTE_D} fill="none" stroke="var(--emerald)" strokeWidth="6" strokeLinecap="round" pathLength={100} strokeDasharray={`${t * 100} 100`} />
          {/* missed streets */}
          {MISSED.map((m, i) => (
            <g key={i} transform={`translate(${m.x} ${m.y})`}>
              <circle r="9" fill="var(--coral)" stroke="var(--forest-deep)" strokeWidth="3" />
              <path d="M -2.5 -2.5 L 2.5 2.5 M 2.5 -2.5 L -2.5 2.5" stroke="var(--forest-deep)" strokeWidth="2" strokeLinecap="round" />
            </g>
          ))}
          {/* replay truck */}
          {pt && (
            <g transform={`translate(${pt.x} ${pt.y})`}>
              <circle r="16" fill="var(--cyan)" opacity="0.4" className="animate-marker-pulse" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
              <circle r="11" fill="var(--cyan)" stroke="var(--forest-deep)" strokeWidth="3.5" />
            </g>
          )}
        </CityMap>

        {/* legend */}
        <div className="glass-panel-dark absolute left-3 top-3 z-20 space-y-1.5 rounded-2xl p-3 text-[11px] font-bold text-ivory">
          <p className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-emerald" /> Replayed</p>
          <p className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-ivory/25" /> Remaining</p>
          <p className="flex items-center gap-1.5"><span className="size-2 rounded-full bg-coral" /> Missed street</p>
        </div>
      </MapContainer>

      {/* controls */}
      <section className="animate-sheet-up relative z-10 -mt-8 rounded-[2rem] bg-forest p-5 ring-1 ring-lime/15 shadow-float">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause replay" : "Play route replay"}
            className="flex size-12 shrink-0 items-center justify-center rounded-full bg-lime text-forest-deep transition-transform hover:scale-105"
          >
            {playing ? <Pause className="size-5" /> : <Play className="size-5 translate-x-0.5" />}
          </button>
          <div className="min-w-0 flex-1">
            <div className="h-2 overflow-hidden rounded-full bg-ivory/10">
              <div className="h-full rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--cyan))] transition-all" style={{ width: `${t * 100}%` }} />
            </div>
            <p className="mt-1.5 text-[10px] font-extrabold tracking-[0.14em] text-ivory/50">
              ROUTE REPLAY · {Math.round(t * 100)}%
            </p>
          </div>
          <button
            type="button"
            aria-label="Restart replay"
            onClick={() => {
              setT(0);
              setPlaying(true);
            }}
            className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ivory/10 text-ivory ring-1 ring-ivory/15 transition-transform hover:scale-105"
          >
            <RotateCcw className="size-4" />
          </button>
        </div>

        {/* street stats */}
        <div className="mt-4 grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-ivory/6 p-3 text-center ring-1 ring-ivory/8">
              <p className={`text-xl font-extrabold tracking-tight ${s.tone}`}>{s.value}</p>
              <p className="mt-0.5 text-[8px] font-extrabold tracking-[0.12em] text-ivory/45">{s.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center justify-between text-[11px] font-bold text-ivory/55">
          <span>Deviation {routeMonitor.deviationKm} km · {routeMonitor.completion}% complete</span>
          <span className="text-lime">Done by {routeMonitor.etaComplete}</span>
        </div>
      </section>
    </div>
  );
}
