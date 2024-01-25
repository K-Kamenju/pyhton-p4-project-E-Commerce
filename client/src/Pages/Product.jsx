import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductData from '../Components/ProductData/ProductData';
import Reviews from '../Components/ProductData/Reviews';


function Product() {
    const { productId } = useParams(); // Assuming you're using React Router with a route like '/product/:productId'
    const [product, setProduct] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`/api/product/${productId}`)
            .then(response => response.json())
            .then(data => setProduct(data));

        fetch(`/product/${productId}/reviews`)
            .then(response => response.json())
            .then(data => setReviews(data));
    }, [productId]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="container mt-5" aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/" style={{textDecoration:"none", color:"black"}}>Home</Link></li>
                    <li className="breadcrumb-item"><Link to="/categories" style={{textDecoration:"none", color:"black"}}>Categories = {product.category}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">{product.title}</li>
                </ol>
            </div>
            <ProductData product={product} availableSizes={product.available_sizes}/>
            <Reviews reviews={reviews} productId={productId} />
        </>
    );
}

export default Product;
