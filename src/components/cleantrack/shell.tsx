import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  ChartLine,
  Clock,
  Home,
  Leaf,
  Map,
  MapPin,
  Plus,
  Route as RouteIcon,
  Sun,
  TriangleAlert,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

type Role = "resident" | "driver" | "municipal";

type NavItem = { to: string; label: string; icon: LucideIcon };

const NAVS: Record<Role, NavItem[]> = {
  resident: [
    { to: "/", label: "Home", icon: Home },
    { to: "/track", label: "Track", icon: MapPin },
    { to: "/requests", label: "Requests", icon: Plus },
    { to: "/history", label: "History", icon: Clock },
    { to: "/impact", label: "Impact", icon: Leaf },
  ],
  driver: [
    { to: "/driver", label: "Today", icon: Sun },
    { to: "/driver/route", label: "Route", icon: RouteIcon },
    { to: "/driver/issues", label: "Issues", icon: TriangleAlert },
    { to: "/driver/history", label: "History", icon: Clock },
  ],
  municipal: [
    { to: "/municipal", label: "Overview", icon: Home },
    { to: "/municipal/map", label: "Map", icon: Map },
    { to: "/municipal/alerts", label: "Alerts", icon: Bell },
    { to: "/municipal/routes", label: "Routes", icon: RouteIcon },
    { to: "/municipal/analytics", label: "Analytics", icon: ChartLine },
  ],
};

function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/driver")) return "driver";
  if (pathname.startsWith("/municipal")) return "municipal";
  if (pathname.startsWith("/onboarding")) return null;
  return "resident";
}

function isActive(itemTo: string, pathname: string, role: Role) {
  const root = role === "driver" ? "/driver" : role === "municipal" ? "/municipal" : "/";
  if (itemTo === root) return pathname === root || pathname === `${root}/`;
  return pathname.startsWith(itemTo);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const role = roleFromPath(pathname);
  const dark = role === "municipal";

  return (
    <div className="min-h-dvh w-full md:flex md:items-center md:justify-center md:bg-forest-deep md:bg-[radial-gradient(1200px_800px_at_20%_-10%,oklch(0.4_0.07_160_/_45%),transparent),radial-gradient(900px_700px_at_110%_110%,oklch(0.65_0.146_158.1_/_22%),transparent)] md:py-8">
      <div
        className={`relative mx-auto flex h-dvh w-full flex-col overflow-hidden md:h-[min(880px,94vh)] md:w-[400px] md:rounded-[3rem] md:border md:shadow-float ${
          dark ? "bg-forest-deep text-ivory md:border-lime/15" : "bg-background text-foreground md:border-forest/10"
        }`}
      >
        <div className="flex-1 overflow-y-auto overscroll-contain pb-28 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
        {role && <BottomNav role={role} pathname={pathname} dark={dark} />}
      </div>
    </div>
  );
}

function BottomNav({ role, pathname, dark }: { role: Role; pathname: string; dark: boolean }) {
  const items = NAVS[role];
  return (
    <nav
      aria-label="Primary"
      className={`pointer-events-auto absolute inset-x-3 bottom-3 z-40 rounded-full px-1.5 py-1.5 ${
        dark ? "glass-panel-dark" : "glass-panel"
      }`}
    >
      <ul className="flex items-center justify-between">
        {items.map((item) => {
          const active = isActive(item.to, pathname, role);
          const Icon = item.icon;
          return (
            <li key={item.to} className="flex-1">
              <Link
                to={item.to}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full px-1 py-2 transition-all duration-300 ${
                  active
                    ? dark
                      ? "bg-lime text-forest-deep"
                      : "bg-forest text-ivory shadow-lift"
                    : dark
                      ? "text-ivory/55 hover:text-ivory"
                      : "text-forest/45 hover:text-forest"
                }`}
              >
                <Icon className="size-[18px]" strokeWidth={active ? 2.4 : 2} />
                <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function RoleSwitcher({ dark }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {(
        [
          { to: "/", label: "Resident" },
          { to: "/driver", label: "Driver" },
          { to: "/municipal", label: "Control" },
        ] as const
      ).map((r) => (
        <Link
          key={r.to}
          to={r.to}
          className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide uppercase transition-colors ${
            dark
              ? "bg-ivory/8 text-ivory/70 hover:bg-ivory/15 hover:text-ivory border border-ivory/10"
              : "bg-forest/6 text-forest/60 hover:bg-forest/12 hover:text-forest border border-forest/8"
          }`}
        >
          {r.label}
        </Link>
      ))}
    </div>
  );
}

export function BrandMark({ dark, small }: { dark?: boolean; small?: boolean }) {
  return (
    <Link to="/onboarding" className="flex items-center gap-2">
      <span
        className={`flex items-center justify-center rounded-xl font-extrabold tracking-tight ${
          small ? "size-7 text-[11px]" : "size-9 text-sm"
        } ${dark ? "bg-lime text-forest-deep" : "bg-forest text-lime"}`}
      >
        CT
      </span>
      <span
        className={`font-extrabold tracking-tight ${small ? "text-sm" : "text-base"} ${
          dark ? "text-ivory" : "text-forest"
        }`}
      >
        CLEAN<span className={dark ? "text-lime" : "text-emerald"}>TRACK</span>
      </span>
    </Link>
  );
}
