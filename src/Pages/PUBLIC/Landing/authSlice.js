import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    role: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload;
    },
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setLogout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.role = null;
    },
  },
});

export const { setLogin, setLogout, setRole } = authSlice.actions;

export default authSlice.reducer;
