import React from 'react'
import './CoverContent.css'
import { Link } from 'react-router-dom'

function CoverImage() {
    return (
        <div className='container'>
            <h2 className='title m-3'>Title</h2>
            <h4>
                <span className='title-md'>Price | </span>
                <span className='title-md '><i className="fa fa-star" aria-hidden="true" id="rating">  Rating</i></span>
            </h4>
            <p className='title-sm p-3'>
                Description
            </p>
            <div className="button">
                <Link to="/categories" className="btn btn-outline-success ">See More Categories     <i class="fa fa-long-arrow-right" aria-hidden="true"></i></Link> 
            </div>
        </div>
    )
}

export default CoverImage