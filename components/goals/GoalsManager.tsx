"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types/goal";
import { GoalsList } from "@/components/goals/GoalsList";
import { AddGoalModal } from "@/components/goals/AddGoalModal";
import { ShareGoalsModal } from "@/components/goals/ShareGoalsModal";
import { EncryptionSettingsModal } from "@/components/goals/EncryptionSettingsModal";
import { SearchInput } from "@/components/SearchInput";
import { useSlugStore, copySlug, shareSlug } from "@farajabien/slug-store";
import { toast } from "sonner";

// Goals state interface
interface GoalsState {
  goals: Goal[];
  searchQuery: string;
}

// Default initial state
const defaultGoalsState: GoalsState = {
  goals: [],
  searchQuery: "",
};

export function GoalsManager() {
  const [state, setState, { isLoading, slug }] = useSlugStore<GoalsState>(
    'goals',
    defaultGoalsState,
    {
      url: true,
      compress: process.env.NEXT_PUBLIC_ENABLE_COMPRESSION === 'true',
      encrypt: process.env.NEXT_PUBLIC_ENABLE_ENCRYPTION === 'true',
      password: process.env.NEXT_PUBLIC_ENCRYPTION_PASSWORD,
      offline: {
        storage: 'indexeddb',
        ttl: 30 * 24 * 60 * 60 * 1000, // 30 days
      }
    }
  );

  const [isClient, setIsClient] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEncryptionModalOpen, setIsEncryptionModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Goal actions
  const addGoal = (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    const goal: Goal = {
      ...goalData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      progress: [],
      isCompleted: false,
    };
    setState(prevState => ({
      ...prevState,
      goals: [goal, ...prevState.goals]
    }));
    setIsAddModalOpen(false);
    toast.success("Goal added successfully!");
  };

  const updateGoal = (goalId: string, updates: Partial<Goal>) => {
    setState(prevState => ({
      ...prevState,
      goals: prevState.goals.map((goal) =>
        goal.id === goalId
          ? { ...goal, ...updates, updatedAt: new Date().toISOString() }
          : goal
      ),
    }));
    toast.success("Goal updated successfully!");
  };

  const deleteGoal = (goalId: string) => {
    setState(prevState => ({
      ...prevState,
      goals: prevState.goals.filter((goal) => goal.id !== goalId),
    }));
    toast.success("Goal deleted successfully!");
  };

  const addProgress = (goalId: string, amount: number, note?: string) => {
    setState(prevState => ({
      ...prevState,
      goals: prevState.goals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              progress: [
                ...goal.progress,
                {
                  id: crypto.randomUUID(),
                  amount,
                  note,
                  date: new Date().toISOString(),
                },
              ],
              updatedAt: new Date().toISOString(),
            }
          : goal
      ),
    }));
    toast.success("Progress added successfully!");
  };

  // Search functionality
  const setSearchQuery = (query: string) => {
    setState(prevState => ({
      ...prevState,
      searchQuery: query
    }));
  };

  // Wrapper function for GoalsList onEdit prop
  const handleEditGoal = (updatedGoal: Goal) => {
    updateGoal(updatedGoal.id, updatedGoal);
  };

  // Computed values
  const getTotalSaved = (): number => {
    return state.goals.reduce((total, goal) =>
      total + goal.progress.reduce((sum, p) => sum + p.amount, 0), 0
    );
  };

  const getTotalTargetAmount = (): number => {
    return state.goals.reduce((sum, goal) => sum + goal.cost, 0);
  };

  const getOverallProgress = (): number => {
    const totalSaved = getTotalSaved();
    const totalTargetAmount = getTotalTargetAmount();
    return totalTargetAmount > 0 ? (totalSaved / totalTargetAmount) * 100 : 0;
  };

  const getCompletedGoals = (): Goal[] => {
    return state.goals.filter((g) => g.isCompleted);
  };

  // Handle sharing with new slug-store dev tools
  const handleCopyURL = async () => {
    try {
      await copySlug();
      toast.success("Goals URL copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy URL");
      console.error('Copy failed:', err);
    }
  };

  const handleShare = async () => {
    try {
      const goalCount = state.goals.length;
      const completedCount = getCompletedGoals().length;
      const totalSaved = getTotalSaved();
      
      await shareSlug(
        `My ELTIW Goals (${completedCount}/${goalCount} completed)`,
        `Check out my goal tracking progress! I've saved $${totalSaved.toLocaleString()} toward my goals. 🎯`
      );
    } catch {
      // Fallback to copy if native share is not available
      await handleCopyURL();
    }
  };

  // Calculate stats
  const totalGoals = state.goals.length;
  const completedGoals = getCompletedGoals().length;
  const totalSaved = getTotalSaved();
  const overallProgress = getOverallProgress();

  if (isLoading || !isClient) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-card p-4 rounded-lg shadow animate-pulse">
              <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 animate-pulse">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-1"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-1 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="flex gap-1 mt-3">
                  <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-12"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {state.goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard title="Total Goals" value={totalGoals} />
          <StatCard title="Completed" value={`${completedGoals} / ${totalGoals}`} />
          <StatCard
            title="Amount Saved"
            value={`$${totalSaved.toLocaleString()}`}
          />
          <StatCard title="Overall Progress" value={`${overallProgress.toFixed(1)}%`} />
        </div>
      )}

      <div className="mb-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Goals
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Track your financial goals and progress
            </p>
            {slug && (
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                🔗 Shareable URL generated
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
            >
              <span className="mr-2">+</span>
              Add Goal
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <span className="mr-2">📱</span>
              Share
            </button>
            <button
              onClick={handleCopyURL}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <span className="mr-2">📋</span>
              Copy URL
            </button>
            <button
              onClick={() => setIsEncryptionModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <span className="mr-2">🔒</span>
              Security
            </button>
          </div>
        </div>
      </div>

      {/* Search Input */}
      <div className="mb-6">
        <SearchInput
          searchQuery={state.searchQuery}
          setSearchQuery={setSearchQuery}
          placeholder="Search your goals..."
        />
      </div>

      <GoalsList
        goals={state.goals}
        onEdit={handleEditGoal}
        onDelete={deleteGoal}
        onAddProgress={addProgress}
      />

      {/* Modals */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGoal={addGoal}
      />

      <ShareGoalsModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={slug || window.location.href}
        goalCount={state.goals.length}
      />

      <EncryptionSettingsModal
        isOpen={isEncryptionModalOpen}
        onClose={() => setIsEncryptionModalOpen(false)}
      />
    </div>
  );
}

const StatCard = ({ title, value }: { title: string; value: string | number }) => (
  <div className="bg-card p-4 rounded-lg shadow">
    <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
); 