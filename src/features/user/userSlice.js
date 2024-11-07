import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axios';
import { setAuthToken } from '../../api/axios';

const loadUserFromLocalStorage = () => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
};

const initialState = {
    user: loadUserFromLocalStorage(),
    token: loadUserFromLocalStorage()?.token || null,
    loading: false,
    error: null,
};

export const loginUser = createAsyncThunk('user/login', async (credentials, { rejectWithValue }) => {
    try {
        const response = await axios.post('/login', credentials);
        const user = response.data.user;
        const token = response.data.token;

        setAuthToken(token);
        localStorage.setItem('user', JSON.stringify({ ...user, token }));

        return { user, token };
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const logoutUser = createAsyncThunk('user/logout', async (_, { rejectWithValue }) => {
    try {
        await axios.post('/logout');
        setAuthToken(null);
        localStorage.removeItem('user');
        return {};
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.loading = false;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.token = null;
            })
            .addMatcher((action) => action.type.endsWith('/pending'), (state) => {
                state.loading = true;
                state.error = null;
            })
            .addMatcher((action) => action.type.endsWith('/rejected'), (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
