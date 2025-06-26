import { AnimatePresence, motion } from "framer-motion";
import React from 'react'

function ObjectiveModal({ 
  objectives,  
  setCurrentObjective, 
  formatDate 
})  {
  return (
    <AnimatePresence>
    
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className=" flex items-center justify-center p-4"
      >
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-50 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-purple-700/30 shadow-2xl p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
        >
         
          
          <h2 className="text-2xl font-bold text-purple-400 mb-6">Your Cosmic Objectives</h2>
          
          <div className="space-y-4">
            {objectives.map(obj => (
              <div 
                key={obj.id}
                className="p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-purple-700/30 hover:border-purple-500/50 transition cursor-pointer"
                onClick={() => {
                  setCurrentObjective(obj);
                  
                }}
              >
                <h3 className="font-bold text-lg flex items-center">
                  <span className="mr-2">🚀</span> {obj.title}
                </h3>
                <p className="text-purple-300 text-sm mt-1">
                  Deadline: {formatDate(obj.deadline)}
                </p>
              </div>
            ))}
            
            <button 
              onClick={() => {
                setCurrentObjective(null);
                
              }}
              className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-700/30 hover:border-purple-500/50 transition text-center"
            >
              <span className="font-bold text-purple-300">+ Create New Objective</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    
  </AnimatePresence>

  )
}

export default ObjectiveModal
