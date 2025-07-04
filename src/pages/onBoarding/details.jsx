import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

export function Step3Details({ onFinish}) {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [profession, setProfession] = useState("");
  const [personalitySummary, setPersonalitySummary] = useState("");
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();

    const authData = localStorage.getItem('authData');
    const token = authData ? JSON.parse(authData).token : null;

    const data = {
      age: parseInt(age),
      gender,
      profession,
      personalitySummary,
    };

    try {
      await axios.post(`${BACKEND_URL}/onboarding`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
          
        }
      });

      onFinish(); // success callback
    } catch (error) {
      console.error("Error submitting onboarding details:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="py-4 px-0 md:py-7 md:px-0"
    >
      {/* Title & Subtitle */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-2xl md:text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
      >
        Personalize Your Cosmic Journey
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-purple-300 text-center mb-4 md:mb-8"
      >
        Help us tailor your experience (all fields optional)
      </motion.p>

      {/* Form */}
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div>
          <textarea
            placeholder="Tell us a little bit about yourself"
            value={personalitySummary}
            onChange={(e) => setPersonalitySummary(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-purple-500 border border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-600 transition resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-purple-500 border border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-purple-500 border border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-gray-800/50 text-white placeholder-purple-500 border border-purple-700/30 focus:outline-none focus:ring-2 focus:ring-purple-600 transition"
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg transition mt-6"
        >
          Launch Cosmic Journey
        </motion.button>
      </form>
    </motion.div>
  );
}
