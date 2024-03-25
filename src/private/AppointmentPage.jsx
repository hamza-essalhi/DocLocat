import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaCalendar, FaCalendarCheck, FaClock, FaLink, FaPhoneAlt, FaQuestion, FaTrash, FaUser } from 'react-icons/fa'
import { FaLocationPin, FaMapLocation, FaUserDoctor } from 'react-icons/fa6'
import { IoMdMail } from "react-icons/io";
import { Link } from 'react-router-dom';
import Map from '../components/doctorPage/Map';
import api from '../api/api';
import { useToken, useUser } from '../authentication/Authentication';
import { FormattedDate } from '../components/FormattedDate';
import { motion, AnimatePresence } from 'framer-motion';
import Notification from '../components/Notification';
import AlertBox from '../components/AlertBox';
import { REACT_APP_API_URL } from '../api/api.config';
import socketIOClient from 'socket.io-client';

let socket
export default function AppointmentPage() {
    const token = useToken()
    const headers = {
        token: `Bearer ${token}`
    }
    const navigate = useNavigate()
    const { id } = useParams()
    const [doctor, setDoctor] = useState([]);
    const [form, setForm] = useState([])
    const [appointment, setAppointment] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false)
    const [showAlertBox, setShowAlertBox] = useState(false)

    const user = useUser()

    useEffect(() => {

        socket = socketIOClient(REACT_APP_API_URL.replace("/api/", ""), {
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}` // Pass the token in the socket connection
            }
        });

        socket.emit("user", user._id);

        socket.on("connect", () => {
            console.log("Connected to Socket.IO server");
        });
        socket.on("get appointment", (newAppointment) => {
            console.log("Received new appointment from server:", newAppointment);
            setAppointment(newAppointment);

        });
        
        socket.on("disconnect", () => {
            console.log("Disconnected from Socket.IO server");
        });

        return () => {
            socket.disconnect();
        };
    }, [token, user._id, appointment]);; // Make sure to include user._id in the dependency array




    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                token: `Bearer ${token}`
            }
            try {

                const response = await api.get(`appointments/id/${id}`, { headers }); // Fetch data from your /all endpoint
                setAppointment(response.data);

                const response1 = await api.get(`users/user/${response.data.doctorId}`); // Fetch data from your /all endpoint
                setDoctor(response1.data);

                setLoading(false);

            } catch (error) {
                navigate("/appointments");
            }
        };

        fetchData();
    }, [token, id, navigate]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevconsultation) => ({
            ...prevconsultation,
            [name]: value,
        }));
    };
    const handelSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const socket = socketIOClient(REACT_APP_API_URL.replace("/api/", ""), {
            withCredentials: true,
            extraHeaders: {
                Authorization: `Bearer ${token}` // Pass the token in the socket connection
            }
        });

        try {
            const response = await api.put(`/appointments/id/${appointment._id}`, form, { headers });
            const notificationRes = await api.post('/notifications/add', {
                userId: response.data.userId,
                message: `Appointment for Doctor ${response.data.doctorName}`, type: response.data.status,
                appointmentId: response.data._id
            }, { headers });

            socket.emit('new appointment', response.data, notificationRes.data);
            setAppointment(response.data)
            setIsSubmitting(false);
            setSuccess("Your information has been successfully updated!");
            setForm(null)
            setTimeout(() => {
                setSuccess(null);
            }, 3000);
        }
        catch (erro) {
            setSuccess(false)
            setIsSubmitting(false);

        }
    }
    const handleDelete = async (id) => {
        try {
            const res = await api.delete(`appointments/id/${id}`, { headers });
            const notificationRes = await api.post('/notifications/add', {
                userId: res.data.userId,
                message: `Appointment for Doctor ${res.data.doctorName}`, type: "deleted",
                appointmentId: res.data._id
            }, { headers });
            navigate('/appointments')
            socket.emit('new appointment', res.data, notificationRes.data);
            setShowAlertBox(false)
        }
        catch (error) {

        }
    }
    const handleAlertBox = () => {
        setShowAlertBox(true)
    }
    
    return (
        <div className='mt-24 max-sm:mt-1'>
            {
                showAlertBox && <AlertBox id={id} actionName={"deletion of appointment " + id} action={handleDelete} setShowAlertBox={setShowAlertBox} />
            }
            {
                !loading ? <>
                    <div className='flex gap-4 max-sm:flex-col'>

                        <div className='dashboard-element flex flex-col flex-1 items-center'>
                            <div className='flex justify-between items-center w-full mx-5 '>
                                <h1 className='flex max-sm:text-lg gap-3 items-center text-2xl  my-5'><FaCalendar />Appointment</h1>
                                <div className='flex gap-5 items-center'>


                                    <span className=' max-sm:text-sm flex gap-3 items-center'><FaTrash className='icon' onClick={handleAlertBox} /></span>

                                </div>

                            </div>

                            <div className='flex flex-col gap-8 my-5'>
                                {
                                    user.role === "doctor" ?
                                        <span className=' max-sm:text-sm flex items-center gap-4'><FaUser />Client Name :{appointment.userName}</span> :
                                        <span className=' max-sm:text-sm flex items-center gap-4'><FaUserDoctor />Doctor Name :{appointment.doctorName}</span>
                                }
                                <span className=' max-sm:text-sm flex items-center gap-4'><FaCalendarCheck />Appointment Date :<FormattedDate dateString={appointment.date} /></span>
                                <span className=' max-sm:text-sm flex items-center gap-4'><FaClock />Appointment Hour : {appointment.hour}</span>
                                {
                                    user.role === "user" ?
                                        <span className=' max-sm:text-sm flex items-center gap-4'><FaQuestion />Status : <span className={appointment.status}>{appointment.status}</span></span>
                                        :
                                        <form action="" onSubmit={handelSubmit}>
                                            <div className="input-group flex items-center gap-3">
                                                <label htmlFor="status">Status</label>
                                                <select name="status" className={appointment.status} id="" onChange={handleChange}>
                                                    {appointment.status === "pending" && (
                                                        <option value="pending" selected>Pending</option>
                                                    )}
                                                    {appointment.status === "accepted" && (
                                                        <option value="accepted" selected>Accepted</option>
                                                    )}
                                                    {appointment.status === "rejected" && (
                                                        <option value="rejected" selected>Rejected</option>
                                                    )}
                                                    {appointment.status !== "pending" && (
                                                        <option value="pending">Pending</option>
                                                    )}
                                                    {appointment.status !== "accepted" && (
                                                        <option value="accepted">Accepted</option>
                                                    )}
                                                    {appointment.status !== "rejected" && (
                                                        <option value="rejected">Rejected</option>
                                                    )}
                                                </select>

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
                                                        className='input-group flex justify-center my-4 mt-10'
                                                    >
                                                        <button className='btn max-sm:text-sm'>Edite</button>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                            <AnimatePresence>


                                                {success && (
                                                    <Notification message={success} setMessage={setSuccess} />
                                                )}
                                            </AnimatePresence>
                                        </form>
                                }
                            </div>
                        </div>
                        {
                            user.role === "user" && <div className='dashboard-element flex flex-col flex-1 items-center '>
                                <div className='flex justify-between items-center w-full mx-5 '>
                                    <h1 className='flex max-sm:text-lg gap-3 items-center text-2xl  my-5'><FaUser />Doctor</h1>
                                    <Link to={`/doctor/${doctor._id}`}><FaLink className='icon' /></Link>
                                </div>

                                <img className=' rounded-full' src={doctor.profilePicture || "/img/doctor.png"} alt="" />
                                <div className='flex flex-col gap-4 my-5'>
                                    <span className=' max-sm:text-sm flex items-center gap-4'><FaUser />{doctor.firstName} {doctor.lastName}</span>
                                    <span className=' max-sm:text-sm flex items-center gap-4'><IoMdMail />{doctor.email}</span>
                                    <span className=' max-sm:text-sm flex items-center gap-4'><FaMapLocation />{doctor.address}</span>
                                    <span className=' max-sm:text-sm flex items-center gap-4'><FaPhoneAlt />{doctor.phone}</span>
                                </div>
                            </div>
                        }

                    </div>
                    <div className='dashboard-element flex flex-col flex-1  my-10'>
                        <div className='flex items-center justify-between my-10 max-sm:flex-col max-sm:items-start max-sm:my-2'>
                            <h1 className='flex max-sm:text-lg gap-3 items-center text-2xl  my-5'><FaLocationPin />Location</h1>
                            <span className=' max-sm:text-sm text-xl'>{doctor.address}</span>
                        </div>
                        <Map address={doctor.address} />
                    </div> </> :
                    <div className='input-group flex flex-col justify-center items-center my-4 loading wo'>
                        <h1 className='my-6'>Loading</h1>
                        <div className="loader max-sm:w-30px max-sm:border-4">
                        </div>
                    </div>
            }
        </div>
    )
}
