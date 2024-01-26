import React, { useState, useEffect } from 'react'
import Item from '../Components/ItemCard/Item'

function Categories() {

    const [menProducts, setMenProducts] = useState([]);
    const [womenProducts, setWomenProducts] = useState([]);
    const [kidsProducts, setKidsProducts] = useState([]);

    useEffect(() => {
        fetch('https://marketx-6vt2.onrender.com/api/products/category/men')
            .then(response => response.json())
            .then(data => setMenProducts(data));

        fetch('https://marketx-6vt2.onrender.com/api/products/category/women')
            .then(response => response.json())
            .then(data => setWomenProducts(data));

        fetch('https://marketx-6vt2.onrender.com/api/products/category/kids')
            .then(response => response.json())
            .then(data => setKidsProducts(data));
    }, []);

    return (
        <>
            <div className="container">
            
            <div className='row'>
                <h1 className='mt-5 mb-5 title-category'>Men<hr /></h1>
                {menProducts.map(product => (
                    <Item key={product.id} product={product} />
                ))}
                <h1 className='mt-5 mb-5 title-category'>Women<hr /></h1>
                {womenProducts.map(product => (
                    <Item key={product.id} product={product} />
                ))}
                <h1 className='mt-5 mb-5 title-category'>Kids<hr /></h1>
                {kidsProducts.map(product => (
                    <Item key={product.id} product={product} />
                ))}
            </div>
            </div>
        </>
    ) 
}

export default Categories