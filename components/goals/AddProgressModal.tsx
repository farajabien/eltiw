"use client";

import { useState } from "react";
import { Goal, GoalProgress } from "@/lib/types/goal";

interface AddProgressModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: Goal;
  onAddProgress: (progress: GoalProgress) => void;
}

export function AddProgressModal({ isOpen, onClose, goal, onAddProgress }: AddProgressModalProps) {
  const [formData, setFormData] = useState({
    amount: "",
    note: "",
  });

  const [errors, setErrors] = useState<{
    amount?: string;
  }>({});

  const validateForm = (): boolean => {
    const newErrors: { amount?: string } = {};

    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = "Please enter a valid amount greater than 0";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newProgress: GoalProgress = {
      id: crypto.randomUUID(),
      amount: parseFloat(formData.amount),
      note: formData.note.trim() || undefined,
      date: new Date().toISOString(),
    };

    onAddProgress(newProgress);
    
    // Reset form
    setFormData({
      amount: "",
      note: "",
    });
    setErrors({});
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  const totalSaved = goal.progress.reduce((sum, entry) => sum + entry.amount, 0);
  const remainingAmount = Math.max(0, goal.cost - totalSaved);

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
          <h2 className="text-xl font-semibold">Add Progress</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Goal Info */}
        <div className="bg-muted rounded-lg p-3 mb-4">
          <h3 className="font-medium">{goal.name}</h3>
          <div className="text-sm text-muted-foreground mt-1">
            <div>Target: ${goal.cost.toFixed(2)}</div>
            <div>Saved: ${totalSaved.toFixed(2)}</div>
            <div>Remaining: ${remainingAmount.toFixed(2)}</div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium mb-1">
              Amount Saved *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-muted-foreground">$</span>
              <input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            {errors.amount && <p className="text-sm text-red-500 mt-1">{errors.amount}</p>}
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-medium mb-1">
              Note (optional)
            </label>
            <textarea
              id="note"
              value={formData.note}
              onChange={(e) => handleInputChange("note", e.target.value)}
              placeholder="e.g., Salary bonus, side project income..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          {/* Quick Amount Buttons */}
          <div>
            <p className="text-sm font-medium mb-2">Quick amounts:</p>
            <div className="grid grid-cols-3 gap-2">
              {[50, 100, 200].map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => handleInputChange("amount", amount.toString())}
                  className="px-3 py-2 text-sm border border-input rounded-md hover:bg-accent transition-colors"
                >
                  ${amount}
                </button>
              ))}
            </div>
          </div>

          {/* Remaining amount suggestion */}
          {remainingAmount > 0 && (
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Complete this goal:</strong>{" "}
                <button
                  type="button"
                  onClick={() => handleInputChange("amount", remainingAmount.toFixed(2))}
                  className="underline hover:no-underline"
                >
                  Add ${remainingAmount.toFixed(2)}
                </button>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Add Progress
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 