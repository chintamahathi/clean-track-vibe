import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, Clock, Truck } from "lucide-react";
import { collectionSchedule, truck } from "@/lib/data";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "CleanTrack — Collection calendar" },
      {
        name: "description",
        content: "Your weekly garbage collection schedule and pickup windows.",
      },
    ],
  }),
  component: CalendarRoute,
});

const WEEK = [
  { day: "Monday", date: "Aug 24", window: "6:00–6:30 PM", status: "Today" },
  { day: "Tuesday", date: "Aug 25", window: "6:00–6:30 PM", status: "Scheduled" },
  { day: "Wednesday", date: "Aug 26", window: "6:00–6:30 PM", status: "Scheduled" },
  { day: "Thursday", date: "Aug 27", window: "6:00–6:30 PM", status: "Scheduled" },
  { day: "Friday", date: "Aug 28", window: "6:00–6:30 PM", status: "Scheduled" },
  { day: "Saturday", date: "Aug 29", window: "6:00–6:30 PM", status: "Scheduled" },
  { day: "Sunday", date: "Aug 30", window: "6:00–6:30 PM", status: "Scheduled" },
];

function CalendarRoute() {
  return (
    <div className="px-5 pt-6">
      <header>
        <p className="text-xs font-medium text-muted-foreground">Weekly schedule</p>
        <h1 className="text-2xl font-extrabold tracking-tight text-forest">Collection Calendar</h1>
      </header>

      <section className="animate-float-in relative mt-5 overflow-hidden rounded-[2rem] bg-forest p-5 text-ivory shadow-float">
        <div aria-hidden className="absolute -right-16 -top-20 size-56 rounded-full bg-emerald/25 blur-2xl" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-ivory/10 text-lime ring-1 ring-ivory/15">
            <Truck className="size-5" />
          </span>
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

      <section className="mt-4 space-y-2.5">
        {WEEK.map((row, i) => {
          const today = row.status === "Today";
          return (
            <div
              key={row.day}
              className={`animate-float-in flex items-center gap-3 rounded-3xl p-4 shadow-card ${
                today ? "bg-emerald-soft ring-1 ring-emerald/25" : "bg-card"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <span
                className={`flex size-11 shrink-0 flex-col items-center justify-center rounded-2xl text-center ${
                  today ? "bg-emerald text-ivory" : "bg-secondary text-forest"
                }`}
              >
                <CalendarDays className="size-[18px]" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-extrabold text-forest">{row.day}</p>
                <p className="text-[11px] text-muted-foreground">{row.date}</p>
              </div>
              <div className="text-right">
                <p className="flex items-center justify-end gap-1 text-xs font-bold text-forest">
                  <Clock className="size-3 text-emerald" />
                  {row.window}
                </p>
                <p className={`mt-0.5 text-[10px] font-extrabold uppercase tracking-wide ${today ? "text-emerald" : "text-muted-foreground"}`}>
                  {row.status}
                </p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
