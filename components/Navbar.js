"use client"
import React from 'react';

const Navbar = () => {
    const handleCallClick = () => {
    const phone = "+917045524917";
    window.location.href = `tel:${phone}`;
  };
  return (
    <nav className='bg-nav'>
      <div className="mycontainer flex items-center justify-between px-4 py-10 h-14">
        <div className="flex items-center">
          <img src='/logo.png' alt="Logo" className="h-16 w-16 bg rounded-full mr-4" />
          <div className="logo font-bold text-white lg:text-xl sm:text-base">Qutbi Tutorials</div>
        </div>
        <ul>
          <li className='flex gap-4'>
          <button 
              className='text-center lg:me-2 sm:me-0 mb-2 mt-2 sm:hidden' 
              onClick={handleCallClick}
              style={{background: 'none', border: 'none', padding: 0}} // Remove default button styles
            >
              <img src="call.gif" alt="Call Us" className='w-24 h-10'/>
            </button>
            <a className='text-black bg hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:me-2 sm:me-0 mb-2 mt-2' href="/">Home</a>
            <a className='text-black bg
                         font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:me-2 sm:me-0 mb-2 mt-2' href="/about">About</a>
          </li> 
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
