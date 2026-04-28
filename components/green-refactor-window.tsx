'use client';

import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface GreenRefactorWindowProps {
  optimizedCode?: string;
  explanation?: string;
  recommendations?: string[];
  isLoading?: boolean;
}

export function GreenRefactorWindow({
  optimizedCode = 'Run an audit to see optimized code...',
  explanation = '',
  recommendations = [],
  isLoading = false,
}: GreenRefactorWindowProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(optimizedCode || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="glass rounded-xl overflow-hidden flex flex-col h-full"
    >
      {/* Header */}
      <div className="border-b border-primary/20 p-4 bg-background/40">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              Optimized Green Code
            </h3>
            <p className="text-xs text-foreground/50 mt-1">AI-suggested refactoring</p>
          </div>
          <button
            onClick={copyToClipboard}
            disabled={!optimizedCode || isLoading}
            className="p-2 rounded-lg hover:glass transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            title="Copy to clipboard"
          >
            {copied ? (
              <CheckCircle className="w-5 h-5 text-primary" />
            ) : (
              <Copy className="w-5 h-5 text-foreground/60 hover:text-primary" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-sm text-foreground/60">Analyzing code...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Code Block */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                Refactored Code
              </h4>
              <pre className="bg-background/60 rounded-lg p-3 text-xs overflow-x-auto border border-primary/10 text-primary/90 font-mono leading-relaxed max-h-48">
                <code>{optimizedCode || 'No optimizations found'}</code>
              </pre>
            </div>

            {/* Explanation */}
            {explanation && (
              <div className="space-y-2 pt-3 border-t border-primary/10">
                <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                  What Changed
                </h4>
                <p className="text-xs text-foreground/70 leading-relaxed">{explanation}</p>
              </div>
            )}

            {/* Recommendations */}
            {recommendations && recommendations.length > 0 && (
              <div className="space-y-2 pt-3 border-t border-primary/10">
                <h4 className="text-xs font-semibold text-foreground/70 uppercase tracking-wider">
                  Key Recommendations
                </h4>
                <ul className="space-y-1">
                  {recommendations.map((rec, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-foreground/70 flex gap-2"
                    >
                      <span className="text-primary mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
