import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser, signup } from './userSlice'; 
import axios from 'axios';
import './Profile.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

export const profileSchema = Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string().email("Invalid email").required("Email is required")
});

const Profile = () => {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            username: user?.username || '',
            email: user?.email || ''
        },
        enableReinitialize: true, // Zaroori: taake refresh par data wapis aa jaye
        validationSchema: profileSchema,
            
        onSubmit: async (values) => {
            try {
                const token = localStorage.getItem('token');
                
                const res = await axios.put('http://localhost:5005/users/update-user', values, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                dispatch(signup({ ...user, username: values.username, email: values.email }));
                
                setIsEditing(false);
                toast.success("Profile Updated Successfully! ✨");
            } catch (err) {
                toast.error(err.response?.data?.message || "Update failed!");
            }
        }
    });

    return (
        <div className="profile-page">
            <div className="profile-header">
                {/* <div className="profile-avatar">👤</div> */}
                <h2>Profile</h2>
            </div>
            
            <div className="profile-body">
                {isEditing ? (
                    <form className="auth-form" onSubmit={handleSubmit} >
                        <div className="info-group">
                            <label>Username</label>
                            <input 
                                name='username'
                                type="text" 
                                value={values.username} 
                                onChange={handleChange} 
                                onBlur={handleBlur}
                            />
                            <div className='errors'>
                        {errors.username && touched.username ? <p className="form-error">{errors.username}</p> : null}
                     </div>
                        </div>
                        <div className="info-group">
                            <label>Email Address</label>
                            <input 
                                type="email" 
                                name='email'
                                value={values.email} 
                                onChange={handleChange} 
                                onBlur={handleBlur} 
                            />
                            <div className='errors'>
                        {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
                     </div>
                        </div>
                        <div className='button-group'>
                            <button type='submit' className="edit-btn">Save Changes</button>
                            <button type='button' className="edit-btn cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <div className="info-group">
                            <label>Username</label>
                            <span>{user?.username}</span>
                        </div>
                        <div className="info-group">
                            <label>Email</label>
                            <span>{user?.email}</span>
                        </div>
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;