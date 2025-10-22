import { motion } from 'framer-motion';

interface WritingLabelProps {
  year: number;
  color?: string;
  delay?: number;
}

export default function WritingLabel({ 
  year, 
  color = '#8B4513', // Default brown color
  delay = 0 
}: WritingLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: color,
        color: 'white',
        padding: '0.4rem 0.9rem',
        borderRadius: '16px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.8px',
        marginBottom: '0.75rem',
        boxShadow: '0 3px 8px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
        border: '1px solid rgba(255,255,255,0.15)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Writing icon/bookmark */}
      <motion.div
        initial={{ scale: 0, rotate: -90 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: delay + 0.2, duration: 0.4 }}
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: '2px',
          marginRight: '0.4rem',
          boxShadow: '0 0 4px rgba(255,255,255,0.4)'
        }}
      />
      {year}
      {/* Subtle shine effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ delay: delay + 0.6, duration: 0.6 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}
