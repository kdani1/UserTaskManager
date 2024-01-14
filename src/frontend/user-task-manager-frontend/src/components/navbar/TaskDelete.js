import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TaskDelete() {
  const [tasks, setTasks] = useState([]);
  const [selectedTaskId, setSelectedTaskId] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Function to fetch tasks from the server
  const fetchTasks = () => {
    axios.get('http://localhost:8081/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleTaskSelection = (e) => {
    setSelectedTaskId(e.target.value);
        setSuccessMessage('');
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:8081/tasks/${selectedTaskId}`)
        .then(() => {
                      setSuccessMessage('Task deleted successfully');
          setSelectedTaskId('');
          fetchTasks(); // Refetch the tasks after deletion
        })
        .catch(error => {
          console.error('Error deleting task:', error);
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Delete Task</h2>
      <select onChange={handleTaskSelection} value={selectedTaskId} className="form-select">
        <option value="">Select a Task</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>{task.title}</option>
        ))}
      </select>
      {selectedTaskId && (
        <button onClick={handleDelete} className="btn btn-danger mt-3">
          Delete
        </button>
      )}
                {successMessage && <p className="text-success">{successMessage}</p>} {/* Display success message */}
    </div>
  );
}

export default TaskDelete;
