import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText.tsx'
import PDFViewer from '../components/PDFViewer.tsx';

function TheAugmenterDetail() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='The Augmenter' />
        </h1>
      </motion.div>
      
      <div style={{ margin: '2rem 0' }}>
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          The Augmenter is a MATLAB-based real-time audio augmentation system that applies various audio effects and 
          transformations to live audio streams. The system implements noise generation, resampling, delay effects, and 
          music information retrieval (MIR) analysis for brightness, novelty, and roughness features. 
          The project forms an interactive computer music system considering the philosophy of John Cage. 
          The project is meant to draw attention to the role of indeterminacy and bring the interface and tension between the user and the computer to the foreground.
        </p>
        {/* <h2 className='subtitle'>Video</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          <video src={theAugmenterVideo} alt='The Augmenter Video' />
        </p> */}
        <PDFViewer file='portfolio/theaugmenter_finalreport.pdf' />

        <h2 className='subtitle'>Features</h2>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Real-Time Audio Processing</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Frame-based audio processing with configurable sample rates and frame sizes. The system processes audio in 
            real-time with low latency, making it suitable for live performance and interactive applications.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Audio Augmentation</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Colored noise generation, audio data augmentation, and delay effects. The system can apply various transformations 
            to enhance or modify audio characteristics in real-time.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Music Information Retrieval</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            Integration with MIRtoolbox for extracting musical features including brightness, novelty, and roughness. 
            These features can be used for analysis, visualization, or further audio processing.
          </p>
        </div>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>MATLAB</li>
          <li>DSP System Toolbox</li>
          <li>MIRtoolbox</li>
          <li>Real-time audio processing</li>
          <li>Audio effects and augmentation</li>
        </ul>

        <h2 className='subtitle'>Course</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Developed for Sound, Motion, and Computer Interaction at Northeastern University, focusing on advanced audio processing, computer vision, and interactive systems.
        </p>
      </div>
    </div>
  )
}

export default TheAugmenterDetail;

