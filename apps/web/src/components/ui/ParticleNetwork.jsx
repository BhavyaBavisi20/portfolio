import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSphere = (props) => {
  const ref = useRef();
  
  // Create a sphere of 4000 particles
  const sphere = useMemo(() => random.inSphere(new Float32Array(4000), { radius: 1.5 }), []);

  useFrame((state, delta) => {
    // Gentle floating rotation
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // Slight pulsing based on time
    ref.current.position.y = Math.sin(state.clock.elapsedTime / 2) * 0.1;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#8b5cf6"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
          blending={2} // Additive blending for that glowing look
        />
      </Points>
    </group>
  );
};

const ParticleNetwork = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ParticleSphere />
      </Canvas>
      {/* Heavy vignette to blend the 3D canvas into the black background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050505_70%)]" />
    </div>
  );
};

export default ParticleNetwork;
