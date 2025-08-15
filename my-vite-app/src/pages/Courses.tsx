// src/pages/Courses.tsx
import React, { useEffect, useState } from "react";
import { fetchCourses } from "../store/coursesSlice";
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

const CourseList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  list-style: none;
  padding: 0;
`;

const CourseCard = styled.li`
  background-color: #f1f5f9;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: #0f172a;
`;

const CardDescription = styled.p`
  color: #334155;
  margin-top: 0.5rem;
`;

const CardActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export default function Courses() {
  const dispatch = useAppDispatch();
  const { items: courses, loading, error } = useAppSelector(
    (state) => state.courses
  );

  // Local state for demo (add/edit)
  const [newCourseTitle, setNewCourseTitle] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleAddCourse = () => {
    alert(`Here you would implement adding a course: ${newCourseTitle}`);
    setNewCourseTitle("");
  };

  const handleEditCourse = (id: number) => {
    alert(`Here you would implement editing course with ID: ${id}`);
  };

  const handleDeleteCourse = (id: number) => {
    alert(`Here you would implement deleting course with ID: ${id}`);
  };

  return (
    <Container>
      <Header>
        <Title>Courses</Title>
        <div>
          <input
            type="text"
            placeholder="New course title..."
            value={newCourseTitle}
            onChange={(e) => setNewCourseTitle(e.target.value)}
          />
          <Button onClick={handleAddCourse}>Add Course</Button>
        </div>
      </Header>

      {courses.length === 0 && <p>No courses available.</p>}

      <CourseList>
        {courses.map((course) => (
          <CourseCard key={course.id}>
            <CardHeader>
              <CardTitle>{course.title}</CardTitle>
            </CardHeader>
            <CardDescription>{course.description}</CardDescription>
            <CardActions>
              <Button onClick={() => handleEditCourse(course.id)}>Edit</Button>
              <Button onClick={() => handleDeleteCourse(course.id)}>Delete</Button>
            </CardActions>
          </CourseCard>
        ))}
      </CourseList>
    </Container>
  );
}
