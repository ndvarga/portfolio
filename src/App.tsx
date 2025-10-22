import { HashRouter as Router, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion } from 'framer-motion'
import VmrlModel from './components/VmrlModel.tsx'
import CustomPdfViewer from './components/PDFViewer.tsx'
import TypewriterText from './components/TypewriterText.tsx'
import SpinningShadowImage from './components/SpinningShadowImage.tsx'
import './App.css'
import headshot from './assets/headshot.jpeg'
import signUnderConstruction from './assets/HeHeartlandLane5025imagesconstruction.gif'
import guyUnderConstruction from './assets/CaCapeCanaveral8167brunounderconstruction.gif'
import barUnderConstruction from './assets/ArArea51Shadowlands5031Under-Construction.gif'
import candlemakerTeam from './assets/candlemaker_team.jpg'
import tubenderTeam from './assets/tubender_team.jpg'
import ImagePreloader from './components/ImagePreloader.tsx'
import Timeline from './components/Timeline.tsx'
import TimelineEvent from './components/TimelineEvent.tsx'
import ProjectLabel from './components/ProjectLabel.tsx'
import WritingLabel from './components/WritingLabel.tsx'



function useSequentialTypewriter(texts: string[], speed: number = 50, initialDelay: number = 0) {
  const delays = texts.reduce((acc, _, index) => {
    if (index === 0) {
      acc.push(initialDelay);
    } else {
      const previousDelay = acc[index - 1];
      const previousTextLength = texts[index - 1].length;
      acc.push(previousDelay + (previousTextLength * speed));
    }
    return acc;
  }, [] as number[]);
  
  return delays;
}





function AspectRatioImage({
  src,
  alt,
  width,  
}: {
  src: string;
  alt: string;
  width: number;
}) {
  const [aspectRatio, setAspectRatio] = useState<number | null>(null);

  const handleLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    setAspectRatio(img.naturalWidth / img.naturalHeight);
  };
  return (
    <img
      src={src}
      alt={alt}
      onLoad={handleLoad}
      style={{
        width:`${width}px`,
        height: aspectRatio ? `${width/aspectRatio}px` : 'auto',
      }}
    /> 
  );
}




function Home() {
  // TODO: Add personal links to github, LinkedIn, and email, add timeline, add music
  const images = [
    headshot,
    barUnderConstruction,
    guyUnderConstruction,
    signUnderConstruction,
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
          }}
          
        />

        <h1 className='subtitle'>About Me</h1>
        <p style={{
          margin: 'auto 20vw'
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
        <h2 className='subtitle'>Resume</h2>
        <CustomPdfViewer file='/portfolio/VargaResumeAnalogFeb2025.pdf' />
        <h2 className='subtitle'>Timeline</h2>
        <Timeline>
          <TimelineEvent startYear={2025} title='Candlemaker Engineer' description='Foo' />
          <TimelineEvent startYear={2024} title='Tubender Engineer' description='Foo' />
          <TimelineEvent startYear={2024} title='Electrical & Audio Engineering Co-op' description='Working at the Garner Lab at HMS' location='Boston'/>
          <TimelineEvent startYear={2023} title='R&D Co-op' description='Developed organic photo- voltaic device inks and coatings at Nano-C, Inc.' />
          <TimelineEvent startYear={2022} isOngoing={true} title='Northeastern University' description='For the past four years, I have been a student at Northeastern University studying electrical engineering and music technology.' />
          <TimelineEvent startYear={2021} title='Boston University' description='I started my college journey at Boston University, where I took computer engineering classes.' location='Boston, MA' />
          <TimelineEvent startYear={2021} title='East High School' description='Graduated high school!' />
        </Timeline>
        <h2 className='subtitle'>Cool Things I like doing</h2>
      </motion.div>
    </ImagePreloader>  
  );
}

function Projects() {
  //TODO: Add personal projects
  const texts = [
    'Projects',
    'Candlemaker',
    'Tubender', 
    'Single Cycle RISC-V Processor',
    'granspec'    
  ];

  const pictureWidth = 250;
  
  const projects = [
    {
      name: 'Candlemaker',
      category: 'Generate',
      categoryColor: '#8B4513', // Brown
      image: candlemakerTeam,
      description: 'Candlemaker is a fully automated tabletop device for candle enthusiasts who want to make their own candles. The project was developed to offer an inexpensive, all-in-one alternative to current solutions for home candlemaking.',
      route: '/projects/candlemaker'
    },
    {
      name: 'Tubender',
      category: 'Generate',
      categoryColor: '#8B4513', // Brown
      image: tubenderTeam,
      description: 'Tubender is an automated EMT conduit tube bender designed to make common bends easier. The current process for bending EMT conduit involves precise manual bending using specific tools for different size tubes. Tubender was designed with the capability to do multiple bends in one length of tubing.',
      route: '/projects/tubender'
    },
    {
      name: 'Single Cycle RISC-V Processor',
      category: 'School',
      categoryColor: 'rgb(32, 178, 170)', // Light blue
      image: null,
      description: 'Single Cycle RISC-V Processor is a single cycle RISC-V processor designed to be a simple, efficient, and easy to understand processor. The project was developed to offer an inexpensive, all-in-one alternative to current solutions for home candlemaking.',
      route: '/projects/single-cycle-risc-v-processor'
    }
  ];
  
  const images = [
    candlemakerTeam, 
    tubenderTeam,
  ];
  const navigate = useNavigate();
  const delays = useSequentialTypewriter(texts, 50, 0);

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
          alignItems: 'flex-start',
          gap: '2rem',
          marginBottom: '2rem'
        }}
        >
          {projects.map((project, index) => (
            <div key={project.name} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <SpinningShadowImage
                src={project.image || ''}
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
              />
              <ProjectLabel 
                category={project.category}
                color={project.categoryColor}
                delay={0} // Temporarily set to 0 for testing
                width={`${pictureWidth}px`}
              />
              <h2 className='project-title'>
                <TypewriterText text={project.name} delay={delays[index + 1]} speed={50} />
              </h2>
              <p 
                className='project-text'
                onClick={() => navigate(project.route)}
                style={{ cursor: 'pointer' }}
              >
                <TypewriterText text={project.description} />
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </ImagePreloader>
  );
}

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
        <h1 className='main-title'>
          <TypewriterText text='Candlemaker' />
        </h1>
      </motion.div>
      <div style={{ height: '400px', width: '100%', margin: '2rem 0' }}>
            {/* <Suspense fallback={
              <div style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-6)',
                borderRadius: '8px',
                color: 'black'
              }}>
                Loading 3D Model...
              </div>
            }> */}
              {!modelLoaded && (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--color-6)',
                  borderRadius: '8px'
                }}>
                Loading 3D Model...
              </div>
            )}
            <VmrlModel 
              url='src/assets/Candle_Main_PCB.wrl'
              autoRotate={animationComplete} // Only autoRotate after animation is done
              rotationSpeed={5}
              objectRotation={[5*Math.PI/3, 0, Math.PI/4]}
              onLoad={() => setModelLoaded(true)}
            />
          {/* </Suspense>  */}
      </div>
    </div>
  )
}

function TubenderDetail() {
  //TODO: add description, add CSS classes for Generate, skills, project videos
  const [modelLoaded, setModelLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <h1 className='main-title'>
          <TypewriterText text='Tubender' />
        </h1>
      </motion.div>
        <div style={{ height: '400px', width: '100%', margin: '2rem 0' }}>
          {/* <Suspense fallback={
            <div style={{
              height: '400px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--color-6)',
              borderRadius: '8px',
              color: 'black'
            }}>
              Loading 3D Model...
            </div>
          }> */}
            {!modelLoaded && (
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-6)',
                borderRadius: '8px'
              }}>
                Loading 3D Model...
              </div>
            )}
            <VmrlModel 
              url='src/assets/Tubender PCB.wrl'
              autoRotate={animationComplete} // Only autoRotate after animation is done
              rotationSpeed={5}
              objectRotation={[5*Math.PI/3, 0, Math.PI/4]}
              onLoad={() => setModelLoaded(true)}
            />
          {/* </Suspense>  */}
        </div>
    </div>
    
  )
}

function Writing() {
  // TODO: add resource essay, pedestrian scale study, acoustics paper, poems
  const [pdfLoaded, setPdfLoaded] = useState(false);

  const essays = [
    {
      id: 'music-periphery',
      title: 'Music on the periphery: an inquisition into hyperfreak and hyperflip',
      description: 'This essay discusses the emergent SoundCloud subgenres of hyperfreak and hyperflip and their social and economic contexts. It traces the feminist, queer roots of electronic dance music back to the disco movement and begs the question: Can these new genres sustain themselves in real spaces as queer, feminist safe havens, or are they doomed to fade into the lull of capitalist realism?',
      pdfFile: '/portfolio/musicontheperiphery.pdf',
      year: 2025
    },
    {
      id: 'neighborhood-acoustics',
      title: 'Environmental Noise in Boston Neighborhoods: A Case Study',
      description: 'This essay discusses the social and economic contexts of the two major neighborhoods nearest to Northeastern University and their acoustical characteristics across two distinct street typologies in both.',
      pdfFile: '/portfolio/acoustics_paper.pdf',
      year: 2025
    },
    {
      id: 'human-cost-electrification',
      title: 'The Human Cost of Electrification',
      description: 'This essay discusses the human cost of electrification and the environmental impact of electrification.',
      pdfFile: '/portfolio/thehumancostofelectrification.pdf',
      year: 2024
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: pdfLoaded ? 1 : 0, y: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div
        className='main-title' 
        style={{margin: '2rem 1rem', fontSize: '4rem'}}
      >
        <TypewriterText 
          text='Writing'
          delay={0}
          speed={100}
        />
      </div>
      
      {essays.map((essay, index) => (
        <div key={essay.id} style={{ marginBottom: '4rem' }}>
          <h3 style={{ marginBottom: '0.5rem', marginLeft: '1rem' }}>{essay.year}</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem', marginLeft: '1rem' }}>
            <h2>{essay.title}</h2>
          </div>
          
          
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>{essay.description}</p>
          
          <CustomPdfViewer 
            file={essay.pdfFile} 
            onLoadComplete={() => setPdfLoaded(true)}
          />
        </div>
      ))}
    </motion.div>
      );
}

function Passions() {
  return <div>
    <h1>Passions Page</h1>
    // TODO: embed soundcloud playlist
    </div>
}

function AppContent() {
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const lastSize = useRef({ width: window.innerWidth, height: innerHeight });
  
  let timeout: number | undefined;

  const location = useLocation();
  console.log('Location pathname:', location.pathname);
  console.log('Location hash:', location.hash);
  

  function handleResize() {
    //bounces the menu depending on the change in browser size
    const { width, height } = lastSize.current;
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    setMenuX( (newWidth - width) / 5);
    setMenuY( (newHeight - height) / 5);
  
    clearTimeout(timeout);
    timeout = window.setTimeout(() => {
      setMenuX(0);
      setMenuY(0);
      lastSize.current = { width: newWidth, height: newHeight };
      }, 200);
  }

  useEffect(() => {
    //use handle resize when window is resize
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timeout);
    };
  }, []);

  return (
    <>
    {/** The header bar */}
      <header>
        <div className='header-bar'>
          <h1 className='main-title'>Nikolas Varga</h1>
          {/** Toggle button that appears under a certain width */}
          <button
            className="menu-toggle"
            onClick={() => setSidebarOpen((open) => !open)}
            aria-label="Toggle menu"
          >
            &#9776;
          </button>
          <motion.nav 
            className={`top-menu${sidebarOpen ? ' open ' : ''}`}
            animate={{ x: menuX, y: menuY }}
            transition={{ type:'spring', stiffness: 100, damping: 12}}
          >
          
            {/** home page */}
            <NavLink 
              to='/' 
              end
              onClick={() => setSidebarOpen(false)}
              className={ ({ isActive }) => isActive ? 'active-link' : ''}
            >
              home
            </NavLink>

            {/** projects page link*/}
            <NavLink 
              to='/projects' 
              end
              onClick={() => setSidebarOpen(false)}
              className={ ({ isActive }) => isActive ? 'active-link' : ''}
            >
              projects
            </NavLink>

            {/** writing page link*/}
            <NavLink 
              to='/writing' 
              end
              onClick={() => setSidebarOpen(false)}
              className={ ({isActive }) => isActive ? 'active-link' : ''}
            >
              writing
            </NavLink>

            {/** passions page link*/}
            <NavLink 
              to='/passions' 
              end
              onClick={() => setSidebarOpen(false)}
              className={ ({isActive }) => isActive ? 'active-link' : ''}
            >
              passions
            </NavLink>
          </motion.nav>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/projects/candlemaker' element={<CandlemakerDetail />} />
        <Route path='/projects/tubender' element={<TubenderDetail />} />
        <Route path='/writing' element={<Writing />} />
        <Route path='/passions' element={<Passions />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App
