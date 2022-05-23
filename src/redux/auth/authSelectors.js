const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserEmail = state => state.auth.user.email;
const getUserToken = state => state.auth.user.token;
const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;

export const authSelectors = {
    getIsLoggedIn,
    getUserEmail,
    getUserToken,
    getIsFetchingCurrent,
};
