// src/tests/Register.test.tsx
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Register from "../components/Register"; // adjust path
import * as authSlice from "../auth/authSlice";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderWithProviders } from "./utils";

// Do NOT pass thunk middleware — just use empty array
const mockStore = configureStore([]);

describe("Register Page", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      auth: { loading: false, user: null, error: null },
    });
    store.dispatch = vi.fn();
  });

  it("renders the registration form", () => {
    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirm password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });
  

  it("dispatches registerUser when form is valid", () => {
    vi.spyOn(authSlice, "registerUser").mockReturnValue({
      type: "auth/registerUser/pending",
    } as any);

    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: "testuser" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByLabelText(/^password$/i), { target: { value: "123456" } });
    fireEvent.change(screen.getByLabelText(/confirm password/i), { target: { value: "123456" } });

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(store.dispatch).toHaveBeenCalled();
    expect(authSlice.registerUser).toHaveBeenCalledWith({
      username: "testuser",
      email: "test@example.com",
      password: "123456",
    });
  });

  it("renders success message when user is registered", () => {
    store = mockStore({
      auth: { loading: false, user: { username: "testuser" }, error: null },
    });

    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    expect(screen.getByText(/registration successful!/i)).toBeInTheDocument();
  });

  it("renders error message when registration fails", () => {
    store = mockStore({
      auth: { loading: false, user: null, error: "Registration failed" },
    });

    render(
      <Provider store={store}>
        <Register />
      </Provider>
    );

    expect(screen.getByText(/registration failed/i)).toBeInTheDocument();
  });
});
