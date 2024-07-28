"use client"
import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);  // Add loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Set loading to true
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
    setLoading(false);  // Set loading to false
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="bg flex flex-col sm:flex-row bg items-center p-4 rounded-lg shadow-2xl lg:mt-10">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-96 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
          />
          <div className="flex flex-col items-center text-center sm:text-left mt-4 sm:mt-0 sm:ml-4">
            <p className="text-black font-serif text-center sm:text-lg lg:text-xl">
              Welcome to Qutbi Tutorials, where academic excellence meets
              personalized learning in the realm of commerce education. Nestled
              at the intersection of expertise and innovation.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="mt-4">
                <div className="flex flex-col text-center sm:items-center">
                  <div className="w-full sm:w-auto mb-4">
                    <p className="font-serif text-black">Enter your Name:</p>
                    <input
                      className="w-full sm:w-72 rounded-lg"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className="font-serif text-black">Enter your Email:</p>
                    <input
                      className="w-full sm:w-72 rounded-lg"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className="font-serif text-black">Enter your Phone No.:</p>
                    <input
                      className="w-full sm:w-72 rounded-lg"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Enter your Mobile No."
                    />
                  </div>
                  <div className="w-full sm:w-auto mb-4">
                    <p className="font-serif text-black">
                      Enter the course you wish to join for:
                    </p>
                    <select
                      className="w-full sm:w-72 rounded-lg"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      placeholder="Enter your Course you want the coaching for"
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
                    disabled={loading}  // Disable button when loading
                  >
                    {loading ? "Submitting..." : "Submit"}
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
