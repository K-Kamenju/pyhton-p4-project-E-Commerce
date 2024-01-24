import React from 'react'
import { Link } from 'react-router-dom'
import ProductData from '../Components/ProductData/ProductData'
import Reviews from '../Components/ProductData/Reviews'

function Product() {
    return (
        <>
        <div className="container mt-5" aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/" style={{textDecoration:"none", color:"black"}}>Home</Link></li>
                <li className="breadcrumb-item"><Link to="/categories" style={{textDecoration:"none", color:"black"}}>Categories = Men</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Product.title</li>
            </ol>
        </div>
        <ProductData />
        <Reviews />
        </>
    )
}

export default Product