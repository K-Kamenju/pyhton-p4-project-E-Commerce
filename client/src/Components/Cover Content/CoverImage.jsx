import React from 'react'
import './CoverContent.css'
import exclusive from '../../Assets/exclusive.png'
import { Link } from 'react-router-dom'

function CoverImage() {
    return (
        <div>
            <Link to ="/product/:productId"><img src={exclusive} alt="cover photo" /></Link>
        </div>
    )
}

export default CoverImage