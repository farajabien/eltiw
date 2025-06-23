"use client";

import { useState } from "react";
import { Goal, GoalCategory } from "@/lib/types/goal";
import { GoalsList } from "@/components/goals/GoalsList";
import { AddGoalModal } from "@/components/goals/AddGoalModal";
import { ShareGoalsModal } from "@/components/goals/ShareGoalsModal";
import { EncryptionSettingsModal } from "@/components/goals/EncryptionSettingsModal";
import { useGoalsStore } from "@/lib/stores/goalsStore";

export function GoalsManager() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isEncryptionModalOpen, setIsEncryptionModalOpen] = useState(false);
  
  // Use the new comprehensive Slug Store - everything comes from here!
  const {
    goals,
    filters,
    encryptionEnabled,
    addGoal,
    updateGoal,
    deleteGoal,
    getFilteredGoals,
    getCompletedGoals,
    getTotalSaved,
    getOverallProgress,
    getMonthlySavingsNeeded,
    getOverdueGoals,
    setCategoryFilter,
    setStatusFilter,
    setSearchFilter,
    clearFilters,
  } = useGoalsStore();

  const handleAddGoal = (goalData: Omit<Goal, "id" | "createdAt" | "updatedAt">) => {
    addGoal(goalData);
    setIsAddModalOpen(false);
  };

  const filteredGoals = getFilteredGoals();
  const completedGoals = getCompletedGoals();
  const totalSaved = getTotalSaved();
  const overallProgress = getOverallProgress();
  const monthlyNeeded = getMonthlySavingsNeeded();
  const overdueGoals = getOverdueGoals();

  return (
    <div className="space-y-6">
      {/* URL State Notification - Slug Store handles this automatically */}
      {goals.length > 0 && (
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-600 dark:text-blue-400">🔗</span>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Goals automatically saved to URL!</strong> Powered by Slug Store technology - 
              no database required, everything compressed and shareable.
              {encryptionEnabled && (
                <span className="ml-2 text-green-600 dark:text-green-400">
                  🔒 Encrypted for privacy
                </span>
              )}
            </p>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold">
            {goals.length === 0 ? "No goals yet" : `${goals.length} goal${goals.length === 1 ? "" : "s"}`}
          </h2>
          {goals.length > 0 && (
            <div className="text-sm text-muted-foreground">
              {completedGoals.length} completed
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          {goals.length > 0 && (
            <>
              <button
                onClick={() => setIsEncryptionModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <span className="mr-2">{encryptionEnabled ? '🔒' : '🔓'}</span>
                {encryptionEnabled ? 'Encrypted' : 'Security'}
              </button>
              
              <button
                onClick={() => setIsShareModalOpen(true)}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                <span className="mr-2">🔗</span>
                Share Goals
              </button>
            </>
          )}
          
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
          >
            <span className="mr-2">+</span>
            Add New Goal
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      {goals.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">${totalSaved.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Total Saved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{overallProgress.toFixed(0)}%</div>
            <div className="text-sm text-muted-foreground">Overall Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">${monthlyNeeded.toFixed(0)}</div>
            <div className="text-sm text-muted-foreground">Monthly Needed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">{overdueGoals.length}</div>
            <div className="text-sm text-muted-foreground">Overdue Goals</div>
          </div>
        </div>
      )}

      {/* Filters */}
      {goals.length > 0 && (
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={filters.category}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setCategoryFilter(e.target.value as GoalCategory)}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="home">Home</option>
            <option value="travel">Travel</option>
            <option value="education">Education</option>
            <option value="health">Health</option>
            <option value="entertainment">Entertainment</option>
            <option value="fashion">Fashion</option>
            <option value="other">Other</option>
          </select>
          
          <select
            value={filters.status}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setStatusFilter(e.target.value as "all" | "active" | "completed")}
            className="px-3 py-1 border rounded-md text-sm"
          >
            <option value="all">All Goals</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          
          <input
            type="text"
            placeholder="Search goals..."
            value={filters.search}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="px-3 py-1 border rounded-md text-sm flex-1 max-w-xs"
          />
          
          <button
            onClick={clearFilters}
            className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        </div>
      )}

      {/* Goals List */}
      <GoalsList 
        goals={filteredGoals} 
        onUpdateGoal={updateGoal}
        onDeleteGoal={deleteGoal}
      />

      {/* Empty State */}
      {goals.length === 0 && (
        <div className="text-center py-16">
          <div className="max-w-lg mx-auto space-y-6">
            <div className="text-6xl mb-4">🎯</div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">Start Your Journey</h3>
              <p className="text-muted-foreground text-lg">
                Transform your dreams into achievable goals with smart planning and progress tracking.
              </p>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl h-12 px-8"
            >
              <span className="mr-2">✨</span>
              Add Your First Goal
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 text-sm">
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl mb-2">📊</div>
                <h4 className="font-medium mb-1">Smart Planning</h4>
                <p className="text-muted-foreground">Automatic monthly savings calculations based on your deadline</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl mb-2">📈</div>
                <h4 className="font-medium mb-1">Track Progress</h4>
                <p className="text-muted-foreground">Visual progress bars and detailed savings history</p>
              </div>
              <div className="bg-muted rounded-lg p-4">
                <div className="text-2xl mb-2">🎉</div>
                <h4 className="font-medium mb-1">Celebrate Wins</h4>
                <p className="text-muted-foreground">Mark goals as complete and track your achievements</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Goal Modal */}
      <AddGoalModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGoal={handleAddGoal}
      />

      {/* Share Goals Modal */}
      <ShareGoalsModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareUrl={window.location.href}
        goalCount={goals.length}
      />

      {/* Encryption Settings Modal */}
      <EncryptionSettingsModal
        isOpen={isEncryptionModalOpen}
        onClose={() => setIsEncryptionModalOpen(false)}
      />
    </div>
  );
} 