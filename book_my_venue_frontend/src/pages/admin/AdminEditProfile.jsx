import React, { useState } from 'react';
 
import { mockAdminUser } from '../../lib/mockData';
import './AdminEditProfile.css';

export default function AdminEditProfile() {
  
  const [formData, setFormData] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate save
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    
        <div className="profile-page">
          <div className="page-header">
            <h1 className="page-title">Edit Profile</h1>
            <p className="page-subtitle">Update your admin profile information</p>
          </div>

          {isSaved && (
            <div className="success-message">
              ✓ Profile updated successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h2 className="section-title">Personal Information</h2>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <input
                    id="role"
                    type="text"
                    name="role"
                    value={formData.role}
                    disabled
                    className="form-input disabled"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Address</h2>

              <div className="form-group full-width">
                <label htmlFor="address">Address</label>
                <input
                  id="address"
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="form-section">
              <h2 className="section-title">Security</h2>

              <div className="form-group full-width">
                <label htmlFor="currentPassword">Current Password</label>
                <input
                  id="currentPassword"
                  type="password"
                  placeholder="Enter current password"
                  className="form-input"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    id="newPassword"
                    type="password"
                    placeholder="Enter new password"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm new password"
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
              <button type="button" className="btn btn-secondary">
                Cancel
              </button>
            </div>
          </form>
        </div>
     
  );
}
