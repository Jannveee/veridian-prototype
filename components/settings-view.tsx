'use client';

import { useState } from 'react';
import { Check, Github, Code2 } from 'lucide-react';

export function SettingsView() {
  const [language, setLanguage] = useState<string>('javascript');
  const [carbonUnit, setCarbonUnit] = useState<string>('kg');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    highRisk: true,
  });
  const [integrations, setIntegrations] = useState({
    github: { connected: false, username: '' },
    vscode: { connected: true, version: '1.8.0' },
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const toggleIntegration = (key: keyof typeof integrations) => {
    setIntegrations({
      ...integrations,
      [key]: { ...integrations[key], connected: !integrations[key].connected },
    });
  };

  return (
    <div className="space-y-8 pb-8 max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-foreground/60">Customize your Veridian experience</p>
      </div>

      {/* Audit Language Preference */}
      <div className="glass p-6 rounded-lg border border-primary/20 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Audit Language</h2>
        <p className="text-sm text-foreground/60">Choose which programming languages to audit</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { label: 'JavaScript', value: 'javascript' },
            { label: 'Python', value: 'python' },
            { label: 'TypeScript', value: 'typescript' },
            { label: 'Java', value: 'java' },
            { label: 'Go', value: 'go' },
            { label: 'Rust', value: 'rust' },
          ].map((lang) => (
            <button
              key={lang.value}
              onClick={() => setLanguage(lang.value)}
              className={`p-3 rounded-lg font-medium transition-all flex items-center justify-between ${
                language === lang.value
                  ? 'bg-primary text-primary-foreground neon-glow'
                  : 'bg-background border border-primary/20 text-foreground hover:border-primary/40'
              }`}
            >
              <span>{lang.label}</span>
              {language === lang.value && <Check className="w-4 h-4" />}
            </button>
          ))}
        </div>
      </div>

      {/* Carbon Calculation Units */}
      <div className="glass p-6 rounded-lg border border-primary/20 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Carbon Units</h2>
        <p className="text-sm text-foreground/60">Choose how carbon emissions are displayed</p>
        
        <div className="flex gap-3">
          {[
            { label: 'Kilograms (kg)', value: 'kg' },
            { label: 'Pounds (lb)', value: 'lb' },
            { label: 'Metric Tons (mt)', value: 'mt' },
          ].map((unit) => (
            <button
              key={unit.value}
              onClick={() => setCarbonUnit(unit.value)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                carbonUnit === unit.value
                  ? 'bg-primary text-primary-foreground neon-glow'
                  : 'bg-background border border-primary/20 text-foreground hover:border-primary/40'
              }`}
            >
              {unit.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="glass p-6 rounded-lg border border-primary/20 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
        <p className="text-sm text-foreground/60">Control how you receive audit alerts</p>
        
        <div className="space-y-3">
          {[
            { key: 'email', label: 'Email Notifications', description: 'Receive audit results via email' },
            { key: 'push', label: 'Push Notifications', description: 'Get instant alerts on your device' },
            { key: 'highRisk', label: 'High Risk Alerts', description: 'Notify only for severe carbon leaks' },
          ].map((notif) => (
            <button
              key={notif.key}
              onClick={() => toggleNotification(notif.key as keyof typeof notifications)}
              className="w-full flex items-center justify-between p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors border border-primary/10"
            >
              <div className="text-left">
                <p className="font-medium text-foreground">{notif.label}</p>
                <p className="text-sm text-foreground/60">{notif.description}</p>
              </div>
              <div
                className={`w-12 h-7 rounded-full flex items-center transition-all ${
                  notifications[notif.key as keyof typeof notifications]
                    ? 'bg-primary'
                    : 'bg-foreground/20'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    notifications[notif.key as keyof typeof notifications] ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Integrations */}
      <div className="glass p-6 rounded-lg border border-primary/20 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Connected Integrations</h2>
        <p className="text-sm text-foreground/60">Manage your developer tool integrations</p>
        
        <div className="space-y-3">
          {/* GitHub */}
          <div className="p-4 rounded-lg bg-background/50 border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Github className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">GitHub</p>
                <p className="text-sm text-foreground/60">
                  {integrations.github.connected ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleIntegration('github')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                integrations.github.connected
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-primary/20 text-primary hover:bg-primary/30'
              }`}
            >
              {integrations.github.connected ? 'Disconnect' : 'Connect'}
            </button>
          </div>

          {/* VS Code */}
          <div className="p-4 rounded-lg bg-background/50 border border-primary/10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Code2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-medium text-foreground">VS Code Extension</p>
                <p className="text-sm text-foreground/60">
                  {integrations.vscode.connected
                    ? `Connected (v${integrations.vscode.version})`
                    : 'Not installed'}
                </p>
              </div>
            </div>
            <button
              onClick={() => toggleIntegration('vscode')}
              className={`px-4 py-2 rounded-lg font-medium transition-all ${
                integrations.vscode.connected
                  ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                  : 'bg-primary/20 text-primary hover:bg-primary/30'
              }`}
            >
              {integrations.vscode.connected ? 'Disconnect' : 'Install'}
            </button>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="glass p-6 rounded-lg border border-red-500/20 space-y-4">
        <h2 className="text-xl font-semibold text-red-400">Danger Zone</h2>
        <p className="text-sm text-foreground/60">These actions cannot be undone</p>
        
        <button className="w-full px-6 py-3 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 font-medium transition-all">
          Clear All Audit History
        </button>
        <button className="w-full px-6 py-3 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 font-medium transition-all">
          Reset All Settings
        </button>
      </div>
    </div>
  );
}
