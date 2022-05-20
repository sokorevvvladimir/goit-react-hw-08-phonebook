const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserEmail = state => state.auth.user.email;

export const authSelectors = {
    getIsLoggedIn,
    getUserEmail,
};
