export type CollectionStatus =
  | "on-route"
  | "nearby"
  | "delayed"
  | "unavailable"
  | "completed"
  | "scheduled";

export const truck = {
  id: "SAT-247",
  driver: "Ravi Kumar",
  route: "Madhapur Route",
  status: "on-route" as CollectionStatus,
  etaMin: 12,
  window: "6:00–6:30 PM",
  stopsRemaining: 18,
  totalStops: 56,
};

export const resident = {
  name: "Aanya",
  area: "Madhapur, Hyderabad",
  address: "Plot 42, Green Hills Colony, Madhapur",
};

export type HistoryEntry = {
  id: string;
  date: string;
  window: string;
  status: CollectionStatus;
  vehicle: string;
  weightKg: number;
};

export const history: HistoryEntry[] = [
  { id: "h1", date: "Today", window: "6:00–6:30 PM", status: "on-route", vehicle: "SAT-247", weightKg: 0 },
  { id: "h2", date: "Aug 22", window: "6:12 PM", status: "completed", vehicle: "SAT-247", weightKg: 2.4 },
  { id: "h3", date: "Aug 21", window: "6:08 PM", status: "completed", vehicle: "SAT-247", weightKg: 1.8 },
  { id: "h4", date: "Aug 20", window: "6:21 PM", status: "completed", vehicle: "SAT-247", weightKg: 2.1 },
  { id: "h5", date: "Aug 19", window: "7:05 PM", status: "delayed", vehicle: "SAT-103", weightKg: 1.6 },
  { id: "h6", date: "Aug 18", window: "6:04 PM", status: "completed", vehicle: "SAT-247", weightKg: 2.8 },
  { id: "h7", date: "Aug 17", window: "—", status: "unavailable", vehicle: "—", weightKg: 0 },
];

export const impact = {
  streakDays: 18,
  collectedKg: 32,
  reliability: 94,
  colony: {
    name: "Green Hills Colony",
    reliability: 92,
    missedPickups: 3,
    overflowIncidents: 1,
    households: 438,
  },
};

export const driverToday = {
  name: "Ravi",
  vehicle: "SAT-247",
  route: "Madhapur Route",
  progress: 72,
  households: 438,
  collected: 315,
  remaining: 123,
  nextStop: {
    label: "Stop 316",
    address: "Green Hills Colony, Lane 4",
    distanceM: 240,
    etaMin: 3,
  },
};

export type VehicleStatus = "active" | "delayed" | "unavailable";

export type Vehicle = {
  id: string;
  route: string;
  driver: string;
  status: VehicleStatus;
  progress: number;
  x: number; // map coords (0-400 x 0-520 space)
  y: number;
};

export const vehicles: Vehicle[] = [
  { id: "SAT-247", route: "Madhapur Route", driver: "Ravi Kumar", status: "active", progress: 72, x: 205, y: 245 },
  { id: "SAT-103", route: "Kondapur Route", driver: "S. Prakash", status: "active", progress: 64, x: 96, y: 128 },
  { id: "SAT-391", route: "Madhapur Route", driver: "M. Farhan", status: "unavailable", progress: 12, x: 120, y: 392 },
  { id: "SAT-158", route: "Gachibowli Route", driver: "K. Anitha", status: "delayed", progress: 41, x: 304, y: 150 },
  { id: "SAT-220", route: "Hitec Route", driver: "P. Naveen", status: "active", progress: 88, x: 318, y: 356 },
  { id: "SAT-074", route: "Jubilee Route", driver: "D. Swathi", status: "delayed", progress: 55, x: 66, y: 268 },
];

export const municipalKpis = {
  active: 84,
  delayed: 9,
  unavailable: 4,
  routesComplete: 78,
  missed: 12,
  overflow: 3,
};

export type Alert = {
  id: string;
  level: "critical" | "warning" | "info";
  title: string;
  detail: string;
  meta: string;
  time: string;
  action: string;
};

export const alerts: Alert[] = [
  {
    id: "a1",
    level: "critical",
    title: "VEHICLE UNAVAILABLE",
    detail: "SAT-391",
    meta: "Madhapur Route",
    time: "2 min ago",
    action: "ASSIGN BACKUP",
  },
  {
    id: "a2",
    level: "warning",
    title: "OVERFLOW RISK",
    detail: "Collection Point 14",
    meta: "91% full",
    time: "11 min ago",
    action: "DISPATCH VEHICLE",
  },
  {
    id: "a3",
    level: "warning",
    title: "COLLECTION DELAYED",
    detail: "SAT-158",
    meta: "Gachibowli Route · new ETA 6:42 PM",
    time: "24 min ago",
    action: "NOTIFY RESIDENTS",
  },
  {
    id: "a4",
    level: "info",
    title: "ROUTE COMPLETED",
    detail: "SAT-220",
    meta: "Hitec Route · 438 households",
    time: "48 min ago",
    action: "VIEW REPORT",
  },
];

export const municipalRoutes = [
  { id: "r1", name: "Madhapur Route", vehicle: "SAT-247", progress: 72, status: "active" as VehicleStatus, households: 438 },
  { id: "r2", name: "Kondapur Route", vehicle: "SAT-103", progress: 64, status: "active" as VehicleStatus, households: 392 },
  { id: "r3", name: "Gachibowli Route", vehicle: "SAT-158", progress: 41, status: "delayed" as VehicleStatus, households: 510 },
  { id: "r4", name: "Hitec Route", vehicle: "SAT-220", progress: 100, status: "active" as VehicleStatus, households: 438 },
  { id: "r5", name: "Jubilee Route", vehicle: "SAT-074", progress: 55, status: "delayed" as VehicleStatus, households: 356 },
  { id: "r6", name: "Madhapur Route B", vehicle: "SAT-391", progress: 12, status: "unavailable" as VehicleStatus, households: 402 },
];

export const analytics = {
  reliability: 92,
  delta: "+8% compared with last week",
  series: [78, 82, 79, 85, 84, 88, 92], // 7 days
  days: ["M", "T", "W", "T", "F", "S", "S"],
  onTime: 87,
  avgResponseMin: 14,
  tonnesDiverted: 12.4,
};

export const missedReasons = [
  { id: "no-arrive", label: "Truck didn't arrive", hint: "The vehicle never reached your street" },
  { id: "skipped", label: "Street skipped", hint: "It passed nearby but missed your lane" },
  { id: "full", label: "Vehicle full", hint: "Truck reached capacity before your stop" },
  { id: "breakdown", label: "Vehicle breakdown", hint: "A mechanical issue stopped the route" },
  { id: "other", label: "Other", hint: "Something else went wrong" },
];

export const wasteTypes = [
  { id: "household", label: "Household", hint: "Daily kitchen & dry waste" },
  { id: "recyclables", label: "Recyclables", hint: "Plastic, paper, metal, glass" },
  { id: "garden", label: "Garden", hint: "Leaves, branches, green waste" },
  { id: "bulky", label: "Bulky items", hint: "Furniture & large objects" },
];

export const timeSlots = ["6:00–8:00 AM", "10:00–12:00 PM", "2:00–4:00 PM", "4:00–6:00 PM"];

export const issueTypes = [
  { id: "road-blocked", label: "Road blocked", hint: "Cannot pass through this street" },
  { id: "breakdown", label: "Vehicle breakdown", hint: "Truck needs mechanical assistance" },
  { id: "vehicle-issue", label: "Vehicle issue", hint: "Compactor or equipment problem" },
  { id: "staff-issue", label: "Staff issue", hint: "Crew unavailable or short-staffed" },
];

export const overflowPoint = {
  id: "Collection Point 14",
  area: "Madhapur Junction",
  fill: 91,
  currentKg: 910,
  capacityKg: 1000,
};
