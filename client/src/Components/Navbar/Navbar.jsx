import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../Assets/logo.png'

function Navbar() {

    const [menu, setMenu] = useState('home')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <img src={logo} alt="logo" className="navbar-brand logo" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav ms-auto link-color">
                    <a 
                    className="nav-link " 
                    aria-current="page" 
                    href="#" 
                    onClick={()=>{setMenu("home")}}>
                        Home{menu==="home"?<hr/>:<></>}
                    </a>
                    <a 
                    className="nav-link" 
                    href="#" 
                    onClick={()=>{setMenu("about")}}>
                        About{menu==="about"?<hr/>:<></>}
                    </a>
                    <a 
                    className="nav-link" 
                    href="#"
                    onClick={()=>{setMenu("products")}}>
                        Products{menu==="products"?<hr/>:<></>}
                    </a>
                </div>
                <div className="navbar-nav ms-auto">
                    <button className="btn btn-sm btn-outline-success p-2 m-2">Login</button>
                    <i className="fa fa-shopping-cart fa-3x" aria-hidden="true"></i>
                    <div className="nav-cart-count">0</div>
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar