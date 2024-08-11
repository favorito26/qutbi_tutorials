import React from 'react'
import { useState, useEffect } from 'react';
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
    
    <div className="w-full relative overflow-hidden h-72 md:h-full">
    <div
      className="flex transition-transform duration-700 ease-in-out"
      style={{ transform: `translateX(-${currentSlide * 100}%)` }}
    >
      {slides.map((slide, index) => (
        <div key={index} className="flex-shrink-0 w-full h-full">
          <img
            src={slide}
            className="w-full h-full object-cover"
            alt={`Slide ${index + 1}`}
          />
        </div>
      ))}
    </div>

   

 
      
  </div>
  )
}

export default Carousel
