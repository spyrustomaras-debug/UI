import { configureStore } from "@reduxjs/toolkit";
import coursesReducer from "./store/coursesSlice";
import authReducer from "./auth/authSlice";
import loginReducer from "./auth/loginSlice";
import searchReducer from "./auth/searchSlice";


export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    auth: authReducer,
    login: loginReducer,
    search: searchReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
