import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://test-task/api',
});

export const setAuthToken = (token) => {
    if (token) {
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete axiosInstance.defaults.headers.common['Authorization'];
    }
};

const token = JSON.parse(localStorage.getItem('user'))?.token;
if (token) {
    setAuthToken(token);
}

export default axiosInstance;
