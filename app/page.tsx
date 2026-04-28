'use client';

import { useState, useEffect } from 'react';
import IntroAnimation from '@/components/intro-animation';
import { DashboardWrapper } from '@/components/dashboard-wrapper';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-background selection:bg-primary/30 selection:text-primary">
      {showIntro ? (
        <IntroAnimation onComplete={() => setShowIntro(false)} />
      ) : (
        <DashboardWrapper />
      )}
    </main>
  );
}