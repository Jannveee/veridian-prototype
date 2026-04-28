'use client';

import { useState, useCallback } from 'react';
import { Sidebar } from './sidebar';
import { DashboardView } from './dashboard-view';
import { AuditWorkspace } from './audit-workspace';
import { HistoryView } from './history-view';
import { SettingsView } from './settings-view';
import { RightPanel } from './right-panel';
import { runGreenAudit, calculateSustainability, getCarbonStats } from '../veridianCore';

export function DashboardWrapper() {
  const [activeView, setActiveView] = useState<'dashboard' | 'audit' | 'history' | 'settings'>('dashboard');
  const [auditResults, setAuditResults] = useState<{
    score: number;
    issues: any[];
    stats: any;
    isAuditing: boolean;
    audited: boolean;
  } | null>(null);

  const handleStartAudit = () => {
    setActiveView('audit');
  };

  const handleAuditComplete = useCallback((code: string) => {
    setAuditResults(prev => ({ ...prev, isAuditing: true } as any));
    
    // Simulate processing time for the UI effect
    setTimeout(() => {
      const issues = runGreenAudit(code);
      const score = calculateSustainability(issues);
      const stats = getCarbonStats(score);
      
      setAuditResults({
        score,
        issues,
        stats,
        isAuditing: false,
        audited: true
      });
    }, 2800);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard':
        return <DashboardView onStartAudit={handleStartAudit} />;
      case 'audit':
        return <AuditWorkspace onAuditComplete={handleAuditComplete} externalResults={auditResults} />;
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView onStartAudit={handleStartAudit} />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - Fixed */}
      <Sidebar activeTab={activeView} onTabChange={setActiveView} />

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden ml-20">
        {/* Content Workspace */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top Bar */}
          <div className="h-14 flex-shrink-0 border-b border-primary/20 bg-card/50 glass flex items-center px-6">
            <h2 className="font-semibold text-foreground capitalize">
              {activeView === 'dashboard' && 'Dashboard'}
              {activeView === 'audit' && 'Audit Workspace'}
              {activeView === 'history' && 'Audit History'}
              {activeView === 'settings' && 'Settings'}
            </h2>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto px-8 py-8">
            {renderView()}
          </div>
        </div>

        {/* Right Panel - Persistent across all views */}
        <RightPanel results={auditResults} />
      </div>
    </div>
  );
}
