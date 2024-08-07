import { configureStore } from "@reduxjs/toolkit";
import localReducers from "./colorwindow/localSlice";

export default configureStore({
  reducer: {
    localCW: localReducers,
  },
  devTools: true,
});
