import React, { useEffect, useRef, useState } from 'react'

import { Link, useLocation } from 'react-router-dom'
import { useToken, useUser } from '../../authentication/Authentication'
import { motion, AnimatePresence } from 'framer-motion';
import { TiThMenu } from 'react-icons/ti';

import { IoNotifications } from 'react-icons/io5';
import api from '../../api/api';
import Notifications from '../Notifications';
import socketIOClient from 'socket.io-client';
import { REACT_APP_API_URL } from '../../api/api.config';

let socket
export default function DashboardNav({ handellOpenSideNav, openSideNav }) {
  const notificationsRef = useRef(null)
  const user = useUser()
  const token = useToken()
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false)
  const [loading, setLoading] = useState(true);
  const [notificationCounter, setNotificationCounter] = useState(0)
  const location = useLocation();
  const currentPathname = location.pathname;

 useEffect(() => {
    if (user) { // Add a null check for socket
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

      socket.on("get notification", (notification) => {
        if (user._id === notification.userId) {
          setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      }
      
      });

      socket.on("get deleted notification", (notification) => {
        const updatedNotifications = notifications.filter(
          (oldnotification) => oldnotification._id !== notification._id
        );
        setNotifications(updatedNotifications);
        console.log("Received new get notification from server:", notification);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      return () => {
        socket.disconnect();
      };
    }

  }, [token, user, notifications,currentPathname]);


  useEffect(() => {
    setNotificationCounter(notifications.length);
  }, [notifications]);

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        token: `Bearer ${token}`
      };
      try {
        const response = await api.get(`notifications/all`, { headers });
        setNotifications(response.data);
        setNotificationCounter(response.data.length);
        setLoading(false);
      } catch (error) {
        if (error.response.data.message === "No appointments found for this user") setNotifications([]);
        setLoading(false);
      }
    };

    fetchData();
  }, [token,currentPathname]);


  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotification(false);
      }
    };

    if (showNotification) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showNotification]);

  const handleOpenSideNav = () => {
    handellOpenSideNav(openSideNav);
  };
  return (
    <nav className='dashboard-nav flex items-center'>
      <div className="w-10/12 max-lg:w-9/12 flex items-center justify-between max-sm:w-full">
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            whileHover={{
              scale: 1.05,
              textShadow: '0px 0px 4px gray',
            }}
            className='hidden max-sm:flex  justify-center my-4 mr-3'
          >
            <button className='flex items-centerp-2 rounded-md bg-white text-blue-950 text-2xl p-1' onClick={handleOpenSideNav}> <TiThMenu /> </button>
          </motion.div>
        </AnimatePresence>
        <span className=''>
          Welcome {user.firstName} {user.lastName}
        </span>
        <div className="flex items-center gap-3">

          <div className='' ref={notificationsRef}>
            <div>
              {
                notificationCounter > 0 && <span className='notification-counter max-sm:!top-8'>{notificationCounter}</span>
              }
              <IoNotifications className='text-xl' onClick={() => setShowNotification(!showNotification)} />

            </div>

            <div>
              <div className={showNotification ? 'notification-box active w-2/5 max-lg:w-4/6 max-md:1/2 max-sm:w-11/12 max-sm:!right-0 max-sm:mx-4 max-sm:mt-3' : 'notification-box'}>
                {
                  !loading && <Notifications notifications={notifications} />
                }
              </div>
            </div>
          </div>

        </div>
        <div className='flex items-center gap-10 ml-10'>
          <Link to="/profile" className='flex items-center justify-end gap-4' >
            <img src={user.profilePicture || "/img/doctor.png"} alt="" className=' rounded-full' />
          </Link>
        </div>
      </div>
    </nav>
  )
}
