import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Forgot.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { signup } from './userSlice';

const forgotSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required")
});

const Forgot = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
        email: ''
    },
    validationSchema: forgotSchema,
    
    onSubmit: async (values, actions) => {
        try {
            const res = await axios.post('http://localhost:5006/users/forgot-password', {
                email: values.email
            });
            
            const { token, user } = res.data;
 
            toast.success("OTP send to your email! 📧");
            navigate('/reset-password'); 

        } catch (err) {
            const errorMsg = err.response?.data?.message || "Email nor dound";
            toast.error(errorMsg);
        }
    }
});

    return (
        <div className="forgot-wrapper">
            <div className="forgot-card">
                <h2>Forgot Password?</h2>
                <p>Enter your email to receive an OTP.</p>
                
                <form onSubmit={handleSubmit} className="forgot-form">
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Enter your registered email"
                        name='email' 
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    
                    <div className='errors'>
                        {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
                     </div>
                    <button type="submit" className="forgot-btn">Send OTP</button>
                </form>
                
                <button className="back-link" onClick={() => navigate('/login')}>
                    Back to Login
                </button>
            </div>
        </div>
    );
};

export default Forgot;