import React from 'react'
import './CoverContent.css'
import arrow from '../../Assets/arrow.png'
import { Link } from 'react-router-dom'

function CoverImage() {
    return (
        <div className='container'>
            <h2 >Title</h2>
            <h4>
                <span>Price | </span>
                <span><i className="fa fa-star" aria-hidden="true" id="rating">  Rating</i></span>
            </h4>
            <p>
                Description
            </p>
            <div className="button">
                <Link to="/categories" className="btn btn-outline-success ">See More Categories<img src={arrow} alt="arrows" /></Link> 
            </div>
        </div>
    )
}

export default CoverImage