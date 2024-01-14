// Welcome.js
import React from 'react';

function Welcome() {
  return (
    <div className="container mt-5">
      <div className="jumbotron text-center" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
        <h1 className="display-4">Welcome to UserTaskManager</h1>
        <p className="lead">
          Powered by Java 21 and Spring Boot, with a Modern one page React Frontend
        </p>
        <hr className="my-4" style={{ backgroundColor: '#ccc' }} />
        <p className="text-muted">
          Explore the Features:
        </p>
        <ul className="list-group text-left">
          <li className="list-group-item" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <strong>Effortless User Management:</strong> Create, update, and securely manage user accounts.
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <strong>Task Tracking:</strong> Add and Manage tasks with ease, associating them with users for efficient tracking.
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <strong>Data Integrity:</strong> Soft deletion of users ensures data integrity while retaining task history.
          </li>
          <li className="list-group-item" style={{ backgroundColor: '#f5f5f5', color: '#333' }}>
            <strong>Task Control:</strong> Perform comprehensive CRUD operations for tasks.
          </li>
        </ul>
        <p className="mt-4">
          Elevate your task management. Begin your journey with UserTaskManager.
        </p>
      </div>
    </div>
  );
}

export default Welcome;
