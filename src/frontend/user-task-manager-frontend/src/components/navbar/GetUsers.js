import React, { useState, useEffect } from 'react';
import axios from 'axios';

function GetUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/users/')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  return (
    <div className="container mt-5">
      <h2>Users and Their Tasks</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Email Address</th>
            <th>Address</th>
            <th>Tasks</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                {`${user.address.street} ${user.address.houseNumber}, ${user.address.city}, ${user.address.zipCode}`}
              </td>
              <td>
                {user.simpleTasks && user.simpleTasks.length > 0 ? (
                  <ul>
                    {user.simpleTasks.map((task) => (
              <li key={task.id}>id: {task.id} | name: {task.title} | description: {task.description}</li>
                    ))}
                  </ul>
                ) : 'No tasks'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GetUsers;
