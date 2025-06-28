'use client';

import { useEffect } from 'react';
import { useSlugStore } from '@farajabien/slug-store';
import { Goal } from '@/lib/types/goal';
import { sampleGoals } from '@/lib/data/sampleGoals';
import { sampleLoans } from '@/lib/data/sampleLoans';

// Goals state interface
interface GoalsState {
  goals: Goal[];
  searchQuery: string;
}

export function SampleDataLoader() {
  const [state, setState] = useSlugStore<GoalsState>(
    'goals',
    { goals: [], searchQuery: "" },
    {
      url: false, // Don't pollute URL on landing page
      offline: { storage: 'indexeddb' }
    }
  );

  useEffect(() => {
    // Only load sample data if no goals exist
    if (state.goals.length === 0) {
      console.log('🎯 Loading sample goals...');
      
      // Add each sample goal to the store
      const goalsToAdd = sampleGoals.map(sampleGoal => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { id, createdAt, updatedAt, ...goalData } = sampleGoal;
        return {
          ...goalData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          progress: [],
          isCompleted: false,
        };
      });

      setState(prevState => ({
        ...prevState,
        goals: goalsToAdd
      }));
      
      console.log(`✅ Loaded ${sampleGoals.length} sample goals`);
    }

    // Load sample loans if none exist
    const existingLoans = localStorage.getItem('eltiw-loans');
    if (!existingLoans) {
      localStorage.setItem('eltiw-loans', JSON.stringify(sampleLoans));
    }
  }, [state.goals.length, setState]);

  // This component doesn't render anything visible
  return null;
} 