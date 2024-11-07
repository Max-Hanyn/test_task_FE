import React from 'react';
import {useNavigate} from 'react-router-dom';

const Index = () => {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate('/login');
    };

    return (
        <div className="index-container">
            <h1>Welcome to Maksym Hanyn Application</h1>
            <p>Please login to get started:</p>
            <div className="button-group">
                <button onClick={goToLogin}>Login</button>
            </div>
        </div>
    );
};

export default Index;
