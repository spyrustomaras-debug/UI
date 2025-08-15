// src/tests/utils.tsx
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import coursesReducer from "../store/coursesSlice";
import { ReactNode } from "react";
import React from "react";

export function renderWithProviders(ui: ReactNode, preloadedState = {}) {
  const store = configureStore({
    reducer: { courses: coursesReducer },
    preloadedState,
  });

  return {
    store,
    wrapper: ({ children }: { children: ReactNode }) => <Provider store={store}>{children}</Provider>,
  };
}
