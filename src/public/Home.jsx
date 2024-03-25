import React, { useState, useEffect } from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import Doctor from '../components/Doctor';
import Header from '../components/Header';
import api from '../api/api';
import socketIOClient from 'socket.io-client';
import { REACT_APP_API_URL } from '../api/api.config';
import { useIsAuthenticated, useToken } from '../authentication/Authentication';


let socket
export default function Home() {
  const token = useToken()
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleDoctors, setVisibleDoctors] = useState(9);
  const user = useState()
  const isAuthenticated = useIsAuthenticated();

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


      socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
      });

      return () => {
        socket.disconnect();
      };
    }

  }, [token, user, isAuthenticated]);
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get('users/all'); // Fetch initial data
        setDoctors(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const handleSearch = async (searchData) => {
    try {
      const response = await api.get('users/search', {
        params: searchData,
      });
      setDoctors(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomColorClass = () => {
    const randomClass = `color-${Math.floor(Math.random() * 6) + 1}`;
    return randomClass;
  };

  const handleLoadMore = () => {
    setVisibleDoctors(prev => prev + 10);
  };

  return (
    <div>

      <header className="header-bg"><Header onSearch={handleSearch} /></header>
      {
        !loading ? <div className='home my-10 mx-10'>
          <div className="title flex items-center justify-between">
            <div className='flex items-center gap-3'>
              <FaUserDoctor className='text-2xl icon  max-sm:text-xl' />
              <h1 className=' max-sm:!text-xl'>Doctors({doctors.length})</h1>
            </div>
          </div>
          <div>
            <div className='content flex flex-wrap justify-center gap-10 my-20'>
              {doctors.slice(0, visibleDoctors).map((doctor) => (
                <Doctor key={doctor._id} doctor={doctor} color={getRandomColorClass()} />
              ))}
            </div>
            {doctors.length > visibleDoctors && (
              <div className="flex justify-center">
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded max-sm:text-md"
                  onClick={handleLoadMore}
                >
                  Load More
                </button>
              </div>
            )}
          </div>
        </div> : <div className='input-group flex flex-col justify-center items-center my-4 loading'>
          <h1 className='my-6'>Loading</h1>
          <div className="loader max-sm:w-30px max-sm:border-4">
          </div>
        </div>
      }
    </div>
  );
}
