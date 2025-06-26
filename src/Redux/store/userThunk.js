import axios from 'axios';
import { completeOnboarding } from './userSlice'; // adjust path as needed

export const markOnboardingComplete = () => async (dispatch, getState) => {
  try {
    const authData = localStorage.getItem('authData');
    const BACKEND_URL = import.meta.env.VITE_API_URL;
    const token = authData ? JSON.parse(authData).token : null;

    await axios.post(`${BACKEND_URL}/auth/complete-onboarding`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    dispatch(completeOnboarding()); // update Redux state after backend confirms

  } catch (error) {
    console.error('Error completing onboarding:', error);
  }
};
