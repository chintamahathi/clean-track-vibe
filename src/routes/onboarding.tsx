import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, House, Truck } from "lucide-react";
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
    alt: "Modern green CleanTrack waste collection truck approaching a residential colony",
    headline: ["YOUR WASTE.", "YOUR SCHEDULE.", "YOUR CLEANER STREET."],
    cta: "GET STARTED",
    card: (
      <div className="glass-panel mt-6 flex items-center gap-3 rounded-3xl p-4">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-forest text-lime">
          <Truck className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">TODAY'S COLLECTION</p>
          <p className="text-sm font-extrabold text-forest">
            SAT-247 <span className="font-semibold text-muted-foreground">· 6:00 – 6:30 PM</span>
          </p>
        </div>
      </div>
    ),
    footnote: "Know when your collection vehicle is coming.",
  },
  {
    image: mapHero,
    contain: false,
    alt: "Stylized live city map with glowing route and truck marker",
    headline: ["KNOW WHEN", "YOUR TRUCK", "IS COMING."],
    cta: "TRACK VEHICLE",
    card: (
      <div className="glass-panel mt-6 rounded-3xl p-4">
        <div className="flex items-center gap-2.5 text-xs font-extrabold text-forest">
          <House className="size-4 text-emerald" /> YOUR HOME
          <span className="flex-1 border-t-2 border-dashed border-emerald/50" />
          <Truck className="size-4 text-emerald" /> SAT-247
        </div>
        <div className="mt-3 flex items-end justify-between">
          <p className="text-3xl font-extrabold tracking-tight text-forest">
            12 <span className="text-sm font-extrabold text-emerald">MIN AWAY</span>
          </p>
          <p className="text-[10px] font-extrabold tracking-[0.12em] text-muted-foreground">18 STOPS REMAINING</p>
        </div>
      </div>
    ),
    footnote: "A live ETA down to the minute.",
  },
  {
    image: cleanStreet,
    contain: false,
    alt: "A clean, green Hyderabad residential street after collection",
    headline: ["EVERY COLLECTION", "MAKES A DIFFERENCE."],
    cta: "CONTINUE",
    card: (
      <div className="glass-panel mt-6 space-y-2.5 rounded-3xl p-4">
        <p className="flex items-center gap-2.5 text-sm font-extrabold text-forest">
          <CheckCircle2 className="size-5 text-emerald" /> COLLECTION COMPLETE
          <span className="ml-auto text-xs font-bold text-muted-foreground">6:21 PM</span>
        </p>
        <p className="flex items-center gap-2.5 text-sm font-extrabold text-forest">
          <span aria-hidden>🌱</span> 18 DAY COLLECTION STREAK
        </p>
      </div>
    ),
    footnote: "Watch your street stay clean.",
  },
];

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const slide = SLIDES[index]!;
  const last = index === SLIDES.length - 1;

  const finish = () => navigate({ to: "/language" });
  const skip = () => {
    window.localStorage.setItem("ct_onboarded", "1");
    navigate({ to: "/" });
  };

  return (
    <div className="relative flex h-full min-h-dvh flex-col bg-background">
      {/* visual */}
      <div
        key={index}
        className="animate-fade-in relative h-[46%] overflow-hidden rounded-b-[2.5rem] bg-pale shadow-card"
      >
        {slide.contain ? (
          <div className="flex h-full items-center justify-center bg-[radial-gradient(closest-side,oklch(0.92_0.05_156),var(--pale))]">
            <img
              src={slide.image}
              alt={slide.alt}
              width={1024}
              height={1024}
              className="animate-soft-bounce w-[82%] drop-shadow-[0_28px_32px_oklch(0.314_0.061_165.9_/_25%)]"
            />
          </div>
        ) : (
          <img
            src={slide.image}
            alt={slide.alt}
            width={1024}
            height={1280}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute left-4 top-4">
          <BrandMark small />
        </div>
        <button
          type="button"
          onClick={skip}
          className="glass-panel absolute right-4 top-4 rounded-full px-4 py-2 text-[11px] font-bold tracking-wide text-forest"
        >
          SKIP
        </button>
      </div>

      {/* copy */}
      <div key={`copy-${index}`} className="animate-sheet-up flex flex-1 flex-col px-7 pt-7">
        <h1 className="text-[1.9rem] font-extrabold leading-[1.05] tracking-tight text-forest">
          {slide.headline.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h1>

        {slide.card}
        <p className="mt-3 text-xs font-medium text-muted-foreground">{slide.footnote}</p>

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

          <button
            type="button"
            onClick={() => (last ? finish() : setIndex((i) => i + 1))}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            {slide.cta} <ArrowRight className="size-4" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
