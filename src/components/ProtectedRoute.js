import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole, redirectPath = '/login' }) => {
    const { user } = useSelector((state) => state.user);

    if (!user) {
        return <Navigate to={redirectPath} replace />;
    }

    if (user.role_id !== allowedRole) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
