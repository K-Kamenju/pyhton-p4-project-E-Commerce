import React from 'react';
import './CoverContent.css';
import exclusive from '../../Assets/exclusive.png';
import { Link } from 'react-router-dom';

function CoverImage({ product }) {
    if (!product) {
        return <div>Loading...</div>; // Or any other placeholder content
    }

    const imageUrl = product.image_url;

    const handleImageError = (e) => {
        e.target.src = exclusive; // Set the source to the exclusive photo
    };

    return (
        <div>
            <Link to={`/product/${product.id}`}>
                <img 
                    src={imageUrl} 
                    alt={product.title} 
                    onError={handleImageError} // Use onError event handler
                />
            </Link>
        </div>
    );
}

export default CoverImage;
