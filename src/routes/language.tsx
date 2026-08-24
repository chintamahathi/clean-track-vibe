import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Languages } from "lucide-react";
import { useState } from "react";
import { languages } from "@/lib/data";

export const Route = createFileRoute("/language")({
  head: () => ({
    meta: [
      { title: "Choose your language — CleanTrack" },
      { name: "description", content: "CleanTrack speaks English, తెలుగు and हिन्दी." },
      { property: "og:title", content: "Choose your language — CleanTrack" },
      { property: "og:description", content: "CleanTrack speaks English, తెలుగు and हिन्दी." },
    ],
  }),
  component: Language,
});

function Language() {
  const [selected, setSelected] = useState<string>("en");
  const navigate = useNavigate();

  return (
    <div className="flex h-full min-h-dvh flex-col px-7 pt-14">
      <span className="animate-float-in flex size-12 items-center justify-center rounded-2xl bg-emerald-soft text-emerald">
        <Languages className="size-6" />
      </span>
      <h1 className="animate-float-in mt-5 text-3xl font-extrabold leading-tight tracking-tight text-forest" style={{ animationDelay: "80ms" }}>
        Choose your
        <br />
        language
      </h1>
      <p className="animate-float-in mt-2 text-sm text-muted-foreground" style={{ animationDelay: "140ms" }}>
        You can change this anytime in Settings.
      </p>

      <div className="mt-8 space-y-3">
        {languages.map((l, i) => {
          const active = selected === l.id;
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => setSelected(l.id)}
              className={`animate-float-in flex w-full items-center gap-4 rounded-3xl p-5 text-left transition-all ${
                active ? "scale-[1.01] bg-forest text-ivory shadow-float" : "bg-card text-forest shadow-card"
              }`}
              style={{ animationDelay: `${200 + i * 80}ms` }}
            >
              <span className="min-w-0 flex-1">
                <span className="block text-xl font-extrabold tracking-tight">{l.native}</span>
                <span className={`block text-xs font-semibold ${active ? "text-ivory/60" : "text-muted-foreground"}`}>
                  {l.label}
                </span>
              </span>
              <span
                className={`flex size-7 items-center justify-center rounded-full border-2 transition-colors ${
                  active ? "border-lime bg-lime text-forest-deep" : active ? "" : "border-forest/15 text-transparent"
                }`}
              >
                <Check className="size-4" strokeWidth={3} />
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto pb-8">
        <button
          type="button"
          onClick={() => navigate({ to: "/login" })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-transform hover:scale-[1.01] active:scale-[0.98]"
        >
          CONTINUE <ArrowRight className="size-4" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  );
}
