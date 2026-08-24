import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, House, Leaf, MapPin, Navigation, Truck } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import streetImg from "@/assets/onboard-street.jpg";
import cleanStreet from "@/assets/clean-street.jpg";
import { BrandMark } from "@/components/cleantrack/shell";
import { CityMap, HOME_POS, TRUCK_POS } from "@/components/cleantrack/map";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Welcome to CleanTrack — Know. Track. Keep Your Street Clean." },
      {
        name: "description",
        content:
          "Know your collection schedule, track your garbage truck live, and keep your street clean with CleanTrack.",
      },
      { property: "og:title", content: "Welcome to CleanTrack" },
      {
        property: "og:description",
        content: "Know your collection. Track your truck. Keep your street clean.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Onboarding,
});

/* ---------------------------------- phone screens ---------------------------------- */

function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-[9/16] overflow-hidden rounded-[2rem] border border-forest/8 bg-cream shadow-float ${className}`}
    >
      {children}
      <span className="pointer-events-none absolute inset-0 rounded-[2rem] bg-[linear-gradient(135deg,oklch(1_0_0_/_38%),transparent_38%,transparent_72%,oklch(1_0_0_/_18%))]" />
    </div>
  );
}

function KnowScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5">
        <p className="text-[7px] font-extrabold tracking-[0.22em] text-emerald">CLEANTRACK</p>
        <h3 className="mt-1 text-[15px] font-extrabold leading-[1.05] tracking-tight text-forest">
          KNOW YOUR
          <br />
          <span className="text-emerald">COLLECTION.</span>
        </h3>
      </div>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-t-[1.6rem]">
        <img
          src={streetImg}
          alt="Municipal garbage truck collecting on a clean Hyderabad residential street"
          width={1024}
          height={1024}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="glass-panel absolute inset-x-3 bottom-3 rounded-2xl p-2.5">
          <p className="flex items-center gap-1.5 text-[7px] font-extrabold tracking-[0.16em] text-emerald">
            <Truck className="size-2.5" /> COLLECTION SCHEDULE
          </p>
          <p className="mt-0.5 text-[11px] font-extrabold text-forest">6:00 – 6:30 PM</p>
          <p className="text-[8px] font-bold text-muted-foreground">Today · SAT-247</p>
        </div>
      </div>
    </div>
  );
}

function TrackScreen() {
  return (
    <div className="flex h-full flex-col bg-cream">
      <div className="px-4 pt-5">
        <p className="text-[7px] font-extrabold tracking-[0.22em] text-emerald">YOUR CLEANTRACK</p>
        <h3 className="mt-1 text-[15px] font-extrabold leading-[1.05] tracking-tight text-forest">
          TRACK YOUR
          <br />
          <span className="text-emerald">TRUCK.</span>
        </h3>
        <div className="mt-2.5 flex gap-1.5">
          <div className="flex-1 rounded-xl bg-forest px-2 py-1.5 text-ivory">
            <p className="flex items-center gap-1 text-[7px] font-extrabold tracking-[0.14em] text-lime">
              <Truck className="size-2.5" /> SAT-247
            </p>
            <p className="text-[9px] font-extrabold">ON ROUTE</p>
          </div>
          <div className="flex-1 rounded-xl bg-amber-soft px-2 py-1.5">
            <p className="text-[12px] font-extrabold leading-none text-forest">12 MIN</p>
            <p className="text-[7px] font-bold text-forest/60">Estimated arrival</p>
          </div>
        </div>
      </div>

      <div className="relative mt-3 flex-1 overflow-hidden rounded-t-[1.6rem]">
        <CityMap truck={TRUCK_POS} home={HOME_POS} className="scale-[1.05]" />
        <div className="glass-panel absolute inset-x-3 top-3 flex items-center justify-between rounded-xl px-2.5 py-1.5">
          <span className="flex items-center gap-1 text-[7px] font-extrabold text-forest">
            <House className="size-2.5 text-emerald" /> YOU
          </span>
          <span className="text-[7px] font-bold text-muted-foreground">1.2 KM · 18 STOPS</span>
        </div>
        <div className="glass-panel absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl p-2.5">
          <span className="flex size-7 items-center justify-center rounded-xl bg-cyan/30 text-forest">
            <Navigation className="size-3" />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold leading-tight text-forest">
              YOUR TRUCK IS 12 MINUTES AWAY.
            </p>
            <p className="text-[7px] font-extrabold tracking-[0.14em] text-emerald">TRACK NOW →</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SustainScreen() {
  return (
    <div className="flex h-full flex-col">
      <div className="px-4 pt-5">
        <p className="text-[7px] font-extrabold tracking-[0.22em] text-emerald">EVERYDAY IMPACT</p>
        <h3 className="mt-1 text-[15px] font-extrabold leading-[1.05] tracking-tight text-forest">
          KEEP YOUR
          <br />
          <span className="text-emerald">STREET CLEAN.</span>
        </h3>
      </div>
      <div className="relative mt-3 flex-1 overflow-hidden rounded-t-[1.6rem]">
        <img
          src={cleanStreet}
          alt="A clean, green residential street after collection"
          width={1024}
          height={1280}
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="glass-panel absolute inset-x-3 top-3 flex items-center gap-2 rounded-2xl p-2.5">
          <CheckCircle2 className="size-3.5 text-emerald" />
          <div>
            <p className="text-[9px] font-extrabold text-forest">COLLECTION COMPLETE</p>
            <p className="text-[7px] font-bold text-muted-foreground">SAT-247 · 6:21 PM</p>
          </div>
        </div>
        <div className="absolute inset-x-3 bottom-3 flex items-center gap-2 rounded-2xl bg-forest p-2.5 text-ivory shadow-lift">
          <Leaf className="size-3.5 text-lime" />
          <p className="text-[9px] font-extrabold tracking-wide">18 DAY CLEAN STREAK</p>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- page data ---------------------------------- */

const PAGES = [
  {
    kicker: "01 — SCHEDULE",
    headline: ["KNOW YOUR", "COLLECTION."],
    accent: "COLLECTION.",
    body: "See your collection schedule before the truck reaches your street.",
    cta: "NEXT",
    screen: <KnowScreen />,
  },
  {
    kicker: "02 — LIVE TRACKING",
    headline: ["TRACK YOUR", "TRUCK."],
    accent: "TRUCK.",
    body: "See your garbage vehicle's route and estimated arrival time.",
    cta: "NEXT",
    screen: <TrackScreen />,
  },
  {
    kicker: "03 — SUSTAIN",
    headline: ["KEEP YOUR", "STREET CLEAN."],
    accent: "STREET CLEAN.",
    body: "Know when collection is complete and see your everyday sustainability impact.",
    cta: "GET STARTED",
    screen: <SustainScreen />,
  },
];

/* ---------------------------------- page ---------------------------------- */

function Onboarding() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const touchX = useRef<number | null>(null);
  const page = PAGES[index]!;
  const last = index === PAGES.length - 1;

  const next = () => (last ? navigate({ to: "/language" }) : setIndex((i) => i + 1));
  const skip = () => {
    window.localStorage.setItem("ct_onboarded", "1");
    navigate({ to: "/" });
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0]?.clientX ?? null;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchX.current;
    const end = e.changedTouches[0]?.clientX;
    touchX.current = null;
    if (start == null || end == null) return;
    const dx = end - start;
    if (dx < -48) setIndex((i) => Math.min(PAGES.length - 1, i + 1));
    if (dx > 48) setIndex((i) => Math.max(0, i - 1));
  };

  const left = PAGES[(index + PAGES.length - 1) % PAGES.length]!;
  const right = PAGES[(index + 1) % PAGES.length]!;

  return (
    <div
      className="relative flex h-full min-h-dvh flex-col overflow-hidden bg-[radial-gradient(120%_70%_at_50%_-10%,var(--pale),var(--ivory)_55%,var(--cream))]"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* soft environmental background */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <span className="absolute -left-16 top-10 size-56 rounded-full bg-emerald/12 blur-3xl" />
        <span className="absolute -right-20 top-40 size-64 rounded-full bg-cyan/18 blur-3xl" />
        <span className="absolute bottom-10 left-1/4 size-52 rounded-full bg-lime/18 blur-3xl" />
        <svg className="absolute inset-x-0 bottom-0 h-56 w-full opacity-40" viewBox="0 0 400 200" fill="none">
          <path d="M0 150 C 80 130 140 170 220 150 C 300 130 360 160 400 148" stroke="var(--emerald)" strokeOpacity="0.22" strokeWidth="2" strokeDasharray="4 10" />
          <path d="M-10 190 C 90 168 150 200 250 178 C 330 160 380 186 410 176" stroke="var(--forest)" strokeOpacity="0.1" strokeWidth="10" />
          <g fill="var(--emerald)" fillOpacity="0.14">
            <circle cx="46" cy="150" r="4" />
            <circle cx="176" cy="158" r="4" />
            <circle cx="322" cy="150" r="4" />
          </g>
        </svg>
        <Leaf className="animate-leaf-drift absolute left-6 top-32 size-6 text-emerald/25" />
        <Leaf className="animate-leaf-drift absolute right-8 top-64 size-5 text-lime/40 [animation-delay:1.4s]" />
        <MapPin className="animate-leaf-drift absolute right-12 top-24 size-5 text-cyan/50 [animation-delay:2.6s]" />
      </div>

      {/* header */}
      <div className="relative z-10 flex items-center justify-between px-6 pt-6">
        <BrandMark small />
        <button
          type="button"
          onClick={skip}
          className="glass-panel rounded-full px-4 py-2 text-[11px] font-bold tracking-wide text-forest"
        >
          SKIP
        </button>
      </div>

      {/* three-phone composition */}
      <div className="relative z-10 mt-4 h-[44vh] min-h-[300px] px-2">
        <div key={`deck-${index}`} className="animate-float-in absolute inset-0">
          <PhoneFrame className="absolute left-[-6%] top-[9%] w-[38%] -rotate-[12deg] opacity-75">
            <div className="pointer-events-none">{left.screen}</div>
          </PhoneFrame>
          <PhoneFrame className="absolute right-[-6%] top-[9%] w-[38%] rotate-[12deg] opacity-75">
            <div className="pointer-events-none">{right.screen}</div>
          </PhoneFrame>
          <PhoneFrame className="absolute left-1/2 top-0 z-10 w-[50%] -translate-x-1/2 shadow-[0_44px_72px_-26px_oklch(0.314_0.061_165.9_/_48%)]">
            {page.screen}
          </PhoneFrame>
        </div>
      </div>


      {/* copy */}
      <div key={`copy-${index}`} className="animate-sheet-up relative z-10 flex flex-1 flex-col px-7 pt-7">
        <p className="text-[10px] font-extrabold tracking-[0.22em] text-emerald">{page.kicker}</p>
        <h1 className="mt-2 text-[2rem] font-extrabold leading-[1.02] tracking-tight text-forest">
          {page.headline.map((line) => (
            <span key={line} className={`block ${line === page.accent ? "text-emerald" : ""}`}>
              {line}
            </span>
          ))}
        </h1>
        <p className="mt-3 max-w-[85%] text-xs font-medium text-muted-foreground">{page.body}</p>

        <div className="mt-auto pb-8">
          <div className="mb-6 flex items-center gap-2">
            {PAGES.map((_, i) => (
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
            onClick={next}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            {page.cta} <ArrowRight className="size-4" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
