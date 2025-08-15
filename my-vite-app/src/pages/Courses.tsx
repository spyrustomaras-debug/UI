// src/pages/Courses.tsx
import React, { useEffect, useState } from "react";
import { fetchCourses, createCourse } from "../store/coursesSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import styled from "styled-components";

// Styled Components
const Container = styled.div`
  padding: 2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #1e293b;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  font-weight: bold;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
`;

// Modal styles
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  min-width: 300px;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  border: 1px solid #cbd5e1;
`;

// Courses list
const CourseList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  list-style: none;
  padding: 0;
`;

const CourseCard = styled.li`
  flex: 0 0 250px;
  background-color: #f1f5f9;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #0f172a;
`;

const CardDescription = styled.p`
  color: #334155;
  margin-top: 0.5rem;
`;

export default function Courses() {
  const dispatch = useAppDispatch();
  const { items: courses, loading, error } = useAppSelector((state) => state.courses);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAddCourse = () => {
    if (!newCourseTitle || !newCourseDescription) return alert("Fill in all fields!");
    dispatch(createCourse({ title: newCourseTitle, description: newCourseDescription }));
    setNewCourseTitle("");
    setNewCourseDescription("");
    setIsModalOpen(false);
  };

  return (
    <Container>
      <Header>
        <Title>Courses</Title>
        <Button onClick={() => setIsModalOpen(true)}>Add Course</Button>
      </Header>

      {courses.length === 0 && <p>No courses available.</p>}

      <CourseList>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CardTitle>{course.title}</CardTitle>
            <CardDescription>{course.description}</CardDescription>
          </CourseCard>
        ))}
      </CourseList>

      {/* Modal */}
      {isModalOpen && (
        <ModalOverlay onClick={() => setIsModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <h2>Create New Course</h2>
            <Input
              type="text"
              placeholder="Title"
              value={newCourseTitle}
              onChange={(e) => setNewCourseTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="Description"
              value={newCourseDescription}
              onChange={(e) => setNewCourseDescription(e.target.value)}
            />
            <Button onClick={handleAddCourse}>Create</Button>
          </ModalContent>
        </ModalOverlay>
      )}

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
    </Container>
  );
}
