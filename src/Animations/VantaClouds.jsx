// src/components/VantaClouds.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const VantaClouds = () => {
  const vantaRef = useRef(null);
  const vantaEffectRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    const loadVanta = async () => {
      const VANTA = await import("https://cdn.skypack.dev/vanta/dist/vanta.clouds.min.js");

      if (!cancelled && !vantaEffectRef.current && vantaRef.current) {
        vantaEffectRef.current = VANTA.default({
          el: vantaRef.current,
          THREE: THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 300.0,
          minWidth: 300.0,
          skyColor: 0x000000,
          cloudColor: 0x9d6bac,
          sunColor: 0x505050,
          sunGlareColor: 0xed26ed,
          sunlightColor: 0xffffff,
          speed: 1.9,
        });
      }
    };

    loadVanta();

    return () => {
      cancelled = true;
      if (vantaEffectRef.current) {
        vantaEffectRef.current.destroy();
        vantaEffectRef.current = null;
      }
    };
  }, []);

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
