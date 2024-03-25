// authActions.js

export const loginSuccess = (token, user) => ({
    type: 'LOGIN_SUCCESS',
    payload: { token, user },
  });
  
  export const loginFailure = (error) => ({
    type: 'LOGIN_FAILURE',
    payload: { error },
  });
  
  export const logout = () => ({
    type: 'LOGOUT',
  });
  
  export const tokenExpired = () => ({
    type: 'TOKEN_EXPIRED',
  });

  export const updateUserSuccess = (user) => ({
    type: 'UPDATE_USER_SUCCESS',
    payload: {
      user,
    },
  });
  