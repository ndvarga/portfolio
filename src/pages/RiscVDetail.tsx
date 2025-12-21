import { motion } from 'framer-motion'
import TypewriterText from '../components/TypewriterText.tsx'
import PDFViewer from '../components/PDFViewer.tsx'
import ImageCarousel from '../components/ImageCarousel.tsx'
import riscv_pc from '../assets/riscv/pc.png'
import simulation_screenshot from '../assets/riscv/simulation.png'
import riscv_design from '../assets/riscv/design.png'

export default function RiscVDetail() {
  return (
    <div>
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className='project-page-title'>
          <TypewriterText text='Single Cycle RISC-V Processor' />
        </h1>
        <ImageCarousel
          images={[
            { src: riscv_pc, alt: 'RISC-V Program Counter' },
            { src: simulation_screenshot, alt: 'Simulation Screenshot' },
            { src: riscv_design, alt: 'CPU System Architecture' },
          ]}
          width="100%"
          height={500}
        />
        <h2 className='subtitle'>About</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          A single-cycle RISC-V processor implemented in SystemVerilog for EECE 2323 Digital Logic Design. 
          The processor executes a complete multiplication program that multiplies two signed 8-bit numbers, 
          demonstrating the full functionality of a working single-cycle processor from instruction fetch 
          through execution and memory access.
        </p>
      </motion.div>
      <PDFViewer file='Lab7ReportVarga.pdf' />
      <div style={{ margin: '2rem 0' }}>
        <h2 className='subtitle'>System Components</h2>
        <div style={{ marginBottom: '2rem' }}>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The single-cycle RISC-V processor consists of several key components that work together to execute 
            instructions in a single clock cycle. The system includes program counter logic with branching support, 
            instruction decoding, an arithmetic logic unit (ALU), and data memory for storing operands and results.
          </p>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Program Counter</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The program counter module was extended to support branching instructions. It features a 9-bit output 
            aligned with a 9-bit offset input, allowing the processor to jump to different instruction addresses. 
            When the take_branch signal is enabled, the program counter increments by the offset value instead of 
            the standard increment of 1.
          </p>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Instruction Set</h3>
          <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
            The processor implements common RISC-V instructions including andi, addi, beqz, bnez, jal, jr, and ret. 
            The multiplication program uses these instructions to perform signed multiplication through iterative 
            addition with proper handling of negative numbers using two's complement arithmetic.
          </p>
        </div>

        <h2 className='subtitle'>Technologies</h2>
        <ul style={{ lineHeight: '1.8', marginBottom: '2rem' }}>
          <li>SystemVerilog</li>
          <li>RISC-V instruction set architecture</li>
          <li>FPGA implementation (VIO for monitoring)</li>
          <li>Digital Logic Design</li>
          <li>Instruction decoding and ALU operations</li>
        </ul>

        <h2 className='subtitle'>Course</h2>
        <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
          Developed for EECE 2323 Digital Logic Design Lab 7 at Northeastern University. This lab represented the 
          culmination of the course, bringing together all components from previous labs to create a fully functional 
          single-cycle RISC-V processor. The project was completed in partnership with Olivia Peters Van Aalst.
        </p>
      </div>
    </div>
  )
}