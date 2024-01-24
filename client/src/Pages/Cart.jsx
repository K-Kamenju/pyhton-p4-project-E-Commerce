import React from 'react'
import product from '../Assets/product.png'
import '../Pages/css/Cart.css'

function Cart() {
    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr />
            <div>
                <div className="cartitems-format cartitems-format-main">
                    <img src={product} alt="" className='carticon-product-icon' />
                    <p>title</p>
                    <p>15 </p>
                    <button className='cartitems-quantity'>Quantity</button>
                    <p>30</p>
                    <i className="fa fa-trash-o fa-2x cartitems-remove-icon" aria-hidden="true"></i>
                </div>
                <hr />
            </div>
        </div>
    )
}

export default Cart