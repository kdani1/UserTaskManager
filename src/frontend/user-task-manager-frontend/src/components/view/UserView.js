import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../button/BackButton';

function UserView() {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/users/${id}`)
      .then((response) => {
        setUser(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
        setError('User not found or error fetching user data.');
        setUser(null);

        axios.get('http://localhost:8081/users/')
          .then(res => setAllUsers(res.data))
          .catch(err => console.error('Error fetching all users:', err));
      });
  }, [id]);

  const handleUserSelection = (e) => {
    navigate(`/user/${e.target.value}`);
  };

  const handleEditUser = () => {
    navigate(`/user/${id}/edit`);
  };

  const handleDeleteUser = () => {
    if (window.confirm('Are you sure you want to delete this user? By deleting the user you will delete all the tasks that has been assigned to this user.')) {
      axios.delete(`http://localhost:8081/users/${id}`)
        .then(() => {
          navigate('/tables'); // Redirect after deletion
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          alert('Error deleting user. Please try again later.');
        });
    }
  };
const handleRestoreUser = () => {
  if (window.confirm('Are you sure you want to restore this user?')) {
    axios.put(`http://localhost:8081/users/${id}/restore`)
      .then(() => {
        navigate('/tables'); // Redirect after restoration or refresh the user data
      })
      .catch(error => {
        console.error('Error restoring user:', error);
        alert('Error restoring user. Please try again later.');
      });
  }
};


if (error) {
  return (
    <div className="container mt-5">
      <p>Error: {error}</p>
      <p>You can select a user here, go back, or try to restore the user:</p>
      <select onChange={handleUserSelection} className="form-select">
        <option value="">Select a User</option>
        {allUsers.map(user => (
          <option key={user.id} value={user.id}>ID: {user.id} | {user.name}</option>
        ))}
      </select>
      <div className="mt-3">
      </div>
      <BackButton />
              <button className="btn btn-primary me-2" onClick={handleRestoreUser}>Try Restoring User</button>
    </div>
  );
}



  if (!user) {
    return (
      <div className="container mt-5">
        Loading...
        <BackButton />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>User Details</h2>
      <div className="user-details">
        <p><strong>User ID:</strong> {user.id}</p>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email Address:</strong> {user.email}</p>
        <p><strong>Address:</strong> {`${user.address.city} ${user.address.zipCode}, ${user.address.street}, ${user.address.houseNumber}`}</p>
                <p><strong>Password (Hash):</strong> {user.password}</p>
        <h3>User's Tasks</h3>
        <ul>
          {user.simpleTasks && user.simpleTasks.length > 0 ? (
            user.simpleTasks.map(task => (
              <li key={task.id}>id: {task.id} | name: {task.title} | description: {task.description}</li>
            ))
          ) : (
            <p>No tasks found for this user.</p>
          )}
        </ul>
      </div>
      <div className="text-center mt-3">
                                                                      <BackButton />
        <button className="btn btn-primary me-2" onClick={handleEditUser}>Edit User</button>
        <button className="btn btn-danger" onClick={handleDeleteUser}>Delete User</button>
                                                                </div>
                                                                </div>
                                                                );
                                                                }

                                                                export default UserView;

