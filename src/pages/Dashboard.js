import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);

    const handleLogout = () => {
        dispatch(logoutUser())
            .unwrap()
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <div>
            <h2>Welcome, {user?.name}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;
