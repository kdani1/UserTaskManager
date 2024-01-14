import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/tasks/') // Update with your actual API endpoint
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching tasks:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Description</th>
            <th>Assigned User ID</th>
            <th>Assigned User Name</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.userId}</td> {/* Assuming each task has a userId field */}
              <td>{task.userName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetTasks;
