import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
    set(token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    },
    unset() {
        axios.defaults.headers.common.Authorization = '';
    },
}

const register = createAsyncThunk('/auth/register', async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/signup', credentials);
        token.set(data.token);
        return data;
    } catch (error) {
        if (error.response.data.name === 'MongoError') {
            return thunkAPI.rejectWithValue('isRegisterEmailAlertShown');

        };

        if (error.response.data.errors.password.kind === 'minlength') { 
            return thunkAPI.rejectWithValue('isRegisterPasswordAlertShown');
        };

    }

});

const login = createAsyncThunk('/auth/login', async (credentials, thunkAPI) => {
    try {
        const { data } = await axios.post('/users/login', credentials);
        token.set(data.token);
        return data;
    } catch (error) {
        console.log(error);
        return thunkAPI.rejectWithValue('isLogInAlertShown');

    }

});

const logout = createAsyncThunk('/auth/logout', async () => {
    try {
        await axios.post('/users/logout');
        token.unset();
    } catch (error) {
        console.log(error);
    }
});

const fetchCurrentUser = createAsyncThunk('/auth/refresh', async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const persistedToken = state.auth.token;

    if (persistedToken === null) {
        return thunkAPI.rejectWithValue();
    };

    token.set(persistedToken);

    try {
        const { data } = await axios.get('/users/current');
        return data;
    } catch (error) {
        console.log(error);
    }
    
})

export const authOperations = { register, login, logout, fetchCurrentUser };
