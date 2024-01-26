import React from 'react';
import './ProductData.css';
import Swal from 'sweetalert2';
import product_page from '../../Assets/product.png';
import { useNavigate } from 'react-router-dom';

function ProductData({ product, availableSizes }) {
    const navigate = useNavigate();
    const addToCart = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You must be logged in to add to cart.',
            });
            navigate('/login');
            return;
        }
        const response = await fetch('https://marketx-6vt2.onrender.com/api/cart', {
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
                        <img src={product_page || product.image_url} className="card-img-top" alt={product.title} />
                    </div>
                </div>
                <div className="col align-self-start">
                    <h2 className="card-title pb-3 pt-3">{product.title}</h2>
                    <h4 className="card-title p-3">Rating: {product.rating}</h4>
                    <h4 className='btn btn-sm btn-outline-danger mt-3'>Price: {product.price}</h4>
                    <p className="card-text mt-4">{product.description}</p>
                    
                    <h1 className='mt-3'>Available Sizes:</h1>
                    <div className="productdisplay-right-sizes me-5 mt-3 py-2 pb-3">
                    {availableSizes.map((size) => (
                        <div key={size} className='btn btn-md btn-outline-dark m-3'>{size}</div>
                    ))}
                    </div>
                    <button className='btn btn-lg btn-outline-danger mt-2 mb-4' onClick={addToCart}>Add to Cart</button>
                </div>
            </div>
        </div>            
    )
}

export default ProductData