import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  data: null,
};

const personalInfoSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchPersonalInfo: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { fetchPersonalInfo } = personalInfoSlice.actions;

export default personalInfoSlice.reducer;
