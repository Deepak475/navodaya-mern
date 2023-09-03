
import React, { useState } from 'react';
import './App.css';
import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Home from './Pages/Dashboard';
import StudentList from './Pages/AdminHome/StudentList';
import SubmitForm from './Pages/AdminHome/SubmitForm';
import SideNavbar from './components/SideNavbar';
import PrivateRoute from './helper/PrivateRoute';
import { Context } from './Context/Context';
import { studentLinks, adminLinks } from './Constants';

function App() {
  const [user, setUser] = useState('');
  const location = useLocation();
  return (
    <Context.Provider value={{ user, setUser }}>
      <div className='wrapper'>
        {user.isAuthenticated && (user.role.length > 0 && user.role.includes('admin') ? <SideNavbar details={adminLinks} /> : <SideNavbar details={studentLinks} />)}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={
            <PrivateRoute component={Home} />
          } />
          <Route path='/dashboard' element={
            <PrivateRoute component={Home} />
          } />
          <Route path='/studentlist' element={
            <PrivateRoute component={StudentList} />
          } />
          <Route path='/submitform' element={
            <PrivateRoute component={SubmitForm} />
          } />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
