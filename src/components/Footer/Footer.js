import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-white bg-blue-gray-800 p-6 text-center">
      <p className="text-center mt-4">
        Join for Free.
        <button
          type="button"
          className="inline-block ml-3 px-6 py-2 border-2 border-white text-white font-medium text-xs leading-tight uppercase rounded-full hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
        >
          <Link to="/register">Register</Link>
        </button>
      </p>

      <div className="text-center p-4">
        &copy; {new Date().getFullYear()} —
        <Link className="text-white" to="/">
          Math Mentor
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
