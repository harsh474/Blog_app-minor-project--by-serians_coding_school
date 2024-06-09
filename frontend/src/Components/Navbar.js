import React from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'
function Navbar() {
return (
    <div> 
     <nav> 
            <div className="nav-container">
                    <div className="nav-item">
                        <NavLink to="/">Home</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/login">Login</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/register">Register</NavLink>
                    </div>
                    <div className="nav-item">
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </div>
            </div>
     </nav>
    </div>
)
}

export default Navbar