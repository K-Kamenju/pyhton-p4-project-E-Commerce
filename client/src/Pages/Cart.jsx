import React, { useState, useEffect } from 'react';
import './css/Cart.css';

function Cart() {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        fetchCartItems();
    }, []);

    const fetchCartItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('/api/cart', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setCartItems(data);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Error fetching cart items:", error);
            // Optionally, handle the error in the UI
        }
    };

    const handleRemoveItem = async (itemId) => {
        const token = localStorage.getItem('token');
        await fetch(`/api/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        fetchCartItems(); // Refresh cart items
    };

    const handleQuantityChange = async (itemId, newQuantity) => {
        const token = localStorage.getItem('token');
        await fetch(`/api/cart/${itemId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ quantity: newQuantity }),
        });
        fetchCartItems(); // Refresh cart items
    };

    const calculateTotalPrice = (price, quantity) => {
        return price * quantity;
    };

    // Function to calculate the grand total
    const calculateGrandTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + calculateTotalPrice(item.product.price, item.quantity);
        }, 0);
    };

    return (
        <div className="container cart-container">
            <table className="table cart-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {cartItems.map((item) => (
                    <tr key={item.id}>
                        <td><img src={item.product.image_url} alt={item.product.title} className='carticon-product-icon' /></td>
                        <td>{item.product.title}</td>
                        <td>Ksh {item.product.price}</td>
                        <td>
                            <input type="number" value={item.quantity} onChange={(e) => handleQuantityChange(item.id, e.target.value)} />
                        </td>
                        <td>Ksh {calculateTotalPrice(item.product.price, item.quantity)}</td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleRemoveItem(item.id)}>
                                Remove
                            </button>
                        </td>
                    </tr>
                ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">Grand Total</td>
                        <td>KES: {calculateGrandTotal()}</td>
                        <td></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default Cart;
