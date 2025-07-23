import { HashRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion } from 'framer-motion'
import CustomPdfViewer from './PDFViewer.tsx'
import './App.css'
import headshot from './assets/headshot.jpeg';


function Home() {
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}
  >
    <h1 className='subtitle'>About Me</h1>
    <img src={headshot} alt='Headshot' width='300px' height='300px'></img>
    <p>Hi, my name is Nikolas Varga. 
      I'm studying electrical engineering and music technology at Northeastern University.
      I recently completed two co-ops studying memory and audiovisual perception at the Garner Lab and developing organic photovoltaic technologies at Nano-C, Inc. 
      My personal and professional interests include advancing consumer audio, digital signal processing, climatetech, and music technology.
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
  return (
    <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1 }}>
      <h1 className='tomorrow-regular'>Writing Page</h1>
      <h2>Music on the Periphery: an inquisition into hyperfreak and hyperflip </h2>
      <p>This essay discusses the emergent SoundCloud subgenres of 
        hyperfreak and hyperflip and their social and economic contexts. 
        It traces the feminist, queer roots of electronic dance music 
        back to the disco movement and begs the question: 
        Can these new genres sustain themselves in real spaces as queer, feminist safe havens, or are they doomed to fade into the lull of capitalist realism?</p>
      <CustomPdfViewer file='/portfolio/musicontheperiphery.pdf' />
      <h2>Essay on Resources</h2>
    </motion.div>
      );
}

function Passions() {
  return <div>
    <h1>Passions Page</h1>
    </div>
}

function App() {
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false); 
  const lastSize = useRef({ width: window.innerWidth, height: innerHeight });

  let timeout: number | undefined;

  
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
    <Router>
      <header>
        <div className='header-bar'>
          <h1 className='main-title'>Nikolas Varga</h1>
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
          
            <Link to='/' onClick={() => setSidebarOpen(false)}>home</Link>
            <Link to='/projects' onClick={() => setSidebarOpen(false)}>projects</Link>
            <Link to='/writing' onClick={() => setSidebarOpen(false)}>writing</Link>
            <Link to='/passions' onClick={() => setSidebarOpen(false)}>passions</Link>
          </motion.nav>
        </div>
      </header>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/writing' element={<Writing />} />
        <Route path='/passions' element={<Passions />} />
      </Routes>
    </Router>
  )
}

export default App
