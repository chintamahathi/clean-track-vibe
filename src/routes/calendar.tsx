import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Truck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SubHeader } from "@/components/cleantrack/sub-header";
import { markCalendarRead } from "@/lib/calendarUnread";
import { collectionSchedule, truck } from "@/lib/data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "ESWACH — Collection calendar" },
      { name: "description", content: "Your weekly garbage collection schedule and pickup windows." },
    ],
  }),
  component: CalendarRoute,
});

type DayStatus = "past" | "today" | "tomorrow" | "scheduled" | "cancelled" | "missed";
type WeekDay = { day: string; date: string; window: string; status: DayStatus; redDot?: boolean };

const WEEK: WeekDay[] = [
  { day: "Sunday",    date: "Aug 17", window: "6:00–6:30 PM", status: "past" },
  { day: "Monday",    date: "Aug 18", window: "6:00–6:30 PM", status: "past" },
  { day: "Tuesday",   date: "Aug 19", window: "7:05 PM",       status: "past", redDot: true },
  { day: "Wednesday", date: "Aug 20", window: "6:00–6:30 PM", status: "past" },
  { day: "Thursday",  date: "Aug 21", window: "—",             status: "past", redDot: true },
  { day: "Friday",    date: "Aug 22", window: "6:12 PM",       status: "past" },
  { day: "Saturday",  date: "Aug 23", window: "6:00–6:30 PM", status: "past" },
  { day: "Monday",    date: "Aug 24", window: "6:00–6:30 PM", status: "today" },
  { day: "Tuesday",   date: "Aug 25", window: "6:00–6:30 PM", status: "tomorrow" },
  { day: "Wednesday", date: "Aug 26", window: "6:00–6:30 PM", status: "scheduled" },
  { day: "Thursday",  date: "Aug 27", window: "6:00–6:30 PM", status: "scheduled" },
  { day: "Friday",    date: "Aug 28", window: "6:00–6:30 PM", status: "scheduled" },
  { day: "Saturday",  date: "Aug 29", window: "6:00–6:30 PM", status: "scheduled" },
  { day: "Sunday",    date: "Aug 30", window: "6:00–6:30 PM", status: "scheduled" },
];

const STATUS_LABEL: Record<DayStatus, string> = {
  past: "Completed", today: "Today", tomorrow: "Tomorrow",
  scheduled: "Scheduled", cancelled: "Cancelled", missed: "Missed",
};

function DayDetail({ day, onClose }: { day: WeekDay; onClose: () => void }) {
  const missed = day.status === "missed" || (day.redDot && day.status === "past" && day.window === "—");
  const cancelled = day.status === "cancelled";
  return (
    <div className="animate-sheet-up rounded-[2rem] bg-card p-6 shadow-float ring-1 ring-forest/8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-extrabold tracking-[0.16em] text-emerald">{day.day.toUpperCase()}</p>
          <h2 className="text-xl font-extrabold tracking-tight text-forest">{day.date}</h2>
        </div>
        <button type="button" aria-label="Close" onClick={onClose} className="flex size-9 items-center justify-center rounded-full bg-secondary text-forest">
          <X className="size-4" />
        </button>
      </div>
      {(missed || cancelled) ? (
        <div className="mt-4 flex items-start gap-3 rounded-2xl bg-coral-soft p-4 ring-1 ring-coral/25">
          <span className="text-xl">❌</span>
          <div>
            <p className="text-sm font-extrabold text-coral">{missed ? "COLLECTION MISSED" : "PICKUP CANCELLED"}</p>
            <p className="mt-1 text-xs text-coral/75">{missed ? "Collection did not take place on this date." : "The scheduled pickup was cancelled."}</p>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between rounded-2xl bg-pale p-3">
            <span className="text-xs font-semibold text-muted-foreground">Collection window</span>
            <span className="flex items-center gap-1 text-xs font-extrabold text-forest"><Clock className="size-3 text-emerald" /> {day.window}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-pale p-3">
            <span className="text-xs font-semibold text-muted-foreground">Vehicle</span>
            <span className="text-xs font-extrabold text-forest">{truck.id}</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-pale p-3">
            <span className="text-xs font-semibold text-muted-foreground">Status</span>
            <span className={`text-xs font-extrabold ${day.status === "today" ? "text-emerald" : "text-forest"}`}>{STATUS_LABEL[day.status]}</span>
          </div>
        </div>
      )}
    </div>
  );
}

function CalendarRoute() {
  const [selectedDay, setSelectedDay] = useState<WeekDay | null>(null);

  useEffect(() => { markCalendarRead(); }, []);

  return (
    <div className="px-5 pt-6">
      <SubHeader title="Collection Calendar" subtitle="Your weekly pickup schedule" />

      <section className="animate-float-in relative mt-5 overflow-hidden rounded-[2rem] bg-forest p-5 text-ivory shadow-float">
        <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald/25 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ivory/10 text-lime ring-1 ring-ivory/15"><Truck className="size-5" /></span>
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold tracking-[0.18em] text-lime">ASSIGNED VEHICLE</p>
            <p className="text-sm font-bold text-ivory">{truck.id} · {truck.route}</p>
          </div>
        </div>
        <dl className="relative mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-ivory/8 p-3">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-ivory/55">Frequency</dt>
            <dd className="mt-1 text-sm font-extrabold text-ivory">{collectionSchedule.frequency}</dd>
          </div>
          <div className="rounded-2xl bg-ivory/8 p-3">
            <dt className="text-[10px] font-semibold uppercase tracking-wide text-ivory/55">Window</dt>
            <dd className="mt-1 text-sm font-extrabold text-ivory">{collectionSchedule.window}</dd>
          </div>
        </dl>
      </section>

      {selectedDay && <div className="mt-4"><DayDetail day={selectedDay} onClose={() => setSelectedDay(null)} /></div>}

      <section className="mt-4 space-y-2.5 pb-6">
        {WEEK.map((row, i) => {
          const isToday    = row.status === "today";
          const isTomorrow = row.status === "tomorrow";
          const isPast     = row.status === "past";
          const isCancelled = row.status === "cancelled" || row.status === "missed";
          const cardBg = isToday ? "bg-emerald-soft ring-1 ring-emerald/25" : isPast ? "bg-secondary/60 opacity-70" : "bg-card";
          const iconBg = isToday ? "bg-emerald text-ivory" : isPast ? "bg-muted text-muted-foreground" : "bg-secondary text-forest";
          return (
            <button key={`${row.day}-${row.date}`} type="button" onClick={() => setSelectedDay(row)}
              className={`animate-float-in flex w-full items-center gap-3 rounded-3xl p-4 shadow-card text-left transition-transform hover:scale-[1.01] ${cardBg}`}
              style={{ animationDelay: `${i * 40}ms` }}>
              <span className={`relative flex size-11 shrink-0 flex-col items-center justify-center rounded-2xl text-center ${iconBg}`}>
                <CalendarDays className="size-[18px]" />
                {row.redDot && <span aria-label="Missed or cancelled" className="absolute -right-1 -top-1 size-3 rounded-full bg-coral ring-2 ring-card" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className={`text-sm font-extrabold ${isPast ? "text-muted-foreground" : "text-forest"}`}>{row.day}</p>
                <p className="text-[11px] text-muted-foreground">{row.date}</p>
              </div>
              <div className="text-right">
                <p className={`flex items-center justify-end gap-1 text-xs font-bold ${isPast ? "text-muted-foreground" : "text-forest"}`}>
                  {!isCancelled && <Clock className={`size-3 ${isToday ? "text-emerald" : "text-emerald/60"}`} />}
                  {row.window}
                </p>
                <p className={`mt-0.5 text-[10px] font-extrabold uppercase tracking-wide ${isToday ? "text-emerald" : isCancelled ? "text-coral" : isPast ? "text-muted-foreground" : isTomorrow ? "text-forest" : "text-muted-foreground"}`}>
                  {STATUS_LABEL[row.status]}
                </p>
              </div>
            </button>
          );
        })}
      </section>
    </div>
  );
}
