import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


function Profile() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProducts = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                alert('Please log in to view your products.');
                navigate('/login'); // Redirect to login page or handle accordingly
                return;
            }
            try {
                const response = await fetch('https://marketx-6vt2.onrender.com/user/products', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch user products');
                }
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error:', error);
                // Handle error here (e.g., show error message to user)
            }
        };

        fetchUserProducts();
    }, [navigate]);

    const handleUpdateProduct = (productId) => {
        navigate(`/update-product/${productId}`);
    };


    const handleDeleteProduct = async (productId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('Please log in to delete a product.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`https://marketx-6vt2.onrender.com/api/product/${productId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    setProducts(products.filter(product => product.id !== productId));
                    alert('Product deleted successfully');
                } else {
                    alert('Failed to delete product');
                }
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div className="container mt-5">
            <h2>My Products</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
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
    );
}

export default Profile;
