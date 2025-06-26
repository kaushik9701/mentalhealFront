import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;
  varying vec2 vUv;
  void main() {
    gl_FragColor = vec4(0.3, 0.6, 0.9, 1.0); // Simple blue color
  }
`;

function SafeShaderMaterial({ vertexShader, fragmentShader }) {
  const [shaderReady, setShaderReady] = useState(false);
  const materialRef = useRef();

  useEffect(() => {
    try {
      // Verify shader compilation
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader
      });
      setShaderReady(true);
    } catch (error) {
      console.error('Shader error:', error);
    }
  }, [vertexShader, fragmentShader]);

  if (!shaderReady) return null;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      side={THREE.DoubleSide}
    />
  );
}

function Background() {
  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[10, 10]} />
      <SafeShaderMaterial 
        vertexShader={vertexShader} 
        fragmentShader={fragmentShader} 
      />
    </mesh>
  );
}

export default function BackgroundScene() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1
    }}>
      <Canvas
        gl={{
          antialias: true,
          powerPreference: "high-performance"
        }}
        camera={{ position: [0, 0, 5], fov: 75 }}
      >
        <Background />
      </Canvas>
    </div>
  );
}