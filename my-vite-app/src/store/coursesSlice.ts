import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Course } from "../models/models";
import axios from "axios";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Define a specific error type
interface FetchCoursesError {
    message: string;
}
  
  export const fetchCourses = createAsyncThunk<
    Course[],             // Return type
    void,                 // Thunk argument type (none in this case)
    { rejectValue: FetchCoursesError } // Optional: custom reject type
  >(
    "courses/fetchCourses",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${API_BASE_URL}/courses/`);
        if (!response.ok) {
          return rejectWithValue({ message: "Failed to fetch courses" });
        }
        const data: Course[] = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue({ message: (error as Error).message });
      }
    }
  );


// Create a new course
export const createCourse = createAsyncThunk(
    "courses/createCourse",
    async (course: { title: string; description: string }) => {
      const response = await axios.post(`${API_BASE_URL}/courses/`, course, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data; // return created course
    }
  );

interface CoursesState {
  items: Course[];
  loading: boolean;
  error: string | null;
}

const initialState: CoursesState = {
  items: [],
  loading: false,
  error: null,
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch courses";
      });

      // Create course
    builder.addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
      builder.addCase(createCourse.fulfilled, (state, action) => {
        state.items.push(action.payload); // Add new course to state
        state.loading = false;
      });
      builder.addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create course";
      });
  },
});

export default coursesSlice.reducer;
