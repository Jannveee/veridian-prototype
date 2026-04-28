'use client';

import { Leaf, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface CarbonStatsProps {
  co2Savings?: string;
  cpuOptimization?: string;
}

export function CarbonStats({
  co2Savings = 'Pending',
  cpuOptimization = 'Pending',
}: CarbonStatsProps) {
  const statVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
  };

  return (
    <div className="space-y-3">
      {/* CO2 Savings */}
      <motion.div
        custom={0}
        initial="hidden"
        animate="visible"
        variants={statVariants}
        className="glass rounded-lg p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Leaf className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-foreground/60 uppercase tracking-wider">
              CO2 Savings
            </p>
            <p className="text-lg font-bold text-primary mt-1">{co2Savings}</p>
          </div>
        </div>
      </motion.div>

      {/* CPU Optimization */}
      <motion.div
        custom={1}
        initial="hidden"
        animate="visible"
        variants={statVariants}
        className="glass rounded-lg p-4 border border-primary/30 hover:border-primary/60 transition-all duration-300"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-foreground/60 uppercase tracking-wider">
              CPU Optimization
            </p>
            <p className="text-lg font-bold text-primary mt-1">{cpuOptimization}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
