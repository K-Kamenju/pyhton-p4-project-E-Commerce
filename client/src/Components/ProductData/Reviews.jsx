import React, { useState } from 'react';
import Swal from 'sweetalert2'

function Reviews({ reviews, productId }) {
  const [reviewText, setReviewText] = useState('');

  const handleReviewSubmit = (e) => {
    e.preventDefault();

    // Check if the user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      // If not logged in, alert the user to log in
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You must be logged in to post a review.",
        footer: "Sorry..."
      });
      return;
    }

    // Submit the new review to the backend
    fetch(`https://marketx-6vt2.onrender.com/product/${productId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Use the JWT token from localStorage
      },
      body: JSON.stringify({ content: reviewText, rating: 5 }) // Example: hardcoding the rating as 5
    })
    .then(response => response.json())
    .then(data => {
      // Update the reviews list with the new review
      reviews.push({ content: reviewText, rating: 5 }); // Update this line to push the review object
      setReviewText('');
    });
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleReviewSubmit}>
        <div>
          <label className="form-label text-light fs-5">Post Reviews:</label>
          <input
            type="text"
            placeholder="Write your review..."
            className="form-control"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button type="submit" className="btn btn-outline-primary btn-md mt-3">
            Submit Review
          </button>
        </div>
      </form>

      <div className=" mt-5">
        <h2 className='descriptionbox-nav-box'>All Reviews:</h2>
        {reviews.length === 0 ? (
          <p className='descriptionbox-description'>No reviews yet.</p>
        ) : (
          <ul className='descriptionbox-description'>
            {reviews.map((review, index) => (
              <li key={index}>{review.content}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reviews;
