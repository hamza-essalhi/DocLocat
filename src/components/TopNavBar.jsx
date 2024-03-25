import React, { useState, useRef, useEffect} from 'react';
import { FaUser } from 'react-icons/fa';
import { IoLogOut, IoNotifications } from 'react-icons/io5';
import { MdDashboard } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useIsAuthenticated, useToken, useUser } from '../authentication/Authentication';
import { logout } from '../STORE/AUTH/authActions';
import { TiThMenu } from "react-icons/ti";
import { motion, AnimatePresence } from 'framer-motion';
import api from '../api/api';
import Notifications from './Notifications';
import socketIOClient from 'socket.io-client';
import { REACT_APP_API_URL } from '../api/api.config';

let socket
export default function TopNavBar({ handellOpenSideNav, openSideNav }) {
  const isAuthenticated = useIsAuthenticated();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const notificationsRef = useRef(null);
  const user = useUser();
  const token = useToken();
  const [notifications, setNotifications] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notificationCounter, setNotificationCounter] = useState(0);



  useEffect(() => {
    if (user && isAuthenticated) { // Add a null check for socket
    
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
  
  }, [token, user, notifications, isAuthenticated]);
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

    if(isAuthenticated) fetchData();
  }, [token,isAuthenticated]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [showMenu]);

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
    <nav className='top-nav px-3 flex items-center max-md:justify-between py-4 my-2 max-sm:px-3 max-sm:p-1 '>
      <Link to="/" className='!border-none'><img className=' max-sm:mt-0' src="/img/logo.png" alt="" /></Link>
      <div className="main flex justify-between w-1/3 ml-32 max-md:ml-10 max-lg:w-full max-md:hidden ">
        <span className=''>
          <Link to="/">Home</Link>
        </span>
        <span>
          <Link to="about-us">About Us</Link>
        </span>
        <span>
          <Link to="contact-us">Contact Us</Link>
        </span>
      </div>

      {isAuthenticated ? (
        <div className="main flex justify-end w-5/6 gap-5 mx-5 ">
          <div className="flex items-center gap-3">
            <div className='' ref={notificationsRef}>
              <div>
                {
                  notificationCounter>0&&<span className='notification-counter max-sm:!top-2'>{notificationCounter}</span>
                }
                <IoNotifications className='text-xl' onClick={() => setShowNotification(!showNotification)} />

              </div>

              <div>
                <div className={showNotification ? 'notification-box active w-2/5 max-lg:w-4/6 max-md:1/2 max-sm:w-11/12 max-sm:!right-0 max-sm:mx-4' : 'notification-box '}>
                  {
                    !loading && <Notifications notifications={notifications} />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="gap-5 mx-5 max-md:hidden">
            <div className='user-menu' ref={menuRef}>

              <img
                className={showMenu ? 'user active rounded-full' : 'user rounded-full'}
                src={user.profilePicture || "/img/doctor.png"}
                alt=""
                onClick={() => setShowMenu(!showMenu)}
              />

              <div className={showMenu ? 'menu active' : 'menu'}>
                <Link to="/profile" className='flex items-center justify-end gap-4 p-3' ><FaUser />My Profile</Link>
                <Link to="/Dashboard" className='flex items-center justify-end gap-4 p-3' ><MdDashboard />Dashboard</Link>
                <button className='flex items-center gap-4 p-3' onClick={handleLogout}>
                  <IoLogOut className='icon' />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="main flex justify-end w-5/6 gap-5 mx-5 max-md:hidden">
          <span className=''>
            <Link to="/login">Login</Link>
          </span>
          <span>
            <Link to="sign-up">Sign up</Link>
          </span>
        </div>
      )}

      <div className='hidden   max-md:flex menu-btn'>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            whileHover={{
              scale: 1.05,
              textShadow: '0px 0px 4px gray',
            }}
            className=' flex justify-center  my-2'
          >
            <button className='flex items-centerp-2 rounded-md  text-2xl p-1' onClick={handleOpenSideNav}> <TiThMenu /> </button>
          </motion.div>
        </AnimatePresence>

      </div>
    </nav>
  );
}
