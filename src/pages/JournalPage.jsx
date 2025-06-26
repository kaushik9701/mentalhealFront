import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { JournalEntryList } from "../components/listEntries";
import { JournalEntryForm } from "../components/addEntry";

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
    <div className="flex flex-col-reverse md:flex-row min-h-[calc(100vh-5.5rem)] pt-24 bg-gradient-to-b from-[#0f0c29] via-[#1a1a40] to-[#302b63] text-white relative overflow-hidden">
      {/* Background Blur + Particles Layer */}
      <div className="absolute inset-0 z-0">
        {/* Future: particles or animated canvas could go here */}
      </div>

      {/* Loading Spinner */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 rounded-full border-4 border-t-purple-500 border-r-purple-500 border-b-transparent border-l-transparent"
          />
        </div>
      )}

      {/* Entry List Side */}
      <div className="relative z-10 mt-5 w-full md:w-2/5 lg:w-1/3 p-4 md:p-6">
        <div className="mb-6 bg-black/30 backdrop-blur-md border border-white/10 shadow-md rounded-2xl p-6 ring-1 ring-white/10">
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
            <div className="sticky top-4 bg-black/30 backdrop-blur-md border border-white/10 shadow-md rounded-2xl p-6 ring-1 ring-white/10">
              <h2 className="text-2xl font-bold mb-2">New Cosmic Thought</h2>
              <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4"></div>
              <JournalEntryForm onAdd={handleAdd} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
