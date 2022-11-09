import React from "react";
import { useLoaderData } from "react-router-dom";

const ServiceReviews = () => {
  const { reviews } = useLoaderData();
  return <div>Service Reviews {reviews.length}</div>;
};

export default ServiceReviews;
