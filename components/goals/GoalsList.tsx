"use client";

import { useState } from "react";
import { Goal } from "@/lib/types/goal";
import { GoalCard } from "./GoalCard";
import { GoalsTable } from './GoalsTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  LayoutGrid, 
  Table, 
  Search, 
  Filter,
  SortAsc,
  Target,
  CheckCircle2,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface GoalsListProps {
  goals: Goal[];
  onEdit: (goal: Goal) => void;
  onDelete: (goalId: string) => void;
  onAddProgress: (goalId: string, amount: number, note?: string) => void;
}

type ViewMode = 'cards' | 'table';
type SortBy = 'name' | 'deadline' | 'progress' | 'amount';
type FilterBy = 'all' | 'completed' | 'active' | 'overdue' | 'urgent';

export function GoalsList({ goals, onEdit, onDelete, onAddProgress }: GoalsListProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('cards');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortBy>('deadline');
  const [filterBy, setFilterBy] = useState<FilterBy>('all');

  // Filter and sort goals
  const filteredAndSortedGoals = goals
    .filter(goal => {
      // Search filter
      const matchesSearch = goal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (goal.description?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);
      
      if (!matchesSearch) return false;

      // Category filter
      const today = new Date();
      const targetDate = new Date(goal.targetDate);
      const daysRemaining = Math.ceil((targetDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      
      switch (filterBy) {
        case 'completed':
          return goal.isCompleted;
        case 'active':
          return !goal.isCompleted && daysRemaining > 0;
        case 'overdue':
          return !goal.isCompleted && daysRemaining < 0;
        case 'urgent':
          return !goal.isCompleted && daysRemaining <= 30 && daysRemaining > 0;
        default:
          return true;
      }
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'deadline':
          return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
        case 'progress':
          const aProgress = a.progress.reduce((sum, p) => sum + p.amount, 0) / a.cost;
          const bProgress = b.progress.reduce((sum, p) => sum + p.amount, 0) / b.cost;
          return bProgress - aProgress;
        case 'amount':
          return b.cost - a.cost;
        default:
          return 0;
      }
    });

  // Calculate statistics
  const stats = {
    total: goals.length,
    completed: goals.filter(g => g.isCompleted).length,
    active: goals.filter(g => !g.isCompleted).length,
    overdue: goals.filter(g => {
      const daysRemaining = Math.ceil((new Date(g.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return !g.isCompleted && daysRemaining < 0;
    }).length,
    urgent: goals.filter(g => {
      const daysRemaining = Math.ceil((new Date(g.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return !g.isCompleted && daysRemaining <= 30 && daysRemaining > 0;
    }).length
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎯</div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Goals Yet</h3>
        <p className="text-gray-600 mb-6">Start by creating your first goal to track your progress!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Statistics Bar */}
      <div className="flex flex-wrap gap-3">
        <Badge variant="secondary" className="bg-blue-50 text-blue-700">
          <Target className="h-3 w-3 mr-1" />
          {stats.total} Total
        </Badge>
        <Badge variant="secondary" className="bg-green-50 text-green-700">
          <CheckCircle2 className="h-3 w-3 mr-1" />
          {stats.completed} Completed
        </Badge>
        <Badge variant="secondary" className="bg-gray-50 text-gray-700">
          <Clock className="h-3 w-3 mr-1" />
          {stats.active} Active
        </Badge>
        {stats.urgent > 0 && (
          <Badge variant="secondary" className="bg-orange-50 text-orange-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {stats.urgent} Urgent
          </Badge>
        )}
        {stats.overdue > 0 && (
          <Badge variant="secondary" className="bg-red-50 text-red-700">
            <AlertTriangle className="h-3 w-3 mr-1" />
            {stats.overdue} Overdue
          </Badge>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search goals..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-64"
            />
          </div>
          
          <Select value={filterBy} onValueChange={(value) => setFilterBy(value as FilterBy)}>
            <SelectTrigger className="w-40">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Goals</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortBy)}>
            <SelectTrigger className="w-40">
              <div className="flex items-center">
                <SortAsc className="h-4 w-4 mr-2" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="deadline">By Deadline</SelectItem>
              <SelectItem value="name">By Name</SelectItem>
              <SelectItem value="progress">By Progress</SelectItem>
              <SelectItem value="amount">By Amount</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* View Toggle */}
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <Button
            variant={viewMode === 'cards' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('cards')}
            className="h-8 px-3"
          >
            <LayoutGrid className="h-4 w-4 mr-1" />
            Cards
          </Button>
          <Button
            variant={viewMode === 'table' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="h-8 px-3"
          >
            <Table className="h-4 w-4 mr-1" />
            Table
          </Button>
        </div>
      </div>

      {/* Results Info */}
      {filteredAndSortedGoals.length !== goals.length && (
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedGoals.length} of {goals.length} goals
        </div>
      )}

      {/* Goals Display */}
      {filteredAndSortedGoals.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAndSortedGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={onEdit}
              onDelete={onDelete}
              onAddProgress={onAddProgress}
            />
          ))}
        </div>
      ) : (
        <GoalsTable
          goals={filteredAndSortedGoals}
          onEdit={onEdit}
          onDelete={onDelete}
          onAddProgress={onAddProgress}
        />
      )}
    </div>
  );
} 