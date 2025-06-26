import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import JournalPage from "./pages/JournalPage";
import InsightPage from "./pages/InsightPage";

import { initializeAuth } from "./Redux/store/userSlice";
import ObjectiveFocusPage from "./pages/ObjectiveFocusPage";
import { useFPSMonitor } from "./utils/fpsMonitor";

export default function App() {
  const [entries, setEntries] = useState([]);
  const { user, isAuthenticated } = useSelector(state => state.user);
   useFPSMonitor();
  const handleAdd = (entry) => {
    setEntries([entry, ...entries]);
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage user={user} />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} />
        <Route path="/journal" element={isAuthenticated ? <JournalPage /> : <Navigate to="/login" replace />} />
        <Route path="/insight" element={isAuthenticated ? <InsightPage /> : <Navigate to="/login" replace />} />
        <Route path="/focus" element={isAuthenticated ? <ObjectiveFocusPage /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <footer className="bg-gray-800 border-t rounded-t-full border-purple-900 border-8 text-white">
  <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
    
    {/* Left side: App branding */}
    <div className="text-center md:text-left space-y-2">
      <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
        Cosmic Journal
      </h3>
      <p className="text-sm text-purple-300">Reflect. Record. Rise.</p>
      <p className="text-xs text-purple-500">
        © {new Date().getFullYear()} Kaushik Reddy. All rights reserved.
      </p>
    </div>

    {/* Right side: Contact info */}
    <div className="text-sm text-purple-200 text-center md:text-right space-y-1">
      <p>📧 <span className="text-white">bandikaushikreddy@gmail.com</span></p>
      <p>📱 <span className="text-white">+1 (314) 617-4722</span></p>
      <a
        href="https://github.com/kaushik9701"
        target="_blank"
        rel="noopener noreferrer"
        className="text-purple-400 hover:text-pink-400 transition underline"
      >
        🔗 github.com/kaushik9701
      </a>
    </div>
  </div>

  {/* Sparkling line */}
  <div className="h-1 bg-gradient-to-r from-purple-600 via-pink-500 to-transparent opacity-50 rounded-full" />
</footer>


    </BrowserRouter>
  );
}
