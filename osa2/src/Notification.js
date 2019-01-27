import React from 'react'

const Notification = ({notification, success}) => {

    if (notification !== null && success) {
        return(
            <div className="success">
                {notification}
            </div>
        )
    } else if (notification !== null && !success) {
        return(
            <div className='error_notification'>
                {notification}
            </div>
        )
    } else {
        return null
    }
}

export default Notification