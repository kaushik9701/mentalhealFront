import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
export function JournalEntryList({ entries, setEntries, onSelectEntry, selectedEntryId, isAuthenticated }) {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [viewMode, setViewMode] = useState("all"); // 'all' | 'today' | 'calendar'
const [calendarDate, setCalendarDate] = useState(new Date());
const BACKEND_URL = import.meta.env.VITE_API_URL;

  const fetchEntries = async () => {
    try {
      const authData = localStorage.getItem('authData');
      const token = authData ? JSON.parse(authData).token : null;
      const res = await fetch(`${BACKEND_URL}/journal`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Failed to fetch entries');
      }

      const contentType = res.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response');
      }

      const data = await res.json();
      // Show entries with insight first
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setEntries(data);
      setIsLoadingEntries(false);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
      setIsLoadingEntries(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated]);

  // Open modal on entry click
  const openModal = (entry) => {
    setSelectedEntry(entry);
    setShowFullEntry(false); // default to insight view
    onSelectEntry(entry.id);
  };

  // Close modal
  const closeModal = () => {
    setSelectedEntry(null);
    onSelectEntry(null);
  };
  const hasEntryOnDate = (date) => {
    return entries.some(entry => {
      const entryDate = new Date(entry.timestamp);
      return entryDate.toDateString() === date.toDateString();
    });
  };
  

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const today = new Date();
    switch (viewMode) {
      case "today":
        return (
          entryDate.toDateString() === today.toDateString()
        );
      case "calendar":
        return (
          entryDate.toDateString() === calendarDate.toDateString()
        );
      default:
        return true; // "all"
    }
  });
  

  if (isLoadingEntries) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 mb-4"></div>
        <p className="text-purple-300">Loading cosmic entries...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center text-center text-white">
        <div className="text-3xl font-bold mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Empty Cosmic Space
        </div>
        <p className="text-md text-purple-300 mb-4">
          Your first cosmic thought will appear here
        </p>
        
      </div>
    );
  }

  return (
    <div className="space-y-4">
    {/* FILTER BUTTONS */}
    <div className="flex gap-4 mb-2 text-sm text-purple-300">
      {["all", "today", "calendar"].map(mode => (
        <button
          key={mode}
          onClick={() => setViewMode(mode)}
          className={`px-4 py-1 rounded-full border transition-all duration-300 ${
            viewMode === mode
              ? "bg-purple-700 text-white border-purple-500 scale-105"
              : "border-purple-800 hover:bg-purple-800/50"
          }`}
        >
          {mode.charAt(0).toUpperCase() + mode.slice(1)}
        </button>
      ))}
    </div>
  
    {/* CALENDAR DROPDOWN */}
    {viewMode === "calendar" && (
      <div
        className="p-4 bg-zinc-900 border border-purple-800 rounded-xl shadow-xl animate-fadeIn"
      >
        <Calendar
          onChange={setCalendarDate}
          value={calendarDate}
          tileDisabled={({ date }) => !hasEntryOnDate(date)}
          tileClassName={({ date }) =>
            hasEntryOnDate(date) ? "has-entry" : "no-entry"
          }
        />
      </div>
    )}
  

      <AnimatePresence>
        {filteredEntries.map(entry => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => openModal(entry)}
            className={`
              rounded-xl
              p-4
              cursor-pointer
              shadow-lg
              backdrop-blur-sm
              transition-all
              duration-200
              border
              ${
                selectedEntryId === entry.id
                  ? "bg-gradient-to-r from-purple-900/50 to-pink-900/50 border-purple-500/50"
                  : "bg-gray-900/50 border-purple-900/30 hover:border-purple-500/50"
              }
            `}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold mb-1">
                {entry.title || "Cosmic Thought"}
              </h3>
              <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
                {new Date(entry.timestamp).toLocaleDateString()}
              </span>
            </div>
            <p className="text-xs text-purple-300 mb-2">
              {new Date(entry.timestamp).toLocaleTimeString()}
            </p>
            <p className="text-sm line-clamp-3 text-purple-100">
              {entry.content}
            </p>
            {entry.insight && (
              <div className="mt-2 flex items-center">
                <span className="text-xs bg-pink-900/50 px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">✨</span> Insight Available
                </span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedEntry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="
              fixed inset-0
              bg-black bg-opacity-80
              flex items-center justify-center
              z-50
              p-4
              backdrop-blur-lg
            "
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              className="
                bg-gradient-to-br from-gray-900 to-gray-800
                rounded-2xl
                max-w-3xl
                w-full
                p-8
                relative
                text-white
                max-h-[80vh]
                overflow-y-auto
                shadow-2xl
                border border-purple-700/30
                backdrop-blur-md
              "
              onClick={e => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="
                  absolute top-4 right-4
                  text-gray-400 hover:text-white
                  transition-colors
                  text-2xl
                  bg-gray-800/50
                  rounded-full
                  w-8 h-8
                  flex items-center justify-center
                "
              >
                &times;
              </button>
              
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">
                  {selectedEntry.title || "Cosmic Entry"}
                </h2>
                <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
                  {new Date(selectedEntry.timestamp).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-sm text-purple-300 mb-6">
                {new Date(selectedEntry.timestamp).toLocaleTimeString()}
              </p>
              
              <div className="mb-8">
                <div className="flex items-center mb-2">
                  <div className="w-4 h-4 bg-purple-500 rounded-full mr-2"></div>
                  <h3 className="text-lg font-medium">Your Thoughts</h3>
                </div>
                <div className="bg-gray-800/50 p-4 rounded-xl mb-6 whitespace-pre-wrap">
                  {selectedEntry.content}
                </div>
                
                {selectedEntry.insight && (
                  <>
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 bg-pink-500 rounded-full mr-2"></div>
                      <h3 className="text-lg font-medium">Cosmic Insight</h3>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-xl mb-6 whitespace-pre-wrap">
                      {showFullEntry ? selectedEntry.content : selectedEntry.insight}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between">
                {selectedEntry.insight && (
                  <button
                    onClick={() => setShowFullEntry(!showFullEntry)}
                    className="
                      bg-gradient-to-r from-purple-600 to-pink-600
                      hover:from-purple-700 hover:to-pink-700
                      px-6 py-2
                      rounded-lg
                      font-semibold
                      transition
                      transform
                      hover:scale-[1.02]
                      shadow-lg
                    "
                  >
                    {showFullEntry ? "Show Insight" : "Show Original"}
                  </button>
                )}
                
                <button
                  onClick={closeModal}
                  className="
                    border border-gray-700
                    hover:border-purple-500
                    px-6 py-2
                    rounded-lg
                    font-semibold
                    transition
                    hover:bg-gray-800/50
                    ml-auto
                  "
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}