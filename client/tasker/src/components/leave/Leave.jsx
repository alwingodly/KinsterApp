import React from 'react';
import leave from '../../assets/leave.png';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminAuth } from '../../redux/Slicers/adminSlicer';
function Leave() {
  const dispatch = useDispatch()
  const validationSchema = Yup.object({
    superAdminId: Yup.string().required('Super Admin ID is required'),
    reason: Yup.string().required('reason is required'),
  });

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      superAdminId: '',
      reason: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const response =  await axios.post('https://bnd.kinster.online/user/leave', values);
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
          <p className='welcome'>Apply for Leave</p>
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
                className={`input ${formik.touched.reason && formik.errors.reason ? 'input-error' : ''}`}
                type='text'
                id='reason'
                name='reason'
                value={formik.values.reason}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder='Reason'
              />
              {formik.touched.reason && formik.errors.reason && (
                <div className='error'>{formik.errors.reason}</div>
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
          <img className='SA-image' src={leave} alt='super-admin' />
          <p className='welcome-small'></p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Leave;
