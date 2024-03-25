
import { FaCity, FaEdit, FaHistory, FaHospital, FaImage, FaInfo, FaLock, FaPhoneAlt, FaTrash, FaUser } from 'react-icons/fa'
import { FaMapLocation } from 'react-icons/fa6'
import { MdLock, MdLockClock, MdLockPerson } from "react-icons/md";

import { IoMdMail } from "react-icons/io";
import React, { useEffect, useState } from 'react'
import { Body, Col, Head, Row, Table } from '../components/Table';
import Pagination from '../components/Pagination';
import moroccanCities from '../utils/moroccanCities.json';
import categories from '../utils/categories.json';
import { useDispatch } from 'react-redux';
import { useToken, useUser } from '../authentication/Authentication';
import api from '../api/api';
import { logout, updateUserSuccess } from '../STORE/AUTH/authActions';
import { motion, AnimatePresence } from 'framer-motion';
import Notification from '../components/Notification';
import { FormattedDate } from '../components/FormattedDate';
import AlertBox from '../components/AlertBox';



export default function Profile() {
  const dispatch = useDispatch()
  const token = useToken()
  const user = useUser()
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(9); // Number of rows per page

  const [security, setSecurity] = useState(null);
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false);
  const [isSubmittingBasics, setIsSubmittingBasics] = useState(false);
  const [isSubmittingSecurity, setIsSubmittingSecurity] = useState(false);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAlertBox, setShowAlertBox] = useState(false)
  const [showAlertBoxAccount, setShowAlertBoxAccount] = useState(false)
  const [isData, setIsData] = useState(false)
  const [showImgInput, setImgInput] = useState(false)

  const [basics, setBasics] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    address: user.address || "",
    city: user.city || "",
    phone: user.phone || "",
    category: user.category || "",
    about: user.about || "",
    profilePicture: user.profilePicture || ""  // Add this line for the image property
  });

  const [imagePreview, setImagePreview] = useState(null);
  const headers = {
    token: `Bearer ${token}`
  }
  const handleImageChange = (e) => {
    e.preventDefault();

    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;

      // Create an image element
      const img = new Image();
      img.src = base64String;

      img.onload = () => {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Calculate new dimensions
        const MAX_WIDTH = 150;
        const MAX_HEIGHT = 150;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        // Set canvas dimensions to resized image dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Get base64 representation of resized image
        const resizedBase64 = canvas.toDataURL(file.type);

        setImagePreview(resizedBase64);
      };
    };

    reader.readAsDataURL(file);
  };
  useEffect(() => {
    const fetchData = async () => {
      const headers = {
        token: `Bearer ${token}`
      }
      try {
        const response = await api.get(`history/all`, { headers }); // Fetch data from your /all endpoint
        setHistory(response.data);
        if (response.data.length > 0) {
          setIsData(true)
        }
        else {
          setIsData(false)
        }
        setLoading(false);

      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);


  // Logic to calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = history.slice(indexOfFirstRow, indexOfLastRow);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const isDoctor = user.role === "doctor"
  const handleBasicsChange = (e) => {
    const { name, value } = e.target;
    setBasics((prevconsultation) => ({
      ...prevconsultation,
      [name]: value,
    }));
  };

  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurity((prevconsultation) => ({
      ...prevconsultation,
      [name]: value,
    }));
  };


  const handleBasics = async (e) => {
    setError(false);
    setSuccess(false);
    setIsSubmittingBasics(true);
    e.preventDefault();
    try {


      // If imagePreview is not null, add it to the basics
      if (imagePreview) {
        basics.profilePicture = imagePreview
        console.log(basics)
      }

      const response = await api.put(`auth/${user._id}`, basics, { headers });
      dispatch(updateUserSuccess(response.data.user));
      setSuccess("Your information has been successfully updated!");
      setIsSubmittingBasics(false);
      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } catch (e) {
      setSuccess(false);
      setError(e.response.data.error);
      setIsSubmittingBasics(false);
    }
  };

  const handleSecurity = async (e) => {
    setError(false)
    setSuccess(false)
    setIsSubmittingSecurity(true)
    e.preventDefault();
    if ((security) && security.password === security.rePassword) {
      try {


        const response = await api.put(`auth/${user._id}`, security, { headers });
        dispatch(updateUserSuccess(response.data.user));
        setSuccess("Your information has been successfully updated!");
        setSecurity(null)
        setIsSubmittingSecurity(false)
        setTimeout(() => {
          setSuccess(null);
        }, 3000);

      }
      catch (e) {
        setSuccess(false)
        setError(e.response.data.error)
        setIsSubmittingSecurity(false)

      }
    } else {
      setIsSubmittingSecurity(false)
      setError("Please Chek the passwords ")
      setSuccess(false)
    }
  }



  const clearHistory = async () => {
    try {
      await api.delete(`history/clear`, { headers });
      setHistory([])
      setShowAlertBox(false)
      setIsData(false)
    }
    catch (error) {

    }
  }
  const handleAlertBox = () => {
    setShowAlertBox(true)
  }

  const deleteMyAccount = async () => {
    try {
      await api.delete(`auth/delete`, { headers });
      setShowAlertBoxAccount(false)
      dispatch(logout());
    }
    catch (error) {

    }
  }


  return (
    <div className='flex flex-col gap-4 profile mt-24 max-sm:mt-1'>
      {
        !loading ?
          (<>
            {
              showAlertBox && <AlertBox actionName=" clearing the login history." action={clearHistory} setShowAlertBox={setShowAlertBox} />
            }
            {
              showAlertBoxAccount && <AlertBox actionName="deletion of my account." action={deleteMyAccount} setShowAlertBox={setShowAlertBoxAccount} />
            }
            <div className='flex gap-3 max-lg:flex-col '>
              <div className='dashboard-element flex flex-col flex-1 items-center '>

                <div className='flex w-full justify-end my-4'>
                  <span onClick={() => setShowAlertBoxAccount(true)} className='flex items-center gap-4 max-sm:!text-sm'><FaTrash className='text-red-500' />Delete My Account</span>
                </div>
                <form className='w-full flex flex-col justify-center items-center' onSubmit={handleBasics}>
                  <div className='flex justify-between items-center w-full mx-5 '>
                    <h1 className='flex gap-3 items-center text-3xl max-sm:!text-lg  my-5'><FaUser />Basic Information</h1>
                  </div>

                  <div>
                    <span onClick={() => setImgInput(!showImgInput)} className='edite'><FaEdit /></span>
                    <img className='my-5 w-20 h-20 mt-16 rounded-full' src={user.profilePicture || "/img/doctor.png"} alt="" />

                  </div>

                  <div className='flex flex-col gap-4 my-5 w-11/12'>
                    {
                      showImgInput && <div className='flex items-center gap-4 input-group'><FaImage /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>Profile Image</span><input className='max-sm:text-sm'
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}

                      />
                      </div>

                    }

                    <div className='flex items-center gap-4 input-group'><FaUser /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>First Name</span><input className='max-sm:text-sm' type="text" name='firstName' defaultValue={user.firstName} onChange={handleBasicsChange} /></div>
                    <div className='flex items-center gap-4 input-group'><FaUser /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>Last Name</span><input className='max-sm:text-sm' type="text" name='lastName' defaultValue={user.lastName} onChange={handleBasicsChange} /></div>
                    <div className='flex items-center gap-4 input-group'><FaMapLocation /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>Address</span><input className='max-sm:text-sm' type="text" name="address" defaultValue={user.address} onChange={handleBasicsChange} /></div>
                    <div className="input-group gap-4 flex items-center w-full">
                      <FaCity /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>City</span>
                      <select name="city" id="citySelect" onChange={handleBasicsChange} className='max-sm:text-sm'>
                        <option defaultValue={user.city} value="">{user.city || "Select City"}</option>
                        {moroccanCities.PopularMoroccanCities.map((city, i) => (
                          <option key={i} value={city} className='max-sm:text-sm'>{city}</option>
                        ))}
                      </select>
                    </div>

                    <div className='flex items-center gap-4 input-group'><FaPhoneAlt /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>Phone</span><input className='max-sm:text-sm' type="text" name='phone' defaultValue={user.phone} onChange={handleBasicsChange} /></div>
                    {
                      isDoctor && <>
                        <div className="input-group gap-4 flex items-center w-full">
                          <FaHospital /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>Categorie</span>
                          <select name="category" id="category" onChange={handleBasicsChange}  >
                            <option value="" defaultValue={user.categorie}>{user.category || "Select Category"}</option>
                            {categories.categories.map((categorie, i) => (
                              <option key={i} value={categorie}>{categorie}</option>
                            ))}
                          </select>
                        </div>
                        <div className='flex  gap-4 input-group'><FaInfo /><span className='w-2/12 max-sm:text-sm max-sm:w-4/12'>About Me</span><textarea rows={15} type="text" name='about' defaultValue={user.about} onChange={handleBasicsChange} /></div>
                      </>}
                    <AnimatePresence>
                      {isSubmittingBasics ? (
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
                          className='input-group flex justify-center my-4 max-sm:text-sm'
                        >
                          <button>Edite</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </form>
              </div>

              <div className='dashboard-element flex flex-col flex-1 items-center '>

                <form className='w-full flex flex-col justify-center items-center' onSubmit={handleSecurity}>

                  <div className='flex justify-between items-center w-full mx-5 '>
                    <h1 className='flex gap-3 items-center text-3xl  my-5 max-sm:!text-lg'><FaLock />Security</h1>
                  </div>
                  <div className='flex flex-col gap-4 my-5 w-11/12 items-end mt-32 h-full'>
                    <div className='flex items-center gap-4 input-group'><IoMdMail /><span className='w-5/12 max-sm:text-sm'>Email</span><input className='max-sm:text-sm' type="email" defaultValue={user.email} name='email' onChange={handleSecurityChange} /></div>
                    <div className='flex items-center gap-4 input-group'><MdLockClock /><span className='w-5/12 max-sm:text-sm'>Old Password</span><input className='max-sm:text-sm' type="password" name='oldPassword' placeholder='*******' onChange={handleSecurityChange} /></div>
                    <div className='flex items-center gap-4 input-group'><MdLock /><span className='w-5/12 max-sm:text-sm'>New Password</span><input className='max-sm:text-sm' type="password" name='password' placeholder='*******' onChange={handleSecurityChange} /></div>
                    <div className='flex items-center gap-4 input-group'><MdLockPerson /><span className='w-5/12 max-sm:text-sm'>Confirm Password</span><input className='max-sm:text-sm' type="password" name="rePassword" placeholder='*******' onChange={handleSecurityChange} /></div>
                    <AnimatePresence>
                      {isSubmittingSecurity ? (
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
                          className='input-group flex justify-center my-4 max-sm:text-sm'
                        >
                          <button>Edite</button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          className='flex items-center gap-4 input-group py-5 justify-center max-sm:text-sm'
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1, transition: { duration: 0.3 } }}
                          exit={{ opacity: 0, transition: { duration: 0.3 } }}
                        >
                          <span className='error max-sm:text-sm'>{error}</span>
                        </motion.div>
                      )}


                      {success && (
                        <Notification message={success} setMessage={setSuccess} />
                      )}
                    </AnimatePresence>
                  </div>

                </form>


              </div>
            </div>
            <div className='flex gap-3 '>


              <div className='dashboard-element  gradient flex-1'>

                {
                  isData ?
                    <>
                      <div className='flex justify-between items-center'>
                        <h1 className='flex gap-3 items-center text-3xl p-5 my-5 max-sm:!text-lg'><FaHistory className='icon' />Login History</h1>
                        <span className='flex gap-3 items-center text-xl p-5 my-5 max-sm:!text-lg' onClick={handleAlertBox}><FaTrash className='icon' />Cleare</span>
                      </div>
                      <div className='w-full mt-10 '>
                        <Table>
                          <Head>
                            <Row>
                              <Col className="max-sm:text-sm">Ip Address</Col>
                              <Col className="max-sm:text-sm">Location</Col>
                              <Col className="max-sm:text-sm">Date</Col>
                            </Row>
                          </Head>
                          <Body>
                            {currentRows.map(row => (
                              <Row key={row._id} className="row">
                                <Col className="max-sm:text-sm">{row.ipAddress}</Col>
                                <Col className="max-sm:text-sm">{row.location}</Col>
                                <Col className="max-sm:text-sm"><FormattedDate dateString={row.createdAt} /></Col>
                              </Row>
                            ))}

                          </Body>
                        </Table>
                        <div>

                        </div>

                        {/* Pagination */}
                        <Pagination
                          currentPage={currentPage}
                          rowsPerPage={rowsPerPage}
                          paginate={paginate}
                          dataLength={history.length}
                        />
                      </div>
                    </> : <div className='h-full flex justify-center items-center'>
                      <h1 className='flex gap-3 items-center text-3xl p-5 my-5 max-sm:!text-lg'><FaHistory className='icon' />no login history found</h1>
                    </div>
                }

              </div>
            </div>
          </>
          ) :
          <div className='input-group flex flex-col justify-center items-center my-4 loading'>
            <h1 className='my-6'>Loading</h1>
            <div className="loader max-sm:w-30px max-sm:border-4">
            </div>
          </div>
      }

    </div>
  )
}
