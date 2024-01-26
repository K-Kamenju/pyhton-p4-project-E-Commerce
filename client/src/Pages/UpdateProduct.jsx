import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate } from 'react-router-dom';


function UpdateProduct() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image_url: '',
    available_sizes: [],
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must be logged in to update a product.',
      });
      navigate('/login');
      return;
    }

    
    fetch(`https://marketx-6vt2.onrender.com/api/product/${productId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      let availableSizes = data.available_sizes;

      // Check if available_sizes is a string and needs to be split into an array
      if (typeof availableSizes === 'string') {
        availableSizes = availableSizes.split(',');
      }

      setProductData({
        ...data,
        available_sizes: availableSizes,
      });
    })
    .catch(error => {
      console.error('Error fetching product:', error);
      setError(error);
    });
  }, [productId, navigate]);

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === 'available_sizes') {
      setProductData(prevData => ({
        ...prevData,
        available_sizes: checked
          ? [...prevData.available_sizes, value]
          : prevData.available_sizes.filter(size => size !== value),
      }));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleUpdateProduct = () => {
    const token = localStorage.getItem('token');
    const updatedData = {
      ...productData,
      available_sizes: productData.available_sizes.join(','),
    };

    fetch(`https://marketx-6vt2.onrender.com/api/product/${productId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire('Updated!', 'Your product has been updated.', 'success');
      navigate('/profile');
    })
    .catch(error => {
      console.error('Error updating product:', error);
    });
  };


  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Update Product</h2>
      <form>
      <div className="mb-3">
          <label className="form-label">Product Title</label>
          <input
            type="text"
            className="form-control"
            name="title"
            value={productData.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            name="price"
            value={productData.price}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea
            className="form-control"
            name="description"
            value={productData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <select
            className="form-select"
            name="category"
            value={productData.category}
            onChange={handleInputChange}
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kids">Kids</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="image_url"
            value={productData.image_url}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Available Sizes</label>
          <div className="d-flex">
            {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
              <div className="form-check m-2" key={size}>
                <input
                  className="form-check-input"
                  type="checkbox"
                  value={size}
                  name="available_sizes"
                  checked={productData.available_sizes.includes(size)}
                  onChange={handleInputChange}
                />
                <label className="form-check-label">{size}</label>
              </div>
            ))}
          </div>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleUpdateProduct}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default UpdateProduct;
