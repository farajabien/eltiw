"use client";

import { Goal } from "@/lib/types/goal";
import { GoalCard } from "./GoalCard";

interface GoalsListProps {
  goals: Goal[];
  onUpdateGoal: (goalId: string, updates: Partial<Goal>) => void;
  onDeleteGoal: (goalId: string) => void;
}

export function GoalsList({ goals, onUpdateGoal, onDeleteGoal }: GoalsListProps) {
  if (goals.length === 0) {
    return null;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal, index) => (
        <div
          key={goal.id}
          className="animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <GoalCard
            goal={goal}
            onUpdateGoal={onUpdateGoal}
            onDeleteGoal={onDeleteGoal}
          />
        </div>
      ))}
    </div>
  );
} 