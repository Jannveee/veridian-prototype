'use client';

import { useState, useEffect } from 'react';

interface AuditWorkspaceProps {
  onAuditComplete: (code: string) => void;
  externalResults: {
    isAuditing: boolean;
    audited: boolean;
  } | null;
}

export function AuditWorkspace({ onAuditComplete, externalResults }: AuditWorkspaceProps) {
  const [language, setLanguage] = useState<'js' | 'py'>('js');
  const [code, setCode] = useState('');

  // Default code snippets
  const jsDefault = `// ⚠ Carbon Audit Target — audit.js

const userData = fetchUser(id);

// ⚠ CARBON LEAK: infinite loop — CPU waste
while(true) {
  fetchUserData(userId); // redundant call
  processData(arr[i]);
}

// ⚠ O(n²) sort — inefficient algorithm
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    if (arr[i] > arr[j]) { swap(arr, i, j); }
  }
}`;

  const pyDefault = `# ⚠ Carbon Audit Target — audit.py

# ⚠ CARBON LEAK: blocking infinite loop
while True:
    data = fetch_user(user_id)  # redundant
    process(data)

# O(n²) bubble sort — use sorted() instead
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]`;

  useEffect(() => {
    setCode(language === 'py' ? pyDefault : jsDefault);
  }, [language]);

  const isAuditing = externalResults?.isAuditing || false;
  const audited = externalResults?.audited || false;

  const runAudit = () => {
    if (audited || isAuditing) return;
    onAuditComplete(code);
  };

  return (
    <>
      <div className="space-y-6 w-full h-full flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-primary/20">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Code Input</h2>
            <p className="text-sm text-foreground/60">Paste your code below to begin green audit analysis</p>
          </div>
          <select
            className="px-3 py-2 rounded-lg bg-background border border-primary/20 text-foreground text-sm font-medium cursor-pointer"
            value={language}
            onChange={(e) => setLanguage(e.target.value as 'js' | 'py')}
          >
            <option value="js">JavaScript</option>
            <option value="py">Python</option>
          </select>
        </div>

        {/* Code Editor */}
        <div className="flex-1 glass rounded-lg border border-primary/20 overflow-hidden flex flex-col">
          <div className="border-b border-primary/10 bg-background/50 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <span className="text-xs text-foreground/60 font-mono ml-2">{language === 'py' ? 'audit.py' : 'audit.js'}</span>
          </div>
          <textarea
            className="flex-1 w-full bg-transparent p-4 font-mono text-sm text-foreground/80 outline-none resize-none"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck={false}
            placeholder="Paste your code here..."
          />
        </div>

        {/* Audit Button */}
        <button
          id="auditBtn"
          onClick={runAudit}
          disabled={isAuditing || audited}
          className={`w-full py-3 px-6 rounded-lg border font-semibold transition-all neon-glow-hover relative overflow-hidden group ${
            audited 
              ? 'border-primary bg-primary/10 text-primary cursor-default' 
              : 'border-primary text-primary hover:shadow-lg'
          }`}
        >
          {isAuditing && (
            <div id="scanBar" className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-[shimmer_2s_infinite]"></div>
          )}
          <span id="auditBtnText" className="relative z-10 flex items-center justify-center gap-2">
            {isAuditing ? (
              <>Analyzing Carbon Footprint...</>
            ) : audited ? (
              <>✓ Audit Complete</>
            ) : (
              <>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                </svg>
                Run Green Audit
              </>
            )}
          </span>
        </button>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </>
  );
}
