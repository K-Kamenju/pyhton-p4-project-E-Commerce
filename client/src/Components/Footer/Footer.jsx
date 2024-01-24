import React from 'react'
import footer_logo from '../../Assets/logo.png'
import './Footer.css'

function Footer() {
    return (
        <div className='footer mt-5 pt-5'>
            <div className="footer-logo">
                <img src={footer_logo} alt="" className='logo-lg'/>
            </div>
            <ul className="footer-links">
                <li>Company</li>
                <li>Products</li>
                <li>Offices</li>
                <li>About</li>
                <li>Contact</li>
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