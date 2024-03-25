
import React, { useState} from 'react';

import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api'; // Import your axios instance

export default function EmailVerification() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [email, setEmail] = useState("")
  


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const response = await api.post('auth/send-email-verification', { email: email });
      setSuccess(response.data.message);
      setIsSubmitting(false)
    } catch (e) {
      setIsSubmitting(false);
     if (e.response) {
        setError(e.response.data.error);
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
          <h1 className='my-10 max-sm:text-lg'>Find Your Account</h1>
          <div className="input-group flex items-center my-5">
            <label className=' max-sm:text-sm' htmlFor="Email">Email</label>
            <div className="input-sub-group flex items-center gap-2">
              <input type="email" name="email" onChange={(e) => setEmail(e.target.value)}
                placeholder="exemple@mail.com"
                required
                id="email"

                className={error ? 'error max-sm:!text-sm' : 'max-sm:!text-sm'} />
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
                  {success}
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
                <button className='max-sm:text-sm w-1/3'>Send Email Verification</button>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
