
import Navbar from '../Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../Pages/Home';
import Product from '../../Pages/Product';
import Cart from '../../Pages/Cart';
import Login from '../../Pages/Login';
import About from '../../Pages/About';


function App() {
  return (
    <BrowserRouter>
       <Navbar />
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
