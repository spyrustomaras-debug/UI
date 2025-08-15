import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { logout } from "../auth/loginSlice"; // adjust path if needed

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1e293b;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;
`;

const StyledLink = styled(Link)<{ $active?: boolean }>`
  color: ${({ $active }) => ($active ? "#38bdf8" : "#f1f5f9")};
  text-decoration: none;
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};

  &:hover {
    color: #38bdf8;
  }
`;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.login.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login"); // redirect to login page
  };

  return (
    <Nav>
      <StyledLink to="/" $active={location.pathname === "/"}>
        Dashboard
      </StyledLink>

      {!user && (
        <StyledLink to="/login" $active={location.pathname === "/login"}>
          Login
        </StyledLink>
      )}

      {!user && (
        <StyledLink to="/register" $active={location.pathname === "/register"}>
          Register
        </StyledLink>
      )}

      {user && (
        <>
          <StyledLink to="/students" $active={location.pathname === "/students"}>
            Students
          </StyledLink>
          <StyledLink to="/courses" $active={location.pathname === "/courses"}>
            Courses
          </StyledLink>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "none",
              color: "#f1f5f9",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </>
      )}
    </Nav>
  );
}
