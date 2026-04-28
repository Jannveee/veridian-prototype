'use client';

import { Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface RunAuditButtonProps {
  onClick?: () => void;
  isLoading?: boolean;
  disabled?: boolean;
}

export function RunAuditButton({
  onClick,
  isLoading = false,
  disabled = false,
}: RunAuditButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="relative w-full group disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {/* Glow background */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 ${
          isLoading
            ? 'bg-primary/40 blur-xl'
            : 'bg-primary/20 blur-lg group-hover:blur-xl group-hover:bg-primary/40'
        }`}
      />

      {/* Button content */}
      <div
        className={`relative px-6 py-3 rounded-lg border-2 border-primary font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
          isLoading
            ? 'bg-primary/20 text-primary'
            : 'bg-background hover:bg-primary/10 text-primary'
        }`}
      >
        {isLoading ? (
          <>
            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span>Auditing Code...</span>
          </>
        ) : (
          <>
            <Zap className="w-4 h-4" />
            <span>Run Green Audit</span>
          </>
        )}
      </div>

      {/* Animated glow on hover */}
      {!isLoading && !disabled && (
        <>
          <motion.div
            animate={{
              boxShadow: [
                '0 0 20px rgba(57, 255, 20, 0.4)',
                '0 0 30px rgba(57, 255, 20, 0.6)',
                '0 0 20px rgba(57, 255, 20, 0.4)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-lg pointer-events-none"
          />
        </>
      )}
    </motion.button>
  );
}
