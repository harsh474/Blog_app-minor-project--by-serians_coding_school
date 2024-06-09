import React, { useState } from "react";
// import axios from "axios";  
import axios from "../Components/axiosConfig"

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = (e) => {
    e.preventDefault();
    console.log(email, password);
    axios.post('http://localhost:4000/api/user/login', { email, password },{withCredentials:true})
      .then((response) => {
        console.log('Login successful:', response.data);
        toast.success("Login successful!");
      })
      .catch((error) => {
        if (error.response) {
          console.error('Login error response:', error.response.data);
          const abhay = error.response.data.message;
          toast.error(`Error: ${abhay}`);
        } else if (error.request) {
          console.error('Login error request:', error.request);
          toast.error("No response from the server.");
        } else {
          console.error('Login error:', error.message);
          toast.error(`Error: ${error.message}`);
        }
      });
  }

  return (
    <div>
      <form onSubmit={loginUser} method="post">
        <h1>Login Page</h1>
        <label>Enter Your Email</label>
        <input
          type="email"
          placeholder="enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Enter Your Password</label>
        <input
          type="password"
          placeholder="enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login Now</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
