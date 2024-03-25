import React, { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api'; // Import your axios instance

export default function Verification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [counter, setCounter] = useState(5);
  const { id, token } = useParams();
  const navigate = useNavigate();

  
  useEffect(() => {
    if(success){
      const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    }
  }, [counter,success]);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('auth/verification', { id, token });
      setSuccess(response.data.message);
      setIsSubmitting(false)
      setTimeout(() => {
        setSuccess('');
        navigate('/login'); // Redirect to login page after success
      }, 5000);

    } catch (e) {
      setIsSubmitting(false);
      if (e.response && e.response.status === 429) {
        setError(
          'You have reached the maximum number of  attempts. Please wait for 5 minutes before trying again.'
        );
      } else if (e.response) {
        setError(e.response.data.error);
        setTimeout(() => {
          navigate('/'); // Redirect to login page after success
        }, 3000);
     
      }else{
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
          <h1 className='my-10 max-sm:text-lg'>Verify Your Account</h1>
          <span className='p-5 rounded-lg bg-blue-300'>
            Please verify your email address to activate your account. The
            verification link is valid for 1 hour. Once verified, you can
            proceed to log in to your account
          </span>
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
                <button className='max-sm:text-sm w-1/3'>Verify</button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
