import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/Login.css';

function Signup() {
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSignupClick = async () => {
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Signup failed');
            }

            navigate('/login'); // Redirect to login page after successful signup
        } catch (error) {
            setError('Signup failed: ' + error.message);
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign Up</h1>
                {error && <p className="text-danger">{error}</p>}
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your Name' name="name" value={userData.name} onChange={handleChange} />
                    <input type="email" placeholder='Email Address' name="email" value={userData.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={userData.password} onChange={handleChange} />
                </div>
                <button onClick={handleSignupClick}>Sign Up</button>
            </div>
        </div>
    );
}

export default Signup;
