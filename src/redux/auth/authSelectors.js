const getIsLoggedIn = state => state.auth.isLoggedIn;
const getUserEmail = state => state.auth.user.email;
const getUserName = state => state.auth.user.name;
const getUserToken = state => state.auth.user.token;
const getIsFetchingCurrent = state => state.auth.isFetchingCurrentUser;
const getIsLogInAlertShown = state => state.auth.isLogInAlertShown;
const getIsRegisterEmailAlertShown = state => state.auth.isRegisterEmailAlertShown;
const getIsRegisterPasswordAlertShown = state => state.auth.isRegisterPasswordAlertShown;

export const authSelectors = {
    getIsLoggedIn,
    getUserEmail,
    getUserName,
    getUserToken,
    getIsFetchingCurrent,
    getIsLogInAlertShown,
    getIsRegisterEmailAlertShown,
    getIsRegisterPasswordAlertShown 
};
