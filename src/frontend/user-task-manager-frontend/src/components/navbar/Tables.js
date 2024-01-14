import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [successMessage, setSuccessMessage] = useState(''); // State for success messages

  useEffect(() => {
    fetchUsers();
    fetchTasks();
  }, []);

  const fetchUsers = () => {
    axios.get('http://localhost:8081/users/')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error fetching user data:', error));
  };

  const fetchTasks = () => {
    axios.get('http://localhost:8081/tasks/')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching task data:', error));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user? By deleting the user you will delete all the tasks that has been assigned to this user.')) {
      axios.delete(`http://localhost:8081/users/${userId}`)
        .then(() => {
          setSuccessMessage('User deleted successfully'); // Set success message
          fetchUsers(); // Refresh users
          fetchTasks(); // Refresh tasks
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          setSuccessMessage('Failed to delete user'); // Set error message
        });
    }
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:8081/tasks/${taskId}`)
        .then(() => {
          setSuccessMessage('Task deleted successfully'); // Set success message
          fetchTasks(); // Refresh tasks
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          setSuccessMessage('Failed to delete task'); // Set error message
        });
    }
  };

  return (
    <div className="container mt-5">
      {successMessage && <div className="alert alert-success">{successMessage}</div>} {/* Success message box */}
      <h2>Users</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{`${user.address.street} ${user.address.houseNumber}, ${user.address.city}, ${user.address.zipCode}`}</td>
<td>
  <Link to={`/user/${user.id}`} className="btn btn-secondary btn-sm mr-2">View</Link>
  <Link to={`/user/${user.id}/edit`} className="btn btn-primary btn-sm mr-2">Edit</Link>
  <button
    className="btn btn-danger btn-sm"
    onClick={() => handleDeleteUser(user.id)} // Corrected this line
  >
    Delete
  </button>
</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Assigned User</th>
                        <th>User ID</th>
            <th>Actions</th>
          </tr>
        </thead>

<tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.userName}</td>
                            <td>{task.userId}</td>
              <td>
                <Link to={`/task/${task.id}`} className="btn btn-secondary btn-sm mr-2">View</Link>
                <Link to={`/task/${task.id}/edit`} className="btn btn-primary btn-sm mr-2">Edit</Link>
                <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default UserList;