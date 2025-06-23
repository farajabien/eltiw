"use client";

import { Goal } from "@/lib/types/goal";

interface ProgressHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal;
}

export function ProgressHistoryModal({ isOpen, onClose, goal }: ProgressHistoryModalProps) {
  if (!isOpen) return null;

  const totalSaved = goal.progress.reduce((sum, entry) => sum + entry.amount, 0);
  const sortedProgress = [...goal.progress].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-2xl mx-4 p-6 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold">Progress History</h2>
            <p className="text-sm text-muted-foreground">{goal.name}</p>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Summary */}
        <div className="bg-muted rounded-lg p-4 mb-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                ${totalSaved.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Saved</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {goal.progress.length}
              </p>
              <p className="text-sm text-muted-foreground">Entries</p>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {((totalSaved / goal.cost) * 100).toFixed(0)}%
              </p>
              <p className="text-sm text-muted-foreground">Complete</p>
            </div>
          </div>
        </div>

        {/* Progress Entries */}
        <div className="flex-1 overflow-y-auto">
          {goal.progress.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No progress entries yet.</p>
              <p className="text-sm text-muted-foreground mt-2">
                Start adding progress to see your savings journey!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {sortedProgress.map((entry) => (
                <div
                  key={entry.id}
                  className="border border-border rounded-lg p-3 bg-background hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="font-medium text-green-600 dark:text-green-400">
                          +${entry.amount.toFixed(2)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(entry.date)}
                        </p>
                      </div>
                    </div>
                    
                    {entry.note && (
                      <div className="flex-1 ml-6">
                        <p className="text-sm bg-muted rounded px-2 py-1 max-w-md">
                          {entry.note}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4 border-t border-border mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
} 