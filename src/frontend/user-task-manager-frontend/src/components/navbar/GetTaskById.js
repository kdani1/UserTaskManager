import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GetTaskById() {
  const [taskId, setTaskId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const id = e.target.value;
    setTaskId(id.replace(/[^0-9]/g, '')); // Ensures only numbers are entered
  };

  const handleFindTask = () => {
    if (taskId) {
      navigate(`/task/${taskId}`);
    } else {
      alert('Please enter a valid task ID');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Get Task by ID</h2>
      <input
        type="text"
        value={taskId}
        onChange={handleInputChange}
        placeholder="Enter Task ID"
        className="form-control"
      />
      <button onClick={handleFindTask} className="btn btn-primary mt-3">
        Find
      </button>
    </div>
  );
}

export default GetTaskById;
