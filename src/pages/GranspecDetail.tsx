import { motion } from "framer-motion";
import TypewriterText from "../components/TypewriterText";
import CustomPdfViewer from "../components/PDFViewer.tsx";
import granspec_dist_reverb_snip from "../assets/granspec_dist_reverbsnip.png";
import granspect_drywet from "../assets/granspec_drywet.png";
import granspec_gran_snip from "../assets/granspec_gran_snip.png";

import ImageCarousel from "../components/ImageCarousel.tsx";

function GranspecDetail() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='Granspec' />
        </h1>
        <ImageCarousel
          images={[
            { src: granspec_dist_reverb_snip, alt: 'Granspec dist reverb snip' },
            { src: granspect_drywet, alt: 'Granspec drywet' },
            { src: granspec_gran_snip, alt: 'Granspec gran snip' },
          ]}
          width="100%"
          height={500}
        />
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Granspec is a MaxMSP spectral granulator that combines the immediacy of granular synthesis with FFT-driven processing.
          Audio is first atomized into grains and then reassembled bin-by-bin, enabling extreme textural manipulations that bridge
          time-domain gestures with frequency-domain control.
        </p>
      </motion.div>
      <CustomPdfViewer file='granspec_report.pdf' />

      <div style={{ margin: '2rem 0' }}>
        <h2 className='subtitle'>Signal Flow</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          The patch lets the performer toggle between three curated samples or a user-recorded buffer before the material is
          shredded into grains. Grain speed is mapped to a slider / float pair so that macro sweeps and microscopic nudges
          feel equally playable. Every trigger fires a trio of random generators—start point, playback rate, and window size—
          so each burst arrives with a unique contour. A poly~ engine (inspired by the class groove~/sig~ template) reads the
          buffer, applies random window ramps, and prevents phase cancellation by continually perturbing the envelope lengths.
        </p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '2rem', lineHeight: '1.6' }}>
          <li>Sample selector with immediate auditioning of three presets + live buffer</li>
          <li>Randomized grain windows and playback speed per trigger for evolving textures</li>
          <li>Window abstraction that writes bespoke amplitude shapes into a buffer for each grain</li>
          <li>Polyphonic grain generator with groove~, line~, and cycle~ objects to sculpt the envelope</li>
        </ul>

        <h2 className='subtitle'>Spectral Processing Engine</h2>
        <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          Once the grains are created, they are routed through a pfft~ subpatch where FFT frames are split into two-to-eight
          bins. User-selectable bin counts control how coarsely the spectrum is segmented, and each bin can be delayed,
          distorted, or reverberated independently. Delay time and feedback are indexed per FFT sample so higher bins smear
          differently than low bins. The dry/wet architecture is mirrored in both the time domain and the frequency domain,
          giving tight control over how much granulated signal re-enters the mix.
        </p>
        <ul style={{ marginBottom: '2rem', paddingLeft: '2rem', lineHeight: '1.6' }}>
          <li>Bin chooser UI for mapping grains into 2–8 spectral regions</li>
          <li>Binned spectral delay implemented inside pfft~ with indexed feedback amounts</li>
          <li>Distortion and reverb stages that operate on FFT bins for spectral effect</li>
          <li>Multislider based bin parameters so curves can be drawn and morphed live</li>
          <li>Dial-controlled dry/wet mixing</li>
        </ul>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>MaxMSP / poly~ granular architecture with groove~, sig~, cycle~, and line~ objects</li>
          <li>FFT / pfft~ processing for bin-based delay, distortion, and reverb</li>
          <li>Multislider UI for sculpting spectral envelopes in real time</li>
          <li>Custom window abstraction (p window) for randomized grain envelopes</li>
        </ul>

        <h2 className='subtitle'>Project Context</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Built for MUST2431 with mentorship from Professor Ronald B. Smith, Granspec synthesizes research into
          Michael Norris' Soundmagic Spectral, coursework explorations, and independent experiments with spectral reverbs.
        </p>
      </div>
    </div>
  )
}

export default GranspecDetail;