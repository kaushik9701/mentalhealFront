import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { formatDate } from "../../../utils/dateUtils";


const PAGE_SIZE = 5;

const CheckInsPanel = ({ objective, isExpanded, onToggle }) => {
  const [visibleCheckIns, setVisibleCheckIns] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredByToday, setFilteredByToday] = useState(true);

  useEffect(() => {
    if (objective?.checkIns) {
      const today = new Date().toISOString().split("T")[0];
      const sorted = [...objective.checkIns].sort((a, b) => new Date(b.date) - new Date(a.date));
      const filtered = filteredByToday ? sorted.filter((c) => c.date === today) : sorted;
      setVisibleCheckIns(filtered.slice(0, isExpanded ? page * PAGE_SIZE : 3));
    }
  }, [objective, filteredByToday, page, isExpanded]);

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const checkinCount = filteredByToday
    ? objective.checkIns.filter((c) => c.date === new Date().toISOString().split("T")[0]).length
    : objective.checkIns.length;

  return (
    <div>
      <div 
        className="flex justify-between items-center mb-4 cursor-pointer"
        onClick={onToggle}
      >
        <h2 className="text-xl font-semibold text-purple-200">Check-in History</h2>
        {isExpanded ? (
          <FaChevronUp className="text-purple-400" />
        ) : (
          <FaChevronDown className="text-purple-400" />
        )}
      </div>

      {isExpanded && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => {
              setFilteredByToday((prev) => !prev);
              setPage(1);
            }}
            className="text-sm text-purple-300 underline hover:text-purple-100"
          >
            {filteredByToday ? "Show All" : "Show Today"}
          </button>
        </div>
      )}

      {visibleCheckIns.length > 0 ? (
        <ul className={`space-y-4 ${isExpanded ? "max-h-[60vh] overflow-y-auto pr-2 custom-scroll" : ""}`}>
          {visibleCheckIns.map((checkin) => (
            <li
              key={checkin.id}
              className="p-4 bg-gradient-to-br from-gray-800 to-gray-900 border border-purple-700/20 rounded-xl shadow-sm"
            >
              <div className="flex justify-between items-center mb-1 text-sm text-purple-400">
                <span>{formatDate(checkin.date)}</span>
                <FaCheckCircle className="text-green-400" />
              </div>
              <p className="text-sm text-purple-100 whitespace-pre-wrap">{checkin.note}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-purple-400 text-sm">No check-ins found for {filteredByToday ? "today" : "this objective"}.</p>
      )}

      {isExpanded && visibleCheckIns.length < checkinCount && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="px-5 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg transition font-medium"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckInsPanel;