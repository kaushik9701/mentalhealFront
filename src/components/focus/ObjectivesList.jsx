import React from 'react';
import ObjectiveCard from './ObjectiveCard';
import { FaPlus } from 'react-icons/fa';

const ObjectivesList = ({ objectives, onSelectObjective, onAddObjective }) => {
  return (
    <div className="max-w-6xl mt-28 mx-auto">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-purple-200">Objective Focus</h1>
        <p className="text-purple-400 mt-1">Your cosmic objectives</p>
      </header>

      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-800/50">
        <div className="p-5 border-b border-purple-900 flex justify-between items-center">
          <h2 className="text-xl font-bold text-purple-200">Your Cosmic Objectives</h2>
          <button 
            onClick={onAddObjective}
            className="bg-gradient-to-r from-purple-700 to-pink-600 text-white p-3 rounded-xl hover:opacity-90 transition-all shadow-lg shadow-purple-900/30"
          >
            <FaPlus className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5">
          {objectives.length === 0 ? (
           <div className="text-center py-16">
           <svg
             className="mx-auto mb-4 w-16 h-16 text-purple-400"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               d="M9 17v-2a4 4 0 014-4h1m-4 6v2m-6-6v2a4 4 0 004 4h1m0-4v-2m6 6h2a4 4 0 004-4v-1m-6 0v-2m0-6V5a4 4 0 00-4-4H9a4 4 0 00-4 4v1m6 0h2"
             />
           </svg>
           <h2 className="text-2xl font-semibold text-purple-200 mb-2">No Objectives Found</h2>
           <p className="text-purple-400 max-w-md mx-auto">
             You don't have any focus objectives yet. Start by adding a new goal to track your progress!
           </p>
           <button
             className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition"
             onClick={onAddObjective}
           >
             Add New Objective
           </button>
         </div>
         
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {objectives.map((objective) => (
                <ObjectiveCard 
                  key={objective.id}
                  objective={objective}
                  onClick={() => onSelectObjective(objective)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ObjectivesList;