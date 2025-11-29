import { motion } from 'framer-motion'
import CustomPdfViewer from '../components/PDFViewer.tsx'
import TypewriterText from '../components/TypewriterText.tsx'
import SpinningShadowImage from '../components/SpinningShadowImage.tsx'
import ImagePreloader from '../components/ImagePreloader.tsx'
import headshot from '../assets/headshot.jpeg'
import signUnderConstruction from '../assets/HeHeartlandLane5025imagesconstruction.gif'
import guyUnderConstruction from '../assets/CaCapeCanaveral8167brunounderconstruction.gif'
import barUnderConstruction from '../assets/ArArea51Shadowlands5031Under-Construction.gif'
import githubIcon from '../assets/github-mark-white.png'
import linkedinIcon from '../assets/linkedin-icon-white-png-transparent.png'
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
  // const timelineEvents = [
  //   {
  //     startYear: 2022,
  //     isOngoing: true,
  //     title: "Northeastern University",
  //     description: "Fifth year student studying electrical engineering and music technology",
  //     location: "Boston, MA"
  //   },
  //   {
  //     startYear: 2024,
  //     endYear: 2025,
  //     title: 'Electrical and Audio Engineering Co-op',
  //     description: 'Worked on experimental tools at Garner Lab, HMS'
  //   }
  // ];
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
              {`Hi, my name is Nikolas Varga. I am a fifth year student studying electrical engineering and music technology at Northeastern University.
              I recently completed two co-ops studying memory and audiovisual perception at the Garner Lab and developing organic photovoltaic technologies at Nano-C, Inc. 
              My personal and professional interests include advancing consumer audio, digital signal processing, climatetech, and music technology.
              `}
            speed = {5}
          />
        </p>
        <h2 className='subtitle' style={{ textAlign: 'left', margin: '1rem 2rem' }}>Resume</h2>
        <CustomPdfViewer file='/portfolio/VargaResumeNov28_2025.pdf' />
        {/*<h2 className='subtitle' style={{ textAlign: 'left', margin: '2rem 2rem 1rem' }}>Timeline</h2>
        <Timeline>
          <TimelineEvent startYear={2025} title='Candlemaker Engineer' description='Foo' />
          <TimelineEvent startYear={2024} title='Tubender Engineer' description='Foo' />
          <TimelineEvent startYear={2024} title='Electrical & Audio Engineering Co-op' description='Working at the Garner Lab at HMS' location='Boston'/>
          <TimelineEvent startYear={2023} title='R&D Co-op' description='Developed organic photo- voltaic device inks and coatings at Nano-C, Inc.' />
          <TimelineEvent startYear={2022} isOngoing={true} title='Northeastern University' description='For the past four years, I have been a student at Northeastern University studying electrical engineering and music technology.' />
          <TimelineEvent startYear={2021} endYear={2022} title='Boston University' description='I started my college journey at Boston University, where I took computer engineering classes.' location='Boston, MA' />
          <TimelineEvent startYear={2021} title='East High School' description='Graduated high school!' />
        </Timeline> */}
        <h2 className='subtitle' style={{ marginTop: '4rem', marginLeft: '2rem', textAlign: 'left' }}>Cool Things I like doing</h2>
        <div style={{ margin: '2rem 2rem' }}>
          <iframe
            title='SoundCloud Playlist'
            width='100%'
            height='300'
            scrolling='no'
            frameBorder='no'
            allow='autoplay'
            src='https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/soundcloud%3Aplaylists%3A1986892924%3Fsecret_token%3Ds-kbe8bcKnaxd&color=%23bbb7b1&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true'
          />
          <div
            style={{
              fontSize: 10,
              color: '#cccccc',
              lineBreak: 'anywhere',
              wordBreak: 'normal',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              fontFamily:
                'Interstate,Lucida Grande,Lucida Sans Unicode,Lucida Sans,Garuda,Verdana,Tahoma,sans-serif',
              fontWeight: 100,
            }}
          >
            <a
              href="https://soundcloud.com/nik_mmusic"
              title="nik_"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cccccc', textDecoration: 'none' }}
            >
              nik_
            </a>{' '}
            ·{' '}
            <a
              href="https://soundcloud.com/nik_mmusic/sets/case-study-hyperfreak/s-kbe8bcKnaxd"
              title="case study hyperfreak"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#cccccc', textDecoration: 'none' }}
            >
              case study hyperfreak
            </a>
          </div>
        </div>
      </motion.div>
    </ImagePreloader>  
  );
}

export default Home;


