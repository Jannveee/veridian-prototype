'use client';

import { useState } from 'react';
import { Eye, Filter, Download } from 'lucide-react';

interface Audit {
  id: string;
  filename: string;
  date: string;
  score: number;
  leaks: number;
  savings: number;
}

const auditHistory: Audit[] = [
  { id: '1', filename: 'api-handler.js', date: '2024-04-25', score: 78, leaks: 3, savings: 2.4 },
  { id: '2', filename: 'utils.py', date: '2024-04-24', score: 65, leaks: 5, savings: 1.8 },
  { id: '3', filename: 'database.ts', date: '2024-04-22', score: 82, leaks: 2, savings: 3.2 },
  { id: '4', filename: 'middleware.js', date: '2024-04-19', score: 71, leaks: 4, savings: 1.5 },
  { id: '5', filename: 'services.py', date: '2024-04-18', score: 88, leaks: 1, savings: 2.8 },
  { id: '6', filename: 'components.tsx', date: '2024-04-15', score: 76, leaks: 3, savings: 2.1 },
  { id: '7', filename: 'hooks.ts', date: '2024-04-12', score: 81, leaks: 2, savings: 2.7 },
  { id: '8', filename: 'worker.js', date: '2024-04-10', score: 59, leaks: 7, savings: 1.2 },
];

export function HistoryView() {
  const [filterScore, setFilterScore] = useState<[number, number]>([0, 100]);
  const [filterDate, setFilterDate] = useState<string>('all');

  const filteredAudits = auditHistory.filter((audit) => {
    const scoreMatch = audit.score >= filterScore[0] && audit.score <= filterScore[1];
    if (filterDate === 'all') return scoreMatch;
    
    const auditDate = new Date(audit.date);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - auditDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (filterDate === 'week' && diffDays <= 7) return scoreMatch;
    if (filterDate === 'month' && diffDays <= 30) return scoreMatch;
    if (filterDate === 'all') return scoreMatch;
    return false;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Audit History</h1>
        <p className="text-foreground/60">View all past sustainability audits</p>
      </div>

      {/* Filter Bar */}
      <div className="glass p-6 rounded-lg border border-primary/20 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Score Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-3">
              Sustainability Score: {filterScore[0]} - {filterScore[1]}
            </label>
            <div className="flex gap-3">
              <input
                type="range"
                min="0"
                max="100"
                value={filterScore[0]}
                onChange={(e) => setFilterScore([parseInt(e.target.value), filterScore[1]])}
                className="flex-1 h-2 bg-background rounded-lg cursor-pointer"
              />
              <input
                type="range"
                min="0"
                max="100"
                value={filterScore[1]}
                onChange={(e) => setFilterScore([filterScore[0], parseInt(e.target.value)])}
                className="flex-1 h-2 bg-background rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Date Range Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-3">Time Period</label>
            <div className="flex gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'Last 7 Days', value: 'week' },
                { label: 'Last 30 Days', value: 'month' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilterDate(option.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    filterDate === option.value
                      ? 'bg-primary text-primary-foreground neon-glow'
                      : 'bg-background hover:bg-background/80 text-foreground/70'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Audits Table */}
      <div className="glass p-6 rounded-lg border border-primary/20 overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-primary/10">
              <th className="text-left py-4 px-4 font-semibold text-foreground/80">Filename</th>
              <th className="text-left py-4 px-4 font-semibold text-foreground/80">Date</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground/80">Score</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground/80">Carbon Leaks</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground/80">CO₂ Saved</th>
              <th className="text-center py-4 px-4 font-semibold text-foreground/80">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAudits.length > 0 ? (
              filteredAudits.map((audit) => (
                <tr
                  key={audit.id}
                  className="border-b border-primary/10 hover:bg-background/50 transition-colors"
                >
                  <td className="py-4 px-4 font-medium text-foreground">{audit.filename}</td>
                  <td className="py-4 px-4 text-foreground/70">{audit.date}</td>
                  <td className={`py-4 px-4 text-center font-semibold ${getScoreColor(audit.score)}`}>
                    {audit.score}
                  </td>
                  <td className="py-4 px-4 text-center text-foreground/80">{audit.leaks}</td>
                  <td className="py-4 px-4 text-center font-semibold text-primary">{audit.savings} kg</td>
                  <td className="py-4 px-4 text-center">
                    <button className="inline-flex items-center gap-2 p-2 hover:bg-primary/10 rounded-lg transition-colors text-primary">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">View</span>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-8 text-center text-foreground/60">
                  No audits found matching your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Export Button */}
      <button className="flex items-center gap-2 px-6 py-3 bg-background border border-primary/30 rounded-lg hover:border-primary/60 text-foreground font-medium transition-all">
        <Download className="w-4 h-4" />
        Export History as CSV
      </button>
    </div>
  );
}
