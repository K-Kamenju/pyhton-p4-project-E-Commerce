import React from 'react';
import './CoverContent.css';
import exclusive from '../../Assets/exclusive.png';
import { Link } from 'react-router-dom';
import exclusively from '../../Assets/exclusive.png';

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
                    src={exclusively || imageUrl} 
                    alt={product.title} 
                    className='mt-5 mb-5 img-fluid'
                    onError={handleImageError} // Use onError event handler
                />
            </Link>
        </div>
    );
}

export default CoverImage;
