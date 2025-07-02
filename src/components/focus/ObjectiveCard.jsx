import React from 'react';
import { FaCalendarAlt, FaTasks, FaCheck } from 'react-icons/fa';

import { formatDate } from '../../utils/dateUtils';

const ObjectiveCard = ({ objective, onClick }) => {
  // Map backend properties to frontend expectations
  const title = objective.objective; 
  const createdDate = objective.createdAt; 
  const lastCheckin = objective.lastCheckIn;

  
  // Create tasks from suggestions
  const tasks = objective.suggestions?.map((suggestion, index) => ({
    id: `suggestion-${index}`,
    text: suggestion,
    completed: false // Placeholder - add completion logic later
  })) || [];

  return (
    <div 
      onClick={onClick}
      className="border border-purple-800/50 rounded-2xl p-5 transition-all duration-300 cursor-pointer hover:border-pink-500/50 hover:shadow-lg hover:shadow-purple-900/20 bg-gray-800/70 backdrop-blur-sm flex flex-col"
    >
      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
          <h3 className="font-bold text-xl text-purple-200">{title}</h3>
        
        </div>
        
        <div className="mb-4">
          <div className="flex items-center text-sm text-purple-400 mb-1">
            <FaCalendarAlt className="mr-2 text-pink-400" />
            <span>Created: {formatDate(createdDate)}</span>
          </div>
          <div className="flex items-center text-sm text-purple-400">
            <FaCalendarAlt className="mr-2 text-green-400" />
            <span>Last check-in: {formatDate(lastCheckin)}</span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex items-center text-sm font-medium text-purple-300 mb-2">
            <FaTasks className="mr-2" />
            <span>Suggestions</span>
          </div>
          <div className="space-y-1">
            {tasks.slice(0, 3).map((task) => (
              <div 
                key={task.id}
                className="flex items-center p-2 rounded-lg bg-purple-900/30"
              >
                <div className="border-2 border-purple-400 w-4 h-4 rounded-full flex items-center justify-center mr-3">
                  {/* Completion status would go here */}
                </div>
                <span className="text-sm text-purple-200">
                  {task.text}
                </span>
              </div>
            ))}
            {tasks.length > 3 && (
              <div className="text-xs text-purple-500 mt-1">
                +{tasks.length - 3} more suggestions
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-purple-900">
        <button className="w-full bg-purple-900/50 text-purple-200 py-2 rounded-lg font-medium hover:bg-purple-800/50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ObjectiveCard;