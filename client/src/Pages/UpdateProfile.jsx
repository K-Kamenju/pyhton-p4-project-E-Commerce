import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function UpdateProfile() {
    const [products, setProducts] = useState([]);

    // Fetch the user's products from the backend on component mount
    useEffect(() => {
        // Implement the logic to fetch user's products from the backend
        // For demonstration purposes, using dummy data
        const dummyProducts = [
        { id: 1, name: 'Product 1', price: 20 },
        { id: 2, name: 'Product 2', price: 25 },
        { id: 3, name: 'Product 3', price: 30 },
        ];

        setProducts(dummyProducts);
    }, []);

    const handleUpdateProduct = (productId) => {
        // Implement the logic to update the product with the given productId
        console.log('Updating product with id:', productId);
        // You may want to navigate to the update product page or show a modal
    };

    const handleDeleteProduct = (productId) => {
        // Implement the logic to delete the product with the given productId
        console.log('Deleting product with id:', productId);
        // You may want to confirm the deletion and make an API call to delete the product
    };

    return (
        <>
        <div className="container mt-5 mb-5"><Link to="/profile/profileId" className="btn btn-primary"><div className="">Click Here to Update Profile</div></Link>
        </div>

        <div className="container mt-5">
            <h2>My Products</h2>
            <table className="table">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleUpdateProduct(product.id)}
                        >
                        Update
                        </button>
                        <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(product.id)}
                        >
                        Delete
                        </button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </>

    )
}

export default UpdateProfile