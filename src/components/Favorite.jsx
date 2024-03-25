import React, { useEffect, useState } from 'react'
import { FaHeart } from 'react-icons/fa'
import { Body, Col, Head, Row, Table } from './Table';

import api from '../api/api';
import { useToken } from '../authentication/Authentication';


export default function Favorite() {
  const token = useToken()
  
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const headers = {
      token: `Bearer ${token}`
    };
    const fetchData = async () => {
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
  }, [token]);

  // Show only 5 appointments
  const limitedafavorites = favorites.slice(0, 5);
  // Change page

  return (
    <div className='dashboard-element gradient flex flex-col justify-center flex-1 items-center '>
      {
        !loading ? (
          favorites.length > 0 ?
            <>
              <div className='flex justify-between items-center w-full mx-5 '>
                <h1 className='flex gap-3 items-center text-3xl p-5 my-5 max-sm:text-lg'><FaHeart className='icon heart' />Favorites</h1>

              </div>

              <div className='w-full mt-10'>
                <Table>
                  <Head>
                    <Row>
                      <Col className={"max-sm:text-sm"}>Doctor Name</Col>
                      <Col className={"max-sm:text-sm"}>Phone</Col>
                      <Col className={"max-sm:text-sm"}>Address</Col>
                    </Row>
                  </Head>
                  <Body className={"max-sm:overflow-x-auto overflow-y-hidden"}>
                    {limitedafavorites.map(row => (
                      <Row key={row._id} className="row">
                        <Col className={"max-sm:text-sm"}>{row.doctorName}</Col>
                        <Col className={"max-sm:text-sm"}>{row.doctorPhone}</Col>
                        <Col className={"max-sm:text-sm"}>{row.doctorAddress}</Col>
                      </Row>
                    ))}

                  </Body>
                </Table>
                <div>

                </div>

              </div>
            </>
            : <div className='h-full flex justify-center items-center'>
              <h1 className='text-xl'>No Favorites</h1></div>) 
              :  <div className='input-group flex flex-col justify-center items-center my-4 loading'>
              <h1 className='my-6'>Loading</h1>
              <div className="loader max-sm:w-30px max-sm:border-4">
              </div>
            </div>}
    </div>

  )
}
