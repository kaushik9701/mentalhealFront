import React from "react";
import { FaLightbulb, FaChevronDown, FaChevronUp } from "react-icons/fa";

const SuggestionsPanel = ({ objective, isExpanded, onToggle }) => {
  const suggestions = [
    "Break this objective into smaller tasks",
    "Try the Pomodoro technique for focused work",
    "Review similar objectives from last month",
    "Consider pairing with a team member"
  ];
  
  return (
    <div>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <FaLightbulb className="text-yellow-400 mr-2" />
          <h2 className="text-xl font-semibold text-yellow-200">Suggestions</h2>
        </div>
        {isExpanded ? (
          <FaChevronUp className="text-yellow-400" />
        ) : (
          <FaChevronDown className="text-yellow-400" />
        )}
      </div>

      {isExpanded ? (
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-3 bg-gray-800/50 rounded-lg border border-yellow-700/30">
              <p className="text-sm text-yellow-100">{suggestion}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-yellow-300 truncate">{suggestions[0]}</p>
      )}
    </div>
  );
};

export default SuggestionsPanel;