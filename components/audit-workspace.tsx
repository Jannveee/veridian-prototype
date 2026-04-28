'use client';

import { useState, useEffect } from 'react';
import { Play, Code2, AlertTriangle, FileCode } from 'lucide-react';

interface AuditWorkspaceProps {
  onAuditComplete: (code: string, filename: string) => void;
  externalResults: {
    isAuditing: boolean;
    audited: boolean;
  } | null;
}

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

export function AuditWorkspace({ onAuditComplete, externalResults }: AuditWorkspaceProps) {
  const [code, setCode] = useState(jsDefault);
  const [language, setLanguage] = useState<'js' | 'py'>('js');
  const [lastAuditedCode, setLastAuditedCode] = useState<string | null>(null);

  useEffect(() => {
    setCode(language === 'py' ? pyDefault : jsDefault);
    setLastAuditedCode(null);
  }, [language]);

  const isAuditing = externalResults?.isAuditing || false;
  const audited = externalResults?.audited || false;
  
  const isCodeUnchanged = lastAuditedCode !== null && code === lastAuditedCode;
  const showAuditedState = audited && isCodeUnchanged;

  const runAudit = () => {
    if (isAuditing || showAuditedState) return;
    setLastAuditedCode(code);
    const filename = language === 'py' ? 'audit.py' : 'audit.js';
    onAuditComplete(code, filename);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Audit Workspace</h1>
        <p className="text-foreground/60">Analyze your code for carbon leaks and inefficiencies.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Editor Area */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              <FileCode className="w-5 h-5 text-primary" />
              Code Input
            </h2>
            <select 
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'js' | 'py')}
              className="bg-background border border-primary/30 text-sm rounded-md px-3 py-1.5 text-foreground/80 focus:outline-none focus:border-primary"
            >
              <option value="js">JavaScript</option>
              <option value="py">Python</option>
            </select>
          </div>

          <div className="glass rounded-xl border border-primary/20 overflow-hidden flex flex-col group transition-all hover:border-primary/40 relative">
            <div className="h-10 bg-background/50 border-b border-primary/10 flex items-center px-4 gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-foreground/40 ml-4">{language === 'py' ? 'audit.py' : 'audit.js'}</span>
            </div>
            
            <div className="relative">
              {/* Line numbers mock */}
              <div className="absolute left-0 top-0 bottom-0 w-12 bg-background/30 border-r border-primary/10 flex flex-col py-4 items-end pr-3 text-xs font-mono text-foreground/30 select-none">
                {[...Array(20)].map((_, i) => <span key={i}>{i + 1}</span>)}
              </div>
              
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-[400px] bg-transparent p-4 pl-16 font-mono text-sm text-foreground/90 focus:outline-none resize-none"
                placeholder="Paste your code here..."
                spellCheck="false"
              />
            </div>
          </div>
        </div>

        {/* Audit Button */}
        <button
          id="auditBtn"
          onClick={runAudit}
          disabled={isAuditing || showAuditedState}
          className={`w-full py-3 px-6 rounded-lg border font-semibold transition-all neon-glow-hover relative overflow-hidden group ${
            showAuditedState 
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
            ) : showAuditedState ? (
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
    </div>
  );
}