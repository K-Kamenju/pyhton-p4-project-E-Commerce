import React, { useState } from 'react'
import './Navbar.css'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom'

function Navbar({ isLoggedIn, onLogout }) {

    const [menu, setMenu] = useState('home')

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <Link to="/"><img src={logo} alt="logo" className="navbar-brand logo" /></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                {!isLoggedIn ? (<>
                    <div className="navbar-nav ms-auto link-color">
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}}
                        to="/" 
                        onClick={()=>{setMenu("home")}}>
                            Home{menu==="home"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/about" 
                        onClick={()=>{setMenu("about")}}>
                            About{menu==="about"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/categories" 
                        onClick={()=>{setMenu("categories")}}>
                            Categories{menu==="categories"?<hr/>:<></>}
                        </Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        <Link to="/login">
                            <button className="btn btn-sm btn-outline-success p-2 m-2">Login</button>
                        </Link>
                        <Link to="/cart"><i className="fa fa-shopping-cart fa-3x mx-1" aria-hidden="true"></i></Link>
                        <div className="nav-cart-count">0</div>
                    </div>
                </> ): (<>
                    <div className="navbar-nav ms-auto link-color">
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}}
                        to="/" 
                        onClick={()=>{setMenu("home")}}>
                            Home{menu==="home"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/about" 
                        onClick={()=>{setMenu("about")}}>
                            About{menu==="about"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/categories" 
                        onClick={()=>{setMenu("categories")}}>
                            Categories{menu==="categories"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/profile" 
                        onClick={()=>{setMenu("profile")}}>
                            Profile{menu==="profile"?<hr/>:<></>}
                        </Link>
                        <Link 
                        className='list m-3'
                        style={{textDecoration:"none"}} 
                        to="/post-product" 
                        onClick={()=>{setMenu("post-product")}}>
                            Post{menu==="post-product"?<hr/>:<></>}
                        </Link>
                    </div>
                    <div className="navbar-nav ms-auto">
                        
                        <button className="btn btn-sm btn-outline-danger p-2 m-2" onClick={onLogout}>Logout</button>
                        
                        <Link to="/cart"><i className="fa fa-shopping-cart fa-3x mx-1" aria-hidden="true"></i></Link>
                        <div className="nav-cart-count">0</div>
                    </div>
                </> )}
                
            </div>
        </div>
    </nav>
  )
}

export default Navbar