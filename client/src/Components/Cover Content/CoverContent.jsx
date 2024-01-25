import React from 'react'
import './CoverContent.css'
import { Link } from 'react-router-dom'

function CoverContent({ product }) {
    if (!product) {
        return <div>Loading...</div>; // Or any other placeholder content
    }

    return (
        <div className='container'>
            <h2 className='title m-2 mt-5 fs-1'>{product.title}</h2>
            <h4 className='container'>
                <span className='title-md'>{product.price} | </span>
                <span className='title-md '><i className="fa fa-star" aria-hidden="true" id="rating"> {product.rating}</i></span>
            </h4>
            <p className='title-sm p-3'>
                {product.description}
            </p>
            <div className="button mb-5">
                <Link to="/categories" className="btn btn-outline-success ">See More Categories <i class="fa fa-long-arrow-right" aria-hidden="true"></i></Link>
            </div>
        </div>
    )
}

export default CoverContent
