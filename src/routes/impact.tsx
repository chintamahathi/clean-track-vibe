import { createFileRoute } from "@tanstack/react-router";
import { Award, Flame, House, Recycle, TreePine, TrendingDown, Truck } from "lucide-react";
import cleanStreet from "@/assets/clean-street.jpg";
import { CountUp } from "@/components/cleantrack/count-up";
import { ProgressRing } from "@/components/cleantrack/progress-ring";
import { badges, colonyProgressCompare, impact, sustainabilityScore } from "@/lib/data";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Your impact — CleanTrack" },
      {
        name: "description",
        content:
          "Your collection streak, kilograms collected and colony reliability — every successful collection keeps waste out of the street.",
      },
      { property: "og:title", content: "Your impact — CleanTrack" },
      { property: "og:description", content: "Streaks, kilograms and colony-level sustainability impact." },
    ],
  }),
  component: Impact,
});

function Impact() {
  return (
    <div className="px-5 pt-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-forest">Your impact</h1>
      <p className="mt-1 text-xs font-medium text-muted-foreground">Small habits, visibly cleaner streets.</p>

      {/* streak hero */}
      <section className="animate-float-in relative mt-5 overflow-hidden rounded-[2rem] bg-pale p-7 text-center shadow-card">
        <span className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-soft text-amber">
          <Flame className="size-6" />
        </span>
        <p className="text-mega mt-3 text-forest">
          <CountUp to={impact.streakDays} />
        </p>
        <p className="text-xs font-extrabold tracking-[0.2em] text-emerald">DAY COLLECTION STREAK</p>
        <p className="mx-auto mt-3 max-w-[30ch] text-xs leading-relaxed text-muted-foreground">
          You've put your waste out on time {impact.streakDays} days in a row. Your street notices.
        </p>
      </section>

      {/* stats */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-3xl bg-card p-5 shadow-card">
          <span className="flex size-9 items-center justify-center rounded-xl bg-emerald-soft text-emerald">
            <Recycle className="size-4" />
          </span>
          <p className="text-big-number mt-3 text-forest">
            <CountUp to={impact.collectedKg} />
            <span className="ml-1 text-sm font-extrabold text-emerald">KG</span>
          </p>
          <p className="text-[10px] font-extrabold tracking-[0.14em] text-muted-foreground">COLLECTED THIS MONTH</p>
        </div>
        <div className="flex flex-col items-center justify-center rounded-3xl bg-card p-5 shadow-card">
          <ProgressRing value={impact.reliability} size={92} stroke={10} color="var(--emerald)">
            <p className="text-xl font-extrabold tracking-tight text-forest">
              <CountUp to={impact.reliability} />%
            </p>
          </ProgressRing>
          <p className="mt-2 text-[10px] font-extrabold tracking-[0.14em] text-muted-foreground">RELIABILITY</p>
        </div>
      </div>

      {/* colony impact */}
      <section className="mt-4 overflow-hidden rounded-[2rem] bg-forest p-6 text-ivory shadow-float">
        <p className="text-[10px] font-extrabold tracking-[0.2em] text-lime">YOUR COLONY</p>
        <h2 className="mt-1 text-sm font-bold text-ivory/80">{impact.colony.name}</h2>
        <div className="mt-4 flex items-end justify-between">
          <p className="text-mega !text-[4rem] text-ivory">
            <CountUp to={impact.colony.reliability} />
            <span className="text-2xl text-lime">%</span>
          </p>
          <p className="pb-2 text-right text-[10px] font-extrabold leading-relaxed tracking-[0.14em] text-ivory/60">
            COLLECTION
            <br />
            RELIABILITY
          </p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-ivory/8 p-4 ring-1 ring-ivory/10">
            <p className="text-3xl font-extrabold tracking-tight text-amber">{impact.colony.missedPickups}</p>
            <p className="mt-1 text-[10px] font-extrabold tracking-[0.12em] text-ivory/55">MISSED PICKUPS</p>
          </div>
          <div className="rounded-2xl bg-ivory/8 p-4 ring-1 ring-ivory/10">
            <p className="text-3xl font-extrabold tracking-tight text-coral">{impact.colony.overflowIncidents}</p>
            <p className="mt-1 text-[10px] font-extrabold tracking-[0.12em] text-ivory/55">OVERFLOW INCIDENT</p>
          </div>
        </div>
      </section>

      {/* sustainability score */}
      <section className="animate-float-in mt-4 flex items-center gap-6 rounded-[2rem] bg-card p-6 shadow-card">
        <ProgressRing value={sustainabilityScore.score} size={110} stroke={11} color="var(--lime)" track="var(--pale)">
          <p className="text-2xl font-extrabold tracking-tight text-forest">
            <CountUp to={sustainabilityScore.score} />
          </p>
        </ProgressRing>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-emerald">SUSTAINABILITY SCORE</p>
          <p className="mt-1 text-sm font-extrabold text-forest">
            You · {sustainabilityScore.score} <span className="font-medium text-muted-foreground">vs colony avg {sustainabilityScore.colony}</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {sustainabilityScore.factors.map((f) => (
              <span key={f} className="rounded-full bg-emerald-soft px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-emerald">
                {f.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* colony progress compare */}
      <section className="mt-4 rounded-[2rem] bg-card p-6 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">YOUR COLONY · VS LAST MONTH</p>
        <div className="mt-4 space-y-3">
          {(
            [
              { label: "Missed pickups", last: colonyProgressCompare.lastMonth.missed, now: colonyProgressCompare.thisMonth.missed },
              { label: "Overflow incidents", last: colonyProgressCompare.lastMonth.overflow, now: colonyProgressCompare.thisMonth.overflow },
              { label: "Reliability", last: colonyProgressCompare.lastMonth.reliability, now: colonyProgressCompare.thisMonth.reliability, suffix: "%" },
            ] as const
          ).map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <p className="w-28 shrink-0 text-xs font-bold text-forest">{row.label}</p>
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-forest/8">
                <div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--lime))]"
                  style={{ width: `${row.suffix ? row.now : Math.min(100, 100 - row.now * 4)}%` }}
                />
              </div>
              <span className="flex w-20 shrink-0 items-center justify-end gap-1 text-xs font-extrabold text-emerald">
                <TrendingDown className="size-3" />
                {row.last}
                {row.suffix} → {row.now}
                {row.suffix}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* achievement badges */}
      <section className="mt-4 rounded-[2rem] bg-card p-6 shadow-card">
        <div className="flex items-center gap-2">
          <Award className="size-4 text-amber" />
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">ACHIEVEMENTS</p>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          {badges.map((b, i) => (
            <div
              key={b.label}
              className="animate-float-in rounded-2xl bg-pale p-3.5 text-center ring-1 ring-forest/5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <p className="text-2xl">{b.icon}</p>
              <p className="mt-1.5 text-[11px] font-extrabold leading-tight text-forest">{b.label}</p>
              <p className="mt-0.5 text-[9px] font-semibold text-muted-foreground">{b.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* sustainability story */}
      <section className="relative mt-4 overflow-hidden rounded-[2rem] shadow-float">
        <img
          src={cleanStreet}
          alt="A clean, green residential street in Hyderabad after collection"
          width={1024}
          height={1280}
          loading="lazy"
          className="h-72 w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_top,oklch(0.24_0.05_168_/_92%),oklch(0.24_0.05_168_/_20%)_55%,transparent)]" />
        <div className="absolute inset-x-0 bottom-0 p-6">
          <div className="flex items-center gap-2 text-lime">
            <House className="size-4" />
            <span className="text-ivory/40">→</span>
            <Truck className="size-4" />
            <span className="text-ivory/40">→</span>
            <TreePine className="size-4" />
          </div>
          <p className="mt-3 text-xl font-extrabold leading-snug tracking-tight text-ivory">
            EVERY SUCCESSFUL COLLECTION KEEPS WASTE OUT OF THE STREET.
          </p>
        </div>
      </section>
    </div>
  );
}
