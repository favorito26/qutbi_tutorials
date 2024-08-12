"use client";
import { useState } from "react";
import Carousel from "@/components/carousel";
import Review from "@/components/Review";
import ReviewsList from "@/components/ReviewsList";

const Home = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    course: "",
  });
  const [loading, setLoading] = useState(false);
 
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
        let errorData;
        try {
          errorData = await response.json();
        } catch (err) {
          throw new Error("Unexpected response from server");
        }
        throw new Error(errorData.message || "Something went wrong");
      }

      const data = await response.json();
      alert(data.message);

      // Send confirmation email
      try {
        await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: formData.email,
            name: formData.name,
          }),
        });
      } catch (emailError) {
        console.error("Error sending confirmation email:", emailError);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error submitting form: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg flex flex-col sm:flex-row items-center p-6 pb-9 rounded-lg shadow-2xl lg:mt-10">
        {/* Carousel Section */}
      <Carousel/>
        {/* Form and Text Section */}
        <div className="w-full sm:w-1/2 mt-4 sm:mt-0 sm:ml-4 flex justify-center">
          <div className="max-w-md w-full">
            <p className="text font-serif font-semibold text-center sm:text-left sm:text-lg lg:text-xl mb-4">
              Welcome to Qutbi Tutorials, where academic excellence meets
              personalized learning in the realm of commerce education. Nestled
              at the intersection of expertise and innovation.
            </p>
            <div className="flex justify-center font-bold bg-nav text-white mb-4">
            <h4 className="">Enroll Now!!</h4></div>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center w-full">
                <div className="w-full mb-3">
                  <p className="font-serif text">Enter your Name:</p>
                  <input
                    className="w-full rounded-md p-1"
                    name="name"
                    value={formData.name}
                    onChange={handleChange} 
                    placeholder="Enter your name"
                  />
                </div>
                <div className="w-full mb-3">
                  <p className="font-serif text">Enter your Email:</p>
                  <input
                    className="w-full rounded-md p-1"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="w-full mb-3">
                  <p className="font-serif text">Enter your Phone No.:</p>
                  <input
                    className="w-full rounded-md p-1"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Enter your Mobile No."
                  />
                </div>
                <div className="w-full mb-3">
                  <p className="font-serif text">
                    Enter the course you wish to join for:
                  </p>
                  <select
                    className="w-full rounded-md p-1"
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
                    <option value="BMS">
                      BMS(Bachelors Of Management Studies)
                    </option>
                    <option value="BAF">
                      BAF(Bachelors in Accounting and Finance)
                    </option>
                    <option value="MCOM">MCOM(Masters Of Commerce)</option>
                    <option value="CA1">
                      CA(Chartered Accountancy Foundation)
                    </option>
                    <option value="CA2">
                      CA(Chartered Accountancy Intermediate)
                    </option>
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
<ReviewsList/>
<Review/>
    </div>
  );  
};

export default Home;
