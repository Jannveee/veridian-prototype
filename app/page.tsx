'use client';

import { useState } from 'react';
import { DashboardWrapper } from '@/components/dashboard-wrapper';
import IntroAnimation from '@/components/intro-animation';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  return (
    <>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <div
        id="app"
        className={!showIntro ? 'visible' : ''}
        style={{ visibility: showIntro ? 'hidden' : 'visible' }}
      >
        <DashboardWrapper />
      </div>
    </>
  );
}
