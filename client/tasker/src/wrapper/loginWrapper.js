import React from 'react'
import { useSelector } from 'react-redux';
import { Outlet , Navigate } from 'react-router-dom';

function LoginWrapper() {
    const key  = useSelector((state)=>{
     return state.user.userID
    })
    console.log('key ' , key);
    if (!key) {
        return <Outlet />
    } 
    else{
    return <Navigate to={'/home'}/>
    }
}

export default LoginWrapper

