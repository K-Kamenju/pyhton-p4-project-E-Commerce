import React from 'react';
import './ProductData.css';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

function ProductData({ product }) {
    const navigate = useNavigate();
    const addToCart = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ product_id: product.id, quantity: 1 }), // Assuming quantity is 1
        });
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: "Yaay",
                text: "Adding to Cart",
                footer: 'Its almost Yours'
              });
            navigate('/cart');
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Adding to Cart Failed!",
                footer: 'Sorry...'
              });
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col align-self-start">
                    <div className="mb-3 pt-3 pb-3">
                        <img src={product.image_url || 'path_to_default_image'} className="card-img-top" alt={product.title} />
                    </div>
                </div>
                <div className="col align-self-start">
                    <h2 className="card-title pb-3 pt-3">{product.title}</h2>
                    <h4 className="card-title p-3">Rating: {product.rating}</h4>
                    <h4 className='btn btn-sm btn-outline-danger mt-3'>Price: {product.price}</h4>
                    <p className="card-text mt-4">{product.description}</p>
                    
                    <h1 className='mt-3'>Select Size:</h1>
                    <div className="productdisplay-right-sizes me-5 mt-3 py-2 pb-3">
                        <div className='btn btn-md btn-outline-dark m-3'>S</div>
                        <div className='btn btn-md btn-outline-dark m-3'>M</div>
                        <div className='btn btn-md btn-outline-dark m-3'>L</div>
                        <div className='btn btn-md btn-outline-dark m-3'>XL</div>
                        <div className='btn btn-md btn-outline-dark m-3'>XXl</div>
                    </div>
                    <button className='btn btn-lg btn-outline-danger mt-2 mb-4' onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>            
    )
}

export default ProductData