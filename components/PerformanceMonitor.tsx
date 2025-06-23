"use client";

import { useEffect } from "react";
import { analytics } from "@/lib/analytics";

export function PerformanceMonitor() {
  useEffect(() => {
    // Track page load performance
    const trackPerformance = () => {
      if (typeof window !== 'undefined' && 'performance' in window) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.loadEventStart;
          const domContentLoaded = navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart;
          const firstPaint = performance.getEntriesByName('first-paint')[0] as PerformanceEntry;
          const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0] as PerformanceEntry;
          
          // Track key performance metrics
          analytics.pageLoadTime(loadTime);
          
          // Log detailed performance data in development
          if (process.env.NODE_ENV === 'development') {
            console.log('🚀 Performance Metrics:', {
              loadTime: `${loadTime.toFixed(2)}ms`,
              domContentLoaded: `${domContentLoaded.toFixed(2)}ms`,
              firstPaint: firstPaint ? `${firstPaint.startTime.toFixed(2)}ms` : 'N/A',
              firstContentfulPaint: firstContentfulPaint ? `${firstContentfulPaint.startTime.toFixed(2)}ms` : 'N/A',
              url: window.location.href,
            });
          }
        }
      }
    };

    // Track performance after page loads
    if (document.readyState === 'complete') {
      trackPerformance();
    } else {
      window.addEventListener('load', trackPerformance);
    }

    // Track Core Web Vitals if available
    if ('web-vital' in window) {
      // This would integrate with web-vitals library if added
      console.log('📊 Core Web Vitals tracking available');
    }

    return () => {
      window.removeEventListener('load', trackPerformance);
    };
  }, []);

  // This component doesn't render anything
  return null;
} 