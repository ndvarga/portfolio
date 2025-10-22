import { OrbitControls } from '@react-three/drei';
import { Canvas, useLoader } from '@react-three/fiber'
import { useEffect } from 'react';
import { VRMLLoader } from 'three/examples/jsm/loaders/VRMLLoader.js'

export default function VmrlModel({ 
  url,
  autoRotate = false,
  rotationSpeed = 0.5,
  objectRotation = [0, 0, 0],
  onLoad,
}: { 
  url: string;
  autoRotate?: boolean;
  rotationSpeed?: number;
  objectRotation?: number[];
  onLoad?: () => void; 
}) {

  const model = useLoader(VRMLLoader, url);
  useEffect(() => {
    if (model && onLoad) {
      onLoad();
    }
  }, [model, onLoad]);

  return ( 
    <Canvas 
      camera={{ position: [0, 0, 5] }}
      fallback={<div>WebGL not supported!</div>}
      performance={{ min: 0.1 }}
    >
      <ambientLight intensity={2} />
      <spotLight position={[10, 10, 10]} angle={Math.PI/3} penumbra={0} intensity={100}/>
      <pointLight position={[-10, -10, -10]} />
      
      <primitive 
        object={model}
        scale={[18, 18, 18]}
        rotation={objectRotation}
      />
      
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={autoRotate}
        autoRotateSpeed={rotationSpeed}
      />
    </Canvas>
  );
}
