import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  localCW: [],
};

export const fetchLocalColorWindows = createAsyncThunk(
  "colorwindow/local",
  async () => {
    const response = await axios.get("/colorwindow");
    return response.data.data;
  }
);

const localColorWindowSlice = createSlice({
  name: "localCW",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLocalColorWindows.fulfilled, (state, actions) => {
      state.localCW.push({ ...actions.payload });
    });
  },
});

export default localColorWindowSlice.reducer;
