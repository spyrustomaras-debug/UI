import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;       /* ✅ Stays at the top even when scrolling */
  top: 0;
  left: 0;
  width: 100%;           /* ✅ Full width */
  background: #1e293b;
  padding: 1rem;
  display: flex;
  gap: 1rem;
  z-index: 1000;         /* ✅ Makes sure it’s above other content */
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

  return (
    <Nav>
      <StyledLink to="/" $active={location.pathname === "/"}>
        Dashboard
      </StyledLink>
      <StyledLink to="/students" $active={location.pathname === "/students"}>
        Students
      </StyledLink>
      <StyledLink to="/courses" $active={location.pathname === "/courses"}>
        Courses
      </StyledLink>
    </Nav>
  );
}
