import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function InsightPage() {
  const [activeTab, setActiveTab] = useState("moods");
  const [moodData, setMoodData] = useState(null);
  const [strengthData, setStrengthData] = useState(null);
  const [insightData, setInsightData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock data for visualization
      setMoodData({
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            label: "Happiness",
            data: [65, 59, 80, 81, 56, 55, 70],
            backgroundColor: "rgba(134, 65, 244, 0.4)",
            borderColor: "rgba(134, 65, 244, 1)",
            tension: 0.4,
            fill: true
          },
          {
            label: "Anxiety",
            data: [28, 48, 40, 19, 86, 27, 30],
            backgroundColor: "rgba(255, 99, 132, 0.4)",
            borderColor: "rgba(255, 99, 132, 1)",
            tension: 0.4,
            fill: true
          }
        ]
      });

      setStrengthData([
        { name: "Empathy", value: 85 },
        { name: "Resilience", value: 72 },
        { name: "Creativity", value: 90 },
        { name: "Curiosity", value: 68 },
        { name: "Focus", value: 60 }
      ]);

      setInsightData([
        "You've shown remarkable growth in handling stressful situations this week",
        "Your journal entries indicate a 23% increase in positive self-talk",
        "Your creativity peaks around 3pm - consider scheduling brainstorming sessions then",
        "You're developing stronger emotional boundaries - keep nurturing this skill"
      ]);

      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#1a1a40] to-[#302b63] text-white p-4 md:p-6 relative overflow-hidden">
      {/* Cosmic Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Stars */}
        {[...Array(200)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-white animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7 + 0.3,
              animationDuration: `${Math.random() * 3 + 2}s`
            }}
          />
        ))}
        
        {/* Large Nebula */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-900 rounded-full mix-blend-screen opacity-30 blur-[100px]" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-indigo-900 rounded-full mix-blend-screen opacity-30 blur-[100px]" />
      </div>

      <div className="relative mt-12 z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-16 pt-6"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-3xl">
              🧠
            </div>
          </motion.div>
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Cosmic Insight Center
          </h1>
          <p className="mt-3 text-purple-300 text-sm md:text-base">
            Your reflections. Your growth. Your cosmic journey.
          </p>
        </motion.header>

        {/* Tabs */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex bg-gray-900/50 backdrop-blur-sm rounded-lg p-1 border border-purple-900/50">
            {["moods", "strengths", "insights"].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md text-sm md:text-base font-medium transition ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Intro */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <p className="text-lg text-purple-200 mb-4">
            Explore your emotional universe through personalized analytics and AI-powered reflections.
          </p>
          <p className="text-sm text-purple-400 italic">
            Discover mood patterns, personality strengths, and actionable insights tailored to your journey.
          </p>
        </motion.section>

        {/* Content */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-900/50 shadow-xl mb-12"
        >
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
              <p className="text-purple-300">Analyzing your cosmic patterns...</p>
            </div>
          ) : (
            <>
              {/* Mood Analytics */}
              {activeTab === "moods" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                    <span className="mr-2">📈</span> Mood Analytics
                  </h2>
                  
                  {/* Mood Chart */}
                  <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-900/30 mb-8">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-semibold">Weekly Mood Trends</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                          <span className="text-sm">Happiness</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-3 h-3 bg-pink-500 rounded-full mr-2"></div>
                          <span className="text-sm">Anxiety</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Chart Visualization */}
                    <div className="h-64 relative">
                      <div className="absolute bottom-0 left-0 right-0 top-0 flex flex-col justify-between">
                        {[100, 75, 50, 25, 0].map(val => (
                          <div key={val} className="flex items-center">
                            <div className="w-10 text-right text-xs text-gray-500 pr-2">{val}%</div>
                            <div className="flex-1 h-px bg-gray-700"></div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Data bars */}
                      <div className="absolute bottom-0 left-0 right-0 h-48 flex items-end px-10 space-x-4">
                        {moodData.labels.map((day, i) => (
                          <div key={day} className="flex-1 flex flex-col items-center">
                            <div className="flex items-end justify-center w-full h-full space-x-1">
                              <div 
                                className="w-4 bg-gradient-to-t from-purple-600 to-purple-900 rounded-t"
                                style={{ height: `${moodData.datasets[0].data[i]}%` }}
                              ></div>
                              <div 
                                className="w-4 bg-gradient-to-t from-pink-600 to-pink-900 rounded-t"
                                style={{ height: `${moodData.datasets[1].data[i]}%` }}
                              ></div>
                            </div>
                            <div className="text-xs text-gray-400 mt-2">{day}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Mood Insights */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-purple-900/30">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">✨</span> Key Observation
                      </h3>
                      <p className="text-purple-200">
                        Your happiness peaks mid-week, while anxiety tends to increase towards the weekend. 
                        Consider planning relaxing activities for Fridays.
                      </p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-pink-900/30 to-gray-800/50 rounded-xl p-6 border border-purple-900/30">
                      <h3 className="text-lg font-semibold mb-4 flex items-center">
                        <span className="mr-2">💡</span> AI Recommendation
                      </h3>
                      <p className="text-purple-200">
                        Try our "Friday Wind-Down" meditation series to help transition into the weekend 
                        with more ease and less anxiety.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Strengths Analytics */}
              {activeTab === "strengths" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                    <span className="mr-2">🌟</span> Personal Strengths
                  </h2>
                  
                  {/* Strengths Visualization */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800/30 rounded-xl p-6 border border-purple-900/30">
                      <h3 className="text-lg font-semibold mb-6">Your Core Strengths</h3>
                      
                      <div className="space-y-5">
                        {strengthData.map((strength, index) => (
                          <div key={strength.name} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-purple-300">{strength.name}</span>
                              <span className="text-pink-400">{strength.value}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-2.5">
                              <motion.div 
                                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${strength.value}%` }}
                                transition={{ duration: 1, delay: index * 0.1 }}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-900/30 flex flex-col">
                      <h3 className="text-lg font-semibold mb-4">Strength Spotlight</h3>
                      <div className="flex-1 flex flex-col items-center justify-center">
                        <div className="w-32 h-32 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center mb-6">
                          <span className="text-4xl">✨</span>
                        </div>
                        <h4 className="text-xl font-bold mb-2">Creativity</h4>
                        <p className="text-center text-purple-200">
                          Your creativity is in the top 10% of users! You consistently demonstrate 
                          innovative thinking in your journal entries.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* Strength Insights */}
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-purple-900/30">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <span className="mr-2">🚀</span> Growth Opportunities
                    </h3>
                    <p className="text-purple-200 mb-4">
                      Based on your strength profile, we recommend focusing on developing your 
                      curiosity through these activities:
                    </p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <li className="flex items-center bg-purple-900/30 p-3 rounded-lg">
                        <span className="mr-2">🔍</span> Daily exploration journaling
                      </li>
                      <li className="flex items-center bg-purple-900/30 p-3 rounded-lg">
                        <span className="mr-2">📚</span> Curiosity-driven reading challenge
                      </li>
                      <li className="flex items-center bg-purple-900/30 p-3 rounded-lg">
                        <span className="mr-2">💡</span> Weekly "What if?" brainstorming
                      </li>
                      <li className="flex items-center bg-purple-900/30 p-3 rounded-lg">
                        <span className="mr-2">🎯</span> Question-based goal setting
                      </li>
                    </ul>
                  </div>
                </div>
              )}
              
              {/* AI Insights */}
              {activeTab === "insights" && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-purple-400 mb-6 flex items-center">
                    <span className="mr-2">🤖</span> AI-Powered Insights
                  </h2>
                  
                  {/* Insight Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {insightData.map((insight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-purple-900/30"
                      >
                        <div className="flex items-start">
                          <div className="mr-4 mt-1 text-2xl">
                            {index === 0 ? "🌱" : 
                             index === 1 ? "💬" : 
                             index === 2 ? "⏰" : "🛡️"}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold mb-2">
                              {index === 0 ? "Growth Insight" : 
                               index === 1 ? "Language Pattern" : 
                               index === 2 ? "Productivity Tip" : "Emotional Development"}
                            </h3>
                            <p className="text-purple-200">{insight}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  
                  {/* Insight Summary */}
                  <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-900/30">
                    <h3 className="text-lg font-semibold mb-4 flex items-center">
                      <span className="mr-2">📊</span> Your Personal Growth Summary
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-400">23%</div>
                        <div className="text-sm text-purple-300">More positive</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-pink-400">15%</div>
                        <div className="text-sm text-purple-300">Less anxiety</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-purple-400">42%</div>
                        <div className="text-sm text-purple-300">More insights</div>
                      </div>
                      <div className="bg-gray-800/50 p-4 rounded-lg text-center">
                        <div className="text-2xl font-bold text-pink-400">8</div>
                        <div className="text-sm text-purple-300">New strengths</div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <p className="text-purple-200">
                        Overall, you're showing excellent progress in emotional intelligence and 
                        self-awareness. Your consistency in journaling is paying off with measurable 
                        improvements in mental wellbeing.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 font-medium transition group"
          >
            <span className="mr-1 group-hover:-translate-x-1 transition-transform">←</span>
            Back to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}