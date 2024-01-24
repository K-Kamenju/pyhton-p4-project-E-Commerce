import React from 'react'
import './ProductData.css'
import product from '../../Assets/product.png'

function ProductData() {
    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-start">
                    <div className="mb-3 pt-3 pb-3">
                        <img src={product} className="card-img-top" alt="..." />
                    </div>
                </div>
                <div className="col align-self-start">
                    {/* has title, description, rating, category, size*/}
                    <h2 className="card-title pb-3 pt-3">Card title</h2>
                    <h4 className="card-title p-3">Rating in stars</h4>
                    <h4 className='btn btn-sm btn-outline-danger mt-3'>Price: Ksh 15</h4>
                    <p className="card-text mt-4">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <h1 className='mt-3'>Select Size:</h1>
                    <div className="productdisplay-right-sizes me-5 mt-3 py-2 pb-3">
                        <div className='btn btn-md btn-outline-dark m-3'>S</div>
                        <div className='btn btn-md btn-outline-dark m-3'>M</div>
                        <div className='btn btn-md btn-outline-dark m-3'>L</div>
                        <div className='btn btn-md btn-outline-dark m-3'>XL</div>
                        <div className='btn btn-md btn-outline-dark m-3'>XXl</div>
                    </div>
                    <button className='btn btn-lg btn-outline-danger mt-2 mb-4'>Add to Cart</button>
                </div>
            </div>
        </div>            
    )
}

export default ProductData