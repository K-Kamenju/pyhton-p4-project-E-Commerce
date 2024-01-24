import React from 'react'
import CoverContent from '../Components/Cover Content/CoverContent'
import CoverImage from '../Components/Cover Content/CoverImage'
import "../index.css"

function Home() {
    return (
        <div className="landing-page">
            <div className='mx-5 landing-page'>
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
        
    )
}

export default Home