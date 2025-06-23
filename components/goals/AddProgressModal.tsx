"use client";

import { useState } from "react";
import { Goal, GoalProgress } from "@/lib/types/goal";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalSaved = goal.progress.reduce((sum, p) => sum + p.amount, 0);
  const remaining = goal.cost - totalSaved;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.amount) {
      newErrors.amount = "Amount is required";
    } else {
      const amount = parseFloat(formData.amount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.amount = "Amount must be a positive number";
      } else if (amount > remaining) {
        newErrors.amount = `Amount cannot exceed remaining balance (${remaining.toLocaleString()} KES)`;
      }
    }

    if (formData.note && formData.note.trim().length > 200) {
      newErrors.note = "Note must be less than 200 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const progress: GoalProgress = {
        id: crypto.randomUUID(),
        amount: parseFloat(formData.amount),
        note: formData.note.trim() || undefined,
        date: new Date().toISOString(),
      };

      await onAddProgress(progress);
      handleClose();
    } catch (error) {
      console.error('Error adding progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      amount: "",
      note: "",
    });
    setErrors({});
    setIsLoading(false);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add Progress
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {goal.name}
            </p>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200 disabled:opacity-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-6">
            {/* Progress Summary */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Total Saved</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(totalSaved)}
                  </div>
                </div>
                <div>
                  <div className="text-gray-600 dark:text-gray-400">Remaining</div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(remaining)}
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                  <span>Progress</span>
                  <span>{((totalSaved / goal.cost) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((totalSaved / goal.cost) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Amount (KES) *
                </label>
                <input
                  type="number"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                    errors.amount 
                      ? 'border-red-300 focus:ring-red-500' 
                      : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                  }`}
                  placeholder="0"
                  min="0"
                  max={remaining}
                  step="0.01"
                  disabled={isLoading}
                />
                {errors.amount && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Maximum: {formatCurrency(remaining)}
                </p>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Note (optional)
                </label>
                <textarea
                  value={formData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200 ${
                    errors.note ? 'border-red-300 focus:ring-red-500' : ''
                  }`}
                  placeholder="e.g., Monthly savings, Bonus, etc."
                  rows={3}
                  maxLength={200}
                  disabled={isLoading}
                />
                {errors.note && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.note}</p>
                )}
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {formData.note.length}/200 characters
                </p>
              </div>

              {/* Quick Amount Buttons */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Quick Amounts
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[1000, 5000, 10000, 25000, 50000, 100000].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleInputChange("amount", amount.toString())}
                      disabled={isLoading || amount > remaining}
                      className={`px-3 py-2 text-sm border rounded-md transition-all duration-200 hover:scale-105 ${
                        parseFloat(formData.amount) === amount
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                      } ${isLoading || amount > remaining ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </ScrollArea>

        {/* Footer - Fixed */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              onClick={handleSubmit}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                'Add Progress'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 