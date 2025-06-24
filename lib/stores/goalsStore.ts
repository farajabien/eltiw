import { create } from "@farajabien/slug-store-react";
import { Goal, GoalProgress } from "@/lib/types/goal";

// 1. Define the state that will be persisted in the URL
interface GoalsState {
  goals: Goal[];
  searchQuery: string;
}

// 2. Define the store with actions and computed values
interface GoalsStore extends GoalsState {
  // Actions
  addGoal: (newGoal: Omit<Goal, "id" | "createdAt" | "updatedAt" | "progress" | "isCompleted">) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  addProgress: (goalId: string, progress: Omit<GoalProgress, "id" | "date">) => void;
  toggleGoalCompletion: (goalId: string) => void;
  setSearchQuery: (query: string) => void;
  
  // Computed values (selectors)
  getGoalById: (goalId: string) => Goal | undefined;
  getGoalProgress: (goalId: string) => number;
  getTotalSaved: () => number;
  getTotalTargetAmount: () => number;
  getOverallProgress: () => number;
  getCompletedGoals: () => Goal[];
  getGoalTimeRemaining: (goal: Goal) => number;
  getGoalMonthlyNeeded: (goal: Goal) => number;
  isGoalOverdue: (goal: Goal) => boolean;
}

// 3. Create the store
export const useGoalsStore = create<GoalsStore>(
  (set, get) => ({
    // Initial state (this gets persisted)
    goals: [],
    searchQuery: "",
    
    // Actions
    addGoal: (newGoal) =>
      set((state) => {
        const goal: Goal = {
          ...newGoal,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: [],
          isCompleted: false,
        };
        return { goals: [goal, ...state.goals] };
      }),
      
    updateGoal: (goalId, updates) =>
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === goalId
            ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
            : goal
        ),
      })),
      
    deleteGoal: (goalId) =>
      set((state) => ({
        goals: state.goals.filter((goal) => goal.id !== goalId),
      })),
      
    addProgress: (goalId, progressData) =>
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === goalId
            ? {
                ...goal,
                progress: [
                  ...goal.progress,
                  {
                    ...progressData,
                    id: crypto.randomUUID(),
                    date: new Date().toISOString(),
                  },
                ],
                updatedAt: new Date().toISOString(),
              }
            : goal
        ),
      })),
      
    toggleGoalCompletion: (goalId) =>
      set((state) => ({
        goals: state.goals.map((goal) =>
          goal.id === goalId
            ? { ...goal, isCompleted: !goal.isCompleted, updatedAt: new Date().toISOString() }
            : goal
        ),
      })),
      
    setSearchQuery: (query) => set({ searchQuery: query }),
    
    // Computed values (selectors)
    getGoalById: (goalId) => get().goals.find((g) => g.id === goalId),
    
    getGoalProgress: (goalId) => {
      const goal = get().getGoalById(goalId);
      if (!goal) return 0;
      const totalSaved = goal.progress.reduce((sum, p) => sum + p.amount, 0);
      return goal.cost > 0 ? (totalSaved / goal.cost) * 100 : 0;
    },
    
    getTotalSaved: () =>
      get().goals.reduce((total, goal) =>
        total + goal.progress.reduce((sum, p) => sum + p.amount, 0), 0
      ),
      
    getTotalTargetAmount: () =>
      get().goals.reduce((sum, goal) => sum + goal.cost, 0),
      
    getOverallProgress: () => {
      const totalSaved = get().getTotalSaved();
      const totalTargetAmount = get().getTotalTargetAmount();
      return totalTargetAmount > 0 ? (totalSaved / totalTargetAmount) * 100 : 0;
    },
    
    getCompletedGoals: () => get().goals.filter((g) => g.isCompleted),
    
    getGoalTimeRemaining: (goal) => {
      if (goal.isCompleted) return 0;
      const now = new Date();
      const targetDate = new Date(goal.targetDate);
      if (now >= targetDate) return 0;
      const diffTime = targetDate.getTime() - now.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44));
    },
    
    getGoalMonthlyNeeded: (goal) => {
      if (goal.isCompleted) return 0;
      const remainingAmount =
        goal.cost -
        goal.progress.reduce((sum, p) => sum + p.amount, 0);
      const monthsRemaining = get().getGoalTimeRemaining(goal);
      return monthsRemaining > 0 ? remainingAmount / monthsRemaining : remainingAmount;
    },
    
    isGoalOverdue: (goal) => {
      if (goal.isCompleted) return false;
      return new Date() > new Date(goal.targetDate);
    },
  }),
  {
    key: 'goals',
    compress: process.env.NEXT_PUBLIC_ENABLE_COMPRESSION === 'true',
    debounceMs: 500,
    encrypt: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTION === 'true',
  }
);

// 4. Export utility functions for external use
export const getGoalCalculations = (goal: Goal) => {
  const totalSaved = goal.progress.reduce((sum, p) => sum + p.amount, 0);
  const progress = goal.cost > 0 ? (totalSaved / goal.cost) * 100 : 0;
  
  const now = new Date();
  const targetDate = new Date(goal.targetDate);
  const isOverdue = !goal.isCompleted && now > targetDate;
  
  const timeDiff = targetDate.getTime() - now.getTime();
  const monthsRemaining = Math.max(0, Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 30.44)));
  
  const remainingAmount = Math.max(0, goal.cost - totalSaved);
  const monthlyNeeded = monthsRemaining > 0 ? remainingAmount / monthsRemaining : remainingAmount;

  return {
    totalSaved,
    progress,
    isOverdue,
    monthsRemaining,
    monthlyNeeded,
    remainingAmount,
  };
};

export const selectOverallStats = (state: GoalsStore) => {
  const { goals } = state;

  const totalGoals = goals.length;
  const completedGoals = goals.filter(g => g.isCompleted).length;
  const totalTargetAmount = goals.reduce((sum, goal) => sum + goal.cost, 0);
  const totalSaved = goals.reduce((sum, goal) => sum + goal.progress.reduce((pSum, p) => pSum + p.amount, 0), 0);
  const overallProgress = totalTargetAmount > 0 ? (totalSaved / totalTargetAmount) * 100 : 0;

  return {
    totalGoals,
    completedGoals,
    totalTargetAmount,
    totalSaved,
    overallProgress,
  };
}; 