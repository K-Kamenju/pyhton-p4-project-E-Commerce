import React from 'react'
import footer_logo from '../../Assets/logo.png'
import './Footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer mt-5 pt-5'>
            <div className="footer-logo">
            <Link to="/" style={{textDecoration:"none"}}>
                <img src={footer_logo} alt="" className='logo-lg'/>
            </Link>
            </div>
            <ul className="footer-links">
                <Link to="/" style={{textDecoration:"none"}}>
                    <li>Home</li>
                </Link>
                <Link to="/categories" style={{textDecoration:"none"}}>
                    <li>Categories</li>
                </Link>
                <Link to="/about" style={{textDecoration:"none"}}>
                    <li>About</li>
                </Link>
                <Link to="/home" style={{textDecoration:"none"}}>
                    <li>Contact</li>
                </Link>

            </ul>
            <div className="footer-social-icon">
                <div className="footer-icons-container">
                    <i className="fa fa-instagram fa-2x" aria-hidden="true"></i>
                </div>
                <div className="footer-icons-container">
                    <i className="fa fa-pinterest fa-2x" aria-hidden="true"></i>

                </div>
                <div className="footer-icons-container">
                    <i className="fa fa-github fa-2x" aria-hidden="true"></i>
                </div>
            </div>
            <div className="footer-copyright">
                <hr />
                <p>Copyright @ 2024 - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer