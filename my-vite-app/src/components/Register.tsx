import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../auth/authSlice";
import type { RootState, AppDispatch } from "../store";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
  margin: 80px auto;
  padding: 2rem;
  border-radius: 8px;
  background: #f1f5f9;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
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
  margin-bottom: 0.3rem;
`;

const Input = styled.input`
  padding: 0.5rem 0.7rem;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #38bdf8;
    box-shadow: 0 0 0 2px rgba(56,189,248,0.2);
  }
`;

const Button = styled.button`
  padding: 0.7rem;
  background-color: #38bdf8;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
  }
`;

const Message = styled.p<{ success?: boolean }>`
  color: ${({ success }) => (success ? "green" : "red")};
  text-align: center;
  margin-top: 1rem;
`;

const Register: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, user, error } = useSelector((state: RootState) => state.auth);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    dispatch(registerUser({
      username: form.username,
      email: form.email,
      password: form.password
    }));
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <div>
          <Label>Username</Label>
          <Input name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} required />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </Form>
      {user && <Message success>Registration successful!</Message>}
      {error && <Message>{error}</Message>}
    </Container>
  );
};

export default Register;
