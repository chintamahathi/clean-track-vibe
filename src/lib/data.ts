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

// ============================================================
// Extended product data — onboarding → auth → ops intelligence
// ============================================================

export const collectionSchedule = {
  frequency: "Daily",
  days: "Mon – Sun",
  window: "6:00 – 6:30 PM",
  vehicle: "SAT-247",
  nextCollection: "Tomorrow · 6:00 PM",
  lastCollection: "Yesterday · 6:12 PM",
};

export const wetDryToday: { wet: "collected" | "pending"; dry: "collected" | "pending" } = {
  wet: "collected",
  dry: "pending",
};

export const languages = [
  { id: "en", label: "English", native: "English" },
  { id: "te", label: "Telugu", native: "తెలుగు" },
  { id: "hi", label: "Hindi", native: "हिन्दी" },
] as const;

export type AppNotification = {
  id: string;
  tone: "emerald" | "amber" | "coral" | "cyan";
  icon: string;
  title: string;
  body: string;
  time: string;
  action?: string;
};

export const notifications: AppNotification[] = [
  {
    id: "n1",
    tone: "emerald",
    icon: "🚛",
    title: "TRUCK APPROACHING",
    body: "SAT-247 is arriving in approximately 10 minutes.",
    time: "2 min ago",
  },
  {
    id: "n2",
    tone: "amber",
    icon: "⚠",
    title: "COLLECTION DELAYED",
    body: "Your collection is now expected at 6:42 PM.",
    time: "18 min ago",
  },
  {
    id: "n3",
    tone: "cyan",
    icon: "🚛",
    title: "BACKUP VEHICLE ASSIGNED",
    body: "SAT-312 has been assigned to your route.",
    time: "32 min ago",
  },
  {
    id: "n4",
    tone: "coral",
    icon: "❌",
    title: "COLLECTION MISSED",
    body: "Today's collection was not completed on Lane 4.",
    time: "Yesterday",
    action: "REQUEST PICKUP",
  },
  {
    id: "n5",
    tone: "coral",
    icon: "🚨",
    title: "VEHICLE UNAVAILABLE",
    body: "Your assigned vehicle is temporarily unavailable.",
    time: "Yesterday",
  },
  {
    id: "n6",
    tone: "amber",
    icon: "⚠",
    title: "OVERFLOW RISK",
    body: "Your nearest collection point is nearly full.",
    time: "2 days ago",
  },
];

export type ComplaintStatus = "new" | "assigned" | "in-progress" | "resolved";

export type Complaint = {
  id: string;
  category: string;
  location: string;
  status: ComplaintStatus;
  time: string;
  expected: string;
  assigned?: string;
  hasPhoto: boolean;
};

export const complaints: Complaint[] = [
  {
    id: "10482",
    category: "Missed collection",
    location: "Plot 42, Green Hills Colony",
    status: "in-progress",
    time: "Today · 6:42 PM",
    expected: "Today by 8:00 PM",
    assigned: "SAT-312 · K. Anitha",
    hasPhoto: true,
  },
  {
    id: "10461",
    category: "Overflow report",
    location: "Collection Point #14, Madhapur Junction",
    status: "resolved",
    time: "Aug 22 · 4:18 PM",
    expected: "Resolved in 2h 12m",
    assigned: "SAT-220 · P. Naveen",
    hasPhoto: true,
  },
  {
    id: "10440",
    category: "Street skipped",
    location: "Green Hills Colony, Lane 2",
    status: "resolved",
    time: "Aug 19 · 7:02 PM",
    expected: "Resolved in 4h 40m",
    assigned: "SAT-103 · S. Prakash",
    hasPhoto: false,
  },
];

export type TimelineStep = { label: string; time?: string; state: "done" | "current" | "pending" };

export const complaintTimeline: TimelineStep[] = [
  { label: "SUBMITTED", time: "6:42 PM", state: "done" },
  { label: "RECEIVED", time: "6:44 PM", state: "done" },
  { label: "ASSIGNED", time: "6:51 PM · SAT-312", state: "done" },
  { label: "IN PROGRESS", time: "Now · vehicle dispatched", state: "current" },
  { label: "RESOLVED", state: "pending" },
  { label: "CONFIRMED", state: "pending" },
];

export const pickupTracker: TimelineStep[] = [
  { label: "REQUESTED", time: "Just now", state: "done" },
  { label: "ASSIGNED", time: "ETA ~15 min", state: "current" },
  { label: "DISPATCHED", state: "pending" },
  { label: "COLLECTED", state: "pending" },
];

export type CollectionPoint = {
  id: string;
  area: string;
  distanceM: number;
  fill: number;
  lastCollected: string;
  status: "ok" | "high" | "critical";
  capacityKg: number;
  currentKg: number;
  wasteType: string;
  vehicle: string;
  schedule: string;
  next: string;
  overflowHours: number | null;
  x: number;
  y: number;
};

export const collectionPoints: CollectionPoint[] = [
  {
    id: "Collection Point #14",
    area: "Madhapur Junction",
    distanceM: 250,
    fill: 82,
    lastCollected: "4:10 PM",
    status: "high",
    capacityKg: 1000,
    currentKg: 820,
    wasteType: "Mixed",
    vehicle: "SAT-247",
    schedule: "Daily · 4:00 PM",
    next: "Tomorrow · 4:00 PM",
    overflowHours: 6,
    x: 118,
    y: 388,
  },
  {
    id: "Collection Point #09",
    area: "Green Hills Colony, Lane 2",
    distanceM: 480,
    fill: 46,
    lastCollected: "3:52 PM",
    status: "ok",
    capacityKg: 800,
    currentKg: 368,
    wasteType: "Household",
    vehicle: "SAT-247",
    schedule: "Daily · 3:45 PM",
    next: "Tomorrow · 3:45 PM",
    overflowHours: null,
    x: 76,
    y: 452,
  },
  {
    id: "Collection Point #21",
    area: "Cyber Towers Gate, Hitec City",
    distanceM: 900,
    fill: 91,
    lastCollected: "1:05 PM",
    status: "critical",
    capacityKg: 1200,
    currentKg: 1092,
    wasteType: "Mixed",
    vehicle: "SAT-220",
    schedule: "Daily · 1:00 PM",
    next: "Today · 9:00 PM",
    overflowHours: 2,
    x: 246,
    y: 196,
  },
];

export const savedAddresses = [
  {
    id: "home",
    label: "HOME",
    primary: true,
    address: "Plot 42, Green Hills Colony",
    colony: "Madhapur",
    street: "Lane 4",
    ward: "Ward 103",
    truck: "SAT-247",
    schedule: "Daily",
    window: "6:00 – 6:30 PM",
  },
  {
    id: "work",
    label: "WORK",
    primary: false,
    address: "Cyber Towers, Hitec City",
    colony: "Hitec City",
    street: "Main Gate",
    ward: "Ward 101",
    truck: "SAT-220",
    schedule: "Daily",
    window: "2:00 – 2:30 PM",
  },
  {
    id: "other",
    label: "OTHER",
    primary: false,
    address: "Plot 18, Jubilee Hills",
    colony: "Jubilee Hills",
    street: "Road No. 12",
    ward: "Ward 98",
    truck: "SAT-074",
    schedule: "Mon · Wed · Fri",
    window: "7:00 – 7:30 AM",
  },
];

export const driverProfile = {
  name: "Ravi Kumar",
  phone: "+91 98•• ••210",
  id: "DRV-0417",
  vehicle: {
    id: "SAT-247",
    type: "Compactor truck",
    capacityKg: 1000,
    maintenance: "Good",
    lastService: "Aug 12",
  },
  shift: { label: "Evening shift", time: "2:00 – 10:00 PM" },
  route: { name: "Madhapur Route", households: 438 },
  colonies: ["Green Hills Colony", "Green Valley Colony", "Lotus Pond Enclave", "Madhapur Junction"],
};

export const driverIssuesV2 = [
  { id: "road-blocked", label: "Road blocked", hint: "Cannot pass through" },
  { id: "traffic", label: "Heavy traffic", hint: "Severe congestion" },
  { id: "breakdown", label: "Breakdown", hint: "Mechanical assistance" },
  { id: "vehicle-full", label: "Vehicle full", hint: "Reached capacity" },
  { id: "point-inaccessible", label: "Point blocked", hint: "Cannot reach point" },
  { id: "household-unavailable", label: "Household away", hint: "No waste put out" },
  { id: "dangerous-road", label: "Unsafe road", hint: "Dangerous for crew" },
  { id: "worker-shortage", label: "Short-staffed", hint: "Crew unavailable" },
  { id: "other", label: "Other", hint: "Something else" },
];

export const vehicleDetails: Record<
  string,
  { speedKmh: number; gpsAgo: string; capacity: number; shift: string; maintenance: string; breakdown: string }
> = {
  "SAT-247": { speedKmh: 24, gpsAgo: "12s ago", capacity: 68, shift: "Evening", maintenance: "Good", breakdown: "None" },
  "SAT-103": { speedKmh: 31, gpsAgo: "8s ago", capacity: 54, shift: "Evening", maintenance: "Good", breakdown: "None" },
  "SAT-391": { speedKmh: 0, gpsAgo: "4m ago", capacity: 12, shift: "Evening", maintenance: "Flagged", breakdown: "Compactor fault" },
  "SAT-158": { speedKmh: 9, gpsAgo: "21s ago", capacity: 77, shift: "Evening", maintenance: "Good", breakdown: "None" },
  "SAT-220": { speedKmh: 18, gpsAgo: "5s ago", capacity: 96, shift: "Afternoon", maintenance: "Good", breakdown: "None" },
  "SAT-074": { speedKmh: 14, gpsAgo: "33s ago", capacity: 61, shift: "Morning", maintenance: "Due soon", breakdown: "None" },
};

export const smartDelay = {
  vehicle: "SAT-247",
  behindMin: 18,
  route: "Madhapur Route",
};

export const predictedDelay = {
  vehicle: "SAT-247",
  lateMin: 15,
  reason: "Vehicle is 2 km behind expected route position.",
};

export const routeOptimization = {
  currentMin: 42,
  optimizedMin: 34,
  distanceSavedKm: 3.6,
  households: 438,
};

export const demandAreas = [
  { name: "Madhapur", level: "high" as const, expected: "2.4 t" },
  { name: "Kondapur", level: "medium" as const, expected: "1.6 t" },
  { name: "Kukatpally", level: "high" as const, expected: "2.1 t" },
  { name: "Gachibowli", level: "low" as const, expected: "0.9 t" },
];

export const routeMonitor = {
  vehicle: "SAT-247",
  date: "Aug 24",
  assignedStreets: 24,
  completedStreets: 17,
  remainingStreets: 5,
  missedStreets: 2,
  deviationKm: 0.4,
  completion: 72,
  etaComplete: "7:40 PM",
};

export const municipalComplaints: (Complaint & { dept: string; resolutionHrs?: string })[] = [
  { id: "10482", category: "Missed collection", location: "Green Hills Colony, Lane 4", status: "in-progress", time: "6:42 PM", expected: "By 8:00 PM", assigned: "SAT-312", hasPhoto: true, dept: "Sanitation" },
  { id: "10479", category: "Overflow report", location: "Collection Point #14", status: "assigned", time: "6:11 PM", expected: "By 7:30 PM", assigned: "SAT-220", hasPhoto: true, dept: "Sanitation" },
  { id: "10477", category: "Vehicle skipped street", location: "Lotus Pond Enclave", status: "new", time: "5:58 PM", expected: "Awaiting assignment", hasPhoto: false, dept: "Fleet Ops" },
  { id: "10461", category: "Overflow report", location: "Collection Point #14", status: "resolved", time: "Aug 22", expected: "Resolved", assigned: "SAT-220", hasPhoto: true, dept: "Sanitation", resolutionHrs: "2h 12m" },
];

export const manageSections = [
  { id: "users", label: "Users", count: "12,408", items: ["Aanya R. — Green Hills", "Mohammed F. — Kondapur", "S. Lakshmi — Jubilee Hills"] },
  { id: "drivers", label: "Drivers", count: "96", items: ["Ravi Kumar — SAT-247", "K. Anitha — SAT-158", "P. Naveen — SAT-220"] },
  { id: "vehicles", label: "Vehicles", count: "104", items: ["SAT-247 — Compactor · Good", "SAT-391 — Compactor · Flagged", "SAT-220 — Compactor · Good"] },
  { id: "colonies", label: "Colonies", count: "58", items: ["Green Hills Colony", "Green Valley Colony", "Lotus Pond Enclave"] },
  { id: "routes", label: "Routes", count: "42", items: ["Madhapur Route — 438 hh", "Kondapur Route — 392 hh", "Gachibowli Route — 510 hh"] },
  { id: "points", label: "Collection points", count: "316", items: ["Point #14 — Madhapur Jn", "Point #09 — Green Hills", "Point #21 — Cyber Towers"] },
  { id: "schedules", label: "Schedules", count: "42", items: ["Evening — 6:00 PM window", "Afternoon — 2:00 PM window", "Morning — 7:00 AM window"] },
  { id: "areas", label: "Service areas", count: "12", items: ["Ward 101 — Hitec City", "Ward 103 — Madhapur", "Ward 98 — Jubilee Hills"] },
];

export const sustainabilityScore = {
  score: 87,
  colony: 93,
  factors: ["Collection participation", "Waste segregation", "On-time disposal", "Consistent behavior"],
};

export const colonyProgressCompare = {
  lastMonth: { missed: 18, overflow: 7, reliability: 81 },
  thisMonth: { missed: 6, overflow: 2, reliability: 95 },
};

export const badges = [
  { icon: "🔥", label: "18-day streak", sub: "Personal best" },
  { icon: "🌱", label: "Segregation pro", sub: "Wet/dry, 30 days" },
  { icon: "🏆", label: "Cleanest colony", sub: "30 days, zero overflow" },
];

export const etaPrediction = {
  time: "6:27 PM",
  confidence: "HIGH",
  factors: ["Live GPS location", "Current traffic", "18 stops remaining", "Historical route time", "Avg. collection time per stop"],
};

export const backupVehicle = { id: "SAT-312", capacity: 72, distanceKm: 1.8, etaMin: 14 };

export const analyticsScopes = {
  colony: [
    { label: "ETA ACCURACY", value: "91%" },
    { label: "COMPLAINTS", value: "14" },
    { label: "AVG RESOLUTION", value: "3.2h" },
    { label: "MISSED PICKUPS", value: "6" },
    { label: "OVERFLOW", value: "2" },
    { label: "SEGREGATION", value: "88%" },
  ],
  ward: [
    { label: "VEHICLES", value: "24" },
    { label: "ACTIVE NOW", value: "22" },
    { label: "ROUTE COMPLETION", value: "81%" },
    { label: "WASTE COLLECTED", value: "4.2t" },
    { label: "MISSED ROUTES", value: "2" },
    { label: "COMPLAINTS", value: "31" },
  ],
  city: [
    { label: "COVERAGE", value: "96%" },
    { label: "VEHICLE UTILIZATION", value: "84%" },
    { label: "ROUTE EFFICIENCY", value: "88%" },
    { label: "CO₂ AVOIDED", value: "8.1t" },
    { label: "PROBLEM AREAS", value: "5" },
    { label: "OVERFLOW POINTS", value: "3" },
  ],
};
