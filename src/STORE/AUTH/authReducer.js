import { jwtDecode } from "jwt-decode";



// Initial state setup
const initialUser = JSON.parse(localStorage.getItem('user'));
const initialToken = localStorage.getItem('token');
const initialExpirationTime=localStorage.getItem('expirationTime');
const initialState = {
  user: initialUser || null,
  token: initialToken || null,
  isAuthenticated: initialToken ? true : false, // Added isAuthenticated flag
  loading: false,
  error: null,
  expirationTime:initialExpirationTime||null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      const decodedToken = jwtDecode(action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('expirationTime',decodedToken.exp );
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false,
        error: null,
        expirationTime: decodedToken.exp , // Expiration time in milliseconds
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        token: null,
        user: null,
        error: action.payload.error,
      };
    case 'LOGOUT':
      localStorage.clear();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        error: null,
        expirationTime: null,
      };
    case 'UPDATE_USER_SUCCESS':
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      return {
        ...state,
        user: action.payload.user,
      };

      
    case 'TOKEN_EXPIRED':
      localStorage.clear();
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        expirationTime: null,
      };
    default:
      return state;
  }
};

export default authReducer;