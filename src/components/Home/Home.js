import React from "react";
import Banner from "../Banner/Banner";
import Pricing from "../Pricing/Pricing";
import ServicesOnHome from "../ServicesOnHome/ServicesOnHome";
import Testimonial from "../Testimonial/Testimonial";

const Home = () => {
  return (
    <>
      <Banner />
      <ServicesOnHome />
      <Testimonial />
      <Pricing />
    </>
  );
};

export default Home;
