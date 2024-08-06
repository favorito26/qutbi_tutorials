"use client";
import { useState, useEffect } from "react";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/enroll", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg flex flex-col sm:flex-row items-center p-6 pb-9 rounded-lg shadow-2xl lg:mt-10">
          
          {/* Carousel Section */}
          <div className="w-full sm:w-1/2 relative overflow-hidden h-56 md:h-96">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full h-full"
                >
                  <img
                    src={slide}
                    className="w-full h-full object-cover"
                    alt={`Slide ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
              {slides.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`w-3 h-3 rounded-full ${
                    index === currentSlide ? "bg-white" : "bg-gray-400"
                  }`}
                  aria-current={index === currentSlide}
                  aria-label={`Slide ${index + 1}`}
                  data-carousel-slide-to={index}
                  onClick={() => setCurrentSlide(index)}
                ></button>
              ))}
            </div>

            <button
              type="button"
              className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-prev
              onClick={() =>
                setCurrentSlide((prevSlide) =>
                  prevSlide === 0 ? slides.length - 1 : prevSlide - 1
                )
              }
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 1 1 5l4 4"
                  />
                </svg>
                <span className="sr-only">Previous</span>
              </span>
            </button>
            <button
              type="button"
              className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
              data-carousel-next
              onClick={() =>
                setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
              }
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                <svg
                  className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
                <span className="sr-only">Next</span>
              </span>
            </button>
          </div>

          {/* Form and Text Section */}
          <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4 flex justify-center">
            <div className="max-w-md w-full">
              <p className="text-black font-serif text-center sm:text-left sm:text-lg lg:text-xl mb-4">
                Welcome to Qutbi Tutorials, where academic excellence meets
                personalized learning in the realm of commerce education. Nestled
                at the intersection of expertise and innovation.
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                  <div className="w-full mb-4">
                    <p className="font-serif text-black">Enter your Name:</p>
                    <input
                      className="w-full rounded-lg"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <p className="font-serif text-black">Enter your Email:</p>
                    <input
                      className="w-full rounded-lg"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="w-full mb-4">
                    <p className="font-serif text-black">Enter your Phone No.:</p>
                    <input
                      className="w-full rounded-lg"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your Mobile No."
                    />
                  </div>
                  <div className="w-full mb-4">
                    <p className="font-serif text-black">
                      Enter the course you wish to join for:
                    </p>
                    <select
                      className="w-full rounded-lg"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    >
                      <option value="">--Choose your course--</option>
                      <option value="Fyjc">Fyjc(commerce)</option>
                      <option value="Fyjs">Fyjs(Arts)</option>
                      <option value="Syjc(commerce)">Syjc(commerce)</option>
                      <option value="Syjc(Arts)">Syjc(Arts)</option>
                      <option value="BCOM">BCOM(Bachelors Of Commerce)</option>
                      <option value="BMS">BMS(Bachelors Of Management Studies)</option>
                      <option value="BAF">BAF(Bachelors in Accounting and Finance)</option>
                      <option value="MCOM">MCOM(Masters Of Commerce)</option>
                      <option value="CA1">CA(Chartered Accountancy Foundation)</option>
                      <option value="CA2">CA(Chartered Accountancy Intermediate)</option>
                      <option value="CA3">CA(Chartered Accountancy Final)</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="text-white bg-nav font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-5"
                    disabled={loading}
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
