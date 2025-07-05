import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; 
import { useSelector } from 'react-redux';
import { logout } from '../pages/logout';
import { FiCloud, FiCloudOff } from "react-icons/fi";


function NavBar({ showClouds, toggleClouds }) {
    const { isAuthenticated } = useSelector(state => state.user);
    
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    // Add scroll effect for navbar
   
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <>
            {/* Desktop Navigation */}
            <nav className='fixed w-full mt-4 z-50 sm:h-16 h-16 transition-all duration-500 bg-white/10 border border-white/20 rounded-2xl p-3 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(128,0,128,0.3)] backdrop-blur-xl'>
                    

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0 flex items-center">
                            <Link to="/" className="flex items-center group">
                                <div className="bg-gradient-to-r from-purple-600 to-purple-800 w-10 h-10 rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                    </svg>
                                </div>
                                <span className="ml-3 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-purple-300 tracking-tight">MindScape</span>
                            </Link>
                        </div>
                        
                        {/* Desktop Navigation Links */}
                        <div className="hidden md:flex items-center space-x-8">
                            <Link to="/" className="relative group">
                                <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Home</span>
                                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            
                            {!isAuthenticated ? (
                                <>
                                    <Link to="/login" className="relative group">
                                        <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Login</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/signup" className="relative group">
                                        <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Signup</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/journal" className="relative group">
                                        <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Journal</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/insight" className="relative group">
                                        <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Insight</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <Link to="/focus" className="relative group">
                                        <span className="text-white group-hover:text-purple-300 transition-colors duration-300 font-medium">Focus</span>
                                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
                                    </Link>
                                    <button
                                        onClick={logout}
                                        className="relative px-5 py-2 overflow-hidden font-medium text-white bg-gradient-to-r from-purple-600 to-violet-700 rounded-lg group transition-all duration-300 hover:scale-105"
                                    >
                                        <span className="absolute top-0 left-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
                                        <span className="absolute bottom-0 right-0 w-0 h-0.5 bg-white transition-all duration-500 group-hover:w-full"></span>
                                        <span className="absolute top-0 left-0 w-0.5 h-0 bg-white transition-all duration-500 group-hover:h-full"></span>
                                        <span className="absolute bottom-0 right-0 w-0.5 h-0 bg-white transition-all duration-500 group-hover:h-full"></span>
                                        <span className="relative z-10 font-semibold">Logout</span>
                                    </button>
                                </>
                            )}
                             <button
                                    onClick={toggleClouds}
                                    className={`text-2xl p-2 rounded-lg transition-colors duration-300 ${
                                        showClouds ? " text-white" : "bg-gray-600 hover:bg-gray-700 text-white"
                                    }`}
                                    title={showClouds ? "Disable Clouds" : "Enable Clouds"}
                                    >
                                    {showClouds ? <FiCloud /> : <FiCloudOff />}
                                    </button>
                       </div>
                        {/* Mobile menu button */}
                        <div className="md:hidden  flex items-center">
                            <button
                                onClick={toggleMobileMenu}
                                className="inline-flex items-center justify-center p-2 rounded-md text-purple-200 hover:text-white hover:bg-purple-900 focus:outline-none transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    {mobileMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Navigation */}
                <div className={`md:hidden overflow-hidden transition-all pt-3 duration-500 ease-in-out ${
                    mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/85 border border-white/20 shadow-lg rounded-2xl p-3 ring-1 ring-white/10">
                        <Link 
                            to="/" 
                            className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Home
                        </Link>
                        
                        {!isAuthenticated ? (
                            <>
                                <Link 
                                    to="/login" 
                                    className="block px-3 py-2  rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link 
                                    to="/signup" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link 
                                    to="/journal" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Journal
                                </Link>
                                <Link 
                                    to="/insight" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Insight
                                </Link>
                                <Link 
                                    to="/focus" 
                                    className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-purple-300 hover:bg-purple-900/50 transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Focus
                                </Link>
                                <button
                                    onClick={() => {
                                        logout();
                                        setMobileMenuOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        <button
  onClick={toggleClouds}
  className={`text-2xl p-2 rounded-lg transition-colors duration-300 ${
    showClouds ? " text-white" : "bg-gray-600 hover:bg-gray-700 text-white"
  }`}
  title={showClouds ? "Disable Clouds" : "Enable Clouds"}
>
  {showClouds ? <FiCloud /> : <FiCloudOff />}
</button>

                    </div>
                </div>
            </nav>
            
            
        </>
    );
}

export default NavBar;