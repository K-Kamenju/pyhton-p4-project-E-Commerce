import React from 'react'
import product from '../../Assets/product.png'
import './Item.css'

function Item() {
    return (
        <div className="container mt-5">
            <div className='row align-items-center'>
                <div className="card col-md-4">
                    <img src={product} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className='btn btn-sm btn-outline-danger'>Price : Ksh 15</span>
                        <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card col-md-4">
                    <img src={product} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className='btn btn-sm btn-outline-danger'>Price : Ksh 15</span>
                        <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
                <div className="card col-md-4">
                    <img src={product} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <span className='btn btn-sm btn-outline-danger'>Price : Ksh 15</span>
                        <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item