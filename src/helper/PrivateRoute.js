import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from '../Context/Context'

const PrivateRoute = ({ component: Component }) => {
    // to use Context or Consume
    const { user } = useContext(Context);
    console.log("from private route : ", user)
    // let auth = localStorage.getItem('authenticated')
    // let token = localStorage.getItem('token')
    return (
        user.isAuthenticated && user.token !== null ? <Component /> : <Navigate to='/login' />
    )
}

export default PrivateRoute