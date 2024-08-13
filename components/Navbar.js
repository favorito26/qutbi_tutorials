"use client";
import React, { useState, useRef, useEffect } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleCallClick = () => {
    const phone = "+917045524917";
    window.location.href = `tel:${phone}`;
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (menuRef.current) {
      menuRef.current.style.maxHeight = isOpen ? `${menuRef.current.scrollHeight}px` : '0px';
      menuRef.current.style.opacity = isOpen ? '1' : '0';
    }
  }, [isOpen]);

  return (
    <nav className='bg-nav'>
      <div className="mycontainer flex items-center justify-between px-4 py-10 h-14">
        <div className="flex items-center">
          <img src='/logo.png' alt="Logo" className="h-16 w-16 bg rounded-full mr-4" />
          <div className="logo font-bold text-white lg:text-xl sm:text-base">Qutbi Tutorials</div>
        </div>

        {/* Call Us button */}
        <button 
          className='flex flex-row text-center lg:me-2 sm:me-0 mb-2 mt-2 bg rounded sm:hidden font-bold' 
          onClick={handleCallClick}
        >
          <p className='mt-1 ml-1'> Call Us
          </p>          
          <img src="call.gif" alt="Call Us" className='w-15 h-8'/>
        </button>

        <button 
          className="text-white focus:outline-none sm:block lg:hidden" 
          onClick={toggleMenu}
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>

      <div 
        ref={menuRef} 
        className='transition-all duration-300 overflow-hidden'
        style={{ maxHeight: '0px', opacity: '0' }}
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2 p-1">
          <a className='block text-black bg hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                         font-medium rounded-lg text-sm px-2 py-2 lg:px-5 lg:py-2.5 text-center justify-center lg:me-2 sm:me-0 mb-1 mt-2' href="/">Home</a>
          <a className='block text-black bg
                         font-medium rounded-lg text-sm px-2 py-2 lg:px-5 lg:py-2.5 text-center lg:me-2 sm:me-0 mb-2 mt-1' href="/about">About</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
