"use client";

import { useState } from "react";
import { Goal } from "@/lib/types/goal";

interface AddGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal: (goal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

export function AddGoalModal({ isOpen, onClose, onAddGoal }: AddGoalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cost: "",
    targetDate: "",
    category: "other",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { value: "electronics", label: "Electronics", icon: "💻" },
    { value: "home", label: "Home & Garden", icon: "🏠" },
    { value: "travel", label: "Travel", icon: "✈️" },
    { value: "education", label: "Education", icon: "📚" },
    { value: "health", label: "Health & Fitness", icon: "🏥" },
    { value: "entertainment", label: "Entertainment", icon: "🎮" },
    { value: "fashion", label: "Fashion", icon: "👕" },
    { value: "other", label: "Other", icon: "📦" },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Goal name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Goal name must be at least 3 characters";
    }

    if (!formData.cost) {
      newErrors.cost = "Cost is required";
    } else {
      const cost = parseFloat(formData.cost);
      if (isNaN(cost) || cost <= 0) {
        newErrors.cost = "Cost must be a positive number";
      }
    }

    if (!formData.targetDate) {
      newErrors.targetDate = "Target date is required";
    } else {
      const targetDate = new Date(formData.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (targetDate < today) {
        newErrors.targetDate = "Target date cannot be in the past";
      }
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
      const newGoal: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'> = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        cost: parseFloat(formData.cost),
        targetDate: formData.targetDate,
        category: formData.category,
        progress: [],
        isCompleted: false,
      };

      onAddGoal(newGoal);
      handleClose();
    } catch (error) {
      console.error('Error adding goal:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({
      name: "",
      description: "",
      cost: "",
      targetDate: "",
      category: "other",
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Add New Goal
            </h2>
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

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Goal Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Goal Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.name 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                }`}
                placeholder="e.g., New Laptop"
                disabled={isLoading}
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.name}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
                placeholder="Optional description..."
                rows={3}
                disabled={isLoading}
              />
            </div>

            {/* Cost */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Cost (KES) *
              </label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => handleInputChange("cost", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.cost 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                }`}
                placeholder="0"
                min="0"
                step="0.01"
                disabled={isLoading}
              />
              {errors.cost && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.cost}</p>
              )}
            </div>

            {/* Target Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Target Date *
              </label>
              <input
                type="date"
                value={formData.targetDate}
                onChange={(e) => handleInputChange("targetDate", e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 ${
                  errors.targetDate 
                    ? 'border-red-300 focus:ring-red-500' 
                    : 'border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white'
                }`}
                disabled={isLoading}
              />
              {errors.targetDate && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.targetDate}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleInputChange("category", category.value)}
                    disabled={isLoading}
                    className={`p-3 border rounded-md text-left transition-all duration-200 hover:scale-105 ${
                      formData.category === category.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{category.icon}</span>
                      <span className="text-sm font-medium">{category.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  'Add Goal'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 