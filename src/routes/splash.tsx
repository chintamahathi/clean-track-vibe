import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Leaf } from "lucide-react";
import { useEffect } from "react";
import truckImg from "@/assets/truck.png";

export const Route = createFileRoute("/splash")({
  head: () => ({
    meta: [
      { title: "ESWACH — Know. Track. Collect. Sustain." },
      {
        name: "description",
        content: "Your garbage collection, made predictable. Premium live tracking for waste collection.",
      },
      { property: "og:title", content: "ESWACH" },
      { property: "og:description", content: "Your garbage collection, made predictable." },
    ],
  }),
  component: Splash,
});

const TAGLINE = ["KNOW.", "TRACK.", "COLLECT.", "SUSTAIN."];

const LEAVES = [
  { left: "12%", top: "16%", size: "size-5", delay: "0s", tone: "text-emerald/35" },
  { left: "82%", top: "22%", size: "size-4", delay: "1.4s", tone: "text-lime/50" },
  { left: "70%", top: "62%", size: "size-6", delay: "0.8s", tone: "text-emerald/25" },
  { left: "16%", top: "70%", size: "size-4", delay: "2.2s", tone: "text-lime/40" },
  { left: "46%", top: "10%", size: "size-3", delay: "3s", tone: "text-emerald/30" },
];

function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const seen = window.localStorage.getItem("ct_onboarded") === "1";
    const t = setTimeout(() => {
      navigate({ to: seen ? "/" : "/onboarding", replace: true });
    }, 3600);
    return () => clearTimeout(t);
  }, [navigate]);

  const skip = () => {
    const seen = window.localStorage.getItem("ct_onboarded") === "1";
    navigate({ to: seen ? "/" : "/onboarding", replace: true });
  };

  return (
    <button
      type="button"
      onClick={skip}
      aria-label="Continue"
      className="relative flex h-full min-h-dvh w-full cursor-pointer flex-col items-center justify-center overflow-hidden bg-[linear-gradient(180deg,var(--cream),var(--pale))] text-center"
    >
      {/* soft sunlight */}
      <div aria-hidden className="absolute -top-24 left-1/2 size-80 -translate-x-1/2 rounded-full bg-lime/25 blur-3xl" />
      <div aria-hidden className="absolute -bottom-28 -right-16 size-72 rounded-full bg-cyan/20 blur-3xl" />
      <div aria-hidden className="absolute -left-20 top-1/3 size-64 rounded-full bg-emerald/15 blur-3xl" />

      {/* route line drawing itself */}
      <svg
        aria-hidden
        viewBox="0 0 400 520"
        className="pointer-events-none absolute inset-0 h-full w-full opacity-60"
        preserveAspectRatio="xMidYMid slice"
      >
        <path
          d="M -20 480 C 110 420 90 330 190 290 C 280 254 250 170 330 120 C 370 95 390 70 420 40"
          fill="none"
          stroke="var(--emerald)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 14"
          className="animate-dash-draw"
          style={{ strokeDashoffset: 600 }}
        />
        <circle cx="330" cy="120" r="5" fill="var(--cyan)" />
        <circle cx="190" cy="290" r="5" fill="var(--cyan)" />
      </svg>

      {/* drifting leaves */}
      {LEAVES.map((l, i) => (
        <Leaf
          key={i}
          aria-hidden
          className={`animate-leaf-drift absolute ${l.size} ${l.tone}`}
          style={{ left: l.left, top: l.top, animationDelay: l.delay }}
        />
      ))}

      {/* truck */}
      <img
        src={truckImg}
        alt="ESWACH collection truck on a clean, green street"
        width={1024}
        height={1024}
        className="animate-soft-bounce animate-float-in relative w-56 drop-shadow-[0_30px_34px_oklch(0.314_0.061_165.9_/_28%)]"
      />

      {/* logo */}
      <div className="animate-float-in mt-6 flex items-center gap-3" style={{ animationDelay: "250ms" }}>
        <span className="flex size-12 items-center justify-center rounded-2xl bg-forest text-base font-extrabold tracking-tight text-lime shadow-lift">
          CT
        </span>
        <span className="text-2xl font-extrabold tracking-tight text-forest">
          CLEAN<span className="text-emerald">TRACK</span>
        </span>
      </div>

      {/* tagline */}
      <p className="mt-5 text-lg font-extrabold tracking-[0.14em] text-forest">
        {TAGLINE.map((w, i) => (
          <span
            key={w}
            className={`animate-word-up mr-2 inline-block last:mr-0 ${i === 3 ? "text-emerald" : ""}`}
            style={{ animationDelay: `${500 + i * 160}ms` }}
          >
            {w}
          </span>
        ))}
      </p>
      <p className="animate-word-up mt-3 text-xs font-semibold text-muted-foreground" style={{ animationDelay: "1.3s" }}>
        Your garbage collection, made predictable.
      </p>

      {/* loading shimmer */}
      <div className="absolute inset-x-16 bottom-14 h-1 overflow-hidden rounded-full bg-forest/10">
        <div className="h-full w-1/3 animate-[route-shimmer_1.4s_ease-in-out_infinite] rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--lime))]" />
      </div>
      <style>{`@keyframes route-shimmer { 0% { transform: translateX(-100%);} 100% { transform: translateX(300%);} }`}</style>
    </button>
  );
}
