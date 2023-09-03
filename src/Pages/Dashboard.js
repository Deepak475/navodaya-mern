// Fetch URL from server and check if user access authorization and redirect as per user
import React, { useState, useContext, useEffect } from 'react'
import AdminHome from './AdminHome/Home'
import StudentHome from './StudentHome/Home'
import { Context } from '../Context/Context'
const Dashboard = () => {
    const { user } = useContext(Context);
    return (
        <div className='dashboard-container'>
            {user.role.length > 0 && user.role.includes('admin') ? <AdminHome /> : <StudentHome />}
            <h1 className="text-center">I am dashboard</h1>
        </div>
    )
}

export default Dashboard