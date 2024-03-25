import React from 'react'
import { useToken } from '../authentication/Authentication';
import { FaTrash } from 'react-icons/fa';
import api from '../api/api';
import { Link } from 'react-router-dom';
import { REACT_APP_API_URL } from '../api/api.config';
import socketIOClient from 'socket.io-client';
export default function NotificationBox({notification}) {
  const token = useToken()
  const headers = {
      token: `Bearer ${token}`
  }
  const handleDelete = async () => {
    const socket = socketIOClient(REACT_APP_API_URL.replace("/api/", ""), {
      withCredentials: true,
      extraHeaders: {
          Authorization: `Bearer ${token}` // Pass the token in the socket connection
      }
  });
    try {
        const res=await api.delete(`notifications/id/${notification._id}`, { headers });
        socket.emit('delete notification', res.data);
    }
    catch (error) {

    }
}


  return (
    <div className={`flex rounded-md gap-1 items-center`}>
        {
          notification.type!=="deleted" ? <span className='p-4 text-sm flex-1 max-sm:text-sm message'><Link className='max-sm:!text-sm' to={`/appointment/${notification.appointmentId}`}>{notification.message} </Link> </span>:
          <span className='p-4 text-sm flex-1 max-sm:text-sm message'>{notification.message} </span>
        }
        <span className={`p-4 ${notification.type}  text-center max-sm:text-sm status`}>{notification.type}</span>
        <span onClick={handleDelete} className='!text-red-600 p-2 text-xl mx-5 max-sm:text-sm'><FaTrash/></span>
    </div>
  )
}
