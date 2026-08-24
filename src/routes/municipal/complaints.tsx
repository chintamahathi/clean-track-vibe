import { createFileRoute } from "@tanstack/react-router";
import { Camera, ChevronRight, Clock4, MapPin } from "lucide-react";
import { useState } from "react";
import { municipalComplaints, type ComplaintStatus } from "@/lib/data";

export const Route = createFileRoute("/municipal/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints — ESWACH Control" },
      { name: "description", content: "Every resident complaint with assignment, status and expected resolution time." },
      { property: "og:title", content: "Complaints — ESWACH Control" },
      { property: "og:description", content: "Municipal complaint management and resolution tracking." },
    ],
  }),
  component: MunicipalComplaints,
});

const FILTERS = [
  { id: "new", label: "NEW" },
  { id: "assigned", label: "ASSIGNED" },
  { id: "in-progress", label: "IN PROGRESS" },
  { id: "resolved", label: "RESOLVED" },
] as const;

const STATUS_STYLE: Record<ComplaintStatus, string> = {
  new: "bg-cyan/15 text-cyan ring-cyan/35",
  assigned: "bg-amber/12 text-amber ring-amber/35",
  "in-progress": "bg-emerald/15 text-emerald ring-emerald/30",
  resolved: "bg-ivory/10 text-ivory/60 ring-ivory/15",
};

const STATUS_LABEL: Record<ComplaintStatus, string> = {
  new: "NEW",
  assigned: "ASSIGNED",
  "in-progress": "IN PROGRESS",
  resolved: "RESOLVED",
};

function MunicipalComplaints() {
  const [filter, setFilter] = useState<ComplaintStatus | "all">("all");
  const list = municipalComplaints.filter((c) => filter === "all" || c.status === filter);

  return (
    <div className="px-5 pt-6">
      <p className="text-[10px] font-extrabold tracking-[0.22em] text-lime">RESIDENT VOICE</p>
      <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-ivory">Complaints</h1>

      {/* filters */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setFilter("all")}
          className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-extrabold tracking-[0.1em] transition-all ${
            filter === "all" ? "bg-lime text-forest-deep" : "bg-forest text-ivory/60 ring-1 ring-ivory/10"
          }`}
        >
          ALL
        </button>
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-[10px] font-extrabold tracking-[0.1em] transition-all ${
              filter === f.id ? "bg-lime text-forest-deep" : "bg-forest text-ivory/60 ring-1 ring-ivory/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="mt-4 space-y-3 pb-4">
        {list.map((c, i) => (
          <li
            key={c.id}
            className="animate-float-in rounded-[1.75rem] bg-forest p-5 ring-1 ring-lime/10"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-extrabold tracking-[0.16em] text-cyan">#{c.id} · {c.dept.toUpperCase()}</p>
              <span className={`rounded-full px-3 py-1 text-[9px] font-extrabold tracking-[0.1em] ring-1 ${STATUS_STYLE[c.status]}`}>
                {STATUS_LABEL[c.status]}
              </span>
            </div>
            <div className="mt-2 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-base font-extrabold tracking-tight text-ivory">{c.category}</p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-ivory/50">
                  <MapPin className="size-3.5 text-lime" /> {c.location}
                </p>
              </div>
              {c.hasPhoto && (
                <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-ivory/8 text-ivory/60 ring-1 ring-ivory/12">
                  <Camera className="size-5" />
                </span>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-ivory/10 pt-3 text-[11px] font-bold text-ivory/50">
              <span className="flex items-center gap-1.5">
                <Clock4 className="size-3.5" /> {c.time}
                {c.assigned ? ` · ${c.assigned}` : ""}
              </span>
              <span className={c.status === "resolved" ? "text-emerald" : "text-amber"}>
                {c.resolutionHrs ? `Resolved in ${c.resolutionHrs}` : c.expected}
              </span>
            </div>
            {c.status !== "resolved" && (
              <button
                type="button"
                className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl bg-ivory/8 py-3 text-[10px] font-extrabold tracking-[0.08em] text-ivory ring-1 ring-ivory/12 transition-transform hover:scale-[1.01]"
              >
                {c.status === "new" ? "ASSIGN VEHICLE" : "VIEW DETAIL"} <ChevronRight className="size-3.5" />
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
