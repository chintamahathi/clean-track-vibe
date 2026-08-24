import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, ChevronRight, Clock, House, Languages, MessageCircle, Play, Smartphone, Volume2, Zap } from "lucide-react";
import { useState } from "react";
import { RoleSwitcher } from "@/components/cleantrack/shell";
import { Toggle } from "@/components/cleantrack/toggle";
import { languages, resident } from "@/lib/data";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile & settings — CleanTrack" },
      { name: "description", content: "Addresses, language, smart notifications, low-data mode and accessibility — all in one calm place." },
      { property: "og:title", content: "Profile & settings — CleanTrack" },
      { property: "og:description", content: "Manage addresses, language, notifications and accessibility." },
    ],
  }),
  component: Profile,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
      <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">{title}</p>
      <div className="mt-3">{children}</div>
    </section>
  );
}

function ToggleRow({ icon, label, hint, defaultOn = false }: { icon: React.ReactNode; label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-3 py-2.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pale text-forest">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-forest">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <Toggle checked={on} onChange={setOn} label={label} />
    </div>
  );
}

const NOTIF_EVENTS = [
  { label: "Truck approaching", on: true },
  { label: "Delays", on: true },
  { label: "Missed collection", on: true },
  { label: "Backup vehicle", on: true },
  { label: "Overflow risk", on: false },
  { label: "Complaint updates", on: true },
];

function Profile() {
  const [lang, setLang] = useState("en");
  const [channel, setChannel] = useState("app");

  return (
    <div className="px-5 pt-6">
      {/* identity */}
      <header className="animate-float-in flex items-center gap-4">
        <span className="flex size-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--emerald),var(--cyan))] text-xl font-extrabold text-primary-foreground shadow-lift">
          A
        </span>
        <div className="min-w-0">
          <h1 className="text-2xl font-extrabold tracking-tight text-forest">{resident.name}</h1>
          <p className="text-xs font-semibold text-muted-foreground">+91 98•• ••210 · {resident.area}</p>
        </div>
      </header>

      {/* addresses */}
      <Link to="/addresses" className="animate-float-in mt-5 flex items-center gap-3 rounded-[2rem] bg-forest p-5 text-ivory shadow-float transition-transform hover:scale-[1.01]">
        <span className="flex size-11 items-center justify-center rounded-2xl bg-lime/20 text-lime">
          <House className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-extrabold">Saved addresses</span>
          <span className="block truncate text-[11px] text-ivory/60">HOME · {resident.address}</span>
        </span>
        <ChevronRight className="size-4 shrink-0 text-ivory/60" />
      </Link>

      {/* language */}
      <Section title="LANGUAGE">
        <div className="flex items-center gap-2">
          <Languages className="size-4 shrink-0 text-emerald" />
          <div className="flex flex-1 gap-2">
            {languages.map((l) => (
              <button
                key={l.id}
                type="button"
                onClick={() => setLang(l.id)}
                className={`flex-1 rounded-2xl py-3 text-xs font-extrabold transition-all ${
                  lang === l.id ? "bg-forest text-ivory shadow-lift" : "bg-pale text-forest"
                }`}
              >
                {l.native}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* smart notifications */}
      <Section title="SMART NOTIFICATIONS">
        <div className="mb-2 flex gap-2">
          {(
            [
              { id: "app", label: "IN-APP", icon: Smartphone },
              { id: "sms", label: "SMS", icon: MessageCircle },
              { id: "wa", label: "WHATSAPP", icon: MessageCircle },
            ] as const
          ).map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setChannel(c.id)}
              className={`flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-[10px] font-extrabold tracking-wide transition-all ${
                channel === c.id ? "bg-emerald text-primary-foreground shadow-lift" : "bg-pale text-forest"
              }`}
            >
              <c.icon className="size-3.5" /> {c.label}
            </button>
          ))}
        </div>
        {NOTIF_EVENTS.map((e) => (
          <ToggleRow key={e.label} icon={<Bell className="size-4" />} label={e.label} defaultOn={e.on} />
        ))}
      </Section>

      {/* low data + accessibility */}
      <Section title="DATA & ACCESSIBILITY">
        <ToggleRow
          icon={<Zap className="size-4" />}
          label="Low data mode"
          hint="Simpler map, fewer animations, compressed images"
        />
        <ToggleRow icon={<Volume2 className="size-4" />} label="Voice notifications" hint="Spoken ETA alerts" />
        <ToggleRow icon={<Smartphone className="size-4" />} label="Larger buttons" hint="Easier targets on smaller phones" defaultOn />
      </Section>

      {/* household */}
      <Section title="HOUSEHOLD">
        <div className="flex items-center justify-between py-1 text-sm font-extrabold text-forest">
          <span>Household size</span>
          <span className="rounded-full bg-pale px-3 py-1.5 text-xs">4 members</span>
        </div>
        <div className="flex items-center justify-between py-1 text-sm font-extrabold text-forest">
          <span>Waste preferences</span>
          <span className="rounded-full bg-pale px-3 py-1.5 text-xs">Wet · Dry · Recyclables</span>
        </div>
        <Link to="/history" className="mt-2 flex items-center justify-between py-1 text-sm font-extrabold text-forest">
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-emerald" /> Collection history
          </span>
          <ChevronRight className="size-4 text-forest/40" />
        </Link>
      </Section>

      <Link
        to="/splash"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-pale py-4 text-xs font-extrabold tracking-[0.08em] text-forest"
      >
        <Play className="size-4" /> REPLAY INTRO
      </Link>

      <div className="mt-6 flex justify-center pb-2">
        <RoleSwitcher />
      </div>
    </div>
  );
}
