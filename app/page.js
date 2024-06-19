"use client"
import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    course: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      alert(data.message); // Display success message
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form: ' + error.message);
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-col sm:flex-row bg-lime-300 items-center p-4 rounded-lg shadow-lg lg:mt-10">
          <img src="/logo.png" alt="Logo" className="w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg" />
          <div className="flex flex-col items-center text-center sm:text-left mt-4 sm:mt-0 sm:ml-4">
            <p className="text-green-900 font-serif text-center sm:text-lg lg:text-xl">
              Welcome to Qutbi Tutorials, where academic excellence meets
              personalized learning in the realm of commerce education.
              Nestled at the intersection of expertise and innovation.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <div className="flex flex-col text-center sm:items-center">
                  <div className="w-full sm:w-auto mb-4">
                    <p className='font-serif text-green-900'>Enter your Name:</p>
                    <input
                      className='w-full sm:w-72 rounded-lg'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      placeholder='Enter your name'
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className='font-serif text-green-900'>Enter your Email:</p>
                    <input
                      className='w-full sm:w-72 rounded-lg'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      placeholder='Enter your email'
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className='font-serif text-green-900'>Enter your Phone No.:</p>
                    <input
                      className='w-full sm:w-72 rounded-lg'
                      name='mobile'
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder='Enter your Mobile No.'
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className='font-serif text-green-900'>Enter the course you are studying:</p>
                    <input
                      className='w-full sm:w-72 rounded-lg'
                      name='course'
                      value={formData.course}
                      onChange={handleChange}
                      placeholder='Enter your Course you want the coaching for'
                    />
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500
                    to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300
                    dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg
                    dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5">
                    Enroll Now
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
