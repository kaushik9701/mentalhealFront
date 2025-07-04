import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react"; // Optional: use any arrow icon or ↓

export function Step2Choice({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="py-4 px-0 md:py-7 md:px-0 flex flex-col items-center"
    >
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
      >
        What Awaits Inside
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-purple-300 text-center mb-10 text-sm md:text-base max-w-2xl"
      >
        Your journal offers two powerful modes — one for reflecting and uncovering emotional patterns, and another to help you stay focused and make meaningful progress.
      </motion.p>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        {/* Self-Discovery */}
        <div className="bg-gradient-to-br from-gray-800/40 to-purple-900/50 p-6 md:p-8 rounded-2xl border border-purple-700/30 backdrop-blur-md shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-3">Self-Discovery</h3>
          <p className="text-purple-300 mb-5">
            Reflect freely. Let the AI help you uncover emotional patterns, mental tendencies, and subtle personal insights.
          </p>
          <ul className="text-sm text-purple-400 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Thought journaling with context awareness
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Emotional trend analysis & summaries
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Prompts, quotes, and daily reflections
            </li>
          </ul>
        </div>

        {/* Focused Growth */}
        <div className="bg-gradient-to-br from-purple-900/40 to-gray-800/40 p-6 md:p-8 rounded-2xl border border-purple-700/30 backdrop-blur-md shadow-lg">
          <h3 className="text-2xl font-semibold text-white mb-3">Focused Growth</h3>
          <p className="text-purple-300 mb-5">
            Define goals or habits and stay on course with smart suggestions and gentle accountability.
          </p>
          <ul className="text-sm text-purple-400 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Daily check-ins and progress snapshots
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Personalized guidance from your entries
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              Motivation through self-alignment
            </li>
          </ul>
        </div>
      </div>

      {/* Arrow Button */}
      <div className="mt-12 ">
        <button
          onClick={onSelect}
          className="w-24 p-2 pl-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-transform duration-200 hover:scale-110 "
          aria-label="Next"
        >
          <ArrowRight className="w-4 h-4 md:w-6 md:h-6" />
        </button>
      </div>
    </motion.div>
  );
}
