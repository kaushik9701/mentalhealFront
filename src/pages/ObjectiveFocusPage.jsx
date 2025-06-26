// src/components/ObjectiveFocusPage.jsx
import React, { useState, useEffect } from 'react';
import { AddFocus } from '../components/focus/addFocus';
import axios from 'axios';
import ObjectivesList from '../components/focus/ObjectivesList';
import ObjectiveDetail from '../components/focus/ObjectiveDetail';

const ObjectiveFocusPage = () => {
  const [showFocusPanel, setShowFocusPanel] = useState(false);
  const [objectives, setObjectives] = useState([]);
  const [selectedObjective, setSelectedObjective] = useState(null);
  const [viewMode, setViewMode] = useState('objectives'); // 'objectives' or 'detail'
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const fetchObjectives = async () => {
    try {
      const authData = localStorage.getItem("authData");
      const token = authData ? JSON.parse(authData).token : null;

      const response = await axios.get(`${BACKEND_URL}/focus/getObjectives`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setObjectives(response.data);
    } catch (error) {
      console.error("Failed to fetch objectives:", error);
    }
  };

  useEffect(() => {
    fetchObjectives();
  }, [showFocusPanel]);

  const goBackToObjectives = () => {
    setViewMode('objectives');
    setSelectedObjective(null);
  };

  const selectObjective = (objective) => {
    setSelectedObjective(objective);
    setViewMode('detail');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 p-4 md:p-8 relative">
      {showFocusPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-40 flex items-center justify-center p-4">
          <div className="w-full max-w-lg">
            <AddFocus setShowFocusPanel={setShowFocusPanel} />
          </div>
        </div>
      )}

      <div className={`${showFocusPanel ? 'blur-sm pointer-events-none select-none' : ''} transition-all duration-300`}>
        {viewMode === 'objectives' ? (
          <ObjectivesList 
            objectives={objectives}
            onSelectObjective={selectObjective}
            onAddObjective={() => setShowFocusPanel(true)}
          />
        ) : (
          <ObjectiveDetail 
            objective={selectedObjective}
            onBack={goBackToObjectives}
          />
        )}
      </div>
    </div>
  );
};

export default ObjectiveFocusPage;

