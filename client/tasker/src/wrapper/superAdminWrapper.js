import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import Navbar from '../components/navbar/Navbar';

function SuperAdminWrapper() {
  const key = useSelector((state) => {
    return state.auth.adminID;
  });

  if (!key) {
    return <Navigate to={'/superadmin'} />;
  } else {
    return (
      <div>
        <Navbar />
        <Outlet />
      </div>
    );
  }
}

export default SuperAdminWrapper;
