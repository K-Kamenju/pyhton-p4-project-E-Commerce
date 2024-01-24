import React, { useState } from 'react'

function ProfileForm() {
    const [profileData, setProfileData] = useState({
        // Initialize with user's current profile data
        name: 'John Doe',
        email: 'john.doe@example.com',
        // Add other profile fields as needed
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
      };
    
      const handleUpdateProfile = () => {
        // Implement the logic to update the user's profile on the backend
        console.log('Updating profile:', profileData);
        // You may want to make an API call to update the user's profile here
      };
    
      return (
        <div className="container mt-5">
          <h2>Update Profile</h2>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={profileData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={profileData.email}
                onChange={handleInputChange}
              />
            </div>
            {/* Add other profile fields as needed */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleUpdateProfile}
            >
              Update Profile
            </button>
          </form>
        </div>
      );
}

export default ProfileForm