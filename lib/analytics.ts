// Analytics service for ELTIW - tracks user interactions and engagement

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: number;
}

interface AnalyticsProperties {
  sessionId: string;
  userId: string;
  timestamp: number;
  url: string;
  userAgent: string;
  [key: string]: unknown;
}

class Analytics {
  private events: AnalyticsEvent[] = [];
  private sessionId: string;
  private userId: string;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.userId = this.getOrCreateUserId();
    this.loadEvents();
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private getOrCreateUserId(): string {
    if (!this.isBrowser()) {
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    let userId = localStorage.getItem('eltiw_user_id');
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('eltiw_user_id', userId);
    }
    return userId;
  }

  private loadEvents(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      const saved = localStorage.getItem('eltiw_analytics');
      if (saved) {
        this.events = JSON.parse(saved);
      }
    } catch (error) {
      console.warn('Failed to load analytics events:', error);
      this.events = [];
    }
  }

  private saveEvents(): void {
    if (!this.isBrowser()) {
      return;
    }

    try {
      // Keep only last 100 events to prevent localStorage bloat
      const eventsToSave = this.events.slice(-100);
      localStorage.setItem('eltiw_analytics', JSON.stringify(eventsToSave));
    } catch (error) {
      console.warn('Failed to save analytics events:', error);
    }
  }

  private track(event: string, properties: Record<string, unknown> = {}): void {
    if (!this.isBrowser()) {
      return;
    }

    const analyticsEvent: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        sessionId: this.sessionId,
        userId: this.userId,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      } as AnalyticsProperties,
      timestamp: Date.now(),
    };

    this.events.push(analyticsEvent);
    this.saveEvents();

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', analyticsEvent);
    }
  }

  // Goal Management Events
  goalCreated(goalData: { category: string; cost: number; targetDate: string }): void {
    this.track('goal_created', {
      category: goalData.category,
      cost: goalData.cost,
      targetDate: goalData.targetDate,
    });
  }

  goalUpdated(goalId: string, updates: Record<string, unknown>): void {
    this.track('goal_updated', {
      goalId,
      updates: Object.keys(updates),
    });
  }

  goalDeleted(goalId: string, goalData: { category: string; cost: number }): void {
    this.track('goal_deleted', {
      goalId,
      category: goalData.category,
      cost: goalData.cost,
    });
  }

  progressAdded(goalId: string, amount: number): void {
    this.track('progress_added', {
      goalId,
      amount,
    });
  }

  goalCompleted(goalId: string, goalData: { category: string; cost: number; timeToComplete: number }): void {
    this.track('goal_completed', {
      goalId,
      category: goalData.category,
      cost: goalData.cost,
      timeToComplete: goalData.timeToComplete,
    });
  }

  // Sharing Events
  goalsShared(method: 'url' | 'email', goalCount: number): void {
    this.track('goals_shared', {
      method,
      goalCount,
    });
  }

  shareUrlCopied(): void {
    this.track('share_url_copied');
  }

  shareUrlVisited(): void {
    this.track('share_url_visited');
  }

  // Filtering & Search Events
  filterApplied(filterType: 'category' | 'status' | 'search', value: string): void {
    this.track('filter_applied', {
      filterType,
      value,
    });
  }

  searchPerformed(query: string, resultCount: number): void {
    this.track('search_performed', {
      query,
      resultCount,
    });
  }

  // Encryption Events
  encryptionEnabled(): void {
    this.track('encryption_enabled');
  }

  encryptionDisabled(): void {
    this.track('encryption_disabled');
  }

  // UI Interaction Events
  modalOpened(modalType: 'add_goal' | 'edit_goal' | 'share_goals' | 'encryption_settings' | 'progress_history'): void {
    this.track('modal_opened', {
      modalType,
    });
  }

  viewChanged(view: 'grid' | 'list'): void {
    this.track('view_changed', {
      view,
    });
  }

  // Session Events
  sessionStarted(): void {
    this.track('session_started');
  }

  sessionEnded(duration: number): void {
    this.track('session_ended', {
      duration,
    });
  }

  // Performance Events
  pageLoadTime(loadTime: number): void {
    this.track('page_load_time', {
      loadTime,
    });
  }

  // Error Events
  errorOccurred(errorType: string, errorMessage: string): void {
    this.track('error_occurred', {
      errorType,
      errorMessage,
    });
  }

  // Get Analytics Data
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  getEventCount(eventType: string): number {
    return this.events.filter(event => event.event === eventType).length;
  }

  getSessionDuration(): number {
    const sessionStart = this.events.find(event => event.event === 'session_started');
    if (!sessionStart) return 0;
    return Date.now() - (sessionStart.timestamp || 0);
  }

  getGoalStats(): {
    totalCreated: number;
    totalCompleted: number;
    totalDeleted: number;
    averageCost: number;
    mostPopularCategory: string;
  } {
    const created = this.events.filter(event => event.event === 'goal_created');
    const completed = this.events.filter(event => event.event === 'goal_completed');
    const deleted = this.events.filter(event => event.event === 'goal_deleted');

    const categories = created.map(event => event.properties?.category as string).filter(Boolean);
    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const mostPopularCategory = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0]?.[0] || 'unknown';

    const totalCost = created.reduce((sum, event) => sum + ((event.properties?.cost as number) || 0), 0);
    const averageCost = created.length > 0 ? totalCost / created.length : 0;

    return {
      totalCreated: created.length,
      totalCompleted: completed.length,
      totalDeleted: deleted.length,
      averageCost,
      mostPopularCategory,
    };
  }

  // Export Analytics Data
  exportData(): string {
    return JSON.stringify({
      userId: this.userId,
      sessionId: this.sessionId,
      events: this.events,
      stats: this.getGoalStats(),
      sessionDuration: this.getSessionDuration(),
    }, null, 2);
  }

  // Clear Analytics Data
  clearData(): void {
    this.events = [];
    localStorage.removeItem('eltiw_analytics');
    localStorage.removeItem('eltiw_user_id');
  }
}

// Create singleton instance
export const analytics = new Analytics();

// Auto-track session start
if (typeof window !== 'undefined') {
  analytics.sessionStarted();
  
  // Track session end on page unload
  window.addEventListener('beforeunload', () => {
    analytics.sessionEnded(analytics.getSessionDuration());
  });
} 