import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddTask() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [taskName, setTaskName] = useState('');
  const [taskDetails, setTaskDetails] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    axios.get('http://localhost:8081/users/')
      .then((response) => {

setUsers(response.data);
})
.catch((error) => {
console.error('Error fetching users:', error);
setErrorMessage('Failed to fetch users. Please try again later.');
});
}, []);

const handleAddTask = () => {
if (!selectedUser) {
setErrorMessage('Please select a user.');
return;
}
  const newTask = {
    title: taskName,
    description: taskDetails,
    user: { id: Number(selectedUser) } // Convert the selectedUser ID to a Number
  };

axios.post('http://localhost:8081/tasks/', newTask)
  .then((response) => {
    console.log('Task added successfully:', response.data);
            setSuccessMessage('Task added successfully');
    setSelectedUser('');
    setTaskName('');
    setTaskDetails('');
    setErrorMessage('');
  })
  .catch((error) => {
    console.error('Error adding task:', error);
    setErrorMessage('Failed to create task. Please do not leave any fields empty.');
  });
};

return (
<div className="container mt-5">
      <h2>Create Task</h2>
<div className="form-group">
<label>Select User:</label>
<select
className="form-control"
value={selectedUser}
onChange={(e) => setSelectedUser(e.target.value)}
>
<option value="">Select a User</option>
{users.map((user) => (
<option key={user.id} value={user.id}>
{user.name} (ID: {user.id})
</option>
))}
</select>
</div>
<div className="form-group">
<label>Task Name:</label>
<input
type="text"
className="form-control"
value={taskName}
onChange={(e) => setTaskName(e.target.value)}
/>
</div>
<div className="form-group">
<label>Task Details:</label>
<textarea
className="form-control"
value={taskDetails}
onChange={(e) => setTaskDetails(e.target.value)}
/>
</div>
<button className="btn btn-primary" onClick={handleAddTask}>
Create Task
</button>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      {successMessage && <p className="text-success">{successMessage}</p>} {/* Display success message */}
</div>
);
}

export default AddTask;