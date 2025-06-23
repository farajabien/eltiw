"use client";

import { useState } from "react";
import { EmailSnapshotModal } from "./EmailSnapshotModal";
import { analytics } from "@/lib/analytics";

interface ShareGoalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  goalCount: number;
}

export function ShareGoalsModal({ isOpen, onClose, shareUrl, goalCount }: ShareGoalsModalProps) {
  const [copied, setCopied] = useState(false);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      // Track analytics
      analytics.shareUrlCopied();
      analytics.goalsShared('url', goalCount);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handleEmailSnapshot = () => {
    setIsEmailModalOpen(true);
    // Track analytics
    analytics.goalsShared('email', goalCount);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-background border rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Share Your Goals</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="space-y-4">
            {/* Info */}
            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                🚀 No-Database Revolution
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Your {goalCount} goals are encoded directly in this URL using Slug Store technology. 
                No server required - everything is compressed and shareable instantly!
              </p>
            </div>

            {/* URL Display */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Shareable URL (compressed with Slug Store)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-3 py-2 border border-input rounded-md bg-muted text-sm text-muted-foreground font-mono"
                />
                <button
                  onClick={handleCopyUrl}
                  className={`px-4 py-2 text-sm rounded-md transition-colors ${
                    copied 
                      ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                  }`}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-2 text-sm">
              <h4 className="font-medium">✨ Slug Store Features:</h4>
              <ul className="space-y-1 text-muted-foreground ml-4">
                <li>• 30-70% URL compression using LZ-String</li>
                <li>• Instant sharing - no database required</li>
                <li>• Complete goal state preserved in URL</li>
                <li>• Works offline and across devices</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <div className="flex gap-3">
                <button
                  onClick={handleCopyUrl}
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
                >
                  <span>🔗</span>
                  {copied ? "Copied!" : "Copy URL"}
                </button>
                <button
                  onClick={handleEmailSnapshot}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>📧</span>
                  Email Snapshot
                </button>
              </div>
              <button
                onClick={onClose}
                className="w-full px-4 py-2 border border-input rounded-md text-foreground hover:bg-accent transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      <EmailSnapshotModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        shareUrl={shareUrl}
        goalCount={goalCount}
      />
    </>
  );
} 