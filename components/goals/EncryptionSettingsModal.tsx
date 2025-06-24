"use client";

import { Button } from "@/components/ui/button";

interface EncryptionSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function EncryptionSettingsModal({ isOpen, onClose }: EncryptionSettingsModalProps) {
  const isEncryptionEnabled = process.env.NEXT_PUBLIC_ENABLE_ENCRYPTION === 'true';
  const isCompressionEnabled = process.env.NEXT_PUBLIC_ENABLE_COMPRESSION === 'true';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Security & Storage Settings
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
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isEncryptionEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {isEncryptionEnabled ? 'Encryption Enabled' : 'Encryption Disabled'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isEncryptionEnabled 
                      ? 'Your goals are encrypted in the URL'
                      : 'Your goals are stored in plain text in the URL'
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isCompressionEnabled ? 'bg-green-500' : 'bg-gray-400'}`} />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {isCompressionEnabled ? 'Compression Enabled' : 'Compression Disabled'}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isCompressionEnabled 
                      ? 'URL data is compressed to save space'
                      : 'URL data is stored uncompressed'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 mt-0.5">🔗</div>
              <div>
                <h4 className="text-sm font-medium text-blue-900 dark:text-blue-200 mb-1">
                  Powered by Slug Store
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300">
                  Your goals are automatically saved to the URL using advanced compression and optional encryption. 
                  No database required - everything is shareable and persistent!
                </p>
              </div>
            </div>
          </div>

          {/* Configuration Info */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Current Configuration
            </h4>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Encryption:</span>
                <span className="font-mono">{isEncryptionEnabled ? 'ENABLED' : 'DISABLED'}</span>
              </div>
              <div className="flex justify-between">
                <span>Compression:</span>
                <span className="font-mono">{isCompressionEnabled ? 'ENABLED' : 'DISABLED'}</span>
              </div>
              <div className="flex justify-between">
                <span>Debounce:</span>
                <span className="font-mono">500ms</span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={onClose}
              className="flex-1"
            >
              Got it!
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 