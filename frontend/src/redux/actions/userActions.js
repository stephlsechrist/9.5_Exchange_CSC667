export const setUser = user => ({
    type: 'USER_SET_USER',
    user,
});
export const setRole = role => ({
    type: 'USER_SET_ROLE',
    role,
});
export const setEmail = email => ({
    type: 'USER_SET_EMAIL',
    email,
});
export const setPassword = password => ({
    type: 'USER_SET_PASSWORD',
    password,
});
export const setIsLoggedIn = isLoggedIn => ({
    type: 'USER_SET_IS_LOGGED_IN',
    isLoggedIn,
});
export const setLoadingState = loadingState => ({
    type: 'USER_SET_LOADING_STATE',
    loadingState,
});