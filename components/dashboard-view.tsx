'use client';

import { ArrowRight, TrendingUp, Zap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { getAuditHistory } from '../veridianCore';

interface RecentAudit {
  id: string;
  filename: string;
  score: number;
  date: string;
  co2Saved: string;
}

export function DashboardView({ onStartAudit }: { onStartAudit: () => void }) {
  const [recentAudits, setRecentAudits] = useState<RecentAudit[]>([]);

  useEffect(() => {
    setRecentAudits(getAuditHistory().slice(0, 4));
  }, []);

  const totalSavings = recentAudits.reduce((sum, audit) => sum + parseFloat(audit.co2Saved), 0);
  const avgScore = recentAudits.length > 0 ? Math.round(recentAudits.reduce((sum, audit) => sum + audit.score, 0) / recentAudits.length) : 0;

  return (
    <div className="space-y-8 pb-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl glass border border-primary/20 p-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Welcome to <span className="text-primary neon-text">Veridian</span>
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mb-8">
            Your green code audit platform. We analyze your codebase for carbon leaks, 
            inefficient algorithms, and server waste to help you build sustainable software.
          </p>
          <button 
            onClick={onStartAudit}
            className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-all neon-glow"
          >
            <Zap className="w-5 h-5 fill-current" />
            Start New Audit
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Total Audits</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
          </div>
          <div className="text-3xl font-bold text-foreground">{recentAudits.length}</div>
        </div>

        <div className="glass p-6 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Avg Sustainability</h3>
            <div className="p-2 bg-green-500/10 rounded-lg text-green-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-green-400">{avgScore}</div>
            <div className="text-sm text-foreground/60">/ 100</div>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-foreground/60 uppercase tracking-wider">Total CO₂ Saved</h3>
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-primary">{totalSavings.toFixed(1)}</div>
            <div className="text-sm text-foreground/60">kg</div>
          </div>
        </div>
      </div>

      {/* Recent Audits */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-foreground">Recent Audits</h2>
          <button className="text-sm text-primary hover:text-primary/80 flex items-center gap-1 transition-colors">
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recentAudits.map((audit) => (
            <div key={audit.id} className="glass p-5 rounded-xl border border-primary/10 hover:border-primary/30 transition-all flex items-center justify-between cursor-pointer group">
              <div className="flex-1">
                <p className="font-medium text-foreground">{audit.filename}</p>
                <p className="text-sm text-foreground/60">{new Date(audit.date).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-semibold text-primary">{audit.score}</p>
                  <p className="text-xs text-foreground/60">score</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{audit.co2Saved} kg CO₂</p>
                  <p className="text-xs text-foreground/60">saved</p>
                </div>
                <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}