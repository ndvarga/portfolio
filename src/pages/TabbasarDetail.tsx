import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText.tsx'
import PDFViewer from '../components/PDFViewer.tsx'

function TabbasarDetail() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='page-title'>
          <TypewriterText text='tabbasar' />
        </h1>
      </motion.div>
      <PDFViewer file='tabbasar_proposal.pdf' />
      <div style={{ margin: '2rem 0' }}>
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          tabbasar is an ultra-low latency audio synthesis project built on the Bela platform. The system implements 
          wavetable oscillators with multiple waveshapes, biquad filters, and real-time audio processing for interactive 
          music applications.
        </p>

        <h2 className='subtitle'>Features</h2>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Wavetable Synthesis</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Multiple oscillators with configurable additive synthesis using wavetables supporting sine, square, saw, triangle, and noise waveshapes.
            
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Real-Time Filtering</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Biquad, configurable filter implementation for dynamic frequency shaping. The filter parameters can be controlled in real-time 
            to create evolving timbres and effects. The system supports low-pass, high-pass, band-pass, band-stop, notch, and  filters.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Ultra-Low Latency</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Built on the Bela platform, which provides ultra-low latency audio and sensor processing. The system is designed 
            for interactive performance and real-time control.
          </p>
        </div>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>Embedded C++</li>
          <li>Wavetable synthesis</li>
          <li>Biquad filters</li>
          <li>Sequencer/Arpeggiator</li>
          <li>Real-time audio processing</li>
        </ul>

        <h2 className='subtitle'>Course</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Developed for Embedded Audio Programming at Northeastern University, focusing on embedded audio systems and digital signal processing.
        </p>
      </div>
    </div>
  )
}

export default TabbasarDetail;

