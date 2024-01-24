import React from 'react'
import CoverContent from '../Components/Cover Content/CoverContent'
import CoverImage from '../Components/Cover Content/CoverImage'
import "../index.css"
import ItemList from '../Components/ItemList/ItemList'

function Home() {
    return (
        <>
            <div className="landing-page">
                <div className='mx-5'>
                    <div className='container'>
                        <div className='row align-items-center'>
                            <div className='col' >
                                <CoverContent />
                            </div>
                            <div className='col'>
                                <CoverImage />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popular">
                <ItemList />
            </div>
        </>
        
    )
}

export default Home