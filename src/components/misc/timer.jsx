import React, { useEffect } from 'react'
import { motion } from "framer-motion";

function Timer({
    timerActive,
  setTimerActive,
  timeSpent,
  setTimeSpent,
}) {
     // Timer functionality
     useEffect(() => {
        let timer;
        if (timerActive) {
          timer = setInterval(() => {
            setTimeSpent(prev => prev + 1);
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [timerActive]);

      
    
      // Format time for display
      const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      };
      
  return (
    <div>
       <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 p-6 rounded-2xl border border-purple-900/50 shadow-lg backdrop-blur-sm"
          >
            <h2 className="text-2xl font-semibold text-purple-400 mb-4">Cosmic Focus Timer</h2>
            
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-48 h-48 rounded-full border-4 border-purple-700/50 flex items-center justify-center">
                  <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-900/30 to-pink-900/30 flex items-center justify-center">
                    <span className="text-4xl font-mono">{formatTime(timeSpent)}</span>
                  </div>
                </div>
                
                <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center">
                  <div className="text-4xl animate-pulse">{timerActive ? "⏱️" : "⏳"}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setTimerActive(!timerActive)}
                  className={`px-6 py-2 rounded-lg font-semibold transition ${
                    timerActive 
                      ? "bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                      : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  }`}
                >
                  {timerActive ? "Pause Timer" : "Start Focus"}
                </button>
                
                <button
                  onClick={() => setTimeSpent(0)}
                  className="px-6 py-2 rounded-lg font-semibold bg-gray-700 hover:bg-gray-600 transition"
                >
                  Reset
                </button>
              </div>
            </div>
          </motion.section>

    </div>
  )
}

export default Timer
