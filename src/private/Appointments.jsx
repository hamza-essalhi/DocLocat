import React, { useEffect, useState } from 'react'
import { Body, Col, Head, Row, Table } from '../components/Table';
import Pagination from '../components/Pagination';
import { FaEye, FaCalendar,  FaTrash } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { useToken, useUser } from '../authentication/Authentication';
import { FormattedDate } from '../components/FormattedDate';
import AlertBox from '../components/AlertBox';
import { REACT_APP_API_URL } from '../api/api.config';
import socketIOClient from 'socket.io-client';

let socket
export default function Appointments() {
  const token = useToken()
  const headers = {
    token: `Bearer ${token}`
  };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9); // Number of rows per page
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();
  
  const [showAlertBoxForTable,setShowAlertBoxForTable]= useState(false)
  const [rowId,setRowId]=useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Old'); // Default filter


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

      // Check if the appointment already exists in the list
      const existingIndex = appointments.findIndex(
          (existingAppointment) => existingAppointment._id === newAppointment._id
      );

      if (existingIndex !== -1) {
          // Replace the existing appointment with the new one
          const updatedAppointments = [...appointments];
          updatedAppointments[existingIndex] = newAppointment;
          setAppointments(updatedAppointments);
      } else {
          // Add the new appointment to the list
          setAppointments((prevAppointments) => [newAppointment,...prevAppointments, ]);
      }
  });
    socket.on("disconnect", () => {
        console.log("Disconnected from Socket.IO server");
    });

    return () => {
        socket.disconnect();
    };
}, [token, user._id,appointments]); // Make sure to include user._id in the dependency array





  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        token: `Bearer ${token}`
      };
      try {
        const response = await api.get(`appointments/all`, { headers });
        setAppointments(response.data);
        setLoading(false);
      } catch (error) {
        if(error.response.data.message ==="No appointments found for this user") setAppointments([])
        setLoading(false);
      }
    };

    fetchData();
  }, [showAlertBoxForTable,token]);

  // Filtered and searched appointments
// Filtered and searched appointments
const filteredAppointments = appointments.filter((appointment) => {
  const searchLowerCase = searchTerm.toLowerCase();

  // Check if any parameter matches the search term
  return (
    appointment.date.toLowerCase().includes(searchLowerCase) ||
    appointment.hour.toLowerCase().includes(searchLowerCase) ||
    appointment.userName.toLowerCase().includes(searchLowerCase) ||
    appointment.doctorName.toLowerCase().includes(searchLowerCase)
  );
});


  // Apply sorting based on selected filter
  const sortedAppointments = filteredAppointments.sort((a, b) => {
    if (selectedFilter === 'New') {
      return new Date(b.date) - new Date(a.date);
    } else if (selectedFilter === 'Name (A-Z)') {
      return a.userName.localeCompare(b.userName);
    } else if (selectedFilter === 'Name (Z-A)') {
      return b.userName.localeCompare(a.userName);
    } else {
      return new Date(a.date) - new Date(b.date); // Default: Old
    }
  });

  // Logic to calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedAppointments.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  
  // Handle Navigate
  const handleNavigate = (id) => {
    navigate(`/appointment/${id}`);
  };

  // Handle Search Input Change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle Filter Change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const handleDelete = async (id) => {
    
    try {
       const res=await api.delete(`appointments/id/${id}`, { headers });
      const notificationRes =await api.post('/notifications/add', {
        userId: res.data.userId,
        message: `Appointment for Doctor ${res.data.doctorName}` , type: "deleted",
        appointmentId:res.data._id
    }, { headers });
    
      socket.emit('new appointment', res.data,notificationRes.data);
      setShowAlertBoxForTable(false)
    }
    catch (error) {

    }
  }
 
  const handleAlertBoxForTable = (id) => {
    setShowAlertBoxForTable(true)
    setRowId(id)
  
  }

  return (
    <div className='dashboard-element gradient flex flex-col flex-1 items-center justify-center mt-24 max-sm:mt-1'>
     
      {
        !loading ? <>
        {
        appointments.length>0 ? 
        <>
        {
          showAlertBoxForTable && <AlertBox id={rowId} actionName={"deletion of appointment "+rowId} action={handleDelete} setShowAlertBox={setShowAlertBoxForTable} />
        }
        <div className='flex justify-between items-center w-full mx-5 max-md:flex-col'>
     
  
            <h1 className='flex gap-3 items-center text-3xl p-5 my-5 max-md:w-full max-md:justify-start max-sm:text-lg'><FaCalendar className='icon Calendar' />Appointments</h1>
  
         
          <form className='flex items-center justify-end w-4/6 gap-3 max-md:w-full'>
            <div className="input-group w-full">
              <input
                type="text"
                placeholder='Search...'
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            <div className="input-group w-2/6">
              <select value={selectedFilter} onChange={handleFilterChange}>
                <option value="Old">Old</option>
                <option value="New">New</option>
                <option value="Name (A-Z)">Name (A-Z)</option>
                <option value="Name (Z-A)">Name (Z-A)</option>
              </select>
            </div>
  
          </form>
        </div>
  
        <div className='w-full mt-10'>
          <Table >
            <Head>
              <Row>
                {user.role === "doctor" ?
                  <Col className={"max-sm:text-sm"}>Client Name</Col> :
                  <Col className={"max-sm:text-sm"}>Doctor Name</Col>
                }
                <Col className={"max-sm:text-sm"}>Date</Col>
                <Col className={"max-sm:text-sm"}>Hour</Col>
                <Col className={"max-sm:text-sm"}>Status</Col>
                <Col className={"max-sm:text-sm"}>Actions</Col>
              </Row>
            </Head>
            <Body className={"max-sm:overflow-x-auto overflow-y-hidden"}>
              {currentRows.map(row => (
                <Row key={row._id} className="row">
                  {user.role === "doctor" ?
                    <Col className={"max-sm:text-sm"}>{row.userName}</Col> :
                    <Col className={"max-sm:text-sm"}>{row.doctorName}</Col>
                  }
                  <Col className={"max-sm:text-sm"}><FormattedDate dateString={row.date} /></Col>
                  <Col className={"max-sm:text-sm"}>{row.hour}</Col>
                  <Col className={"max-sm:text-sm"}><span className={`${row.status} w-max`}>{row.status}</span></Col>
                  <Col className={"max-sm:text-sm gap-4"}>
                    <FaTrash className='icon' onClick={() => handleAlertBoxForTable(row._id)} />
                    <FaEye className='icon' onClick={() => handleNavigate(row._id)} />
                  </Col>
                </Row>
              ))}
  
            </Body>
          </Table>
  
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            paginate={paginate}
            dataLength={sortedAppointments.length}
          />
        </div></>:
       <div className='h-full flex justify-center items-center'>
         <h1 className='text-xl'>No Appointments</h1>
       </div>
      }
        </>: <div className='input-group flex flex-col justify-center items-center my-4 loading'>
            <h1 className='my-6'>Loading</h1><div className="loader max-sm:w-30px max-sm:border-4">
              </div></div>
      }
    </div>
  );
}
