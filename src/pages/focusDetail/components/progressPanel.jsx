import React from "react";
import { FaChartLine, FaChevronDown, FaChevronUp } from "react-icons/fa";

const ProgressPanel = ({ objective, isExpanded, onToggle }) => {
  const progress = objective?.progress || 0;
  
  return (
    <div>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <FaChartLine className="text-blue-400 mr-2" />
          <h2 className="text-xl font-semibold text-blue-200">Progress</h2>
        </div>
        {isExpanded ? (
          <FaChevronUp className="text-blue-400" />
        ) : (
          <FaChevronDown className="text-blue-400" />
        )}
      </div>

      {isExpanded ? (
        <div className="space-y-4">
          <div className="w-full bg-gray-800 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-blue-300">{progress}% completed</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium text-blue-200 mb-2">Milestones</h3>
            <ul className="space-y-3">
              {objective?.milestones?.map((milestone, index) => (
                <li key={index} className="flex items-center">
                  <input 
                    type="checkbox" 
                    checked={milestone.completed}
                    readOnly
                    className="mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 text-blue-500 focus:ring-blue-600"
                  />
                  <span className={`text-sm ${milestone.completed ? 'text-gray-400 line-through' : 'text-blue-100'}`}>
                    {milestone.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="w-full bg-gray-800 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-blue-300 ml-2">{progress}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressPanel;