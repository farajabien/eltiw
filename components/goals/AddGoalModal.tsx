"use client";

import { useState } from "react";
import { Goal, GoalFormData, GOAL_CATEGORIES } from "@/lib/types/goal";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: Omit<Goal, "id" | "createdAt" | "updatedAt">) => void;
}

export function AddGoalModal({ isOpen, onClose, onAddGoal }: AddGoalModalProps) {
  const [formData, setFormData] = useState<GoalFormData>({
    name: "",
    description: "",
    cost: 0,
    targetDate: "",
    category: "other",
  });

  const [errors, setErrors] = useState<Partial<GoalFormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<GoalFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Goal name is required";
    }

    if (Number(formData.cost) <= 0) {
      newErrors.cost = "Cost must be greater than 0";
    }

    if (!formData.targetDate) {
      newErrors.targetDate = "Target date is required";
    } else {
      const targetDate = new Date(formData.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (targetDate <= today) {
        newErrors.targetDate = "Target date must be in the future";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const newGoal: Omit<Goal, "id" | "createdAt" | "updatedAt"> = {
      name: formData.name.trim(),
      description: formData.description?.trim() || undefined,
      cost: Number(formData.cost),
      targetDate: formData.targetDate,
      category: formData.category,
      isCompleted: false,
      progress: [],
    };

    onAddGoal(newGoal);
    
    // Reset form
    setFormData({
      name: "",
      description: "",
      cost: 0,
      targetDate: "",
      category: "other",
    });
    setErrors({});
  };

  const handleInputChange = (field: keyof GoalFormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  // Get minimum date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

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
          <h2 className="text-xl font-semibold">Add New Goal</h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Goal Name *
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="e.g., New MacBook Pro"
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium mb-1">
              Description (optional)
            </label>
            <textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Additional details about your goal..."
              rows={2}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
            />
          </div>

          {/* Cost */}
          <div>
            <label htmlFor="cost" className="block text-sm font-medium mb-1">
              Cost *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-muted-foreground">$</span>
              <input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                value={formData.cost === 0 ? "" : formData.cost.toString()}
                onChange={(e) => handleInputChange("cost", parseFloat(e.target.value) || 0)}
                placeholder="0.00"
                className="w-full pl-8 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
              />
            </div>
            {errors.cost && <p className="text-sm text-red-500 mt-1">{errors.cost}</p>}
          </div>

          {/* Target Date */}
          <div>
            <label htmlFor="targetDate" className="block text-sm font-medium mb-1">
              Target Date *
            </label>
            <input
              id="targetDate"
              type="date"
              min={minDate}
              value={formData.targetDate}
              onChange={(e) => handleInputChange("targetDate", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
            {errors.targetDate && <p className="text-sm text-red-500 mt-1">{errors.targetDate}</p>}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              id="category"
              value={formData.category || "other"}
              onChange={(e) => handleInputChange("category", e.target.value)}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {Object.entries(GOAL_CATEGORIES).map(([key, { label, emoji }]) => (
                <option key={key} value={key}>
                  {emoji} {label}
                </option>
              ))}
            </select>
          </div>

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
              Add Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 