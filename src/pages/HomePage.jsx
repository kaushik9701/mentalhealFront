import { Link } from "react-router-dom";
import { OnboardingFlow } from "./onBoarding/onBoardingFlow";
import { useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function HomePage({ user }) {
  const onboardingComplete = useSelector(state => state.user.onboardingComplete);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const containerRef = useRef(null);
  
  // Floating particles effect
  // const [particles, setParticles] = useState([]);
  
  useEffect(() => {
    if (!onboardingComplete) {
      setShowOnboarding(true);
    }
  }, [onboardingComplete]);

  return (
    <>
    <div >
    
  </div>  
    <div 
      ref={containerRef}
      className="z-10 min-h-screen  text-white relative overflow-hidden"
    >
      {/* Onboarding Modal */}
      {showOnboarding && user && (
        <div className="fixed inset-0 z-50 flex items-center justify-center  bg-black/70">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl p-8 text-white border border-purple-500/30"
          >
            <button
              onClick={() => setShowOnboarding(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors text-2xl bg-gray-800/50 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <OnboardingFlow ob ={setShowOnboarding} />
          </motion.div>
        </div>
      )}
      
      <div className="relative z-10 max-w-6xl mt-14 mx-auto px-4 py-12 md:py-24">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16 md:mb-24"
        >
          {user ? (
            <div className="space-y-6">
              <motion.h1 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.2 }}
  className="text-4xl md:text-6xl pt-56 sm:pt-16 font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent leading-tight md:leading-[1.2] tracking-tight"
>
  Welcome Back, {user.name}
</motion.h1>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-purple-300 text-lg md:text-xl"
              >
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </motion.p>
              <div 
                
                className="inline-block bg-gradient-to-r from-purple-900/50 to-pink-900/50 p-0.5 rounded-full"
              >
                <div className="bg-white/10  border border-white/20 shadow-lg rounded-lg p-3 ring-1 ring-white/10 text-sm">
                  ✨ Your cosmic journey continues...
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="text-5xl md:text-7xl font-bold bg-gradient-to-r pt-56 sm:pt-16 from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-6"
              >
                MindScape
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto"
              >
                Your cosmic companion for mindful journaling and emotional growth
              </motion.p>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
              >
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/10 to-pink-700/15 rounded-lg  opacity-75 animate-pulse"></div>
                  <div className="relative bg-white/10 border border-white/20 shadow-lg rounded-2xl p-3 ring-1 ring-white/10 text-sm">
                    ✨ Embark on your journey of self-discovery
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 pt-32 sm:pt-1 gap-8 mb-16">
          {user ? (
            // Logged-in State
            <>
              <div 
                
                className=""
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg">
                    <span className="text-xl">📅</span>
                  </div>
                  <h2 className="text-2xl font-semibold">Daily Stellar Check-in</h2>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/10  border border-white/20 shadow-lg rounded-2xl p-4 ring-1 ring-white/10">
                    <p className="text-purple-300 mb-1">Last cosmic entry</p>
                    <div className="flex items-center">
                      <span className="text-lg">🌌</span>
                      <p className="ml-2">2 days ago</p>
                    </div>
                  </div>
                  <Link 
                    to="/journal"
                    className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-center py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Add Today's Cosmic Entry 
                      <span className="text-xl">🚀</span>
                    </span>
                  </Link>
                </div>
              </div>

              <Link to="/insight" className="block">
                <div 
                  
                  className=""
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg">
                      <span className="text-xl">📈</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Cosmic Insights</h2>
                  </div>
                  <div className="space-y-6 text-purple-100">
                    <div className="bg-white/10  border border-white/20 shadow-lg rounded-2xl p-3 ring-1 ring-white/10">
                      <p className="text-pink-400 mb-1">Current Mood Orbit</p>
                      <div className="flex items-center">
                        <span className="text-lg">↗️</span>
                        <p className="ml-2 text-lg">23% more positive this week</p>
                      </div>
                    </div>
                    <div className="bg-white/10  border border-white/20 shadow-lg rounded-2xl p-3 ring-1 ring-white/10">
                      <p className="text-pink-400 mb-1">AI Constellation Guidance</p>
                      <p className="flex items-start">
                        <span className="mr-2">💫</span> 
                        "Try morning cosmic pages exercise to boost clarity"
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </>
          ) : (
            // Logged-out State
            <>
              <div
                className="bg-white/10  border border-white/20 shadow-lg rounded-2xl p-8 ring-1 ring-white/10"
                >
                <div className="flex items-center gap-3 mb-6">
                  <div className=" p-2 rounded-lg">
                    <span className="text-xl">✨</span>
                  </div>
                  <h2 className="text-2xl font-semibold">Intelligent Cosmic Journaling</h2>
                </div>
                <p className="text-purple-300 mb-6">
                  AI-powered reflections that adapt to your emotional constellations
                </p>
                <div className="space-y-4">
                  <div className=" gap-3 bg-black/30  border border-white/10 shadow-md py-2 rounded-lg flex items-center pl-7
">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Emotion tracking across galaxies</span>
                  </div>
                  <div className=" gap-3 bg-black/30  border border-white/10 shadow-md py-2 rounded-lg flex items-center pl-7
">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Pattern recognition in cosmic clouds</span>
                  </div>
                  <div className=" gap-3 bg-black/30 border border-white/10 shadow-md py-2 rounded-lg flex items-center pl-7
">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 w-6 h-6 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full" />
                    </div>
                    <span>Personalized stellar insights</span>
                  </div>
                </div>
              </div>

              <div
                className="bg-white/10  border border-white/20 shadow-lg rounded-2xl p-8 ring-1 ring-white/10"
>                 
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 p-2 rounded-lg">
                      <span className="text-xl">🚀</span>
                    </div>
                    <h2 className="text-2xl font-semibold">Launch Your Cosmic Journey</h2>
                  </div>
                  <p className="text-purple-300 mb-6">
                    Join thousands exploring their inner universe through mindful reflection
                  </p>
                </div>
                <div className="grid gap-4">
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-center py-3 rounded-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                  >
                    Create Free Cosmic Account
                  </Link>
                  <Link
                    to="/login"
                    className=" bg-black/30  border border-white/10 shadow-md py-3 flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-purple-900/30"
                  >
                    Existing Cosmic Traveler? Login
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Persistent Journal CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            to="/journal"
            className="inline-block relative group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-500 rounded-xl  opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-white/10  border border-white/20 shadow-lg rounded-2xl p-3 ring-1 ring-white/10 text-lg font-medium transition-all duration-300 group-hover:scale-105 ">
              {user ? (
                <span className="flex items-center justify-center gap-2">
                  Continue Cosmic Journaling 
                 
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Explore Cosmic Demo 
                 
                </span>
              )}
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
    
  </>
  );
}