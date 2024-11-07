import axios from './axios';

export const getUsers = async (page = 1) => {
    const response = await axios.get(`/users?page=${page}`);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post('/users', userData);
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axios.put(`/users/${id}`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`/users/${id}`);
    return response.data;
};
