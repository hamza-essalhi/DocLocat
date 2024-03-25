import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api';

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'user',
    password: '',
    repassword: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkPasswordStrength = (password) => {
    // Password must be at least 6 characters long
    if (password.length < 6) {
      return 'weak';
    }
  
    // Add more criteria for password strength here
    // Example: Check for uppercase, lowercase, numbers, special characters, etc.
  
    return 'strong';
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for empty fields
    for (const key in formData) {
      if (formData[key] === '') {
        setError('Please fill in all fields.');
        return;
      }
    }
  
    // Check password strength
    const passwordStrength = checkPasswordStrength(formData.password);
    if (passwordStrength === 'weak') {
      setError('Password is too weak. It should be at least 6 characters long.');
      return;
    }
  
    // Check if passwords match
    if (formData.password !== formData.repassword) {
      setError("Passwords don't match.");
      return;
    }
  
    setIsSubmitting(true);
    setError(''); // Clear any previous errors
  
    try {
      const response = await api.post('/auth/register', formData);
      setIsSubmitting(false);
      // Handle successful signup, such as redirecting to another page
      navigate("/login");
      console.log(response.data);
    } catch (error) {
      setIsSubmitting(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('An error occurred. Please try again later. Or try a new email.');
      }
    }
  };
  

  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='auth flex max-sm:h-svh'>
      <div className='cover max-md:hidden'></div>
      <div className='form-row max-md:!w-full'>
        <form className='flex flex-col justify-center items-center my-4' onSubmit={handleSubmit}>
          <Link to='/'>
            <img src='/img/logo.png' alt='' />
          </Link>
          <h1 className='my-4 max-sm:!text-lg'>Create your account</h1>
          <div className='flex gap-3 name-input-group max-md:flex-col'>
          <div className='input-group flex items-center my-4 max-md:!w-full'>
              <div className='input-sub-group flex items-center gap-2 max-md:!bg-transparent'>
                <label htmlFor='firstName' className='hidden max-md:flex max-sm:!text-sm'>First Name</label>
                <input
                
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  placeholder='First Name'
                  onChange={handleChange}
             
                  className={error ? 'error  max-md:!bg-white max-sm:!text-sm' : ' max-md:!bg-white max-sm:!text-sm'}

                />
              </div>
            </div>
            <div className='input-group flex items-center my-4 max-md:!w-full'>
              <div className='input-sub-group flex items-center gap-2  max-md:!bg-transparent'>
                <label htmlFor='lastName' className='hidden max-md:flex max-sm:!text-sm'>Last Name</label>
                <input
                 
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  placeholder='Last Name'
                  onChange={handleChange}
                  
                  className={error ? 'error max-md:!bg-white max-sm:!text-sm' : ' max-md:!bg-white max-sm:!text-sm'}

                />
              </div>
            </div>
          </div>
          <div className='input-group flex items-center my-4'>
            <label  htmlFor='email' className='max-sm:!text-sm'>Email</label>
            <div className='input-sub-group flex items-center gap-2'>
              <input
                type='email'
                name='email'
                value={formData.email}
                placeholder='user@example.com'
                onChange={handleChange}
                
                className={error ? 'error max-sm:!text-sm' : 'max-sm:!text-sm'}

              />
            </div>
          </div>
          <div className='input-group flex items-center my-4'>
            <label htmlFor='phone' className='max-sm:!text-sm'>Phone</label>
            <div className='input-sub-group flex items-center gap-2'>
              <input
                type='text'
                name='phone'
                value={formData.phone}
                placeholder='0533442277'
                onChange={handleChange}
                className={error ? 'error max-sm:!text-sm' : 'max-sm:!text-sm'}

              />
            </div>
          </div>
          <div className='input-group flex items-center my-4 '>
            <label className='max-sm:!text-sm' htmlFor='role'>Role</label>
            <div className='input-sub-group flex items-center gap-2'>
              <select
                name='role'
                value={formData.role}
                onChange={handleChange}
                className={error ? 'error max-sm:!text-sm' : 'max-sm:!text-sm'}

              >
                <option value='doctor'>A doctor</option>
                <option value='user'>A Client</option>
              </select>
            </div>
          </div>
          <div className='input-group flex items-center my-4 '>
            <label className='max-sm:!text-sm' htmlFor='password'>Password</label>
            <div className={error ? 'error input-sub-group flex items-center gap-2' : ' input-sub-group flex items-center gap-2'}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formData.password}
                placeholder='*******'
                onChange={handleChange}
                className='max-sm:!text-sm'
               

              />
              <span onClick={showPasswordHandler} className='mx-3 icon'>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
          </div>
          <div className='input-group flex items-center my-4 '>
            <label className='max-sm:!text-sm' htmlFor='repassword'>Repeat Password</label>
            <div className={error ? 'error input-sub-group flex items-center gap-2' : ' input-sub-group flex items-center gap-2'}>
              <input
                type={showPassword ? 'text' : 'password'}
                name='repassword'
                value={formData.repassword}
                placeholder='*******'
                onChange={handleChange}
                className='max-sm:!text-sm'
                

              />
              <span onClick={showPasswordHandler} className='mx-3 icon'>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
            </div>
          </div>

          <AnimatePresence>
            {isSubmitting ? (
              <div className='input-group flex justify-center my-4'>
                <div className='loader max-sm:w-30px max-sm:border-4'></div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                whileHover={{
                  scale: 1.05,
                  textShadow: '0px 0px 4px gray',
                }}
                className='input-group flex justify-center my-4'
              >
                <button className='max-sm:!text-sm'>Sign Up</button>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {error && (
              <motion.div
                className='errorBox p-5 input-group flex justify-center my-4 mx-10'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <span className='max-sm:!text-sm'>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <Link to='/login' className='my-10 w-10/12 max-sm:!text-sm'>
            Already have an account? <span>Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
}
