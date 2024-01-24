import React from 'react'
import Item from '../ItemCard/Item'
import './ItemList.css'

function ItemList() {
    return (
        <div className='container'>
            <h1 className='mt-5 title-category'>Item List<hr /></h1>
            <Item />
            <h1 className='mt-5 title-category'>Item List<hr /></h1>
            <Item />
            <h1 className='mt-5 title-category'>Item List<hr /></h1>
            <Item />
            <h1 className='mt-5 title-category'>Item List<hr /></h1>
            <Item />
        </div>
    )
}

export default ItemList