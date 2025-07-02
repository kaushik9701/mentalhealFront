import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import gsap from 'gsap';
import axios from 'axios';
import GreenWaveShader from '../Animations/GreenWave';
import { useDispatch } from 'react-redux';
import { setUser } from '../Redux/store/userSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BACKEND_URL = import.meta.env.VITE_API_URL;
  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [uiState, setUiState] = useState({
    isFocused: { email: false, password: false },
    showPassword: false,
    isLoading: false
  });
  
  const h1Ref = useRef(null);
  const formRef = useRef(null);

  // Animation on mount
  useEffect(() => {
    if (h1Ref.current) {
      gsap.fromTo(
        h1Ref.current,
        { opacity: 0, y: -100 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out", delay: 0.5 }
      );
    }
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle focus/blur events
  const handleFocus = (field) => {
    setUiState(prev => ({
      ...prev,
      isFocused: { ...prev.isFocused, [field]: true }
    }));
  };

  const handleBlur = (field) => {
    setUiState(prev => ({
      ...prev,
      isFocused: { ...prev.isFocused, [field]: false }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUiState(prev => ({ ...prev, isLoading: true }));
  
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, formData);
      const { data } = response;
  
      if (data.token) {
        
        dispatch(setUser({
          user: data.user || data,
          token: data.token,
          onboardingComplete: data.onboardingComplete ?? false
        }));
        
        toast.success('Login successful!', { autoClose: 1500 });
        navigate('/', { replace: true });
      } else {
        throw new Error('Authentication token missing');
      }
    } catch (error) {
      console.error("Login Error:", error);
      const message = error?.response?.data || "Login failed";
      toast.error(message); 
      
    }
    
     finally {
      setUiState(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setUiState(prev => ({
      ...prev,
      showPassword: !prev.showPassword
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
  {/* Background elements */}
  <h1 
    ref={h1Ref} 
    className="absolute w-full min-h-screen flex justify-center pt-36 z-10 text-purple-700 text-7xl font-bold"
  >
    MentalHeal
  </h1>
  {/* <div className="absolute">
    <GreenWaveShader />
  </div> */}

  {/* Login form */}
  <div className="relative z-10 w-80 max-w-md p-5 mt-20 bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/30 transform hover:scale-105 transition">
    <h1 className="text-4xl text-white font-bold text-center mb-4">Sign In</h1>
    
    <form 
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Email input */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleInputChange}
        onFocus={() => handleFocus('email')}
        onBlur={() => handleBlur('email')}
        placeholder="Email Address"
        required
        className={`w-full px-4 py-3 bg-white/10 text-white rounded-lg border ${
          uiState.isFocused.email ? 'ring-2 ring-purple-900' : 'border-white/20'
        } transition`}
      />

      {/* Password input */}
      <div className="relative">
        <input
          type={uiState.showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          onFocus={() => handleFocus('password')}
          onBlur={() => handleBlur('password')}
          placeholder="Password"
          required
          minLength="6"
          className={`w-full px-4 py-3 bg-white/10 text-white rounded-lg border ${
            uiState.isFocused.password ? 'ring-2 ring-purple-900' : 'border-white/20'
          } transition`}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
          aria-label={uiState.showPassword ? 'Hide password' : 'Show password'}
        >
          {uiState.showPassword ? '🙈' : '👁️'}
        </button>
      </div>

      {/* Submit button */}
      <button 
        type="submit" 
        disabled={uiState.isLoading}
        className={`w-full py-3 ${
          uiState.isLoading 
            ? 'bg-gray-500 cursor-not-allowed' 
            : 'bg-purple-500 hover:bg-purple-600'
        } text-white rounded-lg font-semibold transition`}
      >
        {uiState.isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : 'Sign In'}
      </button>
    </form>

    {/* Additional links */}
    <div className="flex justify-between mt-4 text-sm text-white/70">
      <Link 
        to="/forgot-password" 
        className="hover:text-white transition"
      >
        Forgot Password?
      </Link>
      <Link 
        to="/signup" 
        className="hover:text-white transition"
      >
        Don't have an account?
      </Link>
    </div>
  </div>
</div>

  );
};

export default Login;