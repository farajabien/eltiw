"use client";

import { useState } from "react";
import { useGoalsStore } from "@/lib/stores/goalsStore";
import { Button } from "@/components/ui/button";

interface EncryptionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EncryptionSettingsModal({ isOpen, onClose }: EncryptionSettingsModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isEnabling, setIsEnabling] = useState(false);
  const [error, setError] = useState("");
  
  const { encryptionEnabled, enableEncryption, disableEncryption } = useGoalsStore();

  const handleEnableEncryption = async () => {
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsEnabling(true);
    setError("");
    
    try {
      enableEncryption(password);
      setPassword("");
      setConfirmPassword("");
      onClose();
    } catch {
      setError("Failed to enable encryption. Please try again.");
    } finally {
      setIsEnabling(false);
    }
  };

  const handleDisableEncryption = () => {
    if (confirm("Are you sure you want to disable encryption? Your goals will no longer be password-protected.")) {
      disableEncryption();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Encryption Settings
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Current Status */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${encryptionEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {encryptionEnabled ? 'Encryption Enabled' : 'Encryption Disabled'}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {encryptionEnabled 
                    ? 'Your goals are password-protected and encrypted in the URL'
                    : 'Your goals are stored in plain text in the URL'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Encryption Info */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 mt-0.5">🔒</div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                  How Encryption Works
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  When enabled, your goals are encrypted using Web Crypto API before being 
                  compressed into the URL. Only users with the password can decrypt and view your goals.
                </p>
              </div>
            </div>
          </div>

          {!encryptionEnabled ? (
            /* Enable Encryption Form */
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Set Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter a strong password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {error && (
                <div className="text-red-600 dark:text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={handleEnableEncryption}
                  disabled={isEnabling || !password || !confirmPassword}
                  className="flex-1"
                >
                  {isEnabling ? 'Enabling...' : 'Enable Encryption'}
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            /* Disable Encryption */
            <div className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-500 mt-0.5">⚠️</div>
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900 dark:text-yellow-200 mb-1">
                      Warning
                    </h4>
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">
                      Disabling encryption will make your goals visible to anyone with the URL. 
                      Make sure you want to remove this protection.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleDisableEncryption}
                  variant="destructive"
                  className="flex-1"
                >
                  Disable Encryption
                </Button>
                <Button
                  onClick={onClose}
                  variant="outline"
                  className="flex-1"
                >
                  Keep Enabled
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 