import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';
import { useDispatch } from 'react-redux';
import { signup } from './userSlice'; 
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

const loginSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
        email: '',
        password: ''
    },
    validationSchema: loginSchema,

    onSubmit: async (values, actions) => {
        try {
            const res = await axios.post('http://localhost:5005/users/login', {
                email: values.email,
                password: values.password
            });
            
            const { token, user } = res.data;

            // dispatch(signup({ ...user, token })); 
            
            dispatch(signup({
                                username: user.username,
                                email: user.email,
                                token: token,
                                type: user.type,
                                loggedIn: true
                            }));
            
            toast.success("Welcome Back! Login Successful. 🎉");
            navigate('/'); 

        } catch (err) {
            const errorMsg = err.response?.data?.message || "Invalid Credentials";
            toast.error(errorMsg);
        }
    }
});


    return (
        <div className="login-wrapper">
            <div className="login-card">
                <h2>Login</h2>
                <p>Welcome 
                    back! Please enter your details.</p>
                
                <form className='login-form' onSubmit={handleSubmit}>
                    <label>Email</label>
                    <input 
                        type="email" 
                        placeholder="Email Address"
                        name='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                     <div className='errors'>
                        {errors.email && touched.email ? <p className="form-error">{errors.email}</p> : null}
                     </div>

                    <label>Password</label>
                    <input 
                        type="password" 
                        placeholder="Password" 
                        name='password'
                        value={values.password}
                        onChange={handleChange} 
                        onBlur={handleBlur}
                    />
                    <div className='errors'>
                        {errors.password && touched.password ? <p className="form-error">{errors.password}</p> : null}
                    </div>

                    <button type="submit" className="login-btn">Login</button>
                </form>

                <div className="login-footer">
                    <Link to="/forgot-password">Forgot Password?</Link>
                    <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;