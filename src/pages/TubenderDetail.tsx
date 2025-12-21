import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import VmrlModel from '../components/VmrlModel.tsx'
import TypewriterText from '../components/TypewriterText.tsx'
import ImageCarousel from '../components/ImageCarousel.tsx'
import PDFViewer from '../components/PDFViewer.tsx';
import tubenderTeam from '../assets/tubender/team.jpg'
import tubenderSystemImage from '../assets/tubender/system_image.jpg'
import pcbTopView from '../assets/tubender/pcb_top_view.JPG'
import motorMovementVideo from '../assets/tubender/motor_movement.MOV'
// TODO: add videos and more pictures, add final report

function TubenderDetail() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='Tubender' />
        </h1>
        <ImageCarousel
          images={[
            { src: tubenderTeam, alt: 'Tubender Team' },
            { src: tubenderSystemImage, alt: 'Tubender System' },
            { src: pcbTopView, alt: 'Tubender PCB Top View' },
            { src: motorMovementVideo, alt: 'Tubender Motor Movement' },
          ]}
          width="100%"
          height={500}
        />
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Tubender is an automated EMT conduit tube bender designed to make common bends easier. 
          The current process for bending EMT conduit involves precise manual bending using specific tools 
          for different size tubes. Tubender was designed with the capability to do multiple bends in one 
          length of tubing, streamlining the installation process for electricians and contractors.
        </p>
      </motion.div>
      <h2 className='subtitle'>PCB</h2>
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
          <div style={{ 
            width: '500px', 
            maxWidth: '90%', 
            height: '80%', 
            margin: '0 auto', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' 
          }}>
            <VmrlModel 
              url='/portfolio/assets/models/Tubender PCB.wrl'
              autoRotate={animationComplete}
              rotationSpeed={5}
              objectRotation={[5*Math.PI/3, 0, Math.PI/4]}
              onLoad={() => setModelLoaded(true)}
            />
          </div>
        </Suspense>
      </div>
      <h2 className='subtitle'>Final Report</h2>
      <PDFViewer file='/portfolio/Tubender_FinalReport.pdf' />
      <div style={{ margin: '2rem 0' }}>
        <h2 className='subtitle'>System Components</h2>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Automated Bending Mechanism</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The system features an automated bending mechanism that can perform precise bends at specified angles 
            and locations along a single length of EMT conduit. This eliminates the need for manual measurement 
            and bending, reducing errors and improving consistency.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Multi-Bend Capability</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Unlike traditional manual bending tools that require separate operations for each bend, Tubender can 
            perform multiple bends in sequence on a single piece of tubing. This capability significantly reduces 
            installation time and material waste.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Control System</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The device includes a control system that allows users to program commonly usedbend angles and positions, ensuring 
            precise and repeatable results. The PCB design integrates motor control, sensor feedback, and user 
            interface components.
          </p>
        </div>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>Mechanical Design & Automation</li>
          <li>PCB Design & Electronics</li>
          <li>Motor Control Systems</li>
          <li>Sensor Integration</li>
          <li>3D Modeling & CAD</li>
        </ul>

        <h2 className='subtitle'>Project Context</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Developed as part of the Generate program at Northeastern University. Tubender addresses a real-world 
          problem in electrical installation work, providing a more efficient and accurate solution for EMT conduit 
          bending. The project demonstrates the integration of mechanical design, electronics, and software to create 
          a practical automation solution.
        </p>
        <h2 className='subtitle'>Team</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Developed by Andrew Goldstein, Aidan Kane, Ethan Kjersjard, Niki Manolis, Matthew Marsciano, Mia Miller, Mihir Narayan, 
          Sean Suleski, Maggie Tong, Ana Torreao, and Nikolas Varga for Generate Product Development.
        </p>
      </div>
    </div>
  )
}

export default TubenderDetail;


