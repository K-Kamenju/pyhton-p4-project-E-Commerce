import React, { useState } from 'react';

function PostProduct() {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'men', // Default category
    imageUrl: '',
    sizes: [], // Array to store selected sizes
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Check if the input is for sizes (checkboxes)
    if (name === 'sizes') {
      const isChecked = e.target.checked;
      const sizeValue = e.target.value;

      // Update sizes array based on checkbox state
      setProductData((prevData) => ({
        ...prevData,
        sizes: isChecked
          ? [...prevData.sizes, sizeValue]
          : prevData.sizes.filter((size) => size !== sizeValue),
      }));
    } else {
      // Update other input fields
      setProductData({ ...productData, [name]: value });
    }
  };

  const userId = 1;

  const handlePostProduct = () => {
    // Implement the logic to post the product to the backend
    console.log('Posting product:', { ...productData, userId });
    // You may want to make an API call to post the product to the database
    // After posting, you may want to redirect the user or show a success message
  };

  return (
    <div className="container mt-5">
      <h2>Post a Product</h2>
      <form>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={productData.name}
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
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Image URL</label>
          <input
            type="text"
            className="form-control"
            name="imageUrl"
            value={productData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Available Sizes</label>
          <div className="d-flex">
            <div className="form-check m-2">
                <input
                className="form-check-input"
                type="checkbox"
                value="S"
                name="sizes"
                checked={productData.sizes.includes('S')}
                onChange={handleInputChange}
                />
                <label className="form-check-label">S</label>
            </div>
            <div className="form-check m-2">
                <input
                className="form-check-input"
                type="checkbox"
                value="M"
                name="sizes"
                checked={productData.sizes.includes('M')}
                onChange={handleInputChange}
                />
                <label className="form-check-label">M</label>
            </div>
            <div className="form-check m-2">
                <input
                className="form-check-input"
                type="checkbox"
                value="L"
                name="sizes"
                checked={productData.sizes.includes('L')}
                onChange={handleInputChange}
                />
                <label className="form-check-label">L</label>
            </div>
            <div className="form-check m-2">
                <input
                className="form-check-input"
                type="checkbox"
                value="XL"
                name="sizes"
                checked={productData.sizes.includes('XL')}
                onChange={handleInputChange}
                />
                <label className="form-check-label">XL</label>
            </div>
            <div className="form-check m-2">
                <input
                className="form-check-input"
                type="checkbox"
                value="XXL"
                name="sizes"
                checked={productData.sizes.includes('XXL')}
                onChange={handleInputChange}
                />
                <label className="form-check-label">XXL</label>
            </div>
          </div>
          {/* Add more size options as needed */}
        </div>
        {/* Include hidden input for userId */}
        <input type="hidden" name="userId" value={userId} />
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
