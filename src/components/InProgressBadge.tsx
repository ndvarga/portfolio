import { motion } from 'framer-motion';

interface InProgressBadgeProps {
  delay?: number;
}

export default function InProgressBadge({ delay = 0 }: InProgressBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay,
        type: "spring",
        stiffness: 200,
        damping: 15
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        border: '2px solid rgba(255, 193, 7, 0.8)',
        color: '#ffc107',
        padding: '0.35rem 0.75rem',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        marginLeft: '0.5rem',
        boxShadow: '0 2px 8px rgba(255, 193, 7, 0.3)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Animated pulsing dot */}
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#ffc107',
          borderRadius: '50%',
          boxShadow: '0 0 6px rgba(255, 193, 7, 0.8)'
        }}
      />
      In Progress
    </motion.div>
  );
}

