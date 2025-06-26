import React from 'react'
import { AnimatePresence, motion } from "framer-motion";

function Celebration({ showCompletion, setShowCompletion }) {
  return (
    <AnimatePresence>
    {showCompletion && (
      <motion.div 
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.5 }}
        className="fixed inset-0 z-50 flex items-center justify-center"
      >
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        <motion.div 
          className="bg-gradient-to-br from-purple-900 to-pink-900 p-8 rounded-2xl text-center z-50 max-w-md mx-4 border border-purple-500/30"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold mb-4">Mission Accomplished!</h2>
          <p className="text-lg mb-6">You've successfully completed your cosmic tasks!</p>
          <button 
            onClick={() => setShowCompletion(false)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-6 py-3 rounded-lg font-semibold transition transform hover:scale-[1.02]"
          >
            Continue Journey
          </button>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
  )
}

export default Celebration
