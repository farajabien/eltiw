"use client";

import { useState } from "react";
import { Goal, GOAL_CATEGORIES } from "@/lib/types/goal";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { AddProgressModal } from "./AddProgressModal";
import { EditGoalModal } from "./EditGoalModal";
import { ProgressHistoryModal } from "./ProgressHistoryModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";
import { 
  MoreHorizontal, 
  Plus, 
  Calendar, 
  TrendingUp, 
  Target,
  CheckCircle2,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onAddProgress: (goalId: string, amount: number, note?: string) => void;
}

export function GoalCard({ goal, onEdit, onDelete, onAddProgress }: GoalCardProps) {
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Calculate progress
  const totalSaved = goal.progress.reduce((sum, entry) => sum + entry.amount, 0);
  const progressPercentage = (totalSaved / goal.cost) * 100;
  const remainingAmount = goal.cost - totalSaved;

  // Calculate days remaining
  const targetDate = new Date(goal.targetDate);
  const today = new Date();
  const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  const isOverdue = daysRemaining < 0;
  const isUrgent = daysRemaining <= 30 && daysRemaining > 0;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryInfo = () => {
    const category = goal.category as keyof typeof GOAL_CATEGORIES;
    return GOAL_CATEGORIES[category] || GOAL_CATEGORIES.other;
  };

  const getStatusColor = () => {
    if (goal.isCompleted) return 'text-green-600 bg-green-50';
    if (isOverdue) return 'text-red-600 bg-red-50';
    if (isUrgent) return 'text-orange-600 bg-orange-50';
    return 'text-blue-600 bg-blue-50';
  };

  const getProgressColor = () => {
    if (goal.isCompleted) return 'bg-green-500';
    if (progressPercentage >= 75) return 'bg-blue-500';
    if (progressPercentage >= 50) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  return (
    <>
      <Card className={`overflow-hidden transition-all duration-200 hover:shadow-lg ${
        goal.isCompleted ? 'ring-2 ring-green-200 bg-green-50/30' : ''
      }`}>
        <CardContent className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <span className="text-xl">{getCategoryInfo().emoji}</span>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-gray-900 truncate text-sm">
                  {goal.name}
                </h3>
                {goal.description && (
                  <p className="text-xs text-gray-500 truncate mt-0.5">
                    {goal.description}
                  </p>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-1">
              {goal.isCompleted && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem onClick={() => setShowAddProgress(true)}>
                    <Plus className="h-3 w-3 mr-2" />
                    Add Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowHistory(true)}>
                    <TrendingUp className="h-3 w-3 mr-2" />
                    View History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowEdit(true)}>
                    <Target className="h-3 w-3 mr-2" />
                    Edit Goal
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setShowDelete(true)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Progress Section */}
          <div className="space-y-2 mb-3">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="relative">
              <Progress 
                value={Math.min(progressPercentage, 100)} 
                className="h-2"
              />
              <div 
                className={`absolute inset-0 h-2 rounded-full transition-all duration-500 ${getProgressColor()}`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
          </div>

          {/* Amount Section */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-0.5">Saved</div>
              <div className="text-sm font-semibold text-green-600">
                {formatCurrency(totalSaved)}
              </div>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-500 mb-0.5">Remaining</div>
              <div className="text-sm font-semibold text-orange-600">
                {formatCurrency(remainingAmount)}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(goal.targetDate)}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              {!goal.isCompleted && (
                <Badge 
                  variant="secondary" 
                  className={`text-xs px-2 py-0.5 ${getStatusColor()}`}
                >
                  {isOverdue 
                    ? `${Math.abs(daysRemaining)}d overdue` 
                    : daysRemaining === 0 
                    ? 'Due today' 
                    : `${daysRemaining}d left`
                  }
                </Badge>
              )}
              
              {goal.isCompleted && (
                <Badge className="text-xs px-2 py-0.5 bg-green-100 text-green-700">
                  Completed! 🎉
                </Badge>
              )}
            </div>
          </div>

          {/* Quick Add Progress Button */}
          {!goal.isCompleted && (
            <Button
              variant="outline"
              size="sm"
              className="w-full mt-3 h-7 text-xs"
              onClick={() => setShowAddProgress(true)}
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Progress
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Modals */}
      <AddProgressModal
        isOpen={showAddProgress}
        onClose={() => setShowAddProgress(false)}
        goal={goal}
        onAddProgress={(progress) => onAddProgress(goal.id, progress.amount, progress.note)}
      />

      <EditGoalModal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        goal={goal}
        onUpdateGoal={(updates) => onEdit({ ...goal, ...updates })}
      />

      <ProgressHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        goal={goal}
      />

      <DeleteConfirmModal
        isOpen={showDelete}
        onClose={() => setShowDelete(false)}
        goal={goal}
        onConfirm={() => onDelete(goal.id)}
      />
    </>
  );
} 