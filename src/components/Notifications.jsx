import React from 'react'
import NotificationBox from './NotificationBox'

export default function Notifications({notifications}) {
  return (
    <div className='row flex flex-col gap-2 '>
       {
        notifications.length === 0 ? <h1 className='text-center flex justify-center items-center'>No notifications found</h1>
        :<>
        {
            notifications.map((notification)=>(
                <NotificationBox key={notification._id} notification={notification}/>
            ))
        }
        </>
       }
    </div>
  )
}
