import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { a, useSpring } from '@react-spring/three';
import { useGLTF } from '@react-three/drei';


function MountainModel({ position, isActive }) {
    const ref = useRef();
    const { scene } = useGLTF('/assets/mountains.glb'); // Load your .glb model
  
    const { scale } = useSpring({
      scale: isActive ? 1.1 : 1,
      config: { tension: 120, friction: 14 }
    });
  
    useFrame(() => {
      if (ref.current) {
        ref.current.rotation.y += 0.002;
      }
    });
  
    return (
      <a.group ref={ref} position={position} scale={scale}>
        <primitive object={scene} />
      </a.group>
    );
  }
  useGLTF.preload('/assets/mountains.glb');
function CameraRig({ activeIndex, spacing }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += ((activeIndex * spacing) - camera.position.x) * 0.05;
    camera.lookAt(activeIndex * spacing, 0, 0);
  });
  return null;
}

export default function MountainSlider() {
  const [active, setActive] = useState(0);
  const mountainSpacing = 12;

  const mountains = [
    { title: "Glacier Index", subtitle: "Smart insights, cold facts." },
    { title: "Summit Signal", subtitle: "Precision trades above the clouds." },
    { title: "Echo Ridge", subtitle: "Every movement matters." }
  ];

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative', background: '#0e0f11' }}>
      <Canvas camera={{ position: [0, 0, 18], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 10]} intensity={1.2} />
        <fog attach="fog" args={['#0e0f11', 10, 35]} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <CameraRig activeIndex={active} spacing={mountainSpacing} />

        {mountains.map((_, i) => (
          <MountainModel
            key={i}
            position={[i * mountainSpacing, -2, 0]}
            isActive={i === active}
          />
        ))}
      </Canvas>

      {/* Navigation Dots */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '10px'
      }}>
        {mountains.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              width: 12, height: 12, borderRadius: '50%',
              background: i === active ? '#fff' : '#666',
              border: 'none', cursor: 'pointer'
            }}
          />
        ))}
      </div>

      {/* Title Overlay */}
      <div style={{
        position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)',
        color: '#fff', textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 10 }}>{mountains[active].title}</h1>
        <p style={{ fontSize: '1.2rem', color: '#aaa' }}>{mountains[active].subtitle}</p>
      </div>
    </div>
  );
}
