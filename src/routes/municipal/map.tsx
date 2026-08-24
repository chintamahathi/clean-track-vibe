import { createFileRoute } from "@tanstack/react-router";
import { Phone, Shuffle } from "lucide-react";
import { useState } from "react";
import { CityMap, MapContainer, MapControls } from "@/components/cleantrack/map";
import { StatusDot } from "@/components/cleantrack/status-pill";
import { vehicles } from "@/lib/data";

export const Route = createFileRoute("/municipal/map")({
  head: () => ({
    meta: [
      { title: "Live fleet map — ESWACH Control" },
      {
        name: "description",
        content: "Every collection vehicle live on one map — green active, amber delayed, red unavailable, cyan selected.",
      },
      { property: "og:title", content: "Live fleet map — ESWACH Control" },
      { property: "og:description", content: "Live city-wide vehicle map with status-coded markers." },
    ],
  }),
  component: MunicipalMap,
});

function MunicipalMap() {
  const [selectedId, setSelectedId] = useState<string>("SAT-247");
  const selected = vehicles.find((v) => v.id === selectedId);

  return (
    <div className="flex h-full flex-col">
      <MapContainer className="animate-float-in mx-4 mt-4 h-[58dvh] min-h-[420px] ring-1 ring-lime/10">
        <CityMap
          theme="dark"
          vehicles={vehicles}
          selectedId={selectedId}
          onSelectVehicle={setSelectedId}
          points={false}
        />
        <MapControls dark />
        {/* legend */}
        <div className="glass-panel-dark absolute left-3 top-3 z-20 space-y-1.5 rounded-2xl p-3 text-ivory">
          <StatusDot tone="emerald" label="Active" />
          <br />
          <StatusDot tone="amber" label="Delayed" />
          <br />
          <StatusDot tone="coral" label="Unavailable" />
          <br />
          <StatusDot tone="cyan" label="Selected" />
        </div>
      </MapContainer>

      {/* selected vehicle sheet */}
      {selected && (
        <section
          key={selected.id}
          className="animate-sheet-up relative z-10 mx-4 -mt-10 rounded-[2rem] bg-forest p-5 ring-1 ring-lime/15 shadow-float"
        >
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ivory/15" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-extrabold tracking-tight text-ivory">{selected.id}</p>
              <p className="text-xs font-medium text-ivory/55">
                {selected.route} · {selected.driver}
              </p>
            </div>
            <StatusDot
              tone={selected.status === "active" ? "emerald" : selected.status === "delayed" ? "amber" : "coral"}
              label={selected.status.toUpperCase()}
            />
          </div>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-ivory/10">
              <div
                className="h-full rounded-full bg-[linear-gradient(90deg,var(--emerald),var(--cyan))] transition-all duration-700"
                style={{ width: `${selected.progress}%` }}
              />
            </div>
            <span className="text-sm font-extrabold text-lime">{selected.progress}%</span>
          </div>
          {/* vehicle details */}
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 border-t border-ivory/10 pt-4">
            {(
              [
                ["Capacity", selected.status === "unavailable" ? "—" : "74%"],
                ["Stops left", String(Math.round((56 * (100 - selected.progress)) / 100))],
                ["Fuel", selected.status === "unavailable" ? "—" : "68%"],
                ["Shift ends", "9:30 PM"],
              ] as [string, string][]
            ).map(([k, v]) => (
              <div key={k} className="flex items-baseline justify-between gap-2">
                <dt className="text-[10px] font-extrabold tracking-[0.12em] text-ivory/40">{k.toUpperCase()}</dt>
                <dd className="text-sm font-extrabold text-ivory">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl bg-lime py-3.5 text-xs font-extrabold tracking-wide text-forest-deep transition-transform hover:scale-[1.02]"
            >
              <Shuffle className="size-4" />
              ASSIGN BACKUP
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-2xl bg-ivory/10 py-3.5 text-xs font-extrabold tracking-wide text-ivory ring-1 ring-ivory/15 transition-transform hover:scale-[1.02]"
            >
              <Phone className="size-4" />
              CALL DRIVER
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
