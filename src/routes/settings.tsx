import { createFileRoute } from "@tanstack/react-router";
import { Accessibility, Bell, ChevronRight, Globe, Info, Lock, MapPin, Recycle, ShieldCheck, Smartphone, Volume2, Zap } from "lucide-react";
import { useState } from "react";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { Toggle } from "@/components/cleantrack/toggle";
import { languages } from "@/lib/data";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — CleanTrack" },
      { name: "description", content: "Language, notifications, privacy, location, pickup preferences and accessibility." },
    ],
  }),
  component: Settings,
});

type Section = "main" | "language" | "notifications" | "privacy" | "location" | "pickup" | "lowdata" | "accessibility" | "about";

function SettingRow({ icon, label, hint, onClick }: { icon: React.ReactNode; label: string; hint?: string; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3 py-3 text-left transition-colors hover:bg-pale/50 rounded-2xl px-1">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pale text-forest">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-forest">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <ChevronRight className="size-4 shrink-0 text-forest/35" />
    </button>
  );
}

function ToggleRow({ icon, label, hint, defaultOn = false }: { icon: React.ReactNode; label: string; hint?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pale text-forest">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-extrabold text-forest">{label}</p>
        {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
      </div>
      <Toggle checked={on} onChange={setOn} label={label} />
    </div>
  );
}

function LanguageSection({ onBack }: { onBack: () => void }) {
  const [lang, setLang] = useState("en");
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Language" onBack={onBack} />
      <div className="mt-5 space-y-2.5">
        {languages.map((l) => (
          <button key={l.id} type="button" onClick={() => setLang(l.id)}
            className={`flex w-full items-center justify-between rounded-3xl px-5 py-4 text-sm font-extrabold transition-all ${lang === l.id ? "bg-forest text-ivory shadow-float" : "bg-card text-forest shadow-card hover:scale-[1.01]"}`}>
            <span>{l.native}</span>
            {lang === l.id && <span className="flex size-6 items-center justify-center rounded-full bg-lime text-forest-deep text-xs font-extrabold">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

const NOTIF_EVENTS = [
  { label: "Truck approaching", on: true }, { label: "Collection delay", on: true },
  { label: "Missed collection", on: true }, { label: "Backup vehicle", on: true },
  { label: "Pickup updates", on: true },    { label: "Overflow warning", on: false },
];
const ALERT_TIMES = [5, 10, 15, 20, 30] as const;

function NotificationsSection({ onBack }: { onBack: () => void }) {
  const [alertMin, setAlertMin] = useState(10);
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Notifications" onBack={onBack} />
      <section className="mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">ALERTS</p>
        <div className="mt-2">{NOTIF_EVENTS.map((e) => <ToggleRow key={e.label} icon={<Bell className="size-4" />} label={e.label} defaultOn={e.on} />)}</div>
      </section>
      <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">DEFAULT ALERT TIME</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {ALERT_TIMES.map((min) => (
            <button key={min} type="button" onClick={() => setAlertMin(min)}
              className={`rounded-full px-4 py-2.5 text-xs font-extrabold tracking-wide transition-all ${alertMin === min ? "bg-emerald text-primary-foreground shadow-lift" : "bg-pale text-forest hover:bg-secondary"}`}>
              {min} MIN
            </button>
          ))}
        </div>
        <p className="mt-3 text-[11px] text-muted-foreground">You'll be notified {alertMin} minutes before your truck arrives.</p>
      </section>
    </div>
  );
}

function PrivacySection({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Privacy" onBack={onBack} />
      <section className="mt-5 rounded-[2rem] bg-card p-6 shadow-card space-y-4">
        <div className="flex items-start gap-3"><ShieldCheck className="size-5 shrink-0 text-emerald mt-0.5" /><p className="text-sm leading-relaxed text-forest">Your personal information is only visible to authorized CleanTrack administrators and municipal managers.</p></div>
        <div className="flex items-start gap-3"><Lock className="size-5 shrink-0 text-emerald mt-0.5" /><p className="text-sm leading-relaxed text-forest">Collection drivers see operational collection information only — not your personal identity, name, or contact details.</p></div>
      </section>
      <section className="mt-4 rounded-[2rem] bg-pale p-5 shadow-card space-y-3">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">DATA CONTROLS</p>
        <ToggleRow icon={<Lock className="size-4" />} label="Location sharing" hint="Allow CleanTrack to use your location for tracking" defaultOn />
        <ToggleRow icon={<ShieldCheck className="size-4" />} label="Usage analytics" hint="Help us improve CleanTrack (anonymous)" defaultOn />
      </section>
    </div>
  );
}

function LocationSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Location" onBack={onBack} />
      <section className="mt-5 space-y-2.5">
        {[
          { label: "Current location", hint: "Use GPS for live tracking", active: true },
          { label: "Home address", hint: "Plot 42, Green Hills Colony, Madhapur", active: false },
          { label: "Change location", hint: "Update your primary address", active: false },
          { label: "Saved addresses", hint: "Home · Work · Other", active: false },
        ].map((row) => (
          <div key={row.label} className={`flex items-center gap-3 rounded-3xl p-4 shadow-card ${row.active ? "bg-forest text-ivory" : "bg-card"}`}>
            <span className={`flex size-9 items-center justify-center rounded-xl ${row.active ? "bg-lime/20 text-lime" : "bg-pale text-forest"}`}><MapPin className="size-4" /></span>
            <div className="min-w-0 flex-1">
              <p className={`text-sm font-extrabold ${row.active ? "text-ivory" : "text-forest"}`}>{row.label}</p>
              <p className={`text-[11px] ${row.active ? "text-ivory/60" : "text-muted-foreground"}`}>{row.hint}</p>
            </div>
            {row.active && <span className="rounded-full bg-lime px-2.5 py-1 text-[9px] font-extrabold tracking-wide text-forest-deep">ACTIVE</span>}
          </div>
        ))}
      </section>
    </div>
  );
}

function PickupSection({ onBack }: { onBack: () => void }) {
  const [time, setTime] = useState("6:00–6:30 PM");
  const [wet, setWet] = useState(true);
  const [dry, setDry] = useState(true);
  const times = ["6:00–8:00 AM", "10:00 AM–12:00 PM", "2:00–4:00 PM", "6:00–6:30 PM"];
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Pickup Preferences" onBack={onBack} />
      <section className="mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">PREFERRED COLLECTION TIME</p>
        <div className="mt-3 flex flex-col gap-2">
          {times.map((t) => (
            <button key={t} type="button" onClick={() => setTime(t)}
              className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-bold transition-all ${time === t ? "bg-forest text-ivory shadow-lift" : "bg-pale text-forest"}`}>
              <span>{t}</span>{time === t && <span className="text-lime">✓</span>}
            </button>
          ))}
        </div>
      </section>
      <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">WASTE TYPE</p>
        <div className="mt-3 space-y-1">
          <div className="flex items-center justify-between py-2"><span className="text-sm font-extrabold text-forest">Wet waste</span><Toggle checked={wet} onChange={setWet} label="Wet waste" /></div>
          <div className="flex items-center justify-between py-2"><span className="text-sm font-extrabold text-forest">Dry waste</span><Toggle checked={dry} onChange={setDry} label="Dry waste" /></div>
        </div>
      </section>
      <section className="mt-4 rounded-[2rem] bg-card p-5 shadow-card">
        <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">NOTIFICATION PREFERENCE</p>
        <div className="mt-3"><ToggleRow icon={<Bell className="size-4" />} label="Notify before collection" defaultOn /></div>
      </section>
    </div>
  );
}

function LowDataSection({ onBack }: { onBack: () => void }) {
  const [on, setOn] = useState(false);
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Low Data Mode" onBack={onBack} />
      <section className="mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <div className="flex items-center gap-3 py-2">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-pale text-forest"><Zap className="size-4" /></span>
          <div className="min-w-0 flex-1"><p className="text-sm font-extrabold text-forest">Low Data Mode</p><p className="text-[11px] text-muted-foreground">Simpler map, fewer animations, compressed images</p></div>
          <Toggle checked={on} onChange={setOn} label="Low Data Mode" />
        </div>
      </section>
      {on && (
        <section className="animate-float-in mt-4 rounded-[2rem] bg-pale p-5 shadow-card">
          <p className="text-[10px] font-extrabold tracking-[0.18em] text-forest/50">WHEN ENABLED</p>
          <ul className="mt-3 space-y-2">{["Reduced map detail","Fewer animations","Minimised imagery","Text-based status priority","ETA and notifications preserved"].map((item) => <li key={item} className="flex items-center gap-2 text-xs font-semibold text-forest"><span className="size-1.5 rounded-full bg-emerald" /> {item}</li>)}</ul>
        </section>
      )}
    </div>
  );
}

function AccessibilitySection({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Accessibility" onBack={onBack} />
      <section className="mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <div className="space-y-1">
          <ToggleRow icon={<Smartphone className="size-4" />} label="Larger text" hint="Increases font size across the app" />
          <ToggleRow icon={<ShieldCheck className="size-4" />} label="High contrast" hint="Boosts colour contrast for readability" />
          <ToggleRow icon={<Zap className="size-4" />} label="Reduce motion" hint="Turns off animations and transitions" />
          <ToggleRow icon={<Volume2 className="size-4" />} label="Voice notifications" hint="Spoken ETA alerts when truck is approaching" />
        </div>
      </section>
    </div>
  );
}

function AboutSection({ onBack }: { onBack: () => void }) {
  return (
    <div className="px-5 pt-6">
      <SubHeader title="About CleanTrack" onBack={onBack} />
      <section className="animate-float-in mt-5 relative overflow-hidden rounded-[2rem] bg-forest p-8 text-ivory text-center shadow-float">
        <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald/20 blur-2xl" />
        <div className="relative">
          <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-lime text-forest-deep text-lg font-extrabold shadow-lift">CT</span>
          <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ivory">CLEAN<span className="text-lime">TRACK</span></h1>
          <div className="mt-3 space-y-0.5 text-[11px] font-extrabold tracking-[0.2em] text-ivory/60"><p>KNOW.</p><p>TRACK.</p><p>COLLECT.</p><p>SUSTAIN.</p></div>
          <p className="mx-auto mt-4 max-w-[28ch] text-xs leading-relaxed text-ivory/55">Smart waste collection tracking for cleaner streets.</p>
        </div>
      </section>
      <section className="mt-4 space-y-2 pb-6">
        {[{ label: "Version", value: "1.0.0" }, { label: "Build", value: "2026.08.24" }, { label: "Service area", value: "Hyderabad, Telangana" }].map((row) => (
          <div key={row.label} className="flex items-center justify-between rounded-3xl bg-card px-5 py-4 shadow-card">
            <span className="text-xs font-semibold text-muted-foreground">{row.label}</span>
            <span className="text-xs font-extrabold text-forest">{row.value}</span>
          </div>
        ))}
        <div className="flex gap-2 pt-1">
          <button type="button" className="flex-1 rounded-2xl bg-card py-3 text-xs font-extrabold tracking-wide text-forest shadow-card">PRIVACY POLICY</button>
          <button type="button" className="flex-1 rounded-2xl bg-card py-3 text-xs font-extrabold tracking-wide text-forest shadow-card">TERMS OF USE</button>
        </div>
      </section>
    </div>
  );
}

function Settings() {
  const [section, setSection] = useState<Section>("main");
  const back = () => setSection("main");
  if (section === "language")      return <LanguageSection onBack={back} />;
  if (section === "notifications") return <NotificationsSection onBack={back} />;
  if (section === "privacy")       return <PrivacySection onBack={back} />;
  if (section === "location")      return <LocationSection onBack={back} />;
  if (section === "pickup")        return <PickupSection onBack={back} />;
  if (section === "lowdata")       return <LowDataSection onBack={back} />;
  if (section === "accessibility") return <AccessibilitySection onBack={back} />;
  if (section === "about")         return <AboutSection onBack={back} />;
  return (
    <div className="px-5 pt-6">
      <SubHeader title="Settings" />
      <div className="mt-5 rounded-[2rem] bg-card p-5 shadow-card">
        <SettingRow icon={<Globe className="size-4" />}         label="Language"           hint="English · తెలుగు · हिन्दी"          onClick={() => setSection("language")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Bell className="size-4" />}          label="Notifications"      hint="Alerts, delays, missed collections"  onClick={() => setSection("notifications")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Lock className="size-4" />}          label="Privacy"            hint="Your data & driver access policy"    onClick={() => setSection("privacy")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<MapPin className="size-4" />}        label="Location"           hint="Addresses & GPS settings"            onClick={() => setSection("location")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Recycle className="size-4" />}       label="Pickup Preferences" hint="Time, waste type, notifications"     onClick={() => setSection("pickup")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Zap className="size-4" />}           label="Low Data Mode"      hint="Reduce map & animation data usage"   onClick={() => setSection("lowdata")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Accessibility className="size-4" />} label="Accessibility"      hint="Larger text, contrast, motion"       onClick={() => setSection("accessibility")} />
        <div className="h-px bg-forest/6 mx-1" />
        <SettingRow icon={<Info className="size-4" />}          label="About CleanTrack"   hint="Version, privacy policy, terms"      onClick={() => setSection("about")} />
      </div>
      <div className="h-6" />
    </div>
  );
}
