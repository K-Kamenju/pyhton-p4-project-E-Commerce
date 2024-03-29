import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Pages/css/Login.css';
import { AuthContext } from '../Components/Servicess/Authentication'; // Adjust the path as needed

function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleLoginClick = async () => {
        try {
            const response = await fetch('https://marketx-6vt2.onrender.com/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            localStorage.setItem('token', data.access_token); // Store the JWT token
            login(data.access_token);
            navigate('/');
        } catch (error) {
            setError('Login failed: Invalid email or password');
        }
    };

    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Login</h1>
                {error && <p className="text-danger">{error}</p>}
                <div className="loginsignup-fields">
                    <input type="email" placeholder='Email' name="email" value={credentials.email} onChange={handleChange} />
                    <input type="password" placeholder='Password' name="password" value={credentials.password} onChange={handleChange} />
                </div>
                <button onClick={handleLoginClick}>Continue</button>
                <p className="loginsignup-login">Don't have an account? 
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    Sign Up here
                </Link></p>
            </div>
        </div>
    );
}

export default Login;
