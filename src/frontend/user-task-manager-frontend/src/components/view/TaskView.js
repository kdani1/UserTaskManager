import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../button/BackButton';

function TaskView() {
  const [task, setTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [error, setError] = useState('');
  const { id } = useParams(); // Get the task ID from the URL params
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8081/tasks/${id}`)
      .then((response) => {
        setTask(response.data);
        setError('');
      })
      .catch((error) => {
        console.error('Error fetching task data:', error);
        setError('Task not found or error fetching task data.');
        setTask(null);

        axios.get('http://localhost:8081/tasks/')
          .then(res => setAllTasks(res.data))
          .catch(err => console.error('Error fetching all tasks:', err));
      });
  }, [id]);

  const handleEditTask = () => {
    navigate(`/task/${id}/edit`);
  };

  const handleDeleteTask = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:8081/tasks/${id}`)
        .then(() => {
          navigate('/tables'); // Redirect after deletion
        })
        .catch(error => {
          console.error('Error deleting task:', error);
          alert('Error deleting task. Please try again later.');
        });
    }
  };
const handleRestoreTask = () => {
  if (window.confirm('Are you sure you want to restore this task?')) {
    // Assuming you only need to change the 'deleted' status, no need to send taskData
    axios.put(`http://localhost:8081/tasks/restore/${id}`)
      .then(() => {
        navigate('/tables'); // Redirect after restoration
      })
      .catch(error => {
        console.error('Error restoring task:', error);
        alert('Error restoring task. Please try again later.');
      });
  }
};


  const handleTaskSelection = (e) => {
    navigate(`/task/${e.target.value}`);
  };

  if (error) {
    return (
      <div className="container mt-5">
        <p>Error: {error}</p>
        <p>Please select a task:</p>
        <select onChange={handleTaskSelection} className="form-select">
          <option value="">Select a Task</option>
          {allTasks.map(task => (
            <option key={task.id} value={task.id}>ID: {task.id} | {task.title}</option>
          ))}
        </select>
        <BackButton />
      </div>
    );
  }

  if (!task) {
    return (
      <div className="container mt-5">
        Loading...
        <BackButton />
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Task Details</h2>
      <div className="task-details">
        {task.deleted ? '' : <p><strong>Task ID:</strong> {task.id}</p>}
        {task.deleted ? '' : <p><strong>Task Name:</strong> {task.title}</p>}
        {task.deleted ? '' : <p><strong>Task Description:</strong> {task.description}</p>}
        {task.deleted ? '' : <p><strong>Assigned User ID:</strong> {task.userId}</p>}
        {task.deleted ? '' : <p><strong>Assigned User Name:</strong> {task.userName}</p>}
{task.deleted ? <p><strong>This Task is currently marked as deleted:</strong></p> : ''}
      </div>
      <div className="text-center mt-3">
        <BackButton />
{task.deleted ? '' : <button className="btn btn-primary me-2" onClick={handleEditTask}>Edit Task</button>}
                {task.deleted ? <button className="btn btn-primary me-2" onClick={handleRestoreTask}>Restore Task</button> : <button className="btn btn-danger" onClick={handleDeleteTask}>Delete Task</button>}
      </div>
    </div>
  );
}

export default TaskView;
