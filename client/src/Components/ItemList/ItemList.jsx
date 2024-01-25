import React from 'react';
import Item from '../ItemCard/Item';
import './ItemList.css';

function ItemList({ criteria, products }) {
    return (
        <div className='container top-list home'>
            <h1 className='mt-5 mb-5 title-category'>{criteria}<hr /></h1>
            <div className='row'>
                {products.map(product => (
                    <Item key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
}

export default ItemList;
