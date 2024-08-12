"use client";
import { useState } from "react";

function Review() {
  const [formData, setFormData] = useState({
    name: "",
    rating: 0,
    reviewText: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleStarClick = (starIndex) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      rating: starIndex,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("/api/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit review");
      }

      alert("Review submitted successfully");
      setFormData({ name: "", rating: 0, reviewText: "" }); // Reset the form
    } catch (error) {
      console.error(error);
      alert("There was an error submitting your review.");
    }
  };

  return (
    <div className="mx-auto p-4 bg rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Rating</label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                onClick={() => handleStarClick(star)}
                className={`w-8 h-8 cursor-pointer ${
                  star <= formData.rating ? "text-yellow-500" : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.342 4.123a1 1 0 00.95.69h4.332c.969 0 1.371 1.24.588 1.81l-3.502 2.544a1 1 0 00-.364 1.118l1.341 4.122c.3.922-.755 1.688-1.54 1.118l-3.502-2.544a1 1 0 00-1.175 0l-3.502 2.544c-.785.57-1.84-.196-1.54-1.118l1.341-4.122a1 1 0 00-.364-1.118L2.14 9.55c-.783-.57-.38-1.81.588-1.81h4.332a1 1 0 00.95-.69l1.342-4.123z" />
              </svg>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="reviewText"
          >
            Review
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            name="reviewText"
            id="reviewText"
            rows="4"
            placeholder="Write your review..."
            value={formData.reviewText}
            onChange={handleInputChange}
            required
          />
        </div>
        <button
          type="submit"
          className="mt-4 w-full px-4 py-2 text-white bg-nav rounded-lg"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default Review;
