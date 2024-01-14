import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../button/BackButton';

function UserEdit() {
  const [formData, setFormData] = useState(null);
  const [originalFormData, setOriginalFormData] = useState(null); // Store the original form data
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModified, setIsModified] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    axios.get('http://localhost:8081/users/')
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });

    axios.get(`http://localhost:8081/users/${id}`)
      .then(response => {
        setFormData(response.data);
        setOriginalFormData(response.data); // Save the original data
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
        setLoading(false);
        setFormData(null);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsModified(true);
    setSuccessMessage('');
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      address: { ...formData.address, [name]: value },
    });
    setIsModified(true);
  };

  const handleReset = () => {
      setFormData(originalFormData); // Reset to the original form data
      setIsModified(false);
    };

    const handleSave = () => {
      axios.put(`http://localhost:8081/users/${id}`, formData)
        .then(() => {
                      setSuccessMessage('User updated successfully');
          setOriginalFormData(formData); // Update original form data after save
          setIsModified(false);
        })
        .catch((error) => {
          console.error('Error updating user:', error);
        });
    };

    const handleBack = () => {
      if (isModified) {
        const confirmExit = window.confirm('Are you sure you want to exit without saving changes?');
        if (confirmExit) {
          navigate(-1);
        }
      } else {
        navigate(-1);
      }
    };

    const handleUserSelection = (e) => {
      const selectedUserId = e.target.value;
      navigate(`/user/${selectedUserId}/edit`);
    };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!formData) {
    return (
      <div className="container mt-5">
        <h2>Select User to Edit</h2>
        <select onChange={handleUserSelection} className="form-select">
          <option value="">Select a User</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>
    );
  }

  return (
          <div className="container mt-5">
            <h2>Edit User</h2>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input type="email" className="form-control" id="email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <div className="row">
              <div className="col">
                <input type="text" className="form-control" placeholder="City" name="city" value={formData.address.city} onChange={handleAddressChange} />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="ZIP Code" name="zipCode" value={formData.address.zipCode} onChange={handleAddressChange} />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="Street" name="street" value={formData.address.street} onChange={handleAddressChange} />
              </div>
              <div className="col">
                <input type="text" className="form-control" placeholder="House Number" name="houseNumber" value={formData.address.houseNumber} onChange={handleAddressChange} />
              </div>
            </div>
          </div>
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

export default UserEdit;
