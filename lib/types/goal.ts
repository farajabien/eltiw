export interface Goal {
  id: string;
  name: string;
  description?: string;
  cost: number;
  targetDate: string; // ISO date string
  category?: string;
  isCompleted: boolean;
  progress: GoalProgress[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface GoalProgress {
  id: string;
  amount: number;
  note?: string;
  date: string; // ISO date string
}

export interface GoalCalculations {
  totalSaved: number;
  remainingAmount: number;
  progressPercentage: number;
  monthsRemaining: number;
  monthlyNeeded: number;
  isOverdue: boolean;
  daysRemaining: number;
}

export interface GoalFormData {
  name: string;
  description?: string;
  cost: string | number;
  targetDate: string;
  category?: string;
}

export type GoalCategory = 
  | "savings"
  | "purchase"
  | "travel"
  | "education"
  | "health"
  | "home"
  | "technology"
  | "other";

export const GOAL_CATEGORIES: Record<GoalCategory, { label: string; emoji: string }> = {
  savings: { label: "Savings", emoji: "💰" },
  purchase: { label: "Purchase", emoji: "🛒" },
  travel: { label: "Travel", emoji: "✈️" },
  education: { label: "Education", emoji: "📚" },
  health: { label: "Health", emoji: "🏥" },
  home: { label: "Home", emoji: "🏠" },
  technology: { label: "Technology", emoji: "💻" },
  other: { label: "Other", emoji: "🎯" },
}; 