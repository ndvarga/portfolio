import { motion } from 'framer-motion';

interface ProjectLabelProps {
  category: string;
  color?: string;
  delay?: number;
  width?: string;
}

export default function ProjectLabel({ 
  category, 
  color = '#8B4513', // Default brown color
  delay = 0,
  width = 'auto'
}: ProjectLabelProps) {
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
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        fontSize: '0.8rem',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginBottom: '0.75rem',
        width: 'fit-content',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
        border: '2px solid rgba(255,255,255,0.2)',
        position: 'relative',
        overflow: 'hidden'

      }}
    >
      {/* Decorative dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: delay + 0.2, duration: 0.3 }}
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          borderRadius: '50%',
          marginRight: '0.5rem',
          boxShadow: '0 0 6px rgba(255,255,255,0.5)'
        }}
      />
      {category}
      {/* Shine effect */}
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ delay: delay + 0.5, duration: 0.8 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
}
