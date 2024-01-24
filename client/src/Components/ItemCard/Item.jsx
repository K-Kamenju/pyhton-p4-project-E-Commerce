import React from 'react';
import product from '../../Assets/product.png';
import './Item.css';
import { Link } from 'react-router-dom';

function Item() {
    return (
        <div className="container mt-5">
            <div className='row align-items-center'>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                        <Link to="/product/productId"><img src={product} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <span className='btn btn-sm btn-outline-danger'>Price: Ksh 15</span>
                            <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                        <Link to="/product/productId"><img src={product} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <span className='btn btn-sm btn-outline-danger'>Price: Ksh 15</span>
                            <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="card">
                        <Link to="/product/productId"><img src={product} className="card-img-top" alt="..." /></Link>
                        <div className="card-body">
                            <span className='btn btn-sm btn-outline-danger'>Price: Ksh 15</span>
                            <p className="card-text mt-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item;
