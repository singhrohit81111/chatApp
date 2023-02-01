import React, { useState } from 'react'
import './style.scss'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';

export const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");

    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className='formContainer'>
      <div className='formWrapper htt'>
        <span className='logo'>FunShun</span >
        <span className='title'>Login</span >
        <form className='formId' onSubmit={handleSubmit}>
          <input type="text" className='inputtt' placeholder='E-mail' />
          <input type="password" className='inputtt' placeholder='Password' />
          <button className='button'>Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <p>You don't have an account? <Link to="/register">Register</Link></p>
      </div>
    </div>
  )
}
