import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Bell, Calendar, ChartLine, CreditCard, History, Home, LogOut,
  Map, MapPin, Route as RouteIcon, Settings, Settings2, Sun,
  TriangleAlert, UserRound, type LucideIcon,
} from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { hasUnreadCalendar, onCalendarUnreadChange } from "@/lib/calendarUnread";
import { applyTheme, onThemeChange } from "@/lib/theme";

type Role = "resident" | "driver" | "municipal";
type NavItem = { to: string; label: string; icon: LucideIcon };

const NAVS: Record<Role, NavItem[]> = {
  resident: [
    { to: "/",         label: "Home",     icon: Home },
    { to: "/track",    label: "Track",    icon: MapPin },
    { to: "/requests", label: "Requests", icon: Bell },
    { to: "/bills",    label: "Bills",    icon: CreditCard },
    { to: "/calendar", label: "Calendar", icon: Calendar },
  ],
  driver: [
    { to: "/driver",         label: "Today",   icon: Sun },
    { to: "/driver/map",     label: "Route",   icon: RouteIcon },
    { to: "/driver/issues",  label: "Issues",  icon: TriangleAlert },
    { to: "/driver/history", label: "History", icon: History },
    { to: "/driver/profile", label: "Profile", icon: UserRound },
  ],
  municipal: [
    { to: "/municipal",           label: "Overview", icon: Home },
    { to: "/municipal/map",       label: "Live Map", icon: Map },
    { to: "/municipal/routes",    label: "Routes",   icon: RouteIcon },
    { to: "/municipal/alerts",    label: "Alerts",   icon: Bell },
    { to: "/municipal/analytics", label: "Insights", icon: ChartLine },
    { to: "/municipal/manage",    label: "Manage",   icon: Settings2 },
  ],
};

const NO_NAV_PREFIXES = ["/onboarding", "/splash", "/brand", "/language", "/login", "/location", "/role-select"];

function roleFromPath(pathname: string): Role | null {
  if (pathname.startsWith("/driver"))    return "driver";
  if (pathname.startsWith("/municipal")) return "municipal";
  if (NO_NAV_PREFIXES.some((p) => pathname.startsWith(p))) return null;
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

  // Keep dark class in sync with user preference
  useEffect(() => {
    applyTheme();
    return onThemeChange(() => applyTheme());
  }, []);

  return (
    <div className="min-h-dvh w-full md:flex md:items-center md:justify-center md:bg-forest-deep md:bg-[radial-gradient(1200px_800px_at_20%_-10%,oklch(0.4_0.07_160_/_45%),transparent),radial-gradient(900px_700px_at_110%_110%,oklch(0.65_0.146_158.1_/_22%),transparent)] md:py-8">
      <div className={`relative mx-auto flex h-dvh w-full flex-col overflow-hidden md:h-[min(880px,94vh)] md:w-[400px] md:rounded-[3rem] md:border md:shadow-float ${dark ? "bg-forest-deep text-ivory md:border-lime/15" : "bg-background text-foreground md:border-forest/10"}`}>
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
  const [calendarUnread, setCalendarUnread] = useState(false);

  useEffect(() => {
    if (role !== "resident") return;
    setCalendarUnread(hasUnreadCalendar());
    return onCalendarUnreadChange(() => setCalendarUnread(hasUnreadCalendar()));
  }, [role]);

  return (
    <nav aria-label="Primary" className={`pointer-events-auto absolute inset-x-3 bottom-3 z-40 rounded-full px-1.5 py-1.5 ${dark ? "glass-panel-dark" : "glass-panel"}`}>
      <ul className="flex items-center justify-between">
        {items.map((item) => {
          const active = isActive(item.to, pathname, role);
          const Icon = item.icon;
          const showDot = role === "resident" && item.to === "/calendar" && calendarUnread;
          return (
            <li key={item.to} className="flex-1">
              <Link to={item.to} aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-0.5 rounded-full px-1 py-2 transition-all duration-300 ${active ? dark ? "bg-lime text-forest-deep" : "bg-forest text-ivory shadow-lift" : dark ? "text-ivory/55 hover:text-ivory" : "text-forest/45 hover:text-forest"}`}>
                <span className="relative">
                  <Icon className="size-[18px]" strokeWidth={active ? 2.4 : 2} />
                  {showDot && (
                    <span aria-label="New calendar update" className="absolute -right-1 -top-1 size-2 rounded-full bg-red-500 ring-[1.5px] ring-white" />
                  )}
                </span>
                <span className="text-[9px] font-semibold tracking-wide">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative">
      <button type="button" aria-label="Open account menu" onClick={() => setOpen((s) => !s)}
        className="flex size-11 shrink-0 items-center justify-center rounded-full bg-card shadow-card transition-transform hover:scale-105">
        <UserRound className="size-[18px] text-forest" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-30" aria-hidden onClick={() => setOpen(false)} />
          <div className="animate-float-in absolute right-0 top-full z-40 mt-2 w-44 overflow-hidden rounded-[1.5rem] bg-card shadow-float ring-1 ring-forest/8">
            <Link to="/profile" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-sm font-extrabold text-forest transition-colors hover:bg-pale">
              <UserRound className="size-4 text-emerald" /> Profile
            </Link>
            <div className="h-px bg-forest/6 mx-3" />
            <Link to="/settings" onClick={() => setOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-sm font-extrabold text-forest transition-colors hover:bg-pale">
              <Settings className="size-4 text-emerald" /> Settings
            </Link>
            <div className="h-px bg-forest/6 mx-3" />
            <button type="button" onClick={() => { setOpen(false); window.localStorage.removeItem("ct_onboarded"); navigate({ to: "/role-select" }); }}
              className="flex w-full items-center gap-3 px-4 py-3.5 text-sm font-extrabold text-destructive transition-colors hover:bg-coral-soft">
              <LogOut className="size-4" /> Log out
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export function RoleSwitcher({ dark }: { dark?: boolean }) {
  return (
    <div className="flex items-center gap-1.5">
      {([{ to: "/", label: "Resident" }, { to: "/driver", label: "Driver" }, { to: "/municipal", label: "Control" }] as const).map((r) => (
        <Link key={r.to} to={r.to} className={`rounded-full px-3 py-1.5 text-[10px] font-bold tracking-wide uppercase transition-colors ${dark ? "bg-ivory/8 text-ivory/70 hover:bg-ivory/15 hover:text-ivory border border-ivory/10" : "bg-forest/6 text-forest/60 hover:bg-forest/12 hover:text-forest border border-forest/8"}`}>
          {r.label}
        </Link>
      ))}
    </div>
  );
}

export function BrandMark({ dark, small }: { dark?: boolean; small?: boolean }) {
  return (
    <Link to="/onboarding" className="flex items-center gap-2">
      <span className={`flex items-center justify-center rounded-xl font-extrabold tracking-tight ${small ? "size-7 text-[11px]" : "size-9 text-sm"} ${dark ? "bg-lime text-forest-deep" : "bg-forest text-lime"}`}>ES</span>
      <span className={`font-extrabold tracking-tight ${small ? "text-sm" : "text-base"} ${dark ? "text-ivory" : "text-forest"}`}>
        ESWA<span className={dark ? "text-lime" : "text-emerald"}>CH</span>
      </span>
    </Link>
  );
}
