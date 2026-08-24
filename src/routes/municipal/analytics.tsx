import { createFileRoute } from "@tanstack/react-router";
import { TrendingUp } from "lucide-react";
import { CountUp } from "@/components/cleantrack/count-up";
import { analytics } from "@/lib/data";

export const Route = createFileRoute("/municipal/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics — CleanTrack Control" },
      {
        name: "description",
        content: "Collection reliability, response times and waste diverted — one clear insight per metric.",
      },
      { property: "og:title", content: "Analytics — CleanTrack Control" },
      { property: "og:description", content: "Editorial analytics: big numbers, one elegant chart, one insight." },
    ],
  }),
  component: MunicipalAnalytics,
});

/** Build a smooth cubic path through the series. */
function smoothPath(values: number[], w: number, h: number, pad = 8) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pts = values.map((v, i) => ({
    x: pad + (i * (w - pad * 2)) / (values.length - 1),
    y: h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2),
  }));
  return pts.reduce((d, p, i) => {
    if (i === 0) return `M ${p.x} ${p.y}`;
    const prev = pts[i - 1]!;
    const cx = (prev.x + p.x) / 2;
    return `${d} C ${cx} ${prev.y}, ${cx} ${p.y}, ${p.x} ${p.y}`;
  }, "");
}

function MunicipalAnalytics() {
  const W = 340;
  const H = 120;
  const line = smoothPath(analytics.series, W, H);
  const area = `${line} L ${W - 8} ${H} L 8 ${H} Z`;

  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ivory">Analytics</h1>
      <p className="mt-1 text-xs font-medium text-ivory/50">This week across all zones.</p>

      {/* headline metric + chart */}
      <section className="animate-float-in mt-5 rounded-[2rem] bg-forest p-6 ring-1 ring-lime/10">
        <p className="text-[10px] font-extrabold tracking-[0.2em] text-ivory/50">COLLECTION RELIABILITY</p>
        <div className="mt-2 flex items-end gap-3">
          <p className="text-mega text-ivory">
            <CountUp to={analytics.reliability} />
            <span className="text-3xl text-lime">%</span>
          </p>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-xs font-bold text-emerald">
          <TrendingUp className="size-3.5" />↑ 8% compared with last week
        </p>
        <svg viewBox={`0 0 ${W} ${H}`} className="mt-5 w-full" role="img" aria-label="Reliability trend for the last 7 days">
          <defs>
            <linearGradient id="relFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--emerald)" stopOpacity="0.35" />
              <stop offset="100%" stopColor="var(--emerald)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#relFill)" />
          <path d={line} fill="none" stroke="var(--emerald)" strokeWidth="3" strokeLinecap="round" />
          {analytics.series.map((v, i) => {
            const min = Math.min(...analytics.series);
            const max = Math.max(...analytics.series);
            const x = 8 + (i * (W - 16)) / (analytics.series.length - 1);
            const y = H - 8 - ((v - min) / (max - min)) * (H - 16);
            return <circle key={i} cx={x} cy={y} r={i === analytics.series.length - 1 ? 5 : 3} fill={i === analytics.series.length - 1 ? "var(--lime)" : "var(--emerald)"} />;
          })}
        </svg>
        <div className="mt-1 flex justify-between px-1 text-[9px] font-bold tracking-widest text-ivory/35">
          {analytics.days.map((d, i) => (
            <span key={i}>{d}</span>
          ))}
        </div>
      </section>

      {/* supporting metrics */}
      <div className="mt-4 grid grid-cols-3 gap-3 pb-4">
        <div className="rounded-3xl bg-forest p-4 ring-1 ring-lime/10">
          <p className="text-3xl font-extrabold tracking-tight text-lime">
            <CountUp to={analytics.onTime} />%
          </p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">ON-TIME ARRIVALS</p>
        </div>
        <div className="rounded-3xl bg-forest p-4 ring-1 ring-lime/10">
          <p className="text-3xl font-extrabold tracking-tight text-cyan">
            <CountUp to={analytics.avgResponseMin} />
            <span className="text-sm">m</span>
          </p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">AVG RESPONSE</p>
        </div>
        <div className="rounded-3xl bg-forest p-4 ring-1 ring-lime/10">
          <p className="text-3xl font-extrabold tracking-tight text-emerald">
            <CountUp to={analytics.tonnesDiverted} decimals={1} />
            <span className="text-sm">t</span>
          </p>
          <p className="mt-1 text-[9px] font-extrabold tracking-[0.12em] text-ivory/50">WASTE DIVERTED</p>
        </div>
      </div>
    </div>
  );
}
