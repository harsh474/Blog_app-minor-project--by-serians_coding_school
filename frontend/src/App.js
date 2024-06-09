import React from "react";
import { Routes,Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Register from "./Pages/Register"; 
import Login from "../src/Pages/Login" 
import Dashboard from "./Pages/Dashboard";
function App() {
  return (
    <>
     <Navbar/> 
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>

    </>
  );
}

export default App;
