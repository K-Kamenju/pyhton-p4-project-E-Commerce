import React from 'react';
import product_photo from '../../Assets/product.png';
import './Item.css';
import { Link } from 'react-router-dom';

function Item({ product }) {
    const handleImageError = (e) => {
        e.target.src = product_photo;
    };

    return (
        <div className="col-lg-4 col-md-6 mb-4">
            <div className="card">
                <Link to={`/product/${product.id}`}>
                    <img 
                        src={product.image_url} 
                        className="card-img-top" 
                        alt={product.title}
                        onError={handleImageError} 
                    />
                </Link>
                <div className="card-body">
                    <span className='btn btn-sm btn-outline-danger'>Price: {product.price}</span>
                    <p className="card-text mt-3">{product.description}</p>
                </div>
            </div>
        </div>
    );
}

export default Item;
