// src/components/VantaClouds.jsx
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VantaClouds = () => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);

  useEffect(() => {
    const loadVanta = async () => {
      // Dynamically import the Vanta script
      const VANTA = await import("https://cdn.skypack.dev/vanta/dist/vanta.clouds.min.js");

      if (!vantaEffect && vantaRef.current) {
        setVantaEffect(
          VANTA.default({
            el: vantaRef.current,
            THREE: THREE,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            touchControls: true,
            minHeight: 200.0,
            minWidth: 200.0,
            skyColor: 0x000000,
            cloudColor: 0x9d6bac,
            sunColor: 0x505050,
            sunGlareColor: 0xed26ed,
            sunlightColor: 0xffffff,
            speed: 0.7,
          })
        );
      }
    };

    loadVanta();

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div
      ref={vantaRef}
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    />
  );
};

export default VantaClouds;
