import { BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion } from 'framer-motion'
import './App.css'

function Home() {
  return (
  <div>
    <h1 className='subtitle'>About Me</h1>
    <img src={'src/assets/headshot.jpeg'} alt='Logo' width='300px' height='300px'></img>
    <p>Hi, my name is Nikolas Varga. I'm currently a 5th year student at Northeastern University</p>
  </div>
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
            <Link to='/'>home</Link>
            <Link to='/projects'>projects</Link>
            <Link to='/writing'>writing</Link>
            <Link to='/passions'>passions</Link>
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
