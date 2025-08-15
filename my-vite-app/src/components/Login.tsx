import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../auth/loginSlice";
import type { RootState, AppDispatch } from "../store";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  background-color: #f8fafc;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #1e293b;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: #334155;
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #cbd5e1;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.3);
  }
`;

const Button = styled.button<{ disabled: boolean }>`
  padding: 0.75rem 1rem;
  background-color: #38bdf8;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: background 0.3s;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#38bdf8" : "#0ea5e9")};
  }
`;

const ErrorMessage = styled.p`
  color: #ef4444;
  text-align: center;
  margin-top: 0.5rem;
`;

const SuccessMessage = styled.p`
  color: #22c55e;
  text-align: center;
  margin-top: 0.5rem;
`;

const Login: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state: RootState) => state.login);

  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(loginUser(form));
    if (loginUser.fulfilled.match(result)) {
      navigate("/"); // redirect to dashboard after login
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
        <div>
          <Label>Password</Label>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </Form>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {user && <SuccessMessage>Login successful!</SuccessMessage>}
    </Container>
  );
};

export default Login;
