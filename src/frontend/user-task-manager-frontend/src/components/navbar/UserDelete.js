import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserDelete() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Function to fetch users from the server
  const fetchUsers = () => {
    axios.get('http://localhost:8081/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleUserSelection = (e) => {
    setSelectedUserId(e.target.value);
        setSuccessMessage('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this user? By deleting the user you will delete all the tasks that has been assigned to this user.')) {
      axios.delete(`http://localhost:8081/users/${selectedUserId}`)
        .then(() => {
                      setSuccessMessage('User deleted successfully');
          setSelectedUserId('');
          fetchUsers(); // Refetch the users after deletion
        })
        .catch(error => {
          console.error('Error deleting user:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Delete User</h2>
      <select onChange={handleUserSelection} value={selectedUserId} className="form-select">
        <option value="">Select a User</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
      {selectedUserId && (
        <button onClick={handleDelete} className="btn btn-danger mt-3">
          Delete
        </button>
      )}
                {successMessage && <p className="text-success">{successMessage}</p>} {/* Display success message */}
    </div>
  );
}

export default UserDelete;
