"use client";

import { Goal } from "@/lib/types/goal";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal;
  onConfirm: () => void;
}

export function DeleteConfirmModal({ isOpen, onClose, goal, onConfirm }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400">Delete Goal</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <p className="text-muted-foreground">
            Are you sure you want to delete <strong>&quot;{goal.name}&quot;</strong>?
          </p>
          
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-200">
              <strong>This action cannot be undone.</strong> All progress data for this goal will be permanently deleted.
            </p>
          </div>

          {goal.progress.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-3">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                This goal has <strong>{goal.progress.length} progress entries</strong> totaling{" "}
                <strong>${goal.progress.reduce((sum, entry) => sum + entry.amount, 0).toFixed(2)}</strong> saved.
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Delete Goal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 