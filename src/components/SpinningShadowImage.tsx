import { useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

interface SpinningShadowImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  duration?: number;
  nSpins?: number;
  radius?: number;
  initialAngle?: number;
  shadowColor?: string;
  shadowBlur?: number;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function SpinningShadowImage({
  src,
  alt,
  width=200,
  height=200,
  className='',
  duration=0.5,
  nSpins=2,
  radius=5,
  initialAngle=315,
  shadowColor = 'rgba(0,0,0,0.6)',
  shadowBlur = 20,
  style = {},
  onClick,
}: SpinningShadowImageProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const angle = useMotionValue(initialAngle);
  const x = useTransform(angle, (latest) => (Math.cos(latest * Math.PI / 180) * radius));
  const y = useTransform(angle, (latest) => (Math.sin(latest * Math.PI / 180) * radius));
   

  const startSpinning = () => {
    if (!isSpinning) {
      setIsSpinning(true);
      angle.set(initialAngle);
      animate(angle, initialAngle+360*nSpins,
      {
        type: 'tween',
        duration: duration*nSpins,
        ease: 'easeInOut',
        onComplete: () => {
          setIsSpinning(false);
          // angle.set(initialAngle);
        }
      });
    }
  };
  
  const handleClick = () => {
    startSpinning();
    onClick?.();
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={className}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style= {{
        width: `${width}px`,
        height: `${height}px`,
        cursor: 'pointer',
        boxShadow: useTransform([x, y], ([latestX, latestY]) => {
          const opacity = (isHovered || isSpinning) ? 0.8 : 0;
          return `${latestX}px ${latestY}px ${shadowBlur}px ${shadowColor.replace(/[0|1].?[0-9]\)/g, opacity.toString()+')')}`;
        }),
      ...style
      }}
    />
  )
}