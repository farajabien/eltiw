'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGoalsStore } from '@/lib/stores/goalsStore';
import { Goal } from '@/lib/types/goal';

export function DashboardClient() {
  const {
    goals,
    getTotalSaved,
    getTotalTargetAmount,
    getOverallProgress,
    getCompletedGoals,
  } = useGoalsStore();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Calculate statistics
  const totalGoals = goals.length;
  const completedGoals = getCompletedGoals().length;
  const totalTargetAmount = getTotalTargetAmount();
  const totalProgress = getTotalSaved();
  const overallProgress = getOverallProgress();
  const remainingAmount = totalTargetAmount - totalProgress;

  // Get recent activity (last 5 progress entries across all goals)
  const recentActivity = goals
    .flatMap((goal: Goal) => 
      goal.progress.map(entry => ({
        ...entry,
        goalTitle: goal.name,
        goalId: goal.id
      }))
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  // Get goals by priority/urgency
  const urgentGoals = goals
    .filter((goal: Goal) => {
      if (!goal.targetDate) return false;
      const daysUntilDeadline = Math.ceil((new Date(goal.targetDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 30 && daysUntilDeadline > 0;
    })
    .sort((a: Goal, b: Goal) => new Date(a.targetDate!).getTime() - new Date(b.targetDate!).getTime())
    .slice(0, 3);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const copyShareUrl = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl);
    alert('Share URL copied to clipboard!');
  };

  if (totalGoals === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🎯</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Goals Yet</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Start your journey by creating your first goal. Track your progress and achieve your dreams!
        </p>
        <Link 
          href="/"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Create Your First Goal
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Goals</p>
              <p className="text-3xl font-bold text-gray-900">{totalGoals}</p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-3xl font-bold text-green-600">{completedGoals}</p>
            </div>
            <div className="text-3xl">✅</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Progress</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalProgress)}</p>
            </div>
            <div className="text-3xl">💰</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Remaining</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(remainingAmount)}</p>
            </div>
            <div className="text-3xl">🎯</div>
          </div>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Overall Progress</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Progress toward all goals</span>
            <span className="font-semibold text-gray-900">{overallProgress.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>{formatCurrency(totalProgress)} saved</span>
            <span>{formatCurrency(totalTargetAmount)} target</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Urgent Goals */}
        {urgentGoals.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">⏰</span>
              Urgent Goals
            </h2>
            <div className="space-y-4">
              {urgentGoals.map((goal: Goal) => {
                const progress = goal.progress.reduce((sum: number, entry) => sum + entry.amount, 0);
                const progressPercentage = (progress / goal.cost) * 100;
                const daysLeft = Math.ceil((new Date(goal.targetDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                
                return (
                  <div key={goal.id} className="border border-orange-200 rounded-lg p-4 bg-orange-50">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{goal.name}</h3>
                      <span className="text-sm text-orange-600 font-medium">
                        {daysLeft} days left
                      </span>
                    </div>
                    <div className="w-full bg-orange-200 rounded-full h-2 mb-2">
                      <div 
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(progress)} / {formatCurrency(goal.cost)}</span>
                      <span>{progressPercentage.toFixed(1)}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📈</span>
            Recent Activity
          </h2>
          {recentActivity.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No recent activity</p>
          ) : (
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl">💰</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(activity.amount)} added to {activity.goalTitle}
                    </p>
                    <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
                    {activity.note && (
                      <p className="text-sm text-gray-600 italic">&quot;{activity.note}&quot;</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link 
            href="/"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-2">➕</div>
            <div className="font-medium">Add New Goal</div>
          </Link>
          <Link 
            href="/goals"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-2">📝</div>
            <div className="font-medium">Manage Goals</div>
          </Link>
          <button 
            onClick={copyShareUrl}
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-2">🔗</div>
            <div className="font-medium">Copy Share URL</div>
          </button>
          <Link 
            href="/about"
            className="bg-white/10 hover:bg-white/20 rounded-lg p-4 text-center transition-colors"
          >
            <div className="text-2xl mb-2">ℹ️</div>
            <div className="font-medium">Learn More</div>
          </Link>
        </div>
      </div>
    </>
  );
} 