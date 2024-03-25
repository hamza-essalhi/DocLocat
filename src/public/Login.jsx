
import React, { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/api';
import { loginSuccess, loginFailure } from '../STORE/AUTH/authActions'; // Replace with the actual path
import { AnimatePresence, motion } from 'framer-motion';

export default function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector((state) => state.auth.error);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        remember: false,
    });
    const [showPassword, setShowPassword] = useState(false)
    const [emailVerification, setEmailVerification] = useState(false)
    const showPasswordHandeller = () => {
        setShowPassword(!showPassword)
    }
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData((prevData) => ({
            ...prevData,
            [name]: inputValue,
        }));
        dispatch(loginFailure(false));
    };

    const handleFormSubmit = async (e) => {
        // Prevent the default form submission behavior
        e.preventDefault();
        setEmailVerification(false)
        setIsSubmitting(false)
        dispatch(loginFailure(false))
        // Check if email and password fields are not empty
        if (!formData.email || !formData.password) {
            // Dispatch an action indicating that email or password is empty
            dispatch(loginFailure("Veuillez saisir votre adresse e-mail et votre mot de passe."));
            return; // Exit the function
        }

        try {
            setIsSubmitting(true)
            const response = await api.post('auth/login', formData);

            // Extract the token from the response
            const token = response.data.token;

            // Dispatch the login success action with token and user data
            dispatch(loginSuccess(token, response.data.user));

            // Redirect the user to the home page


            navigate("/");

            // Clear the form data after successful login
            setFormData({
                email: '',
                password: '',
                remember: false,
            });
            setIsSubmitting(false)
        } catch (e) {
            setIsSubmitting(false)
            setIsSubmitting(false);
            if (e.response && e.response.status === 429) {
                dispatch(loginFailure(
                    'You have reached the maximum number of  attempts. Please wait for 5 minutes before trying again.'
                ));
            }
             else if (e.response && e.response.data.emailVerification) {
                setEmailVerification(true)
                dispatch(loginFailure(e.response.data.error));
            }
            else {
                dispatch(loginFailure("Failed connection. Invalid credentials."));
            }

        }
        
    };
    return (
        <div className='auth flex max-sm:h-svh'>
            <div className='cover max-md:hidden'></div>
            <div className='form-row max-md:!w-full'>
                <form className='flex flex-col justify-center items-center my-5' onSubmit={handleFormSubmit} >
                    <Link to="/"><img src="/img/logo.png" alt="" /></Link>
                    <h1 className='my-20 max-sm:!text-lg'>login to your account</h1>
                    <div className="input-group flex items-center my-5">
                        <label className=' max-sm:text-sm' htmlFor="Email">Email</label>
                        <div className="input-sub-group flex items-center gap-2">
                            <input type="email" name="email" onChange={handleInputChange}
                                placeholder="exemple@mail.com"
                                required
                                id="email"
                                value={formData.email}
                                className={error ? 'error max-sm:!text-sm' : 'max-sm:!text-sm'} />
                        </div>
                    </div>
                    <div className="input-group flex items-center my-5 ">
                        <label className=' max-sm:text-sm' htmlFor="Password">Password</label>
                        <div className={error ? 'error input-sub-group flex items-center gap-2 ' : 'input-sub-group flex items-center gap-2'} >
                            <input type={!showPassword ? "password" : "text"} id="password"
                                className='max-sm:!text-sm'
                                name="password"
                                value={formData.password}
                                required
                                onChange={handleInputChange} placeholder='*******' />
                            {
                                !showPassword ? <FaEye onClick={showPasswordHandeller} className='mx-3 icon' /> : <FaEyeSlash onClick={showPasswordHandeller} className='mx-3 icon' />
                            }
                        </div>
                    </div>
                    <div className="input-group flex items-center my-5 max-sm:text-exsm">
                        <label className=' max-sm:text-sm ' htmlFor="remember">
                            Remember me
                        </label>

                        <input
                            type="checkbox"
                            id="remember"
                            name="remember"
                            checked={formData.remember}
                            onChange={handleInputChange}
                        />

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

                                    <button className='max-sm:!text-sm'>Sign In</button>

                                </motion.div>



                        }
                    </AnimatePresence>
                    <AnimatePresence>
                        {error &&
                            <motion.div
                                className="errorBox p-5 input-group flex justify-center my-4 mx-10"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                                exit={{ opacity: 0, transition: { duration: 0.3 } }} // Duration set to 0.3 seconds
                            >
                                <span className='max-sm:!text-sm'>
                                    {error}{
                                        emailVerification && <Link to="/email-verification"> Verify My Email</Link>
                                    }
                                </span>
                            </motion.div>
                        }
                    </AnimatePresence>
                    <Link to="/sign-up" className='my-3 w-10/12 max-sm:!text-sm'>Don't have an account yet? <span>Sign Up</span></Link>
                    <Link to="/recover-password" className='my-3 w-10/12 max-sm:!text-sm'><span>Forgotten password?</span></Link>
                </form>
            </div>

        </div>
    )
}
