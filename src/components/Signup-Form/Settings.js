import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from './userSlice';
import axios from 'axios';
import './Settings.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';


export const settingSchema = Yup.object({
            oldPassword: Yup.string().required("Old password is required"),
            newPassword: Yup.string().min(3, "At least 3 characters").required("New password is required")
});

const Settings = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit, resetForm } = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
        },
        validationSchema: settingSchema,

        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('token');

                const res = await axios.put('http://localhost:5005/users/update-user', values, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                toast.success(res.data.message || "Password updated successfully! 🔐");
                resetForm(); // Inputs khali karne ke liye Formik ka apna function
            } catch (err) {
                toast.error(err.response?.data?.message || "Password update failed!");
            }
        }
    });

    const handleDelete = async () => {
        if (window.confirm("Warning: Deleting your account will permanently erase all your data. Proceed?")) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete('http://localhost:5005/users/delete-account', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                
                dispatch(logout()); 
                localStorage.removeItem('token'); 
                toast.info("Account Deleted Successfully.");
                navigate('/');
            } catch (err) {
                toast.error(err.response?.data?.message || "Delete failed!");
            }
        }
    };


    return (
        <div className="settings-page">
            <div className="settings-section">
                <h2>Account Settings</h2>

                <h3>Change Password</h3>
                <form className='setting-form' onSubmit={handleSubmit}>
                <input 
                    name='oldPassword'
                    type="password" 
                    placeholder="Old Password" 
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <div className='errors'>
                    {errors.oldPassword && touched.oldPassword && <p className="form-error">{errors.oldPassword}</p>}
                </div>

                <input 
                    name="newPassword"
                    type="password" 
                    placeholder="New Password" 
                    value={values.newPassword}
                    onChange={handleChange}
                    onBlur={handleBlur} 
                />
                <div className='errors'>
                    {errors.newPassword && touched.newPassword && <p className="form-error">{errors.newPassword}</p>}
                </div>

                <button type='submit' className="auth-btn">
                    Update Password
                </button>
                </form>
            </div>

            <div className="settings-section">
                <div className="danger-zone">
                    <p>Deleting your account is permanent.</p>
                    <button className="delete-acc-btn" onClick={handleDelete}>Delete My Account</button>
                </div>
            </div>
        </div>
    );
};

export default Settings;