import React, { useContext } from 'react';
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
import { AuthContext } from '../Servicess/Authentication'; // Adjust the path as needed

function App() {
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleLogoutClick = () => {
    // Call the logout function
    logout();
    
  };

  return (
    <BrowserRouter>
      <Navbar isLoggedIn={isAuthenticated}  onLogout={handleLogoutClick}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/categories' element={<Categories />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
        <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignUp />} />
        {isAuthenticated && <Route path="/profile" element={<UpdateProfile />} />}
        {isAuthenticated && <Route path="/post-product" element={<PostProduct />} />}
        {isAuthenticated && <Route path="/profile/:profileId" element={<ProfileForm />} />}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
