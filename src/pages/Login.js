import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }))
            .unwrap()
            .then((userData) => {
                if (userData.user.role_id === 1) {
                    navigate('/user-dashboard');
                } else if (userData.user.role_id === 2) {
                    navigate('/dashboard');
                } else {
                    console.error('Unknown role_id:', userData.user.role_id);
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
                {error && <p className="error-message">{error.message || 'Invalid credentials'}</p>}
            </form>
        </div>
    );
};

export default Login;
