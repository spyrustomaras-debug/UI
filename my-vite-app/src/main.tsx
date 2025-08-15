import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import "./style.css";
import { Provider } from "react-redux";
import { store } from "./store";
import Register from "./components/Register";
import Login from "./components/Login";

ReactDOM.createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    {/* Wrap the entire app with Provider */}
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
