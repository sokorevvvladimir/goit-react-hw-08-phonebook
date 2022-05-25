import { createSlice } from '@reduxjs/toolkit';
import { authOperations } from './authOperations';

const initialState = {
    user: { name: null, email: null },
    token: null,
    isLoggedIn: false,
    isFetchingCurrentUser: false,
    isLogInAlertShown: false,
    isRegisterEmailAlertShown: false,
    isRegisterPasswordAlertShown: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: {
        [authOperations.register.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isRegisterEmailAlertShown = false;
            state.isRegisterPasswordAlertShown = false;
        },
        [authOperations.register.rejected](state, action) {
            state[action.payload] = true;
        },
        [authOperations.login.fulfilled](state, action) {
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isLoggedIn = true;
            state.isLogInAlertShown = false;
        },
        [authOperations.login.rejected](state, action) {
            state[action.payload] = true;
        },
        [authOperations.logout.fulfilled](state, action) {
            state.user = { name: null, email: null };
            state.token = null;
            state.isLoggedIn = false;
        },
        [authOperations.fetchCurrentUser.pending](state) {
            state.isFetchingCurrentUser = true;
        },
        [authOperations.fetchCurrentUser.fulfilled](state, action) {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.isFetchingCurrentUser = false;
        },
        [authOperations.fetchCurrentUser.rejected](state) {
            state.isFetchingCurrentUser = false;
        },
    }
});

export default authSlice.reducer;