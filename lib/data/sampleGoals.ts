import { Goal } from "@/lib/types/goal";

export const sampleGoals: Goal[] = [
  {
    id: "sample-1",
    name: "MacBook Pro M3",
    description: "Upgrade to the latest MacBook Pro for better development workflow",
    cost: 250000,
    targetDate: "2025-12-31",
    category: "electronics",
    progress: [
      {
        id: "p1-1",
        amount: 50000,
        note: "Initial savings",
        date: "2025-01-15T10:30:00.000Z",
      },
      {
        id: "p1-2",
        amount: 75000,
        note: "March bonus",
        date: "2025-03-20T14:15:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-03-20T14:15:00.000Z",
  },
  {
    id: "sample-2",
    name: "Europe Vacation",
    description: "2-week trip to Italy, France, and Spain",
    cost: 450000,
    targetDate: "2025-06-15",
    category: "travel",
    progress: [
      {
        id: "p2-1",
        amount: 100000,
        note: "Flight tickets booked",
        date: "2025-02-10T09:00:00.000Z",
      },
      {
        id: "p2-2",
        amount: 50000,
        note: "Hotel deposits",
        date: "2025-03-05T16:45:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-15T00:00:00.000Z",
    updatedAt: "2025-03-05T16:45:00.000Z",
  },
  {
    id: "sample-3",
    name: "Home Gym Setup",
    description: "Complete home gym with weights, bench, and cardio equipment",
    cost: 120000,
    targetDate: "2025-08-30",
    category: "health",
    progress: [
      {
        id: "p3-1",
        amount: 30000,
        note: "Dumbbells and bench",
        date: "2025-02-28T11:20:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-02-01T00:00:00.000Z",
    updatedAt: "2025-02-28T11:20:00.000Z",
  },
  {
    id: "sample-4",
    name: "Online Course Bundle",
    description: "Complete web development and AI courses",
    cost: 35000,
    targetDate: "2025-05-31",
    category: "education",
    progress: [
      {
        id: "p4-1",
        amount: 15000,
        note: "React course",
        date: "2025-01-20T13:30:00.000Z",
      },
      {
        id: "p4-2",
        amount: 20000,
        note: "AI/ML course",
        date: "2025-03-10T10:15:00.000Z",
      },
    ],
    isCompleted: true,
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-03-10T10:15:00.000Z",
  },
  {
    id: "sample-5",
    name: "Gaming Setup",
    description: "High-end gaming PC with monitor and accessories",
    cost: 180000,
    targetDate: "2025-11-30",
    category: "entertainment",
    progress: [
      {
        id: "p5-1",
        amount: 60000,
        note: "Graphics card",
        date: "2025-02-15T15:45:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-02-01T00:00:00.000Z",
    updatedAt: "2025-02-15T15:45:00.000Z",
  },
  {
    id: "sample-6",
    name: "Kitchen Renovation",
    description: "Modern kitchen with new appliances and countertops",
    cost: 800000,
    targetDate: "2025-03-31",
    category: "home",
    progress: [
      {
        id: "p6-1",
        amount: 100000,
        note: "Initial deposit",
        date: "2025-01-05T08:30:00.000Z",
      },
      {
        id: "p6-2",
        amount: 150000,
        note: "Appliances ordered",
        date: "2025-03-01T12:00:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-03-01T12:00:00.000Z",
  },
];

export function loadSampleGoals(): void {
  const existingGoals = localStorage.getItem("eltiw-goals");
  if (!existingGoals) {
    localStorage.setItem("eltiw-goals", JSON.stringify(sampleGoals));
  }
} 