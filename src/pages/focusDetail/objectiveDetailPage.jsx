import React, { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import CheckInsPanel from "./components/checkinsPanel";
import ProgressPanel from "./components/progressPanel";
import SuggestionsPanel from "./components/suggestionsPanel";
import ActionsPanel from "./components/actionsPanel";
import { FiMessageCircle } from "react-icons/fi";
import { AddFocus } from "../../components/focus/addFocus";
import { DailyCheckin } from "./api/focusCheckin";
const ObjectiveDetailPage = ({ objective, onBack}) => {
  const [expandedPanel, setExpandedPanel] = useState("checkins");
  const [showFocusPanel, setShowFocusPanel] = useState(false);
  console.log(objective)
  const togglePanel = (panel) => {
    setExpandedPanel(expandedPanel === panel ? null : panel);
  };
  const panelClick = ()=>{
    setShowFocusPanel(true);

  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-28 pb-16 text-white">
        {showFocusPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <DailyCheckin objectiveId={objective?.id} setShowFocusPanel={setShowFocusPanel} />
          </div>
        </div>
      )}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Objective Details
          </h1>
          <p className="text-purple-300 mt-1 text-lg max-w-3xl">{objective?.title}</p>
        </div>
        <button
          onClick={onBack}
          className="flex items-center text-sm text-pink-300 hover:text-pink-100 transition"
        >
          <FaChevronLeft className="mr-2" />
          Back
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Main Check-ins Panel (larger) */}
        <div
  className={`
    bg-zinc-900 rounded-2xl border border-purple-700/30 p-6 shadow-xl
    transition-all duration-300 ease-in-out
    ${expandedPanel === "checkins"
      ? "md:col-span-2 lg:col-span-2 row-span-2 max-h-[80vh] overflow-y-auto"
      : "max-h-[400px] overflow-hidden"}
  `}
>

          <CheckInsPanel 
            objective={objective} 
            isExpanded={expandedPanel === "checkins"} 
            onToggle={() => togglePanel("checkins")}
          />
        </div>

         {/* Actions Panel */}
         <div className="bg-zinc-900 rounded-2xl border border-purple-700/30 p-6 shadow-xl">
          <ActionsPanel 
            objective={objective} 
            isExpanded={expandedPanel === "actions"} 
            onToggle={() => togglePanel("actions")}
          />
        </div>

        

        {/* Suggestions Panel */}
        <div className="bg-zinc-900 rounded-2xl border border-purple-700/30 p-6 shadow-xl">
          <SuggestionsPanel 
            objective={objective} 
            isExpanded={expandedPanel === "suggestions"} 
            onToggle={() => togglePanel("suggestions")}
          />
        </div>

       {/* Progress Panel */}
       <div className="bg-zinc-900 rounded-2xl border border-purple-700/30 p-6 shadow-xl">
          <ProgressPanel 
            objective={objective} 
            isExpanded={expandedPanel === "progress"} 
            onToggle={() => togglePanel("progress")}
          />
        </div>

        {/* Notes Panel */}
        <div onClick={panelClick} className={`bg-zinc-900 rounded-2xl border border-purple-700/30 p-6 shadow-xl md:col-span-1`}>
  <div className="flex items-center space-x-4">
    {/* Chat Icon */}

    <FiMessageCircle className="w-8 h-8 text-purple-400" />

    <div>
      <h3 className="text-lg font-semibold text-purple-200">Talk with AI</h3>
      <p className="text-sm text-purple-400">
        Reflect or ask questions about your journey
      </p>
    </div>
  </div>
</div>
      </div>
    </div>
  );
};

export default ObjectiveDetailPage;