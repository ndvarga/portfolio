import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import VmrlModel from '../components/VmrlModel.tsx'
import TypewriterText from '../components/TypewriterText.tsx'

function TubenderDetail() {
  //TODO: add description, add CSS classes for Generate, skills, project videos
  const [modelLoaded, setModelLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='Tubender' />
        </h1>
      </motion.div>
        <div style={{ height: '400px', width: '100%', margin: '2rem 0' }}>
          <Suspense fallback={
            <div style={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-6)',
              borderRadius: '8px',
              color: 'var(--color-1)'
            }}>
              Loading 3D Model...
            </div>
          }>
            {!modelLoaded && (
              <div style={{
                position: 'absolute',
                height: '400px',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-1)',
                borderRadius: '8px',
                zIndex: 1
              }}>
                Loading 3D Model...
              </div>
            )}
            <VmrlModel 
              url='/portfolio/assets/models/Tubender PCB.wrl'
              autoRotate={animationComplete}
              rotationSpeed={5}
              objectRotation={[5*Math.PI/3, 0, Math.PI/4]}
              onLoad={() => setModelLoaded(true)}
            />
          </Suspense>
        </div>
    </div>
    
  )
}

export default TubenderDetail;


