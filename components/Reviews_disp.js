import React from 'react';

const Reviews_disp = ({ name, rating, reviewText }) => {
  // Create an array to represent the stars based on the rating
  const stars = Array(5).fill(0).map((_, index) => (
    <svg
      key={index}
      className={`w-6 h-6 ${
        index < rating ? "text-yellow-500" : "text-gray-300"
      }`}
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.342 4.123a1 1 0 00.95.69h4.332c.969 0 1.371 1.24.588 1.81l-3.502 2.544a1 1 0 00-.364 1.118l1.341 4.122c.3.922-.755 1.688-1.54 1.118l-3.502-2.544a1 1 0 00-1.175 0l-3.502 2.544c-.785.57-1.84-.196-1.54-1.118l1.341-4.122a1 1 0 00-.364-1.118L2.14 9.55c-.783-.57-.38-1.81.588-1.81h4.332a1 1 0 00.95-.69l1.342-4.123z" />
    </svg>
  ));

  return (
    <div className="mt-5 gap-4 p-4 mb-8 border rounded-lg bg shadow-lg">
      <div className="relative flex gap-4">
        <img
          src="https://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/256/User-blue-icon.png"
          className="relative rounded-lg -top-7 -mb-4 bg-white border h-16 w-16"
          alt=""
          loading="lazy"
        />
        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between">
            <p className="relative text-xl whitespace-nowrap truncate overflow-hidden">
              {name}
            </p>
            <a className="text-gray-500 text-xl" href="#">
              <i className="fa-solid fa-trash"></i>
            </a>
          </div>
          <div className="flex">{stars}</div>
        </div>
      </div>
      <p className="-mt-1 text-blue-950 text-xs md:text-lg">
        {reviewText}
      </p>
    </div>
  );
};

export default Reviews_disp;
