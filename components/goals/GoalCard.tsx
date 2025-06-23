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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddProgress = async (progressData: GoalProgress) => {
    setIsLoading(true);
    try {
      addProgress(goal.id, {
        amount: progressData.amount,
        note: progressData.note,
      });
      setIsAddProgressOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleCompletion = async () => {
    setIsLoading(true);
    try {
      toggleGoalCompletion(goal.id);
    } finally {
      setIsLoading(false);
    }
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
      return <span className="text-green-600 text-xs">✅</span>;
    }
    if (isOverdue) {
      return <span className="text-red-600 text-xs">⚠️</span>;
    }
    return <span className="text-blue-600 text-xs">📈</span>;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
      <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] ${
        goal.isCompleted ? 'border-green-200 dark:border-green-800' : 
        isOverdue ? 'border-red-200 dark:border-red-800' : 'border-gray-200 dark:border-gray-700'
      } ${isLoading ? 'opacity-75 pointer-events-none' : ''}`}>
        {/* Compact Header */}
        <div className="p-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-lg">{getCategoryIcon(goal.category)}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {goal.name}
                </h3>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{formatCurrency(goal.cost)}</span>
                  <span>•</span>
                  <span>{new Date(goal.targetDate).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {getStatusBadge()}
              <button
                onClick={handleToggleCompletion}
                disabled={isLoading}
                className={`p-1 rounded-full transition-all duration-200 hover:scale-110 ${
                  goal.isCompleted 
                    ? 'text-green-600 hover:bg-green-100' 
                    : 'text-gray-400 hover:bg-gray-100'
                } ${isLoading ? 'opacity-50' : ''}`}
              >
                {goal.isCompleted ? '✅' : '⭕'}
              </button>
            </div>
          </div>
        </div>

        {/* Compact Content */}
        <div className="p-3 space-y-3">
          {/* Progress Section */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-300">
                {formatCurrency(totalSaved)} / {formatCurrency(goal.cost)}
              </span>
              <span className="font-medium text-gray-900 dark:text-white">
                {progress.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <div
                className={`h-1.5 rounded-full transition-all duration-500 ease-out ${getProgressColor()}`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              />
            </div>
          </div>

          {/* Quick Info */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Monthly: {formatCurrency(monthlyNeeded)}</span>
            <span>{monthsRemaining}m left</span>
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              History
            </button>
          </div>

          {/* Compact Actions */}
          <div className="flex gap-1">
            <button
              onClick={() => setIsAddProgressOpen(true)}
              disabled={isLoading}
              className="flex-1 px-2 py-1.5 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              + Progress
            </button>
            <button
              onClick={() => setIsEditOpen(true)}
              disabled={isLoading}
              className="px-2 py-1.5 border border-gray-300 text-gray-700 text-xs rounded hover:bg-gray-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Edit
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              disabled={isLoading}
              className="px-2 py-1.5 border border-red-300 text-red-700 text-xs rounded hover:bg-red-50 transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Del
            </button>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 dark:bg-gray-800/50 rounded-lg flex items-center justify-center">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          </div>
        )}
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