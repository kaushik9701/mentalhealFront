import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function Step1Intro({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="text-center py-4 px-0 md:py-7 md:px-0"
    >
      {/* Gradient Title */}
      <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6">
        Understand More Than Just Your Struggles
      </h2>

      {/* Description */}
      <p className="text-purple-200 max-w-xl mx-auto text-base md:text-lg leading-relaxed mb-6">
        Your mind is more than what weighs it down. It holds patterns, insights, resilience — even in the chaos. Whether you're feeling stuck or thriving, there’s always something new to discover about yourself.
      </p>

      <p className="text-purple-300 max-w-xl mx-auto text-sm md:text-base leading-relaxed mb-10">
        This space is built to reflect not just your pain, but your growth. To help you see the connections, the habits, the potential — and guide you with clarity, not noise.
      </p>

      {/* CTA Button */}
      <button
  onClick={onNext}
  className="p-2 w-24 pl-9 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white transition-transform duration-200 hover:scale-110"
  aria-label="Continue"
>
  <ArrowRight className="w-6 h-6  text-white" />
</button>
    </motion.div>
  );
}
