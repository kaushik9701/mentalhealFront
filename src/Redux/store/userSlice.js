import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  onboardingComplete: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user || action.payload;
      state.token = action.payload.token || action.payload?.token;
      state.isAuthenticated = true;
      
      // Correct handling of boolean value
      state.onboardingComplete = action.payload.onboardingComplete;
      
      localStorage.setItem('authData', JSON.stringify({
        user: state.user,
        token: state.token,
        onboardingComplete: state.onboardingComplete  // Add this line
      }));
    },
    
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.onboardingComplete = false;
      localStorage.removeItem('authData');
    },
    initializeAuth: (state) => {
      const authData = localStorage.getItem('authData');
      if (authData) {
        const { user, token, onboardingComplete } = JSON.parse(authData);
        state.user = user;
        state.token = token;
        state.isAuthenticated = true;
        state.onboardingComplete = onboardingComplete;
      }
    },
    // New reducer to mark onboarding as complete
    completeOnboarding: (state) => {
      state.onboardingComplete = true;
      
      // Update localStorage to persist the change
      const authData = localStorage.getItem('authData');
      if (authData) {
        const data = JSON.parse(authData);
        data.onboardingComplete = true;
        localStorage.setItem('authData', JSON.stringify(data));
      }
    }
  }
});

export const { setUser, clearUser, initializeAuth, completeOnboarding } = userSlice.actions;
export default userSlice.reducer;