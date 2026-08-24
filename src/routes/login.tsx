import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, ChevronLeft, Mail, Phone, ShieldCheck } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BrandMark } from "@/components/cleantrack/shell";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CleanTrack" },
      { name: "description", content: "One-tap sign in with your phone number or email — no passwords." },
      { property: "og:title", content: "Sign in — CleanTrack" },
      { property: "og:description", content: "One-tap sign in with OTP." },
    ],
  }),
  component: Login,
});

function Login() {
  const [phase, setPhase] = useState<"identify" | "otp">("identify");
  return (
    <div className="flex h-full min-h-dvh flex-col px-7 pt-10">
      <div className="animate-float-in">
        <BrandMark />
      </div>
      {phase === "identify" ? <Identify onNext={() => setPhase("otp")} /> : <Otp onBack={() => setPhase("identify")} />}
    </div>
  );
}

function Identify({ onNext }: { onNext: () => void }) {
  const [tab, setTab] = useState<"phone" | "email">("phone");
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const valid = tab === "phone" ? value.replace(/\D/g, "").length >= 10 : /.+@.+\..+/.test(value);

  return (
    <>
      <h1 className="animate-float-in mt-8 text-3xl font-extrabold leading-tight tracking-tight text-forest">
        Let's get
        <br />
        you signed in
      </h1>
      <p className="animate-float-in mt-2 text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
        No passwords. We send you a one-time code.
      </p>

      <div className="animate-float-in mt-7 grid grid-cols-2 gap-1 rounded-full bg-secondary p-1" style={{ animationDelay: "140ms" }}>
        {(
          [
            { id: "phone", label: "Phone", icon: Phone },
            { id: "email", label: "Email", icon: Mail },
          ] as const
        ).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => {
              setTab(t.id);
              setValue("");
            }}
            className={`flex items-center justify-center gap-2 rounded-full py-2.5 text-xs font-extrabold tracking-wide transition-all ${
              tab === t.id ? "bg-forest text-ivory shadow-lift" : "text-forest/55"
            }`}
          >
            <t.icon className="size-3.5" /> {t.label}
          </button>
        ))}
      </div>

      <div className="animate-float-in mt-5" style={{ animationDelay: "200ms" }}>
        <label
          className={`flex items-center gap-3 rounded-3xl bg-card p-5 shadow-card ring-2 transition-colors ${
            value ? "ring-emerald/50" : "ring-transparent"
          }`}
        >
          {tab === "phone" && (
            <span className="border-r border-forest/10 pr-3 text-base font-extrabold text-forest">+91</span>
          )}
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type={tab === "phone" ? "tel" : "email"}
            inputMode={tab === "phone" ? "numeric" : "email"}
            placeholder={tab === "phone" ? "98765 43210" : "you@example.com"}
            aria-label={tab === "phone" ? "Phone number" : "Email address"}
            className="min-w-0 flex-1 bg-transparent text-lg font-extrabold tracking-wide text-forest outline-none placeholder:text-forest/25"
          />
        </label>
      </div>

      <div className="mt-auto pb-8">
        <button
          type="button"
          disabled={!valid}
          onClick={onNext}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-forest py-4 text-sm font-extrabold tracking-[0.08em] text-ivory shadow-lift transition-all enabled:hover:scale-[1.01] enabled:active:scale-[0.98] disabled:opacity-40"
        >
          CONTINUE <ArrowRight className="size-4" strokeWidth={2.6} />
        </button>
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem("ct_onboarded", "1");
            navigate({ to: "/" });
          }}
          className="mt-3 w-full py-2 text-center text-xs font-bold text-muted-foreground"
        >
          Explore as guest
        </button>
      </div>
    </>
  );
}

function Otp({ onBack }: { onBack: () => void }) {
  const [digits, setDigits] = useState<string[]>(["", "", "", ""]);
  const [resendIn, setResendIn] = useState(24);
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const t = setInterval(() => setResendIn((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const complete = digits.every((d) => d !== "");

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    setDigits((prev) => prev.map((p, j) => (j === i ? d : p)));
    if (d && i < 3) refs.current[i + 1]?.focus();
  };

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="mt-6 flex items-center gap-1.5 text-xs font-bold text-muted-foreground"
      >
        <ChevronLeft className="size-4" /> Back
      </button>
      <h1 className="animate-float-in mt-4 text-3xl font-extrabold leading-tight tracking-tight text-forest">
        Verify
        <br />
        your code
      </h1>
      <p className="animate-float-in mt-2 text-sm text-muted-foreground" style={{ animationDelay: "80ms" }}>
        We sent a 4-digit code. Enter it below.
      </p>

      <div className="animate-float-in mt-8 flex justify-center gap-3" style={{ animationDelay: "140ms" }}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              refs.current[i] = el;
            }}
            value={d}
            onChange={(e) => setDigit(i, e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !d && i > 0) refs.current[i - 1]?.focus();
            }}
            inputMode="numeric"
            maxLength={1}
            aria-label={`Digit ${i + 1}`}
            className={`size-16 rounded-3xl bg-card text-center text-2xl font-extrabold text-forest shadow-card outline-none ring-2 transition-all ${
              d ? "ring-emerald/60" : "ring-transparent focus:ring-forest/25"
            }`}
          />
        ))}
      </div>

      <p className="mt-5 text-center text-xs font-semibold text-muted-foreground">
        {resendIn > 0 ? (
          `Resend code in ${resendIn}s`
        ) : (
          <button type="button" onClick={() => setResendIn(24)} className="font-extrabold text-emerald">
            Resend code
          </button>
        )}
      </p>

      <div className="mt-auto pb-8">
        <button
          type="button"
          disabled={!complete}
          onClick={() => navigate({ to: "/location" })}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald py-4 text-sm font-extrabold tracking-[0.08em] text-primary-foreground shadow-lift transition-all enabled:hover:scale-[1.01] enabled:active:scale-[0.98] disabled:opacity-40"
        >
          <ShieldCheck className="size-4" strokeWidth={2.6} /> VERIFY OTP
        </button>
      </div>
    </>
  );
}
