import React, { useState } from 'react';
import axios from 'axios'; // You'll need Axios or another HTTP client library

function AddUser() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: {
      city: '',
      zipCode: '',
      street: '',
      houseNumber: '',
    },
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to create a new user
      const response = await axios.post('http://localhost:8081/users/', formData);
      setSuccessMessage('User created successfully!');
      setErrorMessage('');
      // Optionally, you can reset the form here
      setFormData({
        name: '',
        email: '',
        password: '',
        address: {
          city: '',
          zipCode: '',
          street: '',
          houseNumber: '',
        },
      });
    } catch (error) {
      setErrorMessage('Error creating user. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
<div className="container mt-5">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
<div className="mb-3">
  <label htmlFor="password" className="form-label">
    Password
  </label>
  <input
    type="password"
    className="form-control"
    id="password"
    name="password"
    value={formData.password}
    onChange={handleChange}
    required
    autoComplete="new-password" // Suggests creating a new password
  />
</div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={formData.address.city}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="ZIP Code"
                name="zipCode"
                value={formData.address.zipCode}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Street"
                name="street"
                value={formData.address.street}
                onChange={handleAddressChange}
                required
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="House Number"
                name="houseNumber"
                value={formData.address.houseNumber}
                onChange={handleAddressChange}
                required
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Create User
        </button>
      </form>
      {successMessage && <div className="alert alert-success">{successMessage}</div>}
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
    </div>
  );
}

export default AddUser;
