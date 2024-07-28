import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-nav '>
    <div className="mycontainer flex items-center justify-between px-4 py-6 h-14">
      <div className="logo font-bold text-white lg:text-xl sm:text-base">Qutbi Tutorials</div>
    <ul>
      <li className='flex gap-4'>
        <a className='text-black bg hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:me-2 sm:me-0 mb-2 mt-2' href="/">Home</a>
        <a className='text-black bg
                   font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:me-2 sm:me-0 mb-2 mt-2' href="/about">About</a>
 
      </li> 
    </ul>
      </div>
   </nav>
  )
}

export default navbar
