"use client";

import { useState, useEffect } from "react";
import { Goal } from "@/lib/types/goal";
import { GoalCard } from "./GoalCard";
import { useGoalsStore } from "@/lib/stores/goalsStore";

interface GoalsListProps {
  goals: Goal[];
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function GoalsList({ goals, onUpdateGoal, onDeleteGoal }: GoalsListProps) {
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>(goals);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed' | 'overdue'>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'targetDate' | 'cost'>('targetDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  const { getGoalProgress, isGoalOverdue, searchQuery } = useGoalsStore();

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);
    
    let processedGoals = [...goals];

    // Apply search query first
    if (searchQuery) {
      processedGoals = processedGoals.filter(goal =>
        goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        goal.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Then apply filter
    switch (filter) {
      case 'active':
        processedGoals = processedGoals.filter(goal => !goal.isCompleted);
        break;
      case 'completed':
        processedGoals = processedGoals.filter(goal => goal.isCompleted);
        break;
      case 'overdue':
        processedGoals = processedGoals.filter(goal => isGoalOverdue(goal) && !goal.isCompleted);
        break;
    }
    
    // Finally, apply sorting
    processedGoals.sort((a, b) => {
      let aValue: string | number, bValue: string | number;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'progress':
          aValue = getGoalProgress(a.id);
          bValue = getGoalProgress(b.id);
          break;
        case 'targetDate':
          aValue = new Date(a.targetDate).getTime();
          bValue = new Date(b.targetDate).getTime();
          break;
        case 'cost':
          aValue = a.cost;
          bValue = b.cost;
          break;
        default:
          return 0;
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
    
    setFilteredGoals(processedGoals);
    
    // Simulate loading delay for smooth UX
    const timer = setTimeout(() => setIsLoading(false), 150);
    return () => clearTimeout(timer);
  }, [goals, filter, sortBy, sortOrder, getGoalProgress, isGoalOverdue, searchQuery]);

  const getFilterCount = (filterType: typeof filter) => {
    switch (filterType) {
      case 'active':
        return goals.filter(goal => !goal.isCompleted).length;
      case 'completed':
        return goals.filter(goal => goal.isCompleted).length;
      case 'overdue':
        return goals.filter(goal => isGoalOverdue(goal) && !goal.isCompleted).length;
      default:
        return goals.length;
    }
  };

  const EmptyState = () => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">🎯</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
        {filter === 'all' ? 'No goals yet' : `No ${filter} goals`}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4">
        {filter === 'all' 
          ? 'Start by creating your first financial goal!' 
          : `You don't have any ${filter} goals at the moment.`
        }
      </p>
      {filter !== 'all' && (
        <button
          onClick={() => setFilter('all')}
          className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          View all goals
        </button>
      )}
    </div>
  );

  const LoadingState = () => (
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
  );

  return (
    <div className="space-y-6">
      {/* Filters and Sorting */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Filter Tabs */}
        <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          {(['all', 'active', 'completed', 'overdue'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`px-3 py-1.5 text-sm rounded-md transition-all duration-200 ${
                filter === filterType
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              <span className="ml-1 text-xs opacity-75">({getFilterCount(filterType)})</span>
            </button>
          ))}
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="text-sm border border-gray-300 dark:border-gray-600 rounded px-2 py-1 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <option value="targetDate">Target Date</option>
            <option value="progress">Progress</option>
            <option value="name">Name</option>
            <option value="cost">Cost</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Goals Grid */}
      {isLoading ? (
        <LoadingState />
      ) : filteredGoals.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredGoals.map((goal, index) => (
            <div
              key={goal.id}
              className="animate-fade-in"
              style={{
                animationDelay: `${index * 50}ms`,
                animationFillMode: 'both'
              }}
            >
              <GoalCard
                goal={goal}
                onUpdateGoal={onUpdateGoal}
                onDeleteGoal={onDeleteGoal}
              />
            </div>
          ))}
        </div>
      )}

      {/* Summary Stats */}
      {filteredGoals.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">
                {filteredGoals.length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Goals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                {filteredGoals.filter(g => g.isCompleted).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {filteredGoals.filter(g => !g.isCompleted).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {filteredGoals.filter(g => isGoalOverdue(g) && !g.isCompleted).length}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Overdue</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 