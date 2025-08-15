import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { logout } from "../auth/loginSlice";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1e293b;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  align-items: center;
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

const UserName = styled.span`
  margin-left: auto; /* push username and logout to the right */
  color: #f1f5f9;
  font-weight: bold;
`;

const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #f1f5f9;
  cursor: pointer;
  font-weight: bold;
  margin-left: 1rem;

  &:hover {
    color: #ef4444;
  }
`;

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.login.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Nav>
      <StyledLink to="/" $active={location.pathname === "/"}>
        Dashboard
      </StyledLink>

      {!user && (
        <>
          <StyledLink to="/login" $active={location.pathname === "/login"}>
            Login
          </StyledLink>
          <StyledLink to="/register" $active={location.pathname === "/register"}>
            Register
          </StyledLink>
        </>
      )}

      {user && (
        <>
          <StyledLink to="/students" $active={location.pathname === "/students"}>
            Students
          </StyledLink>
          <StyledLink to="/courses" $active={location.pathname === "/courses"}>
            Courses
          </StyledLink>

          {/* show username */}
          <UserName>{user.username}</UserName>

          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </>
      )}
    </Nav>
  );
}
