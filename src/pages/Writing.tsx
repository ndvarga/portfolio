import { useState } from 'react'
import { motion } from 'framer-motion'
import CustomPdfViewer from '../components/PDFViewer.tsx'
import TypewriterText from '../components/TypewriterText.tsx'

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
      description: 'This essay discusses the social and economic contexts of the two major neighborhoods nearest to Northeastern University and their acoustical characteristics across two shared street typologies. Discusses audible noise, LFN, A-weighted noise levels, and C-weighted noise levels.',
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
        style={{margin: '2rem 2rem', fontSize: '4rem'}}
      >
        <TypewriterText 
          text='Writing'
          delay={0}
          speed={100}
        />
      </div>
      
      {essays.map((essay, _) => (
        <div key={essay.id} style={{ marginBottom: '4rem' }}>
          <h2 className='full-width-text'>{essay.title}, {essay.year}</h2>
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

export default Writing;


