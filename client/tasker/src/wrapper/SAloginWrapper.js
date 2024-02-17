import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet , Navigate } from 'react-router-dom';

function SAloginWrapper() {
    const key  = useSelector((state)=>{
     return state.auth.adminID
    })
    if (!key) {
        return <Outlet />
    } 
    else{
    return <Navigate to={'/superadmin/dashboard'}/>
    }
}

export default SAloginWrapper

