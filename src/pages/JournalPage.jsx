import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { JournalEntryList } from "../components/listEntries";
import { JournalEntryForm } from "../components/addEntry";
import { Sparkles, Lightbulb, PencilLine } from "lucide-react";

export default function JournalPage() {
  const [entries, setEntries] = useState([]);
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useSelector((state) => state.user);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  const handleSelectEntry = (id) => {
    setSelectedEntryId(id);
  };

  const handleAdd = (newEntry) => {
    setEntries((prev) => [newEntry, ...prev]);
    setSelectedEntryId(null);
    toast.success("Cosmic entry added!");
  };

  return (
    <>
    <div className="flex flex-col-reverse md:flex-row min-h-[calc(100vh-5.5rem)] pt-24  text-white relative overflow-hidden">
     

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 ">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"
          />
        </div>
      )}

      {/* Entry List Side */}
      <div className="relative z-10 mt-5 w-full md:w-2/5 lg:w-1/3 p-4 md:p-6">
        <div className="mb-6 bg-black/30  border border-white/10 shadow-md rounded-2xl p-6 ring-1 ring-white/10">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
            Cosmic Journal
          </h1>
          <p className="text-purple-200 text-sm">
            Your journey through thoughts and insights
          </p>
        </div>

        <JournalEntryList
          entries={entries}
          setEntries={setEntries}
          onSelectEntry={handleSelectEntry}
          selectedEntryId={selectedEntryId}
          isAuthenticated={isAuthenticated}
        />
      </div>

      {/* Entry Form Section */}
      {!selectedEntryId && (
        <>
          <div className="hidden md:block w-px bg-gradient-to-b from-transparent via-purple-600 to-transparent"></div>
          <div className="relative mt-5 z-10 w-full p-4 md:p-6">
            <div className="sticky top-4 bg-black/30  border border-white/10 shadow-md rounded-2xl p-6 ring-1 ring-white/10">
              <h2 className="text-2xl font-bold mb-2">New Cosmic Thought</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
              <JournalEntryForm onAdd={handleAdd} />
            </div>
          </div>
        </>
      )}
      
    </div>
    <div className="w-full px-4 py-6 md:px-12 lg:px-20 text-white">
      <div className="bg-black/30 backdrop-blur-md border border-white/10 rounded-2xl shadow-lg p-6 md:p-10 ring-1 ring-white/10">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          {/* Image or visual icon */}
          <div className="flex-shrink-0">
          <img
  src="/assets/JournalAI.jpg"
  alt="AI Insight Illustration"
  className="w-48 h-48 object-contain rounded-xl shadow-md hidden sm:block"
/>

          </div>

          {/* Textual Explanation */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-purple-400 flex items-center gap-2 mb-3">
              <Sparkles className="w-6 h-6 text-pink-400" />
              How AI Guides Your Journey
            </h3>
            <p className="text-purple-200 text-sm md:text-base mb-4">
              Each journal entry is analyzed for emotional tone, recurring patterns,
              and introspective depth. Our AI learns from your writing to provide:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm text-purple-300">
              <li className="flex gap-2 items-center">
                <Lightbulb className="w-4 h-4 text-yellow-400" /> Personalized insight summaries
              </li>
              <li className="flex gap-2 items-center">
                <Sparkles className="w-4 h-4 text-pink-400" /> Mood trajectory suggestions
              </li>
              <li className="flex gap-2 items-center">
                <PencilLine className="w-4 h-4 text-cyan-400" /> Writing tips to deepen your reflection
              </li>
            </ul>
            <p className="text-purple-400 mt-4 text-sm">
              Journaling regularly helps the system understand your patterns more deeply
              — giving you meaningful and timely feedback. You just write, and we help you grow.
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
