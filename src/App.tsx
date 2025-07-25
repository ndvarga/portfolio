import { HashRouter as Router, Routes, Route, NavLink, useLocation} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import CustomPdfViewer from './PDFViewer.tsx'
import './App.css'
import headshot from './assets/headshot.jpeg'
import signUnderConstruction from './assets/HeHeartlandLane5025imagesconstruction.gif'
import guyUnderConstruction from './assets/CaCapeCanaveral8167brunounderconstruction.gif'
import barUnderConstruction from './assets/ArArea51Shadowlands5031Under-Construction.gif'

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
        clearTimeout(completionTimer)
      }
        
    }, delay);

    return () => clearTimeout(timer);
  }, [count, text.length, speed, delay]);

  return (
    <span>
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
    <h1 className='subtitle'>About Me</h1>
    <img src={headshot} alt='Headshot' width='300px' height='300px'></img>
    <p>
      <TypewriterText 
        text = 
          {`Hi, my name is Nikolas Varga. I am a fifth year student studying electrical engineering and music technology at Northeastern University.
          I recently completed two co-ops studying memory and audiovisual perception at the Garner Lab and developing organic photovoltaic technologies at Nano-C, Inc. 
          My personal and professional interests include advancing consumer audio, digital signal processing, climatetech, and music technology.
          `}
        speed = {10}
      />
    </p>
  </motion.div>
    );
}

function Projects() {
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      <h1 className='page-title'>Projects</h1>
      <h2 className='subtitle'>Candlemaker</h2>
      <h2 className='subtitle'> Tubender</h2>
    </motion.div>
  );
}

function Writing() {
  const [pdfLoaded, setPdfLoaded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: pdfLoaded? 1 : 0 }}
      transition={{ duration: 1 }}
    >
      <motion.h1 
        //initial={{o}}
        className='main-title' 
        style={{margin: '2rem 1rem', fontSize: '4rem'}}
      >
        Writing
      </motion.h1>
      <h2>Music on the Periphery: an inquisition into hyperfreak and hyperflip </h2>
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
