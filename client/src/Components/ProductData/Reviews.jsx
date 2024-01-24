import React, { useState } from 'react';

function Reviews() {
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // Save the review to the state
    setReviews([...reviews, reviewText]);
    // Clear the input field after submitting the review
    setReviewText('');
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
        <h2 className='descriptionbox-nav-box'>All Reviews:55</h2>
        {reviews.length === 0 ? (
          <p className='descriptionbox-description'>No reviews yet.</p>
        ) : (
          <ul className='descriptionbox-description'>
            {reviews.map((review, index) => (
              <li key={index}>{review}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Reviews;
