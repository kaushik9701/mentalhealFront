import { motion} from "framer-motion";
export function Step2Choice({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-8"
    >
      <motion.h2 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        How will you navigate your cosmic journey?
      </motion.h2>
      
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-purple-300 text-center mb-8"
      >
        Choose your primary focus for this space
      </motion.p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("objective")}
          className="bg-gradient-to-br from-purple-900/50 to-gray-800/50 p-6 rounded-2xl border border-purple-700/30 backdrop-blur-sm flex flex-col items-center text-center h-full"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl mb-4">
            🎯
          </div>
          <h3 className="text-xl font-semibold mb-2">Mission Control</h3>
          <p className="text-purple-300 mb-4">
            Work toward specific goals and achievements
          </p>
          <ul className="text-sm text-purple-400 text-left w-full space-y-1">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Goal tracking
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Progress analytics
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Achievement milestones
            </li>
          </ul>
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect("stray")}
          className="bg-gradient-to-br from-gray-800/50 to-purple-900/50 p-6 rounded-2xl border border-purple-700/30 backdrop-blur-sm flex flex-col items-center text-center h-full"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-2xl mb-4">
            🌠
          </div>
          <h3 className="text-xl font-semibold mb-2">Cosmic Reflections</h3>
          <p className="text-purple-300 mb-4">
            Journal thoughts and explore your inner universe
          </p>
          <ul className="text-sm text-purple-400 text-left w-full space-y-1">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Thought journaling
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Emotional patterns
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              AI-powered insights
            </li>
          </ul>
        </motion.button>
      </div>
    </motion.div>
  );
}
