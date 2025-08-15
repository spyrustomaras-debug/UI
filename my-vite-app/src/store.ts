import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./store/coursesSlice";

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
