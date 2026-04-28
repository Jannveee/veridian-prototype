'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SustainabilityGaugeProps {
  score: number; // 0-100
}

export function SustainabilityGauge({ score = 0 }: SustainabilityGaugeProps) {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    if (circleRef.current) {
      const radius = circleRef.current.r.baseVal.value;
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - (score / 100) * circumference;
      circleRef.current.style.strokeDashoffset = offset.toString();
    }
  }, [score]);

  return (
    <div className="glass rounded-2xl p-6 h-full flex flex-col items-center justify-center gap-4">
      <h3 className="text-sm font-semibold text-foreground/70 uppercase tracking-wider">
        Sustainability Score
      </h3>

      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* SVG Circular Progress */}
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 200 200">
          {/* Background circle */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(57, 255, 20, 0.1)"
            strokeWidth="8"
          />
          {/* Progress circle */}
          <circle
            ref={circleRef}
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#39FF14"
            strokeWidth="8"
            strokeDasharray="565.48"
            strokeDashoffset="565.48"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out filter drop-shadow-lg"
            style={{ filter: 'drop-shadow(0 0 8px rgba(57, 255, 20, 0.6))' }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute flex flex-col items-center gap-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-bold text-primary"
          >
            {Math.round(score)}
          </motion.div>
          <span className="text-xs text-foreground/60 font-medium">/ 100</span>
        </div>
      </div>

      {/* Score interpretation */}
      <div className="text-center mt-2">
        <p className="text-xs text-foreground/60">
          {score >= 80
            ? '🌿 Excellent sustainability'
            : score >= 60
              ? '⚡ Good optimization'
              : score >= 40
                ? '⚙️ Room for improvement'
                : '🔴 Needs optimization'}
        </p>
      </div>
    </div>
  );
}
