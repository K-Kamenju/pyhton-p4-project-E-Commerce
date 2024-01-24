import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import Product from '../../Pages/Product';
import Cart from '../../Pages/Cart';
import Login from '../../Pages/Login';
import About from '../../Pages/About';
import Categories from '../../Pages/Categories';
import Footer from '../Footer/Footer';
import UpdateProfile from '../../Pages/UpdateProfile';
import PostProduct from '../../Pages/PostProduct';


function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
       <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path='/categories' element= {<Categories />}/>
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/profile/profileId" element={<UpdateProfile />} /> 
          <Route path="/post-product" element={<PostProduct />} />
       </Routes>
       <Footer />
    </BrowserRouter>
  );
}

export default App;
