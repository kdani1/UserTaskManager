import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function GetUserById() {
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const id = e.target.value;
    setUserId(id.replace(/[^0-9]/g, '')); // Ensures only numbers are entered
  };

  const handleFindUser = () => {
    if (userId) {
      navigate(`/user/${userId}`);
    } else {
      alert('Please enter a valid user ID');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Find User by ID</h2>
      <input
        type="text"
        value={userId}
        onChange={handleInputChange}
        placeholder="Enter User ID"
        className="form-control"
      />
      <button onClick={handleFindUser} className="btn btn-primary mt-3">
        Find
      </button>
    </div>
  );
}

export default GetUserById;
