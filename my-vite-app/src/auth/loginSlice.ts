import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

import axios from "axios";

interface LoginState {
    user: { username: string; access: string } | null;
    loading: boolean;
    error: string | null;
  }
  
  // ✅ Initialize from localStorage if available
  const userFromStorage = localStorage.getItem("user");
  
  const initialState: LoginState = {
    user: userFromStorage ? JSON.parse(userFromStorage) : null,
    loading: false,
    error: null,
  };
  
  // Async thunk for login
  export const loginUser = createAsyncThunk(
    "login/loginUser",
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
      try {
        const response = await axios.post("http://127.0.0.1:8000/api/login/", credentials);
        return response.data; // { access: "...", username: "..." }
      } catch (err: any) {
        return rejectWithValue(err.response?.data?.detail || "Login failed");
      }
    }
  );
  
  const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
      logout: (state) => {
        state.user = null;
        state.error = null;
        localStorage.removeItem("user"); // ✅ clear localStorage on logout
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(
          loginUser.fulfilled,
          (state, action: PayloadAction<{ access: string; username: string }>) => {
            state.loading = false;
            state.user = action.payload;
            localStorage.setItem("user", JSON.stringify(action.payload)); // ✅ persist login
          }
        )
        .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        });
    },
  });
  
  export const { logout } = loginSlice.actions;
  export default loginSlice.reducer;