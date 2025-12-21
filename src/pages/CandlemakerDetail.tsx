import { useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import VmrlModel from '../components/VmrlModel.tsx'
import TypewriterText from '../components/TypewriterText.tsx'
import PDFViewer from '../components/PDFViewer.tsx';

function CandlemakerDetail() {
  //TODO: description, product pictures, fix model (why is it broken?), maybe add videos
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
          <TypewriterText text='Candlemaker' />
        </h1>
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Candlemaker is a fully automated tabletop device for candle enthusiasts who want to make their own candles. 
          The project was developed to offer an inexpensive, all-in-one alternative to current solutions for home candlemaking.
        </p>
      </motion.div>
      <h2 className='subtitle'>PCB</h2>
      <div style={{ height: '400px', width: '80vw', margin: '2rem 0' }}>
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
            url='/portfolio/assets/models/Candle_Main_PCB.wrl'
            autoRotate={animationComplete}
            rotationSpeed={5}
            objectRotation={[5*Math.PI/3, 0, Math.PI/4]}
            onLoad={() => setModelLoaded(true)}
          />
        </Suspense>
      </div>
      <h2 className='subtitle'>Final Report</h2>
      <PDFViewer file='/portfolio/Candlemaker_FinalReport.pdf' />
      <h2 className='subtitle'>System Components</h2>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The Candlemaker electrical system is composed of four main subsystems: heating, pouring, wick placement, and power.
          I was responsible for the heating subsystem.
        </p>
        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>Altium Designer</li>
          <li>Embedded C++</li>
          <li>PID Control</li>
          <li>Temperature Sensing Circuit Design</li>
          <li>PCB Debugging</li>
        </ul>
        <h2 className='subtitle'>Heating Subsystem</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The heating subsystem is responsible for heating the wax to the desired temperature.
          It is composed of multiple heating elements, a thermistor temperature sensor, and a discrete time PID controller.
          Heating is delivered through multiple flexible heating elements that are connected to the 24V power line.
          The thermistor temperature sensor is connected to the controller.
          The discrete time PID controller is responsible for quickly and accurately heating the wax to the desired temperature.
          Through the development process, I tuned the PID to reduce overshoot and settling time by 33%. The PID was implemented in embedded C++ on a Teensy 4.0 microcontroller.
        </p>
        <h2 className='subtitle'>Team</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Developed by Fahia Bashar, Rebecca Chen, William Fox, Jiamei Goodwin, Christopher Lutchman, Michelle Montenegro, Shreyas Pal, 
          Luca Poulos, William Rosen, Kimberly Tso, and Nikolas Varga for Generate Product Development.
        </p>
      </div>
    </div>
  )
}

export default CandlemakerDetail;


