import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import api from '../api/api'; // Import your axios instance

export default function ResetPassword() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [counter, setCounter] = useState(5);
  const { id, token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    id: id,
    token: token,
    password: '',
    repassword: '',
  });
 
  useEffect(() => {
    if (success) {
      const timer =
        counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

      return () => {
        if (timer) {
          clearInterval(timer);
        }
      };
    }
  }, [counter, success]);
  const checkPasswordStrength = (password) => {
    // Password must be at least 6 characters long
    if (password.length < 6) {
      return 'weak';
    }

    // Add more criteria for password strength here
    // Example: Check for uppercase, lowercase, numbers, special characters, etc.

    return 'strong';
  };
  const showPasswordHandler = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');
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

    try {
      const response = await api.post('/auth/reset-password', formData);
      
      setSuccess(response.data.message);
      setIsSubmitting(false)
      setTimeout(() => {
        setSuccess('');
        navigate('/login'); // Redirect to login page after success
      }, 5000);
    } catch (e) {
      setIsSubmitting(false);
     if (e.response) {
        setError(e.response.data.error);
        
      } else {
        setError("Operation did not complete successfully")
      }
    }
  };

  return (
    <div className='auth'>
      <div className='form-row !w-full flex justify-center items-start !bg-transparent min-h-dvh '>
        <form
          className='bg-transparent flex flex-col justify-center items-center my-10 w-1/2 max-md:!w-full mx-3'
          onSubmit={handleFormSubmit}
        >
          <h1 className='my-10 max-sm:text-lg'>Change Your Password</h1>
          <span className='p-5 rounded-lg bg-blue-300'>
   Please create a new password ensuring it meets our strong password requirements.
          </span>
        
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
            {error && (
              <motion.div
                className='errorBox p-5 input-group flex justify-center my-4 w-full'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <span className='max-sm:text-sm'>{error}</span>
              </motion.div>
            )}
            {success && (
              <motion.div
                className='p-5 input-group flex justify-center my-4 bg-green-500 rounded-lg'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, transition: { duration: 0.3 } }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
              >
                <span className='max-sm:text-sm text-white'>
                  {success} You will redirect to the login page after{' '}
                  {counter} seconds
                </span>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isSubmitting && !success && !error ? (
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
                <button className='max-sm:text-sm w-1/3'>Change The Pssword</button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
