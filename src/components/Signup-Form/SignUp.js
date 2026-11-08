import React from 'react';
import './SignUp.css';
import { useFormik } from 'formik';
import { signup } from './userSlice';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; // Link add kiya
import axios from 'axios';
import { toast } from 'react-toastify';

export const signupSchema = Yup.object({
    name: Yup.string().min(3).required('please enter your name'),
    email: Yup.string().email('please enter valid email').required('please enter your email'),
    password: Yup.string().min(3).required('please enter your password')
});

const initialValues = {
    name: '',
    email: '',
    password: ''
};

const SignUp = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { values, handleBlur, handleChange, handleSubmit, errors, touched } = useFormik({
        initialValues,
        validationSchema: signupSchema,

        onSubmit: async (values, actions) => {
            try {
                const response = await axios.post('http://localhost:5006/users/sign-up', {
                    username: values.name,
                    email: values.email,
                    password: values.password
                });

                // const { token, user } = response.data;
                const token = response.data.token;
                const user = response.data.user;

                // Redux state update
                dispatch(signup({
                    username: user.username,
                    email: user.email,
                    token: token,
                    type: user.type,
                    loggedIn: true
                }));

                // alert("Registration Successful!");
                toast.success("Registration Successful! 🎉")
                actions.resetForm();
                navigate('/');

            } catch (err) {
                const backendError = err.response?.data?.error || err.response?.data?.message;
                if (backendError) {
                    if (backendError.toLowerCase().includes("email")) {
                        actions.setErrors({ email: backendError });
                    } else if (backendError.toLowerCase().includes("username") || backendError.toLowerCase().includes("user")) {
                        actions.setErrors({ name: backendError });
                    } else {
                        toast.error(backendError || "Internal Server Error. Please try again later!");
                    } 
                }
            }
        }
    });

    return (
        <div className='App'>
            <form className='signup-form' onSubmit={handleSubmit}>
                <p>Sign Up</p>

                <label>Name</label>
                <input
                    type='text'
                    placeholder='Enter your name'
                    name='name'
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <div className='errors'>
                    {errors.name && touched.name ? <p className='form-error'>{errors.name}</p> : " "}
                </div>

                <label>Email</label>
                <input
                    type='email'
                    placeholder='Enter your email'
                    name='email'
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <div className='errors'>
                    {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : ""}
                </div>

                <label>Password</label>
                <input
                    type='password'
                    placeholder='Enter password'
                    name='password'
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                />
                <div className='errors'>
                    {errors.password && touched.password ? <p className='form-error'>{errors.password}</p> : ''}
                </div>

                <button type='submit'>Register</button>

                <div className="signup-footer">
                    <p>Already have an account? <Link to="/login">Login here</Link></p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;