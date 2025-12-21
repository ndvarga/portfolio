import { motion } from 'framer-motion'
import CustomPdfViewer from '../components/PDFViewer.tsx'
import TypewriterText from '../components/TypewriterText.tsx'
import SpinningShadowImage from '../components/SpinningShadowImage.tsx'
import ImagePreloader from '../components/ImagePreloader.tsx'
import SimpleTimeline from '../components/SimpleTimeline.tsx'
import headshot from '../assets/shared/headshot.jpeg'
import signUnderConstruction from '../assets/shared/HeHeartlandLane5025imagesconstruction.gif'
import guyUnderConstruction from '../assets/shared/CaCapeCanaveral8167brunounderconstruction.gif'
import barUnderConstruction from '../assets/shared/ArArea51Shadowlands5031Under-Construction.gif'
import githubIcon from '../assets/shared/github-mark-white.png'
import linkedinIcon from '../assets/shared/linkedin-icon-white-png-transparent.png'
import { AspectRatioImage } from '../utils.tsx'

function Home() {
  // TODO: Add personal links to github, LinkedIn, and email, add music
  const images = [
    headshot,
    barUnderConstruction,
    guyUnderConstruction,
    signUnderConstruction,
    githubIcon,
    linkedinIcon,
  ];
 
  return (
    <ImagePreloader
      images={images}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <span style={{
          display: 'flex',
          margin: '2rem 0'
          }}
        >

          
          <AspectRatioImage 
            src={barUnderConstruction} 
            alt='Under construction long sign'
            width={400}
          />
          <AspectRatioImage
          src={signUnderConstruction}
          alt='spinning under construction sign'
          width={200}
          />  
          

          <AspectRatioImage 
            src={barUnderConstruction} 
            alt='Under construction long sign'
            width={400}
          />
        </span>
        <AspectRatioImage 
          src={guyUnderConstruction}
          alt='GIF of man cutting wood'
          width={150}
        />
        <SpinningShadowImage 
          className='circular-picture'
          src={headshot} 
          alt='Headshot'
          duration={1}
          nSpins={3}
          radius={15}
          initialAngle={45} 
          style= {{
            width:'200px', 
            height:'200px',
            cursor: 'pointer',
            marginLeft: '2rem',
          }}
          
        />
        {/* Self-introduction */}
        {/* TODO: Add links to github, LinkedIn, and email */ }
        
        <h1 className='subtitle' style={{ textAlign: 'left', margin: '2rem 2rem 1rem' }}>About Me</h1>
        
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          marginLeft: '2rem',
          justifyContent: 'left',
          gap: '2rem'
        }}>
          <a href='https://github.com/ndvarga' target='_blank' rel='noopener noreferrer'>
            <img src={githubIcon} alt='GitHub' style={{ width: '2rem', height: '2rem' }} />
          </a>
          <a href='https://www.linkedin.com/in/nikolasvarga/' target='_blank' rel='noopener noreferrer'>
            <img src={linkedinIcon} alt='LinkedIn' style={{ width: '2rem', height: '2rem' }} />
          </a>
        </div>
        <p style={{
          margin: '0 2rem 2rem',
          textAlign: 'left',
          maxWidth: '800px'
        }}>
          <TypewriterText 
            text = 
              {`Hi, my name is Nikolas Varga. I just graduated from Northeastern University with a B.S. in electrical engineering combined with music technology at a 3.9 GPA.
              I recently completed two co-ops studying memory and audiovisual perception at the Garner Lab and developing organic photovoltaic technologies at Nano-C, Inc. 
              I am interested in making music technology more cost-accessible and socially aware and studying the intersection of music and engineering. I produce music under the alias nik_, and sometimes DJ :). 
              My other passions include public transit, biking, and taking care of my plants.
              `}
            speed = {5}
          />
        </p>
        <h2 className='subtitle' style={{ textAlign: 'left', margin: '1rem 2rem' }}>Resume</h2>
        <CustomPdfViewer file='/portfolio/VargaResumeNov28_2025.pdf' />
        <h2 className='subtitle' style={{ textAlign: 'left', margin: '2rem 2rem 1rem' }}>Timeline</h2>
        <SimpleTimeline showProjects={true} showCoops={true} showEducation={true} />
        <h2 className='subtitle' style={{ marginTop: '4rem', marginLeft: '2rem', textAlign: 'left' }}>Cool Things I like doing</h2>
        
      </motion.div>
    </ImagePreloader>  
  );
}

export default Home;


