import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../button/BackButton';

function TaskEdit() {
  const [taskData, setTaskData] = useState(null);
  const [originalTaskData, setOriginalTaskData] = useState(null); // Store the original task data
  const [tasks, setTasks] = useState([]); // For task selector
  const [loading, setLoading] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    // Fetch all tasks for the selector
    axios.get('http://localhost:8081/tasks/')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });

    // Fetch the specific task data
    axios.get(`http://localhost:8081/tasks/${id}`)
      .then(response => {
        setTaskData(response.data);
        setOriginalTaskData(response.data); // Update original task data here
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching task data:', error);
        setLoading(false);
        setTaskData(null); // Set to null if task not found
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    setIsModified(true);
    setSuccessMessage('');
  };

  const handleReset = () => {
    setTaskData(originalTaskData); // Reset to original task data
    setIsModified(false);
  };

  const handleSave = () => {
    axios.put(`http://localhost:8081/tasks/${id}`, taskData)
      .then(() => {
                      setSuccessMessage('User updated successfully');
        setIsModified(false);
        setOriginalTaskData(taskData); // Update original task data after save
      })
      .catch((error) => {
        console.error('Error updating task:', error);
      });
  };

const handleBack = () => {
  if (isModified) {
    const confirmExit = window.confirm('Are you sure you want to exit without saving changes?');
    if (confirmExit) {
      navigate(-1); // Exit without saving
    }
    // If the user chooses not to exit, do nothing (stay on the page)
  } else {
    navigate(-1); // Navigate back if there are no unsaved changes
  }
};




  const handleTaskSelection = (e) => {
    const selectedTaskId = e.target.value;
    navigate(`/task/${selectedTaskId}/edit`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!taskData) {
    return (
      <div className="container mt-5">
    <h2>Select Task to Edit</h2>
    <select onChange={handleTaskSelection} className="form-select">
      <option value="">Select a Task</option>
      {tasks.map(task => (
        <option key={task.id} value={task.id}>{task.title}</option>
      ))}
    </select>
  </div>
);
}

return (
<div className="container mt-5">
<h2>Edit Task</h2>
<form>
<div className="mb-3">
<label htmlFor="title" className="form-label">Title</label>
<input
         type="text"
         className="form-control"
         id="title"
         name="title"
         value={taskData.title}
         onChange={handleChange}
       />
</div>
<div className="mb-3">
<label htmlFor="description" className="form-label">Description</label>
<textarea
         className="form-control"
         id="description"
         name="description"
         value={taskData.description}
         onChange={handleChange}
       ></textarea>
</div>
{/* Add other task-specific fields if necessary */}
<div className="mb-3">
{isModified && (
<>
<button type="button" onClick={handleReset} className="btn btn-danger me-2">Reset</button>
<button type="button" onClick={handleSave} className="btn btn-primary">Save</button>
</>
)}
</div>
</form>
<BackButton handleCustomBack={handleBack} />
          {successMessage && <p className="text-success">{successMessage}</p>} {/* Display success message */}
</div>
);
}

export default TaskEdit;