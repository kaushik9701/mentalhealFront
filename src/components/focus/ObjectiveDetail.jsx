// ObjectiveDetail.jsx
import React, { useState, useEffect } from 'react';
import { FaChevronLeft } from 'react-icons/fa';
import { formatDate } from '../../utils/dateUtils';


const PAGE_SIZE = 5;

const ObjectiveDetail = ({ objective, onBack }) => {
  const [visibleCheckIns, setVisibleCheckIns] = useState([]);
  const [page, setPage] = useState(1);
  const [filteredByToday, setFilteredByToday] = useState(true);

  useEffect(() => {
    if (objective?.checkIns) {
      const sorted = [...objective.checkIns].sort((a, b) => new Date(b.date) - new Date(a.date));
      const today = new Date().toISOString().split('T')[0];

      const filtered = filteredByToday
        ? sorted.filter((c) => c.date === today)
        : sorted;

      setVisibleCheckIns(filtered.slice(0, PAGE_SIZE));
    }
  }, [objective, filteredByToday]);

  const loadMore = () => {
    const today = new Date().toISOString().split('T')[0];
    const sorted = [...objective.checkIns].sort((a, b) => new Date(b.date) - new Date(a.date));

    const filtered = filteredByToday
      ? sorted.filter((c) => c.date === today)
      : sorted;

    const nextPage = page + 1;
    const nextItems = filtered.slice(0, nextPage * PAGE_SIZE);
    setPage(nextPage);
    setVisibleCheckIns(nextItems);
  };

  return (
    <div className="max-w-4xl mt-14 mx-auto">
      <header className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-purple-200">Objective Focus</h1>
          <p className="text-purple-400 mt-1">
            {`Tracking: ${objective?.objective}`}
          </p>
        </div>
        <button 
          onClick={onBack}
          className="flex items-center text-pink-300 hover:text-pink-100 transition-colors"
        >
          <FaChevronLeft className="mr-2" />
          Back to Objectives
        </button>
      </header>

      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-purple-800/50 p-5">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-purple-300">Check-ins</h2>
          <button
            onClick={() => setFilteredByToday((prev) => !prev)}
            className="text-sm text-purple-200 hover:underline"
          >
            {filteredByToday ? 'Show All' : 'Show Today'}
          </button>
        </div>

        {visibleCheckIns.length > 0 ? (
          <ul className="space-y-4 max-h-[60vh] overflow-y-auto">
            {visibleCheckIns.map((checkin) => (
              <li key={checkin.id} className="bg-gray-700 rounded-lg p-4">
                <div className="text-sm text-purple-400 mb-1">{formatDate(checkin.date)}</div>
                <div className="text-white text-base whitespace-pre-wrap">{checkin.note}</div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-purple-400">No check-ins found.</p>
        )}

        {visibleCheckIns.length <
          (filteredByToday
            ? objective.checkIns.filter((c) => c.date === new Date().toISOString().split('T')[0]).length
            : objective.checkIns.length) && (
          <div className="text-center mt-4">
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ObjectiveDetail;