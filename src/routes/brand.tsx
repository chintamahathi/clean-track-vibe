import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/brand")({
  head: () => ({
    meta: [{ title: "ESWACH" }],
  }),
  component: Brand,
});

function Brand() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out at 4.2 s, then navigate at 5 s
    const fadeTimer = setTimeout(() => setFadeOut(true), 4200);
    const navTimer = setTimeout(() => {
      const seen = window.localStorage.getItem("ct_onboarded") === "1";
      navigate({ to: seen ? "/" : "/onboarding", replace: true });
    }, 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(navTimer);
    };
  }, [navigate]);

  return (
    <div
      className={`relative flex h-full min-h-dvh w-full flex-col items-center justify-center overflow-hidden bg-white transition-opacity duration-700 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Subtle environmental glow — very soft, non-distracting */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,oklch(0.92_0.05_156_/_55%)_0%,transparent_70%)]"
      />

      {/* Logo lockup — fades in + gentle scale entrance */}
      <div
        className="relative flex flex-col items-center gap-0"
        style={{
          animation: "eswach-enter 0.9s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* SVG logo — redrawn faithfully from the provided image */}
        <svg
          viewBox="0 0 320 160"
          aria-label="eSwach — Smart Waste. Cleaner Cities."
          className="w-[min(72vw,300px)]"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* ── Icon mark (left side) ─────────────────────────────────── */}
          <defs>
            <linearGradient id="eGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#1d4ed8" />
            </linearGradient>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="truckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16a34a" />
              <stop offset="100%" stopColor="#1e3a5f" />
            </linearGradient>
          </defs>

          {/* Swoosh / river base */}
          <path
            d="M 8 102 Q 20 112 38 108 Q 56 104 68 96"
            fill="none"
            stroke="url(#eGrad)"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* Big "e" letter form */}
          <path
            d="M 14 90 C 14 60 34 42 54 42 C 70 42 80 52 80 66 C 80 72 76 78 68 80 L 22 80 C 22 94 36 102 54 98"
            fill="none"
            stroke="url(#eGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* WiFi arc */}
          <path d="M 60 34 Q 68 26 76 34" fill="none" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 56 28 Q 68 16 80 28" fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" />
          <circle cx="68" cy="39" r="2.5" fill="#3b82f6" />

          {/* Leaf left */}
          <ellipse cx="36" cy="20" rx="10" ry="16" fill="url(#leafGrad)"
            transform="rotate(-30 36 20)" />
          {/* Leaf right */}
          <ellipse cx="52" cy="14" rx="9" ry="15" fill="url(#leafGrad)"
            transform="rotate(10 52 14)" />
          {/* Leaf centre vein */}
          <path d="M 36 28 L 36 12" stroke="#166534" strokeWidth="1.2" strokeLinecap="round" />

          {/* Truck body */}
          <rect x="22" y="92" width="30" height="16" rx="3" fill="url(#truckGrad)" />
          {/* Truck cab */}
          <rect x="52" y="96" width="16" height="12" rx="2.5" fill="#1e3a5f" />
          {/* Truck window */}
          <rect x="54" y="97.5" width="8" height="6" rx="1.5" fill="#7dd3fc" opacity="0.8" />
          {/* Wheels */}
          <circle cx="30" cy="108" r="4" fill="#1e3a5f" />
          <circle cx="30" cy="108" r="1.8" fill="#e5e7eb" />
          <circle cx="58" cy="108" r="4" fill="#1e3a5f" />
          <circle cx="58" cy="108" r="1.8" fill="#e5e7eb" />
          {/* Truck waste hopper detail */}
          <rect x="24" y="86" width="26" height="8" rx="2" fill="#16a34a" opacity="0.7" />

          {/* ── Wordmark (right side) ──────────────────────────────────── */}
          {/* "e" in green */}
          <text
            x="96"
            y="83"
            fontSize="46"
            fontWeight="800"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            fill="#22c55e"
            letterSpacing="-1"
          >
            e
          </text>
          {/* "Swach" in navy */}
          <text
            x="122"
            y="83"
            fontSize="46"
            fontWeight="800"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            fill="#1e3a5f"
            letterSpacing="-1"
          >
            Swach
          </text>

          {/* Tagline */}
          {/* "SMART WASTE. " in navy */}
          <text
            x="96"
            y="104"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            fill="#1e3a5f"
            letterSpacing="1.5"
          >
            SMART WASTE.
          </text>
          {/* "CLEANER CITIES." in green */}
          <text
            x="207"
            y="104"
            fontSize="11.5"
            fontWeight="700"
            fontFamily="ui-sans-serif,system-ui,sans-serif"
            fill="#22c55e"
            letterSpacing="1.5"
          >
            {" "}CLEANER CITIES.
          </text>
        </svg>
      </div>

      {/* Entrance keyframe */}
      <style>{`
        @keyframes eswach-enter {
          from { opacity: 0; transform: scale(0.95); }
          to   { opacity: 1; transform: scale(1);    }
        }
      `}</style>
    </div>
  );
}
