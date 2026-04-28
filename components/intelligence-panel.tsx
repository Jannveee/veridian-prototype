'use client';

import { motion } from 'framer-motion';
import { SustainabilityGauge } from './sustainability-gauge';
import { CarbonStats } from './carbon-stats';

interface IntelligencePanelProps {
  sustainabilityScore?: number;
  co2Savings?: string;
  cpuOptimization?: string;
}

export function IntelligencePanel({
  sustainabilityScore = 0,
  co2Savings = 'Pending',
  cpuOptimization = 'Pending',
}: IntelligencePanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="flex flex-col gap-4 h-full"
    >
      {/* Sustainability Gauge - Takes more space */}
      <div className="flex-1 min-h-0">
        <SustainabilityGauge score={sustainabilityScore} />
      </div>

      {/* Carbon Stats */}
      <div className="flex-shrink-0">
        <CarbonStats co2Savings={co2Savings} cpuOptimization={cpuOptimization} />
      </div>
    </motion.div>
  );
}
