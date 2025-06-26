import React, { useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { TextureLoader } from "three";

function FogPlane() {
  const meshRef = useRef();
  const texture = useLoader(TextureLoader, "/assets/cosmic-bg.png"); // <-- Ensure this image is placed in your public/ directory as 'cosmic-bg.png'

  texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping;
  texture.repeat.set(1.5, 1);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      texture.offset.x = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[60, 60]} />
      <meshBasicMaterial
        map={texture}
        transparent={true}
        opacity={1}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

export default function FogScene() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 10,
        background: "#000"
      }}
      camera={{ position: [0, 0, 1], fov: 50 }}
    >
      <FogPlane />
    </Canvas>
  );
}