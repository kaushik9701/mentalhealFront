import { useEffect, useState } from "react";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { toast } from "react-toastify";

export function JournalEntryList({ entries, setEntries, onSelectEntry, selectedEntryId, isAuthenticated }) {
  const [showFullEntry, setShowFullEntry] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [isLoadingEntries, setIsLoadingEntries] = useState(true);
  const [viewMode, setViewMode] = useState("all");
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

      if (!res.ok) throw new Error(await res.text() || 'Failed to fetch entries');

      const data = await res.json();
      data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setEntries(data);
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(error.message);
    } finally {
      setIsLoadingEntries(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) fetchEntries();
  }, [isAuthenticated]);

  const openModal = (entry) => {
    setSelectedEntry(entry);
    setShowFullEntry(false);
    onSelectEntry(entry.id);
  };

  const closeModal = () => {
    setSelectedEntry(null);
    onSelectEntry(null);
  };

  const hasEntryOnDate = (date) => {
    return entries.some(entry => new Date(entry.timestamp).toDateString() === date.toDateString());
  };

  const filteredEntries = entries.filter(entry => {
    const entryDate = new Date(entry.timestamp);
    const today = new Date();
    switch (viewMode) {
      case "today": return entryDate.toDateString() === today.toDateString();
      case "calendar": return entryDate.toDateString() === calendarDate.toDateString();
      default: return true;
    }
  });

  if (isLoadingEntries) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent animate-spin rounded-full mb-4"></div>
        <p className="text-purple-300">Loading entries...</p>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center text-center text-white">
        <div className="text-3xl font-bold mb-3 text-purple-400">Empty Journal</div>
        <p className="text-md text-purple-300 mb-4">Add your first thought</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center justify-center pb-2 mb-2 text-sm text-purple-300">
        {['all', 'today', 'calendar'].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-1 rounded-full border transition ${
              viewMode === mode ? "bg-purple-700 text-white border-purple-500" : "border-purple-800 hover:bg-purple-800/50"
            }`}
          >
            {mode.charAt(0).toUpperCase() + mode.slice(1)}
          </button>
        ))}
      </div>

      {viewMode === 'calendar' && (
        <div className="p-4 bg-zinc-900 border border-purple-800 rounded-xl shadow">
          <Calendar
            onChange={setCalendarDate}
            value={calendarDate}
            tileDisabled={({ date }) => !hasEntryOnDate(date)}
            tileClassName={({ date }) => hasEntryOnDate(date) ? "has-entry" : "no-entry"}
          />
        </div>
      )}

      {filteredEntries.map(entry => (
        <div
          key={entry.id}
          onClick={() => openModal(entry)}
          className={`p-4 rounded-xl cursor-pointer shadow bg-gray-900/50 transition border ${
            selectedEntryId === entry.id ? "border-purple-500 bg-purple-900/30" : "border-purple-800 hover:border-purple-500"
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold mb-1">{entry.title || "Untitled"}</h3>
            <span className="text-xs bg-purple-900/50 px-2 py-1 rounded-full">
              {new Date(entry.timestamp).toLocaleDateString()}
            </span>
          </div>
          <p className="text-xs text-purple-300 mb-2">
            {new Date(entry.timestamp).toLocaleTimeString()}
          </p>
          <p className="text-sm line-clamp-3 text-purple-100">{entry.content}</p>
          {entry.insight && (
            <div className="mt-2 text-xs bg-pink-900/50 px-2 py-1 rounded-full text-white inline-block">
              Insight Available
            </div>
          )}
        </div>
      ))}

      {selectedEntry && (
        <div
          className="fixed inset-0 backdrop-blur-2xl flex items-center justify-center z-50 p-4 "
          onClick={closeModal}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-3xl mt-20 w-full p-6 relative text-white max-h-[80vh] overflow-y-auto border border-purple-700"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
            >
              &times;
            </button>

            <h2 className="text-2xl font-bold mb-2">
              {selectedEntry.title || "Journal Entry"}
            </h2>
            <p className="text-sm text-purple-300 mb-4">
              {new Date(selectedEntry.timestamp).toLocaleString()}
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-1">Your Thoughts</h3>
              <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
                {selectedEntry.content}
              </div>
            </div>

            {selectedEntry.insight && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-1">Insight</h3>
                <div className="bg-gray-800 p-4 rounded-lg whitespace-pre-wrap">
                  {showFullEntry ? selectedEntry.content : selectedEntry.insight}
                </div>
              </div>
            )}

            <div className="flex justify-between">
              
              <button
                onClick={closeModal}
                className="border border-gray-700 px-4 py-2 rounded-md text-sm hover:border-purple-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
