import React, { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/userService';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Paper,
    Typography,
    Select,
    MenuItem,
    IconButton,
    Modal,
    Pagination
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role_id: 1 });
    const [editingUser, setEditingUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const fetchUsers = async (page) => {
        const data = await getUsers(page);
        setUsers(data.data);
        setTotalPages(data.last_page);
        if (data.data.length === 0 && page > 1) {
            setPage(page - 1);
        }
    };

    const handleCreateOrUpdateUser = async (e) => {
        e.preventDefault();
        if (editingUser) {
            await updateUser(editingUser.id, formData);
            setEditingUser(null);
        } else {
            await createUser(formData);
        }
        setFormData({ name: '', email: '', password: '', role_id: 1 });
        setIsModalOpen(false);
        fetchUsers(page);
    };

    const handleEditUser = (user) => {
        setFormData({ ...user, password: '' });
        setEditingUser(user);
        setIsModalOpen(true);
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        fetchUsers(page);
    };

    const handlePageChange = (_, newPage) => {
        setPage(newPage);
    };

    const handleOpenModal = () => {
        setFormData({ name: '', email: '', password: '', role_id: 1 });
        setEditingUser(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        navigate('/');
    };

    return (
        <Box sx={{ padding: 4, position: 'relative' }}>
            <Box sx={{ position: 'absolute', top: 16, right: 16 }}>
                <Button variant="outlined" color="secondary" onClick={handleLogout}>
                    Logout
                </Button>
            </Box>

            <Typography variant="h4" gutterBottom>User Management</Typography>

            <Button variant="contained" color="primary" onClick={handleOpenModal} sx={{ marginBottom: 2 }}>
                Add User
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.role_id === 1 ? 'Admin' : 'User'}</TableCell>
                                <TableCell>
                                    <IconButton color="primary" onClick={() => handleEditUser(user)}>
                                        <Edit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => handleDeleteUser(user.id)}>
                                        <Delete />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    color="primary"
                />
            </Box>

            <Modal open={isModalOpen} onClose={handleCloseModal}>
                <Box
                    component={Paper}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        padding: 3,
                        boxShadow: 24,
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        {editingUser ? 'Edit User' : 'Add User'}
                    </Typography>
                    <form onSubmit={handleCreateOrUpdateUser}>
                        <TextField
                            label="Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required={!editingUser}
                            fullWidth
                            margin="normal"
                        />
                        <Select
                            label="Role"
                            value={formData.role_id}
                            onChange={(e) => setFormData({ ...formData, role_id: e.target.value })}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value={1}>Admin</MenuItem>
                            <MenuItem value={2}>User</MenuItem>
                        </Select>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            fullWidth
                            sx={{ marginTop: 2 }}
                        >
                            {editingUser ? 'Update User' : 'Create User'}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </Box>
    );
};

export default UserManagement;
