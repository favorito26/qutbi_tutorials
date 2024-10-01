import React, { useState, useEffect } from 'react';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "qutbi_tutorials.jpg",
    // Add more slide images as needed
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <>
      {/* First Carousel Section */}
      <div className="relative overflow-hidden h-72 md:h-full flex justify-center">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full flex justify-center">
              <img
                src={slide}
                className="w-full lg:w-2/3 h-full object-cover mx-auto"
                alt={`Slide ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Second Image Section */}
      <div className="relative overflow-hidden mt-4 h-72 md:h-full flex justify-center">
        <div className="flex-shrink-0 w-full h-full">
          <img
            src="class.jpg"
            className="w-full lg:w-2/3 h-full rounded-md object-cover mx-auto"
          />
        </div>
      </div>
    </>
  );
};

export default Carousel;
