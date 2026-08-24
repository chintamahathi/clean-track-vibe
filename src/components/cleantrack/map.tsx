import { Locate, Minus, Plus } from "lucide-react";
import type { VehicleStatus } from "@/lib/data";

export const ROUTE_D =
  "M 56 476 C 130 430 96 356 156 318 C 216 280 236 262 244 206 C 252 150 322 128 348 62";

export const TRUCK_POS = { x: 205, y: 262 };
export const HOME_POS = { x: 348, y: 62 };

export const COLLECTION_POINTS = [
  { x: 76, y: 452 },
  { x: 118, y: 388 },
  { x: 140, y: 336 },
  { x: 196, y: 288 },
  { x: 246, y: 196 },
  { x: 286, y: 146 },
  { x: 330, y: 96 },
];

const VEHICLE_COLORS: Record<VehicleStatus, string> = {
  active: "var(--emerald)",
  delayed: "var(--amber)",
  unavailable: "var(--coral)",
};

type Palette = {
  land: string;
  park: string;
  water: string;
  roadMajor: string;
  roadMinor: string;
  route: string;
  routeFlow: string;
  home: string;
  point: string;
  pointStroke: string;
  label: string;
};

const LIGHT: Palette = {
  land: "var(--pale)",
  park: "oklch(0.91 0.06 145)",
  water: "color-mix(in oklab, var(--cyan) 34%, white)",
  roadMajor: "var(--cream)",
  roadMinor: "color-mix(in oklab, var(--cream) 78%, var(--pale))",
  route: "var(--forest)",
  routeFlow: "var(--cyan)",
  home: "var(--forest)",
  point: "var(--cream)",
  pointStroke: "var(--emerald)",
  label: "color-mix(in oklab, var(--forest) 38%, transparent)",
};

const DARK: Palette = {
  land: "var(--forest)",
  park: "oklch(0.36 0.07 155)",
  water: "color-mix(in oklab, var(--cyan) 26%, var(--forest-deep))",
  roadMajor: "oklch(0.42 0.05 162)",
  roadMinor: "oklch(0.36 0.045 163)",
  route: "var(--lime)",
  routeFlow: "var(--cyan)",
  home: "var(--lime)",
  point: "var(--forest-deep)",
  pointStroke: "var(--lime)",
  label: "color-mix(in oklab, var(--ivory) 34%, transparent)",
};

export type MapVehicle = {
  id: string;
  x: number;
  y: number;
  status: VehicleStatus;
};

export function CityMap({
  theme = "light",
  route = true,
  routeProgress,
  truck,
  home,
  points = true,
  vehicles,
  selectedId,
  onSelectVehicle,
  className = "",
}: {
  theme?: "light" | "dark";
  route?: boolean;
  /** 0-100: renders completed portion in emerald over a muted remainder (driver view). */
  routeProgress?: number;
  truck?: { x: number; y: number; color?: string } | null;
  home?: { x: number; y: number } | null;
  points?: boolean;
  vehicles?: MapVehicle[];
  selectedId?: string;
  onSelectVehicle?: (id: string) => void;
  className?: string;
}) {
  const p = theme === "dark" ? DARK : LIGHT;
  return (
    <svg viewBox="0 0 400 520" className={`h-full w-full ${className}`} role="img" aria-label="City collection map">
      {/* land */}
      <rect width="400" height="520" fill={p.land} />
      {/* parks */}
      <ellipse cx="70" cy="90" rx="64" ry="48" fill={p.park} />
      <ellipse cx="330" cy="430" rx="78" ry="56" fill={p.park} />
      <ellipse cx="330" cy="230" rx="40" ry="30" fill={p.park} />
      {/* water */}
      <path
        d="M -20 300 C 80 280 120 340 200 330 C 300 318 340 380 420 360"
        fill="none"
        stroke={p.water}
        strokeWidth="30"
        strokeLinecap="round"
      />
      {/* minor roads */}
      <g stroke={p.roadMinor} strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M 0 160 C 90 150 160 190 240 170 C 320 150 360 180 400 170" />
        <path d="M 60 0 C 70 90 40 200 70 300 C 90 370 60 450 80 520" />
        <path d="M 190 520 C 200 430 170 380 210 330" />
        <path d="M 300 520 C 290 470 320 420 300 380" />
        <path d="M 400 260 C 330 250 300 290 250 270" />
      </g>
      {/* major roads */}
      <g stroke={p.roadMajor} strokeWidth="12" strokeLinecap="round" fill="none">
        <path d="M 0 60 C 110 70 200 40 300 60 C 350 70 380 60 400 66" />
        <path d="M 0 430 C 90 420 170 460 260 440 C 330 425 370 445 400 436" />
        <path d="M 150 520 C 150 420 120 340 160 260 C 195 190 150 110 170 0" />
      </g>
      {/* street labels */}
      <g fill={p.label} fontSize="9" fontWeight="600" letterSpacing="1.5" fontFamily="inherit">
        <text x="196" y="52">MADHAPUR RD</text>
        <text x="20" y="414">GREEN HILLS LN</text>
        <text x="252" y="500">HITECH SERVICE RD</text>
      </g>

      {/* route */}
      {route && routeProgress === undefined && (
        <>
          <path d={ROUTE_D} fill="none" stroke={p.route} strokeWidth="5" strokeLinecap="round" />
          <path
            d={ROUTE_D}
            fill="none"
            stroke={p.routeFlow}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="2 26"
            className="animate-route-flow"
          />
        </>
      )}
      {route && routeProgress !== undefined && (
        <>
          <path
            d={ROUTE_D}
            fill="none"
            stroke={theme === "dark" ? "color-mix(in oklab, var(--ivory) 18%, transparent)" : "color-mix(in oklab, var(--forest) 14%, transparent)"}
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d={ROUTE_D}
            fill="none"
            stroke="var(--emerald)"
            strokeWidth="7"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`${routeProgress} 100`}
          />
          <path
            d={ROUTE_D}
            fill="none"
            stroke="var(--cyan)"
            strokeWidth="7"
            strokeLinecap="round"
            pathLength={100}
            strokeDasharray={`1.5 6 ${routeProgress - 7.5} 100`}
          />
        </>
      )}

      {/* collection points */}
      {points &&
        COLLECTION_POINTS.map((pt, i) => (
          <circle key={i} cx={pt.x} cy={pt.y} r="5" fill={p.point} stroke={p.pointStroke} strokeWidth="2.5" />
        ))}

      {/* municipal vehicles */}
      {vehicles?.map((v) => {
        const selected = v.id === selectedId;
        const color = selected ? "var(--cyan)" : VEHICLE_COLORS[v.status];
        return (
          <g
            key={v.id}
            transform={`translate(${v.x} ${v.y})`}
            onClick={() => onSelectVehicle?.(v.id)}
            style={{ cursor: onSelectVehicle ? "pointer" : undefined }}
          >
            {selected && (
              <circle
                r="20"
                fill="none"
                stroke="var(--cyan)"
                strokeWidth="2"
                opacity="0.7"
                className="animate-marker-pulse"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            )}
            <circle r="11" fill={color} stroke={theme === "dark" ? "var(--forest-deep)" : "var(--cream)"} strokeWidth="3" />
            <circle r="3.5" fill={theme === "dark" ? "var(--forest-deep)" : "var(--cream)"} />
          </g>
        );
      })}

      {/* home marker */}
      {home && (
        <g transform={`translate(${home.x} ${home.y})`}>
          <path d="M 0 6 C -9 -4 -9 -14 0 -14 C 9 -14 9 -4 0 6 Z" fill={p.home} />
          <circle cy="-8" r="3.4" fill={theme === "dark" ? "var(--forest-deep)" : "var(--cream)"} />
        </g>
      )}

      {/* live truck marker */}
      {truck && (
        <g transform={`translate(${truck.x} ${truck.y})`}>
          <circle
            r="16"
            fill={truck.color ?? "var(--cyan)"}
            opacity="0.5"
            className="animate-marker-pulse"
            style={{ transformBox: "fill-box", transformOrigin: "center" }}
          />
          <circle r="12" fill={truck.color ?? "var(--cyan)"} stroke={theme === "dark" ? "var(--forest-deep)" : "var(--cream)"} strokeWidth="3.5" />
          <path d="M -4 1.5 L 0 -4.5 L 4 1.5 L 0 0 Z" fill={theme === "dark" ? "var(--forest-deep)" : "var(--cream)"} />
        </g>
      )}
    </svg>
  );
}

export function MapControls({ dark }: { dark?: boolean }) {
  const btn = `flex size-10 items-center justify-center rounded-2xl transition-transform hover:scale-105 ${
    dark ? "glass-panel-dark text-ivory" : "glass-panel text-forest"
  }`;
  return (
    <div className="pointer-events-auto absolute right-3 top-3 z-20 flex flex-col gap-2">
      <button type="button" aria-label="Zoom in" className={btn}>
        <Plus className="size-4" />
      </button>
      <button type="button" aria-label="Zoom out" className={btn}>
        <Minus className="size-4" />
      </button>
      <button type="button" aria-label="Center on my location" className={btn}>
        <Locate className="size-4" />
      </button>
    </div>
  );
}

export function MapContainer({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative overflow-hidden rounded-[2rem] shadow-card ${className}`}>{children}</div>
  );
}
