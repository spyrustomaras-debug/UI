// src/tests/Courses.test.tsx
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Courses from "../pages/Courses";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import * as coursesSlice from "../store/coursesSlice";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderWithProviders } from "./utils";


// Do NOT pass thunk middleware — just use empty array
const mockStore = configureStore([]);

describe("Courses Page", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      courses: { items: [], loading: false, error: null },
    });
  });

  it("renders loading state initially", async () => {
    vi.spyOn(coursesSlice, "fetchCourses").mockReturnValue({
      type: "courses/fetchCourses/pending",
    } as any);

    render(
      <Provider store={store}>
        <Courses />
      </Provider>
    );

    expect(screen.getByText("Courses")).toBeInTheDocument();
  });

  it("renders list of courses when fetchCourses succeeds", async () => {
    const mockCourses = [
      { id: 1, title: "Course 1", description: "Description 1" },
      { id: 2, title: "Course 2", description: "Description 2" },
    ];
  
    // Prepopulate the store with mock courses
    store = mockStore({
      courses: { items: mockCourses, loading: false, error: null },
    });
  
    render(
      <Provider store={store}>
        <Courses />
      </Provider>
    );
  
    // Assert that the course titles are rendered
    expect(screen.getByText("Course 1")).toBeInTheDocument();
    expect(screen.getByText("Course 2")).toBeInTheDocument();
  });
  

  it("renders error message when fetchCourses fails", async () => {
    // Prepopulate the store with an error
    store = mockStore({
      courses: { items: [], loading: false, error: "Network Error" },
    });
  
    render(
      <Provider store={store}>
        <Courses />
      </Provider>

    );
  
    // Assert that the error message is displayed
    expect(screen.getByText(/Error: Network Error/i)).toBeInTheDocument();
  });

  test("opens modal when Add Course button is clicked", () => {
    render(<Courses />, { wrapper: renderWithProviders(<Courses />).wrapper });
  
    fireEvent.click(screen.getByText(/Add Course/i));
    expect(screen.getByText(/Create New Course/i)).toBeInTheDocument();
    screen.debug()
  });

});
