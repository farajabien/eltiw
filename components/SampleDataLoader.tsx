'use client';

import { useEffect } from 'react';
import { useGoalsStore } from '@/lib/stores/goalsStore';
import { sampleGoals } from '@/lib/data/sampleGoals';

export function SampleDataLoader() {
  const { goals, addGoal } = useGoalsStore();

  useEffect(() => {
    // Only load sample data if no goals exist
    if (goals.length === 0) {
      console.log('🎯 Loading sample goals...');
      
      // Add each sample goal to the store
      sampleGoals.forEach((sampleGoal) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, ...goalData } = sampleGoal;
        addGoal(goalData);
      });
      
      console.log(`✅ Loaded ${sampleGoals.length} sample goals`);
    }
  }, [goals.length, addGoal]);

  // This component doesn't render anything visible
  return null;
} 