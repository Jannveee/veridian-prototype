'use client';

import { Zap, AlertCircle, AlertTriangle, ArrowUp, Copy, CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface RightPanelProps {
  results: {
    score: number;
    issues: any[];
    stats: any;
    isAuditing: boolean;
    audited: boolean;
    refactoredCode?: string;
  } | null;
}

export function RightPanel({ results }: RightPanelProps) {
  const [displayScore, setDisplayScore] = useState(0);
  const [copied, setCopied] = useState(false);

  const copyRefactoredCode = () => {
    if (results?.refactoredCode) {
      navigator.clipboard.writeText(results.refactoredCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  useEffect(() => {
    if (results?.audited) {
      // Animate score
      let start = 0;
      const end = results.score;
      const duration = 1000;
      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentScore = Math.floor(progress * end);
        setDisplayScore(currentScore);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    } else {
      setDisplayScore(0);
    }
  }, [results?.audited, results?.score]);

  const circ = 345;
  const strokeDashoffset = circ - (displayScore / 100) * circ;

  const getScoreLabel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-500', bg: 'bg-green-500/15', border: 'border-green-500/30' };
    if (score >= 60) return { label: 'Good', color: 'text-blue-500', bg: 'bg-blue-500/15', border: 'border-blue-500/30' };
    if (score >= 40) return { label: 'Fair', color: 'text-yellow-500', bg: 'bg-yellow-500/15', border: 'border-yellow-500/30' };
    return { label: 'Needs Optimization', color: 'text-red-500', bg: 'bg-red-500/15', border: 'border-red-500/30' };
  };

  const scoreInfo = getScoreLabel(displayScore);

  return (
    <div className="w-80 flex-shrink-0 glass border-l border-primary/20 flex flex-col overflow-y-auto">
      {/* Sustainability Gauge */}
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-4">
          Sustainability Score
        </h3>
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 140 140">
              <circle
                cx="70"
                cy="70"
                r="55"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="10"
              />
              <circle
                cx="70"
                cy="70"
                r="55"
                fill="none"
                stroke="#2a2a3a"
                strokeWidth="6"
              />
              <circle
                id="gaugeFill"
                cx="70"
                cy="70"
                r="55"
                fill="none"
                stroke={displayScore >= 70 ? "#39FF14" : displayScore >= 40 ? "#EAB308" : "#EF4444"}
                strokeWidth="6"
                strokeDasharray={circ}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                style={{
                  filter: `drop-shadow(0 0 8px ${displayScore >= 70 ? "rgba(57, 255, 20, 0.6)" : displayScore >= 40 ? "rgba(234, 179, 8, 0.6)" : "rgba(239, 68, 68, 0.6)"})`,
                  transition: 'stroke-dashoffset 0.5s ease-out',
                  transform: 'rotate(-90deg)',
                  transformOrigin: '70px 70px',
                }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-foreground" id="gaugeNum">
                {displayScore}
              </div>
              <div className="text-xs text-foreground/60">/ 100</div>
            </div>
          </div>
          <span
            id="gaugeLabel"
            className={`text-xs font-medium px-3 py-1.5 rounded-full ${scoreInfo.bg} ${scoreInfo.border} ${scoreInfo.color}`}
          >
            {scoreInfo.label}
          </span>
        </div>
      </div>

      {/* Carbon Stats */}
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-4">
          Carbon Intelligence
        </h3>
        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-background/40 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="text-7xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">
              CO₂ Savings
            </div>
            <div className="text-lg font-bold text-primary font-mono" id="co2Val">
              {results?.audited ? results.stats.co2SavedKg : '—'}
            </div>
            <div className="text-7xs text-foreground/50 mt-1">kg/year est.</div>
          </div>

          <div className="p-3 rounded-lg bg-background/40 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="text-7xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">
              CPU Cycles
            </div>
            <div className="text-lg font-bold text-primary font-mono" id="cpuVal">
              {results?.audited ? results.stats.cpuCyclesReduced : '—'}
            </div>
            <div className="text-7xs text-foreground/50 mt-1">% reduction</div>
          </div>

          <div className="p-3 rounded-lg bg-background/40 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="text-7xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">
              Energy Save
            </div>
            <div className="text-lg font-bold text-primary font-mono" id="energyVal">
              {results?.audited ? results.stats.energySaveKwh : '—'}
            </div>
            <div className="text-7xs text-foreground/50 mt-1">kWh/day</div>
          </div>

          <div className="p-3 rounded-lg bg-background/40 border border-primary/10 hover:border-primary/30 transition-colors">
            <div className="text-7xs font-semibold text-foreground/50 uppercase tracking-wider mb-1">
              Efficiency
            </div>
            <div className="text-lg font-bold text-primary font-mono" id="effVal">
              {results?.audited ? (results.score >= 80 ? 'A' : results.score >= 60 ? 'B' : results.score >= 40 ? 'C' : 'D') : '—'}
            </div>
            <div className="text-7xs text-foreground/50 mt-1">grade</div>
          </div>
        </div>
      </div>

      {/* Carbon Leaks */}
      <div className="p-6 border-b border-primary/10">
        <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-4">
          Carbon Leaks Detected
        </h3>
        <div id="issuesList" className="space-y-3">
          {results?.audited && results.issues.length > 0 ? (
            results.issues.map((issue, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${issue.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'} text-xs font-bold mt-0.5`}>
                  {issue.severity === 'high' ? '!' : '⚠'}
                </div>
                <div>
                  <p className="text-sm text-foreground">{issue.message}</p>
                  <p className="text-xs text-foreground/50 mt-0.5">Penalty: -{issue.penalty} points</p>
                </div>
              </div>
            ))
          ) : results?.audited ? (
            <div className="text-sm text-foreground/50 italic">No carbon leaks detected! Excellent work.</div>
          ) : (
            <div className="text-sm text-foreground/50 italic">Run an audit to detect carbon leaks...</div>
          )}
        </div>
      </div>

      {/* Green Refactor */}
      <div className="p-6">
        <h3 className="text-xs font-semibold text-foreground/60 uppercase tracking-widest mb-4">
          Green Refactor
        </h3>
        <div className="rounded-lg border border-primary/10 overflow-hidden glass">
          <div className="flex items-center justify-between p-2.5 bg-primary/5 border-b border-primary/10">
            <span className="text-xs font-semibold text-primary font-mono">optimized.js</span>
            <div className="flex items-center gap-2">
              <span
                id="refactorBadge"
                className={`text-7xs font-semibold px-2 py-0.5 rounded bg-background border border-primary/20 ${results?.audited ? 'text-primary' : 'text-foreground/60'}`}
                style={results?.audited ? { background: 'var(--neon-dim)', color: 'var(--neon)' } : {}}
              >
                {results?.audited ? 'READY' : 'PENDING'}
              </span>
            </div>
          </div>
          <div
            id="refactorCode"
            className="p-3 text-xs font-mono max-h-48 overflow-y-auto text-foreground/80 relative group/code"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#2a2a3a transparent',
            }}
          >
            {results?.audited ? (
              <>
                <pre className="whitespace-pre-wrap break-all text-[10px] pb-8">
                  {results.refactoredCode || "Code is already optimized."}
                </pre>
                {results.refactoredCode && (
                  <button
                    onClick={copyRefactoredCode}
                    className="absolute bottom-2 right-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] px-2 py-1 rounded border border-primary/20 transition-all flex items-center gap-1.5"
                  >
                    {copied ? (
                      <CheckCircle className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                    {copied ? 'Copied!' : 'Copy Optimized Code'}
                  </button>
                )}
              </>
            ) : (
              <div className="text-foreground/50">Run an audit to generate green refactor suggestions...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
