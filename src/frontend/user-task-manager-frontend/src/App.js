import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import Tables from './components/navbar/Tables';
import AddUser from './components/navbar/AddUser';
import AddTask from './components/navbar/AddTask';
import UserView from './components/view/UserView';
import UserEdit from './components/navbar/UserEdit';
import UserDelete from './components/navbar/UserDelete';
import TaskView from './components/view/TaskView';
import TaskEdit from './components/navbar/TaskEdit';
import TaskDelete from './components/navbar/TaskDelete';
import Welcome from './components/Welcome';
import GetUsers from './components/navbar/GetUsers';
import GetUserById from './components/navbar/GetUserById';
import GetTasks from './components/navbar/GetTasks';
import GetTaskById from './components/navbar/GetTaskById';

function App() {
  // Define the inline styles
const containerStyle = {
    backgroundColor: '#F5F5F5',
    minHeight: '100vh', // Ensure the background covers the full height of the viewport
    display: 'flex', // Enable flexbox
    flexDirection: 'column', // Arrange content in a column
  };

  const frameStyle = {
    backgroundColor: '#343a40', // Use the same background color as the navbar
    width: '10px', // Width of the frame
  };

  const navStyle = {
    display: 'flex', // Enable flexbox
    justifyContent: 'center', // Center content horizontally
    backgroundColor: '#343a40', // Background color of the navbar
        color: 'white', // Text color of the navbar (set it to white to match the links)
  };

  return (
    <div style={containerStyle} className="container mt-5">
      <div style={{ display: 'flex', flex: 1 }}>
        {/* Left frame */}
        <div style={frameStyle}></div>
        {/* Content */}
        <div style={{ flex: 1 }}>
          <h1 style={navStyle}>
            <Link to="/" className="text-decoration-none text-white">
              UserTaskManager
            </Link>
          </h1>
          <nav style={navStyle} className="navbar navbar-expand-lg navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to="/tables" className="nav-link">
              Tables
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/adduser" className="nav-link">
              Create User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addtask" className="nav-link">
              Create Task
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/getusers" className="nav-link">
              Get Users
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/getuserbyid" className="nav-link">
              Get User By Id
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gettasks" className="nav-link">
              Get Tasks
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/gettaskbyid" className="nav-link">
              Get Task By Id
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/-1/edit" className="nav-link">
              Update User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/task/-1/edit" className="nav-link">
              Update Task
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user/-1/delete" className="nav-link">
              Delete User
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/task/-1/delete" className="nav-link">
              Delete Task
            </Link>
          </li>
          {/* Add more links to other routes as needed */}
        </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/adduser" element={<AddUser />} />
            <Route path="/addtask" element={<AddTask />} />
            <Route path="/getusers" element={<GetUsers />} />
            <Route path="/getuserbyid" element={<GetUserById />} />
            <Route path="/gettasks" element={<GetTasks />} />
            <Route path="/gettaskbyid" element={<GetTaskById />} />
            <Route path="/user/:id" element={<UserView />} />
            <Route path="/user/:id/edit" element={<UserEdit />} />
            <Route path="/user/:id/delete" element={<UserDelete />} />
            <Route path="/task/:id/edit" element={<TaskEdit />} />
            <Route path="/task/:id" element={<TaskView />} />
            <Route path="/task/:id/delete" element={<TaskDelete />} />
          </Routes>
        </div>
        {/* Right frame */}
        <div style={frameStyle}></div>
      </div>
    </div>
  );
}

export default App;
