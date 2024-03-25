// store.js


import authReducer from './AUTH/authReducer';

import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
    auth: authReducer,
  } 
})