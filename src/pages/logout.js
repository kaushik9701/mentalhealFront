import { store } from "../Redux/store";
import { clearUser } from "../Redux/store/userSlice";


export const logout = () => {
  store.dispatch(clearUser());
  window.location.href = '/login'; // Full reload to reset state
};