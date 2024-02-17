import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

function UserWrapper() {
  const key = useSelector((state) => {
    return state.user.userID;
  });
  if (!key) {
    return <Navigate to={'/'} />;
  } else {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }
}

export default UserWrapper;
