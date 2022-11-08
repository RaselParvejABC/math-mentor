import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div
      className="p-12 text-center relative overflow-hidden bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "url('https://i.ibb.co/283rT7X/joanna-kosinska-1-CMo-Fs-Pfso-unsplash.jpg')",
        height: "500px",
      }}
    >
      <div
        className="absolute top-0 right-0 bottom-0 left-0 w-full h-full overflow-hidden bg-fixed"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
      >
        <div className="flex justify-center items-center h-full">
          <div className="text-white">
            <h2 className="font-semibold text-4xl mb-4">
              Mathematics can be scary, so is Love!
            </h2>
            <h4 className="text-lg mb-6">
              Let's find that Love
              <br /> between
              <br /> You and Mathematics!
            </h4>
            <Link
              className="inline-block px-7 py-3 mb-1 border-2 border-gray-200 text-gray-200 font-medium text-sm leading-snug uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
              to="/services"
              role="button"
              data-mdb-ripple="true"
              data-mdb-ripple-color="light"
            >
              See all Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
