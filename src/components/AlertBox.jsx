import React from 'react'
import { FaCheck } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'

export default function AlertBox({ action, actionName,setShowAlertBox,id }) {
    const handelConfirm = () => {
        if (id){
            action(id)
        }
        else{
            action()
        }
    }
    const handelCancel = () => {
        setShowAlertBox(false)
    }
    return (
        <div className='alert-box flex justify-center items-center'>
            <div className='flex flex-col items-center w-1/2 box p-20 justify-between max-sm:!w-11/12 max-sm:!right-4 max-sm:p-10 max-sm:!top-1/3'>
                <h1 className='text-xl max-sm:text-sm'> You want to confirm the {actionName}</h1>
                <div className='flex justify-around w-full mt-20'>
                    <span className='flex items-center gap-4 cancel max-sm:text-sm' onClick={handelCancel}><FaX />Cancel</span>
                    <span  className='flex items-center gap-4 confirm max-sm:text-sm' onClick={handelConfirm}><FaCheck />Confirm</span>
                </div>
            </div>
        </div>
    )
}
