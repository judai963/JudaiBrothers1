import React from 'react';
import { motion } from 'framer-motion';

interface JBLogoProps {
  variant?: 'full' | 'mark-only' | 'light' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const JBLogo: React.FC<JBLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: { mark: 40, text: 'text-sm', sub: 'text-[8.5px]' },
    md: { mark: 50, text: 'text-base', sub: 'text-[9.5px]' },
    lg: { mark: 64, text: 'text-xl', sub: 'text-[11px]' },
    xl: { mark: 80, text: 'text-2xl', sub: 'text-xs' },
  };

  const currentSize = sizeMap[size];

  // Futuristic Animated Mark
  const Mark = (
    <motion.div
      id="jb-brand-mark"
      className="relative flex items-center justify-center shrink-0 drop-shadow-xl"
      style={{ width: currentSize.mark, height: currentSize.mark }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      <img 
        src={variant === 'light' ? "/judai-mark-for-light-bg.png" : "/judai-mark-for-dark-bg.png"}
        alt="Judai Brothers Logo Mark"
        className="relative w-full h-full object-contain"
      />
    </motion.div>
  );

  if (variant === 'mark-only') {
    return Mark;
  }

  return (
    <motion.div 
      className={`flex items-center gap-4 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {Mark}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-serif font-bold tracking-[0.18em] text-white ${currentSize.text} drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]`}
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            JUDAI BROTHERS
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className={`font-semibold uppercase tracking-[0.22em] bg-clip-text text-transparent bg-gradient-to-r from-slate-400 via-white to-slate-400 ${currentSize.sub}`}
          >
            RESIDENTIAL & COMMERCIAL PLUMBING
          </span>
        </div>
      </div>
    </motion.div>
  );
};

