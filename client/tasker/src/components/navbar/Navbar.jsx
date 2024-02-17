import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./navbar.css";
import logo from "../../assets/kinster.png"
import { adminAuth } from "../../redux/Slicers/adminSlicer";
import { userAuth } from "../../redux/Slicers/userSclicer";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [adminNav, setAdminNav] = useState();
  const [userNav, setUserNav] = useState();
  const [userData, setUserData] = useState();

  const adminLogout = () => {
    dispatch(adminAuth(null));
  };
  const userLogout = () => {
    dispatch(userAuth(null));
  };
  const navigateToAddUser = () => {
    navigate("/superadmin/adduser");
  };
  const key = useSelector((state) => {
    return state.auth.adminID;
  });
  const userkey = useSelector((state) => {
    return state.user.userID;
  });
  const userDetails = useSelector((state) => {
    return state.user.userData;
  });
  const navigateTotask = () => {
    navigate("task");
  };
  useEffect(() => {
    setAdminNav(key);
    setUserNav(userkey);
    setUserData(userDetails)
  }, [key, userkey]);
  console.log(userData);
  return (
    <div className="navbarContainer">
      <div className="navLeft">
      <img style={{width:'80px' , marginRight:'20px'}} src={logo} alt='kinter - logo' onClick={()=>{
        if(adminNav){
          navigate('/superadmin/dashboard')
        }
        if(userNav){
          navigate('home')
        }
        
      }} />
       {/* <h2 onClick={()=>{
        if(adminNav){
          navigate('/superadmin/dashboard')
        }
        if(userNav){
          navigate('home')
        }
        
      }} >Kinster</h2> */}

      {userData?.name && <p> {userData?.name} {`(${userData.employeeID})`} 🙋‍♂️</p>}

      </div>
      <div className="navRight">
        
      {adminNav && (
          <button className="addUserButton" onClick={navigateToAddUser}>
            Add User
          </button>
        )}


        {adminNav && (
          <button
            style={{ marginLeft: "20px" , marginRight: "20px" }}
            className="addUserButton"
            onClick={() => {
              navigate("/superadmin/tasker");
            }}
          >
            Tasker
          </button>
        )}
      {userNav && (
          <button style={{marginRight: '20px'}} className="addUserButton" onClick={navigateTotask}>
            Task
          </button>
        )} 
        {adminNav && (
          <button className="addUserButton" onClick={adminLogout}>
            Log Out
          </button>
        )}
        {userNav && (
          <button className="addUserButton" onClick={userLogout}>
            Log Out
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
