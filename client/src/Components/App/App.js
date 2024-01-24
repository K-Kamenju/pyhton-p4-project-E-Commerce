import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../../Pages/Home';
import Product from '../../Pages/Product';
import Cart from '../../Pages/Cart';
import Login from '../../Pages/Login';
import SignUp from '../../Pages/SignUp';
import About from '../../Pages/About';
import Categories from '../../Pages/Categories';
import Footer from '../Footer/Footer';
import UpdateProfile from '../../Pages/UpdateProfile';
import PostProduct from '../../Pages/PostProduct';
import ProfileForm from '../../Pages/ProfileForm';

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
        <Route path='/categories' element={<Categories />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/" /> : <SignUp />} />
        {isLoggedIn && <Route path="/profile" element={<UpdateProfile />} />}
        {isLoggedIn && <Route path="/post-product" element={<PostProduct />} />}
        {isLoggedIn && <Route path="/profile/:profileId" element={<ProfileForm />} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
