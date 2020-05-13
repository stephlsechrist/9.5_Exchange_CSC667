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

export const login = () => (dispatch, getState) => {
    console.log('Login function!')
    const user = getState().userReducer.user;
    const password = getState().userReducer.password;
    const url = `http://localhost:4000/api/login?user=${user}&password=${password}`;
<<<<<<< HEAD
    console.log(url);

    fetch(url)
    //   .then(res => console.log(res))
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (data.valid){
            dispatch(setIsLoggedIn(true));
        }
      })
      .catch(console.log);
  };
  
=======

    fetch(url)
      //.then(res => console.log(res))
      .then(res => res.json())
      .then(data => {
        console.log(data);

        if (data.valid) {
          dispatch(setEmail(data.email));
          dispatch(setRole(data.role));
          dispatch(setIsLoggedIn(true));
        }
      })
      .catch(console.log);
};

export const register = () => (dispatch, getState) => {
  const url = `http://localhost:4000/api/register`;

  fetch(url, {
    method: "POST",
    headers: {
    "Content-type": "application/json",
    },
    body: JSON.stringify({
      user: getState().userReducer.user,
      password: getState().userReducer.password,
      email: getState().userReducer.email,
      role: getState().userReducer.role
    })
  })//.then(res => console.log(res))
  .then(res => res.json())
  .then(data => {
    if (data.valid) {
      dispatch(setEmail(data.email));
      dispatch(setPassword(data.password));
      dispatch(setUser(data.user));
      dispatch(setRole(data.role));
      dispatch(setIsLoggedIn(true));
    }
  }).catch(console.log);
};
>>>>>>> 961936151dd82a393a28dde495ca7f5376271918
