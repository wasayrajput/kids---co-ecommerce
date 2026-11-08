import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Reset.css'; 
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const resetSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("email is required"),
    otp: Yup.string().length(4, "OTP must be 4 digits").required("OTP is required"),
    newPassword: Yup.string().min(5, "Password must be at least 6 characters").required("Required")
});

const Reset = () => {
    
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
            otp: '',
            newPassword: ''
        },

    validationSchema: resetSchema,

        onSubmit: async (values) => {
            try {
                const res = await axios.post('http://localhost:5006/users/reset-password', values);
                
                toast.success(res.data.message || "Password Updated Successfully! 🎉");
                navigate('/login');

            } catch (err) {
                const errorMsg = err.response?.data?.message || "Reset process failed!";
                toast.error(errorMsg);
            }
        }
    });

    return (
        <div className="reset-wrapper">
            <div className="reset-card">
                <h2>Set New Password</h2>
                <p>Verify your details to update your password.</p>
                
                <form className="reset-form" onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Confirm your Email" 
                        name='email'
                        value={values.email}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <div className='errors'>
                    {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : ""}
                </div>

                    <label>Enter OTP</label>
                    <input 
                        type="text" 
                        placeholder="Enter 4-Digit OTP" 
                        maxLength="4"
                        name='otp'
                        value={values.otp}
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                    />
                     <div className='errors'>
                    {errors.otp && touched.otp ? <p className='form-error'>{errors.otp}</p> : ""}
                </div>

                    <label>New Password</label>
                    <input 
                        type="password" 
                        placeholder="Enter New Password" 
                        name='newPassword'
                        value={values.newPassword}
                        onChange={handleChange} 
                        onBlur={handleBlur} 
                    />
                    <div className='errors'>
                    {errors.newPassword && touched.newPassword ? <p className='form-error'>{errors.newPassword}</p> : ''}
                </div>
                
                    <button type="submit" className="reset-btn">Update Password</button>
                </form>
            </div>
        </div>
    );
};

export default Reset;