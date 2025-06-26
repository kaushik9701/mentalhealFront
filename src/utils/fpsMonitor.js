// src/useFPSMonitor.js
import { useEffect } from 'react';
import Stats from 'stats.js';

export function useFPSMonitor() {
  useEffect(() => {
    const stats = new Stats();
    stats.showPanel(0); // 0 = FPS, 1 = MS, 2 = MB
    document.body.appendChild(stats.dom);

    const animate = () => {
      stats.begin();
      stats.end();
      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    return () => {
      document.body.removeChild(stats.dom);
    };
  }, []);
}
