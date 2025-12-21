import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText.tsx'
import ImageCarousel from '../components/ImageCarousel.tsx'
import gianoPcb from '../assets/giano/pcb.jpg'
import piano_hand from '../assets/giano/piano_hand.jpeg'
import piano_mask from '../assets/giano/piano_mask.jpeg'
import cropped_and_cleaned from '../assets/giano/cleaned_and_cropped.png'
import example_mask from '../assets/giano/example_mask.png'
import PDFViewer from '../components/PDFViewer.tsx'

function GianoDetail() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='Giano' />
        </h1>
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Giano is a comprehensive system for piano learning using computer vision, haptic feedback gloves, and audio synthesis. 
          Created as a capstone design project at Northeastern University, Giano combines hand tracking technology with haptic 
          feedback to guide users through piano playing in real-time.
        </p>
      </motion.div>
      <ImageCarousel
            images={[
              { src: gianoPcb, alt: 'Giano PCB' },
              { src: piano_hand, alt: 'Piano hand tracking' },
              { src: piano_mask, alt: 'Piano mask detection' },
              { src: cropped_and_cleaned, alt: 'Cropped and cleaned piano mask' },
              { src: example_mask, alt: 'Final piano mask' },
            ]}
            width="100%"
            height={500}
            autoPlay={true}
            autoPlayInterval={4000}
            showIndicators={true}
            showNavigation={true}
          />
      <PDFViewer file='giano_report.pdf' />
      <div style={{ margin: '2rem 0' }}>
        

        <h2 className='subtitle'>System Components</h2>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The Giano system is composed of three main components: a computer vision system, a glove-based sensor system, and a real-time audio system.
            The computer vision system is housed on a Raspberry Pi 5 and is responsible for tracking the hand location and communicating with the glove-based sensor system.
            The system includes two Teensy 4.0 microcontrollers on the gloves for estimating hand pose and detecting note press. 
            Further, the system includes a Teensy 4.0 microcontroller for real-time piano tone synthesis. The audio system is housed on a Teensy 4.0 microcontroller.
            </p>
          
          
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Computer Vision</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The computer vision system is responsible for tracking the hand location and communicating with the glove-based sensor system.
            The system uses hand landmark detection,  ArUco marker tracking, and camera calibration to estimate the hand pose and track finger positions in real-time.
            for pose estimation. The system tracks finger positions in real-time to guide hand placement and communicates with the microcontroller systems using USB MIDI and serial communication.
          </p>
        </div>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>Python (MediaPipe, OpenCV, ArUco)</li>
          <li>Teensy 4.0 microcontrollers</li>
          <li>MIDI processing and audio synthesis</li>
          <li>Computer vision and pose estimation</li>
          <li>Haptic feedback systems</li>
        </ul>

        <h2 className='subtitle'>Team</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Created by Nouriya Al-Sumait, Ajith George, Celine Habr, Sky Profita, Rahul Singh, and Nikolas Varga for 
          Northeastern University EEECE Capstone Design.
        </p>
      </div>
    </div>
  )
}

export default GianoDetail;

