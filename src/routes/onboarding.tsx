import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import truckImg from "@/assets/truck.png";
import mapHero from "@/assets/map-hero.jpg";
import cleanStreet from "@/assets/clean-street.jpg";
import { BrandMark } from "@/components/cleantrack/shell";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome to CleanTrack — Know. Track. Collect. Sustain." },
      {
        name: "description",
        content:
          "Your waste. Your schedule. Your cleaner street. See how CleanTrack keeps your colony clean with live truck tracking.",
      },
      { property: "og:title", content: "Welcome to CleanTrack" },
      { property: "og:description", content: "Your waste. Your schedule. Your cleaner street." },
    ],
  }),
  component: Onboarding,
});

const SLIDES = [
  {
    image: truckImg,
    contain: true,
    headline: ["YOUR WASTE.", "YOUR SCHEDULE.", "YOUR CLEANER STREET."],
    body: "CleanTrack connects your home to the city collection fleet — so garbage day is never a guessing game again.",
  },
  {
    image: mapHero,
    contain: false,
    headline: ["KNOW WHEN YOUR", "TRUCK IS COMING."],
    body: "Watch SAT-247 approach in real time, with a live ETA down to the minute. Step out exactly when it matters.",
  },
  {
    image: cleanStreet,
    contain: false,
    headline: ["EVERY COLLECTION", "MAKES A DIFFERENCE."],
    body: "Track your streak, your kilograms and your colony's reliability — and watch your street stay clean.",
  },
];

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[index]!;
  const last = index === SLIDES.length - 1;

  return (
    <div className="relative flex h-full min-h-dvh flex-col bg-background">
      {/* visual */}
      <div
        key={index}
        className="animate-fade-in relative h-[52%] overflow-hidden rounded-b-[2.5rem] bg-pale shadow-card"
      >
        {slide.contain ? (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(closest-side,oklch(0.92_0.05_156),var(--pale))]">
            <img
              src={slide.image}
              alt="Modern green CleanTrack waste collection truck"
              width={1024}
              height={1024}
              className="animate-soft-bounce w-[86%] drop-shadow-[0_28px_32px_oklch(0.314_0.061_165.9_/_25%)]"
            />
          </div>
        ) : (
          <img
            src={slide.image}
            alt={
              index === 1
                ? "Stylized live city map with glowing route and truck marker"
                : "A clean, green Hyderabad residential street at golden hour"
            }
            width={1024}
            height={1280}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute left-4 top-4">
          <BrandMark small />
        </div>
        <Link
          to="/"
          className="absolute right-4 top-4 rounded-full glass-panel px-4 py-2 text-[11px] font-bold tracking-wide text-forest"
        >
          SKIP
        </Link>
      </div>

      {/* copy */}
      <div key={`copy-${index}`} className="animate-sheet-up flex flex-1 flex-col px-7 pt-8">
        <h1 className="text-[2rem] font-extrabold leading-[1.05] tracking-tight text-forest">
          {slide.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted-foreground">{slide.body}</p>

        <div className="mt-auto pb-8">
          <div className="mb-6 flex items-center gap-2">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-emerald" : "w-1.5 bg-forest/15"
                }`}
              />
            ))}
          </div>

          {last ? (
            <div className="animate-float-in space-y-3">
              <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">CONTINUE AS</p>
              <div className="grid grid-cols-3 gap-2">
                {(
                  [
                    { to: "/", label: "Resident" },
                    { to: "/driver", label: "Driver" },
                    { to: "/municipal", label: "Control" },
                  ] as const
                ).map((r) => (
                  <button
                    key={r.to}
                    type="button"
                    onClick={() => navigate({ to: r.to })}
                    className="rounded-2xl bg-forest py-4 text-xs font-extrabold tracking-wide text-ivory shadow-lift transition-transform hover:scale-[1.03] active:scale-95"
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setIndex((i) => i + 1)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-wide text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
            >
              CONTINUE <ArrowRight className="size-4" strokeWidth={2.6} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
