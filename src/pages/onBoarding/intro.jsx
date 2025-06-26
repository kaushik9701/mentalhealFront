import { motion} from "framer-motion";
export function Step1Intro({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="inline-block mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-4xl">
          ✨
        </div>
      </motion.div>
      
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-4"
      >
        Welcome to MindScape
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-purple-300 mb-6 max-w-md mx-auto"
      >
        Your cosmic companion for mindful journaling and emotional growth
      </motion.p>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-5 mb-8 max-w-lg mx-auto"
      >
        <div className="flex items-start">
          <div className="mr-3 mt-1 text-xl text-purple-500">🌌</div>
          <p className="text-left text-purple-200">
            Explore your inner universe through reflection and insight
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="mr-3 mt-1 text-xl text-purple-500">💫</div>
          <p className="text-left text-purple-200">
            Discover patterns in your thoughts and emotions
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="mr-3 mt-1 text-xl text-purple-500">🚀</div>
          <p className="text-left text-purple-200">
            Grow toward your goals with cosmic clarity
          </p>
        </div>
      </motion.div>
      
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onNext}
        className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg transition transform hover:scale-105"
      >
        Begin Cosmic Journey
      </motion.button>
    </motion.div>
  );
}
