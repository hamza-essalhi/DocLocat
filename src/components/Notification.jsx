import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { FaX } from 'react-icons/fa6';

export default function Notification ({ message, setMessage }) {
    const [beForClose, setBeforClose] = useState(false)
    const hideNotification = () => {
        setBeforClose(true)
        setTimeout(() => {
            setMessage(null)
        }, 300);

    }
    return (
        <div className='notification'>
            <AnimatePresence>

                <motion.div
                    className='errorBox p-5 input-group flex justify-between gap-1 items-center my-4 mx-5 message'
                    ininitial={{ x: 500, width: 0 }}
                    animate={{ x: !beForClose ? 0 : 300, width: "100%", transition: { ease: "easeIn" } }}
                    exit={{ x: 300, transition: { ease: "easeInOut" } }}
                    transition={{ ease: "easeOut",duration: 0.5, delay: 0.5}}
                >
                    <span className='max-sm:text-sm'>{message}</span>
                    <span className='max-sm:text-sm' onClick={hideNotification}><FaX /></span>
                </motion.div>

            </AnimatePresence>
        </div>
    )
}
