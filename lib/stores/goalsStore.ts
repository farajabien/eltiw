import { create } from "@farajabien/slug-store-react";
import { Goal, GoalProgress, GoalCategory } from "@/lib/types/goal";
import { analytics } from "@/lib/analytics";

interface GoalsState {
  // Core state
  goals: Goal[];
  filters: {
    category: GoalCategory | 'all';
    status: 'all' | 'active' | 'completed';
    search: string;
  };
  view: 'grid' | 'list';
  encryptionEnabled: boolean;
  encryptionPassword: string;
  schemaVersion: number; // Track schema version for migrations
  
  // Actions
  addGoal: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => void;
  updateGoal: (goalId: string, updates: Partial<Goal>) => void;
  deleteGoal: (goalId: string) => void;
  addProgress: (goalId: string, progress: Omit<GoalProgress, "id" | "date">) => void;
  toggleGoalCompletion: (goalId: string) => void;
  clearGoals: () => void;
  
  // Filter actions
  setCategoryFilter: (category: GoalCategory | 'all') => void;
  setStatusFilter: (status: 'all' | 'active' | 'completed') => void;
  setSearchFilter: (search: string) => void;
  setView: (view: 'grid' | 'list') => void;
  clearFilters: () => void;
  
  // Encryption actions
  enableEncryption: (password: string) => void;
  disableEncryption: () => void;
  setEncryptionPassword: (password: string) => void;
  
  // Migration actions
  migrateState: (oldState: Record<string, unknown>) => void;
  
  // Computed values (no separate calculation hook needed)
  getFilteredGoals: () => Goal[];
  getCompletedGoals: () => Goal[];
  getActiveGoals: () => Goal[];
  getTotalSaved: () => number;
  getTotalTargetAmount: () => number;
  getOverallProgress: () => number;
  getMonthlySavingsNeeded: () => number;
  getOverdueGoals: () => Goal[];
  
  // Utility functions
  getGoalById: (id: string) => Goal | undefined;
  getGoalProgress: (goalId: string) => number;
  getGoalMonthlyNeeded: (goal: Goal) => number;
  getGoalTimeRemaining: (goal: Goal) => number;
  isGoalOverdue: (goal: Goal) => boolean;
}

const CURRENT_SCHEMA_VERSION = 1;

const initialState = {
  goals: [],
  filters: {
    category: 'all' as const,
    status: 'all' as const,
    search: '',
  },
  view: 'grid' as const,
  encryptionEnabled: false,
  encryptionPassword: '',
  schemaVersion: CURRENT_SCHEMA_VERSION,
};

// Migration functions
const migrations = {
  // Migration from version 0 to 1
  0: (oldState: Record<string, unknown>) => {
    console.log('🔄 Migrating state from version 0 to 1');
    
    // Add schema version if missing
    if (!oldState.schemaVersion) {
      oldState.schemaVersion = 1;
    }
    
    // Ensure all goals have required fields
    if (oldState.goals && Array.isArray(oldState.goals)) {
      oldState.goals = (oldState.goals as Goal[]).map((goal: Goal) => ({
        ...goal,
        id: goal.id || crypto.randomUUID(),
        createdAt: goal.createdAt || new Date().toISOString(),
        updatedAt: goal.updatedAt || new Date().toISOString(),
        progress: goal.progress || [],
        isCompleted: goal.isCompleted || false,
        category: goal.category || 'other',
      }));
    }
    
    // Add missing state fields
    if (!oldState.filters) {
      oldState.filters = initialState.filters;
    }
    
    if (!oldState.view) {
      oldState.view = 'grid';
    }
    
    if (!oldState.encryptionEnabled) {
      oldState.encryptionEnabled = false;
    }
    
    if (!oldState.encryptionPassword) {
      oldState.encryptionPassword = '';
    }
    
    return oldState;
  },
  
  // Future migrations can be added here
  // 1: (oldState: Record<string, unknown>) => { ... }
  
};

export const useGoalsStore = create<GoalsState>(
  (set, get) => ({
    ...initialState,

    // Migration function
    migrateState: (oldState: Record<string, unknown>) => {
      let migratedState = { ...oldState };
      const currentVersion = (migratedState.schemaVersion as number) || 0;
      
      // Apply migrations sequentially
      for (let version = currentVersion; version < CURRENT_SCHEMA_VERSION; version++) {
        if (migrations[version as keyof typeof migrations]) {
          migratedState = migrations[version as keyof typeof migrations](migratedState);
          migratedState.schemaVersion = version + 1;
          
          console.log(`✅ Migrated state to version ${version + 1}`);
        }
      }
      
      // Set the migrated state
      set(migratedState as unknown as GoalsState);
      
      // Track migration in analytics
      if (currentVersion < CURRENT_SCHEMA_VERSION) {
        analytics.errorOccurred('state_migration', `Migrated from version ${currentVersion} to ${CURRENT_SCHEMA_VERSION}`);
      }
    },

    // Core Actions
    addGoal: (goalData) => {
      const newGoal: Goal = {
        ...goalData,
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        progress: [],
        isCompleted: false,
      };
      
      set(state => ({
        goals: [newGoal, ...state.goals],
      }));

      // Track analytics
      analytics.goalCreated({
        category: goalData.category || 'other',
        cost: goalData.cost,
        targetDate: goalData.targetDate,
      });
    },

    updateGoal: (goalId, updates) => {
      const currentGoal = get().goals.find(g => g.id === goalId);
      
      set(state => ({
        goals: state.goals.map(goal =>
          goal.id === goalId
            ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
            : goal
        ),
      }));

      // Track analytics
      if (currentGoal) {
        analytics.goalUpdated(goalId, updates);
        
        // Track completion if goal was just completed
        if (updates.isCompleted && !currentGoal.isCompleted) {
          const createdAt = new Date(currentGoal.createdAt);
          const completedAt = new Date();
          const timeToComplete = completedAt.getTime() - createdAt.getTime();
          
          analytics.goalCompleted(goalId, {
            category: currentGoal.category || 'other',
            cost: currentGoal.cost,
            timeToComplete: Math.floor(timeToComplete / (1000 * 60 * 60 * 24)), // Days
          });
        }
      }
    },

    deleteGoal: (goalId) => {
      const goalToDelete = get().goals.find(g => g.id === goalId);
      
      set(state => ({
        goals: state.goals.filter(goal => goal.id !== goalId),
      }));

      // Track analytics
      if (goalToDelete) {
        analytics.goalDeleted(goalId, {
          category: goalToDelete.category || 'other',
          cost: goalToDelete.cost,
        });
      }
    },

    addProgress: (goalId, progressData) => {
      const newProgress: GoalProgress = {
        ...progressData,
        id: crypto.randomUUID(),
        date: new Date().toISOString(),
      };

      set(state => ({
        goals: state.goals.map(goal => {
          if (goal.id === goalId) {
            const updatedProgress = [...goal.progress, newProgress];
            const totalSaved = updatedProgress.reduce((sum, p) => sum + p.amount, 0);
            const isCompleted = totalSaved >= goal.cost;
            
            return {
              ...goal,
              progress: updatedProgress,
              isCompleted,
              updatedAt: new Date().toISOString(),
            };
          }
          return goal;
        }),
      }));

      // Track analytics
      analytics.progressAdded(goalId, progressData.amount);
    },

    toggleGoalCompletion: (goalId) => {
      set(state => ({
        goals: state.goals.map(goal =>
          goal.id === goalId
            ? { ...goal, isCompleted: !goal.isCompleted, updatedAt: new Date().toISOString() }
            : goal
        ),
      }));
    },

    clearGoals: () => {
      set({ goals: [] });
    },

    // Filter Actions
    setCategoryFilter: (category) => {
      set(state => ({
        filters: { ...state.filters, category },
      }));
    },

    setStatusFilter: (status) => {
      set(state => ({
        filters: { ...state.filters, status },
      }));
    },

    setSearchFilter: (search) => {
      set(state => ({
        filters: { ...state.filters, search },
      }));
    },

    setView: (view) => {
      set({ view });
    },

    clearFilters: () => {
      set({ filters: initialState.filters });
    },

    // Encryption Actions
    enableEncryption: (password) => {
      set({
        encryptionEnabled: true,
        encryptionPassword: password,
      });
      
      // Track analytics
      analytics.encryptionEnabled();
    },

    disableEncryption: () => {
      set({
        encryptionEnabled: false,
        encryptionPassword: '',
      });
      
      // Track analytics
      analytics.encryptionDisabled();
    },

    setEncryptionPassword: (password) => {
      set({ encryptionPassword: password });
    },

    // Computed Values
    getFilteredGoals: () => {
      const { goals, filters } = get();
      return goals.filter(goal => {
        // Category filter
        if (filters.category !== 'all' && goal.category !== filters.category) {
          return false;
        }
        
        // Status filter
        if (filters.status === 'active' && goal.isCompleted) {
          return false;
        }
        if (filters.status === 'completed' && !goal.isCompleted) {
          return false;
        }
        
        // Search filter
        if (filters.search && !goal.name.toLowerCase().includes(filters.search.toLowerCase())) {
          return false;
        }
        
        return true;
      });
    },

    getCompletedGoals: () => {
      return get().goals.filter(goal => goal.isCompleted);
    },

    getActiveGoals: () => {
      return get().goals.filter(goal => !goal.isCompleted);
    },

    getTotalSaved: () => {
      return get().goals.reduce((sum, goal) => {
        const goalProgress = goal.progress.reduce((progressSum, p) => progressSum + p.amount, 0);
        return sum + goalProgress;
      }, 0);
    },

    getTotalTargetAmount: () => {
      return get().goals.reduce((sum, goal) => sum + goal.cost, 0);
    },

    getOverallProgress: () => {
      const totalSaved = get().getTotalSaved();
      const totalTarget = get().getTotalTargetAmount();
      return totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
    },

    getMonthlySavingsNeeded: () => {
      return get().getActiveGoals().reduce((sum, goal) => {
        return sum + get().getGoalMonthlyNeeded(goal);
      }, 0);
    },

    getOverdueGoals: () => {
      return get().goals.filter(goal => get().isGoalOverdue(goal));
    },

    // Utility Functions
    getGoalById: (id) => {
      return get().goals.find(goal => goal.id === id);
    },

    getGoalProgress: (goalId) => {
      const goal = get().getGoalById(goalId);
      if (!goal) return 0;
      
      const totalSaved = goal.progress.reduce((sum, p) => sum + p.amount, 0);
      return goal.cost > 0 ? (totalSaved / goal.cost) * 100 : 0;
    },

    getGoalMonthlyNeeded: (goal) => {
      if (goal.isCompleted) return 0;
      
      const monthsRemaining = get().getGoalTimeRemaining(goal);
      return monthsRemaining > 0 ? Math.ceil(goal.cost / monthsRemaining) : goal.cost;
    },

    getGoalTimeRemaining: (goal) => {
      const now = new Date();
      const targetDate = new Date(goal.targetDate);
      const diffTime = targetDate.getTime() - now.getTime();
      const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)); // Average days per month
      
      return Math.max(1, diffMonths);
    },

    isGoalOverdue: (goal) => {
      if (goal.isCompleted) return false;
      
      const now = new Date();
      const targetDate = new Date(goal.targetDate);
      return now > targetDate;
    },
  }),
  {
    key: 'goals',
    compress: process.env.NEXT_PUBLIC_ENABLE_COMPRESSION === 'true',
    debounceMs: 500,
    encrypt: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTION === 'true',
  }
); 