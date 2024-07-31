import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  gap: 15px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
`;

const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
`;

const QuizForm = ({ onSubmit, initialData }) => {

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
        <div className="quizc">
            <div>
            <div>
        <Label htmlFor="quizName">Name:</Label>
        <Input
          type="text"
          id="quizName"
          name="quizName"
          value={formData.quizName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description:</Label>
        <textarea
          id="description"
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="price">Price:</Label>
        <Input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="negativeMarking">Negative Marking:</Label>
        <Checkbox
          type="checkbox"
          id="negativeMarking"
          name="negativeMarking"
          checked={formData.negativeMarking}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="passingMarks">Passing Marks:</Label>
        <Input
          type="number"
          id="passingMarks"
          name="passingMarks"
          min="0"
          value={formData.passingMarks}
          onChange={handleChange}
          required
        />
      </div>
            </div>
            <div>
            <div>
        <Label htmlFor="difficultyLevel">Difficulty Level:</Label>
        <Select
          id="difficultyLevel"
          name="difficultyLevel"
          value={formData.difficultyLevel}
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </Select>
      </div>
      <div>
        <Label htmlFor="isPublished">Published:</Label>
        <Checkbox
          type="checkbox"
          id="isPublished"
          name="isPublished"
          checked={formData.isPublished}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="startTime">Start Time:</Label>
        <Input
          type="datetime-local"
          id="startTime"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="endTime">End Time:</Label>
        <Input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="endTime">Duration:</Label>
        <Input
          type="datetime-local"
          id="endTime"
          name="endTime"
          value={formData.duration}
          onChange={handleChange}
          required
        />
      </div>
            </div>
        </div>
      
    
      </Form>
    ) }
export default QuizForm; 