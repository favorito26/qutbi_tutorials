import React, { useEffect, useState } from 'react';
import Reviews_disp from './Reviews_disp';

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch reviews from the API
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/review');
        const data = await response.json();

        // Filter to only include approved reviews
        const approvedReviews = data.filter(review => review.isApproved);
        setReviews(approvedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="loader"></div> {/* Simple CSS loader */}
      </div>
    );
  }

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
