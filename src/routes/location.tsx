import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Locate, MapPin, PencilLine } from "lucide-react";
import { useState } from "react";
import { CityMap, HOME_POS, MapContainer } from "@/components/cleantrack/map";
import { resident } from "@/lib/data";

export const Route = createFileRoute("/location")({
  head: () => ({
    meta: [
      { title: "Set your location — ESWACH" },
      { name: "description", content: "Tell ESWACH where to track your collection — your home, colony and ward." },
      { property: "og:title", content: "Set your location — ESWACH" },
      { property: "og:description", content: "Where should we track your collection?" },
    ],
  }),
  component: LocationSetup,
});

const FIELDS = [
  { id: "address", label: "Home address", placeholder: "Plot 42, Green Hills Colony" },
  { id: "colony", label: "Colony", placeholder: "Green Hills Colony" },
  { id: "street", label: "Street", placeholder: "Lane 4" },
  { id: "ward", label: "Ward", placeholder: "Ward 103" },
] as const;

function LocationSetup() {
  const [located, setLocated] = useState(false);
  const [manual, setManual] = useState(false);
  const navigate = useNavigate();

  const complete = () => {
    window.localStorage.setItem("ct_onboarded", "1");
    navigate({ to: "/" });
  };

  return (
    <div className="flex h-full flex-col">
      {/* map hero */}
      <MapContainer className="animate-float-in mx-4 mt-4 h-[36dvh] min-h-[260px]">
        <CityMap route={false} points={false} home={HOME_POS} truck={null} />
        {located && (
          <div className="glass-panel animate-sheet-up absolute inset-x-3 bottom-3 flex items-center gap-2.5 rounded-2xl p-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-emerald text-primary-foreground">
              <CheckCircle2 className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold tracking-[0.14em] text-emerald">LOCATION FOUND</p>
              <p className="truncate text-xs font-bold text-forest">{resident.address}</p>
            </div>
          </div>
        )}
      </MapContainer>

      <div className="flex flex-1 flex-col px-7 pt-6">
        <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-forest">
          Where should we track
          <br />
          your collection?
        </h1>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={() => {
              setLocated(true);
              setManual(false);
            }}
            className={`flex w-full items-center gap-3 rounded-3xl p-5 text-left transition-all ${
              located ? "bg-forest text-ivory shadow-float" : "bg-card text-forest shadow-card"
            }`}
          >
            <span
              className={`flex size-11 items-center justify-center rounded-2xl ${
                located ? "bg-lime/20 text-lime" : "bg-emerald-soft text-emerald"
              }`}
            >
              <Locate className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold">USE MY LOCATION</span>
              <span className={`block text-[11px] ${located ? "text-ivory/60" : "text-muted-foreground"}`}>
                Fastest — we'll detect your colony and ward
              </span>
            </span>
          </button>

          <button
            type="button"
            onClick={() => setManual((m) => !m)}
            className={`flex w-full items-center gap-3 rounded-3xl p-5 text-left transition-all ${
              manual ? "bg-forest text-ivory shadow-float" : "bg-card text-forest shadow-card"
            }`}
          >
            <span
              className={`flex size-11 items-center justify-center rounded-2xl ${
                manual ? "bg-lime/20 text-lime" : "bg-pale text-forest"
              }`}
            >
              <PencilLine className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-extrabold">ADD ADDRESS</span>
              <span className={`block text-[11px] ${manual ? "text-ivory/60" : "text-muted-foreground"}`}>
                Enter home, colony, street and ward
              </span>
            </span>
          </button>

          {manual && (
            <div className="animate-sheet-up space-y-2.5 rounded-3xl bg-card p-5 shadow-card">
              {FIELDS.map((f) => (
                <label key={f.id} className="block">
                  <span className="text-[10px] font-extrabold tracking-[0.14em] text-forest/50">{f.label.toUpperCase()}</span>
                  <input
                    placeholder={f.placeholder}
                    className="mt-1 w-full rounded-2xl bg-pale px-4 py-3 text-sm font-bold text-forest outline-none ring-2 ring-transparent transition-colors placeholder:text-forest/25 focus:ring-emerald/50"
                  />
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto pb-8 pt-6">
          <button
            type="button"
            onClick={complete}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
          >
            <MapPin className="size-4" strokeWidth={2.6} />
            SAVE & CONTINUE <ArrowRight className="size-4" strokeWidth={2.6} />
          </button>
        </div>
      </div>
    </div>
  );
}
