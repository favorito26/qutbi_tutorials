import React from "react";

const Page = () => {
  return (
    <>
      <div className="flex flex-col mt-5 justify-center items-center mx-4 lg:mx-6">
        <div className="w-full bg">
          <h1 className="text-center font-bold text-2xl font-serif">Our Faculty:</h1>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-56 items-center justify-center mt-8 flex-grow">
          <div className="max-w-sm bg border rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mb-8 lg:mb-0">
            <a href="#">
              <img
                className="rounded-t-lg max-h-64 w-full object-cover"
                src="qutub sir.jpg"
                alt="Qutub Sir"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Qutub Tabha
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Author, Teacher
              </p>
            </div>
          </div>

          <div className="max-w-sm bg border  rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <img
                className="rounded-t-lg max-h-64 w-full object-cover"
                src="qasim sir.jpg"
                alt="Qasim Sir"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Qasim Motorwala
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                Lawyer, Teacher
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center mt-8 mb-4 mx-4 lg:mx-6">
        <div className="bg w-full">
          <h2 className="text-center font-bold text-2xl">Contact Us:</h2>
        </div>
        <div className="flex flex-col md:flex-row md:gap-10 items-center justify-center mt-7 w-full lg:w-auto">
          <div className="w-full md:w-1/3 p-6 bg border rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mb-8 lg:mb-0">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Postal address:
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Shop No. S-79, Second Floor, Al Ezz Tower, Opp. Al- Saadah Tower,
              Bhendi Bazar, Mumbai 400 003
            </p>
          </div>

          <div className="w-full md:w-1/3 p-6 bg border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mb-8 lg:mb-0">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Reach us out:
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Contact No.: +919619049716 <br />/+917045524917 <br />
              Email: qutbituts53@gmail.com
            </p>
          </div>

          <div className="w-full md:w-1/3 p-6 bg border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 mb-3 lg:mb-0">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Social media handles:
              </h5>
            </a>
            <div className="flex flex-col gap-2 mb-3 font-normal text-gray-700 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <img src="instagram.svg" alt="Instagram" className="h-8" />
                <a href="https://www.instagram.com/qutbitutorials?igsh=MTBtcWcwNDUydmV6ZA==">
                  @qutbitutorials
                </a>
              </div>
              <div className="flex items-center gap-2">
                <img src="facebook.svg" alt="Facebook" className="h-8" />
                <a href="#">@qutbitutorials</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
