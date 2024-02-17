import React from 'react';
import './superAdminLogin.css';
import superAdmin from '../../assets/office.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminAuth } from '../../redux/Slicers/adminSlicer';
function SuperAdminLogin() {
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    superAdminId: Yup.string().required('Super Admin ID is required'),
    password: Yup.string().required('Password is required'),
  });

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      superAdminId: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response =  await axios.post('http://localhost:7700/auth/superadmin', values);
        if(response.status === 200){
          console.log(response.data.message);
          dispatch(adminAuth(response.data.message))
          navigate('dashboard' , {replace: true})
        }
      }  catch (error) {  
        if (error.response && error.response.status === 401 || error.response.status === 404) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className='SA-container'>
      <div className='SA-left'>
        <div className='SA-formContainer'>
          <p className='welcome'>Welcome Super Admin</p>
          <form className='SA-form' onSubmit={formik.handleSubmit}>
            <div className='form-group'>
              <input
                className={`input ${formik.touched.adminId && formik.errors.adminId ? 'input-error' : ''}`}
                type='text'
                id='superAdminId'
                name='superAdminId'
                value={formik.values.superAdminId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Enter Super Admin ID'
              />
              {formik.touched.superAdminId && formik.errors.superAdminId && (
                <div className='error'>{formik.errors.superAdminId}</div>
              )}
            </div>
            <div className='form-group'>
              <input
                className={`input ${formik.touched.password && formik.errors.password ? 'input-error' : ''}`}
                type='password'
                id='password'
                name='password'
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Enter password'
              />
              {formik.touched.password && formik.errors.password && (
                <div className='error'>{formik.errors.password}</div>
              )}
            </div>
            <button type='submit' className='addUserButton' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
      <div className='SA-right'>
        <div className='SA-imgContainer'>
          <img className='SA-image' src={superAdmin} alt='super-admin' />
          <p className='welcome-small'>Something about admin</p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default SuperAdminLogin;
