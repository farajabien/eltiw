'use client';

import { useState } from 'react';
import { Goal, GOAL_CATEGORIES } from '@/lib/types/goal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { AddProgressModal } from './AddProgressModal';
import { EditGoalModal } from './EditGoalModal';
import { ProgressHistoryModal } from './ProgressHistoryModal';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { 
  MoreHorizontal, 
  Plus, 
  TrendingUp, 
  CheckCircle2,
  Edit,
  Trash2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface GoalsTableProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onAddProgress: (goalId: string, amount: number, note?: string) => void;
}

export function GoalsTable({ goals, onEdit, onDelete, onAddProgress }: GoalsTableProps) {
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [showAddProgress, setShowAddProgress] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

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

  const getCategoryInfo = (category?: string) => {
    const cat = category as keyof typeof GOAL_CATEGORIES;
    return GOAL_CATEGORIES[cat] || GOAL_CATEGORIES.other;
  };

  const getStatusInfo = (goal: Goal) => {
    const targetDate = new Date(goal.targetDate);
    const today = new Date();
    const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const isOverdue = daysRemaining < 0;
    const isUrgent = daysRemaining <= 30 && daysRemaining > 0;

    if (goal.isCompleted) {
      return { text: 'Completed', className: 'bg-green-100 text-green-700', icon: '🎉' };
    }
    if (isOverdue) {
      return { 
        text: `${Math.abs(daysRemaining)}d overdue`, 
        className: 'bg-red-100 text-red-700', 
        icon: '⚠️' 
      };
    }
    if (isUrgent) {
      return { 
        text: `${daysRemaining}d left`, 
        className: 'bg-orange-100 text-orange-700', 
        icon: '🔥' 
      };
    }
    return { 
      text: `${daysRemaining}d left`, 
      className: 'bg-blue-100 text-blue-700', 
      icon: '📅' 
    };
  };

  const openModal = (goal: Goal, modalType: 'progress' | 'edit' | 'history' | 'delete') => {
    setSelectedGoal(goal);
    switch (modalType) {
      case 'progress':
        setShowAddProgress(true);
        break;
      case 'edit':
        setShowEdit(true);
        break;
      case 'history':
        setShowHistory(true);
        break;
      case 'delete':
        setShowDelete(true);
        break;
    }
  };

  const closeModals = () => {
    setSelectedGoal(null);
    setShowAddProgress(false);
    setShowEdit(false);
    setShowHistory(false);
    setShowDelete(false);
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Goals Yet</h3>
        <p className="text-gray-600">Start by creating your first goal to track your progress!</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-lg border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40px]">Icon</TableHead>
              <TableHead>Goal</TableHead>
              <TableHead className="w-[120px]">Target</TableHead>
              <TableHead className="w-[120px]">Saved</TableHead>
              <TableHead className="w-[100px]">Progress</TableHead>
              <TableHead className="w-[100px]">Due Date</TableHead>
              <TableHead className="w-[120px]">Status</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {goals.map((goal) => {
              const totalSaved = goal.progress.reduce((sum, entry) => sum + entry.amount, 0);
              const progressPercentage = (totalSaved / goal.cost) * 100;
              const categoryInfo = getCategoryInfo(goal.category);
              const statusInfo = getStatusInfo(goal);

              return (
                <TableRow key={goal.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      <span className="text-lg">{categoryInfo.emoji}</span>
                      {goal.isCompleted && (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div>
                      <div className="font-medium text-sm">{goal.name}</div>
                      {goal.description && (
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">
                          {goal.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm font-medium">
                      {formatCurrency(goal.cost)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-sm text-green-600 font-medium">
                      {formatCurrency(totalSaved)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-xs text-right">
                        {progressPercentage.toFixed(0)}%
                      </div>
                      <Progress 
                        value={Math.min(progressPercentage, 100)} 
                        className="h-2"
                      />
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <div className="text-xs text-gray-600">
                      {formatDate(goal.targetDate)}
                    </div>
                  </TableCell>
                  
                  <TableCell>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs px-2 py-1 ${statusInfo.className}`}
                    >
                      <span className="mr-1">{statusInfo.icon}</span>
                      {statusInfo.text}
                    </Badge>
                  </TableCell>
                  
                  <TableCell>
                    <div className="flex items-center space-x-1">
                      {!goal.isCompleted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => openModal(goal, 'progress')}
                          title="Add Progress"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      )}
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <MoreHorizontal className="h-3 w-3" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem onClick={() => openModal(goal, 'progress')}>
                            <Plus className="h-3 w-3 mr-2" />
                            Add Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openModal(goal, 'history')}>
                            <TrendingUp className="h-3 w-3 mr-2" />
                            View History
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => openModal(goal, 'edit')}>
                            <Edit className="h-3 w-3 mr-2" />
                            Edit Goal
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => openModal(goal, 'delete')}
                            className="text-red-600"
                          >
                            <Trash2 className="h-3 w-3 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {/* Modals */}
      {selectedGoal && (
        <>
          <AddProgressModal
            isOpen={showAddProgress}
            onClose={closeModals}
            goal={selectedGoal}
            onAddProgress={(progress) => onAddProgress(selectedGoal.id, progress.amount, progress.note)}
          />

          <EditGoalModal
            isOpen={showEdit}
            onClose={closeModals}
            goal={selectedGoal}
            onUpdateGoal={(updates) => onEdit({ ...selectedGoal, ...updates })}
          />

          <ProgressHistoryModal
            isOpen={showHistory}
            onClose={closeModals}
            goal={selectedGoal}
          />

          <DeleteConfirmModal
            isOpen={showDelete}
            onClose={closeModals}
            goal={selectedGoal}
            onConfirm={() => {
              onDelete(selectedGoal.id);
              closeModals();
            }}
          />
        </>
      )}
    </>
  );
} 