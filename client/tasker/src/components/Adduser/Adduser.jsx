import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./addUser.css";
import addUser from "../../assets/addUser.png";

function AddUser() {
  const initialValues = {
    name: "",
    employeeID: "",
    email: "",
    password: "",
    adminPassword: "",
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      if(values.name === "" || values.employeeID === "" || values.email === "" || values.password === "" || values.adminPassword === ""){
      toast.error("Missing Credentials");
      return
      }
      const response = await axios.post(
        "http://localhost:7700/superadmin/adminpass",
        values
      );
      console.log(response);
      if (response.data.success === false) {
        toast.error(response.data)
        toast.error(response.data.message);
        return
      } else {
        resetForm();
        toast.success("User added successfully!");
      }
    }  catch (error) {
      if (
        (error.response && error.response.status === 401) ||
        error.response.status === 404
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div className="addUserContainer">
      <div className="addUserOverlay">
        <div className="modal">
          <h3>Add User</h3>
          <form onSubmit={formik.handleSubmit} style={{backgroundColor:'#f8f8f8'}}>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="input"
              placeholder="Name"
            />
            <input
              type="text"
              id="employeeID"
              name="employeeID"
              value={formik.values.employeeID}
              onChange={formik.handleChange}
              className="input"
              placeholder="Employee ID"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="input"
              placeholder="Email"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              className="input"
              placeholder="Password"
            />
            <input
              type="password"
              id="adminPassword"
              name="adminPassword"
              value={formik.values.adminPassword}
              onChange={formik.handleChange}
              className="input"
              placeholder="Enter admin password"
            />
            <button type="submit" className="addUserButton">
              Add User
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
      <div className="addUserImage">
        <div className="SA-imgContainer">
          <img className="AU-image" src={addUser} alt="super-admin" />
        </div>
      </div>
    </div>
  );
}

export default AddUser;
