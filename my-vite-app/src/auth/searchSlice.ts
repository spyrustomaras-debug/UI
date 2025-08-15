import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  id: number;
  username: string;
  email: string;
}

interface SearchState {
  results: User[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  results: [],
  loading: false,
  error: null,
};

// Async thunk to fetch search results
export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/users/?search=${query}`);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data || "Server error");
    }
  }
);

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      clearResults: (state) => {
        state.results = [];
        state.error = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(searchUsers.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(searchUsers.fulfilled, (state, action) => {
          state.loading = false;
          state.results = action.payload;
        })
        .addCase(searchUsers.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
export const { clearResults } = searchSlice.actions;
export const selectSearch = (state: any) => state.search;
export default searchSlice.reducer;
