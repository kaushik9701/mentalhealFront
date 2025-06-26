import React from 'react';
import { FaPaperPlane, FaBullseye } from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtils';



const ListCheckins = (focusCheckins) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <h3 className="text-lg font-bold text-purple-200">Cosmic Journalscsc</h3>
        <span className="ml-2 bg-purple-900/50 text-pink-300 px-2 py-1 rounded-full text-xs">
          Latest first
        </span>
      </div>
      
      <div className="space-y-6">
        {focusCheckins?.length > 0 ? (
          focusCheckins.map((entry, index) => (
            <div key={index} className="border-l-4 border-pink-500 pl-4 py-1 relative">
              <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-gradient-to-r from-purple-600 to-pink-500"></div>
              <div className="text-sm font-medium text-pink-300 mb-1">
                {formatDate(entry.date)}
              </div>
              <div className="bg-purple-900/30 rounded-lg p-4 text-purple-200">
                {entry.content}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-6">
            <p className="text-purple-400 italic">
              No journal entries yet. Record your first cosmic progress!
            </p>
          </div>
        )}
        
        <div className="mt-8">
          <h4 className="text-lg font-bold text-purple-200 mb-4">New Cosmic Entry</h4>
          <div className="flex space-x-3">
            <input
              type="text"
              value={newJournalEntry}
              onChange={(e) => setNewJournalEntry(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && onAddJournalEntry()}
              placeholder="Record your cosmic progress..."
              className="flex-1 border border-purple-800 bg-gray-900/50 text-purple-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent placeholder-purple-700"
            />
            <button
              onClick={onAddJournalEntry}
              className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-3 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-purple-900/30"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListCheckins;