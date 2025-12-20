import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import TypewriterText from '../components/TypewriterText.tsx'
import SpinningShadowImage from '../components/SpinningShadowImage.tsx'
import ImagePreloader from '../components/ImagePreloader.tsx'
import ProjectLabel from '../components/ProjectLabel.tsx'
import InProgressBadge from '../components/InProgressBadge.tsx'
import { projects } from '../data/projects.ts'
import { useSequentialTypewriter } from '../utils.tsx'

function Projects() {
  //TODO: Add personal projects
  const texts = [
    'Projects',
    'Candlemaker',
    'Tubender', 
    'Giano',
    'The Augmenter',
    'tabbasar',
    'Single Cycle RISC-V Processor',
    'granspec'    
  ];

  const pictureWidth = 250;
  
  // Filter out co-ops from the projects display (they'll show in timeline)
  const displayProjects = projects.filter(p => p.category !== 'Co-op');
  
  const images = displayProjects
    .filter(p => p.image !== null)
    .map(p => p.image as string);
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
          {displayProjects.map((project, index) => (
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
                  onClick={() => project.route && navigateWithDelay(project.route)}
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
                onClick={() => project.route && navigate(project.route)}
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


