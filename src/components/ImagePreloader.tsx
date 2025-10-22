import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImagePreloaderProps {
  images: string[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function ImagePreloader({
  images,
  children,
  fallback,
}: ImagePreloaderProps) {
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let loadedCount = 0;

    const imagePromises = images.map((src) => {
      return new Promise<void>((resolve, _) => {
        const img = new Image();
        
        img.onload = () => {
          loadedCount++;
          setProgress((loadedCount / images.length) * 100);
          resolve();
        };

        img.onerror = () => {
          loadedCount++;
          setProgress((loadedCount / images.length) * 100);
          resolve(); // Continue even if some images fail
        };
        img.src = src;
      });
    });

    Promise.all(imagePromises).then(() => {
      setTimeout(() => setLoaded(true), 100);
    });
  }, [images]);

  if (!loaded) {
    return fallback || (
      <div style={{
        height: '50vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <motion.div
          style={{
            fontSize: '1.2rem',
            marginBottom: '1rem',
            color: 'var(--color-2)'
          }}
          animate={{ opacity: [1, 0.5, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading images...
        </motion.div>
        
        <div style={{
          width: '200px',
          height: '4px',
          background: 'var(--color-5)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}>
          <motion.div
            style={{
              height: '100%',
              background: 'var(--color-3)',
              borderRadius: '2px'
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
}