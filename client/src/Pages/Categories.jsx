import React from 'react'
import Item from '../Components/ItemCard/Item'

function Categories() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col">
                        
                    </div>
                </div>
            </div>
            <div className='container top-list'>
                <h1 className='mt-5 mb-5 title-category'>Men<hr /></h1>
                <Item />
                <h1 className='mt-5 mb-5 title-category'>Women<hr /></h1>
                <Item />
                <h1 className='mt-5 mb-5 title-category'>Kids<hr /></h1>
                <Item />
            </div>
        </>
    ) 
}

export default Categories