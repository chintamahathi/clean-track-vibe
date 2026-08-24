/**
 * driverArea.ts
 * Persists the driver's current area assignment to localStorage.
 * In production this would be backed by a driver_area_assignments table.
 */

export type DriverArea = { id: string; name: string; ward: string };

export const DRIVER_AREAS: DriverArea[] = [
  { id: "MK-1", name: "Manikonda 1",    ward: "Ward 85"  },
  { id: "MK-2", name: "Manikonda 2",    ward: "Ward 86"  },
  { id: "KP-1", name: "Kukatpally 1",   ward: "Ward 112" },
  { id: "KD-1", name: "Kondapur 1",     ward: "Ward 101" },
  { id: "MD-1", name: "Madhapur 1",     ward: "Ward 103" },
  { id: "GB-1", name: "Gachibowli 1",   ward: "Ward 95"  },
  { id: "JH-1", name: "Jubilee Hills 1",ward: "Ward 98"  },
  { id: "HT-1", name: "Hitec City 1",   ward: "Ward 100" },
];

const KEY = "ct_driver_area_id";
const DEFAULT = "MK-1";
const EVENT = "ct:driverArea";

export function getAreaId(): string {
  return (typeof window !== "undefined" ? localStorage.getItem(KEY) : null) ?? DEFAULT;
}

export function getArea(): DriverArea {
  const id = getAreaId();
  return DRIVER_AREAS.find((a) => a.id === id) ?? (DRIVER_AREAS[0] as DriverArea);
}

export function setArea(id: string): void {
  localStorage.setItem(KEY, id);
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function onAreaChange(cb: () => void): () => void {
  window.addEventListener(EVENT, cb);
  const onStorage = (e: StorageEvent) => { if (e.key === KEY) cb(); };
  window.addEventListener("storage", onStorage);
  return () => { window.removeEventListener(EVENT, cb); window.removeEventListener("storage", onStorage); };
}
