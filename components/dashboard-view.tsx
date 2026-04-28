'use client';

import { ArrowRight, TrendingUp, Zap } from 'lucide-react';

interface RecentAudit {
  id: string;
  filename: string;
  score: number;
  date: string;
  savings: number;
}

const recentAudits: RecentAudit[] = [
  { id: '1', filename: 'api-handler.js', score: 78, date: '2 hours ago', savings: 2.4 },
  { id: '2', filename: 'utils.py', score: 65, date: '1 day ago', savings: 1.8 },
  { id: '3', filename: 'database.ts', score: 82, date: '3 days ago', savings: 3.2 },
  { id: '4', filename: 'middleware.js', score: 71, date: '1 week ago', savings: 1.5 },
];

export function DashboardView({ onStartAudit }: { onStartAudit: () => void }) {
  const totalSavings = recentAudits.reduce((sum, audit) => sum + audit.savings, 0);
  const avgScore = Math.round(recentAudits.reduce((sum, audit) => sum + audit.score, 0) / recentAudits.length);

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-foreground/60">Track your code sustainability progress</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total CO₂ Savings */}
        <div className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm font-medium mb-1">Total CO₂ Savings</p>
              <p className="text-4xl font-bold text-primary">{totalSavings.toFixed(1)} kg</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-primary">
            <TrendingUp className="w-4 h-4" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Average Score */}
        <div className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm font-medium mb-1">Average Sustainability</p>
              <p className="text-4xl font-bold text-primary">{avgScore}</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-sm text-foreground/60">Across all audits</div>
        </div>

        {/* Recent Audits Count */}
        <div className="glass p-6 rounded-lg border border-primary/20 hover:border-primary/40 transition-all">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-foreground/60 text-sm font-medium mb-1">Audits Completed</p>
              <p className="text-4xl font-bold text-primary">{recentAudits.length}</p>
            </div>
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-6 h-6 text-primary" />
            </div>
          </div>
          <div className="text-sm text-foreground/60">This month</div>
        </div>
      </div>

      {/* Recent Audits Section */}
      <div className="glass p-6 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground mb-6">Recent Audits</h2>
        <div className="space-y-4">
          {recentAudits.map((audit) => (
            <div
              key={audit.id}
              className="flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-primary/10"
            >
              <div className="flex-1">
                <p className="font-medium text-foreground">{audit.filename}</p>
                <p className="text-sm text-foreground/60">{audit.date}</p>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-semibold text-primary">{audit.score}</p>
                  <p className="text-xs text-foreground/60">score</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{audit.savings} kg CO₂</p>
                  <p className="text-xs text-foreground/60">saved</p>
                </div>
                <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Button */}
      <button
        onClick={onStartAudit}
        className="w-full py-3 px-6 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg neon-glow-hover transition-all"
      >
        Start New Audit
      </button>
    </div>
  );
}
