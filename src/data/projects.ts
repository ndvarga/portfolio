import candlemakerTeam from '../assets/candlemaker/team.jpg'
import tubenderTeam from '../assets/tubender/team.jpg'
import giano_team from '../assets/giano/team.jpg'
import riscv_design from '../assets/riscv/design.png'
import granspec_dist_reverb_snip from '../assets/granspec/dist_reverbsnip.png'

export interface Project {
  name: string;
  category: string;
  categoryColor: string;
  image: string | null;
  description: string;
  route: string | null;
  isInProgress: boolean;
  timelineData?: {
    startYear: number;
    endYear?: number;
    isOngoing?: boolean;
    location?: string;
  };
}

// TODO: add ENGW3302 final project
export const projects: Project[] = [
  {
    name: 'Giano',
    category: 'Capstone Design Project',
    categoryColor: 'rgb(178, 32, 163)',
    image: giano_team,
    description: 'A comprehensive system for piano learning using computer vision, haptic feedback gloves, and audio synthesis. Combines hand tracking technology with haptic feedback to guide users through piano playing in real-time.',
    route: '/projects/giano',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'The Augmenter',
    category: 'MUST5510',
    categoryColor: 'rgb(32, 178, 170)',
    image: null,
    description: 'A MATLAB-based real-time audio augmentation system that applies various audio effects and transformations to live audio streams, including noise generation, resampling, and delay effects.',
    route: '/projects/the-augmenter',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'tabbasar',
    category: 'MUST3603',
    categoryColor: 'rgb(32, 178, 170)',
    image: null,
    description: 'tabbasar is a realtime digital wavetable synthesizer and sequencer designed to explore how digital audio synthesis can be implemented in a live environment.',
    route: '/projects/tabbasar',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'Candlemaker',
    category: 'Generate',
    categoryColor: '#8B4513',
    image: candlemakerTeam,
    description: 'Candlemaker is a fully automated tabletop device for candle enthusiasts who want to make their own candles. The project was developed to offer an inexpensive, all-in-one alternative to current solutions for home candlemaking.',
    route: '/projects/candlemaker',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'Tubender',
    category: 'Generate',
    categoryColor: '#8B4513',
    image: tubenderTeam,
    description: 'Tubender is an automated EMT conduit tube bender designed to make common bends easier. The current process for bending EMT conduit involves precise manual bending using specific tools for different size tubes. Tubender was designed with the capability to do multiple bends in one length of tubing.',
    route: '/projects/tubender',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'Single Cycle RISC-V Processor',
    category: 'EECE2322',
    categoryColor: 'rgb(32, 178, 170)',
    image: riscv_design,
    description: 'Single Cycle RISC-V Processor is written in SystemVerilog. Written in systemverilog, the system implements common instructions like andi, addi, beqz, bnez, jal, jr, and ret. It includes PC logic, instruction decoding, an ALU, and data memory.',
    route: '/projects/single-cycle-risc-v-processor',
    isInProgress: false,
    timelineData: {
      startYear: 2025,
      isOngoing: false
    }
  },
  {
    name: 'granspec',
    category: 'MUST1220',
    categoryColor: 'rgb(32, 178, 170)',
    image: granspec_dist_reverb_snip,
    description: 'granspec is a MaxMSP that applies time domain effects to spectrally decomposed audio signals.',
    route: '/projects/granspec',
    isInProgress: false,
    timelineData: {
      startYear: 2024,
      isOngoing: false
    }
  },
  {
    name: 'Electrical & Audio Engineering Co-op',
    category: 'Co-op',
    categoryColor: 'rgb(200, 50, 50)',
    image: null,
    description: 'Worked on experimental tools at the Garner Lab at Harvard Medical School, studying memory and audiovisual perception.',
    route: null,
    isInProgress: false,
    timelineData: {
      startYear: 2024,
      endYear: 2025,
      isOngoing: false,
      location: 'Boston, MA'
    }
  },
  {
    name: 'R&D Co-op',
    category: 'Co-op',
    categoryColor: 'rgb(200, 50, 50)',
    image: null,
    description: 'Developed organic photovoltaic device inks and coatings at Nano-C, Inc. Focused on advancing renewable energy technologies through materials science.',
    route: null,
    isInProgress: false,
    timelineData: {
      startYear: 2023,
      endYear: 2024,
      isOngoing: false
    }
  }
];

