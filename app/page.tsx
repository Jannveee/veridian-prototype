'use client';

import { useState } from 'react';
import  { IntroAnimation } from '@/components/intro-animation';
import { DashboardWrapper } from '@/components/dashboard-wrapper';

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);

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