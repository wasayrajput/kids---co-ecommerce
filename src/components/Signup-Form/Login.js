import React, { useState } from 'react'
import './Login.css'
import { useFormik } from 'formik';
import { login } from './userSlice';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export const signupSchema = Yup.object({
    name: Yup.string().min(3).required('please enter your name'),
    email: Yup.string().email('please enter valid email').required('please enter your email'),
    password: Yup.string().required('please enter your password')
})


const initialValues = {
  name:'',
  email:'',
  password:''
}

const Login = () => {

    const {values, handleBlur, handleChange, handleSubmit, errors, touched} = useFormik({
    initialValues,
    validationSchema: signupSchema,

    onSubmit: (values, actions) => {
     console.log(values);
    //  localStorage.setItem('name', values.name);
     

     dispatch(
        login({
          name: values.name,
          email: values.email,
          password: values.password,
          loggedIn: true,
        })
      );

      actions.resetForm();
      navigate('/');
     
    }
  });


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

  

  return (
    <div className='App'>
        <form className='signup-form' onSubmit={handleSubmit}>
        <p>Sign Up</p>

        <label>Name</label>
        <input 
         type='text'
         placeholder='name' 
         name='name' 
         value={values.name}
         onBlur={handleChange}
         onChange={(e) => {setName(e.target.value); handleChange(e)}}

        ></input>
        <div className='errors'>
            {errors.name && touched.name ? <p className='form-error'>{errors.name}</p> : ""}
        </div>

        <label>Email</label>
        <input 
         type='email' 
         placeholder='e-mail' 
         name='email' 
         value={values.email} 
         onBlur={handleChange} 
         onChange={(e) => {setEmail(e.target.value); handleChange(e)}}
         ></input>
        <div className='errors'>
            {errors.email && touched.email ? <p className='form-error'>{errors.email}</p> : ""}
        </div>

        <label>Password</label>
        <input 
         type='password' 
         placeholder='password' 
         name='password' 
         value={values.password} 
         onBlur={handleBlur} 
         onChange={(e) => {setPassword(e.target.value); handleChange(e)}}></input>
        <div className='errors'>
            {errors.password && touched.password ? <p className='form-error'>{errors.password}</p> : ''}
        </div>

        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Login