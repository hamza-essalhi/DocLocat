import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaCalendarCheck, FaClock, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import { FaKitMedical, FaMessage, FaPhone } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import Map from '../components/doctorPage/Map';
import api from '../api/api';
import { useIsAuthenticated, useToken, useUser } from '../authentication/Authentication';
import socketIOClient from 'socket.io-client';
import { REACT_APP_API_URL } from '../api/api.config';
import { FormattedDate } from '../components/FormattedDate';


export default function UserProfile() {
    const token = useToken() // Assuming 'auth' is your authentication slice
    const isAuthenticated = useIsAuthenticated();
    const { id } = useParams();
    const navigate=useNavigate()
    const [doctor, setDoctor] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmittingFav, setIsSubmittingFav] = useState(false);
    const [favorite, setFavorite] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [errorFav, setErrorFav] = useState(null);
    const user = useUser()
    const headers = {
        token: `Bearer ${token}`
    }


    useEffect(() => {
        if (user && isAuthenticated) {
            const socket = socketIOClient(REACT_APP_API_URL.replace("/api/", ""), {
                withCredentials: true,
                extraHeaders: {
                    Authorization: `Bearer ${token}` // Pass the token in the socket connection
                }
            });

            socket.on("connect", () => {
                console.log("Connected to Socket.IO server");
            });

            // Listen for "new appointment" event from server
            socket.on("get appointment", (appointment) => {
                console.log("Received new appointment from server:", appointment);
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from Socket.IO server");
            });

            return () => {
                socket.disconnect();
            };
        }
    }, [token, user, isAuthenticated]); // Make sure to include user._id in the dependency array



    useEffect(() => {
        const headers = {
            token: `Bearer ${token}`
        };
        const fetchDoctors = async () => {
            try {
                const response = await api.get(`users/user/${id}`)
               
                // Fetch data from your /all endpoint
                setDoctor(response.data);
                if (isAuthenticated) {
                    const appointmentsResponse = await api.get(`appointments/user/${response.data._id}`, { headers });
                    const favoriteResponse = await api.get(`favorites/user/${response.data._id}`, { headers });
                    setAppointment(appointmentsResponse.data)
                    setFavorite(favoriteResponse.data)
                }

                setLoading(false);
            } catch (error) {
                navigate('/')
                console.error(error);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [id, token,isAuthenticated,navigate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);

    };

    const handleTimeChange = (event) => {
        setSelectedTime(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const socket = socketIOClient(REACT_APP_API_URL.replace("/api/", ""), {
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}` // Pass the token in the socket connection
            }
        });
        setIsSubmitting(true);
        try {
            const response = await api.post('/appointments/add', {
                date: selectedDate,
                hour: selectedTime,
                doctorId: doctor._id
            }, { headers });

            const notificationRes = await api.post('/notifications/add', {
                userId: doctor._id,
                message: `You have a new appointment from Client ${response.data.doctorName}`,
                type: "pending",
                appointmentId: response.data._id
            }, { headers });

            socket.emit('new appointment', response.data, notificationRes.data);
            // Emit new notification here
            setIsSubmitting(false);
            setAppointment(response.data)

        } catch (e) {
            setIsSubmitting(false);
            if (e.response) setError(e.response.data.error);
            else setError("Error");
        } finally {
            socket.disconnect(); // Disconnect the socket after emitting the event
        }
    };
    const handelFavorite = async (event) => {
        event.preventDefault();
        setIsSubmittingFav(true);
        const form = {
            doctorId: doctor._id,
            doctorName: doctor.firstName + " " + doctor.lastName,
            doctorAddress: doctor.address,
            doctorPhone: doctor.phone,
        }
        try {
            const res = await api.post('/favorites/add', form, { headers });
            setFavorite(res.data)
            setIsSubmittingFav(false);
        }
        catch (e) {
            setErrorFav("You cant add this docotor to your favorites")
            setIsSubmittingFav(false);
        }

    };
    return (
        <div className='doctor-profile'>

            {

                !loading ?
                    <>
                        <header className="header-bg max-lg:!shadow-none flex flex-col justify-end items-center ">
                            <div className='flex flex-col items-center header-content'>
                                <img className='w-40 h-40 rounded-full ' src={doctor.profilePicture || "/img/doctor.png"} alt="" />
                                <h1 className='p-3 max-sm:!text-lg' >{doctor.firstName} {doctor.lastName}</h1>
                                <div>
                                    {
                                        isAuthenticated ? <>
                                            {
                                                user._id !== doctor._id? <>
                                                {
                                                favorite.length === 0 ?
                                                    <form

                                                        className='flex flex-col my-1 mx-1 '
                                                        onSubmit={handelFavorite}
                                                    >
                                                        <AnimatePresence>
                                                            {isSubmittingFav ? (
                                                                <div className='p-2 rounded-md flex justify-center'>
                                                                    <div className='loader max-sm:border-4'></div>
                                                                </div>
                                                            ) : (
                                                                <motion.button
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                                                    whileHover={{
                                                                        scale: 1.01,
                                                                        textShadow: '0px 0px 4px gray',
                                                                    }}
                                                                    className='p-2 rounded-md flex justify-center my-1 items-end w-full gap-3 bg-rose-700 text-white font-bold text-sm'
                                                                >
                                                                    <FaHeart className='text-xl' />Add To Favorites
                                                                </motion.button>
                                                            )}
                                                        </AnimatePresence>
                                                        <AnimatePresence>
                                                            {errorFav && (
                                                                <motion.div
                                                                    className='errorBox p-2 input-group flex justify-center my-4 bg-rose-700 rounded-md w-full '
                                                                    initial={{ opacity: 0 }}
                                                                    animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                                                    exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                                                >
                                                                    <span className='w-full'>{errorFav}</span>
                                                                </motion.div>
                                                            )}
                                                        </AnimatePresence>
                                                    </form>
                                                    :
                                                    <span className='p-2 rounded-md bg-rose-700 text-white font-bold text-sm flex justify-center items-center gap-2'><Link to={`/favorites/`}>This doctor is in your favorites</Link><FaHeart /></span>
                                            }
                                                </>:<div> <span className='p-2 rounded-md bg-rose-700 text-white font-bold text-sm flex items-center'>You can't add your self to favorites </span></div>

                                            }
                                        </> : <>
                                            <span className='p-2 rounded-md bg-rose-700 text-white font-bold text-sm'>Pleas login to add this doctor to favorites </span>
                                        </>
                                    }
                                </div>
                            </div>
                        </header>
                        <div className='flex gap-6 mt-64 mx-5 justify-center '>
                            <div className='flex w-10/12 gap-6 max-md:flex-col max-md:w-full'>
                                <div className='flex-1 flex border  border-slate-400 rounded-md p-5 doctor-info justify-center'>
                                    {
                                        isAuthenticated ?
                                            <>
                                                {
                                                    user._id !== doctor._id?
                                                    <>
                                                        {
                                                            !appointment ? <form action="" className='flex flex-col gap-3 w-10/12' onSubmit={handleSubmit}>
                                                                <h1 className='p-3 max-sm:!text-lg'>Make an appointment</h1>
                                                                <div className='input-group flex gap-2'>
                                                                    <label className='w-5/12' htmlFor="date">Select Date:</label>
                                                                    <input
                                                                        type="date"
                                                                        id="date"
                                                                        name="date"
                                                                        value={selectedDate}
                                                                        onChange={handleDateChange}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className='input-group flex gap-2'>
                                                                    <label className='w-5/12' htmlFor="time">Select Time:</label>
                                                                    <input
                                                                        type="time"
                                                                        id="time"
                                                                        name="time"
                                                                        value={selectedTime}
                                                                        onChange={handleTimeChange}
                                                                        required
                                                                    />
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
                                                                                scale: 1.01,
                                                                                textShadow: '0px 0px 4px gray',
                                                                            }}
                                                                            className='input-group flex my-4 '
                                                                        >
                                                                            <button className='!w-1/2 '>Add</button>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                                <AnimatePresence>
                                                                    {error && (
                                                                        <motion.div
                                                                            className='errorBox p-2 input-group flex justify-center my-4 mx-10 w-ful'
                                                                            initial={{ opacity: 0 }}
                                                                            animate={{ opacity: 1, transition: { duration: 0.3 } }}
                                                                            exit={{ opacity: 0, transition: { duration: 0.3 } }}
                                                                        >
                                                                            <span>{error}</span>
                                                                        </motion.div>
                                                                    )}
                                                                </AnimatePresence>
                                                            </form> :
                                                                <div className='flex flex-col gap-5'>
                                                                    <span className='flex justify-end items-center p-2 rounded-md bg-rose-700 text-white font-bold text-sm gap-3'><Link to={`/appointments/`}>You have an appointment whit this doctor</Link><FaCalendarCheck /> </span>
                                                                    <span className=' max-sm:text-sm flex items-center gap-4 mt-10'><FaCalendarCheck className='text-red-700'/>Appointment Date :<FormattedDate dateString={appointment.date} /></span>
                                                                    <span className=' max-sm:text-sm flex items-center gap-4'><FaClock className='text-red-700' />Appointment Hour : {appointment.hour}</span>
                                                                </div>
                                                        }
                                                    </>:<>
                                                    <div> <span className='p-2 rounded-md bg-rose-700 text-white font-bold text-sm flex items-center'>You can't make an appointment for your self! </span></div>
                                                    </>

                                                }
                                            </> :<div> <span className='p-2 rounded-md bg-rose-700 text-white font-bold text-sm flex items-center'>Pleas Login To Make An Appointment </span></div>


                                    }
                                </div>
                                <div className='doctor-info  flex flex-col gap-3 border border-slate-400 rounded-md p-5 justify-center'>
                                    <div className='flex gap-3 text-xl items-center'>
                                        <span className='flex gap-2 items-center max-sm:text-sm text-red-700'><FaMessage /></span>
                                        <span className='max-sm:text-sm'>{doctor.email} </span>
                                    </div>
                                    <div className='flex gap-2 text-xl items-center'>
                                        <span className='flex gap-2 items-center max-sm:text-sm text-red-700'><FaPhone /></span>
                                        <span className='max-sm:text-sm'>{doctor.phone} </span>
                                    </div>
                                    <div className='flex gap-2 text-xl items-center'>
                                        <span className='flex gap-2 items-center max-sm:text-sm text-red-700'><FaMapMarkerAlt /></span>
                                        <span className='max-sm:text-sm'>{doctor.address}</span>
                                    </div>
                                    <div className='flex gap-2 text-xl items-center'>
                                        <span className='flex gap-2 items-center max-sm:text-sm text-red-700'><FaKitMedical /></span>
                                        <span className='max-sm:text-sm'>{doctor.category}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex gap-2 mt-10 justify-center'>
                            <div className='content my-10  mx-10 w-10/12 max-md:!w-full max-md:mx-2'>
                                <div>
                                    <h1 className='p-3 max-sm:!text-lg text-xl' >About</h1>
                                    <div className='flex justify-center '>
                                        <p className='my-10 p-5 max-md:w-full max-md:p-1'>
                                            {doctor.about}
                                        </p>
                                    </div>
                                    <h1 className='p-3 max-sm:!text-lg text-xl' >Clinical areas of focus</h1>
                                    <p className='my-10 p-5 max-md:w-full max-md:p-1'>
                                        {doctor.category}
                                    </p>
                                </div>
                                <div>
                                    <div className='flex items-center justify-between my-10'>
                                        <h1 className='p-3 max-sm:!text-lg text-xl' >Location</h1>
                                        <span className='text-xl max-md:text-sm'>{doctor.address}</span>
                                    </div>
                                    <Map address={doctor.address} />
                                </div>
                            </div>
                        </div>
                    </> : <div className='input-group flex flex-col justify-center items-center my-4 loading'>
                        <h1 className='my-6'>Loading</h1>
                        <div className="loader max-sm:w-30px max-sm:border-4">
                        </div>
                    </div>
            }
        </div>
    );
}
