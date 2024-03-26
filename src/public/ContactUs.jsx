
import { useState } from 'react';
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';
import api from '../api/api';

function ContactUs() {
  const [error, setError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    message: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;


    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError(false)
  };

  const handleFormSubmit = async (e) => {
    // Prevent the default form submission behavior
    e.preventDefault();
    setIsSubmitting(false)
    setError(false)
    setIsDone(false)
    try {
      setIsSubmitting(true)
      await api.post('auth/contact-us', formData);

      setFormData({
        email: '',
        message: '',
        fullName: "",
      });
      setIsSubmitting(false)
      setIsDone(true)
      setTimeout(() => {
        setIsDone(false)
      }, 2000);
    } catch (e) {
      setIsSubmitting(false)
      setIsSubmitting(false);
      if (e.response && e.response.status === 429) {
        setError(
          'You have reached the maximum number of  attempts. Please wait for 5 minutes before trying again.'
        );
      }
      else {
        setError("Failed, Email could not be sent")
      }

    }
  }
  return (
    <div className="staff contact-us flex auth">
      <div className='cover w-8/12 max-md:hidden'></div>
      <div className='w-8/12 form-row p-4 max-md:!w-full'>/
        <h1 className=' mt-5 max-sm:!text-lg'>Contact Us</h1>
        <div className="flex flex-col gap-5 mb-5">
          <div className="flex items-center gap-3">
            <FaEnvelope className="icon" />
            <p className='max-sm:!text-sm'>Email: <a href="mailto:contact@alxwebstack.com" className='max-sm:!text-sm'>contact@doclocat.com</a></p>
          </div>
          <div className="flex items-center gap-3">
            <FaMapMarkerAlt className="icon" />
            <p className='max-sm:!text-sm'>Address: 1234 Example Street, City, State, ZIP</p>
          </div>
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="icon" />
            <p className='max-sm:!text-sm'>Phone: +1 (123) 456-7890</p>
          </div>
        </div>
        <div className="contact-form">

          <form onSubmit={handleFormSubmit} className='!w-full'>
            <h1 className=' mt-16 max-sm:!text-lg'>Send Us a Message</h1>

            <div className="input-group flex items-center my-5">
              <label className='max-sm:!text-sm' htmlFor="name">Your Name</label>
              <input className='max-sm:!text-sm' type="text" id="name" name="fullName" placeholder='Make Robert' required onChange={handleInputChange} />
            </div>
            <div className="input-group flex items-center my-5">
              <label className='max-sm:!text-sm' htmlFor="email">Your Email</label>
              <input className='max-sm:!text-sm' type="email" id="email" name="email" placeholder='name@example.com' required onChange={handleInputChange} />
            </div>
            <div className="input-group flex items-start my-5">
              <label className='max-sm:!text-sm' htmlFor="message">Message</label>
              <textarea className='h-32 max-sm:!text-sm' id="message" name="message" placeholder='message...' required onChange={handleInputChange}></textarea>
            </div>
            <AnimatePresence>

              {
                isSubmitting ?
                  <div className='input-group flex justify-center my-4'><div className="loader max-sm:w-30px max-sm:border-4"></div></div>
                  :
                  <motion.div

                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                    exit={{ opacity: 0, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                    whileHover={{
                      scale: 1.05,
                      textShadow: "0px 0px 4px gray"
                    }} className="input-group flex justify-center my-4">

                    <button className='max-sm:!text-sm'>Send</button>

                  </motion.div>



              }

              {error &&
                <motion.div
                  className="errorBox p-5 input-group flex justify-center my-4 "
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                  exit={{ opacity: 0, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                >
                  <span className='max-sm:!text-sm'>
                    {error}
                  </span>
                </motion.div>
              }
              {isDone &&
                <motion.div
                  className=" p-5 input-group flex justify-center my-4   !bg-green-500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                  exit={{ opacity: 0, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                >
                  <span className='max-sm:!text-sm'>
                    Email has been sent
                  </span>
                </motion.div>
              }
            </AnimatePresence>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
