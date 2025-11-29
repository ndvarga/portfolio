import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TypewriterText from '../components/TypewriterText.tsx'
import SpinningShadowImage from '../components/SpinningShadowImage.tsx'
import ImagePreloader from '../components/ImagePreloader.tsx'
import ProjectLabel from '../components/ProjectLabel.tsx'
import InProgressBadge from '../components/InProgressBadge.tsx'
import candlemakerTeam from '../assets/candlemaker_team.jpg'
import tubenderTeam from '../assets/tubender_team.jpg'
import piano_hand from '../assets/piano_hand.jpeg'
import riscv_design from '../assets/riscv_design.png'
import granspec_dist_reverb_snip from '../assets/granspec_dist_reverbsnip.png'
import { useSequentialTypewriter } from '../utils.tsx'

function Projects() {
  //TODO: Add personal projects
  const texts = [
    'Projects',
    'Candlemaker',
    'Tubender', 
    'Giano',
    'Noisemaker',
    'tabbasar',
    'Single Cycle RISC-V Processor',
    'granspec'    
  ];

  const pictureWidth = 250;
  
  const projects = [
    {
      name: 'Giano',
      category: 'Capstone Design Project',
      categoryColor: 'rgb(178, 32, 163)', // Light blue
      image: piano_hand,
      description: 'A comprehensive system for piano learning using computer vision, haptic feedback gloves, and audio synthesis. Combines hand tracking technology with haptic feedback to guide users through piano playing in real-time.',
      route: '/projects/giano',
      isInProgress: true,
      timelineData: {
        startYear: 2025,
        isOngoing: true
      }
    },
    {
      name: 'Noisemaker',
      category: 'MUST5510',
      categoryColor: 'rgb(32, 178, 170)', // Light blue
      image: null,
      description: 'A MATLAB-based real-time audio augmentation system that applies various audio effects and transformations to live audio streams, including noise generation, resampling, and delay effects.',
      route: '/projects/noisemaker',
      isInProgress: true,
      timelineData: {
        startYear: 2025,
        isOngoing: true
      }
    },
    {
      name: 'tabbasar',
      category: 'MUST3603',
      categoryColor: 'rgb(32, 178, 170)', // Light blue
      image: null,
      description: 'tabbasar is a realtime digital wavetable synthesizer and sequencer designed to explore how digital audio synthesis can be implemented in a live environment.',
      route: '/projects/tabbasar',
      isInProgress: true,
    },
    {
      name: 'Candlemaker',
      category: 'Generate',
      categoryColor: '#8B4513', // Brown
      image: candlemakerTeam,
      description: 'Candlemaker is a fully automated tabletop device for candle enthusiasts who want to make their own candles. The project was developed to offer an inexpensive, all-in-one alternative to current solutions for home candlemaking.',
      route: '/projects/candlemaker',
      isInProgress: false,
      timelineData: {
        startYear: 2025,
        isOngoing: false
      }
    },
    {
      name: 'Tubender',
      category: 'Generate',
      categoryColor: '#8B4513', // Brown
      image: tubenderTeam,
      description: 'Tubender is an automated EMT conduit tube bender designed to make common bends easier. \
      The current process for bending EMT conduit involves precise manual bending using specific tools for different size tubes. \
      Tubender was designed with the capability to do multiple bends in one length of tubing.',
      route: '/projects/tubender',
      isInProgress: false,
      timelineData: {
        startYear: 2025,
        isOngoing: false
      }
    },
    {
      name: 'Single Cycle RISC-V Processor',
      category: 'EECE2322',
      categoryColor: 'rgb(32, 178, 170)', // Light blue
      image: riscv_design,
      description: 'Single Cycle RISC-V Processor is written in SystemVerilog.  \
      Written in systemverilog, the system implements common instructions like andi, addi, beqz, bnez, jal, jr, and ret.\
      It includes PC logic, instruction decoding, an ALU, and data memory.',
      route: '/projects/single-cycle-risc-v-processor',
      isInProgress: false,
      timelineData: {
        startYear: 2025,
        isOngoing: false
      }
    },
    {
      name: 'granspec',
      category: 'MUST1220',
      categoryColor: 'rgb(32, 178, 170)', // Light blue
      image: granspec_dist_reverb_snip,
      description: 'granspec is a MaxMSP that applies time domain effects to spectrally decomposed audio signals.',
      route: '/projects/granspec',
      isInProgress: false,
      timelineData: {
        startYear: 2024,
        isOngoing: false
      }
    }
  ];
  
  const images = [
    candlemakerTeam, 
    tubenderTeam,
    piano_hand,
    granspec_dist_reverb_snip,
    riscv_design,
  ];
  const navigate = useNavigate();
  const delays = useSequentialTypewriter(texts, 50, 0);
  const imageNavigationDelay = 600;

  const navigateWithDelay = (route: string) => {
    window.setTimeout(() => navigate(route), imageNavigationDelay);
  };

  // Helper function to convert projects to timeline events
  // This can be used to display projects on the timeline in Home.tsx
  // Example usage:
  // const projectTimelineEvents = projects
  //   .filter(p => p.timelineData)
  //   .map(p => ({
  //     startYear: p.timelineData.startYear,
  //     endYear: p.timelineData.endYear,
  //     title: p.name,
  //     description: p.description,
  //     isOngoing: p.timelineData.isOngoing
  //   }));

  return (
    <ImagePreloader images={images}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='page-title'>
          <TypewriterText text={texts[0]} delay={delays[0]} speed={50} />
        </h1>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          gap: '2rem',
          marginBottom: '2rem'
        }}
        >
          {projects.map((project, index) => (
            <div key={project.name} style={{
              marginLeft: '1rem',
              marginRight: '1rem',
              
              flex: '1 1 300px',
              minWidth: '300px',
              maxWidth: '400px',
              display: 'flex',
              flexDirection: 'column',
            }}>
              {project.image ? (
                <SpinningShadowImage
                  src={project.image}
                  alt={`Photo of ${project.name} Team`}
                  width={pictureWidth}
                  height={187.5}
                  radius={20}
                  initialAngle={30}
                  nSpins={index === 1 ? 3 : 1} // Tubender gets 3 spins
                  style={{
                    borderRadius: '20%',
                    transition: 'box-shadow 0.3s ease'
                  }}
                  onClick={() => navigateWithDelay(project.route)}
                />
              ) : (
                <div
                  style={{
                    width: pictureWidth,
                    height: 200,
                    borderRadius: '20%',
                    background: 'transparent',
                    marginBottom: '1rem',
                  }}
                />
              )}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <ProjectLabel 
                  category={project.category}
                  color={project.categoryColor}
                  delay={0} // Temporarily set to 0 for testing
                  width={`${pictureWidth}px`}
                />
                {project.isInProgress && <InProgressBadge delay={0} />}
              </div>
              <button
                type='button'
                className='project-title'
                onClick={() => navigate(project.route)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: 'none',
                  background: 'transparent',
                  padding: 0,
                  textAlign: 'left',
                  marginLeft: '0',
                }}
              >
                {/* project name and subpage link */}
                <TypewriterText text={project.name} delay={delays[index + 1]} speed={1} className='project-title-link' />
              </button>
              <p 
                className='project-text'
                style={{ cursor: 'default' }}
              >
                <TypewriterText text={project.description} speed={10} />
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </ImagePreloader>
  );
}

export default Projects;


