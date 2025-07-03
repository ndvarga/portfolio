import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion } from 'framer-motion'
import './App.css'
import headshot from './assets/headshot.jpeg';
import { BASE_PATH } from './config';

function Home() {
  return (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8 }}
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
  return <div>Projects Page</div>;
}

function Writing() {
  return <div>Writing Page</div>
}

function Passions() {
  return <div>Passions Page</div>
}

function App() {
  const [menuX, setMenuX] = useState(0);
  const [menuY, setMenuY] = useState(0);
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
          <motion.nav 
            className='top-menu'
            animate={{ x: menuX, y: menuY }}
            transition={{ type:'spring', stiffness: 100, damping: 12}}
            style={{
              position: 'relative',
            }}
          >
            <Link to={`${BASE_PATH}`}>home</Link>
            <Link to={`${BASE_PATH}`+'/projects'} >projects</Link>
            <Link to={`${BASE_PATH}`+'/writing'}>writing</Link>
            <Link to={`${BASE_PATH}`+'/passions'}>passions</Link>
          </motion.nav>
        </div>
      </header>
      <Routes>
        <Route path={`${BASE_PATH}`} element={<Home />} />
        <Route path={`${BASE_PATH}`+'/projects'} element={<Projects />} />
        <Route path={`${BASE_PATH}`+'/writing'} element={<Writing />} />
        <Route path={`${BASE_PATH}`+'/passions'} element={<Passions />} />
      </Routes>
    </Router>
  )
}

export default App
