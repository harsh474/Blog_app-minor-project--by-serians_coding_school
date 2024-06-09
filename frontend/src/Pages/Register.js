import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    axios.post('http://localhost:4000/api/user/signup', { email, password })
      .then((response) => {
        console.log('Register successful:', response.data);
        toast.success('Register successful!');
      })
      .catch((error) => {
        if (error.response) {
          console.error('Register error response:', error.response.data);
          toast.error(`Error: ${error.response.data.error || "Email already exists"}`);
        } else if (error.request) {
          console.error('Register error request:', error.request);
          toast.error('No response from the server.');
        } else {
          console.error('Register error:', error.message);
          toast.error(`Error: ${error.message}`);
        }
      });
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <h1>Register Page</h1>
        <label>Enter Your Name</label>
        <input
          type='text'
          placeholder='enter your name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Enter Your Email</label>
        <input
          type='email'
          placeholder='enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Enter Your Password</label>
        <input
          type='password'
          placeholder='enter your password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type='submit'>Register</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Register;
