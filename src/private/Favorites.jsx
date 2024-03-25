import React, { useEffect, useState } from 'react';
import { Body, Col, Head, Row, Table } from '../components/Table';
import Pagination from '../components/Pagination';
import { FaEye, FaCalendar,FaTrash} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';

import AlertBox from '../components/AlertBox';
import { useToken } from '../authentication/Authentication';

export default function Favorites() {
  const token = useToken()
  const headers = {
    token: `Bearer ${token}`
  };
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9); // Number of rows per page
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const [showAlertBoxForTable, setShowAlertBoxForTable] = useState(false);
  const [rowId, setRowId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Old'); // Default filter

  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        token: `Bearer ${token}`
      };
      
      try {
        const response = await api.get(`favorites/all`, { headers });
        setFavorites(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [showAlertBoxForTable,token]);

  // Filtered and searched favorites
  const filteredFavorites = favorites.filter(favorite => {
    const searchLowerCase = searchTerm.toLowerCase();
    const doctorNameLowerCase = favorite.doctorName.toLowerCase();
    const addressLowerCase = favorite.doctorAddress.toLowerCase();
    const phoneLowerCase = favorite.doctorPhone.toLowerCase();

    return (
      doctorNameLowerCase.includes(searchLowerCase) ||
      addressLowerCase.includes(searchLowerCase) ||
      phoneLowerCase.includes(searchLowerCase)
    );
  });

  // Apply sorting based on selected filter
  const sortedFavorites = filteredFavorites.sort((a, b) => {
    if (selectedFilter === 'New') {
      return new Date(b.date) - new Date(a.date);
    } else if (selectedFilter === 'Name (A-Z)') {
      return a.doctorName.localeCompare(b.doctorName);
    } else if (selectedFilter === 'Name (Z-A)') {
      return b.doctorName.localeCompare(a.doctorName);
    } else {
      return new Date(a.createdAt) - new Date(b.createdAt); // Default: Old
    }
  });

  // Logic to calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedFavorites.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle Navigate
  const handleNavigate = (id) => {
    navigate(`/doctor/${id}`);
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
      await api.delete(`favorites/id/${id}`, { headers });
      setShowAlertBoxForTable(false);
    } catch (error) {
      console.error(error);
    }
  };
 
  const handleAlertBoxForTable = (id) => {
    setShowAlertBoxForTable(true);
    setRowId(id);
  }

  return (
    <div className='dashboard-element gradient flex flex-col flex-1 items-center justify-center mt-24 max-sm:m-1'>
     
      {
        !loading ?
      <>{
        favorites.length>0 ? 
        <>
        {
          showAlertBoxForTable && <AlertBox id={rowId} actionName={"Delete of Favorites id "+rowId} action={handleDelete} setShowAlertBox={setShowAlertBoxForTable} />
        }
        <div className='flex justify-between items-center w-full mx-5'>
     
  
            <h1 className='flex gap-3 items-center text-3xl p-5 my-5'><FaCalendar className='icon Calendar' />Favorites</h1>
  
         
          <form className='flex items-center justify-end w-4/6 gap-3'>
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
          <Table>
            <Head>
              <Row>
        
                  <Col className={"max-sm:text-sm"}>Doctor Name</Col>
                <Col className={"max-sm:text-sm"}>Address</Col>
                <Col className={"max-sm:text-sm"}>Phone</Col>
                <Col className={"max-sm:text-sm"}>Actions</Col>
              </Row>
            </Head>
            <Body className={"max-sm:overflow-x-auto overflow-y-hidden"}>
              {currentRows.map(row => (
                <Row key={row._id} className="row">
                    <Col className={"max-sm:text-sm"}>{row.doctorName}</Col>
                  <Col className={"max-sm:text-sm"}>{row.doctorAddress}</Col>
                  <Col className={"max-sm:text-sm"}>{row.doctorPhone}</Col>
                  <Col className={"max-sm:text-sm gap-4"} >
                    <FaTrash className='icon' onClick={() => handleAlertBoxForTable(row._id)} />
                    <FaEye className='icon' onClick={() => handleNavigate(row.doctorId)} />
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
            dataLength={setFavorites.length}
          />
        </div></>:
       <div className='h-full flex justify-center items-center'>
         <h1 className='text-xl'>No Favorites</h1>
       </div>
      }</>: <div className='input-group flex flex-col justify-center items-center my-4 loading'>
      <h1 className='my-6'>Loading</h1>
      <div className="loader max-sm:w-30px max-sm:border-4">
      </div>
    </div>
    }
    </div>
  );
}
