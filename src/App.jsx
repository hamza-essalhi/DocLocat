// Importing necessary styles and React Router components
import './style/App.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import React, { useEffect } from 'react';
import { useIsAuthenticated } from './authentication/Authentication';
import { useDispatch, useSelector } from 'react-redux';

// Importing Components
import RouteController from './RouteController'; // These is public route controller
import PrivetRoute from './PrivateRoute'; // These is private route controller
import AuthRoute from './AuthRoute'; // These is auth route controller  
import VerificationRoute from './VerificationRoute'; // These is verification route controller  
// Public routes
import Home from './public/Home'; 
import Login from './public/Login'; 
import SignUp from './public/SignUp'; 
import AboutUs from './public/AboutUs'; 
import ContactUs from './public/ContactUs'; 
import PatientPrivacyPolicy from './public/PatientPrivacyPolicy'; 
import DoctorPrivacyPolicy from './public/DoctorPrivacyPolicy'; 
import PrivacyPolicy from './public/PrivacyPolicy'; 

// Private routes
import Dashboard from './private/Dashboard'; 
import Profile from './private/Profile'; 
import Favorites from './private/Favorites'; 
import Appointments from './private/Appointments'; 
import AppointmentPage from './private/AppointmentPage'; 


import { tokenExpired } from './STORE/AUTH/authActions';
import Verification from './public/Verification';
import ResetPassword from './public/ResetPassword';
import PasswordVerification from './public/PasswordVerification';
import EmailVerification from './public/EmailVerification';
import UserProfile from './public/UserProfile';


function App() {
 // Redux setup
const dispatch=useDispatch() // Getting the dispatch function from Redux
const isAuthenticated = useIsAuthenticated(); // Checking if user is authenticated
const token = useSelector(state => state.auth.token); // Getting the authentication token from Redux state
const expirationTime = useSelector(state => state.auth.expirationTime); // Getting the token expiration time from Redux state

// Function to check if token is expired
const isTokenExpired = (exp) => {
  const currentTime = Date.now() / 1000; // Get current time in seconds
  return parseInt(currentTime) > exp; // Checking if current time is greater than token expiration time
};

// useEffect to check token expiration and dispatch action if expired
useEffect(() => {
  if (!token || !expirationTime || isTokenExpired(parseInt(expirationTime))) {
    // If token is missing, expiration time is missing, or token is expired, dispatch tokenExpired action
    dispatch(tokenExpired());
  }
}, [dispatch, isAuthenticated, token, expirationTime]); // Dependencies for useEffect

  // Creating routes for the application
  const router = createBrowserRouter(
    createRoutesFromElements(
      <React.Fragment>
        {/* Public Routes */}
        <Route
          path='/'
          element={<RouteController />}
        >
          <Route path='/' element={<Home />} /> {/* Home page */}
          <Route path='/about-us' element={<AboutUs />} /> {/* About Us page */}
          <Route path='/contact-us' element={<ContactUs />} /> {/* Contact Us page */}
          <Route path='/patient-privacy-policy' element={<PatientPrivacyPolicy />} /> {/* Patient Privacy Policy page */}
          <Route path='/doctor-privacy-policy' element={<DoctorPrivacyPolicy />} /> {/* Doctor Privacy Policy page */}
          <Route path='/privacy-policy' element={<PrivacyPolicy />} /> {/* Privacy Policy page */}
          <Route path='/doctor/:id' element={<UserProfile />} />
        
        </Route>
         {/* Verification Routes */}
         <Route
          path='/'
          element={<VerificationRoute />}
        >
        
          <Route path='/verification/:id/:token' element={<Verification />} /> {/* Verification */}
          <Route path='/recover-password' element={<PasswordVerification />} /> {/* Rest Password */}
          <Route path='/reset-password/:id/:token' element={<ResetPassword />} /> {/* Rest Password */}
          <Route path='/email-verification' element={<EmailVerification />} /> {/* Rest Password */}
        </Route>

        {/* Private Routes */}
        <Route
          path='/'
          element={<PrivetRoute />}
        >
          <Route path='/dashboard' element={<Dashboard />} /> {/* Dashboard */}
          <Route path='/profile' element={<Profile />} /> {/* Profile */}
          <Route path='/favorites' element={<Favorites />} /> {/* Favorites */}
          <Route path='/appointments' element={<Appointments />} /> {/* Appointments */}
          <Route path='/appointment/:id' element={<AppointmentPage />} /> {/* Appointment Page with ID */}
         
      
        </Route>

        {/* Auth Routes */}
        <Route
          path='/'
          element={<AuthRoute />}
        >
          <Route path='/login' element={<Login />} /> {/* Login page */}
          <Route path='/sign-up' element={<SignUp />} /> {/* Sign Up page */}
          
        </Route>

      </React.Fragment>)
  )

  return (
    <div className="App">
      {/* Providing the router to the app */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
