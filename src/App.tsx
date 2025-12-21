import { HashRouter as Router, Routes, Route, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react' 
import { motion } from 'framer-motion'
import './App.css'
import Home from './pages/Home.tsx'
import Projects from './pages/Projects.tsx'
import CandlemakerDetail from './pages/CandlemakerDetail.tsx'
import TubenderDetail from './pages/TubenderDetail.tsx'
import GianoDetail from './pages/GianoDetail.tsx'
import TheAugmenterDetail from './pages/TheAugmenterDetail.tsx'
import TabbasarDetail from './pages/TabbasarDetail.tsx'
import Writing from './pages/Writing.tsx'
import Passions from './pages/Passions.tsx'
import GranspecDetail from './pages/GranspecDetail.tsx'
import RiscVDetail from './pages/RiscVDetail.tsx'

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
        <Route path='/projects/giano' element={<GianoDetail />} />
        <Route path='/projects/the-augmenter' element={<TheAugmenterDetail />} />
        <Route path='/projects/tabbasar' element={<TabbasarDetail />} />
        <Route path='/projects/granspec' element={<GranspecDetail />} />
        <Route path='/projects/single-cycle-risc-v-processor' element={<RiscVDetail />} />
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
