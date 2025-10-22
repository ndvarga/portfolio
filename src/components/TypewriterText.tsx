/** 
 * Returns {text} as a progressively typed version, with a cursor.
 *
 *  speed: ms per letter 
*/
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { useState, useEffect } from 'react';
export default function TypewriterText({
  text,
  delay = 0,
  speed = 50
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [isComplete, setIsComplete] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, text.length, {
        type: 'tween',
        duration: text.length * (speed / 1000),
        ease: 'linear',
      });

      const completionTimer = setTimeout(() => {
        setIsComplete(true);
      }, text.length * speed);
      
      return () => {
        controls.stop;
        clearTimeout(completionTimer);
      }
        
    }, delay);

    return () => clearTimeout(timer);
  }, [count, text.length, speed, delay]);

  return (
    
    <span>
      {/** Motion enabled text */}
      <motion.span>{displayText}</motion.span>
      
      {/** Cursor */}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
      >
        |
      </motion.span>)}
      
    </span>
  )
}