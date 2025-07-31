import { HashRouter as Router, Routes, Route, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState, Suspense } from 'react' 
import { motion, useMotionValue, useTransform, animate, delay } from 'framer-motion'
import VmrlModel from './components/VmrlModel.tsx'
import CustomPdfViewer from './components/PDFViewer.tsx'
import SpinningShadowImage from './components/SpinningShadowImage.tsx'
import './App.css'
import headshot from './assets/headshot.jpeg'
import signUnderConstruction from './assets/HeHeartlandLane5025imagesconstruction.gif'
import guyUnderConstruction from './assets/CaCapeCanaveral8167brunounderconstruction.gif'
import barUnderConstruction from './assets/ArArea51Shadowlands5031Under-Construction.gif'
import candlemakerTeam from './assets/candlemaker_team.jpg'
import tubenderTeam from './assets/tubender_team.jpg'

/** 
 * Returns {text} as a progressively typed version, with a cursor.
 *
 *  speed: ms per letter 
*/
function TypewriterText({
  text,
  delay = 0,
  speed = 50
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [isComplete, setIsComplete] = useState(false);
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const timer = setTimeout(() => {
      const controls = animate(count, text.length, {
        type: 'tween',
        duration: text.length * (speed / 1000),
        ease: 'linear',
      });

      const completionTimer = setTimeout(() => {
        setIsComplete(true);
      }, text.length * speed);
      
      return () => {
        controls.stop;
        clearTimeout(completionTimer);
      }
        
    }, delay);

    return () => clearTimeout(timer);
  }, [count, text.length, speed, delay]);

  return (
    
    <span>
      {/** Motion enabled text */}
      <motion.span>{displayText}</motion.span>
      
      {/** Cursor */}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
      >
        |
      </motion.span>)}
      
    </span>
  )
}

function useSequentialTypewriter(texts: string[], speed: number = 50, initialDelay: number = 0) {
  const delays = texts.reduce((acc, text, index) => {
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

  return (
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
  </motion.div>
    );
}

function Projects() {
  const texts = [
    'Projects',
    'Candlemaker',
    'Tubender', 
  ];
  const navigate = useNavigate();
  const delays = useSequentialTypewriter(texts, 50, 0);

  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
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
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          
          <SpinningShadowImage
            src={candlemakerTeam}
            alt='Photo of Candlemaker Team'
            width={250}
            height={187.5}
            radius={20}
            initialAngle={30}
            style={{
              borderRadius:'20%',
              transition: 'box-shadow 0.3s ease'
            }}
          />
          <h2 className='project-title'>
            <TypewriterText text={texts[1]} delay={delays[1]} speed={50} />
          </h2>
          {/* TODO: Add generate label somehow? */}
          <p 
            className='project-text'
            onClick={() => navigate('/projects/candlemaker')}
          >
            <TypewriterText 
              text='Candlemaker is a fully automated tabletop device
              for candle enthusiasts who want to make their own candles. 
              The project was developed to offer an inexpensive, all-in-one alternative to current solutions
              for home candlemaking.' 
            />
          </p>
        </div>

        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column'
        }}
        >
          <SpinningShadowImage 
            src={tubenderTeam} 
            alt='Photo of Tubender teammates'
            width={250}
            height={187.5}
            radius={20}
            initialAngle={30}
            nSpins={3}
            style={{ 
              borderRadius: '20%', 
              transition: 'box-shadow 0.3s ease'
            }}
          />
          <h2 className='project-title'>
            <TypewriterText text={texts[2]} delay={delays[2]} speed={50} />
          </h2>
          <p className='project-text' onClick={() => navigate('/projects/tubender')}>
            <TypewriterText
              text='Tubender is an automated EMT conduit tube bender designed to make common bends easier.
              The current process for bending EMT conduit involves precise manual bending using specific tools
              for different size tubes. 
              Tubender was designed with the capability to do multiple bends in one length of tubing.' 
            />
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function CandlemakerDetail() {
  return (
    <h1 className='main-title'>
      <TypewriterText text='Candlemaker' />
    </h1>
  )
}

function TubenderDetail() {
  const [modelLoaded, setModelLoaded] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  return (
    
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onAnimationComplete={() => setAnimationComplete(true)}
      >
        <h1 className='main-title'>
          <TypewriterText text='Tubender' />
        </h1>
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
              url='src/assets/Tubender PCB.wrl'
              autoRotate={animationComplete} // Only autoRotate after animation is done
              rotationSpeed={5}
              objectRotation={[Math.PI/2, 0, Math.PI/4]}
              onLoad={() => setModelLoaded(true)}
            />
          {/* </Suspense>  */}
        </div>
      </motion.div>
    
  )
}

function Writing() {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: pdfLoaded ? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <div
        className='main-title' 
        style={{margin: '2rem 1rem', fontSize: '4rem'}}
      >
        <TypewriterText 
          //initial={{o}}      
          text='Writing'
          delay={0}
          speed={100}
        />
      </div>
      <h2> Music on the periphery: an inquisition into hyperfreak and hyperflip </h2>
      <p>This essay discusses the emergent SoundCloud subgenres of 
        hyperfreak and hyperflip and their social and economic contexts. 
        It traces the feminist, queer roots of electronic dance music 
        back to the disco movement and begs the question: 
        Can these new genres sustain themselves in real spaces as queer, feminist safe havens, or are they doomed to fade into the lull of capitalist realism?</p>
      <CustomPdfViewer 
        file='/portfolio/musicontheperiphery.pdf' 
        onLoadComplete={() => setPdfLoaded(true)}
      />
      <h2 style={{marginTop: '4rem'}}>Essay on Resources</h2>
      
    </motion.div>
      );
}

function Passions() {
  return <div>
    <h1>Passions Page</h1>
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
