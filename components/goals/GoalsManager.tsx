"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types/goal";
import { GoalsList } from "@/components/goals/GoalsList";
import { AddGoalModal } from "@/components/goals/AddGoalModal";
import { ShareGoalsModal } from "@/components/goals/ShareGoalsModal";
import { EncryptionSettingsModal } from "@/components/goals/EncryptionSettingsModal";
import { useGoalsStore } from "@/lib/stores/goalsStore";

export function GoalsManager() {
  const { 
    goals, 
    addGoal, 
    updateGoal, 
    deleteGoal,
    getTotalSaved,
    getOverallProgress,
    getCompletedGoals
  } = useGoalsStore();

  const [isClient, setIsClient] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEncryptionModalOpen, setIsEncryptionModalOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleAddGoal = (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    addGoal(goalData);
    setIsAddModalOpen(false);
  };

  const handleUpdateGoal = (goalId: string, updates: Partial<Goal>) => {
    updateGoal(goalId, updates);
  };

  const handleDeleteGoal = (goalId: string) => {
    deleteGoal(goalId);
  };

  // Calculate stats
  const totalGoals = goals.length;
  const completedGoals = getCompletedGoals().length;
  const totalSaved = getTotalSaved();
  const overallProgress = getOverallProgress();

  if (!isClient) {
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
      {goals.length > 0 && (
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
              onClick={() => setIsShareModalOpen(true)}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              <span className="mr-2">🔗</span>
              Share
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

      <GoalsList
        goals={goals}
        onUpdateGoal={handleUpdateGoal}
        onDeleteGoal={handleDeleteGoal}
      />

      {/* Modals */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGoal={handleAddGoal}
      />

      <ShareGoalsModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={window.location.href}
        goalCount={goals.length}
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