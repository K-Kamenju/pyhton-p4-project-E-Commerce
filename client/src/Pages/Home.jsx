import React, { useEffect, useState, useContext } from 'react';
import CoverContent from '../Components/Cover Content/CoverContent';
import CoverImage from '../Components/Cover Content/CoverImage';
import "../index.css";
import ItemList from '../Components/ItemList/ItemList';
import { AuthContext } from '../Components/Servicess/Authentication'; // Import your AuthContext

function Home() {
    const [username, setUsername] = useState('');
    const [featuredProduct, setFeaturedProduct] = useState(null);
    const [highestRatedProducts, setHighestRatedProducts] = useState([]);
    const [newArrivals, setNewArrivals] = useState([]);
    const [topPicks, setTopPicks] = useState([]);

    const authContext = useContext(AuthContext); // Access the authentication context

    useEffect(() => {
        if (authContext.isAuthenticated) {
            // Fetch user data only if the user is authenticated
            fetch('https://marketx-6vt2.onrender.com/api/user', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch user data');
                }
                return response.json();
            })
            .then(data => {
                setUsername(data.name); // Assuming 'name' is the correct attribute in the response
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                // Handle the error, e.g., show a default username or handle it in another way
            });
        }

        // Fetch featured product
        fetch('https://marketx-6vt2.onrender.com/api/products/featured')
            .then(response => response.json())
            .then(data => setFeaturedProduct(data));

        // Fetch highest rated products
        fetch('https://marketx-6vt2.onrender.com/api/products?criteria=highest_rated')
            .then(response => response.json())
            .then(data => setHighestRatedProducts(data));

        // Fetch new arrivals
        fetch('https://marketx-6vt2.onrender.com/api/products?criteria=new_arrivals')
            .then(response => response.json())
            .then(data => setNewArrivals(data));

        // Fetch top picks
        fetch('https://marketx-6vt2.onrender.com/api/products?criteria=top_picks')
            .then(response => response.json())
            .then(data => setTopPicks(data));
    }, [authContext.isAuthenticated]);

    // Conditionally render the welcome message based on authentication status
    const welcomeMessage = authContext.isAuthenticated ? (
        <h2 className='title p-5 text-center'>Welcome Back, {username}</h2>
    ) : null;

    return (
        <>
            <div className="landing-page">
                <div className='mx-5'>
                    <div className='container'>
                        {welcomeMessage}
                        <div className='row align-items-center'>
                            <div className='col'>
                                <CoverContent product={featuredProduct} />
                            </div>
                            <div className='col'>
                                <CoverImage product={featuredProduct} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="highest rated">
                <ItemList criteria="Highest Rated" products={highestRatedProducts} />
            </div>
            <div className="new arrivals">
                <ItemList criteria="New Arrivals" products={newArrivals} />
            </div>
            <div className="top picks">
                <ItemList criteria="Top Picks" products={topPicks} />
            </div>
        </>
    );
}

export default Home;
