import React from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtils';

const TasksSection = ({ tasks= [], progress, lastCheckin, onToggleTask }) => {
  return (
    <div>
    <h3 className="text-lg font-bold text-purple-200 mb-4">Stellar Tasks</h3>
    
    <div className="space-y-3">
      {/* Safely handle tasks array */}
      {(tasks || []).map((task) => (
        <div 
          key={task.id}
          className={`flex items-center p-4 rounded-xl ${
            task.completed ? 'bg-green-900/30 border border-green-800/50' : 'bg-purple-900/30 border border-purple-800/50'
          }`}
        >
          <button 
            onClick={() => onToggleTask(task.id)}
            className={`w-6 h-6 rounded-full flex items-center justify-center mr-4 ${
              task.completed 
                ? 'bg-green-400 text-gray-900' 
                : 'border-2 border-purple-400'
            }`}
          >
            {task.completed && <FaCheck className="w-3 h-3" />}
          </button>
          <div className="flex-grow">
            <span className={`font-medium ${task.completed ? 'line-through text-purple-400' : 'text-purple-200'}`}>
              {task.text}
            </span>
          </div>
          {task.completed && (
            <span className="text-xs font-medium bg-green-800/30 text-green-300 px-2 py-1 rounded-full">
              Completed
            </span>
          )}
        </div>
      ))}
        
        <button className="w-full mt-6 p-4 border-2 border-dashed border-purple-800/50 rounded-xl text-purple-500 hover:border-pink-500/50 hover:text-pink-300 transition-colors flex items-center justify-center bg-gray-900/20">
          <FaPlus className="mr-2" />
          Add New Cosmic Task
        </button>
        
        <div className="mt-8 p-5 bg-gradient-to-r from-purple-900/50 to-pink-900/30 rounded-xl border border-purple-800/30">
          <h4 className="font-bold text-purple-200 mb-3">Cosmic Progress</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-purple-300">
              <span>Completed Tasks</span>
              <span>
                {tasks.filter(t => t.completed).length}/{tasks.length}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="text-sm text-purple-500 mt-2">
              Last cosmic check-in: {formatDate(lastCheckin)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksSection;