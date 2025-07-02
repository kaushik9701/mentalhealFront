import React, { useState } from "react";
import { FaTasks, FaChevronDown, FaChevronUp, FaPlus } from "react-icons/fa";

const ActionsPanel = ({ objective, isExpanded, onToggle }) => {
  const [actions, setActions] = useState(objective?.actions || []);
  const [newAction, setNewAction] = useState("");

  const handleAddAction = () => {
    if (newAction.trim()) {
      setActions([...actions, { id: Date.now(), text: newAction, completed: false }]);
      setNewAction("");
    }
  };

  const toggleAction = (id) => {
    setActions(actions.map(action => 
      action.id === id ? { ...action, completed: !action.completed } : action
    ));
  };

  return (
    <div>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center">
          <FaTasks className="text-green-400 mr-2" />
          <h2 className="text-xl font-semibold text-green-200">Actions</h2>
        </div>
        {isExpanded ? (
          <FaChevronUp className="text-green-400" />
        ) : (
          <FaChevronDown className="text-green-400" />
        )}
      </div>

      {isExpanded ? (
        <div className="space-y-4">
          <div className="flex">
            <input
              type="text"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              placeholder="Add new action..."
              className="flex-1 bg-gray-800 border border-green-700/30 rounded-l-lg px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-green-500"
            />
            <button
              onClick={handleAddAction}
              className="bg-green-700 hover:bg-green-600 px-3 py-2 rounded-r-lg text-white"
            >
              <FaPlus />
            </button>
          </div>

          <ul className="space-y-2">
            {actions.map((action) => (
              <li key={action.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={action.completed}
                  onChange={() => toggleAction(action.id)}
                  className="mr-3 h-4 w-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-600"
                />
                <span className={`text-sm ${action.completed ? 'text-gray-400 line-through' : 'text-green-100'}`}>
                  {action.text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-sm text-green-300">
          {actions.length} action{actions.length !== 1 ? 's' : ''}
        </p>
      )}
    </div>
  );
};

export default ActionsPanel;