import React, { useState, useContext, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  // Axios for API requests

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

import gsap from 'gsap';
import GreenWaveShader from '../Animations/GreenWave';

function Signup() {
  const [name, setName] = useState("");
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState({ 
    name: false, 
     
    email: false, 
    password: false 
  });


  const navigate = useNavigate();
  const nameInputRef = useRef(null);
  const h1Ref = useRef(null);

  useEffect(() => {
    // Focus on name input when component mounts
    if (nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, []);

  const signup = async () => {
    

    if (!name || !email || !password) {
      toast.error("All fields are required");
     
      return;
    }

    try {
        const response = await axios.post(`${BACKEND_URL}/auth/register`, {
          name,
          email,
          password
        });
      
        // Check if registration was successful
        if (response.data) {
          toast.success("Signup Successful");
          navigate("/login"); // Redirect after signup
        }
      }catch (error) {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          // Show the message from the error response
          toast.error(error.response.data.message || "Email already exists. Please try again.");
        } else {
          // Handle generic error if there's no message
          toast.error("Signup failed. Please try again.");
        }
      }
      
  };

  const handleKey = (e) => {
    if (e.code === "Enter") 
    
    signup();
  };

  useEffect(() => {
    // Only run animation when ref is available
    if (h1Ref.current) {
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []); 

  return (
    <div className="min-h-screen  flex items-center justify-center relative overflow-hidden">
        <ToastContainer position="top-right" autoClose={5000} />
      {/* Particle Background */}
      <h1 ref={h1Ref} className='absolute w-full min-h-screen flex justify-center pt-28 z-10 text-purple-600 text-6xl md:text-7xl lg:text-8xl font-bold'>MentalHeal</h1>

      {/* <div className='absolute'><GreenWaveShader/></div> */}

     

      {/* Signup Container */}
      <div className="relative z-10 w-80 md:w-full max-w-md p-5 mt-20 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 transform transition-all duration-300 hover:scale-105">
        <div className="text-center mb-5">
          <h1 className="text-4xl font-bold text-white mb-2 tracking-wider">
            Sign Up
          </h1>
          <p className="text-white/70">Create your account</p>
        </div>

        <form className="space-y-3" onSubmit={(e) => {
          e.preventDefault();
          signup();
        }}>
          {/* Name Input */}
          <div className="relative">
            <input 
              ref={nameInputRef}
              type="text"
              value={name}
              onKeyDown={handleKey}
              onChange={(e) => setName(e.target.value)}
              onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
              placeholder="Full Name"
              required
              className={`w-full px-4 py-3 bg-white/10 text-white rounded-lg border transition-all duration-300 ${
                isFocused.name 
                  ? 'border-white/50 ring-2 ring-white/30' 
                  : 'border-white/20'
              }`}
            />
          </div>

          

          {/* Email Input */}
          <div className="relative">
            <input 
              type="email"
              value={email}
              onKeyDown={handleKey}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
              placeholder="Email Address"
              required
              className={`w-full px-4 py-3 bg-white/10 text-white rounded-lg border transition-all duration-300 ${
                isFocused.email 
                  ? 'border-white/50 ring-2 ring-white/30' 
                  : 'border-white/20'
              }`}
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onKeyDown={handleKey}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
              onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
              placeholder="Password"
              required
              className={`w-full px-4 py-3 bg-white/10 text-white rounded-lg border transition-all duration-300 ${
                isFocused.password 
                  ? 'border-white/50 ring-2 ring-white/30' 
                  : 'border-white/20'
              }`}
            />
            {/* Password Toggle */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.05 10.05 0 01-1.563 3.029" />
                </svg>
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            className="w-full py-3 bg-purple-500 text-white rounded-lg mt-4 text-lg font-semibold transition-all duration-300 hover:bg-green-600"
          >
            Sign Up
          </button>
        </form>

        {/* Redirect to Login */}
        <div className="text-center mt-3 text-white/70">
          Already have an account? <Link to="/login" className="text-purple-400">Login here</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
