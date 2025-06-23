import { Goal } from "@/lib/types/goal";

export const sampleGoals: Goal[] = [
  {
    id: "goal-1",
    name: "Fridge",
    description: "New refrigerator for the home",
    cost: 30000,
    targetDate: "2025-06-01",
    category: "home",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-2",
    name: "Microwave",
    description: "Kitchen microwave oven",
    cost: 8000,
    targetDate: "2025-03-01",
    category: "home",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-3",
    name: "TV",
    description: "New television for entertainment",
    cost: 25000,
    targetDate: "2025-08-01",
    category: "entertainment",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-4",
    name: "Coffee Table",
    description: "Living room coffee table",
    cost: 10000,
    targetDate: "2025-04-01",
    category: "home",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-5",
    name: "Boxer shorts",
    description: "New underwear",
    cost: 2000,
    targetDate: "2025-01-15",
    category: "fashion",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-6",
    name: "Beat license uko moyoni",
    description: "Music production license",
    cost: 6000,
    targetDate: "2025-02-01",
    category: "entertainment",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-7",
    name: "Monitor",
    description: "Computer monitor for work",
    cost: 10000,
    targetDate: "2025-05-01",
    category: "technology",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-8",
    name: "New clothes",
    description: "Wardrobe refresh",
    cost: 10000,
    targetDate: "2025-03-15",
    category: "fashion",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-9",
    name: "Microphone",
    description: "Professional microphone for recording",
    cost: 5000,
    targetDate: "2025-02-15",
    category: "entertainment",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-10",
    name: "Music audio + Promo",
    description: "Music production and promotion materials",
    cost: 30000,
    targetDate: "2025-09-01",
    category: "entertainment",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-11",
    name: "Thermos",
    description: "Insulated water bottle",
    cost: 2000,
    targetDate: "2025-01-30",
    category: "home",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-12",
    name: "Powerbank",
    description: "Portable phone charger",
    cost: 2000,
    targetDate: "2025-01-30",
    category: "technology",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-13",
    name: "Tripod",
    description: "Camera/phone tripod stand",
    cost: 1000,
    targetDate: "2025-01-15",
    category: "technology",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-14",
    name: "JBL Tune 510 BT",
    description: "Wireless Bluetooth headphones",
    cost: 3000,
    targetDate: "2025-02-01",
    category: "technology",
    isCompleted: false,
    progress: [],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  },
  {
    id: "goal-15",
    name: "First car",
    description: "My first car purchase",
    cost: 500000,
    targetDate: "2026-12-01",
    category: "purchase",
    isCompleted: false,
    progress: [
      {
        id: "progress-car-1",
        amount: 37000,
        note: "Initial car savings",
        date: "2024-12-01T10:00:00.000Z"
      }
    ],
    createdAt: "2024-12-01T10:00:00.000Z",
    updatedAt: "2024-12-01T10:00:00.000Z"
  }
];

export function loadSampleGoals(): void {
  const existingGoals = localStorage.getItem("eltiw-goals");
  if (!existingGoals) {
    localStorage.setItem("eltiw-goals", JSON.stringify(sampleGoals));
  }
} 