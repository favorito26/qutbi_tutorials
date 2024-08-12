import React, { useEffect, useState } from 'react';
import Reviews_disp from './Reviews_disp';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review'); // Adjust the endpoint as needed
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      {reviews.map((review, index) => (
        <Reviews_disp 
          key={index} 
          name={review.name} 
          rating={review.rating} 
          reviewText={review.reviewText} 
        />
      ))}
    </div>
  );
}

export default ReviewsList;
