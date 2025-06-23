"use client";

import { useState } from "react";
import { Goal, GoalProgress } from "@/lib/types/goal";
import { AddProgressModal } from "./AddProgressModal";
import { EditGoalModal } from "./EditGoalModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { ProgressHistoryModal } from "./ProgressHistoryModal";
import { useGoalsStore } from "@/lib/stores/goalsStore";

interface GoalCardProps {
  goal: Goal;
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function GoalCard({ goal, onUpdateGoal, onDeleteGoal }: GoalCardProps) {
  const [isAddProgressOpen, setIsAddProgressOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Use Slug Store for all calculations
  const {
    getGoalProgress,
    getGoalMonthlyNeeded,
    getGoalTimeRemaining,
    isGoalOverdue,
    addProgress,
    toggleGoalCompletion,
  } = useGoalsStore();

  const progress = getGoalProgress(goal.id);
  const monthlyNeeded = getGoalMonthlyNeeded(goal);
  const monthsRemaining = getGoalTimeRemaining(goal);
  const isOverdue = isGoalOverdue(goal);
  const totalSaved = goal.progress.reduce((sum, p) => sum + p.amount, 0);

  const handleAddProgress = (progressData: GoalProgress) => {
    addProgress(goal.id, {
      amount: progressData.amount,
      note: progressData.note,
    });
    setIsAddProgressOpen(false);
  };

  const handleToggleCompletion = () => {
    toggleGoalCompletion(goal.id);
  };

  const getCategoryIcon = (category: string | undefined) => {
    const icons: Record<string, string> = {
      electronics: "💻",
      home: "🏠",
      travel: "✈️",
      education: "📚",
      health: "🏥",
      entertainment: "🎮",
      fashion: "👕",
      other: "📦",
    };
    return category ? icons[category] || "📦" : "📦";
  };

  const getProgressColor = () => {
    if (goal.isCompleted) return "bg-green-500";
    if (progress >= 75) return "bg-green-400";
    if (progress >= 50) return "bg-yellow-400";
    if (progress >= 25) return "bg-orange-400";
    return "bg-red-400";
  };

  const getStatusBadge = () => {
    if (goal.isCompleted) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
          ✅ Completed
        </span>
      );
    }
    if (isOverdue) {
      return (
        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
          ⚠️ Overdue
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        📈 In Progress
      </span>
    );
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border transition-all duration-200 hover:shadow-lg ${
        goal.isCompleted ? 'border-green-200 dark:border-green-800' : 
        isOverdue ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-gray-700'
      }`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {goal.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {goal.category}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {getStatusBadge()}
              <button
                onClick={handleToggleCompletion}
                className={`p-1 rounded-full transition-colors ${
                  goal.isCompleted 
                    ? 'text-green-600 hover:bg-green-100' 
                    : 'text-gray-400 hover:bg-gray-100'
                }`}
              >
                {goal.isCompleted ? '✅' : '⭕'}
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Financial Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Target Cost</p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white">
                ${goal.cost.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Saved</p>
              <p className="text-lg font-semibold text-green-600">
                ${totalSaved.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-300">Progress</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${getProgressColor()}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="text-xs text-blue-600 hover:text-blue-800 mt-1"
            >
              View History
            </button>
          </div>

          {/* Time and Monthly Info */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Deadline</p>
              <p className={`text-sm font-medium ${
                isOverdue ? 'text-red-600' : 'text-gray-900 dark:text-white'
              }`}>
                {new Date(goal.targetDate).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {monthsRemaining} month{monthsRemaining !== 1 ? 's' : ''} remaining
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Monthly Needed</p>
              <p className="text-sm font-semibold text-blue-600">
                ${monthlyNeeded.toFixed(0)}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => setIsAddProgressOpen(true)}
              className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Progress
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="px-3 py-2 border border-red-300 text-red-700 text-sm rounded-md hover:bg-red-50 transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AddProgressModal
        isOpen={isAddProgressOpen}
        onClose={() => setIsAddProgressOpen(false)}
        goal={goal}
        onAddProgress={handleAddProgress}
      />

      <EditGoalModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        goal={goal}
        onUpdateGoal={(updates) => {
          onUpdateGoal(goal.id, updates);
          setIsEditOpen(false);
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        goal={goal}
        onConfirm={() => {
          onDeleteGoal(goal.id);
          setIsDeleteOpen(false);
        }}
      />

      <ProgressHistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        goal={goal}
      />
    </>
  );
} 