import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "./login.css";
import kinster from "../../assets/kinster.png";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../../redux/Slicers/userSclicer";
import { useDispatch } from "react-redux";

function Login() {
  const initialValues = {
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const response = await axios.post("http://localhost:7700/auth/login", values);
  
      if (response.data.success === true) {
        dispatch(userAuth(response.data));
        navigate("home", { replace: true });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {  
      if (error.response && error.response.status === 401 || error.response.status === 404) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };
  
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      if (!values.password) {
        errors.password = "Password is required";
      }

      return errors;
    },
  });

  return (
    <div className="loginContainer" >
      <img src={kinster} alt="kinster logo" className="logoImg-login" />
      <div className="paraContainer">
        <p className="loginwelcome">Welcome to Kinster task management</p>
        <p className="subWelcome">
          Please login with your official Email id; if you can't login, inform
          admin.
        </p>
      </div>
      <div className="loginWrapper">
        <p className="information">
          Sign up to the family and get started immediately
        </p>
        <form className="inputbox" onSubmit={formik.handleSubmit}>
          <input
            className="input"
            type="email"
            placeholder="Enter your official Email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.errors.email && formik.touched.email && (
            <div className="error">{formik.errors.email}</div>
          )}
          <input
            className="input"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          {formik.errors.password && formik.touched.password && (
            <div className="error">{formik.errors.password}</div>
          )}
          <button type="submit" className="googleButton">
            Sign In
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Login;
