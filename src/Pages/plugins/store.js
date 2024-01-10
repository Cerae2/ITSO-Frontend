import { configureStore } from "@reduxjs/toolkit";
import authReducer, {
  setLogin,
  setRole,
} from "./../../Pages/PUBLIC/Landing/authSlice";

// Check local storage for stored token and role
const storedToken = localStorage.getItem("authToken");
const storedRole = localStorage.getItem("userRole");

// Initial state based on local storage or default values
const initialState = {
  auth: {
    isLoggedIn: !!storedToken,
    token: storedToken || null,
    role: storedRole || "client", // Set default role if not in local storage
  },
  // ... other initial states if you have more slices
};

const store = configureStore({
  reducer: {
    auth: authReducer,
    // ... other reducers if you have more slices
  },
  preloadedState: initialState, // Set the initial state
});

// If you want to dispatch actions based on the stored values, you can do it here
if (storedToken && storedRole) {
  store.dispatch(setLogin(storedToken));
  store.dispatch(setRole(storedRole));
}

export default store;
