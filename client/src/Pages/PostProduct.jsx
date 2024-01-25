import React, { useState } from 'react';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function PostProduct() {
  const navigate = useNavigate();
  const [productData, setProductData] = useState({
    title: '',
    price: '',
    description: '',
    category: 'men', // Default category
    image_url: '',
    available_sizes: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'available_sizes') {
      const isChecked = e.target.checked;
      const sizeValue = e.target.value;
      setProductData((prevData) => ({
        ...prevData,
        available_sizes: isChecked
          ? [...prevData.available_sizes, sizeValue]
          : prevData.available_sizes.filter((size) => size !== sizeValue),
      }));
    } else {
      setProductData({ ...productData, [name]: value });
    }
  };

  const handlePostProduct = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in to post a review.",
        footer: "Sorry..."
      });
      return;
    }

    const postData = {
      ...productData,
      available_sizes: productData.available_sizes.join(','),
    };

    fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Product posted:', data);
      // Handle successful post, e.g., redirect or show success message
      navigate('/profile')
    })
    .catch(error => {
      console.error('Error posting product:', error);
      // Handle error, e.g., show error message
    });
  };

  return (
    <div className="container mt-5">
      <h2>Post a Product</h2>
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
          onClick={handlePostProduct}
        >
          Post Product
        </button>
      </form>
    </div>
  );
}

export default PostProduct;
