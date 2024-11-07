import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate  } from 'react-router-dom';
import Index from './pages/Index';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import UserManagement from "./pages/UserManagement";
import {useSelector} from "react-redux";
import Dashboard from "./pages/Dashboard";

function App() {

    const user = useSelector((state) => state.user.user);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={user ? <Navigate to="/user-dashboard" /> : <Login />} />
                <Route element={<ProtectedRoute allowedRole={1} />}>
                    <Route path="/user-dashboard" element={<UserManagement />} />
                </Route>
                <Route path="/dashboard" element={<Dashboard />} />

            </Routes>
        </Router>
    );
}

export default App;
