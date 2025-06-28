import { Goal } from "@/lib/types/goal";

export const sampleGoals: Goal[] = [
  {
    id: "sample-1",
    name: "iPhone 15 Pro",
    description: "Upgrade to the latest iPhone for better photos and productivity",
    cost: 150000,
    targetDate: "2025-06-15",
    category: "technology",
    progress: [
      {
        id: "p1-1",
        amount: 30000,
        note: "Initial savings from January",
        date: "2025-01-15T10:30:00.000Z",
      },
      {
        id: "p1-2",
        amount: 25000,
        note: "February savings",
        date: "2025-02-20T14:15:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-02-20T14:15:00.000Z",
  },
  {
    id: "sample-2",
    name: "Mombasa Beach Holiday",
    description: "5-day family vacation to Diani Beach",
    cost: 80000,
    targetDate: "2025-07-20",
    category: "travel",
    progress: [
      {
        id: "p2-1",
        amount: 20000,
        note: "Hotel booking deposit",
        date: "2025-02-10T09:00:00.000Z",
      },
      {
        id: "p2-2",
        amount: 15000,
        note: "Transport and activities fund",
        date: "2025-02-25T16:45:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-15T00:00:00.000Z",
    updatedAt: "2025-02-25T16:45:00.000Z",
  },
  {
    id: "sample-3",
    name: "Emergency Fund",
    description: "Build 6-month emergency fund for financial security",
    cost: 180000,
    targetDate: "2025-12-31",
    category: "savings",
    progress: [
      {
        id: "p3-1",
        amount: 30000,
        note: "January contribution",
        date: "2025-01-28T11:20:00.000Z",
      },
      {
        id: "p3-2",
        amount: 30000,
        note: "February contribution",
        date: "2025-02-28T11:20:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-02-28T11:20:00.000Z",
  },
  {
    id: "sample-4",
    name: "Laptop for Studies",
    description: "Dell XPS for university coursework and projects",
    cost: 120000,
    targetDate: "2025-08-30",
    category: "education",
    progress: [
      {
        id: "p4-1",
        amount: 40000,
        note: "Part-time job savings",
        date: "2025-01-20T13:30:00.000Z",
      },
      {
        id: "p4-2",
        amount: 30000,
        note: "Birthday money",
        date: "2025-02-15T10:15:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-10T00:00:00.000Z",
    updatedAt: "2025-02-15T10:15:00.000Z",
  },
  {
    id: "sample-5",
    name: "Driving License",
    description: "Complete driving lessons and get license",
    cost: 35000,
    targetDate: "2025-05-31",
    category: "other",
    progress: [
      {
        id: "p5-1",
        amount: 15000,
        note: "Driving school registration",
        date: "2025-02-01T15:45:00.000Z",
      },
      {
        id: "p5-2",
        amount: 20000,
        note: "Completed all lessons + test fees",
        date: "2025-02-20T10:30:00.000Z",
      },
    ],
    isCompleted: true,
    createdAt: "2025-01-15T00:00:00.000Z",
    updatedAt: "2025-02-20T10:30:00.000Z",
  },
  {
    id: "sample-6",
    name: "New Mattress & Bedding",
    description: "Quality mattress and comfortable bedding set",
    cost: 45000,
    targetDate: "2025-04-30",
    category: "home",
    progress: [
      {
        id: "p6-1",
        amount: 20000,
        note: "First installment",
        date: "2025-01-05T08:30:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-05T08:30:00.000Z",
  },
  {
    id: "sample-7",
    name: "Gym Membership Annual",
    description: "Full year membership at premium gym",
    cost: 24000,
    targetDate: "2025-03-31",
    category: "health",
    progress: [
      {
        id: "p7-1",
        amount: 12000,
        note: "6-month payment",
        date: "2025-01-10T09:15:00.000Z",
      },
      {
        id: "p7-2",
        amount: 12000,
        note: "Completed full payment!",
        date: "2025-02-28T17:30:00.000Z",
      },
    ],
    isCompleted: true,
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-02-28T17:30:00.000Z",
  },
  {
    id: "sample-8",
    name: "Christmas Gifts Budget",
    description: "Save for family and friends Christmas presents",
    cost: 50000,
    targetDate: "2025-12-20",
    category: "other",
    progress: [
      {
        id: "p8-1",
        amount: 8000,
        note: "Early start - February",
        date: "2025-02-28T20:00:00.000Z",
      },
    ],
    isCompleted: false,
    createdAt: "2025-02-01T00:00:00.000Z",
    updatedAt: "2025-02-28T20:00:00.000Z",
  },
];

export function loadSampleGoals(): void {
  const existingGoals = localStorage.getItem("eltiw-goals");
  if (!existingGoals) {
    localStorage.setItem("eltiw-goals", JSON.stringify(sampleGoals));
  }
} 