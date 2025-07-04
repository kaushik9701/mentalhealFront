// App.jsx
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import Signup from "./pages/Register";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from "./components/NavBar";
import JournalPage from "./pages/JournalPage";
import InsightPage from "./pages/InsightPage";
import { initializeAuth } from "./Redux/store/userSlice";
import ObjectiveFocusPage from "./pages/ObjectiveFocusPage";
import { useFPSMonitor } from "./utils/fpsMonitor";
import Footer from "./components/Footer";
import VantaClouds from "./Animations/VantaClouds";
import Starfield from "./Animations/StarField";

export default function App() {
  const [entries, setEntries] = useState([]);
  const { user, isAuthenticated } = useSelector(state => state.user);
  const [showClouds, setShowClouds] = useState(true); // ✅ animation toggle
  // useFPSMonitor();
  const dispatch = useDispatch();

  const handleAdd = (entry) => {
    setEntries([entry, ...entries]);
  };

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <BrowserRouter>
  <div className={`${showClouds ? "" : "bg-gradient-to-br from-[#0b001a] via-[#0c0129] to-[#140038]"} min-h-screen`}>
    {showClouds && <VantaClouds />}
    <Starfield />
    <NavBar showClouds={showClouds} toggleClouds={() => setShowClouds(prev => !prev)} />
    <Routes>
      <Route path="/" element={<HomePage user={user} />} />
      <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" replace />} />
      <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Navigate to="/" replace />} />
      <Route path="/journal" element={isAuthenticated ? <JournalPage /> : <Navigate to="/login" replace />} />
      <Route path="/insight" element={isAuthenticated ? <InsightPage /> : <Navigate to="/login" replace />} />
      <Route path="/focus" element={isAuthenticated ? <ObjectiveFocusPage /> : <Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    <div className="mt-30">
    <Footer />
    </div>
  </div>
</BrowserRouter>

  );
}
